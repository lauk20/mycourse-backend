require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")

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
const refreshRouter = require("./controllers/refresh")
const authorization = require("./middlewares/Authorization")

app.use(cors({
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
  origin: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
app.use("/api/refresh", refreshRouter)
app.use(authorization)
app.use("/api/courses", courseRouter)
app.use("/api/assignments", assignmentRouter)

app.listen(3001, () => {
  console.log("Server running on port 3001")
})
