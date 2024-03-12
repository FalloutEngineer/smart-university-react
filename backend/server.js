require("dotenv").config()

const PORT = process.env.PORT || 5000

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const session = require("express-session")
const { secret } = require("./config.js")
const cookieParser = require("cookie-parser")

const cors = require("cors")

app.use(cors())

const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("Connected to database"))

app.set("view engine", "ejs")

app.use(express.json())

app.use(express.static(path.resolve(__dirname, "static")))

app.use(session({ secret: secret, cookie: { sameSite: "strict" } }))
app.use(cookieParser())

const buildingsRoute = require("./routes/api/buildings")
const floorsRoute = require("./routes/api/floors")
const roomsRoute = require("./routes/api/rooms")
const facultiesRoute = require("./routes/api/faculties")
const pulpitsRoute = require("./routes/api/pulpits")

const homePageRoute = require("./routes/api/homePage.js")
const facultiesPageRoute = require("./routes/api/facultiesPage.js")
const buildingsPageRoute = require("./routes/api/buildingsPage.js")

const facultyCardRoute = require("./routes/api/facultyCard.js")
const pulpitCardRoute = require("./routes/api/pulpitCard.js")

const rolesRoute = require("./routes/api/roles.js")

const damagePost = require("./routes/api/damagePost.js")

app.use("/api/buildings", buildingsRoute)
app.use("/api/floors", floorsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/faculties", facultiesRoute)
app.use("/api/pulpits", pulpitsRoute)

app.use("/api/homePage", homePageRoute)
app.use("/api/facultiesPage", facultiesPageRoute)
app.use("/api/buildingsPage", buildingsPageRoute)

app.use("/api/facultyCard", facultyCardRoute)
app.use("/api/pulpitCard", pulpitCardRoute)

app.use("/api/damagePost", damagePost)

app.use("/api/roles", rolesRoute)

const authRouter = require("./routes/api/auth")
app.use("/api/auth", authRouter)

app.get("*", function (req, res) {
  res.status(404).send("Requested address doesn't exist")
})

const start = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
