from rest_framework.viewsets import ModelViewSet

from core.permissions import IsAdminOrReadOnly

from .models import ProjectMedia
from .serializers import ProjectMediaSerializer


class ProjectMediaViewSet(ModelViewSet):
    queryset = ProjectMedia.objects.all()
    serializer_class = ProjectMediaSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        project_id = self.request.query_params.get('project')
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset
