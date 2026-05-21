const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../../models/auth/User");
<<<<<<< HEAD
=======

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "mysecretkey",
    { expiresIn: "1d" }
  );
};
>>>>>>> 4e31da7eac91c44b1e29d803566903314d3bfa9c

const register = async (req, res) => {
  try {
    const { name, email, password, phone, role, isActive } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
<<<<<<< HEAD
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
=======
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
>>>>>>> 4e31da7eac91c44b1e29d803566903314d3bfa9c
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      role: role || "cashier",
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
<<<<<<< HEAD
      return res
        .status(400)
        .json({ message: "Invalid credentials (User not found)" });
=======
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
>>>>>>> 4e31da7eac91c44b1e29d803566903314d3bfa9c
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
<<<<<<< HEAD
      return res
        .status(400)
        .json({ message: "Invalid credentials (Wrong password)" });
=======
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
>>>>>>> 4e31da7eac91c44b1e29d803566903314d3bfa9c
    }

    if (!user.isActive) {
      return res.status(403).json({
<<<<<<< HEAD
=======
        success: false,
>>>>>>> 4e31da7eac91c44b1e29d803566903314d3bfa9c
        message: "Your account is deactivated. Please contact an admin.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: createToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
