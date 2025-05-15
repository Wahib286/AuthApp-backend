const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

exports.login = async (req, res) => {
  try {
    //fetch email and password
    const { email, password } = req.body;

    //check if feild is filled or not
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill the details",
      });
    }

    //check for registered user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not Exist",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    //verify password and generate jwt token
    if (await bcrypt.compare(password, user.password)) {
      //password matched
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("Wahib_Cookie", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User successfully Logged in",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Error Incorrect",
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};
