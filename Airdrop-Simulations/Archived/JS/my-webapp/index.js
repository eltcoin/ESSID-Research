


// Generate synthetic network
var syntheticNetwork = classic.gnm(100, 200);

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

// Visualize synthetic dataset using d3
var datasetContainer = d3.select('#dataset-container');

var table = datasetContainer.append('table')
  .attr('class', 'table table-striped');

var thead = table.append('thead');
thead.append('tr')
  .selectAll('th')
  .data(['Node', 'Behavior Score', 'Number of Connections'])
  .enter()
  .append('th')
  .text(d => d);

var tbody = table.append('tbody');
var rows = tbody.selectAll('tr')
  .data(syntheticDataset)
  .enter()
  .append('tr');

rows.append('td')
  .text(d => d.node);

rows.append('td')
  .text(d => d.behaviorScore);

rows.append('td')
  .text(d => d.numConnections);