const jwt = require("jsonwebtoken")
const { secret } = require("../config")

const User = require("../models/user")
const Role = require("../models/role")

const requireAuth = (permissions) => {
  return async (req, res, next) => {
    const { authorization } = req.headers

    console.log(req.headers)

    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" })
    }

    const token = authorization.split(" ")[1]

    try {
      const { id } = jwt.verify(token, secret)
      req.user = await User.findOne({ id })
        .select("login")
        .select("name")
        .select("role")

      const role = await findRole(req.user.role)

      console.log("user role: ", role)
      next()
    } catch (e) {
      console.log(e)
      res.status(401).json({ error: "Request is not authorized" })
    }
  }
}

async function findRole(id) {
  const role = await Role.findOne({ id })
  return role
}

module.exports = requireAuth
