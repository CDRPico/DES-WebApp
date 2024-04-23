from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import SimulationViewSet, ProcessViewSet, ParameterViewSet

router = DefaultRouter()
router.register(r'simulations', SimulationViewSet, basename='simulation')
router.register(r'processes', ProcessViewSet, basename='process')
router.register(r'parameters', ParameterViewSet, basename='parameter')

urlpatterns = [
    path('', include(router.urls)),
]