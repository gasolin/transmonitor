/* global web3 */
import Web3 from 'web3'

let ethWeb3 = null

// follow https://github.com/ethereum/wiki/wiki/JavaScript-API
if (typeof web3 !== 'undefined') {
  ethWeb3 = new Web3(web3.currentProvider)
} else {
  // set the provider you want from Web3.providers
  ethWeb3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

export {
  ethWeb3
}
