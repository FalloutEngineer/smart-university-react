export const isSuperAdmin = (permissions: any) => {
  return permissions?.isSuperAdmin
}

export const isAdmin = (permissions: any) => {
  return permissions?.isSuperAdmin || permissions?.isAdmin
}

export const isEditor = (permissions: any) => {
  return isAdmin(permissions) || permissions?.isEditor
}

export const canEditDamage = (permissions: any) => {
  return isAdmin(permissions) || permissions?.canEditDamage
}

// module.exports = { isSuperAdmin, isAdmin, isEditor, canEditDamage }
