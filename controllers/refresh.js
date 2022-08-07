const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")

router.get("/", async (request, response, next) => {
  let refreshToken = request.cookies["refreshToken"]

  /*
  const decodedToken = jwt.verify(refreshToken, process.env.JWTTOKEN, (err, decoded) => {
    if (err && err.name == "TokenExpiredError") {
      response.cookie("refreshToken", "", {
        httpOnly: true,
        expires: new Date(0),
        maxAge: new Date(0)
      })
      response.status(401).json({error: "expired refresh token"})

      next(err);
    }

    return decoded;
  });
  */

  let decodedToken = null;
  try {
    decodedToken = jwt.verify(refreshToken, process.env.JWTTOKEN)
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      response.cookie("refreshToken", "", {
        httpOnly: true,
        expires: new Date(0),
        maxAge: new Date(0)
      })
      return response.status(401).json({error: "expired refresh token"})
    }
  }

  if (!decodedToken || !decodedToken.id) {
    const err = new Error("Invalid Refresh Token");
    err.status = 401;
    response.cookie("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0),
      maxAge: new Date(0)
    })
    return response.status(401).json({error: "invalid refresh token"})
  }

  const username = decodedToken.username;
  let tokenObj = {
    username: decodedToken.username,
    id: decodedToken.id,
  }

  const token = jwt.sign(tokenObj, process.env.JWTTOKEN, {
    expiresIn: "1h"
  })

  tokenObj["refresh"] = process.env.JWTTOKEN;

  refreshToken = jwt.sign(tokenObj, process.env.JWTTOKEN, {
    expiresIn: "30d"
  })

  response.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  })
  //console.log(response)
  return response.status(200).json({ token, username })
})

module.exports = router
