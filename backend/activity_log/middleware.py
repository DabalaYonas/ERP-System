# middleware.py
from .models import ActivityLog
from django.utils.timezone import now

class ActivityLogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        
        if request.user.is_authenticated:
            action = None
            method = request.method
            
            if method == 'POST':
                action = 'create'
            elif method == 'PUT' or method == 'PATCH':
                action = 'update'
            elif method == 'DELETE':
                action = 'delete'
            # elif method == 'GET':
            #     action = 'view'
            
            if action:
                ActivityLog.objects.create(
                    user=request.user,
                    action=action,
                    ip_address=request.META.get('REMOTE_ADDR'),
                    details=f"{action} action on {request.path}",
                )

        return response
