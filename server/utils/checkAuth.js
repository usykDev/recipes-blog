import jwt from "jsonwebtoken";

// middleware for check jwt
export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id; // put id in req.  // userId will be available through this mw

      next();
    } catch (err) {
      return res.json({
        message: "No access",
      });
    }
  } else {
    return res.json({
      message: "No access",
    });
  }
};
