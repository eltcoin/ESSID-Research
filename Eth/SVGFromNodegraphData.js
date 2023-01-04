// Require the necessary libraries 
import D3Node from 'd3-node';
const d3n = new D3Node(); // initializes D3 with container element

 
// Create a function to generate the nodegraph from the given data structure. 
function generateNodeGraph(data) {

    // Create an SVG element with width and height of 500px. 

        const svg = d3n.createSVG(500, 500);


    // Bind the data to a selection of nodes.
                                                 // Set their positions using x and y attributes. 
    const nodes = svg.selectAll(".node")     // Select all elements with class "node" in the SVG element
         .data(data.nodes)                            // Bind the data to selection of nodes
        .enter()                               // Enter new elements for each data point      
        .append("circle")                      // Append a circle element for each node         
        .attr("cx", (d, i) => (i * 50) + 25)    // Set x position as an incrementing value starting at 25          
        .attr("cy", 250)                     // Set y position as 250px           
        .attr("r", 10);                        // Set radius as 10px

    return svg;                             // Return the generated SVG element containing our node graph.  }
}
    /* Usage example: */


let exampleNodegraph = {
    nodes: [
      {
        id: '0x96fa4CBb4869eFdFEC0C97f1178CA02da4CFe084',
        type: 'normal'
      },
      {
        id: '0x09C2eEc16FC53F9fAF99c7ed4386707aab29A9F9',
        type: 'contract'
      }
    ],
    edges: [
      {
        source: '0x96fa4CBb4869eFdFEC0C97f1178CA02da4CFe084',
        target: '0x09C2eEc16FC53F9fAF99c7ed4386707aab29A9F9'
      }
    ]
  };

generateNodeGraph(exampleNodegraph);
console.log(d3n.svgString());