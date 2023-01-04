const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
    
  const user = await User.findOne({ email });

  const comparePass = bcrypt.compareSync(password, user.password);

  if (!comparePass || !user) {
    throw new Unauthorized("Email or password is wrong");
  }
  const payload = {
      id: user._id,
    
  };
    if (user.token) {
        console.log("token1", user.token)
        const userId = await User.findByIdAndUpdate(user._id, { token:user.token });
       res.json({
    status: "success",
    code: 200,
    token:user.token,
    ResponseBody: userId,
  });
    } else {
        const tokens = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
        console.log("token2", tokens)
        const userId = await User.findByIdAndUpdate(user._id, { token:tokens });
          res.json({
    status: "success",
    code: 200,
    token:tokens,
    ResponseBody: { ...userId._doc, token: tokens }
  })
}
//   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });

//   const userId = await User.findByIdAndUpdate(user._id, { token });
    // console.log(token === user.token)
//   res.json({
//     status: "success",
//     code: 200,
//     token,
//     ResponseBody: userId,
//   });
};

module.exports = login;
