/* global web3 */
import {Observable} from 'rxjs';
import Web3 from 'web3';
import {
  GET_BLOCKS,
  saveBlock,
} from '../actions';

// follow https://github.com/ethereum/wiki/wiki/JavaScript-API
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// const observableGetBlockNumber = new Observable(observer => {
//   web3.eth.getBlockNumber((error, result) => {
//     if (error) observer.erro(error);
//     observer.next(result);
//     observer.complete();
//   });
// });

// const observableGetBlock = (number) => new Observable(observer => {
//   console.log('fetching...', number)
//   web3.eth.getBlock(number, true, (error, block) => {
//     if (error) observer.error(error);
//     console.log('block #' + block.number);
//     console.log(`transactions: ${block.transactions.length}`);
//     // console.dir(block.transactions);
//     observer.next(block);
//     observer.complete();
//   });
// });

const watchBlock$ = new Observable(observer => {
  let filter = web3.eth.filter('latest');
  filter.watch((error, result) => {
    if (error) observer.error(error);
    web3.eth.getBlock(result, true,  (error, block) => {
      if (error) observer.error(error);
      if (block) {
        console.log('block #' + block.number);
        console.log(`transactions: ${block.transactions.length}`);
        // console.dir(block.transactions);
        observer.next(block);
        // observer.complete();
      }
    });
  });
});

export function getBlockEpic(action$) {
  return action$
    .filter(action => action.type === GET_BLOCKS)
    .switchMap(() => watchBlock$)
    // .switchMap(() => observableGetBlockNumber)
    // .switchMap(number => observableGetBlock(number))
    .switchMap(block => {
      return Observable.of(saveBlock(block));
    });
    // .do(action => console.log(action))
    // .ignoreElements();
  }

export default getBlockEpic;
