// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

import "./CryptoTicketsRewards.sol";

contract CryptoTicketsMatchNFTs is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Pausable,
    AccessControl,
    ERC721Burnable,
    ERC2981
{
    using Counters for Counters.Counter;

    CryptoTicketsRewards rewardsTicket;

    bytes32 public constant ADMIN_CLUB_ROLE = keccak256("ADMIN_CLUB_ROLE");
    Counters.Counter private _matchIdCounter;

    string contractURL;

    address[] public listSubscriber;
    mapping(uint256 => uint256) public tokensMintedByMatch;

    address payable clubAddress;

    uint96 private royaltyFeesInBips = 1000;

    constructor(address rewardsTicketAddress, address payable clubOwnerAddress)
        ERC721("CryptoTicketsMatchNFTs", "CTKMN")
    {
        rewardsTicket = CryptoTicketsRewards(rewardsTicketAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_CLUB_ROLE, msg.sender);
        clubAddress = clubOwnerAddress;
        setRoyaltyInfo(clubOwnerAddress, royaltyFeesInBips);
    }

    function contractURI() public pure returns (string memory) {
        return
            "https://ipfs.io/ipfs/bafkreiaw3nh6thv6e4x37hlvpyx2mu3tlf2zlcj2bkynxlbtd3ssvxoycm/";
    }

    function pause() public onlyRole(ADMIN_CLUB_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(ADMIN_CLUB_ROLE) {
        _unpause();
    }

    function mintMatchTicket(
        address to,
        string memory uri,
        uint256 randomNumber,
        uint256 carSize
    ) private {
        uint256 matchId = _matchIdCounter.current();
        _matchIdCounter.increment();
        _safeMint(to, matchId);
        _setTokenURI(
            matchId,
            string.concat(uri, Strings.toString(randomNumber % carSize))
        );
    }

    function airdropMatchTickets(
        uint256 matchId,
        uint256 maxCapacity,
        string memory uri,
        uint256 carSize
    ) public onlyRole(ADMIN_CLUB_ROLE) {
        require(
            tokensMintedByMatch[matchId] + listSubscriber.length <= maxCapacity,
            "Match is full"
        );
        uint256 randomNumber = tokensMintedByMatch[matchId];
        for (uint256 i = 0; i < listSubscriber.length; i++) {
            mintMatchTicket(listSubscriber[i], uri, randomNumber, carSize);
            randomNumber++;
        }
        tokensMintedByMatch[matchId] += listSubscriber.length;
    }

    function mintSaleMatchTicket(
        address to,
        uint256 matchId,
        uint256 maxCapacity,
        string memory uri,
        uint256 carSize
    ) public payable onlyRole(ADMIN_CLUB_ROLE) {
        require(
            tokensMintedByMatch[matchId] + 1 <= maxCapacity,
            "Match is full"
        );
        uint256 randomNumber = tokensMintedByMatch[matchId];
        mintMatchTicket(to, uri, randomNumber, carSize);
        tokensMintedByMatch[matchId] += 1;
        clubAddress.transfer(msg.value);
    }

    function getTotalMintedTicketsByMatchId(uint256 matchId)
        public
        view
        returns (uint256)
    {
        return tokensMintedByMatch[matchId];
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 matchId
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, matchId);
    }

    function _burn(uint256 matchId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(matchId);
    }

    function burnTicket(uint256 tokenId) public {
        _burn(tokenId);
        rewardsTicket.addListForRewards(msg.sender);
    }

    function tokenURI(uint256 matchId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(matchId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC2981, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function grantAdminRol(address account)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, account);
    }

    function grantClubRol(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(ADMIN_CLUB_ROLE, account);
        rewardsTicket.grantAdminRol(account);
    }

    function revokeClubRol(address account)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _revokeRole(ADMIN_CLUB_ROLE, account);
        rewardsTicket.revokeAdminRol(account);
    }

    function addAMembershipddress(address account)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        listSubscriber.push(account);
    }

    function findAddress(address value) public view returns (uint256) {
        uint256 i = 0;
        while (listSubscriber[i] != value) {
            i++;
        }
        return i;
    }

    function getAddressInfo() public view returns (address[] memory) {
        return (listSubscriber);
    }

    function removeMembershipAddress(address value) public {
        uint256 index = findAddress(value);
        listSubscriber[index] = listSubscriber[listSubscriber.length - 1];
        listSubscriber.pop();
    }

    function setRoyaltyInfo(address _receiver, uint96 _royaltyFeesInBips)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _setDefaultRoyalty(_receiver, _royaltyFeesInBips);
    }
}
