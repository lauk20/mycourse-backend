const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")

router.get("/", async (request, response) => {
  let refreshToken = request.cookies["refreshToken"]

  const decodedToken = jwt.verify(refreshToken, process.env.JWTTOKEN, (err, decoded) => {
    if (err && err.name == "TokenExpiredError") {
      return response.status(401).json({error: "expired refresh token"})
    }

    return decoded;
  });

  if (!decodedToken.id) {
    const err = new Error("Invalid Refresh Token");
    err.status = 401;

    return next(err);
  }

  const username = decodedToken.username;
  let tokenObj = {
    username: decodedToken.username,
    id: decodedToken.id,
  }

  const token = jwt.sign(tokenObj, process.env.JWTTOKEN, {
    expiresIn: "1m"
  })

  tokenObj["refresh"] = process.env.JWTTOKEN;

  refreshToken = jwt.sign(tokenObj, process.env.JWTTOKEN, {
    expiresIn: "30d"
  })

  response.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  })
  console.log(response)
  response.status(200).json({ token, username })
})

module.exports = router
