const router = require("express").Router()
const Course = require("../models/course")
const jwt = require("jsonwebtoken")

const getToken = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")){
    return authorization.substring(7)
  }

  return null;
}

router.get("/", (request, response) => {
  const decodedToken = request.decodedToken;

  Course.find({user: decodedToken.id}).populate("assignments").then((courses) => {response.json(courses)})
})

router.post("/", async (request, response) => {
  const decodedToken = request.decodedToken;

  const course = new Course({
    name: request.body.name,
    user: decodedToken.id,
  })

  const savedCourse = await course.save()

  response.json(savedCourse)
})

module.exports = router;
