/* global it, expect */
import {ActionsObservable} from 'redux-observable'
import {QUICKLY_GET_BLOCK} from '../actions'
import {quicklyGetBlockEpic} from '../epics/quicklyGetBlockEpic'

it('should return correct actions', () => {
  const action$ = ActionsObservable.of({
    type: QUICKLY_GET_BLOCK
  })

  const output$ = quicklyGetBlockEpic(action$)
  output$.subscribe(actions => {
    expect(actions.length).toBe(1)
  })
})
