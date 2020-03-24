require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController").userController;
const newspaperController = require("./controllers/newspaperController")
  .newspaperController;

const app = express();
const userRouter = express.Router();
const newspaperRouter = express.Router();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/newspaper", newspaperRouter);

userController(userRouter);
newspaperController(newspaperRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000!");
});
