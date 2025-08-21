const express = require("express");
const ConnectDb = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./utils/cronjob");

const app = express();
const Port = 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requireRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requireRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);

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
