// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract FoundingCode {
    string public founderName = "Apollos";
    string public purpose = "To ignite civilization through divine vision and digital truth.";
    string public genesisThreadHash;
    string public legacyStory;
    address public founder;

    event GenesisBlockSealed(string founder, string hash, uint256 timestamp);

    constructor(string memory _hash, string memory _story) {
        founder = msg.sender;
        genesisThreadHash = _hash;
        legacyStory = _story;
        emit GenesisBlockSealed(founderName, _hash, block.timestamp);
    }

    function verifyGenesis() public view returns (bool) {
        return bytes(genesisThreadHash).length > 0;
    }
}
