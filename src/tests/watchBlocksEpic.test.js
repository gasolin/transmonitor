/* global it, expect */
import {ActionsObservable} from 'redux-observable'
import {WATCH_BLOCKS} from '../actions'
import {watchBlocksEpic} from '../epics/watchBlocksEpic'

it('should return correct actions', () => {
  const action$ = ActionsObservable.of({
    type: WATCH_BLOCKS
  })

  const output$ = watchBlocksEpic(action$)
  output$.subscribe(actions => {
    expect(actions.length).toBe(1)
  })
})
