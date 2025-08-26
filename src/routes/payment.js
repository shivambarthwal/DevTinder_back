const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentrouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { membershipAmount } = require("../utils/constants");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

paymentrouter.post("/payment/create", userAuth, async (req, res) => {
  const { membershipType } = req.body;
  const { firstName, lastName, email } = req.user;
  //SECOND STEP: Create an Order
  try {
    const normalizedType = membershipType.toLowerCase();
    if (!membershipAmount[normalizedType]) {
      return res.status(400).json({ msg: "Invalid membership type" });
    }
    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[normalizedType] * 100,
      currency: "INR",
      receipt: "order_rcptid_11",
      notes: { firstName, lastName, email, membershipType: normalizedType },
    });
    // save this in database
    console.log(order);
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    await payment.save();

    // return back the order details to the frontend
    res.json({
      keyId: process.env.RAZORPAY_KEY_ID,
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

paymentrouter.post("/payment/webhook", async (req, res) => {
  try {
    // we need to validate the webhook signature
    // const webhookSignature = req.headers["X-Razorpay-Signature"];
    const webhookSignature = req.get("X-Razorpay-Signature");

    const isValidSignature = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZOR_PAY_WEBHOOK
    );

    if (!isValidSignature) {
      return res.status(400).json({ msg: "Invalid webhook signature" });
    }

    // Update DB data

    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();
    // if my webhook is valid i will update the payment status

    const user = await User.findById({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    if (req.body.event == "payment.captured") {
    }
    if (req.body.event == "payment.failed") {
    }

    return res.status(200).json({ msg: "Wenhook success" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

paymentrouter.get("/premium/verify", userAuth, async (req, res) => {
  const user = req.user.toJSON();
  if (user.isPremium) {
    return res.json({ ...user });
  }
  return res.json({ ...user });
});

module.exports = paymentrouter;
