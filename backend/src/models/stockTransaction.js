import mongoose from "mongoose";

const stockTransactionSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["IN", "OUT", "ADJUSTMENT"],
      required: true,
    },

    quantityChange: { type: Number, required: true },   // + or -
    previousQuantity: { type: Number, required: true },
    newQuantity: { type: Number, required: true },

    reason: { type: String },
  },
  { timestamps: true }
);

stockTransactionSchema.index({ productId: 1 });
stockTransactionSchema.index({ userId: 1 });
stockTransactionSchema.index({ createdAt: -1 });

export default mongoose.model("StockTransaction", stockTransactionSchema);
