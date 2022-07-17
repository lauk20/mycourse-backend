const router = require("express").Router()
const Assignment = require("../models/assignment")
const Course = require("../models/course")

router.get("/", (request, response) => {
  Assignment.find({}).populate("course").then((assignments) => {response.json(assignments)})
})

router.post("/", async (request, response) => {
  const assignment = new Assignment({
    content: request.body.content,
    due: request.body.due,
    course: request.body.course,
    details: request.body.details,
  })

  const savedAssignment = await assignment.save()

  const course = await Course.findById(request.body.course)
  course.assignments = course.assignments.concat(savedAssignment._id)
  await course.save()

  console.log(course)

  response.json(savedAssignment)
})

router.put("/:id", async (request, response) => {
  const id = request.params.id

  const assignment = await Assignment.findByIdAndUpdate(id, request.body, { new: true });

  response.json(assignment)
})

module.exports = router;
