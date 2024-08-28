from django.utils import timezone
from .models import UserActivity, User
from .serializers import UserSerializer
from rest_framework.exceptions import AuthenticationFailed
import jwt
from rest_framework.response import Response

class UpdateLastActivityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.COOKIES.get("jwt")
        
        if not token:
            raise AuthenticationFailed("UnAuthenticated!")
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("UnAuthenticated!")
        
        user = User.objects.filter(id=payload['id']).first()
        request.user = user

        if user.is_authenticated:
            UserActivity.objects.update_or_create(
                user_id=user,
                defaults={'last_active': timezone.now(), 'online': True}
            )

        response = self.get_response(request)
        
        return response 