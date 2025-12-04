import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    contactEmail: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Supplier", supplierSchema);
