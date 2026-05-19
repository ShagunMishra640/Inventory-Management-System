const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Controller
const register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // User Object
    const user = {
      name,
      email,
      password: hashedPassword,
    };

    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// Login Controller
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Generate JWT Token
    const token = jwt.sign(
      { email },
      "mysecretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        email,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  register,
  login,
};