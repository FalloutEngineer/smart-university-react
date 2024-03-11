const Router = require("express")
const router = new Router()
const bcrypt = require("bcryptjs")

const Role = require("../../models/role.js")

//get all
router.get("/", requireAuth, async (req, res) => {
  try {
    const roles = await Role.find()
    res.json(roles)
  } catch (err) {
    res.status().json({ message: err.message })
  }
})

//get one
// router.get("/:username", requireAuth, getUser, (req, res) => {
//   res.json(res.user)
// })

// async function getUser(req, res, next) {
//   let user

//   try {
//     user = await User.findOne({
//       username: req.params.username,
//     })
//     if (user == null) {
//       return res.status(404).json({ message: "Can't find user" })
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message })
//   }

//   res.user = user
//   next()
// }

// //create one
// //TODO: REQUIRE SUPERADMIN RIGHTS
// router.post("/createUser", requireAuth, async (req, res) => {
//   try {
//     const { login, name, role, password } = req.body
//     const candidate = await User.findOne({ login })
//     if (candidate) {
//       return res.status(400).json({ message: "Такий користувач вже існує" })
//     }
//     const hashedPassword = bcrypt.hashSync(password, 7)
//     const user = new User({ login, name, role, password: hashedPassword })
//     await user.save()
//     return res.json({ message: `Користувача ${login} створено` })
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

// // delete one
// // TODO: Якщо користувач має права видаляти
// router.delete("/:username", requireAuth, getUser, async (req, res) => {
//   try {
//     await res.user.remove()
//     res.json({ message: "Користувача видалено" })
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

// //edit one
// //TODO: REQUIRE SUPERADMIN RIGHTS
// router.patch("/:username", requireAuth, getFloor, async (req, res) => {
//   if (req.body.name != null) {
//     res.user.name = req.body.name
//   }

//   if (req.body.role != null) {
//     res.user.role = req.body.role
//   }

//   try {
//     const updatedUser = await res.user.save()
//     res.json(updatedUser)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

module.exports = router
