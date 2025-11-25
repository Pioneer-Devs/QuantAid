import { ethers } from "hardhat";

async function main() {
  const QuantaidProof = await ethers.getContractFactory("QuantaidProof");
  const contract = await QuantaidProof.deploy();
  await contract.waitForDeployment();
  console.log("QuantaidProof deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
