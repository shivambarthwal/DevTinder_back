const express = require("express");
const ConnectDb = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const Port = 4000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requireRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requireRouter);
app.use("/", userRouter);

ConnectDb()
  .then(() => {
    console.log("Connected to Database");
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port} `);
    });
  })
  .catch((err) => {
    console.log(err);
  });
