import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

// https://redux-actions.js.org/api/createaction#createactions
const { Types, Creators } = createActions(
  {
    // the values (strings in array) will become additional action attributes (such as payload and such..)
    apiCallRequest: ['word'],
    apiCallSuccess: ['movies'],
    apiCallFailure: ['error'],
  },
  {
    // Prefix is used so we could access the relevant parts of the redux store's state easily.
    // (Redux will insert the prefix of Search for us whenever we will access the store from the search-related components)
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
const apiCallRequest = (state, {word}) => {
  return {...state, searchTerm: word ,isLoading: true, error: null};
}

// This reducer is called when the action named apiCallSuccess is dispatched.
const apiCallSuccess = (state, {movies}) => {
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
