const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")

router.post("/", async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })
  const passwordCorrect = (user === null) ? false : await bcrypt.compare(password, user.passwordHash)

  if (!user || !passwordCorrect) {
    return response.status(401).json({error: "invalid username or password"})
  }

  let tokenObj = {
    username,
    id: user._id
  }

  const token = jwt.sign(tokenObj, process.env.JWTTOKEN, {
    expiresIn: "20s"
  })

  tokenObj["refresh"] = process.env.JWTTOKEN;

  const refreshToken = jwt.sign(tokenObj, process.env.JWTTOKEN, {
    expiresIn: "30d"
  })

  response.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  })
  response.status(200).json({ token, username })
})

module.exports = router
