import { call, all } from 'redux-saga/effects'
/* ------------- Sagas ------------- */
import { initSearchObserver } from './SearchSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  let observers = [
    call(initSearchObserver),
  ]
  yield all(observers)
}
