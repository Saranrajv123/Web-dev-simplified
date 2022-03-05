require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const subscribersRouter = require("./routes/subscribers")

const app = express()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection

db.on("error", (error) => console.log("err", error))
db.once("open", () => console.log("Connected to databases"))

app.use(express.json())
app.use("/subscribers", subscribersRouter)


app.listen(8000, () => console.log("hello world"))
