from django.db import models

from projects.models import Project


class AnalyticsEvent(models.Model):
    class EventType(models.TextChoices):
        PAGE_VIEW = 'page_view', 'Portfolio Page View'
        PROJECT_CLICK = 'project_click', 'Project Click'

    event_type = models.CharField(max_length=20, choices=EventType.choices)
    project = models.ForeignKey(
        Project, on_delete=models.SET_NULL, null=True, blank=True, related_name='analytics_events'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.event_type} @ {self.created_at:%Y-%m-%d %H:%M}'
