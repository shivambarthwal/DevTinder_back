const mongoose = require("mongoose");

async function ConnectDb() {
  try {
    console.log("Connecting to MongoDB...", process.env.DB_CONNECTION_SECRET);
    await mongoose.connect(process.env.DB_CONNECTION_SECRET, {
      dbName: "devTinder",
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
module.exports = ConnectDb;
