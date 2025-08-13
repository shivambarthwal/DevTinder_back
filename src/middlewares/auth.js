const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  console.log("Admin Auth middleware is Running !");
  try {
    // Read the token from the requet cookies
    const cookies = req.cookies;
    const { token } = cookies;
    
    // if token is not present
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    // verify the token & get the userId
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;
    // find the user by id
    const user = await User.findById(_id);

    // if user is not found
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  userAuth,
};
