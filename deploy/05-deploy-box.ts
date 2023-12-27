import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers } from "hardhat";

const deployBox: DeployFunction = async function ( hre: HardhatRuntimeEnvironment ) {
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log, get} = deployments;
    const deployer = await getNamedAccounts();
    log("Deploying Box...");
    const box = await deploy("Box", {
        from: deployer.deployer,
        args: [],
        log: true
    });
    const timeLock = await get("TimeLock");
    const timeLockContract = await ethers.getContractAt("TimeLock", timeLock.address);
    const boxContract = await ethers.getContractAt("Box", box.address);
    const transferOwnerTx = await boxContract.transferOwnership(timeLockContract.address);
    await transferOwnerTx.wait(1);
    log("YOU DUN IT");

};

export default deployBox;