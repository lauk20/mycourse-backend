const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")


const validateUsername = (username) => {
  if (username.length > 20 || username.length < 3) {
    return false;
  }

  const regex = /^[a-z0-9]{3,20}$/;

  if (!username.match(regex)) {
    return false;
  }

  return true;
}

const validatePassword = (password) => {
  return (password.length <= 20 && password.length >= 8);
}

router.post("/", async (request, response) => {
  const { username, password } = request.body
  const takenUser = await User.findOne({username: username})
  if (takenUser) {
    return response.status(400).json({error: "username already taken"})
  }

  if (!validateUsername(username)) {
    return response.status(400).json({error: "username does not meet requirements"})
  }

  if (!validatePassword(password)) {
    return response.status(400).json({error: "password does not meet requirements"})
  }

  const saltrounds = 12
  const hash = await bcrypt.hash(password, saltrounds);

  const user = new User({
    username: username,
    passwordHash: hash,
  })

  const savedUser = await user.save();

  response.json(savedUser);
})

module.exports = router
