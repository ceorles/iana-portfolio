from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve
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

# Served by Django itself (not just in DEBUG): there is no separate static
# host or object storage configured for uploaded media, so this is what
# makes admin-uploaded images actually reachable in production too. Fine for
# this project's traffic volume; Django's docs flag it as inefficient at
# scale, which is a non-issue here.
urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]
