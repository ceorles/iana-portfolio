from rest_framework.routers import DefaultRouter

from django.urls import include, path

from .views import CurrentUserView, UserViewSet

router = DefaultRouter()
router.register('users', UserViewSet, basename='user')

urlpatterns = [
    path('users/me/', CurrentUserView.as_view(), name='current-user'),
    path('', include(router.urls)),
]
