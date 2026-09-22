from rest_framework.routers import DefaultRouter

from .views import SocialLinkViewSet

router = DefaultRouter()
router.register('social-links', SocialLinkViewSet, basename='social-link')

urlpatterns = router.urls
