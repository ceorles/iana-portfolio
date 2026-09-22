from rest_framework.routers import DefaultRouter

from .views import ProjectMediaViewSet

router = DefaultRouter()
router.register('project-media', ProjectMediaViewSet, basename='project-media')

urlpatterns = router.urls
