import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/userSchema.js'

// Register a new user
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return res.json({
      success: true,
      message: "User registered successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login logic
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Missing credentials" });
  }

  try {
    // Explicitly select password field because it's hidden by default
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // change to true if using HTTPS in production
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// Logout logic
export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, // change to true in production (HTTPS)
    sameSite: 'Lax',
  });

  return res.json({
    success: true,
    message: "Logged out successfully",
  });
};
