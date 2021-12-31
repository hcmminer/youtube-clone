const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  // console.log("@@@@@@@: ".red, err);

  // Invalid objectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new errorResponse(message, 404);
  }
  res.status(error.statusCode).json({ success: "ok", error: error.message });
};

module.exports = errorHandler;
