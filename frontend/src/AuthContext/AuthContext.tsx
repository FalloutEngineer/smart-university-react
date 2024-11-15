import { useReducer, createContext, useEffect } from "react"
import { useCookies } from "react-cookie"

export const AuthContext = createContext(null)

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload }
    case "LOGOUT":
      return { user: null }
    default:
      return state
  }
}

export default function AuthContextProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  })
  const [cookies, setCookie] = useCookies(["token"])

  useEffect(() => {
    const token = cookies.token
    if (token) {
      dispatch({ type: "LOGIN", payload: token })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
