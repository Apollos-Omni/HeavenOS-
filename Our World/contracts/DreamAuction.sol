// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DreamAuction {
    struct Auction {
        string dreamTitle;
        address creator;
        uint256 deadline;
        uint256 highestBid;
        address highestBidder;
        bool ended;
    }

    mapping(uint => Auction) public auctions;
    mapping(uint => mapping(address => uint)) public bids;
    uint public auctionCount;

    event NewBid(uint auctionId, address bidder, uint amount);
    event AuctionEnded(uint auctionId, address winner, uint amount);

    function createAuction(string memory title, uint durationInMinutes) external {
        auctionCount++;
        auctions[auctionCount] = Auction({
            dreamTitle: title,
            creator: msg.sender,
            deadline: block.timestamp + (durationInMinutes * 1 minutes),
            highestBid: 0,
            highestBidder: address(0),
            ended: false
        });
    }

    function bid(uint auctionId) external payable {
        Auction storage auction = auctions[auctionId];
        require(block.timestamp < auction.deadline, "Auction ended");
        require(msg.value > auction.highestBid, "Bid too low");

        // Refund previous highest
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        auction.highestBid = msg.value;
        auction.highestBidder = msg.sender;
        bids[auctionId][msg.sender] += msg.value;

        emit NewBid(auctionId, msg.sender, msg.value);
    }

    function endAuction(uint auctionId) external {
        Auction storage auction = auctions[auctionId];
        require(block.timestamp >= auction.deadline, "Still active");
        require(!auction.ended, "Already ended");
        require(msg.sender == auction.creator, "Only creator");

        auction.ended = true;
        payable(auction.creator).transfer(auction.highestBid);

        emit AuctionEnded(auctionId, auction.highestBidder, auction.highestBid);
    }
}

// After auction ends
address vault = 0xVAULTADDRESS;
(bool sent, ) = payable(vault).call{value: highestBid}("");
require(sent, "Failed to deposit to vault");
