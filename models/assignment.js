const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema({
  content: String,
  due: Date,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }
})

assignmentSchema.set("toJSON", {
  transform: (document, obj) => {
    delete obj.__v
  }
})

module.exports = mongoose.model("Assignment", assignmentSchema)
