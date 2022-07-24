const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema({
  content: String,
  due: Date,
  details: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
})

assignmentSchema.set("toJSON", {
  transform: (document, obj) => {
    delete obj.__v
  }
})

module.exports = mongoose.model("Assignment", assignmentSchema)
