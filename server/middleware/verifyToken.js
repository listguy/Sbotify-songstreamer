const jwt = require("jsonwebtoken");

//Authentication middleware
function auth(req, res, next) {
  const token = req.header("auth-token");
  console.log("trgigred " + token);

  if (!token)
    return res.json({
      success: false,
      message: "No token supllied",
    });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
}

module.exports.auth = auth;
