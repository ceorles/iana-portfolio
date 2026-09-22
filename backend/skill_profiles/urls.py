from rest_framework.routers import DefaultRouter

from .views import SkillProfileViewSet

router = DefaultRouter()
router.register('skill-profiles', SkillProfileViewSet, basename='skill-profile')

urlpatterns = router.urls
