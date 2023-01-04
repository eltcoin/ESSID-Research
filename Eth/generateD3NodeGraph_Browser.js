function generateNodeGraph(data) {
  // Create the SVG element to contain the nodegraph
  const svg = d3.select("body").append("svg")
    .attr("width", 1000)
    .attr("height", 500);

  // Define a force simulation and its properties
  const simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(d => d.id))
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(500, 250));

  // Create links from edges array in data object (data[i].edges)             
  let link = svg.append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(data[i].edges)
    .enter()
    .append('line');

  // Create nodes from nodes array in data object (data[i].nodes)      
  let node = svg.append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(data[i].nodes)
    .enter()
  
  // Add circles for each node, with labels and radius of 10px                                     
    
  svg.append('circle').attr('r', 10).text(d => d.label).call(d3drag = () => {
    simulation.alphaTarget(.5).restart()
  });

  // Update simulation with links and nodes arrays in data object     
  simulation.nodes(data[i].nodes).on("tick", ticked);

  function ticked() {
    link.attr("x1", function (d)).x().attr("y1", function (d)).y().attr("x2", function (d)).source().x().attr("y2", function (d)).source().y();
    node.attr("cx", function (d)).x().attr("cy", function (d)).y();
  };
}