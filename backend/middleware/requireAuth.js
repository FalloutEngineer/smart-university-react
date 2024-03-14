const jwt = require("jsonwebtoken")
const { secret } = require("../config")

const User = require("../models/user")
const Role = require("../models/role")

const requireAuth = async (req, res, next) => {
  let { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" })
  }

  let token = authorization.split(" ")[1]

  try {
    let { id } = jwt.verify(token, secret)
    req.user = await User.findOne({ _id: id })
      .select("login")
      .select("name")
      .select("role")

    req.role = await findRole(req.user.role)
    next()
  } catch (e) {
    console.log(e)
    res.status(401).json({ error: "Request is not authorized" })
  }
}

async function findRole(id) {
  const role = await Role.findOne({ _id: id })
  return role
}

module.exports = requireAuth
