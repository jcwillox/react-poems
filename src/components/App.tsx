import React from "react";
import {
  Container,
  createStyles,
  CssBaseline,
  makeStyles,
  Theme
} from "@material-ui/core";
import AppHeader from "./AppHeader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeView from "../views/HomeView";
import PoemView from "../views/PoemView";
import NewPoemView from "../views/NewPoemView";
import { SnackbarProvider } from "notistack";
import ThemeModeProvider from "./ThemeModeContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    offset: theme.mixins.toolbar,
    container: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(3)
      }
    }
  })
);

function App() {
  const classes = useStyles();
  return (
    <ThemeModeProvider>
      <SnackbarProvider disableWindowBlurListener>
        <CssBaseline />
        <BrowserRouter>
          <AppHeader />
          <Container maxWidth="md" className={classes.container} disableGutters>
            <div className={classes.offset} />
            <Switch>
              <Route exact path="/" component={HomeView} />
              <Route path="/poems/:id" component={PoemView} />
              <Route path="/new/poem" component={NewPoemView} />
            </Switch>
          </Container>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeModeProvider>
  );
}

export default App;
