import {Observable} from 'rxjs';
import {ethWeb3} from '../web3connection';
import {
  QUICKLY_GET_BLOCK,
  saveBlock,
} from '../actions';

const getBlockNumber$ = new Observable(observer => {
  ethWeb3.eth.getBlockNumber((error, result) => {
    if (error) observer.erro(error);
    observer.next(result);
    observer.complete();
  });
});

const getBlock$ = (number) => new Observable(observer => {
  ethWeb3.eth.getBlock(number, true, (error, block) => {
    if (error) observer.error(error);
    observer.next(block);
    observer.complete();
  });
});

/**
 * Quickly get something to show.
 * Fetching the latest block number and get the block data
 */
export function quicklyGetBlockEpic(action$) {
  return action$
    .filter(action => action.type === QUICKLY_GET_BLOCK)
    .switchMap(() => getBlockNumber$)
    .switchMap(number => getBlock$(number))
    .switchMap(block => Observable.of(saveBlock(block)))
}

export default quicklyGetBlockEpic;
