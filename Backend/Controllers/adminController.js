import adminSchema from "../Models/adminSchema";

export const getUserData = async (req, res) => {
  try {
    const adminId = req.admin.id;

    const admin = await adminSchema.findById(adminId);

    if (admin) {
      res.json({
        success: true,
        adminData: {
          adminId: admin._id,
          username: admin.username,
          email: admin.email
        },
      });
    } else {
      res.json({ success: false, message: "Admin not found" });
    }
  } catch (err) {
    console.error("getUserData error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
