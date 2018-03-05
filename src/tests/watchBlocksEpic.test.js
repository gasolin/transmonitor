/* global it, expect */
import {Observable} from 'rxjs'
import {BigNumber} from 'bignumber.js'
import {ActionsObservable} from 'redux-observable'
import {
  SAVE_BLOCK,
  WATCH_BLOCKS
} from '../actions'
import {watchBlocksEpic} from '../epics/watchBlocksEpic'

it('should return correct actions', () => {
  const action$ = ActionsObservable.of({
    type: WATCH_BLOCKS
  })

  const deps = {
    watchBlocks$: () => Observable.of({
      number: 123456,
      transactions: [{
        hash: '0xdd00f5aaae1af883e40098c927a6a8dc230b941654c3a2a5d9ad4c79f79c558a',
        from: '0x68b1a89523b7ed11f499f36ba266c688401cdbc1',
        to: '0x8ad76a1bef25cd903b8c1de72af6d2eb30218c95',
        value: new BigNumber('199889030000000000')
      }, {
        hash: '0xdd00f5aaae1af883e40098c927a6a8dc230b941654c3a2a5d9ad4c79f79c558a',
        from: '0x68b1a89523b7ed11f499f36ba266c688401cdbc1',
        to: '0x8ad76a1bef25cd903b8c1de72af6d2eb30218c95',
        value: new BigNumber('0')
      }],
      timestamp: 1519749108
    })
  }

  const output$ = watchBlocksEpic(action$, null, deps)

  output$.subscribe(actions => {
    expect(actions.length).toBe(1)
    expect(actions.type).equalsTo(SAVE_BLOCK)
    expect(actions.payload.number).toBe(123456)
  })
})
