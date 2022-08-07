const router = require("express").Router()

router.get("/", async (request, response) => {
  response.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
    maxAge: new Date(0)
  })

  return response.status(200).json("logged out");
})

module.exports = router
