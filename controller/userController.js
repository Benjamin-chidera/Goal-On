const USER = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userMail = await USER.findOne({ email });

    if (userMail) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await USER.create({ name, email, password: hash });

    res.status(201).json({
      msg: "success",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(404).json({ msg: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await USER.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credential" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ msg: "Invalid Credential" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.TOKEN,
      {
        expiresIn: "2000",
      }
    );

    res.status(200).json({
      msg: "success",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(404).json({ msg: "Error Logging in user" });
  }
};

module.exports = { register, login };
