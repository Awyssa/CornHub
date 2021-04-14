from django.urls import path
from .views import PlantsListView

urlpatterns = [
    path('', PlantsListView.as_view()),
    # path('<int:pk>/', PlantsDetailView.as_view())
]
