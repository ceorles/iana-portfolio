from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/', include('profiles.urls')),
    path('api/', include('education.urls')),
    path('api/', include('experience.urls')),
    path('api/', include('certifications.urls')),
    path('api/', include('projects.urls')),
    path('api/', include('project_media.urls')),
    path('api/', include('services.urls')),
    path('api/', include('skills.urls')),
    path('api/', include('skill_profiles.urls')),
    path('api/', include('social_links.urls')),
    path('api/', include('contact_messages.urls')),
    path('api/', include('analytics.urls')),
    path('api/', include('users.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
