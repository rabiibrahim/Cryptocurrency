import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';

const web3 = new Web3(new HDWalletProvider(
    'emotion example corn wagon limb obscure dog song water slim boost glue',
    'https://rinkeby.infura.io/v3/d50bc4a3a4574425a177291745ce5991'
));

export default web3;