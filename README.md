# Centrality Metrics
## Research Document


Centrality measures are used to identify the most important nodes in a network, based on their connections to other nodes. Here is a list of some common centrality metrics:




1. Degree Centrality

 - Degree centrality is a simple centrality measure that counts the number of connections a node has in the network.
 - It is calculated by dividing the number of connections a node has by the maximum number of connections possible for that node.

2. Closeness Centrality

- Closeness centrality is a centrality measure that takes into account the distance of a node from all other nodes in the network.
- It is calculated by dividing the sum of the distances of the node from all other nodes by the number of nodes in the network. Nodes that are closer to all other nodes will have a higher closeness centrality.

3. Betweenness Centrality

  - Betweenness centrality is a centrality measure that takes into account the number of shortest paths that pass through a node.
  - It is calculated by dividing the number of shortest paths that pass through a node by the total number of shortest paths in the network.
  - Nodes that are on many shortest paths will have a higher betweenness centrality.

4. Eigenvector Centrality

  - Eigenvector centrality is a centrality measure that takes into account the number and strength of connections a node has.
  - It is calculated by finding the eigenvector of the adjacency matrix of the network, with the node's score being the corresponding element in the eigenvector.
  - Nodes that are connected to high-scoring nodes will have a higher eigenvector centrality.

5. PageRank Centrality

  - PageRank centrality is a centrality measure that is based on the idea of "voting" or "recommending" links, similar to how the Google search algorithm works.
  - It is calculated by considering the number and quality of links to a node, as well as the importance of the nodes those links are coming from.
  - Nodes with many high-quality links will have a higher PageRank centrality.

6. Evidence-based Subjective Logic (EBSL) Centrality

  - Evidence-based Subjective Logic (EBSL) centrality used as a centrality measure takes into account both the strength and direction of connections between nodes.
  - It is based on the concept of subjective logic, which is a probabilistic model for reasoning about uncertain or incomplete information.
  - EBSL can be used to generate trusts scores which can be used to hilight sybling nodes in a network due to the insular nature of sybling groups

7. Katz Centrality

  - Katz centrality is a centrality measure that takes into account both the strength and number of connections between nodes.
  - It is based on the concept of random walks through the network
  - A node is considered more important if it is more likely to be visited during a random walk on the network.

8. Subgraph Centrality

  - Subgraph centrality is a centrality measure that takes into account the number of connections within a subgraph, rather than the entire network.
  - It is used to identify the most important nodes within a specific subgroup or community within the network.

9. Stress Centrality

  - Stress centrality is a centrality measure that counts the number of shortest paths that pass through a node, with more weight given to paths that pass through the node more frequently.
  - It is calculated by finding the shortest paths in the network and summing the number of times each path passes through the node.

10. Radiality Centrality

  - Radiality centrality is a centrality measure that takes into account the distance of a node from the center of the network.
  - It is calculated by summing the distances of the node from all other nodes in the network and taking the inverse.
  - Nodes that are closer to the center of the network will have a higher radiality centrality.

11. Information Centrality

  - Information centrality is a centrality measure that takes into account the amount of information flowing through a node.
  - It is calculated by considering the number and strength of connections a node has, as well as the importance of the nodes it is connected to.
  - Nodes that are connected to many important nodes and have strong connections will have a higher information centrality.

12. Harmonic Centrality

  - Harmonic centrality is a centrality measure that takes into account the distance of a node from all other nodes in the network.
  - It is calculated by summing the inverse of the distances of the node from all other nodes in the network.
  - Nodes that are closer to all other nodes will have a higher harmonic centrality.

13. Current Flow Centrality

  - Current flow centrality is a centrality measure that takes into account the flow of "current" through a node, with more weight given to connections that have a higher weight.
  - It is calculated by solving the Kirchhoff Current Law equations for the network (Further research needed)

14. Bridging Centrality

  - Bridging centrality is a centrality measure that takes into account the number of connections a node has to other groups or communities in the network.
  - It is used to identify nodes that bridge different groups or communities within the network.

15. Group Centrality

  - Group centrality is a centrality measure that takes into account the importance of a group or community within the network.
  - It is calculated by summing the centralities of all the nodes in the group.

## Pareto Factor

  - The Pareto factor is a measure of the inequality of centralities within a network.
  - It is calculated by dividing the centrality of the most central node by the centrality of the least central node.
  - A high Pareto factor indicates a high level of inequality in centralities.
  
  
