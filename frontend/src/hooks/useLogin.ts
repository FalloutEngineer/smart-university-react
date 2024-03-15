import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

const API_URL = process.env.REACT_APP_API_URL

const loginAPI = API_URL + `/api/auth/login`

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch }: { dispatch: any } = useAuthContext()

  const login = async (login: string, password: string) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(loginAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    })

    const json = await response.json()

    console.log(json.token)

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)

      return false
    }
    if (response.ok) {
      const token = json.token
      const role = JSON.stringify(json.role)

      document.cookie = `token=${token};`
      document.cookie = `role=${role};`

      dispatch({ type: "LOGIN", payload: token })

      setIsLoading(false)

      return true
    }

    return false
  }

  return { login, isLoading, error }
}
