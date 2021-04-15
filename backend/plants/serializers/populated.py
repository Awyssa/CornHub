from jwt_auth.serializers.common import UserSerializer
from ..serializers.common import MealSerializer

class PopulatedPlantsSerializer(PlantSerializer):

    owner = UserSerializer()
