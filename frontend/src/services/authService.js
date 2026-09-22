import axios from 'axios'

import { API_BASE_URL, tokenStorage } from './apiClient'
import { userService } from './userService'

export const authService = {
  async login(username, password) {
    const { data } = await axios.post(`${API_BASE_URL}/auth/token/`, { username, password })
    tokenStorage.setTokens(data.access, data.refresh)
    return userService.me()
  },
  logout() {
    tokenStorage.clear()
  },
  isAuthenticated() {
    return Boolean(tokenStorage.getAccess())
  },
  currentUser() {
    return userService.me()
  },
}
