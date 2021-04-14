# pylint: disable=missing-module-docstring
# pylint: disable=missing-class-docstring
# pylint: disable=missing-function-docstring

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
# from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .models import Plants
from .serializers.common import PlantsSerializer

class PlantsListView(APIView):

    def get(self, _request):
        plants = Plants.objects.all()
        serialized_plants = PlantsSerializer(plants, many=True)
        return Response(serialized_plants.data, status=status.HTTP_200_OK)

    def post(self, request):
        # request.data["owner"] = request.user.id
        plants_to_add = PlantsSerializer(data=request.data)
        if plants_to_add.is_valid():
            plants_to_add.save()
            return Response(plants_to_add.data, status=status.HTTP_201_CREATED)
        return Response(plants_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class PlantsDetailView(APIView):

    def get_plant(self, pk):
        try:
            return Plants.objects.get(pk=pk)
        except Plants.DoesNotExist:
            raise NotFound(detail="🥪 Cannot find that meal")

    def get(self, _request, pk):
        plants = self.get_plant(pk=pk)
        serialized_meal = PlantsSerializer(plants)
        return Response(serialized_meal.data, status=status.HTTP_200_OK)
