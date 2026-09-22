from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'id', 'full_name', 'display_name', 'title', 'school', 'age',
            'location', 'intro', 'about', 'email', 'photo', 'resume',
            'is_active', 'updated_at',
        ]
