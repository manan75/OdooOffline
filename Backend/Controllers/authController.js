import db from "../Config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  const { name, email, password, address, city } = req.body;

  if (!name || !email || !password || !address || !city) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    //  Check if user exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.json({ success: false, message: "User already exists" });
    }

    //  Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    //  Insert new user
    const [result] = await db.query(
      `INSERT INTO users (name, email, password_hash, address, city, role)
       VALUES (?, ?, ?, ?, ?, 'user')`,
      [name, email, hashPassword, address, city]
    );

    return res.json({
      success: true,
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Missing credentials" });
  }

  try {
    //  Check if user exists in MySQL
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = rows[0];

    //  Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    //  Generate JWT token
    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    // 4️⃣ Send token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      userId: user.user_id,
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


//admin login logic

export const adminLogin = async(req,res)=>{
      const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Missing credentials" });
  }

  try {
    // Explicitly select password field because it's hidden by default
    const admin = await adminSchema.findOne({ email }).select('+password');

    if (!admin) {
      return res.json({ success: false, message: "User not found" });
    }

   

    if (password!=admin.password) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
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
      adminId: admin._id,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}