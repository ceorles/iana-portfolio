from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsAdminOrReadOnly(BasePermission):
    """Anyone can read public portfolio content; only staff can write."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class IsAdminOnly(BasePermission):
    """Used for admin-only resources such as contact messages or analytics."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_staff)
