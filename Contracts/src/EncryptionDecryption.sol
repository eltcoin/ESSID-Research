pragma solidity ^0.8.0;

contract EncryptionDecryption {

    mapping(address => bytes) public publicKeys;

    function encrypt(address _recipient, bytes memory _plaintext) public returns (bytes memory) {
        require(publicKeys[_recipient] != 0x0, "Public key not yet set");
        // encryption logic goes here
        // ...
    }

    function decrypt(bytes memory _ciphertext) public returns (bytes memory) {
        require(keccak256(abi.encodePacked(msg.sender)) == publicKeys[msg.sender], "Invalid private key");
        // decryption logic goes here
        // ...
    }
}

