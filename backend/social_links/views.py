from rest_framework.viewsets import ModelViewSet

from core.permissions import IsAdminOrReadOnly

from .models import SocialLink
from .serializers import SocialLinkSerializer


class SocialLinkViewSet(ModelViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer
    permission_classes = [IsAdminOrReadOnly]
