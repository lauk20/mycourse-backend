const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  name: String,
  due: Date,
  assignments: [{
    type: String,
    //ref: 'assignments' to be implemented
  }],
})

courseSchema.set("toJSON", {
  transform: (document, obj) => {
    delete obj.__v
  }
})

module.exports = mongoose.model("Course", courseSchema)
