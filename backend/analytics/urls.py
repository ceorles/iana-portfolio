from django.urls import path

from .views import AnalyticsSummaryView, AnalyticsTrackView

urlpatterns = [
    path('analytics/track/', AnalyticsTrackView.as_view(), name='analytics-track'),
    path('analytics/summary/', AnalyticsSummaryView.as_view(), name='analytics-summary'),
]
