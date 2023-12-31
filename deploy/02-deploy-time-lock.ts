import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { MIN_DELAY } from "../hardhat-helper";

const deployTimeLock: DeployFunction = async function ( hre: HardhatRuntimeEnvironment ) {
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log} = deployments;
    const deployer = await getNamedAccounts();
    log("Deploying Time Lock...");
    const timeLock = await deploy("TimeLock", {
        from: deployer.deployer,
        args: [MIN_DELAY, [], []],
        log: true
    });
};

export default deployTimeLock;