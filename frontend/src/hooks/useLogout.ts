import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
  const { dispatch }: { dispatch: any } = useAuthContext()

  const logout = () => {
    localStorage.removeItem("user")

    dispatch({ type: "LOGOUT" })
  }

  return { logout }
}
