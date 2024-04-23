import numpy as np
import simpy

def calculate_npv(rate, cash_flows):
    cash_flows = np.array(cash_flows)
    times = np.arange(len(cash_flows))
    return np.sum(cash_flows / (1 + rate)**times)

def investment_simulation(env, params):
    npv = calculate_npv(params['rate'], params['cash_flows'])
    print(f"Calculated NPV: {npv}")
    yield env.timeout(1)  # Simulate some processing time

def run_financial_simulation(rate, cash_flows):
    env = simpy.Environment()
    env.process(investment_simulation(env, {'rate': rate, 'cash_flows': cash_flows}))
    env.run()
