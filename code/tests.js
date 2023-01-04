import  {PageRank}  from './PageRank.js';

import * as nodegraph from './ExampleNodegraph.js';

console.log(nodegraph);


let pageRankCentralities = PageRank(nodegraph);

console.log(pageRankCentralities);