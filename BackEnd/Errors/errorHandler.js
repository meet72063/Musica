const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.name === "TokenExpiredError") {
    res.status(StatusCodes.BAD_REQUEST).json({ error: err.name });
    return;
  }
  if (err.name === "JsonWebTokenError") {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "No token Exist plz Signed in" });
    return;
  }
  if (err.code === 11000) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Email already registered" });
    return;
  }
  if (err.code === 404) {
    res.status(StatusCodes.NOT_FOUND).json({ error: "Route not exist " });
    return;
  }
  //any other error
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("something went wrong");
};

module.exports = errorHandler;
