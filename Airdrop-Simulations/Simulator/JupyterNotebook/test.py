import pytest
from AirdropSimulation import AirdropSimulation

@pytest.fixture
def simulation():
    return AirdropSimulation()

@pytest.mark.bdd
def test_create_initial_nodes(simulation):
    assert len(simulation.G) == simulation.num_nodes
    for i in range(simulation.num_nodes):
        assert 'reputation' in simulation.G.nodes[i]
        assert 'distributor' in simulation.G.nodes[i]
        assert 'stake' in simulation.G.nodes[i]
        assert 'opt_in' in simulation.G.nodes[i]
        assert 'stage' in simulation.G.nodes[i]

@pytest.mark.bdd
def test_iterate_data_set(simulation):
    simulation.iterate_data_set(3)
    for i in range(simulation.num_nodes):
        assert simulation.G.nodes[i]['stage'] == 3

@pytest.mark.bdd
def test_iterate_nodes(simulation):
    simulation.iterate_nodes()
    for node in simulation.G.nodes():
        if simulation.check_node_distributor_eligibility(node):
            if simulation.check_node_opt_in(node) and simulation.check_distributor_probability(node):
                assert 'airdrop' in simulation.G[node]
            else:
                assert 'trust' in simulation.G[node]

@pytest.mark.bdd
def test_check_node_distributor_eligibility(simulation):
    node = list(simulation.G.nodes())[0]
    simulation.G.nodes[node]['reputation'] = simulation.randomness - 0.1
    assert simulation.check_node_distributor_eligibility(node) == False

    simulation.G.nodes[node]['reputation'] = simulation.randomness + 0.1
    simulation.G.nodes[node]['stake'] = simulation.stake_required - 0.1
    assert simulation.check_node_distributor_eligibility(node) == False
    
    simulation.G.nodes[node]['stake'] = simulation.stake_required + 0.1
    assert simulation.check_node_distributor_eligibility(node) == True
