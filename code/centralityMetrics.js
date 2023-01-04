import { betweenness } from 'centrality';

export async function betweennessCentrality(nodegraph) {
  const { nodes, edges } = nodegraph;

  // Convert the nodegraph object to the format expected by the centrality library
  const graph = {};
  nodes.forEach(node => { graph[node] = []; });
  edges.forEach((neighbors, node) => {
    neighbors.forEach(({ neighbor, weight }) => {
      graph[node].push({ node: neighbor, weight });
    });
  });

  // Calculate the betweenness centrality scores using the centrality library
  const centralityScores = await betweenness(graph);

  // Return the centrality scores as a Map object
  return new Map(Object.entries(centralityScores));
}