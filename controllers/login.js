const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")

router.post("/", async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })
  const password = (user === null) ? false : await bcrypt.compare(password, user.passwordHash)

  if (!user || !password) {
    return response.status(401).json({error: "invalid username or password"})
  }

  const tokenObj = {
    username,
    id: user._id
  }

  const token = jwt.sign(tokenObj, process.env.JWTTOKEN)

  response.status(200).json({ token, username })
})

module.exports = router
