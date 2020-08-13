import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact component={IndexPage} />
    </Router>
  );
};

export default App;
