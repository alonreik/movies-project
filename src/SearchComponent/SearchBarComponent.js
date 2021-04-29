import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {connect} from 'react-redux'
import { SearchActions } from '../Redux/SearchRedux'

// Styles for the materialUI components.
const styles = {
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    marginLeft: 0,
    width: "100%",
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    width: "100%",
  },
  sectionDesktop: {
    display: "none",
  },
  sectionMobile: {
    display: "flex",
  }
};

// A class (imported almost as-is from materialUI) representing a search bar.
class SearchBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  //
  render() {
    const classes = styles;

    // When the app is fetching data from the API, the word 'Loading' acts
    // as an activity indicator (instead of the search icon).
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                {!this.props.isLoading && <SearchIcon />}
                {this.props.isLoading && 'Loading'}
              </div>
              <InputBase
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    this.props.onRequestMovies(e.target.value)
                  }
                }}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};

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

export default connect(mapStatetoProps, mapDispatchtoProps)(SearchBar);
