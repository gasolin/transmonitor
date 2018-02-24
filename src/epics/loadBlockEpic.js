import {Observable} from 'rxjs';
import {
  clear,
  LOAD_BLOCKS,
} from '../actions';

export function loadBlockEpic(action$) {
  return action$
    // .filter(action => action.type === LOAD_BLOCKS)
    // .do(action => console.log(action))
    // .ignoreElements();
    .ofType(LOAD_BLOCKS)
    .switchMap(() => {
      return Observable.of(clear()).delay(2000);
    });
}

export default loadBlockEpic;
