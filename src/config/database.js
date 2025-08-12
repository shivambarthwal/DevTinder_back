const mongoose = require("mongoose");

async function ConnectDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://shivambarthwal:AaxgJvl1U1WypDBn@namastenode.2ynkm5m.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode",
      {
        dbName: "devTinder",
      }
    );
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
module.exports = ConnectDb;
