import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { VOTING_PERIOD, VOTING_DELAY, QUORUM_PERCENTAGE } from "../hardhat-helper";

const deployGovernorContract: DeployFunction = async function ( hre: HardhatRuntimeEnvironment ) {
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log, get} = deployments;
    const deployer = await getNamedAccounts();
    const governanceToken = await get("GovernanceToken");
    const timeLock = await get("TimeLock");
    log("Deploying governor");
    const governorContract = await deploy("GovernorContract", {
        from: deployer.deployer,
        args: [
            governanceToken.address,
            timeLock.address,
            VOTING_DELAY,
            VOTING_PERIOD,
            QUORUM_PERCENTAGE
        ],
        log: true
    })
};

export default deployGovernorContract;