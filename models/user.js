const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment"
  }]
})

userSchema.set("toJSON", {
  transform: (document, obj) => {
    delete obj.__v
  }
})

module.exports = mongoose.model("User", userSchema)
