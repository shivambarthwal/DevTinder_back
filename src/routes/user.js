const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { connection } = require("mongoose");
const User = require("../models/user");
const userRouter = express.Router();

// Get all The Pending Connection request present for a LoggedIn user
userRouter.get("/user/requests/recevied", userAuth, async (req, res) => {
  //Currently we sending Id only of the perosn who is sending the request , we want complete info of that perosn so the person can see who is sending me the request
  // There are 2 ways to achieve this
  //  one is by Looping over the each request presnt and find the user by Id and then save it into the Object.(Poor Approach)
  // Second approacch is Building a relation between 2 Collection or Table by Creating the Ref(reference) ( Good & better Approach)
  try {
    const loggedInUser = req.user;
    const Requests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "photoUrl",
      "about",
    ]);
    // we can also write it like this instead of an array
    // .populate("fromUserId","firstName lastName");

    // Populating this to get User Information because we have given Ref in Connection Schema
    // Populate is  Like Joining the table in SQL (inner join,outer join)
    // Ref is Like a Foreign Key
    res.json({
      status: "success",
      data: Requests,
    });
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser?._id, status: "accepted" },
        { fromUserId: loggedInUser?._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "age",
        "photoUrl",
        "about",
      ])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "age",
        "about",
        "photoUrl",
      ]);

    const data = connectionRequests?.map((row) => {
      // we can't compare two object id directly in mongoDb
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      data,
    });
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //user should not see it's own profile
    // user should not see profiles of it's connections (Friend)
    // user should not see profiles of profile who already ignored or have sent the request
    // entries on the collectionsReq should not be present in The feed

    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    // pagination logic

    // Find all the connectionReq (sent , received)
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser?._id }, { fromUserId: loggedInUser?._id }],
    }).select("fromUserId toUserId");

    // set Data structure is like an array but it is faster than array
    // set is like a collection of unique values
    // [a,b,c,d] contains unique value only , it will remove the duplicate value
    const hiddenUser = new Set();

    connectionRequests.forEach((req) => {
      hiddenUser.add(req.fromUserId.toString());
      hiddenUser.add(req.toUserId.toString());
    });

    const users = await User.find({
      // checking if the user id is present in the hiddenUser
      $and: [
        { _id: { $nin: Array.from(hiddenUser) } }, //not present in this array (not equal to this array)
        { _id: { $ne: loggedInUser._id } }, // not equal to this id(not equal)
      ],
    })
      .select("firstName lastName age photoUrl about")
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ data: users });
  } catch (error) {
    res.status(400).josn({ message: error.message });
  }
});

module.exports = userRouter;

// Used for pagination
// .skip() .limit()
