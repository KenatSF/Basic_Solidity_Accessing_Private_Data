const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


var fs = require('fs');
var jsonFile = process.env.PATH_CONTRACT + "MiniVault.json";
var parsed= JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;

const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

// Accounts addresses
const address1 = process.env.ACCOUNT1;
const privateKey1 = process.env.ACCOUNT1_KEY;
const address2 = process.env.ACCOUNT2;
const privateKey2 = process.env.ACCOUNT2_KEY;

// Contract
const contractAddress = process.env.CONTRACT_ADDRESS;


async function fill_contract(_my_address, _my_private_key, _web3, _abi, _contractAddress, _gas_price, _password, _number, _check){
    try{
        const contract = new web3.eth.Contract(_abi, _contractAddress);
        
        const tx = {
            // this could be provider.addresses[0] if it exists
            from: _my_address, 
            // target address, this could be a smart contract address
            to: _contractAddress, 
            // optional if you want to specify the gas limit 
            gas: 300000, 
            // optional if you are invoking say a payable function 
            gasPrice: web3.utils.toWei(_gas_price.toString(), 'gwei'), // gas_price must be string
            // this encodes the ABI of the method and the arguements
            data: contract.methods.fill_array(_password, _number, _check).encodeABI() 
        };

        const signPromise = await web3.eth.accounts.signTransaction(tx, _my_private_key);
        const sentTx = await web3.eth.sendSignedTransaction(signPromise.raw || signPromise.rawTransaction); 
        console.log('-------------------------------------------------------------------------------');
        console.log("Transaction: ");
        console.log(sentTx);
    } catch (err) {
        console.log("--------------------------ERROR: MiniVault");
        console.log(err);
    }
}

async function get_owner() {
    try {
        const contract = new web3.eth.Contract(abi, contractAddress);

        const answer = await contract.methods.owner().call();
        console.log(answer);
      } catch (e) {
        console.log("------------------------------------");
        console.log("ERROR in: get_owner()");
        console.log("Error is because of owner variable is private!");
        console.log(" ");
      }
}


async function main_fill() {

    console.log('-------------------------------------------------------------------------------');
    console.log("Filling array: ");
    await fill_contract(address1, privateKey1, web3, abi, contractAddress, 45, "AAAbbbCCC", 66, true);
    await fill_contract(address2, privateKey2, web3, abi, contractAddress, 45, "Hola Kenat", 8, true);
    console.log(" ");

    
    get_owner();
}

async function main_read() {
    console.log('-------------------------------------------------------------------------------');
    console.log("Reading private data: ");
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    const private_owner = await web3.eth.getStorageAt(contractAddress, 0)
    console.log(`Owner: ${private_owner}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    const users_legth = await web3.eth.getStorageAt(contractAddress, 1);
    console.log(`Array length: ${users_legth}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Contract data: ");
    var array_sha = await web3.utils.soliditySha3({type: "uint", value: 1});

    var hex_index = BigInt(array_sha) + BigInt(3);
    const id_1 = await web3.eth.getStorageAt(contractAddress, hex_index.toString());

    hex_index = BigInt(array_sha) + BigInt(4);
    var password_1 = await web3.eth.getStorageAt(contractAddress, hex_index.toString());
    password_1 = web3.utils.toAscii(password_1);

    hex_index = BigInt(array_sha) + BigInt(5);
    const third_struct_element = await web3.eth.getStorageAt(contractAddress, hex_index.toString());

    console.log(`Id: ${id_1}`);
    console.log(`Password: ${password_1}`);
    console.log(`uint16 and bool, little endian order: ${third_struct_element}`);

    
}


async function main() {
    await main_fill();
    await main_read();
}

main();