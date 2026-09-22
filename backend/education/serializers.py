from rest_framework import serializers

from .models import EducationRecord


class EducationRecordSerializer(serializers.ModelSerializer):
    level_display = serializers.CharField(source='get_level_display', read_only=True)

    class Meta:
        model = EducationRecord
        fields = [
            'id', 'level', 'level_display', 'program', 'school_name', 'address',
            'maps_url', 'start_year', 'end_year', 'is_current', 'description', 'order',
        ]
