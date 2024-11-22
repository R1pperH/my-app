const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Failed");
    }

    const decodedToken = jwt.verify(token, "top_secret");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    const err = new HttpError("Something went wrong", 500);
    return next(err);
  }
};
