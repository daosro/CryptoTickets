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

import "./CryptoTicketsMatchNFTs.sol";

contract CryptoTicketsMatchManagement is Pausable, AccessControl {
    CryptoTicketsMatchNFTs matchTicketsContract;

    using Counters for Counters.Counter;
    Counters.Counter private _matchNumberCounter;

    address payable public club;

    struct MatchInfo {
        uint256 matchId;
        string local;
        string visitor;
        string baseURI;
        uint256 maxCapacity;
        uint256 expirationDate;
        uint256 totalSales;
        uint256 carTotalTokens;
    }

    uint256[] matchIdList;
    mapping(uint256 => MatchInfo) public matchList;

    constructor(address matchTicketsContractAddresss) {
        matchTicketsContract = CryptoTicketsMatchNFTs(
            matchTicketsContractAddresss
        );
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function addNewMatch(
        string memory local,
        string memory visitor,
        string memory baseURI,
        uint256 maxCapacity,
        uint256 expirationDate
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 matchId = _matchNumberCounter.current();
        MatchInfo memory matchInfo = MatchInfo(
            matchId,
            local,
            visitor,
            baseURI,
            maxCapacity,
            expirationDate,
            0,
            6
        );
        matchList[matchId] = matchInfo;
        matchIdList.push(matchId);
        _matchNumberCounter.increment();
    }

    function getAllMatchs() public view returns (MatchInfo[] memory) {
        MatchInfo[] memory matchInfoList = new MatchInfo[](matchIdList.length);
        for (uint256 i = 0; i < matchIdList.length; i++) {
            matchInfoList[i] = matchList[matchIdList[i]];
        }
        return matchInfoList;
    }

    function getMatch(uint256 matchId) public view returns (MatchInfo memory) {
        return matchList[matchId];
    }

    function getMatchIdList() public view returns (uint256[] memory) {
        return matchIdList;
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function airdropMatchTickets(uint256 matchId)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        MatchInfo memory matchInfo = matchList[matchId];
        require(matchInfo.totalSales < matchInfo.maxCapacity, "Match is full");

        matchTicketsContract.airdropMatchTickets(
            matchInfo.matchId,
            matchInfo.maxCapacity,
            matchInfo.baseURI,
            matchInfo.carTotalTokens
        );

        uint256 newTotalSales = matchTicketsContract
            .getTotalMintedTicketsByMatchId(matchId);
        matchInfo.totalSales = newTotalSales;
        matchList[matchId] = matchInfo;
    }

    // function mintSaleMatchTicket(address to, string memory uri) public payable {
    //     uint256 matchId = _matchIdCounter.current();
    //     _matchIdCounter.increment();
    //     _safeMint(to, matchId);
    //     _setTokenURI(matchId, uri);
    // }

    function grantAdminRol(address account)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, account);
    }

    function revokeAdminRol(address account)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _revokeRole(DEFAULT_ADMIN_ROLE, account);
    }
}
