const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password, subscription, name } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict("Email in use");
    }
    const avatar = gravatar.url(email);

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newsUser = await User.create({
      email,
      name,
      subscription,
      password: hashPassword,
      avatar,
    });
    const payload = {
      id: newsUser._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });

    const newUser = await User.findByIdAndUpdate(newsUser._id, { token });

    res.status(201).json({
      status: "success",
      code: 201,
      token: token,
        user: { ...newUser._doc, token: token },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = register;
