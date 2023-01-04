import { default as Graph } from 'graphology';
import { centrality } from 'graphology-metrics';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('betweennessCentrality()', () => {
  it('should compute the betweenness centrality scores for a graph', async () => {
    const nodegraph = {
      nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
      edges: [
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'C'],
        ['B', 'D'],
        ['C', 'D'],
        ['C', 'E'],
        ['D', 'E'],
        ['E', 'F']
      ]
    };

    // Convert the nodegraph object into a Graphology graph object
    const graph = new Graph();
    for (const node of nodegraph.nodes) {
      graph.addNode(node);
    }
    for (const edge of nodegraph.edges) {
      graph.addEdge(edge[0], edge[1]);
    }

    const centralityScores = await centrality.betweenness(graph,{normalized:false});
    expect(centralityScores).to.deep.equal({
      A: 0,
      B: 0.025,
      C: 0.17500000000000002,
      D: 0.05,
      E: 0.2,
      F: 0
    });
  });
});