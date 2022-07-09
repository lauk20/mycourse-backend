require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")

const mongoose = require("mongoose")
const url = process.env.MONGODB
mongoose.connect(url)
  .then(() => {
    console.log("Connection to MongoDB established")
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  })

const courseRouter = require("./controllers/courses")
const assignmentRouter = require("./controllers/assignments")
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

app.use(cors())
app.use(express.json())
app.use("/api/courses", courseRouter)
app.use("/api/assignments", assignmentRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

app.listen(3001, () => {
  console.log("Server running on port 3001")
})
