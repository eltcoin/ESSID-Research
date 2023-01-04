const fs = require('fs');
const faker = require('faker');

const NUM_NODES = 1000;
const NUM_SYBIL_NODES = 50;
const NUM_AIRDROPS = 1000;

// Generate array of node IDs
const nodeIds = Array.from(Array(NUM_NODES).keys());

// Shuffle node IDs
nodeIds.sort(() => Math.random() - 0.5);

// Generate array of sybil node IDs
const sybilNodeIds = nodeIds.slice(0, NUM_SYBIL_NODES);

// Generate array of legitimate node IDs
const legitimateNodeIds = nodeIds.slice(NUM_SYBIL_NODES);

// Initialize array of nodes
const nodes = [];

// Generate nodes
for (let i = 0; i < NUM_NODES; i++) {
  const nodeId = nodeIds[i];
  const type = sybilNodeIds.includes(nodeId) ? 'Sybil' : 'Legitimate';
  const name = faker.name.findName();
  const location = faker.address.country();
  const node = { nodeId, type, name, location };
  nodes.push(node);
}

// Initialize array of airdrops
const airdrops = [];

// Generate airdrops
for (let i = 0; i < NUM_AIRDROPS; i++) {
  const airdropId = i;
  const senderId = faker.random.arrayElement(nodeIds);
  const recipientId = faker.random.arrayElement(nodeIds);
  const value = faker.random.number({ min: 1, max: 100 });
  const airdrop = { airdropId, senderId, recipientId, value };
  airdrops.push(airdrop);
}

// Write nodes and airdrops to file
const data = { nodes, airdrops };
fs.writeFileSync('data/data.json', JSON.stringify(data));
