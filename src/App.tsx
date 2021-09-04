import React from "react";
import {
  Box,
  Container,
  createStyles,
  CssBaseline,
  makeStyles,
  Theme
} from "@material-ui/core";
import SearchAppBar from "./components/AppBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeView from "./views/HomeView";
import PoemView from "./views/PoemView";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    offset: theme.mixins.toolbar,
    title: {
      flexGrow: 1
    }
  })
);

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
        <SearchAppBar />
        <Container maxWidth="md">
          <div className={classes.offset} />
          <Box m={3}>
            <Switch>
              <Route exact path="/" component={HomeView} />
              <Route path="/poems/:id" component={PoemView} />
            </Switch>
          </Box>
        </Container>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
