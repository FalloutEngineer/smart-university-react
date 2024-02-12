const jwt = require("jsonwebtoken")
const { secret } = require("../config")

const User = require("../models/user")

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  console.log(req.headers)

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" })
  }

  const token = authorization.split(" ")[1]

  try {
    const { login } = jwt.verify(token, secret)
    req.user = await User.findOne({ login }).select("login")
    console.log(req.user)
    next()
  } catch (e) {
    console.log(e)
    res.status(401).json({ error: "Request is not authorized" })
  }
}

module.exports = requireAuth
