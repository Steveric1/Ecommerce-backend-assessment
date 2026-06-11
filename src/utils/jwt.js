const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
}

const verifyHashedPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  generateToken,
  hashPassword,
  verifyHashedPassword,
};
