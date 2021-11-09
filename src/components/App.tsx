import React, { useState } from "react";
import {
  Container,
  createStyles,
  createTheme,
  CssBaseline,
  makeStyles,
  Theme,
  ThemeProvider
} from "@material-ui/core";
import AppHeader from "./AppHeader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeView from "../views/HomeView";
import PoemView from "../views/PoemView";
import NewPoemView from "../views/NewPoemView";
import { SnackbarProvider } from "notistack";

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
  const [darkMode, setDarkMode] = useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: darkMode ? "dark" : "light"
        }
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider disableWindowBlurListener>
        <CssBaseline />
        <BrowserRouter>
          <AppHeader onThemeChange={newDarkMode => setDarkMode(newDarkMode)} />
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
    </ThemeProvider>
  );
}

export default App;
