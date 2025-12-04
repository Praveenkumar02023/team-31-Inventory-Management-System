import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    description: { type: String },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
    },

    price: { type: Number, default: 0 },
    costPrice: { type: Number },

    quantity: { type: Number, default: 0 },

    lowStockThreshold: { type: Number, default: 5 },

    location: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Indexes for faster searching
productSchema.index({ categoryId: 1 });
productSchema.index({ supplierId: 1 });
productSchema.index({ name: 'text' });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
