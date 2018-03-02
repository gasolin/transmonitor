import {Observable} from 'rxjs';
import {getBlock$} from './web3wrap';
import {
  GET_BLOCK,
  updateBlock,
} from '../actions';

export function getBlockEpic(action$) {
  return action$
    .filter(action => action.type === GET_BLOCK)
    .switchMap(action => getBlock$(action.payload))
    .switchMap(block => Observable.of(updateBlock(block)));
}

export default getBlockEpic;
