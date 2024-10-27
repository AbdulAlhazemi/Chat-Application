import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUpUser = async (req, res) => {
  try {
    const { username, password, fullName, confirmPassword, gender } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate profile picture URL
    const boyProfilePic = `http://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `http://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create new user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword, // Save the hashed password
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    });

    // Save user to the database
    await newUser.save();

    // Respond with user details
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const loginUser = (req, res) => {
  try {
    const { username, password } = req.body;
  } catch (error) {

  }
}


export const logoutUser = (req, res) => {
  console.log('jkfghiuweg')
}