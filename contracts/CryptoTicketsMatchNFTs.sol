// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

import "./CryptoTicketsRewards.sol";

contract CryptoTicketsMatchNFTs is ERC721,  ERC721Enumerable,  ERC721URIStorage,  Pausable, AccessControl, ERC721Burnable, ERC2981
{
    using Counters for Counters.Counter;

    CryptoTicketsRewards rewardsTicket;

    bytes32 public constant ADMIN_CLUB_ROLE = keccak256("ADMIN_CLUB_ROLE");
    Counters.Counter private _matchIdCounter;

    string contractURL;

    address[] public listSubscriber;

    address payable public club;

    uint96 private royaltyFeesInBips = 1000;

    struct MatchTicket{
        uint matchId;
        string local;
        string visitor;
        uint maxCapacity;
        uint256 expirationDate;
    }
    MatchTicket[] matchList;

    event Status(string _message);
    event MsgInfoAccountListOk(string _message, address indexed account);
    event MsgInfoAccountListKo(string _message, address indexed account);
    event MsgInfoMinted(string _message, address indexed account);
    event ClubAdminRoleGranted(address indexed sender, address indexed clubAddress);
    event ClubAdminRoleRevoked(address indexed sender, address indexed clubAddress);

    constructor(address rewardsTicketAddress) ERC721("CryptoTicketsMatchNFTs", "CTKMN"){
        rewardsTicket = CryptoTicketsRewards(rewardsTicketAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_CLUB_ROLE, msg.sender);
        //uri=ipfs://bafkreic3xz5cssins4ihcyoo27kcmflwmgqvpbm2stpr3xfxxnsykgkali/season    
        setRoyaltyInfo(msg.sender, royaltyFeesInBips);
    }

    function contractURI() public pure returns (string memory) {
        return "https://ipfs.io/ipfs/bafkreiaw3nh6thv6e4x37hlvpyx2mu3tlf2zlcj2bkynxlbtd3ssvxoycm/";
    }

    function pause() public onlyRole(ADMIN_CLUB_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(ADMIN_CLUB_ROLE) {
        _unpause();
    }

    function mint(address to, string memory uri) private {
        uint256 matchId = _matchIdCounter.current();
        _matchIdCounter.increment();
        _safeMint(to, matchId);
        _setTokenURI(matchId, uri);
    }

    function mintTicket(address to, string memory uri) public payable {
        uint256 matchId = _matchIdCounter.current();
        _matchIdCounter.increment();
        _safeMint(to, matchId);
        _setTokenURI(matchId, uri);
    }

    function mintMatch(string memory uri) public onlyRole(ADMIN_CLUB_ROLE) {
       //uri=ipfs://bafybeidpaq5ba6237nat7nmj6yjrkfv2i3qdjj5tnh6kt4b7l7xd3te4u4/season0
        for (uint i = 0; i<listSubscriber.length; i++){
            mint(listSubscriber[i], uri);
        }
        emit MsgInfoMinted("The minting has been done correctly.", msg.sender);
    }

    function _beforeTokenTransfer(address from, address to, uint256 matchId) internal whenNotPaused override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, matchId);
    }

    function _burn(uint256 matchId) internal override(ERC721, ERC721URIStorage) {
        super._burn(matchId);
    }
    
    function burnTicket(uint256 tokenId) public  {
        _burn(tokenId);
        rewardsTicket.addListForRewards(msg.sender);
    }

    function tokenURI(uint256 matchId) public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(matchId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable, ERC2981, AccessControl) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function grantAdminRol(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(DEFAULT_ADMIN_ROLE, account);
    }

    function grantClubRol(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(ADMIN_CLUB_ROLE, account);
        emit ClubAdminRoleGranted(msg.sender, account);
    }

    function revokeClubRol(address account) public onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _revokeRole(ADMIN_CLUB_ROLE, account);
        emit ClubAdminRoleRevoked(msg.sender, account);
    }

    function addAddress(address account) public onlyRole(DEFAULT_ADMIN_ROLE){
        listSubscriber.push(account);
        emit MsgInfoAccountListOk("The account/address has been successfully registered.", account);
    }

    function getAddressInfo() public view returns(address[] memory){
        return(listSubscriber);
    }

    function removeAddressByIndex(uint i) public{
        listSubscriber[i] = listSubscriber[listSubscriber.length - 1];
        listSubscriber.pop();
    }

    function setRoyaltyInfo(address _receiver, uint96 _royaltyFeesInBips) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _setDefaultRoyalty(_receiver, _royaltyFeesInBips);
    }
/*
    function addMatchList(string memory local, string memory visitor, uint maxCapacity, uint256 expirationDate) public onlyRole(DEFAULT_ADMIN_ROLE){
        MatchTicket memory newMatch = MatchTicket(matchId, local, visitor, maxCapacity, expirationDate); 
        matchList.push(newMatch);
    }

    function getInfoMatchList() public view returns(MatchTicket[] memory) {
        return matchList;
    }
*/
}
