const Payment = require("../../../models/cashier/Payment");
const Order = require("../../../models/cashier/Order");

const {
  calculateGST,
  calculateFinalAmount,
} = require("../services/paymentService");

const RAZORPAY_QR_URL = "https://api.razorpay.com/v1/payments/qr_codes";

const createRazorpayAuthHeader = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return null;
  }

  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
};

// ======================================================
// CREATE PAYMENT
// ======================================================

const createPayment = async (req, res) => {
  try {
    const { amount, order, paymentStatus } = req.body;

    // Validate amount
    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    // Calculate GST & Final Amount
    const gst = calculateGST(amount);

    const finalAmount = calculateFinalAmount(amount);

    // Create Payment
    const payment = await Payment.create({
      ...req.body,
      paymentReference: req.body.paymentReference || req.body.transactionId || "",
      gst,
      finalAmount,
    });

    if (order && paymentStatus === "SUCCESS") {
      await Order.findByIdAndUpdate(order, {
        paymentStatus: "PAID",
        orderStatus: "COMPLETED",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// CREATE RAZORPAY QR
// ======================================================

const createRazorpayQr = async (req, res) => {
  try {
    const { amount, paymentReference, customerName } = req.body;
    const numericAmount = Number(amount);
    const authHeader = createRazorpayAuthHeader();

    if (!authHeader) {
      return res.status(400).json({
        success: false,
        message: "Razorpay API keys are not configured.",
      });
    }

    if (!numericAmount || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid amount is required to create Razorpay QR.",
      });
    }

    const reference = paymentReference || `RZP-${Date.now()}`;
    const closeBy = Math.floor(Date.now() / 1000) + 15 * 60;

    const razorpayResponse = await fetch(RAZORPAY_QR_URL, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "upi_qr",
        name: "RetailPOS Dynamic QR",
        usage: "single_use",
        fixed_amount: true,
        payment_amount: Math.round(numericAmount * 100),
        description: `RetailPOS payment ${reference}`,
        close_by: closeBy,
        notes: {
          paymentReference: reference,
          customerName: customerName || "Walk-in customer",
        },
      }),
    });

    const data = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      return res.status(razorpayResponse.status).json({
        success: false,
        message:
          data?.error?.description ||
          data?.error?.reason ||
          "Unable to create Razorpay QR.",
      });
    }

    return res.status(201).json({
      success: true,
      qrCode: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET ALL PAYMENTS
// ======================================================

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate({
        path: "order",
        populate: [
          { path: "customer" },
          { path: "cashier" },
        ],
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET SINGLE PAYMENT
// ======================================================

const getSinglePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id).populate("order");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// UPDATE PAYMENT
// ======================================================

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    let updatedData = { ...req.body };

    // Recalculate GST if amount changes
    if (req.body.amount) {
      const gst = calculateGST(req.body.amount);

      const finalAmount = calculateFinalAmount(req.body.amount);

      updatedData.gst = gst;
      updatedData.finalAmount = finalAmount;
    }

    const updatedPayment = await Payment.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// DELETE PAYMENT
// ======================================================

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    await Payment.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  createPayment,
  createRazorpayQr,
  getPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
