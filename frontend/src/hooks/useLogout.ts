import { useCookies } from "react-cookie"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
  const { dispatch }: { dispatch: any } = useAuthContext()

  const [cookies, setCookie, removeCookie] = useCookies(["token", "role"])

  const logout = () => {
    removeCookie("token")
    removeCookie("role")

    dispatch({ type: "LOGOUT" })
  }

  return { logout }
}
