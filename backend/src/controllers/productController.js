import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const { name, sku, description, price, quantity, location, metadata } = req.body;
    if (!name || !sku) return res.status(400).json({ message: 'name and sku are required' });

    const existing = await Product.findOne({ sku });
    if (existing) return res.status(409).json({ message: 'Product with this SKU already exists' });

    const product = await Product.create({ name, sku, description, price, quantity, location, metadata });
    return res.status(201).json(product);
  } catch (err) {
    console.error('createProduct error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, q } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Product.countDocuments(filter),
    ]);

    return res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error('listProducts error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (err) {
    console.error('getProduct error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (err) {
    console.error('updateProduct error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('deleteProduct error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
