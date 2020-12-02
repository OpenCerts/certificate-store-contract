// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.6.10;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";

import "./BaseDocumentStore.sol";

contract UpgradableDocumentStore is Initializable, OwnableUpgradeable {
  function initialize(string memory _name, address owner) public initializer {
    super.__Ownable_init();
    super.transferOwnership(owner);
    version = "3.0.0";
    BaseDocumentStore.name = _name;
  }

  function issue(bytes32 document) public override(BaseDocumentStore) onlyOwner onlyNotIssued(document) {
    return BaseDocumentStore.issue(document);
  }

  function revoke(bytes32 document)
    public
    override(BaseDocumentStore)
    onlyOwner
    onlyNotRevoked(document)
    returns (bool)
  {
    return BaseDocumentStore.revoke(document);
  }
}