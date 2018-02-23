import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';
import { LOAD_BLOCKS, clear } from '../actions';

function loadBlockEpic(action$) {
  return action$
    // .filter(action => action.type === LOAD_BLOCKS)
    // .do(action => console.log(action))
    // .ignoreElements();
    .ofType(LOAD_BLOCKS)
    .switchMap(() => {
      return Observable.of(clear()).delay(2000);
    })

}

export const rootEpic = combineEpics(loadBlockEpic);
