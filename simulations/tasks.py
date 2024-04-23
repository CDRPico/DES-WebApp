from celery import shared_task
from .models import Simulation
from simulations_logic import calculate_npv, investment_simulation, run_financial_simulation
from .simulation_runner import run_simulation

@shared_task
def simulate(simulation_id):
    simulation = Simulation.objects.get(pk=simulation_id)
    result = run_simulation(simulation)
    return result