# ELT2.0 Airdrop Simulation Tool

## Overview

This tool is designed to simulate the distribution of a cryptocurrency airdrop using a graph-based approach. The simulation is implemented using the NetworkX library and is run inside a Jupyter Notebook using the iPySigma library, which is built on top of Sigma.js.

## Installation

To use this tool, you will need to have Python 3.7+ and Jupyter Notebook installed. You can install the necessary dependencies by running the following command:


## Usage

1. Open the Jupyter Notebook file called `Airdrop-Distributor-Simulations.ipynb` in the `Airdrop-Simulations/Simulator` directory.
2. Run the first cell in the notebook, which imports the necessary libraries and sets up the initial graph.
3. Run the second cell in the notebook, which runs the simulation for a specified number of iterations.
4. Run the third cell in the notebook, which uses ipysigma library to visualize the graph.

## Additional Features

- You can change the number of nodes in the initial graph, the number of iterations the simulation runs for, and the randomness factor that determines the probability of an airdrop occurring.
- The initial graph is a directed graph with 50 nodes.
- The simulation starts with an initial distribution of nodes, and the nodes will have random values for the following attributes: reputation, stake and opt-in.
- The simulation runs in a loop for a specified number of iterations, during each iteration, the reputation, stake, and opt-in attributes of each node are incremented by a random value multiplied by the randomness attribute.
- The simulation checks if each node meets the eligibility criteria to be a distributor and if the distributor probability is met, a new node is added to the graph and connected to the current node via an "airdrop" edge.
- The simulation increments the stage of each node.
- The simulation will only allow one distributor to airdrop a node once, ensuring a fair distribution.
- The simulation will ensure that the initial airdrop contract is connected to all new distributors via the "airdrop" edge.


## Todo

- Implement EBSL metrics and compute emergent trust metrics using it
- Investigate Pareto Factor as a metric

