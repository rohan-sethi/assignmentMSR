
const constants = require('../constants');
const _RESULT_FAIL = 0;
const _RESULT_PASS = 1;
const Web3 = require("web3");
const getPriKey = require('./wallet');
const web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/b0306f277cf34712b516c45ea381ed15"));
var contractObj = new web3.eth.Contract(constants.C_ABI, constants.C_ADDRESS);
const ethTx = require("ethereumjs-tx");


function generateTransaction(toAddress, nonce, hexData, gasLimit, gasPrice, privateKey) {
    return new Promise(function (resolve, reject) {
        const params = { nonce: nonce, chainId: 42, to: toAddress, gasPrice: web3.utils.toHex(gasPrice + 5000000000), gasLimit: web3.utils.toHex(gasLimit), data: hexData };
        const tx = new ethTx(params);
        tx.sign(privateKey);
        const serializedTx = tx.serialize();
        resolve(serializedTx);
    });
}

// Certify artist
exports.setCertify = async function setData(password, id) {
    //Get Admin password
    const obj = getPriKey.getNChild(password, 0)
    const privateKey = obj.privateKey;
    const pubAddress = obj.pubAddress;
    const nonceVal = await getNonce(pubAddress);
    let gasLimitValue = "80000";

    var methodHash = contractObj.methods.checkArtist(id);
    var encodeMethodhash = methodHash.encodeABI();
    let gasPriceValue = await getGasPrice();
    
    // Send Tx with value
    return new Promise(async function (resolve, reject) {
        generateTransaction(constants.C_ADDRESS, nonceVal, encodeMethodhash, gasLimitValue, gasPriceValue, privateKey).then(
            serializedTx => {
                console.log("TX: " + serializedTx);
                web3.eth.sendSignedTransaction(`0x${serializedTx.toString("hex")}`)
                    .once("transactionHash", function name(hash) {
                        console.log(hash,"Tx hash");
                        resolve(hash);
                    })
                    .on('error', function err(err) {
                        resolve(Number(0));
                    })
            });
    });
}

// Counts no of entries
exports.getArtistDataCount = async function getData() {
    return new Promise(async function (resolve, reject) {
        contractObj.methods.getArtistCount().call()
            .then(function (result) {
                resolve(Number(result));
            });
    });
}

// Get artist data
exports.getArtistData = async function getDataInfo(count) {
    console.log(count);
    return new Promise(async function (resolve, reject) {

        contractObj.methods.artist(count).call()
            .then(function (result) {
                resolve((result));
            });
    });
}

//Get nounce for Tx
function getNonce(address) {
    ethAddress = '0x' + address;
    return new Promise(function (resolve, reject) {
        web3.eth.getTransactionCount(address)
            .then(result => {
                console.log("count is: " + result);
                resolve(result);
            })
            .catch(error => {
                console.log("error occured while fetching transaction count: " + error);
                reject(new Error(error));
            });
    });
}

function getGasPrice() {
    console.log(" gas price achieved..");
    return new Promise(function (resolve, reject) {
        web3.eth.getGasPrice()
            .then(result => {
                console.log(result);
                resolve(Number(result));
            })
            .catch(error => {
                console.log('error gas price: ' + error);
                resolve(error);
            });
    });
}



