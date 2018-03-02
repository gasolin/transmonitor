import {Observable} from 'rxjs';
import {
  getBlock$,
  getBlockNumber$,
} from './web3wrap';
import {
  QUICKLY_GET_BLOCK,
  saveBlock,
} from '../actions';

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
