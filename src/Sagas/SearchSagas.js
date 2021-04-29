import {takeLatest, call, put, all} from "redux-saga/effects"
import axios from 'axios'
import {SearchTypes, SearchActions} from '../Redux/SearchRedux'

// All the relevant parameters for the http request to the server
const options = (searchTerm) => ({
  method: 'GET',
  url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
  params: {s: searchTerm, r: 'json'},
  headers: {
    'x-rapidapi-key': 'f80ac4d453msh0bf3e3080de58b9p192bcfjsn86ef8518a220',
    'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
  }
})

// Function that makes the api request and returns a Promise for response.
function fetchMovies(word) {
  return axios.request(options(word));
}

// This function ultimately watches for actions dispatched to the store,
// and invokes some pre-defined 'side-effects' (meaning, applies middleware).
export function* initSearchObserver() {

  yield all([
    // take Latest - cancel any previously triggered workerSaga still in process.

    // When you see an action of type 'API_CALL_REQUEST', call the worker saga
    takeLatest(SearchTypes.API_CALL_REQUEST, makeApiCallForMovies)
  ])
}

// makeApiCallForMovies: Start preforming the API call when initSearchObserver
// recognizes that the appropiate action was dispatched to the redux store.
function* makeApiCallForMovies({ word }) {

  try {
    const response = yield call(fetchMovies, word)

    // results is an array of "movie objects"
    let results = response.data.Search

    // dispatch a success action to the store with the result of the call.
    yield put(SearchActions.apiCallSuccess(results))

  } catch(error) {
    //dispatch a failure action to the store with the error
    yield put(SearchActions.apiCallFailure(error))
  }
}
