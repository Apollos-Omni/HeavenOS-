contract WillOfVision {
    address public heir;
    uint256 public unlockDate;
    uint public requiredVotes;
    string public posthumousProposal;
    mapping(address => bool) public hasVoted;
    uint public voteCount;

    constructor(address _heir, uint256 _unlockDate, uint _votes, string memory _proposal) {
        heir = _heir;
        unlockDate = _unlockDate;
        requiredVotes = _votes;
        posthumousProposal = _proposal;
    }

    function vote() public {
        require(!hasVoted[msg.sender], "Already voted.");
        hasVoted[msg.sender] = true;
        voteCount++;
    }

    function executeProposal() public {
        require(block.timestamp > unlockDate, "Too soon.");
        require(voteCount >= requiredVotes, "Not enough support.");
        // Proposal action goes live
    }
}
