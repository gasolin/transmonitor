import {Observable} from 'rxjs'
import { GET_BLOCK } from '../types'
import { updateBlock } from '../actions'

export function getBlockEpic (action$, store, {getBlock$}) {
  return action$
    .filter(action => action.type === GET_BLOCK)
    .switchMap(action => getBlock$(action.payload))
    .switchMap(block => Observable.of(updateBlock(block)))
}

export default getBlockEpic
