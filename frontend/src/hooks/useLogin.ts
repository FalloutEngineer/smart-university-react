import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

const API_URL = process.env.REACT_APP_API_URL

const loginAPI = API_URL + `/api/auth/login`

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch }: { dispatch: any } = useAuthContext()

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(loginAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json))

      dispatch({ type: "LOGIN", paload: json })

      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}
