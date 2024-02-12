import { useCookies } from "react-cookie"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
  const { dispatch }: { dispatch: any } = useAuthContext()

  const [cookies, setCookie, removeCookie] = useCookies(["token"])

  const logout = () => {
    removeCookie("token")

    dispatch({ type: "LOGOUT" })
  }

  return { logout }
}
