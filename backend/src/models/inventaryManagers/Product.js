const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    barcode: {
      type: String,
      default: "",
      trim: true,
      index: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
    },

    costPrice: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    minStock: {
      type: Number,
      default: 10,
      min: 0,
    },

    category: {
      type: String,
      default: "",
    },

    brand: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    warehouse: {
      type: String,
      default: "",
      trim: true,
    },

    supplier: {
      type: String,
      default: "",
      trim: true,
    },

    supplierContact: {
      type: String,
      default: "",
      trim: true,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
