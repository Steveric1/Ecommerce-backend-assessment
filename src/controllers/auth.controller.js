const User = require('../models/User')
const { hashPassword, verifyHashedPassword, generateToken } = require('../utils/jwt');

const registerUser = async (req, res) => {
  try {
    console.log("regiter hit");
    const { email, password } = req.body;
    
    // check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exist',
      });
    }

    // hash password
    const hashed = await hashPassword(password);

    // create user
    const newUser = await User.create({
      email,
      password: hashed,
    });

    // exclude password from user data
    const { password: _, ...result } = newUser.toObject();
    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error creating user',
      error: err.message,
    });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user || !(await verifyHashedPassword(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // generate token
    const token = generateToken(user);

    // exclude user password from return data
    const { password: _, ...result } = user.toObject();
    return res.status(200).json({
      status: 'success',
      message: 'User login successfully',
      data: {
        user: result,
        token,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error login in',
      error: err.message,
    });
  }
}

module.exports = { registerUser, login };
