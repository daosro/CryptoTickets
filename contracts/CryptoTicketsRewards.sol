// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

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

    //numero de elementos del car
    uint256 carRewardsSize = 6;
    string baseURI =
        "ipfs://bafybeiauikp6mbdabfmfq6rwvgwr6zh3uoxxlnzixbjmzzx77jp6waxvq4/";

    address[] public listUserRewards;
    address payable public club;

    event Status(string _message);
    event MsgInfoAccountListOk(string _message, address indexed account);
    event MsgInfoMinted(string _message, address indexed account);

    constructor() ERC721("CryptoTicketsRewards", "CTKRW") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function getBaseURI() public view returns (string memory, uint256) {
        return (baseURI, carRewardsSize);
    }

    function setBaseURI(string memory newBaseURI, uint256 numElements)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        carRewardsSize = numElements;
        baseURI = newBaseURI;
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function random(uint256 countListElementRewards, uint256 countRandom)
        private
        view
        returns (uint8)
    {
        return
            uint8(
                (uint256(
                    keccak256(
                        abi.encodePacked(
                            block.timestamp,
                            block.difficulty,
                            countRandom
                        )
                    )
                ) % countListElementRewards) + 1
            );
    }

    function mint(address to, uint256 countRandom) private {
        uint256 rewardId = _rewardIdCounter.current();
        _rewardIdCounter.increment();
        _safeMint(to, rewardId);
        _setTokenURI(
            rewardId,
            Strings.toString(random(carRewardsSize, countRandom))
        );
    }

    function mintReward() public onlyRole(DEFAULT_ADMIN_ROLE) whenNotPaused {
        for (uint256 i = 0; i < listUserRewards.length; i++) {
            mint(listUserRewards[i], i);
        }
        removeListUserRewards();
        emit MsgInfoMinted("The minting has been done correctly.", msg.sender);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 rewardId
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, rewardId);
    }

    function _burn(uint256 rewardId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(rewardId);
    }

    function burnReward(uint256 tokenId) public {
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

    function grantAdminRol(address account)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, account);
    }

    function addListForRewards(address account)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        listUserRewards.push(account);
        emit MsgInfoAccountListOk("Account registered.", account);
    }

    function getListAddressRewardsInfo()
        public
        view
        onlyRole(DEFAULT_ADMIN_ROLE)
        returns (address[] memory)
    {
        return (listUserRewards);
    }

    function removeListUserRewards() internal onlyRole(DEFAULT_ADMIN_ROLE) {
        delete listUserRewards;
    }
}
