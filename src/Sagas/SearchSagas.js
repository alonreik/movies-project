import {takeLatest, call, put, all} from "redux-saga/effects"
import axios from 'axios'
import {SearchTypes, SearchActions} from '../Redux/SearchRedux'

// all the relevant parameters for the http request to the server
const options = (searchTerm) => ({
  method: 'GET',
  url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
  params: {s: searchTerm, r: 'json'},
  headers: {
    'x-rapidapi-key': 'f80ac4d453msh0bf3e3080de58b9p192bcfjsn86ef8518a220',
    'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
  }
});

// Function that makes the api request and returns a Promise for response.
function fetchMovies(word) {
  return axios.request(options(word));
}

// Watches for actions dispatched to the store, starts worker saga
export function* initSearchObserver() {

  yield all([
    // take Latest - cancel any previously triggered workerSaga still in process.

    // When you see an action of type 'API_CALL_REQUEST', call the worker saga
    takeLatest(SearchTypes.API_CALL_REQUEST, makeApiCallForMovies)
  ])
}

// makeApiCallForMovies: makes the api call when initSearchObserver sees the action
function* makeApiCallForMovies({ word }) {

  try {
    // this time, yield means: I am about to make the api call.
    const response = yield call(fetchMovies, word)

    // results is an array of "movie objects"
    let results = response.data.Search

    // this time, yield means:
    // dispatch a success action to the store with the result of the call.
    yield put(SearchActions.apiCallSuccess(results))

  } catch(error) {
    //dispatch a failure action to the store with the error
    yield put(SearchActions.apiCallFailure(error))
    // yield put({type: 'API_CALL_FAILURE', error})
  }
}
