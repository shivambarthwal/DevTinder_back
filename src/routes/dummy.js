app.get("/user", userMiddleware, async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    if (users === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.status(200).send(users);
    }
  } catch {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/user/:id", userMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", userMiddleware, async (req, res) => {
  const userId = req.body?.userId;

  if (!userId) {
    return res.status(400).send("User ID not provided");
  }

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

//update data by id

// app.patch("/user", userMiddleware, async (req, res) => {
//   const email = req.body?.email;
//   const data = req.body;

//   // filter  findOneAndUpdate expects a filter object, not a string.
//   try {
//     const user = await User.findOneAndUpdate({ email }, data, {
//       runValidators: true,
//     });
//     console.log(user);
//     res.status(200).send("User Updated Successfully");
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// update data of user

app.patch("/user/:userId", userMiddleware, async (req, res) => {
  const userId = req.params?.userId;
  console.log(userId, "USerID");
  const data = req.body;
  try {
    const Allowed_updates = ["age", "gender", "photoUrl", "about", "skills"];

    const isUpdateAllowed = Object.keys(data).every((key) =>
      Allowed_updates.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Invalid Update Request");
    }

    if (data?.skills.length > 5) {
      throw new Error("Cannot add more than 5 skills");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    console.log(user);
    res.status(200).send("User Updated Successfully");
  } catch (error) {
    res.status(400).send("Update Failed ," + error.message);
  }
});
