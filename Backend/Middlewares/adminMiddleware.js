import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not authorized. Login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.userId) {
      req.admin = {
        id: decoded.adminId,
        email: decoded.email,
      };
      next();
    } else {
      return res.json({ success: false, message: "Invalid token. Login again" });
    }
  } catch (err) {
    console.error("userAuth error:", err);
    res.json({ success: false, message: "Token verification failed" });
  }
};

export default userAuth;
