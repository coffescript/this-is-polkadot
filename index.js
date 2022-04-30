'use strict';

const { ApiPromise, WsProvider } = require('@polkadot/api');

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

