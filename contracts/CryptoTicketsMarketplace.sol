// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./CryptoTicketsMatchNFTs.sol";

contract CryptoTicketsMarketplace is Pausable, AccessControl {
    // Other contracts
    CryptoTicketsMatchNFTs matchTicketsContract;

    struct Listing {
        uint256 price;
        address payable seller;
        uint256 tokenId;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    mapping(uint256 => address) public listingIds; // List of owners by token id
    uint256[] public tokensOnSale;

    address payable clubAddress;

    constructor(
        address matchTicketsContractAddresss,
        address payable clubOwnerAddress
    ) {
        matchTicketsContract = CryptoTicketsMatchNFTs(
            matchTicketsContractAddresss
        );
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DEFAULT_ADMIN_ROLE, clubOwnerAddress);
        clubAddress = clubOwnerAddress;
    }

    function addListing(uint256 tokenId, uint256 price) public {
        require(
            matchTicketsContract.ownerOf(tokenId) == msg.sender,
            "You don't own this token"
        );
        require(
            matchTicketsContract.isApprovedForAll(msg.sender, address(this)),
            "You are not approved for this contract"
        );

        listings[msg.sender][tokenId] = Listing(
            price,
            payable(msg.sender),
            tokenId
        );
        listingIds[tokenId] = msg.sender;
        tokensOnSale.push(tokenId);
    }

    function findTokenIdIndex(uint256 tokenId) public view returns (uint256) {
        uint256 i = 0;
        while (tokensOnSale[i] != tokenId) {
            i++;
        }
        return i;
    }

    function removeTokenIdFromSaleList(uint256 tokenId) public {
        uint256 index = findTokenIdIndex(tokenId);
        tokensOnSale[index] = tokensOnSale[tokensOnSale.length - 1];
        tokensOnSale.pop();
    }

    function removeListing(uint256 tokenId) public {
        require(
            matchTicketsContract.ownerOf(tokenId) == msg.sender,
            "You don't own this token"
        );
        require(
            matchTicketsContract.isApprovedForAll(msg.sender, address(this)),
            "You are not approved for this contract"
        );

        delete listingIds[tokenId];
        delete listings[payable(msg.sender)][tokenId];

        // Remove token from array of tokens on sale
        removeTokenIdFromSaleList(tokenId);
    }

    function purchase(uint256 tokenId) public payable {
        address ownerAddress = listingIds[tokenId];
        Listing memory item = listings[ownerAddress][tokenId];
        require(msg.value >= item.price / 1 wei, "You don't have enough money");
        require(msg.sender != item.seller, "You can't buy your own ticket");
        require(
            matchTicketsContract.ownerOf(tokenId) == ownerAddress,
            "The owner of this token is not the seller"
        );

        matchTicketsContract.safeTransferFrom(
            ownerAddress,
            msg.sender,
            tokenId
        );

        delete listingIds[tokenId];
        delete listings[ownerAddress][tokenId];
        // Remove token from array of tokens on sale
        removeTokenIdFromSaleList(tokenId);
        // Send money to seller and the fees for the club
        item.seller.transfer(((msg.value / 1 wei) * 90) / 100);
        clubAddress.transfer(((msg.value / 1 wei) * 10) / 100);
    }

    function getOnSaleTokens() public view returns (uint256[] memory) {
        return tokensOnSale;
    }

    function getOnSaleTokensInfo() public view returns (Listing[] memory) {
        Listing[] memory items = new Listing[](tokensOnSale.length);
        for (uint256 i = 0; i < tokensOnSale.length; i++) {
            items[i] = listings[listingIds[tokensOnSale[i]]][tokensOnSale[i]];
        }
        return items;
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
