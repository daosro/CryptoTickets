// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Match is 
    ERC721, 
    ERC721Enumerable, 
    ERC721URIStorage, 
    Pausable, 
    AccessControl, 
    ERC721Burnable, 
    EIP712, 
    ERC721Votes 
{
    using Counters for Counters.Counter;

    bytes32 public constant ADMIN_CLUB_ROLE = keccak256("ADMIN_CLUB_ROLE");
    Counters.Counter private _matchIdCounter;

    address[] public listSubscriber;

    address payable public club;
    address public newOwner;

    uint private basePrice;
    bool private activeContract;

    event Status(string _message);
    event MsgInfoAccountListOk(string _message, address indexed account);
    event MsgInfoAccountListKo(string _message, address indexed account);
    event MsgInfoMinted(string _message);
    event ClubAdminRoleGranted(address indexed sender, address indexed clubAddress);
    event ClubAdminRoleRevoked(address indexed sender, address indexed clubAddress);

    //BuyMatchTicket
    //Generar una lista con las entradas disponibles = entradas venta club + entradas venta abonados
    //Generaria un mapping de contrato-tipoEntrada-precio-entrada??
    //AddSale and removeSale
    
    

    struct MatchTransactionTicket{
        address account;
        string typeTicket;
        uint price;
        //entrada?
    }

    constructor() ERC721("Match", "MTC") EIP712("Match", "1") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_CLUB_ROLE, msg.sender);
        //uri=ipfs://bafkreic3xz5cssins4ihcyoo27kcmflwmgqvpbm2stpr3xfxxnsykgkali/season
        activeContract = true;

        // register the supported interfaces to conform to ERC721 via ERC165
        _registerInterface(_INTERFACE_ID_ERC721);
        _registerInterface(_INTERFACE_ID_ERC721_METADATA);
        _registerInterface(_INTERFACE_ID_ERC721_ENUMERABLE);
        // Royalties interface
        _registerInterface(_INTERFACE_ID_ERC2981);
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

    //The tokens for each of the matches are minted to the list of subscribers
    function mintMatch(string memory uri) public onlyRole(ADMIN_CLUB_ROLE) {
       //uri=ipfs://bafkreic3xz5cssins4ihcyoo27kcmflwmgqvpbm2stpr3xfxxnsykgkali/season
        for (uint i = 0; i<listSubscriber.length-1; i++){
            mint(listSubscriber[i], uri);
        }
        emit MsgInfoMinted("The minting has been done correctly.", msg.sender);
    }

    function _beforeTokenTransfer(address from, address to, uint256 matchId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, matchId);
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 matchId)
        internal
        override(ERC721, ERC721Votes)
    {
        super._afterTokenTransfer(from, to, matchId);
    }

    function _burn(uint256 matchId) internal override(ERC721, ERC721URIStorage) {
        super._burn(matchId);
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
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function grantClubRol(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(ADMIN_CLUB_ROLE, account);
        emit ClubAdminRoleGranted(msg.sender, account);
    }

    function revokeClubRol(address account)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _revokeRole(ADMIN_CLUB_ROLE, account);
        emit ClubAdminRoleRevoked(msg.sender, account);
    }

    function addAddress(address account) public onlyRole(ADMIN_CLUB_ROLE) {
        for (uint i = 0; i<listSubscriber.length-1; i++){
            if(listSubscriber[i] == account){
                emit MsgInfoAccountLisKo("The account/address was already registered.", account);
            } else {
                listSubscriber.push(account);
                emit MsgInfoAccountLiOk("The account/address has been successfully registered.", account);
            }
            listSubscriber[i] = listSubscriber[i+1];
        }
    }

    function removeAddress(address account) public onlyRole(ADMIN_CLUB_ROLE)  {
        address[] memory listAuxSubscriber = new address[](listSubscriber.length-1);
        uint index = 0;
        for (uint256 i = 0; i < listSubscriber.length - 1; i++) {
            if(listSubscriber[i] != account){
                listAuxSubscriber[index] = account;
                index ++;
            } 
        }
        listSubscriber = listAuxSubscriber;
    }

/*
    function approve(address to, uint256 tokenId) public {    
        address owner = ownerOf(tokenId);    
        require(to != owner);    
        require(msg.sender == owner || isApprovedForAll(owner, msg.sender));    
        _tokenApprovals[tokenId] = to;    
        emit Approval(owner, to, tokenId);
        }
*/

/*
    function buyMatchTicket() public payable{
        if(activeContract == false){
            emit Status("No es posible realizar la compra, el contrato esta inactivo.");
        } else {
            if (msg.value > basePrice){
                // Se realiza la transferencia del precio de la entrada al club
                club.transfer(msg.value - basePrice);
                //Deshabilitamos el contrato
                activeContract = false;
                emit Status("La compra de la entrada se ha realizado correctamente.");
            } else {
                emit Status("No es posible la compra, el importe no es suficiente");
            }
        }
    }
*/

}
