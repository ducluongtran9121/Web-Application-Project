from rest_framework import permissions

class UpdateOwnProfile(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return obj.id == request.user.id

class UpdateOwnMemberProfile(permissions.BasePermission):
    """Allow users to update their own status"""

    def has_permission(self, request, view):
        
        return request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        """Check the user is trying to update their own status"""
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id