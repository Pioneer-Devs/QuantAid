// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract QuantaidProof {
    struct Proof {
        bytes32 dataHash;
        uint64 timestamp;
        address owner;
    }

    mapping(uint256 => Proof) public proofs;
    uint256 public proofCount;

    event DataSecured(uint256 indexed proofId, bytes32 dataHash, address owner);

    function secureDataset(bytes32 dataHash) external returns (uint256 proofId) {
        proofId = ++proofCount;
        proofs[proofId] = Proof(dataHash, uint64(block.timestamp), msg.sender);
        emit DataSecured(proofId, dataHash, msg.sender);
    }
}
