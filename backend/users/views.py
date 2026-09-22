from django.contrib.auth.models import User
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from core.permissions import IsAdminOnly

from .serializers import UserSerializer


class UserViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    """Read-only, admin-only listing of dashboard users."""

    queryset = User.objects.filter(is_staff=True).order_by('username')
    serializer_class = UserSerializer
    permission_classes = [IsAdminOnly]


class CurrentUserView(APIView):
    permission_classes = [IsAdminOnly]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
