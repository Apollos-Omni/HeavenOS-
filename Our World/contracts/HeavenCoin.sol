// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./HeavenDAO.sol";

contract HeavenCoin {
    string public name = "HeavenCoin";
    string public symbol = "HVN";
    uint8 public decimals = 18;
    uint public totalSupply;

    address public admin;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this.");
        _;
    }

    constructor() {
        admin = msg.sender;
        dao = HeavenDAO(daoAddress);
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    function mint(address to, uint amount) external onlyAdmin {
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
        _mint(user, karmaAmount * 10 ** decimals());
    }

    function transfer(address to, uint amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance.");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint amount) external returns (bool) {
        require(balanceOf[from] >= amount, "Insufficient balance.");
        require(allowance[from][msg.sender] >= amount, "Allowance exceeded.");
        balanceOf[from] -= amount;
        allowance[from][msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }

    function burnForPenalty(address user, uint amount) external onlyAdmin {
        _burn(user, amount * 10 ** decimals());
    }
}
