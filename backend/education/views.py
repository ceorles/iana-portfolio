from rest_framework.viewsets import ModelViewSet

from core.permissions import IsAdminOrReadOnly

from .models import EducationRecord
from .serializers import EducationRecordSerializer


class EducationRecordViewSet(ModelViewSet):
    queryset = EducationRecord.objects.all()
    serializer_class = EducationRecordSerializer
    permission_classes = [IsAdminOrReadOnly]
