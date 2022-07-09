const router = require("mongoose").Router()
const User = require("../models/user")

router.post("/", async (request, response) => {
  const { username, password } = request.body

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
