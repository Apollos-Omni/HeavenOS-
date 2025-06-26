// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HeavenDAO {
    struct Proposal {
        uint id;
        string description;
        address proposer;
        uint votesFor;
        uint votesAgainst;
        uint deadline;
        bool executed;
    }

    mapping(uint => Proposal) public proposals;
    mapping(address => uint) public karmaBalance;
    mapping(uint => mapping(address => bool)) public hasVoted;
    uint public nextProposalId;
    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    event ProposalCreated(uint id, string description, address proposer);
    event Voted(uint proposalId, address voter, bool support);
    event Executed(uint proposalId);

    constructor() {
        admin = msg.sender;
    }

    function setKarma(address user, uint amount) external onlyAdmin {
        karmaBalance[user] = amount;
    }

    function propose(string memory description) external {
        proposals[nextProposalId] = Proposal(
            nextProposalId,
            description,
            msg.sender,
            0,
            0,
            block.timestamp + 3 days,
            false
        );
        emit ProposalCreated(nextProposalId, description, msg.sender);
        nextProposalId++;
    }

    function vote(uint proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp < proposal.deadline, "Voting ended");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        hasVoted[proposalId][msg.sender] = true;
        uint karma = karmaBalance[msg.sender];
        require(karma > 0, "No karma to vote");

        if (support) {
            proposal.votesFor += karma;
        } else {
            proposal.votesAgainst += karma;
        }

        emit Voted(proposalId, msg.sender, support);
    }

    function execute(uint proposalId) external onlyAdmin {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Already executed");
        require(block.timestamp >= proposal.deadline, "Voting not ended");

        proposal.executed = true;
        // Place execution logic here (e.g. fund transfer, on-chain settings)
        emit Executed(proposalId);
    }
}
