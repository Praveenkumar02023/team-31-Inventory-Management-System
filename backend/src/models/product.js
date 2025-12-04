import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },

    price: { type: Number, required: true },
    costPrice: { type: Number },

    quantity: { type: Number, default: 0 },

    lowStockThreshold: { type: Number, default: 5 },
  },
  { timestamps: true }
);

// Indexes for faster searching
productSchema.index({ sku: 1 });
productSchema.index({ categoryId: 1 });
productSchema.index({ supplierId: 1 });

export default mongoose.model("Product", productSchema);
