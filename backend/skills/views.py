from rest_framework.viewsets import ModelViewSet

from core.permissions import IsAdminOrReadOnly

from .models import Skill
from .serializers import SkillSerializer


class SkillViewSet(ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAdminOrReadOnly]
