pragma solidity ^0.8.0;

contract TrustRegistry {

    mapping(address => uint) public trustScores;

    function endorseNode(address _node) public {
        require(msg.sender != _node, "Cannot endorse self");
        trustScores[_node]++;
    }

    function computeTrustScore(address _node) public view returns (uint) {
        return trustScores[_node];
    }
}

