import jwt from 'jsonwebtoken'
import User from '../models/user.model';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookie.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorised - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET,);
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorised - invalide token' });
    }
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    req.user = user

    next()
  } catch (error) {
    console.log('Error in protectRoute middileWare:', error.massage)
  }
}

export default protectRoute