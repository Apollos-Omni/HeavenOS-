contract VisionCovenant {
  address public founder;
  string public dreamName;
  uint256 public karmaStake;
  bool public violationFlagged;
  address[] public communityWatchers;

  function flagViolation(address witness) public {
    require(violationFlagged == false);
    violationFlagged = true;
    communityWatchers.push(witness);
  }

  function resolveDispute(bool isCleared) public onlyOracle {
    violationFlagged = !isCleared;
  }
}
