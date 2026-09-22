import apiClient from './apiClient'

export const analyticsService = {
  track: (eventType, projectId) =>
    apiClient
      .post('analytics/track/', { event_type: eventType, project: projectId ?? null })
      .catch(() => null), // analytics failures must never break the visitor experience
  summary: () => apiClient.get('analytics/summary/').then((res) => res.data),
}
