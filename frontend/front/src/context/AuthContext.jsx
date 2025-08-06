import jwt_decode from 'jwt-decode'
import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const decoded = jwt_decode(token)
          setUser(decoded)
          setIsAuthenticated(true)
        } catch (error) {
          console.error("Invalid token:", error)
          logout()
        }
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  const login = (token) => {
    localStorage.setItem('token', token)
    const decoded = jwt_decode(token)
    setUser(decoded)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
}