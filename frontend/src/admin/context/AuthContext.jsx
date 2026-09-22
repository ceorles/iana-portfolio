import { useEffect, useState } from 'react'

import { authService } from '../../services/authService'
import { AuthContext } from './authContextInstance'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time auth check on mount
      setChecking(false)
      return
    }
    authService
      .currentUser()
      .then(setUser)
      .catch(() => {
        authService.logout()
        setUser(null)
      })
      .finally(() => setChecking(false))
  }, [])

  async function login(username, password) {
    const loggedInUser = await authService.login(username, password)
    setUser(loggedInUser)
    return loggedInUser
  }

  function logout() {
    authService.logout()
    setUser(null)
  }

  const value = { user, checking, isAuthenticated: Boolean(user), login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
