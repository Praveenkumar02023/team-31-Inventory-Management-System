import React, { useEffect, useState } from "react";
import * as api from "../api/mockApi";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import Modal from "../components/Modal";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  // modal state
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  async function load() {
    setLoading(true);
    const list = await api.getProducts({ search: q, category });
    setProducts(list);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const cats = await api.getCategories();
      setCategories(["All", ...cats]);
      const sups = await api.getSuppliers();
      setSuppliers(sups);
    })();
    load();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => load(), 250);
    return () => clearTimeout(t);
  }, [q, category]);

  function openAdd() {
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(product) {
    setEditing(product);
    setShowForm(true);
  }

  async function handleSave(payload) {
    try {
      if (editing) {
        await api.updateProduct(editing.id, payload);
      } else {
        await api.createProduct(payload);
      }
      setShowForm(false);
      load();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;
    try {
      await api.deleteProduct(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  }

  function clearFilters() {
    setQ("");
    setCategory("All");
  }

  return (
    <div className="page">
      <h2 className="page-title">PRODUCT MANAGEMENT</h2>

      <div className="controls card">
        <div className="control-row">
          <span className="muted">Search:</span>
          <input
            className="search-input"
            placeholder="Search by name or SKU..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <span className="muted">Category:</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <button className="btn" onClick={openAdd}>[+ Add Product]</button>
          <button className="btn btn-outline" onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>

      <div className="table-wrap card">
        {loading ? <div>Loading...</div> : (
          <ProductTable
            products={products}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {showForm && (
        <Modal title={editing ? "Edit Product" : "Add Product"} onClose={() => setShowForm(false)}>
          <ProductForm
            initial={editing}
            categories={categories.filter(c => c !== "All")}
            suppliers={suppliers}
            onCancel={() => setShowForm(false)}
            onSave={handleSave}
          />
        </Modal>
      )}
    </div>
  );
}
