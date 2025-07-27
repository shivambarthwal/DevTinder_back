const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    // This is coming form the auth Middleware
    const loggedInUser = req.user;

    // updating the user with new data
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    // updating the user in database
    await loggedInUser.save();
    res.json({
      status: "success",
      message: `${loggedInUser?.firstName} your Profile Updated Successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;

    // validating the old password 
    const isPasswordValid = await user.validatePassword(oldPassword);

    if (isPasswordValid) {
      // encrypting the new password into hash
      const hashPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashPassword;
      await user.save();
      res.status(200).send("Password Updated Successfully");
    } else {
      throw new Error("Invalid Password");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = profileRouter;
