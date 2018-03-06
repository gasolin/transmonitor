import Web3 from 'web3'

let ethWeb3 = null

// follow https://github.com/ethereum/wiki/wiki/JavaScript-API
if (typeof window.web3 !== 'undefined') {
  ethWeb3 = new Web3(window.web3.currentProvider)
} else {
  console.log('No web3? You should consider trying MetaMask!')
  // set the provider you want from Web3.providers
  // ethWeb3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

export {
  ethWeb3
}
