const router = require("express").Router()
const Course = require("../models/course")

const getToken = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")){
    return authorization.substring(7)
  }

  return null;
}

router.get("/", (request, response) => {
  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.JWTTOKEN);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid token" })
  }

  Course.find({user: decodedToken.id}).populate("assignments").then((courses) => {response.json(courses)})
})

router.post("/", async (request, response) => {
  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.JWTTOKEN);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid token" })
  }

  const course = new Course({
    name: request.body.name,
    user: decodedToken.id,
  })

  const savedCourse = await course.save()

  response.json(savedCourse)
})

module.exports = router;
