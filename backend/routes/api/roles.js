const Router = require("express")
const router = new Router()
const bcrypt = require("bcryptjs")
const requireAuth = require("../../middleware/requireAuth.js")

const Role = require("../../models/role.js")
const { isSuperAdmin } = require("../../util/permissionsCheckers.js")

//get all
router.get("/", requireAuth, async (req, res) => {
  try {
    if (isSuperAdmin(req.role)) {
      const roles = await Role.find()
      res.json(roles)
    } else {
      res.status().json({ message: "Access restricted" })
    }
  } catch (err) {
    res.status(400).json({ message: "Access restricted" })
  }
})

//get one
router.get("/:name", requireAuth, getRole, (req, res) => {
  if (isSuperAdmin(req.role)) {
    res.json(res.role)
  } else {
    res.status(400).json({ message: "Access restricted" })
  }
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

//create one
//TODO: REQUIRE SUPERADMIN RIGHTS
router.post("/", requireAuth, async (req, res) => {
  try {
    console.log(req.role)
    if (isSuperAdmin(req.role)) {
      let {
        name,
        isSuperAdmin,
        isAdmin,
        isEditor,
        canEditDamage,
        buildings,
        floors,
        faculties,
        rooms,
      } = req.body

      if (!(buildings instanceof Array)) {
        buildings = [buildings]
      }

      if (!(floors instanceof Array)) {
        floors = [floors]
      }

      if (!(faculties instanceof Array)) {
        faculties = [faculties]
      }

      if (!(rooms instanceof Array)) {
        rooms = [rooms]
      }

      const candidate = await Role.findOne({ name })
      if (candidate) {
        return res.status(400).json({ message: "Така роль вже існує" })
      }
      const role = new Role({
        name,
        isSuperAdmin,
        isAdmin,
        isEditor,
        canEditDamage,
        buildings,
        floors,
        faculties,
        rooms,
      })
      await role.save()
      return res.json({ message: `Роль ${name} створено` })
    } else {
      res.status(400).json({ message: "Access restricted" })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// // delete one
// TODO: Якщо користувач має права видаляти
router.delete("/:name", requireAuth, getRole, async (req, res) => {
  try {
    if (isSuperAdmin(req.role)) {
      await res.role.remove()
      res.json({ message: "Роль видалено" })
    } else {
      res.status(400).json({ message: "Access restricted" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//edit one
//TODO: REQUIRE SUPERADMIN RIGHTS
router.patch("/:name", requireAuth, getRole, async (req, res) => {
  if (req.body.name != null) {
    res.role.name = req.body.name
  }

  if (req.body.isSuperAdmin != null) {
    res.role.isSuperAdmin = req.body.isSuperAdmin
  }

  if (req.body.isAdmin != null) {
    res.role.isAdmin = req.body.isAdmin
  }

  if (req.body.isEditor != null) {
    res.role.isEditor = req.body.isEditor
  }

  if (req.body.canEditDamage != null) {
    res.role.canEditDamage = req.body.canEditDamage
  }

  if (req.body.buildings != null) {
    res.role.buildings = req.body.buildings
  }

  if (req.body.floors != null) {
    res.role.floors = req.body.floors
  }

  if (req.body.faculties != null) {
    res.role.faculties = req.body.faculties
  }

  if (req.body.rooms != null) {
    res.role.rooms = req.body.rooms
  }

  try {
    if (isSuperAdmin(req.role)) {
      const updatedRole = await res.role.save()
      res.json(updatedRole)
    } else {
      res.status(400).json({ message: "Access restricted" })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
