# AirdropSimulation

A Python utility that simulates the distribution of a cryptocurrency airdrop using a web of trust graph, where the nodes are identified by decentralized identifiers (DIDs) and the edges represent trust relationships. The utility uses the Evidence-Based Subjective Logic (EBSL) algorithm to compute the reputation of the nodes, and a proof-of-stake mechanism to incentivize the distribution of the airdrop.

## Installation

Clone this repository and run the following command to install the required libraries:

pip install -r requirements.txt

Usage

from AirdropSimulation import AirdropSimulation

simulation = AirdropSimulation(num_nodes=1000, randomness=0.5, stake_required=0.1, opt_in_prob=0.5, distributor_prob=0.1)
simulation.create_initial_nodes()
simulation.iterate_data_set(3)

Parameters

    num_nodes: The number of nodes in the graph.
    randomness: A value between 0 and 1 that controls the randomness of the reputation of the nodes.
    stake_required: A value between 0 and 1 that represents the minimum stake required for a node to become a distributor.
    opt_in_prob: A value between 0 and 1 that represents the probability of a node opting in to become a distributor.
    distributor_prob: A value between 0 and 1 that represents the probability of a distributor node distributing to a new node.

Methods

    create_initial_nodes(): Creates the initial nodes of the graph.
    iterate_data_set(num_iterations): Iterates the data set for a certain number of stages.
    iterate_nodes(): Iterates the nodes of the graph, and creates a trust or airdrop edge depending on the node's properties.
    check_node_distributor_eligibility(node): Checks if a node is eligible to become a distributor.
    check_node_opt_in(node): Checks if a node has opted in to become a distributor.
    check_distributor_probability(node): Checks if a distributor node distributes to a new node based on the distributor probability.

Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
