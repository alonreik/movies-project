import React, {Component} from "react"
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import {connect} from 'react-redux'
import { SearchActions } from '../Redux/SearchRedux'

const useStyles = {
  root: {
    flexGrow: 1
  },
  paper: {
    margin: "auto",
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 75
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
};

class MovieRow extends Component {
  render() {
    const classes = useStyles;

    return(
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="movie poster"
                  src="/static/images/grid/complex.jpg"
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    Title: {this.props.movie.Title}
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    Release Year: {this.props.movie.Year}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }

}

//
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

export default connect(null, mapDispatchtoProps)(MovieRow);
