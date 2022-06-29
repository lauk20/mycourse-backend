const router = require("express").Router()
const Course = require("../models/course")

router.get("/", (request, response) => {
  Course.find({}).populate("assignments").then((courses) => {response.json(courses)})
})

router.post("/", async (request, response) => {
  const course = new Course({
    name: request.body.name,
  })

  const savedCourse = await course.save()

  response.json(savedCourse)
})

module.exports = router;
