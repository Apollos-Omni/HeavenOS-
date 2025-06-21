// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./HeavenDAO.sol";

contract HeavenCoin is ERC20 {
    address public admin;
    HeavenDAO public dao;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    constructor(address daoAddress) ERC20("HeavenCoin", "HVC") {
        admin = msg.sender;
        dao = HeavenDAO(daoAddress);
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    function mintForKarma(address user, uint karmaAmount) external onlyAdmin {
        _mint(user, karmaAmount * 10 ** decimals());
    }

    function burnForPenalty(address user, uint amount) external onlyAdmin {
        _burn(user, amount * 10 ** decimals());
    }
}
