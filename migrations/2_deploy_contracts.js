let contract = artifacts.require("MiniVault");

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

module.exports = async function (deployer, network) {
    try {
        await deployer.deploy(contract, process.env.ACCOUNT1);
    } catch (e) {
        console.log(`Error in migration: ${e.message}`);
    }
}