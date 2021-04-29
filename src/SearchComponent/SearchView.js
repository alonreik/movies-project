import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import '../App.css';
import {connect} from 'react-redux'
import { SearchActions } from '../Redux/SearchRedux'
import MovieRowComponent from './MovieRowComponent'
import SearchBar from './SearchBarComponent'
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

// A class representing a component ("view") that displays the search screen.
class SearchView extends Component {

  // Returns the component responsible for displaying the search screen.
  searchView() {
    const { searchResults, onRequestMovies, error } = this.props

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

  // Alon Reik: I started to use Router for URL routing and navigation, but currently
  // left it as is to try and make more progress.
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/">
            {this.searchView()}
          </Route>
        </Switch>
      </Router>
    )
  }
}

// Maps the following properties of the redux store to this component's props.
const mapStatetoProps = (state) => ({
  isLoading: state.Search.isLoading,
  searchResults: state.Search.searchResults,
  searchTerm: state.Search.searchTerm,
  error: state.Search.error,
})

// maps functions used in this component to a dispatch function that will update the global redux state.
const mapDispatchtoProps = (dispatch) => ({
  onRequestMovies: (word) => dispatch(SearchActions.apiCallRequest(word)),
})

export default connect(mapStatetoProps, mapDispatchtoProps)(SearchView);
