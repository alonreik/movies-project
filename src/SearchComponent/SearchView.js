import React, { Component } from 'react'

import '../App.css';
import {connect} from 'react-redux'
import { SearchActions } from '../Redux/SearchRedux'

import MovieRowComponent from './MovieRowComponent'
import SearchBar from './SearchBarComponent'

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

// todo - can convert to functoin instead of class
class SearchView extends Component {
  render() {

    const { isLoading, searchResults, onRequestMovies, error } = this.props

    return (
      <div>
        <div className={{flexGrow: 1}}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <SearchBar
                onEnterPress={onRequestMovies}
              />
              {error && <p style={{color: 'red'}}> Uh oh - something went wrong! </p>}
            </Grid>

            <Grid item xs={3}>
              <Paper>place for user detail</Paper>
            </Grid>
          </Grid>
        </div>

        <div>
          <Grid container spacing={2}>
              {searchResults && searchResults.map(movie => (
                <Grid item xs={11}>
                  <MovieRowComponent
                    key={movie.imdbID}
                    movie={movie}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    )
  }
}

// Look at the redux store and include the states that this component will recieve as props.
const mapStatetoProps = (state) => ({
  isLoading: state.Search.isLoading,
  searchResults: state.Search.searchResults,
  searchTerm: state.Search.searchTerm,
  error: state.Search.error,
})

// maps functions of this component to a dispatch function that will update the global state.
// todo - maybe delete this if im not using this here
const mapDispatchtoProps = (dispatch) => ({
  onRequestMovies: (word) => dispatch(SearchActions.apiCallRequest(word)),
})

export default connect(mapStatetoProps, mapDispatchtoProps)(SearchView);
