from rest_framework.viewsets import ModelViewSet

from core.permissions import IsAdminOrReadOnly

from .models import Profile
from .serializers import ProfileSerializer


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminOrReadOnly]
