from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from core.permissions import IsAdminOnly

from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactMessageViewSet(ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminOnly()]
