const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db");
const checkAuth = require("./authenticate");
require("dotenv").config({ path: "../.env" });
mongoDB();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.REACT_APP_URL);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
// app.use(checkAuth);
// app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/AuthCheck"));
app.use("/api", require("./Routes/UserContact"));
app.use("/api", require("./Routes/AdminAuth"));
app.use("/api/secure", checkAuth, require("./Routes/OderData"));
app.use("/api/secure", checkAuth, require("./Routes/UserCart"));
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("Example app listening on port", port);
});
