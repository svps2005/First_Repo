
import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    "supersecretkey", // we’ll fix to env later
    { expiresIn: "7d" }
  );
};

export default generateToken;