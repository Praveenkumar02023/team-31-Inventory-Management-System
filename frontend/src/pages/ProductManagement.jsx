import React, { useEffect, useState } from "react";

/*
ProductManagement.jsx
Single-file Product Management page using Tailwind CSS classes.
It uses localStorage as a mock backend; drop into any React app.
Assumes Tailwind is available (see instructions below).
*/

const STORAGE_KEY = "ims_products_v1_sf";

// initial seed
const SEED = [
  { id: 1, name: "Laptop", sku: "LPT145", category: "Electronics", supplier: "HP Corp", brand: "HP", price: 50000, quantity: 32, threshold: 5, barcode: "123456789012" },
  { id: 2, name: "Mouse", sku: "MS001", category: "Accessory", supplier: "Logitech", brand: "Logitech", price: 599, quantity: 120, threshold: 10, barcode: "223456789012" },
  { id: 3, name: "Jacket", sku: "DJ789", category: "Clothing", supplier: "Myntra", brand: "Myntra", price: 1500, quantity: 12, threshold: 4, barcode: "323456789012" },
  { id: 4, name: "PhoneCover", sku: "PC710", category: "Accessory", supplier: "CaseCo", brand: "CaseCo", price: 299, quantity: 4, threshold: 8, barcode: "423456789012" }
];

function ensureSeed() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
  }
}

function readAll() {
  ensureSeed();
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function writeAll(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

/* mock API (local functions) */
async function apiGetProducts({ search = "", category = "All" } = {}) {
  await new Promise((r) => setTimeout(r, 80));
  let data = readAll();
  if (search) {
    const q = search.toLowerCase();
    data = data.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.barcode || "").toLowerCase().includes(q)
    );
  }
  if (category && category !== "All") {
    data = data.filter((p) => p.category === category);
  }
  return data;
}

async function apiCreateProduct(payload) {
  await new Promise((r) => setTimeout(r, 80));
  const all = readAll();
  const id = all.length ? Math.max(...all.map((x) => x.id)) + 1 : 1;
  const item = { id, ...payload };
  all.push(item);
  writeAll(all);
  return item;
}

async function apiUpdateProduct(id, payload) {
  await new Promise((r) => setTimeout(r, 80));
  const all = readAll();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Product not found");
  all[idx] = { ...all[idx], ...payload };
  writeAll(all);
  return all[idx];
}

async function apiDeleteProduct(id) {
  await new Promise((r) => setTimeout(r, 80));
  let all = readAll();
  all = all.filter((p) => p.id !== id);
  writeAll(all);
  return;
}

async function apiGetCategories() {
  await new Promise((r) => setTimeout(r, 40));
  const data = readAll();
  return Array.from(new Set(data.map((p) => p.category || "Uncategorized")));
}

async function apiGetSuppliers() {
  await new Promise((r) => setTimeout(r, 40));
  const data = readAll();
  return Array.from(new Set(data.map((p) => p.supplier || "Unknown")));
}

/* Utility */
function formatCurrency(n) {
  return "₹" + Number(n).toLocaleString();
}

/* Main component */
export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  // modal/form state
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);

  // form fields
  const blankForm = { name: "", sku: "", barcode: "", category: "", brand: "", supplier: "", price: "", quantity: "", threshold: 5 };
  const [form, setForm] = useState(blankForm);

  useEffect(() => {
    (async () => {
      ensureSeed();
      await refreshMeta();
      await load();
    })();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => load(), 220);
    return () => clearTimeout(t);
  }, [q, category]);

  async function refreshMeta() {
    const cats = await apiGetCategories();
    setCategories(["All", ...cats]);
    const sups = await apiGetSuppliers();
    setSuppliers(sups);
  }

  async function load() {
    setLoading(true);
    const list = await apiGetProducts({ search: q, category });
    setProducts(list);
    setLoading(false);
  }

  function openAdd() {
    setEditing(null);
    setForm(blankForm);
    setOpenForm(true);
  }

  function openEdit(p) {
    setEditing(p);
    setForm({
      name: p.name || "",
      sku: p.sku || "",
      barcode: p.barcode || "",
      category: p.category || "",
      brand: p.brand || "",
      supplier: p.supplier || "",
      price: p.price ?? "",
      quantity: p.quantity ?? "",
      threshold: p.threshold ?? 5
    });
    setOpenForm(true);
  }

  function onFormChange(key, value) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function validateForm() {
    if (!form.name.trim()) return "Name is required";
    if (!form.sku.trim()) return "SKU is required";
    if (form.price === "" || isNaN(Number(form.price))) return "Price must be a number";
    if (!Number.isInteger(Number(form.quantity))) return "Quantity must be an integer";
    if (!Number.isInteger(Number(form.threshold))) return "Threshold must be an integer";
    return null;
  }

  async function saveForm() {
    const err = validateForm();
    if (err) {
      alert(err);
      return;
    }
    const payload = {
      name: form.name,
      sku: form.sku,
      barcode: form.barcode,
      category: form.category || "Uncategorized",
      brand: form.brand,
      supplier: form.supplier,
      price: Number(form.price),
      quantity: Number(form.quantity),
      threshold: Number(form.threshold)
    };
    try {
      if (editing) {
        await apiUpdateProduct(editing.id, payload);
      } else {
        await apiCreateProduct(payload);
      }
      await refreshMeta();
      await load();
      setOpenForm(false);
    } catch (e) {
      alert(e.message || "Save error");
    }
  }

  async function removeProduct(id) {
    if (!confirm("Delete this product?")) return;
    await apiDeleteProduct(id);
    await refreshMeta();
    await load();
  }

  function clearFilters() {
    setQ("");
    setCategory("All");
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-dashed border-slate-700 py-6 text-center">
          <h1 className="text-lg tracking-widest">PRODUCT MANAGEMENT</h1>
        </div>

        {/* Controls */}
        <div className="mt-6 bg-slate-800 p-4 rounded-lg border border-slate-700 shadow">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-sky-300">Search:</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name or SKU..."
                className="flex-1 bg-transparent border-b border-dashed border-slate-600 px-2 py-1 outline-none focus:border-sky-400"
              />
              <span className="ml-2 text-slate-400">Category:</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-transparent border border-slate-700 px-2 py-1 rounded">
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex gap-2">
              <button onClick={openAdd} className="text-sky-200 hover:text-white border border-sky-600 px-3 py-1 rounded">[+ Add Product]</button>
              <button onClick={clearFilters} className="text-slate-300 border border-slate-600 px-3 py-1 rounded">Clear Filters</button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 bg-slate-800 p-4 rounded-lg border border-slate-700 overflow-auto">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <table className="w-full table-fixed text-sm">
              <thead>
                <tr className="border-b border-dashed border-slate-700 text-slate-300">
                  <th className="text-left py-2 px-2">Name</th>
                  <th className="text-left py-2 px-2">SKU</th>
                  <th className="text-left py-2 px-2">Category</th>
                  <th className="text-left py-2 px-2">Supplier</th>
                  <th className="text-right py-2 px-2">Price</th>
                  <th className="text-right py-2 px-2">Qty</th>
                  <th className="text-right py-2 px-2">Threshold</th>
                  <th className="py-2 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 && (
                  <tr>
                    <td colSpan="8" className="py-6 text-center text-slate-400">No products</td>
                  </tr>
                )}
                {products.map((p) => {
                  const low = p.quantity <= p.threshold;
                  const zero = p.quantity === 0;
                  return (
                    <tr key={p.id} className={`${zero ? "bg-rose-900/30" : low ? "bg-amber-900/20" : ""}`}>
                      <td className="py-3 px-2">{p.name}</td>
                      <td className="py-3 px-2">{p.sku}</td>
                      <td className="py-3 px-2">{p.category}</td>
                      <td className="py-3 px-2">{p.supplier}</td>
                      <td className="py-3 px-2 text-right text-pink-400 font-semibold">{formatCurrency(p.price)}</td>
                      <td className="py-3 px-2 text-right text-orange-400 font-semibold">{p.quantity}</td>
                      <td className="py-3 px-2 text-right">{p.threshold}</td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2 justify-center">
                          <button onClick={() => openEdit(p)} className="text-sky-300 hover:text-white text-xs border border-slate-600 px-2 py-1 rounded">Edit</button>
                          <button onClick={() => removeProduct(p.id)} className="text-rose-400 hover:text-white text-xs border border-slate-600 px-2 py-1 rounded">Del</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer: quick stats */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 bg-slate-800 p-3 rounded border border-slate-700">
            <div className="text-slate-400 text-xs">Total Products</div>
            <div className="text-xl font-semibold">{products.length}</div>
          </div>
          <div className="flex-1 bg-slate-800 p-3 rounded border border-slate-700">
            <div className="text-slate-400 text-xs">Low Stock Items</div>
            <div className="text-xl font-semibold">{products.filter(p => p.quantity <= p.threshold).length}</div>
          </div>
          <div className="flex-1 bg-slate-800 p-3 rounded border border-slate-700">
            <div className="text-slate-400 text-xs">Total Inventory Value</div>
            <div className="text-xl font-semibold">{formatCurrency(products.reduce((s, p) => s + (p.price * p.quantity), 0))}</div>
          </div>
        </div>

        {/* Modal form */}
        {openForm && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-3xl bg-slate-800 border border-dashed border-slate-700 rounded-lg shadow-lg">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
                <h3 className="text-lg font-semibold">{editing ? "Edit Product" : "Add Product"}</h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => { setOpenForm(false); setEditing(null); }} className="text-slate-300 border border-slate-600 px-3 py-1 rounded">Close</button>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <div className="text-sm text-slate-300">Name</div>
                    <input value={form.name} onChange={(e) => onFormChange("name", e.target.value)} className="mt-1 w-full bg-transparent border border-slate-700 px-3 py-2 rounded outline-none" />
                  </label>

                  <label className="block">
                    <div className="text-sm text-slate-300">SKU</div>
                    <input value={form.sku} onChange={(e) => onFormChange("sku", e.target.value)} className="mt-1 w-full bg-transparent border border-slate-700 px-3 py-2 rounded outline-none" />
                  </label>

                  <label className="block">
                    <div className="text-sm text-slate-300">Barcode (manual / scanner)</div>
                    <input value={form.barcode} onChange={(e) => onFormChange("barcode", e.target.value)} className="mt-1 w-full bg-transparent border border-slate-700 px-3 py-2 rounded outline-none" />
                  </label>

                  <label className="block">
                    <div className="text-sm text-slate-300">Category</div>
                    <input list="cats" value={form.category} onChange={(e) => onFormChange("category", e.target.value)} className="mt-1 w-full bg-transparent border border-slate-700 px-3 py-2 rounded outline-none" />
                    <datalist id="cats">
                      {categories.filter(c => c !== "All").map(c => <option key={c} value={c} />)}
                    </datalist>
                  </label>

                  <label className="block">
                    <div className="text-sm text-slate-300">Brand</div>
                    <input value={form.brand} onChange={(e) => onFormChange("brand", e.target.value)} className="mt-1 w-full bg-transparent border border-slate-700 px-3 py-2 rounded outline-none" />
                  </label>

                  <label className="block">
                    <div className="text-sm text-slate-300">Supplier</div>
                    <input list="sups" value={form.supplier} onChange={(e) => onFormChange("supplier", e.target.value)} className="mt-1 w-full bg-transparent border border-slate-700 px-3 py-2 rounded outline-none" />
                    <datalist id="sups">
                      {suppliers.map(s => <option key={s} value={s} />)}
                    </datalist>
                  </label>

                  <label className="block">
                    <div className="text-sm text-slate-300">Price</div>
                    <input type="number" value={form.price} onChange={(e) => onFormChange("price", e.target.value)} className="mt-1 w-full bg-transparent border border-slate-700 px-3 py-2 rounded outline-none" />
                  </label>

                  <label className="block">
                    <div className="text-sm text-slate-300">Quantity</div>
                    <input type="number" value={form.quantity} onChange={(e) => onFormChange("quantity", e.target.value)} className="mt-1 w-full bg-transparent border border-slate-700 px-3 py-2 rounded outline-none" />
                  </label>

                  <label className="block">
                    <div className="text-sm text-slate-300">Low Stock Threshold</div>
                    <input type="number" value={form.threshold} onChange={(e) => onFormChange("threshold", e.target.value)} className="mt-1 w-full bg-transparent border border-slate-700 px-3 py-2 rounded outline-none" />
                  </label>

                </div>

                <div className="mt-4 flex gap-2">
                  <button onClick={saveForm} className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded">Save</button>
                  <button onClick={() => { setOpenForm(false); setEditing(null); }} className="border border-slate-600 px-4 py-2 rounded text-slate-200">Cancel</button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
