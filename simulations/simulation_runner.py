import simpy

def run_simulation(simulation_id):
    from .models import Simulation, Process, Parameter

    # Fetch the simulation instance and related processes
    simulation = Simulation.objects.get(pk=simulation_id)
    env = simpy.Environment()

    # Setup each process defined for this simulation
    for process in simulation.processes.all():
        # Create a SimPy process for each Process model
        exec(process.script)  # This executes the Python code stored in process.script

    # Run the simulation environment
    env.run()

    # Optionally, handle results and logging
    return "Simulation completed"