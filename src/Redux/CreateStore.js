
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

// Creates the and returns store
export default (rootReducer, rootSaga) => {

  /* ------------- Redux Configuration ------------- */
  const middleware = []

  /* ------------- Saga Middleware ------------- */
  const onError = (error: Error, { sagaStack }) => {
    console.log(`Saga error: ${error} - ${sagaStack}`)
  };
  const sagaMiddleware = createSagaMiddleware({onError})
  middleware.push(sagaMiddleware)
  const enhancers = []
  enhancers.push(applyMiddleware(...middleware))
  const store = createStore(rootReducer, compose(...enhancers))
  // kick off root saga
  sagaMiddleware.run(rootSaga)
  return {store}
}
