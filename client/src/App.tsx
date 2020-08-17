import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
import { MoviePage } from "./pages/MoviePage";
import { RegistrationPage } from "./pages/RegistrationPage";

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact>
        <IndexPage />
      </Route>
      <Route path="/movie/:slug">
        <MoviePage />
      </Route>
      <Route path="/registration">
        <RegistrationPage />
      </Route>
    </Router>
  );
};

export default App;
