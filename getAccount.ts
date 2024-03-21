// const { HexString } = require("aptos/dist/hex_string");

// const { AccountAddress } = require("aptos/dist/transaction_builder/aptos_types/account_address");

// const {BCS} = require('aptos')
// const { SHA3 } = require('sha3');
// const {sha3_256} = require('js-sha3');
// const hex = require('string-hex')

// const resourceAddress = "891bdbd410600de9973cda45e61154f48500c1f0eb37eb0c2ff8d58b65be816c"

// const sourceAddress = "891bdbd410600de9973cda45e61154f48500c1f0eb37eb0c2ff8d58b65be816c"
// const seeds = hex("01")

// const source = BCS.bcsToBytes(AccountAddress.fromHex(sourceAddress));

// const see = new HexString(seeds).toUint8Array();

// let originBytes = new Uint8Array(source.length + see.length);
  
// originBytes.set(source);
// originBytes.set(see, source.length);

// const hash = new sha3_256.create();
// hash.update(Buffer.from(originBytes));

// const calculatedResourceAddress = hash.hex();

// console.log(calculatedResourceAddress);



