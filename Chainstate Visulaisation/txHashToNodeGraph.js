// Create a function to generate the node graph data from an Ethereum transaction hash

import ethers from "ethers";
import D3Node from "d3-node";

const d3n = new D3Node() // initializes D3 with container element



const provider = await new ethers.providers.JsonRpcProvider('https://rpc.testnet.tomochain.com/');

let isContract = async function (address) {
    let res = await provider.getCode(address);
    return res.length > 5;
};

async function generateNodeGraphData(transactionHash) {

    console.log("BlockNumber: " + await provider.getBlockNumber());
    try {
        var txDetails = await provider.getTransaction("0x1c7e589fc1ec651f2fae99b157bf385b9a05c88b7f464631609c16f51c1b9a70");
        console.log(txDetails);
    } catch (e) {
        console.error('ERROR ', e);
        return;
    }

    let fromAddress = txDetails.from;
    let toAddress = txDetails.to;

    // Initialize an array of nodes and edges for the graph data
    let nodes = [];
    let edges = [];

    // Create a node for each address involved in the transaction and add it to the node array, along with its type (normal or contract)
    nodes.push({
        id: fromAddress,
        type: isContract(fromAddress) ? 'contract' : 'normal'
    });
    nodes.push({
        id: toAddress,
        type: isContract(toAddress) ? 'contract' : 'normal'
    });

    // Create an edge between each address and add it to the edge array                          
    edges.push({
        source: fromAddress,
        target: toAddress
    });

    return {
        nodes,
        edges
    }; // Return both arrays as part of an object containing all graph data needed for D3 visualization 
}

/*
Create a function which returns a D3 graph initialized with given node graph data  
 Pass in generated graph data as parameter        
*/
function getD3Graph(graphData) {

    const width = 800; // Set width of SVG element        
    const height = 400; // Set height of SVG element             


    // Initialize SVG element using D3N library
    const svgElement = d3n.createSVG(width, height);
    // Add links between nodes using d3 library

    const randomXPos = (Math.random() * width);
    const randomYPos = (Math.random() * height);

    const linkElements = svgElement.selectAll("line")
        .data(graphData.edges)
        .enter()
        .append('line')
        .attr('stroke', 'red')
        .attr('stroke-width', 3);
    // Add nodes using D3 library
    const nodeElements = svgElement.selectAll("circle")
        .data(graphData.nodes)
        .enter()
        .append('circle')
        .attr('r', () => {
            return Math.random() * height
        })
        .attr("cx", randomYPos).attr("cy", randomYPos);


    return d3n.svgString();
}
let driverFunc = async () => {

    let txHashTestArray = [
        "0xbabd65c12058711e7feb3ba2ecb0ece94308824489e6c40f6d93c5d2ad5ebb2d",
        "0xa9b3d0156b3e76ae60ddad80a34f627523e45f0b1353e884773511d75a908fca",
        "0x90522e812960ecc340763658287a82056467805bc470b89669ccf91ee94fcff6",
        "0x09cbf74cab6863dafe4090a398900af09fd93705e1b8ca23bbb70e45faee8040",
        "0xeb3df2016110bfb51e1f925fe1053c8ee64a401e6f76924f5ddfee0f7d196a47",
        "0xa80d8e0a53e0649096c1ab47ef7e48d47f5887adca61938d0573bbceb8031e8f",
        "0x8232a10be482ded155678411c4273063a4772fb8f4ebb65bcbdb4bc8f69970b6"
    ]

    for (var _hash in txHashTestArray) {
        console.log('Testing with txhash: '+ txHashTestArray[_hash])
        let graphDataStruct = await generateNodeGraphData(txHashTestArray[_hash]);
        console.dir(graphDataStruct, {depth: null});
        let svgCode = getD3Graph(graphDataStruct);
        console.log("\n=============================================================================\n")
        console.log('\n+\n' + svgCode + '\n\n');
        console.log("\n=============================================================================\n")
    }

}
driverFunc();