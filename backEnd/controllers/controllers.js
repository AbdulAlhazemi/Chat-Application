import User from "../models/user.model";

export const signUpUser = async (req, res) => {
  try {
    const { username, password, fullName, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'password do not match' });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }




    const boyProfilePic = `http://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `http://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullName,
      username,
      password,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    })

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic
    })
  } catch (error) {
    console.log("Error in signup controller", error.massage);
    res.status(500).json({ error: "internal server error" });
  }
}


export const loginUser = (req, res) => {
  try {
    const { username, password } = req.body;
  } catch (error) {

  }
}


export const logoutUser = (req, res) => {
  console.log('jkfghiuweg')
}