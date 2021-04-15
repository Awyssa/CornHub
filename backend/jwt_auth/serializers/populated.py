from jwt_auth.serializers.common import UserSerializer
from ..serializers.common import PlantSerializer

class PopulatedUserSerializer(UserSerializer):

    plants = PlantsSerializer()
