pragma solidity ^0.8.0;

contract EncryptedMessaging {
    mapping(address => bytes) public messages;
    mapping(address => address[]) public authorized;
    function postMessage(address recipient, bytes message) public {
        require(authorized[msg.sender].length > 0 && authorized[msg.sender].contains(recipient), "Not authorized to post a message to that recipient");
        messages[recipient] = message;
    }
    function readMessage() public view returns(bytes){
        return messages[msg.sender];
    }
    function authorize(address recipient) public {
        authorized[msg.sender].push(recipient);
    }
}

