import React, { Component } from 'react'

import './App.css';
import {connect} from 'react-redux'
import { SearchActions } from './Redux/SearchRedux'

import SearchBar from './SearchBarComponent'


class SearchHandlingComponent extends Component {

  render() {
    const { isLoading, searchTerm, searchResults, onRequestMovies, error } = this.props

    // add
    return (
      <div>
        <div>
          <SearchBar
            onEnterPress={onRequestMovies}
          />
          {searchResults && console.log(searchResults)}
        </div>
        <div>
          {error && <p style={{color: 'red'}}> Uh oh - something went wrong! </p>}
          <h1> This is where the results will show </h1>
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
const mapDispatchtoProps = (dispatch) => ({
  onRequestMovies: (word) => dispatch(SearchActions.apiCallRequest(word)),
})

export default connect(mapStatetoProps, mapDispatchtoProps)(SearchHandlingComponent);
