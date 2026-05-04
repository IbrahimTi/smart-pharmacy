const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

const register = async (req, res) => {
  try {
    console.log("STEP 1 - Request received");
    console.log("STEP 2 - Body:", req.body);
    
    const { name, email, password, role } = req.body;
    
    console.log("STEP 3 - name:", name);
    console.log("STEP 4 - email:", email);
    console.log("STEP 5 - Checking existing user...");
    
    const existingUser = await User.findOne({ email });
    
    console.log("STEP 6 - existingUser:", existingUser);
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "Email already registered" 
      });
    }

    console.log("STEP 7 - Creating user...");
    
    const user = await User.create({ name, email, password, role });
    
    console.log("STEP 8 - User created:", user);
    
    const token = generateToken(user._id, user.role);
    
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    });
  } catch (error) {
    console.log("STEP ERROR NAME:", error.name);
    console.log("STEP ERROR MSG:", error.message);
    console.log("STEP ERROR FULL:", error);
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Please provide email and password" });
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password" });
    if (!user.isActive) return res.status(401).json({ success: false, message: "Your account has been deactivated" });
    const token = generateToken(user._id, user.role);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, getMe };