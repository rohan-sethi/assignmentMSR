const bip39 = require('bip39');
var hdkey = require('hdkey');
var ethUtil = require('ethereumjs-util');


var AssignWallet = function () {
  var self = this;

   //create seed
  self.createSeedFromMemonic = function (mnemonic) {
    self.seed = bip39.mnemonicToSeed(mnemonic);
  }
   //create key from seed
  self.getMasterNode = function () {
    self.ethroot = hdkey.fromMasterSeed(self.seed);
    self.masterPrivateKey = self.ethroot.privateKey.toString("hex");
  }
   
  // Get 0 chaild from mnemonic
  self.getNChild = function (mnemonic, child) {

    self.createSeedFromMemonic(mnemonic);
    self.getMasterNode();

    var ethNode = self.ethroot.derive("m/44'/60'/0'/0/" + child);
    var privateKey = ethNode._privateKey;
    var publicKey = ethUtil.privateToPublic(ethNode._privateKey);
    var address = ethUtil.publicToAddress(publicKey).toString("hex");
    let pubAddress = ethUtil.toChecksumAddress(address);
    console.log("address: " + address.toString("hex"));
    return { privateKey, pubAddress };
  }
}

module.exports = new AssignWallet();
