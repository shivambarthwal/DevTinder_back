const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the user model
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"User",
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "accepted", "rejected", "ignored"],
        message: "Invalid Status",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

// Job of indexes is to make queries faster
// composite index of fromUserId and toUserId to make it unique  
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

// when a connection request is saved then this function will be called
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // check if the fromuserid is the same as the touserid
  // equals is a mongoose function to check if the ids are the same because it is a object
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send a request to yourself");
  }
  next();
});

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;
