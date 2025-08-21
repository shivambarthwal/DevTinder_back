const Razorpay = require("razorpay");

//First STEP: Create a Razorpay instance
// This instance will be used to interact with Razorpay's API for payment processing and other functionalities
let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



module.exports = instance;
// This module initializes a Razorpay instance with the provided key ID and secret.
// It can be used to interact with Razorpay's API for payment processing and other functionalities. 