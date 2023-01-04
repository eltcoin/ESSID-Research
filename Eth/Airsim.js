import _ from 'lodash';
import * as fs  from 'fs';
import * as crypto from 'crypto';

let shuffle = _.shuffle;

let generateTestDataEBSL = (numNodes, numGroups, numSybils) => {

    function generateName() {
        const names = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank', 'Gina', 'Henry', 'Ida', 'Jack'];
        return names[Math.floor(Math.random() * names.length)];
      }

      // Generate a random ID for a node
function generateId(_bytes=16) {
    return crypto.randomBytes(_bytes).toString('hex');
  }



  console.log('Generating test data...');

  // Generate an array of node IDs
  const nodeIds = [...Array(numNodes).keys()];

  console.log(`Generated array of ${numNodes} node IDs: ${nodeIds}`);

  // Shuffle the array of node IDs
  shuffle(nodeIds);

  console.log(`Shuffled array of node IDs: ${nodeIds}`);

  // Split the array of node IDs into two arrays: one for normal nodes, and one for Sybils
  const normalNodes = nodeIds.slice(0, numNodes - numSybils);
  const sybilNodes = nodeIds.slice(numNodes - numSybils);

  console.log(`Normal nodes: ${normalNodes}`);
  console.log(`Sybil nodes: ${sybilNodes}`);

  // Create an array of nodes with random subjective probabilities, evidence, and trust metrics
  const nodes = [];
  for (let i = 0; i < numNodes; i++) {
    
    // Assign the node to a random group
    const group = Math.floor(Math.random() * numGroups);
    // Generate random subjective probabilities
    const subjectiveProbs = {
      p: Math.random(),
      q: Math.random(),
      r: Math.random(),
    };
    // Normalize subjective probabilities so they sum to 1
    const totalProbs = subjectiveProbs.p + subjectiveProbs.q + subjectiveProbs.r;
    subjectiveProbs.p /= totalProbs;
    subjectiveProbs.q /= totalProbs;
    subjectiveProbs.r /= totalProbs;
    // Generate random evidence
    const evidence = {
      e1: Math.random(),
      e2: Math.random(),
      e3: Math.random(),
    };
    // Normalize evidence so it sums to 1
    const totalEvidence = evidence.e1 + evidence.e2 + evidence.e3;
    evidence.e1 /= totalEvidence;
    evidence.e2 /= totalEvidence;
    evidence.e3 /= totalEvidence;
    // Initialize trust metrics with 0% confidence
    const trustMetrics = {
      directTrust: 0,
      indirectTrust: 0,
      overallTrust: 0,
    };
    // Add the node to the array
    nodes.push({
      id: i,
      address: ('0x'+generateId()),
      name: generateName(),
      group,
      subjectiveProbs,
      evidence,
      trustMetrics,
      isSybil: (i < numSybils),  // Mark the first numSybils nodes as Sybils
    });
  }

const links = [];
for (let i = 0; i < numNodes; i++) {
  for (let j = i + 1; j < numNodes; j++) {
    // Only create a link between two nodes if they are not both Sybils and they are in the same group
    if (!(nodes[i].isSybil && nodes[j].isSybil) && nodes[i].group === nodes[j].group) {
      links.push({
        source: nodes[i].id,
        target: nodes[j].id,
        trust: 0,  // Initialize trust with 0% confidence
      });
    }
  }
}

console.log(`Generated array of ${links.length} link0: ${links[0]}`);

// Calculate trust metrics using Evidence Based Subjective Logic (EBSL)
for (const link of links) {
  const sourceNode = nodes.find((node) => node.id === link.source);
  const targetNode = nodes.find((node) => node.id === link.target);
  const linkTrust = ebsl(
    sourceNode.subjectiveProbs,
    targetNode.subjectiveProbs,
    sourceNode.evidence,
    targetNode.evidence,
  );
  link.trust = linkTrust;
  sourceNode.trustMetrics.directTrust += linkTrust;
  targetNode.trustMetrics.directTrust += linkTrust;
}


// Calculate indirect trust
for (const node of nodes) {
  let indirectTrust = 0;
  for (const neighbor of nodes) {
    if (neighbor.id !== node.id) {
      indirectTrust += neighbor.trustMetrics.directTrust;
    }
  }
  node.trustMetrics.indirectTrust = indirectTrust / nodes.length;
  console.log(`Updated ${node.id} with trustMetrics indirect trust value: ${node.trustMetrics.indirectTrust}`);
}

console.log(`Updated nodes with indirect trust values`);

// Calculate overall trust
for (const node of nodes) {
    node.trustMetrics.overallTrust = ((node.trustMetrics.directTrust + node.trustMetrics.indirectTrust) / nodes.length );
    console.log(`Computed ${node.id} with trustMetrics overall trust value: ${node.trustMetrics.overallTrust}`);
}

console.log(`Updated nodes with overall trust values`);

console.log('Test data generation complete.');

return { nodes, links };
}

const ebsl = (sourceProbs, targetProbs, sourceEvidence, targetEvidence) => {
    // Calculate the overall confidence of the source's subjective probabilities
    const sourceConfidence = (sourceProbs.p * sourceEvidence.e1) + (sourceProbs.q * sourceEvidence.e2) + (sourceProbs.r * sourceEvidence.e3);
    // Calculate the overall confidence of the target's subjective probabilities
    const targetConfidence = (targetProbs.p * targetEvidence.e1) + (targetProbs.q * targetEvidence.e2) + (targetProbs.r * targetEvidence.e3);
    // Calculate the overall trust in the link
    const trust = (sourceConfidence * targetConfidence) / (sourceConfidence + targetConfidence - sourceConfidence * targetConfidence);
    return trust;
  };

  let writeJSONDataToFile = (data, filePath) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
  
  writeJSONDataToFile(generateTestDataEBSL(30,5,11),'out.json');