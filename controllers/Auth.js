const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.SignUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    //secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Password not being hashed",
      });
    }

    //create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const savedData = await user.save();

    return res.status(200).json({
      success: true,
      message: "User saved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered please try again later",
    });
  }
};
