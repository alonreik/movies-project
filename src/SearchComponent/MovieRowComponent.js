import React, {Component} from "react"
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import {connect} from 'react-redux'
import { SearchActions } from '../Redux/SearchRedux'

// Styles for the materialUI components.
const useStyles = {
  root: {
    flexGrow: 1
  },
  paper: {
    margin: "auto",
    textAlign: "center",
  },
  image: {
    width: 50,
    height: 100
  },
  img: {
    margin: "auto",
    display: "block",
    // maxWidth:
    width: 50,
    height: 100
    // maxHeight: "100%"
  }
};

// A class representing a movie (title, release year, poster) in one container/'box'
class MovieRow extends Component {
  render() {
    const classes = useStyles;

    return(
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item>
              <ButtonBase>
                <img
                  style={{width: 100, height: 100}}
                  alt= {this.props.movie.Title + " Poster"}
                  src={this.props.movie.Poster}
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

// maps functions of this component to a dispatch function that will update the global state.
const mapDispatchtoProps = (dispatch) => ({
  onRequestMovies: (word) => dispatch(SearchActions.apiCallRequest(word)),
})

export default connect(null, mapDispatchtoProps)(MovieRow);
