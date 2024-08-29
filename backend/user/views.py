from .models import User, UserActivity, Role
from rest_framework.views import APIView
from .serializers import UserSerializer, UserActivitySerializer, RoleSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from django.http import JsonResponse
import jwt, datetime
from employee.serializers import EmployeeSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

class RegisterView(APIView):
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return JsonResponse({'error': serializer.errors})

        return Response(serializer.data)

class LoginView(APIView):
    
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

        # EmployeeSerializer(data=request.data, context={'request': request})

        return response

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt")
        
        if not token:
            raise AuthenticationFailed("UnAuthenticated!")
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("UnAuthenticated!")
        
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)    
    
    def put(self, request):
        token = request.COOKIES.get("jwt")
        
        if not token:
            raise AuthenticationFailed("UnAuthenticated!")
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("UnAuthenticated!")
        
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    

    def patch(self, request, pk=None):
        token = request.COOKIES.get("jwt")
        
        if not token:
            raise AuthenticationFailed("UnAuthenticated!")
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("UnAuthenticated!")
        
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=400)
    
class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            "message": "logout seccussful"
        }

        return response
    

class UserActivityViewSet(viewsets.ModelViewSet):
    queryset = UserActivity.objects.all()
    serializer_class = UserActivitySerializer
    permission_classes = [IsAuthenticated]


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer