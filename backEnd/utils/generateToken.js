import jwt from 'jsonwebtoken';

// Function to generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d', // Token expiration time
  });
};

// Function to set the JWT token as a cookie
const setTokenCookie = (token, res) => {
  res.cookie("jwt", token, { // Correct cookie name
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // Prevent XSS attacks
    sameSite: 'strict', // Prevent CSRF attacks
    secure: process.env.NODE_ENV !== 'development'
  });
};

export { generateToken, setTokenCookie };