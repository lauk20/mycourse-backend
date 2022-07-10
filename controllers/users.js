const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

router.post("/", async (request, response) => {
  const { username, password } = request.body
  const takenUser = await User.findOne({username: username})
  if (takenUser) {
    return response.status(400).json({error: "username already taken"})
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
