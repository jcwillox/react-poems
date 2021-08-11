import React from "react";
import { Box, Container, CssBaseline } from "@material-ui/core";
import SearchAppBar from "./components/AppBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeView from "./views/HomeView";

function App() {
  return (
    <React.Fragment>
      <SearchAppBar />
      <CssBaseline />
      <Container maxWidth={"md"}>
        <Box m={3}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <HomeView />
              </Route>
            </Switch>
          </BrowserRouter>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
