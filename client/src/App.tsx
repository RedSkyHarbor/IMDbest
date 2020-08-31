import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
import { MoviePage } from "./pages/MoviePage";
import { RegistrationPage } from "./pages/RegistrationPage";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={IndexPage}></Route>
        <Route path="/movie/:movie_id/:slug" component={MoviePage}></Route>
        <Route path="/registration" component={RegistrationPage}></Route>
      </Switch>
    </Router>
  );
};

export default App;
