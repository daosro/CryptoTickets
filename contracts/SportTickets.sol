// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SportTickets is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Pausable,
    AccessControl,
    ERC721Burnable
{
    // Roles (administrador, club, abonado)
    bytes32 public constant ADMIN_CLUB_ROLE = keccak256("ADMIN_CLUB_ROLE");
    bytes32 public constant SUBSCRIBER_ROLE = keccak256("SUBSCRIBER_ROLE");

    using Counters for Counters.Counter;
    Counters.Counter private _subscriberCounter;

    constructor() ERC721("RMRM Fan Token D1", "RMRM") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_CLUB_ROLE, msg.sender);
        _grantRole(SUBSCRIBER_ROLE, msg.sender);
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    // Minting of generation of the subscription by the subscriber user
    function mintSubscriberNFT(string memory uri)
        public
        onlyRole(SUBSCRIBER_ROLE)
    {
        uint256 tokenId = _subscriberCounter.current();
        _subscriberCounter.increment();

        _safeMint(msg.sender, tokenId);
        // ipfs://bafkreic3xz5cssins4ihcyoo27kcmflwmgqvpbm2stpr3xfxxnsykgkali
        _setTokenURI(tokenId, uri);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    //ROLES FOR ASSIGNING AND UNASSIGNING ROLES
    function grantClubRol(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(ADMIN_CLUB_ROLE, account);
    }

    function revokeClubRol(address account)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _revokeRole(ADMIN_CLUB_ROLE, account);
    }

    function grantSubscriberRol(address account)
        public
        onlyRole(ADMIN_CLUB_ROLE)
    {
        _grantRole(SUBSCRIBER_ROLE, account);
    }

    function revokeSubscriberRol(address account)
        public
        onlyRole(ADMIN_CLUB_ROLE)
    {
        _revokeRole(SUBSCRIBER_ROLE, account);
    }
}
