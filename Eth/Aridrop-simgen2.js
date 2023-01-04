import * as crypto from 'crypto';

import fs from 'fs';

import D3Node from 'd3-node';
const d3n = new D3Node(); // initializes D3 with container element
const width = 800;
const height = 600;

 

function generateSvg(data) {
  // Set the dimensions of the SVG

  // Create the SVG element

  var svg = d3n.createSVG(width,height)
  // Create the nodes
  const nodes = svg.append('g')
    .selectAll('circle')
    .data(data.nodes)
    .join('circle')
      .attr('r', 10)
      .attr('fill', '#ddd')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

  // Create the links
  const links = svg.append('g')
    .selectAll('line')
    .data(data.links)
    .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

  // Return the SVG element as a string
  return d3n.svgString() 
}

// Write the given data to a JSON file at the specified path
function writeJSONDataToFile(data, filePath) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
function writeDataToFile(data, filePath) {
  fs.writeFileSync(filePath, data, null, 2);
}

// Generate a random ID for a node
function generateId(_bytes=16) {
  return crypto.randomBytes(_bytes).toString('hex');
}

// Generate a random name for a node
function generateName() {
  const names = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank', 'Gina', 'Henry', 'Ida', 'Jack'];
  return names[Math.floor(Math.random() * names.length)];
}

// Generate test data for a PGP-style web of trust
function generateTestData(numNodes, numSybils) {
  // Generate the nodes
  const nodes = [];
  for (let i = 0; i < numNodes; i++) {
    let trustMetrics;
    if (i < numSybils) {
      // Generate lower trust metrics for sybil nodes
      trustMetrics = {
        directTrust: Math.random() * 0.4 + 0.3,
        indirectTrust: Math.random() * 0.4 + 0.3,
        overallTrust: Math.random() * 0.4 + 0.3
      };
    } else {
      // Generate higher trust metrics for non-sybil nodes
      trustMetrics = {
        directTrust: Math.random() * 0.4 + 0.7,
        indirectTrust: Math.random() * 0.4 + 0.7,
        overallTrust: Math.random() * 0.4 + 0.7
      };
    }
    nodes.push({
      id: generateId(16),
      name: generateName(),
      trustMetrics: trustMetrics
    });
  }

  // Generate the links between nodes
  const links = [];
  for (let i = 0; i < numNodes; i++) {
    for (let j = i + 1; j < numNodes; j++) {
      links.push({
        source: i,
        target: j,
        trust: Math.random()
      });
    }
  }

  // Return the test data as a JSON object
  return {
    nodes: nodes,
    links: links
  };
}


// Compute the x and y coordinates for a node based on the trust metrics
function computeNodeCoordinates(node) {
  const x = node.trustMetrics.directTrust * width;
  const y = node.trustMetrics.indirectTrust * height;
  return { x: x, y: y };
}

// Extend the given dataset by adding x and y coordinates to each node
function extendDataset(data) {
  data.nodes.forEach(node => {
    const coords = computeNodeCoordinates(node);
    node.x = coords.x;
    node.y = coords.y;
  });
}

// Generarte This Test
const testData = generateTestData(25, 4);

extendDataset(testData);
const fileID = generateId(4);
const outputDirectory = './generated-output/'

console.log('Generating simulation ID: ' + fileID);

writeJSONDataToFile(testData, (outputDirectory+'outputDataset_'+ fileID + '_.JSON'));

const svg = generateSvg(testData);
// console.log(svg);

writeDataToFile(svg, (outputDirectory+'outputDataset_' + fileID + '_.SVG'));

// console.log(JSON.stringify(testData, null, 2));