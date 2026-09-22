from rest_framework.routers import DefaultRouter

from .views import EducationRecordViewSet

router = DefaultRouter()
router.register('education', EducationRecordViewSet, basename='education')

urlpatterns = router.urls
