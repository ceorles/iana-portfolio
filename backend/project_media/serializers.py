from rest_framework import serializers

from .models import ProjectMedia


class ProjectMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMedia
        fields = ['id', 'project', 'image', 'caption', 'order']
