import * as fs  from 'fs';
import * as faker from 'faker';

const NUM_NODES = 1000;
const NUM_SYBIL_NODES = 50;
const NUM_ORPHANED_SYBIL_NODES = 25;
const NUM_ORPHANED_LEGITIMATE_NODES = 25;
const NUM_DISPERSED_NODES = 50;
const NUM_COMMUNITIES = 10;
const NUM_AIRDROPS = 1000;

// Generate array of node IDs
const nodeIds = Array.from(Array(NUM_NODES).keys());

// Shuffle node IDs
nodeIds.sort(() => Math.random() - 0.5);

// Generate array of sybil node IDs
const sybilNodeIds = nodeIds.slice(0, NUM_SYBIL_NODES);

// Generate array of legitimate node IDs
const legitimateNodeIds = nodeIds.slice(NUM_SYBIL_NODES);

// Generate array of orphaned sybil node IDs
const orphanedSybilNodeIds = sybilNodeIds.slice(0, NUM_ORPHANED_SYBIL_NODES);

// Generate array of orphaned legitimate node IDs
const orphanedLegitimateNodeIds = legitimateNodeIds.slice(0, NUM_ORPHANED_LEGITIMATE_NODES);

// Generate array of dispersed node IDs
const dispersedNodeIds = nodeIds.slice(-NUM_DISPERSED_NODES);

// Initialize array of nodes
const nodes = [];

// Generate nodes
for (let i = 0; i < NUM_NODES; i++) {
  const nodeId = nodeIds[i];
  let type = 'Legitimate';
  let community = faker.random.arrayElement(Array.from(Array(NUM_COMMUNITIES).keys()));
  if (sybilNodeIds.includes(nodeId)) {
    type = 'Sybil';
  }
  if (orphanedSybilNodeIds.includes(nodeId) || orphanedLegitimateNodeIds.includes(nodeId)) {
    community = null;
  }
  if (dispersedNodeIds.includes(nodeId)) {
    community = 'Dispersed';
  }
  const name = faker.name.findName();
  const location = faker.address.country();
  const node = { nodeId, type, community, name, location };
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
