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
router.get("/:name", requireAuth, getRole, (req, res) => {
  res.json(res.role)
})

async function getRole(req, res, next) {
  let role

  try {
    role = await Role.findOne({
      name: req.params.name,
    })
    if (role == null) {
      return res.status(404).json({ message: "Can't find role" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.role = role
  next()
}

//   name: { type: String, unique: true, required: true },
//   isSuperAdmin: { type: Boolean, unique: false, required: true },
//   isAdmin: { type: Boolean, unique: true, required: true },
//   isEditor: { type: Boolean, unique: false, required: true },
//   couldEditDamage: { type: Boolean, unique: false, required: true },
//   buildings: [{ type: ObjectId, ref: "Building" }],
//   floors: [[{ type: ObjectId, ref: "Floor" }]],
//   faculties: [{ type: ObjectId, ref: "Faculty" }],
//   rooms: [{ type: ObjectId, ref: "Room" }],

//create one
//TODO: REQUIRE SUPERADMIN RIGHTS
router.post("/createRole", requireAuth, async (req, res) => {
  try {
    const {
      name,
      isSuperAdmin,
      isAdmin,
      isEditor,
      couldEditDamage,
      buildings,
      floors,
      faculties,
      rooms,
    } = req.body

    const candidate = await Role.findOne({ name })
    if (candidate) {
      return res.status(400).json({ message: "Така роль вже існує" })
    }
    const role = new Role({
      name,
      isSuperAdmin,
      isAdmin,
      isEditor,
      couldEditDamage,
      buildings,
      floors,
      faculties,
      rooms,
    })
    await role.save()
    return res.json({ message: `Роль ${name} створено` })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

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
