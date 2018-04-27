/* global it, expect */
import {Observable} from 'rxjs'
import {BigNumber} from 'bignumber.js'
import {ActionsObservable} from 'redux-observable'
import {
  QUICKLY_GET_BLOCK,
  SAVE_BLOCK
} from '../types'
import {quicklyGetBlockEpic} from './quicklyGetBlockEpic'

it('should return correct actions', () => {
  const action$ = ActionsObservable.of({
    type: QUICKLY_GET_BLOCK
  })

  const deps = {
    getBlock$: (number) => Observable.of({
      number,
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
    }),
    getBlockNumber$: () => Observable.of(123456)
  }

  const output$ = quicklyGetBlockEpic(action$, null, deps)

  output$.subscribe(actions => {
    expect(actions.length).toBe(1)
    expect(actions.type).equalsTo(SAVE_BLOCK)
    expect(actions.payload.number).toBe(123456)
  })
})
