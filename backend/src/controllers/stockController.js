import mongoose from 'mongoose';
import Product from '../models/Product.js';
import StockTransaction from '../models/stockTransaction.js';

// record a stock transaction and update product quantity atomically
export const createTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { productId, type, quantityChange, reason } = req.body;
    const userId = req.user && req.user.id;
    if (!productId || !type || typeof quantityChange !== 'number') {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'productId, type and numeric quantityChange are required' });
    }

    const product = await Product.findById(productId).session(session);
    if (!product) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Product not found' });
    }

    const previousQuantity = product.quantity;
    const newQuantity = previousQuantity + quantityChange;
    if (newQuantity < 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Resulting quantity cannot be negative' });
    }

    product.quantity = newQuantity;
    await product.save({ session });

    const tx = await StockTransaction.create([
      {
        productId,
        userId,
        type,
        quantityChange,
        previousQuantity,
        newQuantity,
        reason,
      },
    ], { session });

    await session.commitTransaction();
    session.endSession();
    return res.status(201).json(tx[0]);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('createTransaction error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const listTransactions = async (req, res) => {
  try {
    const { productId, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (productId) filter.productId = productId;
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      StockTransaction.find(filter).populate('productId userId', '-password').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      StockTransaction.countDocuments(filter),
    ]);
    return res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error('listTransactions error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
