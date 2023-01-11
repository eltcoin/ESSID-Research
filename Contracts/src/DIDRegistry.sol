pragma solidity ^0.8.0;

contract DIDRegistry {

    mapping(address => bytes32) public dids;

    function registerDID(bytes32 _did) public {
        require(dids[msg.sender] == 0x0, "DID already registered");
        dids[msg.sender] = _did;
    }

    function updateDID(bytes32 _did) public {
        require(dids[msg.sender] != 0x0, "DID not yet registered");
        dids[msg.sender] = _did;
    }

    function resolveDID(address _owner) public view returns (bytes32) {
        return dids[_owner];
    }
}

