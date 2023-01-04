import ethers from "ethers";




async function createNodeGraph(txHash) {
    const provider = await new ethers.providers.JsonRpcProvider('https://rpc.testnet.tomochain.com/');


    // get transaction details from txHash 
    const txDetails = await provider.getTransaction(txHash);


    // create graph object to store nodes and edges    
    let graph = {
        nodes: [],
        edges: []
    };


    // add sender address as node with label 'Sender'    
    graph.nodes.push({
        id: txDetails.from,
        label: 'Sender'
    });


    // add recipient address as node with label 'Recipient'     
    graph.nodes.push({
        id: txDetails.to,
        label: 'Recipient'
    });


    // add edge from sender to recipient    
    graph.edges.push({
        from: txDetails.from,
        to: txDetails.to
    });


    // get receipt details from transaction hash                       
    const receipt = await provider.getTransactionReceipt(txHash);


    // iterate over all contract invocations in the receipt                              
    for (let i = 0; i < receipt['logs'].length; i++) {

        // get the contract address of invocation                                     
        let contractAddress = receipt['logs'][i].address;


        // check if contract address is already a node in the graph                   
        let existingNodeIndex = -1;

        for (let j = 0; j < graph['nodes'].length; j++) {
            if (graph['nodes'][j]["id"] == contractAddress) {
                existingNodeIndex = j;

                break;

            }
        }
        // if not already present in the graph then add it as a node with label "Contract"
        if (existingNodeIndex == -1) {
            graph['nodes'].push({
                id: contractAddress,
                label: "Contract"
            });
        } else { // else just update its label to "Contract" 
            graph["nodes"][existingNodeIndex]["label"] = "Contract";
        }
    }
    return graph;
}


let driverFunc = async () => {


    let txHashTestArray = [
        "0xbabd65c12058711e7feb3ba2ecb0ece94308824489e6c40f6d93c5d2ad5ebb2d",
        "0xa9b3d0156b3e76ae60ddad80a34f627523e45f0b1353e884773511d75a908fca",
        "0x90522e812960ecc340763658287a82056467805bc470b89669ccf91ee94fcff6",
        "0x09cbf74cab6863dafe4090a398900af09fd93705e1b8ca23bbb70e45faee8040",
        "0xeb3df2016110bfb51e1f925fe1053c8ee64a401e6f76924f5ddfee0f7d196a47",
        "0xa80d8e0a53e0649096c1ab47ef7e48d47f5887adca61938d0573bbceb8031e8f",
        "0x8232a10be482ded155678411c4273063a4772fb8f4ebb65bcbdb4bc8f69970b6",
        "0xf0f5f6b93b6064725a903ea7f870757e565d721e35ab88c4fdb691b5e54666cd",
        "0x50fa0e1834451e725bf3c949bc714bacd4e49541cc47ca1fc397ec05c103ff0e",
        "0x1299455a59431591d085e8890bee8d9c04c4ba121bd6c48d7c689d4c1810edf1",
        "0xa9a8eb130093e173e4d03a3674228823183c0e57fae862b1ef8db3b7efb40719",
        "0xf45ee246c8f7e6008b62a0d9d9192018a32dbd7c937fcd04ff0ab12c2d638bb0",
        "0x4c40c08a1801d6a5f711d0d1744e3d59a21d67868a3af316d40878133de6841e",
        "0x3372d1739816fc49fba87ea572d5e2e0fc9709bccbbbdad422bc15996ca2e561",
        "0x4b118e3acae39feda8888e9effbdf5336fc69404dca24fbecef199cb2f2246fd",
        "0xf835e9782f55062dbde310956a81b4e25fde5e8676b22fb9f2f076189fd27a88",
        "0x797411586599f7705b9f411dc4fafd30d8426ad19ca6e3fb39daa745606d6b27",
        "0x216ac621f89fc6091c33072070a00ebc55ce4b205e072e072d97ee2976ed2ebc",
        "0x17203dd777db2ed48e85487e24140ab2cf97aaf334a4434d8c6ca9fae7c88c7f",
        "0x375b2bdf3ef5fec2a0ee33f118a263a56d97656eb61cfaaefdd9b15ee43b00cb",
        "0x1944cc79b4450a0caf32a59372b96bd01c71426fd7612e583b3a8fc1c890a14d",
        "0x356f60f20af83f214054ff0f1fc76ce670e261fcd1051abf05bf9c11590401b5",
        "0x057f08a1547996bf19afc836cdfef790bad6496c64d1d1d30f7664c5fb54fb6c",
        "0xbce5f500fdab36d0af3de42c0c56a51def46ac79f642b19074e841da6c5187a4",
        "0x3d3cc78a96297cd0151d8ccaceacf9da75500ce476d91756bb0d15f53048102d",
        "0x01b16440e65acf8cc510132b7933ab9c29ae2c59695e665bd76c5f2c6979157b",
        "0x0b23fcf966d41b14f8f50f38e3ab97ffcef7eb3b27a2aa34e9f23690f19efce6",
        "0x67a1d0bda0e5945726b534453d95644219adfb3d8ca17e5ea063fed69b460a70",
        "0x8d0434783d9de3c9f2fce9941d90234540fa904177549a8319eabb5979793ef9",
        "0x66f96f0ac3366661b726b81b83476181f8f0b53bb50dec2200d4750440a9e8b4",
        "0x5e0fee56799c2a5c94dd6a011e3b51326f067a7dc8a87a2ff9f198dc9cfc502e",
        "0x89dbf725813cff10d35f3838bc59c01d9f02219327ac99c5bb5dd4c077d0c273",
        "0x1089abb3f11536bdcf4f33ffc2dd6a8e8c465214c95ba688c38741b42a005e10",
        "0x271a7d6518f629d2060597b3ac00a1ee7ae46bf70af978903594ca761d1f39c6",
        "0xfe5f170ca35886d47690bbe8e8017e5122dfa13fa1e7160295d8e88ab775dd36",
        "0x57f5a9bfef6a9fa7c041ff6406aee102dde77ebed9ce6973dccdf71fa5007150",
        "0x96ec06e9201e22e8e106317743a3cbabc7f289aaaf3e8b93a81d0144ff7f56b1",
        "0x7db1a4a5ec1391b5af5dcc89c256dd6f6c61a816a6bbbf49652d578a16942fee",
        "0x777b14389939923a8d309edf4cc3e052ad9c63894b6db9f684a6b48e7f67a24e",
        "0x2e476ba092099bf134cc3a72a36602b5dbbab1b8c10fd54cc5b68b8808ee32a9",
        "0xf7e548d4dd98bb6ecb6e28c2045ee02a4a908cd8b6d69d5d3d67c4151f6b76e7",
        "0xd82d682146dd0f992949329e08471b73dd63b8316d94b8bac5135c9a34ac4613",
        "0x8f5ff9a24413dd0e75629d1a415c38ea58a26bbe58b86f7edfc4d21c18ce9594",
        "0x26fa97c14e3efae4a7467204b87de12551e106bb0574b45d8c0640d261791160",
        "0xfe451dd72b2c7954e2946bef7c7aca2ebdf2d724fbca9cc7ae371cfc793a095d",
        "0xa38a21c163e9a91bf9c8956b882acf610676b932f34165d8ae27605c2d27f639",
        "0xff8d4708f95cc0c332cdcc1a95013fca216da90ca95c24116dccabe2aa0610c1",
        "0x107409b9524ccb8c7bb03e04d887c28c50f84ff5cc90f2f6576884e18e4fcb82",
        "0xddda0d3be6acaf07561f1f0963a8f88aa79f277df34c5f4aedf12775cb19dd2f",
        "0x9008a493ecb8a8bfb637e0d6d33d0348fa296004c9d7cc4e94ecf4236644ef26",
        "0xb977cec80a84e299e9488baa77547ee242ef7a8573e8260be3e5454980c54273",
        "0x16ccd0af8165b8cd644f4e4d45018510571431c66f56e20a0a40bcc38371d2d6",
        "0x30a4aa1b79f2dbcb35ee6e453f44a4773a2c272cb991b2a978569a71e97ca3cf",
        "0xf91278b51f89773fcbd0f431d4970e7750db8387fedcdf3d9e4d0d9401ecd141",
        "0xd0c53369d7b2140aa9a0d07c72d9007fecf670f70f559c5e3666b9b24acdeb67",
        "0x120b9fd8ea552d15e9a9136d6b8c2a94f10aeaf59f2746a171ea83407d1a741d",
        "0x410f5734b35320c028bb3a10d5aca41ad6160421b4d8d4dcaf2e7fc280c54e8d"
    ]


    var graphArray = [];
    console.log("Building Transactions Graph...");
    for (var _hash in txHashTestArray) {
        console.log('Testing with txhash: ' + txHashTestArray[_hash])
        let graphDataStruct = await createNodeGraph(txHashTestArray[_hash]);
        // console.dir(graphDataStruct, {
        //     depth: null
        // });
        graphArray.push(graphDataStruct);
    }
    console.dir(graphArray, {
        depth: null
    });
    return graphArray;
};

let completeGraphArray = await driverFunc();

console.log(JSON.stringify(completeGraphArray));