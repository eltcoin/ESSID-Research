pragma solidity ^0.8.0;

contract KeyManagement {
    mapping(address => bytes32) public keys;

    function createKey() public {
        keys[msg.sender] = keccak256(abi.encodePacked(msg.sender, block.timestamp));
    }

    function revokeKey() public {
        delete keys[msg.sender];
    }

    function bindKeyToDID(address _owner, bytes32 _did) public {
        require(keys[_owner] != 0x0, "Key not yet created");
        require(keccak256(abi.encodePacked(_did)) == keys[_owner], "Key does not match DID");
    }
}

