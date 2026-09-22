import apiClient from './apiClient'

/**
 * Builds a standard set of CRUD methods for a DRF resource endpoint.
 * Keeps every per-resource service file a thin, declarative wrapper.
 */
export function createResourceService(path) {
  const base = path.endsWith('/') ? path : `${path}/`

  return {
    list: (params) => apiClient.get(base, { params }).then((res) => res.data),
    get: (id) => apiClient.get(`${base}${id}/`).then((res) => res.data),
    create: (payload) => apiClient.post(base, toRequestBody(payload)).then((res) => res.data),
    update: (id, payload) =>
      apiClient.patch(`${base}${id}/`, toRequestBody(payload)).then((res) => res.data),
    remove: (id) => apiClient.delete(`${base}${id}/`).then((res) => res.data),
  }
}

function toRequestBody(payload) {
  const hasFile = Object.values(payload).some((value) => value instanceof File)
  if (!hasFile) return payload

  const formData = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined) return
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, value)
    }
  })
  return formData
}
