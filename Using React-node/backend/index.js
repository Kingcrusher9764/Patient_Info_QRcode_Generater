const express = require("express")
const bodyParser = require("body-parser")
const userRouter = require("./routes/userRoutes")
const dotenv = require("dotenv")
// const mongoose = require("mongoose")
const ConnectDB = require("./controllers/db_conn")
const cors = require("cors")

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

ConnectDB()
// mongoose.connect(process.env.DB_URI).then(() => console.log("Database connected!")).catch((err) => console.log(err))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: `${process.env.ORIGIN}`, credentials: true }))
app.use("/api/", userRouter)

app.listen(port, () => {
    console.log(`Server started at Port: ${port}`)
})