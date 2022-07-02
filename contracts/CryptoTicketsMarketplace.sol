// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./CryptoTicketsMatchNFTs.sol";

contract CryptoTicketsMarketplace is Pausable, AccessControl {
    // Other contracts
    CryptoTicketsMatchNFTs matchTicketsContract;

    struct Listing {
      uint256 price;
      address payable seller;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    mapping(uint256 => address) public listingIds; // List of owners by token id
    uint256[] public tokensOnSale;

    address payable clubAddress;

    constructor(address matchTicketsContractAddresss, address payable clubOwnerAddress) {
        matchTicketsContract = CryptoTicketsMatchNFTs(matchTicketsContractAddresss);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DEFAULT_ADMIN_ROLE, clubOwnerAddress);
        clubAddress = clubOwnerAddress;
    }

    function addListing(uint256 tokenId, uint256 price) public {
        require(matchTicketsContract.ownerOf(tokenId) == msg.sender, "You don't own this token");
        require(matchTicketsContract.isApprovedForAll(msg.sender, address(this)), "You are not approved for this contract");

        listings[msg.sender][tokenId] = Listing(price, payable(msg.sender));
        listingIds[tokenId] = msg.sender;
        tokensOnSale.push(tokenId);
    }

    function removeListing(uint256 tokenId) public {
        require(matchTicketsContract.ownerOf(tokenId) == msg.sender, "You don't own this token");
        require(matchTicketsContract.isApprovedForAll(msg.sender, address(this)), "You are not approved for this contract");

        delete listingIds[tokenId];
        delete listings[payable(msg.sender)][tokenId];

        // Remove token from array of tokens on sale
        tokensOnSale[tokenId] = tokensOnSale[tokensOnSale.length - 1];
        tokensOnSale.pop();
    }

    function purchase(uint256 tokenId) public payable {
      address ownerAddress = listingIds[tokenId];
      Listing memory item = listings[ownerAddress][tokenId];
      require(msg.value >= item.price, "You don't have enough money");
      require(matchTicketsContract.ownerOf(tokenId) == ownerAddress, "The owner of this token is not the seller");

      matchTicketsContract.safeTransferFrom(ownerAddress, msg.sender, tokenId);

      delete listingIds[tokenId];
      delete listings[ownerAddress][tokenId];
      // Remove token from array of tokens on sale
      tokensOnSale[tokenId] = tokensOnSale[tokensOnSale.length - 1];
      tokensOnSale.pop();
      // Send money to seller and the fees for the club
      item.seller.transfer(msg.value * 90 / 100);
      clubAddress.transfer(msg.value * 10 / 100);
    }

    function getOnSaleTokens() public view returns (uint256[] memory) {
      return tokensOnSale;
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
