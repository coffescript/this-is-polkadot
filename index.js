'use strict';

const {
    mnemonicGenerate,
    mnemonicValidate
} = require('@polkadot/util-crypto');
const {
    ApiPromise,
    WsProvider
} = require('@polkadot/api');
const {
    Keyring
} = require('@polkadot/keyring');
const keyring = new Keyring({ type: 'sr25519' });
const connect = async () => {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = new ApiPromise({ provider: wsProvider });
    return api.isReady;
};

const MEDIUM_1 = 'cruel leader remember night skill clump question focus nurse neck battle federal';

const createAccount = (mnemonic) => {
    mnemonic = mnemonic && mnemonicValidate(mnemonic)
        ? mnemonic
        : mnemonicGenerate();
    const account = keyring.addFromMnemonic(mnemonic);
    return { account, mnemonic };
}

const transfer = async (api) => {
    const { account: medium1 } = createAccount(MEDIUM_1);
    const { account: medium2, mnemonic } = createAccount();

    console.log(`"${mnemonic}"`);
    const amount = 15 * (10 ** api.registry.chainDecimals)
    const transfer = await api.tx.balances
        .transfer(medium2.address, amount)
        .signAndSend(medium1);

    console.log('transfer', transfer);
}

const main = async (api) => {
    console.log(`Our client is connected: ${api.isConnected}`);

    const { account: medium1 } = createAccount(MEDIUM_1);
    const balance = await api.derive.balances.all(medium1.address);
    const available = balance.availableBalance.toNumber();
    const dots = available / (10 ** api.registry.chainDecimals);
    const print = dots.toFixed(4);
    console.log(`Address ${medium1.address} has ${print} DOT`);

    transfer(api);
};
connect().then(main).catch((err) => {
    console.error(err)
}).finally(() => process.exit());