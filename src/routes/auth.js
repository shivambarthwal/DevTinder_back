const express = require("express");
const { validationSignUp, validationLogin } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");


const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // validate SignUp data
    validationSignUp(req);

    const { firstName, lastName, email, password } = req.body;
    // Encrypt the password into hash
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    // creating a new instance of the user model
    await user.save();
    console.log("User Created Successfully");
    res.status(201).send("User Created Successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(" ERROR " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    validationLogin(req);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    // If Email is valid then Comparing the password
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // JWt token is coming from helper function in moongose
      const token = await user.getJWT();

      // storing the token in cookie & setting it to expire in 7 days
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("LOGIN SUCCESSFUL !");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send(" ERROR is here " + error.message);
  }
});

authRouter.post("/logout", async (req,res) => {

  //we do clean-up action in logout api
  
  res.cookie("token",null , {expires : new Date(Date.now())});
  res.send("LOGOUT SUCCESSFUL !");
})

module.exports = authRouter;
