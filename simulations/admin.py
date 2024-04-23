from django.contrib import admin
from .models import Simulation, SimulationResult, SimulationType, Process, Parameter, Resource, EnvironmentSettings

admin.site.register(SimulationType)
admin.site.register(Simulation)
admin.site.register(SimulationResult)
admin.site.register(Process)
admin.site.register(Parameter)
admin.site.register(Resource)
admin.site.register(EnvironmentSettings)
