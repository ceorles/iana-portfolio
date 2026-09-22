from django.db.models import Count
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from contact_messages.models import ContactMessage
from core.permissions import IsAdminOnly

from .models import AnalyticsEvent
from .serializers import AnalyticsEventSerializer


class AnalyticsTrackView(CreateAPIView):
    """Public endpoint used by the portfolio frontend to record page views and project clicks."""

    queryset = AnalyticsEvent.objects.all()
    serializer_class = AnalyticsEventSerializer
    permission_classes = [AllowAny]


class AnalyticsSummaryView(APIView):
    """Admin-only aggregated stats for the dashboard."""

    permission_classes = [IsAdminOnly]

    def get(self, request):
        events = AnalyticsEvent.objects.all()
        page_views = events.filter(event_type=AnalyticsEvent.EventType.PAGE_VIEW).count()
        project_clicks = events.filter(event_type=AnalyticsEvent.EventType.PROJECT_CLICK)

        popular_project = (
            project_clicks.exclude(project__isnull=True)
            .values('project__id', 'project__title')
            .annotate(clicks=Count('id'))
            .order_by('-clicks')
            .first()
        )

        recent_events = AnalyticsEventSerializer(events[:10], many=True).data

        return Response({
            'page_views': page_views,
            'project_clicks': project_clicks.count(),
            'contact_messages': ContactMessage.objects.count(),
            'unread_messages': ContactMessage.objects.filter(is_read=False).count(),
            'popular_project': popular_project,
            'recent_events': recent_events,
        })
