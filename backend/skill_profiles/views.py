from rest_framework.viewsets import ModelViewSet

from core.permissions import IsAdminOrReadOnly

from .models import SkillProfile
from .serializers import SkillProfileSerializer


class SkillProfileViewSet(ModelViewSet):
    queryset = SkillProfile.objects.select_related('skill').all()
    serializer_class = SkillProfileSerializer
    permission_classes = [IsAdminOrReadOnly]
