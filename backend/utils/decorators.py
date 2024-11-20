from functools import wraps
from django.core.exceptions import PermissionDenied

def role_required(role_name):
    def decorator(func):
        @wraps(func)
        def wrap(request, *args, **kwargs):
            if request.user.groups.filter(name=role_name).exists():
                return func(request, *args, **kwargs)
            raise PermissionDenied
        return wrap
    return decorator