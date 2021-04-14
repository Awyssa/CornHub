# pylint: disable=missing-module-docstring
# pylint: disable=missing-class-docstring
# pylint: disable=missing-function-docstring

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.exceptions import NotFound
# from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .models import Plants
from .serializers.common import PlantsSerializer

class PlantsListView(APIView):

    def get(self, _request):
        plants = Plants.objects.all()
        serialized_plants = PlantsSerializer(plants, many=True)
        return Response(serialized_plants.data, status=status.HTTP_200_OK)

# class PlantDetailView(APIView):

#     def get_plant(self, _request, pk):
#         try:
#             return Plants.objects.get(pk=pk)
#         except Plants.DoesNotExist:
#             raise NotFound(detail="not found")
