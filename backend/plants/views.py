# pylint: disable=missing-module-docstring
# pylint: disable=missing-class-docstring
# pylint: disable=missing-function-docstring

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .models import Plants
from .serializers.common import PlantsSerializer
from .serializers.populated import PopulatedPlantsSerializer

class PlantsListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        plants = Plants.objects.all()
        serialized_plants = PopulatedPlantsSerializer(plants, many=True)
        return Response(serialized_plants.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data["owner"] = request.user.id
        plants_to_add = PlantsSerializer(data=request.data)
        if plants_to_add.is_valid():
            plants_to_add.save()
            return Response(plants_to_add.data, status=status.HTTP_201_CREATED)
        return Response(plants_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class PlantsDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_plant(self, pk):
        try:
            return Plants.objects.get(pk=pk)
        except Plants.DoesNotExist:
            raise NotFound(detail="Woah! That plant does not exist!")

    def get(self, _request, pk):
        plants = self.get_plant(pk=pk)
        serialized_plants = PopulatedPlantsSerializer(plants)
        return Response(serialized_plants.data, status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        plants_to_delete = self.get_plant(pk=pk)
        plants_to_delete.delete()
        return Response(status=status.HTTP_200_OK)

    def put(self, request, pk):
        plants_to_edit = self.get_plant(pk=pk)
        updated_plants = PlantsSerializer(plants_to_edit, data=request.data)
        if updated_plants.is_valid():
            updated_plants.save()
            return Response(updated_plants.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_plants.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
