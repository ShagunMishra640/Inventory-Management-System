//product schema
const productSchema = new mongoose.Schema(
  {
    name: String,

    price: Number,

    stock: Number,

    barcode: String,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
    },

    image: String,
  },
  { timestamps: true },
);

Module.exports = mongoose.model("product", productSchema);
