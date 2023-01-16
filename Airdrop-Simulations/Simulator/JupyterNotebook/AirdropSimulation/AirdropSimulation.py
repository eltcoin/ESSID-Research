import networkx as nx
import random

class ELT2AirdropSimulation:    
    
    @staticmethod
    def create_initial_nodes(num_nodes):
        """
        Creates the initial set of nodes in the graph.
        """
        G = nx.DiGraph()
        for i in range(num_nodes):
            G.add_node(i, reputation=random.uniform(0, 1), stake=random.uniform(0, 1), opt_in=random.choice([True, False]), stage=0, distributor=False)
        return G


    @staticmethod
    def iterate_data_set(G, num_steps):
        """
        Iterates through the dataset for a specified number of steps.
        """
        for i in range(num_steps):
            for node in list(G.nodes()):  # Create a copy of the list of nodes before iterating
                ELT2AirdropSimulation.iterate_nodes(G, node)
            for node in list(G.nodes()):
                ELT2AirdropSimulation.increment_node_reputation(G, node, 0.01)
            for node in list(G.nodes()):
                ELT2AirdropSimulation.increment_node_stake(G, node, 0.01)
            for node in list(G.nodes()):
                ELT2AirdropSimulation.increment_node_opt_in(G, node, 0.01)
            for node in list(G.nodes()):
                ELT2AirdropSimulation.increment_node_stage(G, node)

    @staticmethod
    def iterate_nodes(G, node):
        """
        Iterates through each node in the graph and checks if the node meets the eligibility criteria to be a distributor.
        """
        if ELT2AirdropSimulation.check_node_distributor_eligibility(G, node):
            if ELT2AirdropSimulation.check_distributor_probability(G, node):
                ELT2AirdropSimulation.add_airdrop_edge(G, node)
            else:
                ELT2AirdropSimulation.add_trust_edge(G, node)
    @staticmethod
    def check_node_distributor_eligibility(G, node):
        """
        Checks if a node meets the eligibility criteria to be a distributor.
        """
        return G.nodes[node]['reputation'] > 0.8 and G.nodes[node]['stake'] > 0.8 and G.nodes[node]['opt_in'] == True
    
    @staticmethod
    def check_distributor_probability(G, node):
        """
        Checks if a node meets the probability criteria to be a distributor.
        """
        return random.uniform(0, 1) < 0.5
    
    @staticmethod
    def add_airdrop_edge(G, node):
        """
        Adds a new node to the graph, connecting it to the input node via an "airdrop" edge.
        """
        new_node = len(G.nodes())
        G.add_node(new_node, reputation=random.uniform(0, 1), stake=random.uniform(0, 1), opt_in=random.choice([True, False]), stage=0, distributor=True)
        G.add_edge(node, new_node, edge_type='airdrop')
    @staticmethod
    def add_trust_edge(G, node):
        """
        Adds a new node to the graph, connecting it to the input node via a "trust" edge.
        """
        new_node = len(G.nodes())
        G.add_node(new_node, reputation=random.uniform(0, 1), stake=random.uniform(0, 1), opt_in=random.choice([True, False]), stage=0)
        G.add_edge(node, new_node, edge_type='trust')

    @staticmethod
    def increment_node_reputation(G, node, randomness):
        """
        Increments a node's reputation attribute based on a random value multiplied by the randomness attribute.
        """
        G.nodes[node]['reputation'] += (random.uniform(0, 1) * randomness) * (1 + G.nodes[node].get('distributor', False))

    @staticmethod
    def increment_node_stake(G, node, randomness):
        """
        Increments a node's stake attribute based on a random value multiplied by the randomness attribute.
        """
        G.nodes[node]['stake'] += (random.uniform(0, 1) * randomness) * (1 + G.nodes[node].get('distributor', False))

    @staticmethod
    def increment_node_opt_in(G, node, randomness):
        """
        Increments a node's opt_in attribute based on a random value multiplied by the randomness attribute.
        """
        G.nodes[node]['opt_in'] = bool(random.uniform(0, 1) + randomness > 0.5)
        # return G.nodes[node]['opt_in']


    @staticmethod
    def increment_node_stage(G, node):
        """
        Increments a node's stage attribute by 1
        """
        G.nodes[node]['stage'] += 1
        """
        Set the number of initial nodes and number of steps for the simulation
        """
        


"""
Create the initial set of nodes in the graph
"""


num_nodes = 50
num_steps = 10

G = ELT2AirdropSimulation.create_initial_nodes(num_nodes)

for i in range(num_steps):
    ELT2AirdropSimulation.iterate_data_set(G, 1)
    print("Iteration: ", i+1)
    print("Number of Nodes: ", len(G.nodes()))
    print("Number of Edges: ", len(G.edges()))
    for n in G.nodes():
        print(G.nodes[n])
    # print("Number of Distributors: ", len([n for n in G.nodes() if G.nodes[n]['distributor'] == True]))
    print("\n")

