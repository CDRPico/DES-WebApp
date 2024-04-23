from django.db import models
import json


class SimulationType(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class Simulation(models.Model):
    simulation_type = models.ForeignKey(SimulationType, on_delete=models.CASCADE, related_name='scenarios')
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class SimulationResult(models.Model):
    scenario = models.ForeignKey(Simulation, on_delete=models.CASCADE, related_name='results')
    results = models.JSONField(default=dict) 
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Results for {self.scenario.name} @ {self.timestamp}'


class Process(models.Model):
    simulation = models.ForeignKey(Simulation, related_name='processes', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    script = models.TextField(help_text="Python code to define the process behavior")


class Parameter(models.Model):
    process = models.ForeignKey(Process, related_name='parameters', on_delete=models.CASCADE)
    key = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
    description = models.TextField(blank=True)


class Resource(models.Model):
    simulation = models.ForeignKey(Simulation, related_name='resources', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50, choices=(('time', 'Time'), ('capital', 'Capital')), default='time')
    capacity = models.IntegerField(default=1)
    description = models.TextField(blank=True)


class EnvironmentSettings(models.Model):
    simulation = models.OneToOneField(Simulation, on_delete=models.CASCADE, related_name='environment_settings')
    start_time = models.FloatField(default=0, help_text="Simulation start time")
    end_time = models.FloatField(help_text="Simulation end time")
    time_step = models.FloatField(default=1, help_text="Time step used for incremental simulation updates")