import db from "../Config/db.js";



export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user by ID from MySQL
    const [rows] = await db.query(
      "SELECT user_id, name, email, address, city, role, created_at FROM users WHERE user_id = ?",
      [userId]
    );

    if (rows.length > 0) {
      const user = rows[0];
      res.json({
        success: true,
        userData: {
          userId: user.user_id,
          username: user.name,
          email: user.email,
          address: user.address,
          city: user.city,
          role: user.role,
          createdAt: user.created_at
        },
      });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.error("getUserData error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
