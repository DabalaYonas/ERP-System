from rest_framework.authentication import BaseAuthentication
from user.models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt

class CustomTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get("jwt")
        
        if not token:
            return
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired!")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid Token!")
        

        try:
            user = User.objects.filter(id=payload['id']).first()
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found")

        return (user, None)