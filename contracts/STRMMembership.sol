// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract STRMMembership is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Pausable,
    AccessControl,
    ERC721Burnable
{
    // Roles (administrador, club, abonado)
    bytes32 public constant CLUB_ADMIN_ROLE = keccak256("CLUB_ADMIN_ROLE");
    bytes32 public constant MEMBERSHIP_ROLE = keccak256("MEMBERSHIP_ROLE");
    mapping(address => bool) public clubAdmins;
    mapping(address => bool) public memberships;
    mapping(address => bool) public membershipsTokenMinted;

    // Events
    event MembershipTokenMinted(
        address indexed membershipId,
        uint256 indexed tokenId,
        string tokenURI
    );
    event ClubAdminRoleGranted(address indexed sender, address indexed clubAddress);
    event ClubAdminRoleRevoked(address indexed sender, address indexed clubAddress);
    event MembershipRoleGranted(address indexed sender, address indexed membershipAddress);
    event MembershipRoleRevoked(address indexed sender, address indexed membershipAddress);
    event ErrorTransferToken(address indexed sender, address indexed receiber, uint256 indexed tokenId, string errorMessage);

    using Counters for Counters.Counter;
    Counters.Counter private _membershipCounter;

    constructor() ERC721("T-3 Real Madrid Official Membership", "RMOM") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CLUB_ADMIN_ROLE, msg.sender);
        _grantRole(MEMBERSHIP_ROLE, msg.sender);
        clubAdmins[msg.sender] = true;
        memberships[msg.sender] = true;
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    // Minting of generation of the subscription by the Membership user
    function mintMembershipToken(string memory uri)
        public
        onlyRole(MEMBERSHIP_ROLE)
    {
        if (membershipsTokenMinted[msg.sender]) {
            revert("You already have a membership token minted");
        }
        uint256 tokenId = _membershipCounter.current();
        _membershipCounter.increment();

        _safeMint(msg.sender, tokenId);
        // ipfs://bafkreic3xz5cssins4ihcyoo27kcmflwmgqvpbm2stpr3xfxxnsykgkali
        _setTokenURI(tokenId, uri);
        membershipsTokenMinted[msg.sender] = true;
        // TODO: Call contract for seasons tokens airdrop
        emit MembershipTokenMinted(msg.sender, tokenId, uri);
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
        membershipsTokenMinted[msg.sender] = false;
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
        _grantRole(CLUB_ADMIN_ROLE, account);
        clubAdmins[account] = true;
        emit ClubAdminRoleGranted(msg.sender, account);
    }

    function revokeClubRol(address account)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _revokeRole(CLUB_ADMIN_ROLE, account);
        clubAdmins[account] = false;
        emit ClubAdminRoleRevoked(msg.sender, account);
    }

    function hasClubRol(address account) public view returns (bool) {
        return clubAdmins[account];
    }

    function grantMembershipRol(address account)
        public
        onlyRole(CLUB_ADMIN_ROLE)
    {
        _grantRole(MEMBERSHIP_ROLE, account);
        memberships[account] = true;
        emit MembershipRoleGranted(msg.sender, account);
    }

    function revokeMembershipRol(address account)
        public
        onlyRole(CLUB_ADMIN_ROLE)
    {
        _revokeRole(MEMBERSHIP_ROLE, account);
        memberships[account] = false;
        emit MembershipRoleRevoked(msg.sender, account);
    }

    function hasMembershipRol(address account) public view returns (bool) {
        return memberships[account];
    }

    function isMembershipTokenMinted(address account) public view returns (bool) {
        return membershipsTokenMinted[account];
    }

    function membershipsNumber() public view returns (uint256) {
        return _membershipCounter.current();
    }

}
