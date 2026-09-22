import apiClient from './apiClient'
import { createResourceService } from './resourceFactory'

export const userService = {
  ...createResourceService('users'),
  me: () => apiClient.get('users/me/').then((res) => res.data),
}
