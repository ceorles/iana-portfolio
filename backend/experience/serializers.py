from rest_framework import serializers

from .models import Experience


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'id', 'role_title', 'organization', 'location', 'start_date',
            'end_date', 'is_current', 'description', 'order',
        ]
