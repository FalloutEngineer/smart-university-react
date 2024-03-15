const isSuperAdmin = (permissions) => {
  return permissions.isSuperAdmin
}

const isAdmin = (permissions) => {
  return permissions.isSuperAdmin || permissions.isAdmin
}

const isEditor = (permissions) => {
  return isAdmin(permissions) || permissions.isEditor
}

const canEditDamage = (permissions) => {
  return isAdmin(permissions) || permissions.canEditDamage
}

const canEditThisBuilding = (building, permissions) => {
  return isEditor(permissions) || permissions?.rooms.includes(building)
}

const canEditThisFloor = (floor, permissions) => {
  return isEditor(permissions) || permissions?.floors.includes(floor)
}

const canEditThisFaculty = (faculty, permissions) => {
  return isEditor(permissions) || permissions?.faculties.includes(faculty)
}

const canEditThisRoom = (room, permissions) => {
  return isEditor(permissions) || permissions?.rooms.includes(room)
}

module.exports = {
  isSuperAdmin,
  isAdmin,
  isEditor,
  canEditDamage,
  canEditThisBuilding,
  canEditThisFloor,
  canEditThisFaculty,
  canEditThisRoom,
}
