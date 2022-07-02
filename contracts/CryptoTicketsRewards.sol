// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CryptoTicketsRewards is 
    ERC721, 
    ERC721Enumerable, 
    ERC721URIStorage, 
    Pausable, 
    AccessControl, 
    ERC721Burnable
{
    using Counters for Counters.Counter;
    Counters.Counter private _rewardIdCounter;

    address[] public listUserRewards;
    address payable public club;

    event Status(string _message);
    event MsgInfoAccountListOk(string _message, address indexed account);
    event MsgInfoMinted(string _message, address indexed account);

    constructor() ERC721("CryptoTicketsRewards", "CTKRW"){
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        //uri=ipfs://bafkreic3xz5cssins4ihcyoo27kcmflwmgqvpbm2stpr3xfxxnsykgkali/season
        
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function mint(address to) private {
        uint256 rewardId = _rewardIdCounter.current();
        _rewardIdCounter.increment();
        _safeMint(to, rewardId);
        _setTokenURI(rewardId, Strings.toString(block.number%5));
    }

    function mintReward() public onlyRole(DEFAULT_ADMIN_ROLE) 
    whenNotPaused
    {
       //uri=ipfs://bafybeidpaq5ba6237nat7nmj6yjrkfv2i3qdjj5tnh6kt4b7l7xd3te4u4/season0
        for (uint i = 0; i<listUserRewards.length; i++){
            mint(listUserRewards[i]);
        }
        emit MsgInfoMinted("The minting has been done correctly.", msg.sender);
        removeListUserRewards();
    }

    function _beforeTokenTransfer(address from, address to, uint256 rewardId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, rewardId);
    }

    function _burn(uint256 rewardId) internal override(ERC721, ERC721URIStorage) {
        super._burn(rewardId);
    }
    
    function burnReward(uint256 tokenId) public  {
        _burn(tokenId);
    }

    function tokenURI(uint256 rewardId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(rewardId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function grantAdminRol(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(DEFAULT_ADMIN_ROLE, account);
    }

    function addAddress(address account) public onlyRole(DEFAULT_ADMIN_ROLE){
        listUserRewards.push(account);
        emit MsgInfoAccountListOk("Account registered.", account);
    }

    function getAddressInfo() public view onlyRole(DEFAULT_ADMIN_ROLE) returns(address[] memory) {
        return(listUserRewards);
    }

    function removeListUserRewards() internal onlyRole(DEFAULT_ADMIN_ROLE){
        delete listUserRewards;
    }

}
