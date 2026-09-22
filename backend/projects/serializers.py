from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'short_description', 'description', 'thumbnail',
            'project_url', 'github_url', 'technologies', 'year', 'is_featured',
            'is_sample', 'order', 'created_at',
        ]
