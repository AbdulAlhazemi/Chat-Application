import express from 'express'

const router = express.Router();


router.get("/api/auth/signup", (req, res) => {
  console.log('signup route')
})

router.get("/api/auth/login", (req, res) => {
  console.log('login route')
})

router.get("/api/auth/logout", (req, res) => {
  console.log('logout route')
})

export default router