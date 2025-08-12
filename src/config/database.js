const mongoose = require("mongoose");

const ConnectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://shivambarthwal:PGeuwtG7827Dz76P@namastenode.2ynkm5m.mongodb.net/devTinder"
  );
};

module.exports = ConnectDb;
