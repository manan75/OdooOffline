import User from "../Models/userSchema.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (user) {
      res.json({
        success: true,
        userData: {
          userId: user._id,
          username: user.username,
          email: user.email
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
