import React from "react";
import { Box, Container, CssBaseline } from "@material-ui/core";
import SearchAppBar from "./components/AppBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeView from "./views/HomeView";
import PoemView from "./views/PoemView";

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
              <Route path="/poems/:id" component={PoemView} />
            </Switch>
          </Box>
        </Container>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
