from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Simulation, SimulationResult, Process, Parameter
from .serializers import SimulationSerializer, ProcessSerializer, ParameterSerializer, SimulationResultSerializer
from .simulation_runner import run_simulation


class SimulationViewSet(viewsets.ModelViewSet):
    queryset = Simulation.objects.all()
    serializer_class = SimulationSerializer

    @action(detail=True, methods=['post'])
    def start(self, request, pk=None):
        simulation = self.get_object()
        # Assume run_simulation now is an async task
        run_simulation.delay(simulation.id)  # Using Celery
        return Response({'status': 'Simulation started'})


class ProcessViewSet(viewsets.ModelViewSet):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer


class ParameterViewSet(viewsets.ModelViewSet):
    queryset = Parameter.objects.all()
    serializer_class = ParameterSerializer


class SimulationResultsViewSet(viewsets.ModelViewSet):
    queryset = SimulationResult.objects.all()
    serializer_class = SimulationResultSerializer
