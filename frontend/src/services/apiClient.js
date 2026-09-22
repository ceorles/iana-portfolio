import axios from 'axios'

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const ACCESS_TOKEN_KEY = 'iana_admin_access'
const REFRESH_TOKEN_KEY = 'iana_admin_refresh'

export const tokenStorage = {
  getAccess: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: (access, refresh) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, access)
    if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
}

const apiClient = axios.create({ baseURL: API_BASE_URL })

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let refreshPromise = null

async function refreshAccessToken() {
  const refresh = tokenStorage.getRefresh()
  if (!refresh) throw new Error('No refresh token available')

  const { data } = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, { refresh })
  tokenStorage.setTokens(data.access, refresh)
  return data.access
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const isAuthRoute = originalRequest?.url?.includes('/auth/token')

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true
      try {
        refreshPromise = refreshPromise || refreshAccessToken()
        const newAccess = await refreshPromise
        refreshPromise = null
        originalRequest.headers.Authorization = `Bearer ${newAccess}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        refreshPromise = null
        tokenStorage.clear()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
