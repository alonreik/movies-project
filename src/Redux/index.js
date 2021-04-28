import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import Store from './Store'
import rootSaga from '../Sagas/'


export default () => {
/* ------------- Assemble The Reducers ------------- */
const rootReducer = combineReducers({
  Search: require('./SearchRedux').reducer,
})

const {store} = configureStore(rootReducer, rootSaga)
Store.instance = store
return store
}
