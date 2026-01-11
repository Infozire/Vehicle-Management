export const isApproved = (req, res, next) => {
  if (!req.user.isApproved) {
    return res.status(403).json({ message: "Your account is not approved by admin" });
  }
  next();
};
