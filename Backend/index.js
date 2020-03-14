const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController").userController;

const app = express();
const userRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1/user", userRouter);

userController(userRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000!");
});
