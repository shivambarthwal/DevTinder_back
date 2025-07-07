const mongoose = require("mongoose")

const ConnectDb = async ()=>{
    await mongoose.connect("mongodb+srv://shivambarthwal:ABd3uJapSXqbRsIu@namastenode.2ynkm5m.mongodb.net/devTinder")
}

module.exports = ConnectDb

