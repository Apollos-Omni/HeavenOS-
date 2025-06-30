// Solidity-like pseudocode

contract ImmortalMentorToken {
    mapping(address => bool) public hasMentorSeal;

    function mintMentorSeal(address user) external {
        require(!hasMentorSeal[user], "Already minted");
        hasMentorSeal[user] = true;
        // Emit Immortalized Event
    }

    function validateMentor(address user) public view returns (bool) {
        return hasMentorSeal[user];
    }
}
