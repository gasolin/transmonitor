/* global it, expect */
import {ActionsObservable} from 'redux-observable'
import {GET_BLOCK} from '../actions'
import {getBlockEpic} from '../epics/getBlockEpic'

it('should return correct actions', () => {
  const action$ = ActionsObservable.of({
    type: GET_BLOCK,
    payload: 123456
  })

  const output$ = getBlockEpic(action$)
  output$.subscribe(actions => {
    expect(actions.length).toBe(1)
  })
})
