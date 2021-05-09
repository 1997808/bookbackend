const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { port } = require("./config/config");

// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRoute = require("./routes/UserRoute");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    key: "userID",
    secret: "subscription",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30,
    },
    unset: "destroy",
  })
);

app.use("/", userRoute);

app.listen(port, () => {
  console.log("server running");
});
