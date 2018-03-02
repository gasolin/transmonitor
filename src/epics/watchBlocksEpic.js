import {Observable} from 'rxjs'
import {watchBlocks$} from './web3wrap'
import {
  WATCH_BLOCKS,
  saveBlock
} from '../actions'

export function watchBlocksEpic (action$) {
  return action$
    .filter(action => action.type === WATCH_BLOCKS)
    .switchMap(() => watchBlocks$)
    .switchMap(block => Observable.of(saveBlock(block)))
    // .do(action => console.log(action))
    // .ignoreElements();
}

export default watchBlocksEpic
