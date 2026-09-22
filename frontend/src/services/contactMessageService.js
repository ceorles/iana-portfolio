import apiClient from './apiClient'
import { createResourceService } from './resourceFactory'

export const contactMessageService = {
  ...createResourceService('contact-messages'),
  send: (payload) => apiClient.post('contact-messages/', payload).then((res) => res.data),
  markRead: (id, isRead) =>
    apiClient.patch(`contact-messages/${id}/`, { is_read: isRead }).then((res) => res.data),
}
