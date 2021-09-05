import React from "react";
import {
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
    container: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(1),
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(3)
      }
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
        <Container maxWidth="md" className={classes.container} disableGutters>
          <div className={classes.offset} />
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/poems/:id" component={PoemView} />
          </Switch>
        </Container>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
