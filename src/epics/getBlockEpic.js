import {Observable} from 'rxjs';
import {ethWeb3} from '../web3connection';
import {
  WATCH_BLOCKS,
  saveBlock,
} from '../actions';

const watchBlocks$ = new Observable(observer => {
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
    .filter(action => action.type === WATCH_BLOCKS)
    .switchMap(() => watchBlocks$)
    .switchMap(block => Observable.of(saveBlock(block)));
    // .do(action => console.log(action))
    // .ignoreElements();
  }

export default getBlockEpic;
