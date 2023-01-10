import * as _Graph from 'graphology';

var Graph = _Graph.default();

// Generate synthetic network
var syntheticNetwork = Graph.generate.complete({});

// Assign synthetic attributes to nodes
var syntheticBehaviorScores = {};
syntheticNetwork.forEachNode((node) => {
  syntheticBehaviorScores[node] = Math.random();
});

// Assign synthetic attributes to connections
var syntheticConnectionStrengths = {};
syntheticNetwork.forEachEdge((edge) => {
  syntheticConnectionStrengths[edge] = Math.random();
});

// Generate synthetic dataset
var syntheticDataset = [];
syntheticNetwork.forEachNode((node) => {
  const nodeData = {
    node,
    behaviorScore: syntheticBehaviorScores[node],
    numConnections: syntheticNetwork.degree(node),
  };
  syntheticNetwork.forEachEdge(node, (edge) => {
    nodeData[edge] = syntheticConnectionStrengths[edge];
  });
  syntheticDataset.push(nodeData);
});

console.dir(syntheticDataset,{depth:null});