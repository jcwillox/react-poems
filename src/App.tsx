import React from "react";
import { Box, Container, CssBaseline } from "@material-ui/core";
import SearchAppBar from "./components/AppBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeView from "./views/HomeView";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
        <SearchAppBar />
        <Container maxWidth="md">
          <Box m={3}>
            <Switch>
              <Route exact path="/" component={HomeView} />
            </Switch>
          </Box>
        </Container>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
