from .models import User
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from django.http import JsonResponse
import jwt, datetime
from rest_framework import permissions
from activity_log.models import ActivityLog
from utils.decorators import role_required
from django.contrib.auth.models import Group
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(["post"])
@role_required("Admin")
def assign_role(request):
    user_id = request.data.get("user_id")
    role_id = request.data.get("role_id")

    try:
        user = User.objects.get(id=user_id)
        group = Group.objects.get(id=role_id)
        user.groups.clear()
        user.groups.add(group)
        user.save()
        return Response({'message': 'Role assigned successfully'}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found!'}, status=status.HTTP_404_NOT_FOUND)
    except Group.DoesNotExist:
        return Response({'error': 'Role not found!'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def list_roles(request):
    roles = Group.objects.all().values('id', 'name')
    return Response(roles)

@api_view(['GET'])
def list_users_and_roles(request):
    user = request.user
    company_id = user.company_id
    users = User.objects.filter(company_id=company_id).all().values('id', 'company_id', 'name', 'email', 'date_joined', 'last_login', 'groups__id')
    return Response(users)

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

        # user = User.objects.filter(email=email).first()
        
        # if user is None:
        #     ActivityLog.objects.create(user=None, action='failed_login', 
        #                                ip_address=request.META.get('REMOTE_ADDR'), 
        #                                details=f"Failed login attempt by incorrect email for {email}")

        #     raise AuthenticationFailed("Incorrect Email!")
        

        # if not user.check_password(password):
        #     ActivityLog.objects.create(user=None, action='failed_login', 
        #                                ip_address=request.META.get('REMOTE_ADDR'), 
        #                                details=f"Failed login attempt by incorrect password for {email}")
            
        #     raise AuthenticationFailed("Incorrect Password!")
        
        # payload = {
        #     'id': user.id,
        #     'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        #     'iat': datetime.datetime.utcnow()
        # }

        # token = jwt.encode(payload, 'secret', algorithm='HS256')
        # response = Response()

        # response.set_cookie(key='jwt', value=token, httponly=True, max_age=3600, samesite="None", secure=True)
        # response.data = {
        #     'jwt': token
        # }
        
        # ActivityLog.objects.create(user=user, action='login', ip_address=request.META.get('REMOTE_ADDR'))

        # return response
        user = authenticate(email=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            })
        else:
            return Response({"error": "Invalid credentials"}, status=401)
        

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
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt', samesite="None")
        response.data = {
            "message": "logout successful"
        }
        user = request.user
        ActivityLog.objects.create(user=user, action='logout', ip_address=request.META.get('REMOTE_ADDR'))

        return response
    
class AllUsersAPI(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        users = User.objects.all()
        return Response(UserSerializer(users, many=True).data)