import unittest
import random
from networkx import DiGraph
from AirdropSimulation import ELT2AirdropSimulation

class TestAirdropSimulation(unittest.TestCase):
    def test_edge_creation(self):
        """
        Test if the add_airdrop_edge and add_trust_edge methods create edges with the correct attributes
        """
        num_nodes = 50 
        num_steps = 100
        graph = ELT2AirdropSimulation.create_initial_nodes(num_nodes)
        ELT2AirdropSimulation.iterate_data_set(graph, num_steps)
        self.assertGreater(graph.number_of_edges(), 0)
        self.assertTrue(all(edge_type in ['airdrop', 'trust'] for _, _, edge_type in graph.edges(data='edge_type')))
    
    def test_increment_node_reputation(self):
        """
        Test if the increment_node_reputation method increments the reputation attribute correctly
        """
        num_nodes = 50
        num_steps = 100
        graph = ELT2AirdropSimulation.create_initial_nodes(num_nodes)
        reputations = [graph.nodes[node]['reputation'] for node in graph.nodes()]
        ELT2AirdropSimulation.iterate_data_set(graph, num_steps)
        new_reputations = [graph.nodes[node]['reputation'] for node in graph.nodes()]
        self.assertNotEqual(reputations, new_reputations)
    
    def test_increment_node_stake(self):
        """
        Test if the increment_node_stake method increments the stake attribute correctly
        """
        num_nodes = 50
        num_steps = 100
        graph = ELT2AirdropSimulation.create_initial_nodes(num_nodes)
        stakes = [graph.nodes[node]['stake'] for node in graph.nodes()]
        ELT2AirdropSimulation.iterate_data_set(graph, num_steps)
        new_stakes = [graph.nodes[node]['stake'] for node in graph.nodes()]
        self.assertNotEqual(stakes, new_stakes)
    
    def test_increment_node_opt_in(self):
        """
        Test if the increment_node_opt_in method increments the opt_in attribute correctly
        """
        num_nodes = 50
        num_steps = 100
        graph = ELT2AirdropSimulation.create_initial_nodes(num_nodes)
        opt_ins = [graph.nodes[node]['opt_in'] for node in graph.nodes()]
        ELT2AirdropSimulation.iterate_data_set(graph, num_steps)
        new_opt_ins = [graph.nodes[node]['opt_in'] for node in graph.nodes()]
        self.assertNotEqual(opt_ins, new_opt_ins)

if __name__ == '__main__':
    unittest.main()