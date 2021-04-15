from jwt_auth.serializers.common import UserSerializer
from ..serializers.common import PlantsSerializer

class PopulatedPlantsSerializer(PlantsSerializer):

    owner = UserSerializer()
