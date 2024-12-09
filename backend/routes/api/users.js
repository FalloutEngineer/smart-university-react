const Router = require("express")
const router = new Router()
const bcrypt = require("bcryptjs")

const User = require("../../models/user.js")
const Role = require("../../models/role.js")

const requireAuth = require("../../middleware/requireAuth.js")
const isUserEditable = require("../../util/isUserEditable.js")

//get all
router.get("/", requireAuth, async (req, res) => {
  try {
    if (req.role.isSuperAdmin === true) {
      const users = await User.find()

      let censoredUsers = users.map(async (user) => {
        const { password, ...newUser } = user._doc
        const userRole = await Role.findOne({ _id: user.role })
        const isEditable = isUserEditable(req.role, userRole)
        return {
          ...newUser,
          isEditable: isEditable,
        }
      })
      Promise.all(censoredUsers)
        .then((data) => {
          res.json(data)
        })
        .catch((e) => {
          res.status(400).json({ message: e })
        })
    } else {
      res.status(400).json({ message: "Недостатньо прав" })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

//get one
router.get("/:username", requireAuth, getUser, async (req, res) => {
  const { password, ...censoredUser } = res.user._doc
  // const isEditable = isUserEditable(req.requesterID, res.user.id)
  const userRole = await Role.findOne({ _id: res.user.role })
  const isEditable = isUserEditable(req.role, userRole)
  if (req.role.isSuperAdmin === true) {
    res.json({
      ...censoredUser,
      isEditable: isEditable,
    })
  } else {
    res.status(400).json({ message: "Недостатньо прав" })
  }
})

async function getUser(req, res, next) {
  let user

  try {
    user = await User.findOne({
      login: req.params.username,
    })
    if (user == null) {
      return res.status(404).json({ message: "Can't find user" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

//create one
//TODO: REQUIRE SUPERADMIN RIGHTS
router.post("/", requireAuth, async (req, res) => {
  try {
    if (req.role.isSuperAdmin === true) {
      const { login, name, role, password } = req.body
      const candidate = await User.findOne({ login })
      if (candidate) {
        return res.status(400).json({ message: "Такий користувач вже існує" })
      }
      const hashedPassword = bcrypt.hashSync(password, 7)
      const user = new User({ login, name, role, password: hashedPassword })
      await user.save()
      return res.json({ message: `Користувача ${login} створено` })
    } else {
      return res.status(400).json({ message: "Недостатньо прав" })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// delete one
// TODO: Якщо користувач має права видаляти
router.delete("/:username", requireAuth, getUser, async (req, res) => {
  try {
    const userRole = await Role.findOne({ _id: res.user.role })
    const isEditable = isUserEditable(req.role, userRole)
    if (isEditable) {
      await res.user.remove()
      res.json({ message: "Користувача видалено" })
    } else {
      res.status(400).json({ message: "Недостатньо прав" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//edit one
//TODO: REQUIRE SUPERADMIN RIGHTS
router.patch("/:username", requireAuth, getUser, async (req, res) => {
  if (req.body.login != null) {
    res.user.login = req.body.login
  }

  if (req.body.name != null) {
    res.user.name = req.body.name
  }

  if (req.body.role != null) {
    res.user.role = req.body.role
  }

  if (req.body.password != null) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 7)
    res.user.password = hashedPassword
  }

  try {
    const userRole = await Role.findOne({ _id: res.user.role })
    const isEditable = isUserEditable(req.role, userRole)
    if (isEditable) {
      const updatedUser = await res.user.save()
      res.json(updatedUser)
    } else {
      res.status(400).json({ message: "Недостатньо прав" })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
