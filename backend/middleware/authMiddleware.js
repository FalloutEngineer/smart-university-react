const jwt = require("jsonwebtoken")
const { secret } = require("../config")

const User = require("../models/user")

module.exports = async function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    const token = req.cookies.token
    if (!token) {
      const tokenHeaders = req.headers.authorization.split(" ")[1]
      if (!tokenHeaders) {
        res.redirect("/login")
      } else {
        next()
      }
    } else {
      const decodedData = jwt.verify(token, secret)
      console.log(decodedData)
      //   req.user = await User.findOne({ decodedData }).select("login")
      next()
    }
  } catch (e) {
    console.log(e)
    res.redirect("/login")
  }
}
