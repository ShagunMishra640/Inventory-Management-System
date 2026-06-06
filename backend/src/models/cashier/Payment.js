//Stores payment details.
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["CASH", "CARD", "UPI"],
      required: true,
    },

    transactionId: {
      type: String,
      default: "",
    },

    paymentReference: {
      type: String,
      default: "",
      trim: true,
    },

    paymentGateway: {
      type: String,
      default: "",
      trim: true,
    },

    gatewayQrId: {
      type: String,
      default: "",
      trim: true,
    },

    gst: {
      type: Number,
      default: 0,
    },

    finalAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);
module.exports =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
