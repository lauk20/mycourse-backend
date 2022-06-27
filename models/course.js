const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  name: String,
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment"
  }],
})

courseSchema.set("toJSON", {
  transform: (document, obj) => {
    delete obj.__v
  }
})

module.exports = mongoose.model("Course", courseSchema)
