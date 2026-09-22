from rest_framework.viewsets import ModelViewSet

from core.permissions import IsAdminOrReadOnly

from .models import Certification
from .serializers import CertificationSerializer


class CertificationViewSet(ModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    permission_classes = [IsAdminOrReadOnly]
