const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.index = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    message: "Successfully loaded",
    data: users,
  });
};

exports.register = async (req, res, next) => {
  const { username, password } = req.body;

  const user = new User({
    username: username,
    password: password,
  });

  await user.save();

  res.status(201).json({
    message: "Successfully registered",
  });
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = User.findOne({ username: username });

  if (!user) {
    res.status(404).json({
      message: "username not found",
    });
  }

  if (user.password !== password) {
    res.status(404).json({
      message: "password not match",
    });
  }

  const token = await jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    "John",
    { expiresIn: "1 day" }
  );

  const expires_in = jwt.decode(token);

  return res.status(200).json({
    access_token: token,
    expires_in: expires_in.exp,
    token_type: "Bearer",
    data: user,
  });
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { username, password } = req.body;

  await Blog.findByIdAndUpdate(id, {
    username: username,
    password: password,
  });

  res.status(200).json({
    message: "Successfully updated",
  });
};

exports.show = async (req, res, next) => {
  const { id } = req.params;

  //const blog = await Blog.findOne({_id:id});
  const blog = await Blog.findById(id);

  res.status(200).json({
    message: "Successfully get blog",
    data: blog,
  });
};
