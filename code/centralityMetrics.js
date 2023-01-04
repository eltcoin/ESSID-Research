export function betweennessCentrality(nodegraph) {
    const { nodes, edges } = nodegraph;
  
    // Initialize the centrality scores for each node
    const centralityScores = new Map();
    nodes.forEach(node => centralityScores.set(node, 0));
  
    // Iterate over every pair of nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const source = nodes[i];
        const target = nodes[j];
  
        // Find the shortest path between the source and target nodes
        const shortestPath = findShortestPath(nodegraph, source, target);
  
        // Increment the centrality score for each node on the shortest path
        shortestPath.forEach(node => {
          centralityScores.set(node, centralityScores.get(node) + 1);
        });
      }
    }
  
    // Return the centrality scores
    return centralityScores;
  }
  
  function findShortestPath(nodegraph, source, target) {
    const { nodes, edges } = nodegraph;
  
    // Initialize the distances from the source node
    const distances = new Map();
    nodes.forEach(node => distances.set(node, Infinity));
    distances.set(source, 0);
  
    // Initialize the set of unvisited nodes
    const unvisitedNodes = new Set(nodes);
  
    // Initialize the previous node map
    const previousNodes = new Map();
  
    // While there are unvisited nodes
    while (unvisitedNodes.size > 0) {
      // Find the unvisited node with the smallest distance from the source
      let currentNode = null;
      let smallestDistance = Infinity;
      for (const [node, distance] of distances) {
        if (unvisitedNodes.has(node) && distance < smallestDistance) {
          currentNode = node;
          smallestDistance = distance;
        }
      }
  
      // If the target node has been reached, construct the shortest path
      if (currentNode === target) {
        const shortestPath = [target];
        let current = target;
        while (current !== source) {
          current = previousNodes.get(current);
          shortestPath.unshift(current);
        }
        return shortestPath;
      }
  
      // Remove the current node from the unvisited set
      unvisitedNodes.delete(currentNode);
  
      // Update the distances to the neighboring nodes
      for (const [neighbor, weight] of edges.get(currentNode)) {
        const distance = distances.get(currentNode) + weight;
        if (distance < distances.get(neighbor)) {
          distances.set(neighbor, distance);
          previousNodes.set(neighbor, currentNode);
        }
      }
    }
  
    // If the target is not reachable, return an empty array
    return [];
  }