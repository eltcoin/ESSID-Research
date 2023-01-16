from behave import given, when, then
import random
from AirdropSimulation import AirdropSimulation

@given('I have a trust network represented by a directed graph')
def test_create_trust_network(context):
    context.num_nodes = 1000
    context.randomness = 0.5
    context.stake_required = 0.1
    context.opt_in_prob = 0.5
    context.distributor_prob = 0.1

    context.simulation = AirdropSimulation(num_nodes=context.num_nodes, randomness=context.randomness, stake_required=context.stake_required, opt_in_prob=context.opt_in_prob, distributor_prob=context.distributor_prob)
    context.simulation.create_trust_network()

    assert context.simulation.G.number_of_nodes() == context.num_nodes
    for node in context.simulation.G.nodes():
        assert context.simulation.G.nodes[node]['stake'] <= 1.0 and context.simulation.G.nodes[node]['stake'] >= 0.0
        assert context.simulation.G.nodes[node]['opt_in'] == True or context.simulation.G.nodes[node]['opt_in'] == False
    assert context.simulation.G.number_of_edges() == 0


@when('I initialize the AirdropSimulation class')
def initialize_simulation(context):
    context.simulation = AirdropSimulation(context.G)

@then('the class should be properly initialized with the trust network')
def check_initialization(context):
    assert isinstance(context.simulation, AirdropSimulation)
    assert context.simulation.G == context.G

@given('I have initialized the AirdropSimulation class')
def create_simulation(context):
    context.G = nx.DiGraph()
    # Add nodes and edges to the trust network
    context.simulation = AirdropSimulation(context.G)

@when('I run the airdrop with default parameters')
def run_default_airdrop(context):
    context.simulation.run_airdrop()

@then('the airdrop should be run successfully on the trust network')
def check_airdrop_success(context):
    assert context.simulation.airdrop_success

@then('the number of distributor nodes should be within expected range')
def check_num_distributors(context):
    num_distributors = sum([1 for n in context.G.nodes() if context.G.nodes[n]['distributor']])
    assert num_distributors >= context.simulation.min_distributors
    assert num_distributors <= context.simulation.max_distributors

@then('the trust values of nodes should be updated accordingly')
def check_trust_values(context):
    for n in context.G.nodes():
        assert 'trust_value' in context.G.nodes[n]

@when('I run the airdrop with custom parameters')
def run_custom_airdrop(context):
    context.simulation.run_airdrop(num_distributors=50, stake_required=0.2, opt_in_prob=0.7)

@when('I run the airdrop at different stages')
def run_staged_airdrop(context):
    context.simulation.run_staged_airdrop(stages=[10, 20, 30])

@then('the network should be in the expected state at each stage')
def check_staged_network(context):
    for i, stage in enumerate(context.simulation.stages):
        assert context.simulation.stage_networks[i].number_of_nodes() == stage