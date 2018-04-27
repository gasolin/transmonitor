import {Observable} from 'rxjs'
import {ethWeb3} from '../../web3connection'

/*
 * wrap web3 getBlockNumber callback to rxjs Observable.
 */
const getBlockNumber$ = new Observable(observer => {
  ethWeb3.eth.getBlockNumber((error, result) => {
    if (error) observer.error(error)
    observer.next(result)
    observer.complete()
  })
})

/*
 * wrap web3 getBlock callback to rxjs Observable.
 */
const getBlock$ = (number) => new Observable(observer => {
  ethWeb3.eth.getBlock(number, true, (error, block) => {
    if (error) observer.error(error)
    observer.next(block)
    observer.complete()
  })
})

/*
 * wrap web3 callbacks to rxjs Observable.
 */
const watchBlocks$ = new Observable(observer => {
  let filter = ethWeb3.eth.filter('latest')
  filter.watch((error, result) => {
    if (error) observer.error(error)
    ethWeb3.eth.getBlock(result, true, (error, block) => {
      if (error) observer.error(error)
      if (block) {
        observer.next(block)
        // observer.complete();
      }
    })
  })
})

export {
  getBlock$,
  getBlockNumber$,
  watchBlocks$
}
