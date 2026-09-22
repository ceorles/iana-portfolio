from rest_framework import serializers

from .models import AnalyticsEvent


class AnalyticsEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsEvent
        fields = ['id', 'event_type', 'project', 'created_at']
        read_only_fields = ['created_at']

    def validate_event_type(self, value):
        if value not in AnalyticsEvent.EventType.values:
            raise serializers.ValidationError('Unsupported event type.')
        return value
