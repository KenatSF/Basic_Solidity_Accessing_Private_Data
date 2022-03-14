// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract MiniVault {
    address private owner;

    struct User {
        uint id;
        bytes32 password;
        uint16 number;
        bool check;
    }

    User[] private users;

    constructor(address _owner) {
        owner = _owner;
    }

    function fill_array(string calldata _password, uint16 _number, bool _check) public returns (bool) {
        uint index = users.length;
        users.push(User({
            id: index,
            password: bytes32(bytes(_password)),
            number: _number,
            check: _check
            }));

        return true;
    }

    function get_legth() public view returns (uint) {
        return users.length;
    }

}




