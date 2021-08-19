# pylint: disable=missing-module-docstring
# pylint: disable=missing-class-docstring
# pylint: disable=missing-function-docstring

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
from django.conf import settings
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
import jwt
from .serializers.common import UserSerializer
from .serializers.common import SavedPlantsSerializer

User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        # run user through serializer
        user_to_create = UserSerializer(data=request.data)
        # check if user is valid
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_202_ACCEPTED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def post(self, request):
        # get some data off the request
        email = request.data.get('email')
        password = request.data.get('password')

        # get the user from the db
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid credentials')
        if not user_to_login.check_password(password): # check password against hashed version in db
            raise PermissionDenied(detail='Invalid credentials')

        dt = datetime.now() + timedelta(days=7) # generate expiry for token

        # generate a token
        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return Response({ 'sub': user_to_login.id,'token': token, 'message': f'Welcome back {user_to_login.username}'})

class UserDetailView(APIView):
    # permission_classes = (IsAuthenticated,)

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound(detail="Woah! That user does not exist!")

    def get(self, request, pk):
        user = self.get_user(pk=pk)
        if request.user.id == user.id:
            serialized_user = UserSerializer(user)
            return Response(serialized_user.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user_to_delete = self.get_user(pk=pk)
        if request.user.id == user_to_delete.id:
            user_to_delete.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user_to_edit = self.get_user(pk=pk)
        if request.user.id == user_to_edit.id:
            updated_user = SavedPlantsSerializer(user_to_edit, data=request.data, partial=True)
            if updated_user.is_valid():
                updated_user.save()
                return Response(updated_user.data, status=status.HTTP_202_ACCEPTED)
            return Response(updated_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        else: 
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # def patch(self, request, pk):
    #     user_to_edit = self.get_user(pk=pk)
    #     if request.user.id == user_to_edit.id:
    #         updated_user = UserSerializer(user_to_edit, data=request.data, partial=True)
    #         if updated_user.is_valid():
    #             updated_user.save()
    #             return Response(updated_user.data, status=status.HTTP_202_ACCEPTED)
    #         return Response(updated_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    #     else: 
    #         return Response(status=status.HTTP_400_BAD_REQUEST)