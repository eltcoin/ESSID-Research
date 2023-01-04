import { create, all } from 'mathjs'
export let PageRank = (nodegraph, dampingFactor = 0.85) => {

    const math = create(all,  {})
    const pageRankCentralities = {};
    const centralities = [];
    const edges = [];
    console.dir(nodegraph, {depth:null});
    nodegraph = nodegraph.default;
    console.dir(nodegraph, {depth:null});
    nodegraph.edges.forEach((edge) => {
        edges.push([nodegraph.nodes.indexOf(edge[0]), nodegraph.nodes.indexOf(edge[1])]);
    });
    const adjacencyMatrix = Array(nodegraph.nodes.length).fill(null).map(() => Array(nodegraph.nodes.length).fill(0));
    edges.forEach((edge) => {
        adjacencyMatrix[edge[0]][edge[1]] += 1;
        adjacencyMatrix[edge[1]][edge[0]] += 1;
    });
    const outDegree = Array(nodegraph.nodes.length).fill(null).map(() => Array(nodegraph.nodes.length).fill(0));
    adjacencyMatrix.forEach((row, i) => {
        const sum = row.reduce((acc, val) => acc + val, 0);
        outDegree[i][i] = sum;
    });
    const transitionProbabilities = math.divide(adjacencyMatrix, outDegree);
    const teleportationProbabilities = Array(nodegraph.nodes.length).fill(null).map(() => Array(nodegraph.nodes.length).fill(1 / nodegraph.nodes.length));
    const pageRank = Array(nodegraph.nodes.length).fill(null).map(() => Array(nodegraph.nodes.length).fill(1 / nodegraph.nodes.length));
    const ones = Array(nodegraph.nodes.length).fill(1).map(() => Array(nodegraph.nodes.length).fill(1));
    let previousPageRank = pageRank;
    let currentPageRank = math.add(math.multiply(math.multiply(transitionProbabilities, pageRank), dampingFactor), math.multiply(teleportationProbabilities, 1 - dampingFactor));
    let iteration = 0;
    while (math.distance(previousPageRank, currentPageRank) > 1e-10 && iteration < 100) {
        previousPageRank = currentPageRank;
        currentPageRank = math.add(math.multiply(math.multiply(transitionProbabilities, pageRank), dampingFactor), math.multiply(teleportationProbabilities, 1 - dampingFactor));
        iteration += 1;
    }
    nodegraph.nodes.forEach((node, i) => {
        pageRankCentralities[node] = currentPageRank[i][i];
    });
    return pageRankCentralities;
};