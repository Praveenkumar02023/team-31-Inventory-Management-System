import mongoose from "mongoose";

const supplierProductSchema = new mongoose.Schema(
  {
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    purchasePrice: { type: Number },
  },
  { timestamps: true }
);

supplierProductSchema.index({ supplierId: 1 });
supplierProductSchema.index({ productId: 1 });

export default mongoose.model("SupplierProduct", supplierProductSchema);
