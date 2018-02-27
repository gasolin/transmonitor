import {Observable} from 'rxjs';
import {ethWeb3} from '../web3connection';
import {
  GET_BLOCKS,
  saveBlock,
} from '../actions';

// const getBlockNumber$ = new Observable(observer => {
//   ethWeb3.eth.getBlockNumber((error, result) => {
//     if (error) observer.erro(error);
//     observer.next(result);
//     observer.complete();
//   });
// });

// const getBlock$ = (number) => new Observable(observer => {
//   console.log('fetching...', number)
//   ethWeb3.eth.getBlock(number, true, (error, block) => {
//     if (error) observer.error(error);
//     console.log('block #' + block.number);
//     console.log(`transactions: ${block.transactions.length}`);
//     // console.dir(block.transactions);
//     observer.next(block);
//     observer.complete();
//   });
// });

const watchBlock$ = new Observable(observer => {
  let filter = ethWeb3.eth.filter('latest');
  filter.watch((error, result) => {
    if (error) observer.error(error);
    ethWeb3.eth.getBlock(result, true,  (error, block) => {
      if (error) observer.error(error);
      if (block) {
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
