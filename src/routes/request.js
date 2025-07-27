const express = require("express");
const requireRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// :status/:toUserId means they are dynamic

requireRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // Validating the status
      const AllowedStatus = ["interested", "ignored"];
      if (!AllowedStatus.includes(status)) {
        throw new Error("Invalid Status");
      }

      // Validating the toUserId is a valid user
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User Not Found");
      }

      // If there is an existing Connectionrequest
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (existingRequest) {
        throw new Error("Request Already Exists");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const reqData = await connectionRequest.save();
      res.json({
        status: "success",
        message: req.user.firstName + " sent a connection request .",
        data: reqData,
      });
    } catch (error) {
      res.status(400).send(" ERROR " + error.message);
    }
  }
);

requireRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      // shivam => harsh
      // first we have to check that harsh is logged in to run this api
      // loggedInUser is to be same as toUserId of this request ,
      // status should be intrested , user can accepted and rejected
      const loggedInUser = req.user;
      const status = req.params.status;
      const requestId = req.params.requestId;

      // validate the status
      const isAllowedStatus = ["accepted", "rejected"];
      if (!isAllowedStatus.includes(status)) {
        throw new Error("Invalid Status");
      }

      // validate the requestId
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        throw new Error("User Not Found");
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({
        message: `Request successfully ${status} !`,
        status: "success",
        data: data,
      });
    } catch (error) {
      res.status(400).send("Error" + error.message);
    }
  }
);

module.exports = requireRouter;
