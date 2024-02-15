const express = require("express");
const app = express();

// Config Env File 
require("dotenv").config();
_ = require("underscore");

// Body-Parser Middleware
const bodyparser = require("body-parser");
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());

// Cookie-Parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Serve Static Resources
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// View Engine Setup
// app.set("view engine", "ejs");
// app.set("views", "views");

// User Auth Middleware Integration

// Routes
const router = require("./routes/apiRoutes");
app.use("/api", router); // Api Route

// Server Listen
app.listen(process.env.PORT, () => {
  console.log(`Server is running @ http://127.0.0.1:${process.env.PORT}`);
});

