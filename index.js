'use strict';

const { ApiPromise, WsProvider } = require('@polkadot/api');
const { mnemonicGenerate } = require('@polkadot/util-crypto');
const { Keyring } = require('@polkadot/keyring');
const { mnemonicValidate } = require('@polkadot/util-crypto');

const connect = async () => {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = new ApiPromise({ provider: wsProvider });
    return api.isReady;
}

connect().then((api) => {
    console.log(`Our client is connected: ${api.isConnected}`);
}).catch((error) => {
    console.log(error);
}).finally(() => process.exit());

const keyring = new Keyring({ type: 'ethereum' });
const mnemonic = mnemonicGenerate();
const account = keyring.addFromMnemonic(mnemonic);

console.log(`Address: ${account.address}`);
console.log(`Mnemonic: ${mnemonic}`);
