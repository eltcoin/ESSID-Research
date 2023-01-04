import ethers from 'ethers';
import D3Node from "d3-node";

const d3n = new D3Node() // initializes D3 with container element

let generateNodeGraph = async (txHash) => {

    console.log(`Generating TX nodegraph for txhash: ${txHash}`);

    // Get the transaction details from Etherscan API
    const provider = await new ethers.providers.JsonRpcProvider('https://rpc.testnet.tomochain.com/');
    const txDetails = await provider.getTransaction(txHash);

    // Generate a node graph using the transaction details
    const nodes = [];
    nodes.push({
        id: txDetails.from,
        type: 'address'
    }); // add source address to node list

    if (txDetails.to) { // add destination address to node list if present
        nodes.push({
            id: txDetails.to,
            type: 'address'
        });
    }

    if (txDetails.creates) { // add contract address to node list if present
        nodes.push({
            id: txDetails.creates,
            type: 'contract'
        });
    }

    for (let i = 0; i < nodes.length; i++) { // create links between all nodes in the graph
        for (let j = i + 1; j < nodes.length; j++) {
            const link = {
                sourceIdx: i,
                destIdx: j
            };
            nodes[i].links = [...nodes[i].links || [], link];
        }
    }
    return nodes;
}
let generateSVG = async (nodes) => {

    console.dir(nodes, {
        depth: null
    })

    let width = 1024;
    let height = 768;

    var svgElement = d3n.createSVG(width, height);

    svgElement.selectAll("g").
    data(nodes).
    join("g").
    attr("transform", d => `translate(${d[0]},${d[1]})`).
    append("circle").
    attr("r", 80);
    //Output Stringified SVG code. 
    console.log(d3n.svgString());
}
let main = async () => {
    generateSVG(await generateNodeGraph('0xa9b3d0156b3e76ae60ddad80a34f627523e45f0b1353e884773511d75a908fca'));
}

//Hacking around here

const createNodeGraph = (dataArray) => {
    // use d3 to create the SVG container
    let width = 1024;
    let height = 768;

    var svgElement = d3n.createSVG(width, height);


    // create a force simulation for the nodes and edges of the graph, then add forces to the simulation 
    const simulation = d3.forceSimulation()
        .nodes(dataArray)
        .force('charge', d3.forceManyBody().strength(-20))
        .force('center', d3.forceCenter(250, 250));

    // add nodes to the SVG container  
    const node = svgContainer.append('g')
        .selectAll('circle')
        .data(dataArray) // bind data array to selection      
        .enter().append('circle').attr('r', 5).attr('fill', '#ccc'); // enter selection and apply attributes to each circle element       


    // add edges between nodes using links from data array  

    // apply attributes to each line element
    // append line elements for each edge in data array            
    const link_line = svgContainer.append("g")
        .selectAll("line")
        .data(dataArray.edges)
        .enter()
        .append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "#999");


    // update positions of elements on tick event of force simulation                               
    // update position of circles on tick event of force simulation
    // update position of lines on tick event of force simulation
    // simulate forces with a duration of 300 ms
    // stop animation after duration is complete
    simulation.on('tick', (t) => {
        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
        link_line.attr('x1', (d) => d.sourceX)
            .attr('y1', (d) => dsourceY)
            .attr('x2', (d) => targetX)
            .atrr('y2', (d) => targetY);
    }).alphaTarget(0).restart().stop();

};


main();