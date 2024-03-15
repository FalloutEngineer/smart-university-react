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

// can edit at least one

export const canEditAtLeastOneBuilding = (permissions: any) => {
  return isEditor(permissions) || permissions?.buildings.length > 0
}

export const canEditAtLeastOneFloor = (permissions: any) => {
  return isEditor(permissions) || permissions?.floors.length > 0
}

export const canEditAtLeastOneFaculty = (permissions: any) => {
  return isEditor(permissions) || permissions?.faculties.length > 0
}

export const canEditAtLeastOneRoom = (permissions: any) => {
  return isEditor(permissions) || permissions?.rooms.length > 0
}

//can edit this

export const canEditThisBuilding = (building: any, permissions: any) => {
  return isEditor(permissions) || permissions?.rooms.includes(building)
}

export const canEditThisFloor = (floor: any, permissions: any) => {
  return isEditor(permissions) || permissions?.floors.includes(floor)
}

export const canEditThisFaculty = (faculty: any, permissions: any) => {
  return isEditor(permissions) || permissions?.faculties.includes(faculty)
}

export const canEditThisRoom = (room: any, permissions: any) => {
  return isEditor(permissions) || permissions?.rooms.includes(room)
}
