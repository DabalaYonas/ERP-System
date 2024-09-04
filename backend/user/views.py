from .models import User, Role
from rest_framework.views import APIView
from .serializers import UserSerializer, RoleSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from django.http import JsonResponse
import jwt, datetime
from rest_framework import viewsets, permissions

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return JsonResponse({'error': serializer.errors})

        return Response(serializer.data)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

        user = User.objects.filter(email=email).first()
        
        if user is None:
            raise AuthenticationFailed("Incorrect Email!")
        
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect Password!")
        
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True, max_age=3600, samesite="None", secure=True)
        response.data = {
            'jwt': token
        }

        return response

class UserView(APIView):
    def get(self, request):        
        user = request.user
        serializer = UserSerializer(user)

        return Response(serializer.data)    
    
    def put(self, request):        
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=400)
    

    def patch(self, request, pk=None):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=400)
    
class LogoutView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt', samesite="None")
        response.data = {
            "message": "logout successful"
        }

        return response
    

class AllUsersAPI(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        users = User.objects.all()
        return Response(UserSerializer(users, many=True).data)


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer