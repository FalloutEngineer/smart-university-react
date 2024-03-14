const { isSuperAdmin } = require("./permissionsCheckers")

const isUserEditable = (senderPermissions, userPermissions) => {
  return isSuperAdmin(senderPermissions) && !isSuperAdmin(userPermissions)
}

module.exports = isUserEditable
