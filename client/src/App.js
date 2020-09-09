import React from "react";
import "./App.css";
import ChatSection from "./components/ChatSection/ChatSection";
import Login from "./components/LoginSection/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/chat" exact>
            <ChatSection />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
