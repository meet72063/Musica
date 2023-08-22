const express = require("express");
const cors = require("cors");
const connect = require("./DB/connect");
const userRouter = require("./routes/userRoute");
const adminRouter = require("./routes/adminRoutes");
const errorHandler = require("./Errors/errorHandler");
require("express-async-errors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

//routes
app.use("/", userRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("this is the home page");
});
app.use(errorHandler);

//connection to database
connect(process.env.MONGO_URL);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("Client/build"));
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is listening on  the port ${port}`);
});
