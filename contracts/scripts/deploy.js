const hre = require("hardhat");

async function main() {
  console.log("Deploying RocketCrash contract...");

  const RocketCrash = await hre.ethers.getContractFactory("RocketCrash");
  const rocketCrash = await RocketCrash.deploy();

  await rocketCrash.waitForDeployment();

  const address = await rocketCrash.getAddress();
  console.log("RocketCrash deployed to:", address);

  // Verify contract on Etherscan (if not on localhost)
  if (hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
    console.log("Waiting for block confirmations...");
    await rocketCrash.deploymentTransaction().wait(6);
    
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("Contract verified on Etherscan!");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }

  console.log("Deployment completed successfully!");
  console.log("Contract address:", address);
  console.log("Network:", hre.network.name);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 