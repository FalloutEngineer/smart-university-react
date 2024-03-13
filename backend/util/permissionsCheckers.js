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

module.exports = { isSuperAdmin, isAdmin, isEditor, canEditDamage }
