const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(400).json({ msg: "Invalid authorization header" });
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.TOKEN);

    res.user = {
      name: payload.name,
      email: payload.email,
    };
    next()
  } catch (error) {
    res.status(400).json({ msg: "Invalid authorization Token" });
  }
};


module.exports = auth