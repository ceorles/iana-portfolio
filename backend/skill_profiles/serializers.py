from rest_framework import serializers

from skills.serializers import SkillSerializer

from .models import SkillProfile


class SkillProfileSerializer(serializers.ModelSerializer):
    skill_detail = SkillSerializer(source='skill', read_only=True)

    class Meta:
        model = SkillProfile
        fields = ['id', 'skill', 'skill_detail', 'proficiency', 'summary', 'is_featured', 'order']
