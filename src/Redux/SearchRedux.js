import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

// https://redux-actions.js.org/api/createaction#createactions
const { Types, Creators } = createActions(
  // first argument: actionMap, an object whose keys are action types and whose values are either:
    // a. a function, which is the payload creator for that action.
    // b. an array with payload and meta functions in that order.
  {
    //               the values (strings) will become additional action attributes (such as payload and such..)
    apiCallRequest: ['word'],
    apiCallSuccess: ['movies'],
    apiCallFailure: ['error'],
  },
  {
    // prefix is used so we could access the store easily (Redux will insert the prefix for us whenever it will access the store.)
    prefix: 'SEARCH_'
  }
)

// Types of actions.
export const SearchTypes = Types
// The action creators that the types (above) are reffering to
export const SearchActions = Creators
// We export a name that is a convention for action creators.
export default Creators

/* ------------- Reducers ------------- */

// This reducer is called when the action named apiCallRequest is dispatched.
// the {bb} is the parameter to be sent to apiCallRequest. (not used)
const apiCallRequest = (state, {word}) => {
  return {...state, searchTerm: word ,isLoading: true, error: null};
}

// This reducer is called when the action named apiCallSuccess is dispatched.
const apiCallSuccess = (state, {movies}) => {
  // The goal of the function is to return a new state with
  return {...state, searchResults: movies, isLoading: false, error: null};
}

// This reducer is called when the action named apiCallFailure is dispatched.
const apiCallFailure = (state, {error}) => {
  return {...state, searchResults: null, isLoading: false, error: error};
}

/* ------------- Hookup Reducers To Types ------------- */

// Define default initial state
const INITIAL_STATE = {
  isLoading: false,
  searchTerm: null,
  searchResults: null,
  error: null,
};

// When creating a reducer, we bind actionTypes with their appropiate reducer.
export const reducer = createReducer(INITIAL_STATE, {
  [Types.API_CALL_REQUEST]: apiCallRequest,
  [Types.API_CALL_SUCCESS]: apiCallSuccess,
  [Types.API_CALL_FAILURE]: apiCallFailure,
})
