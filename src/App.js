import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import { Provider } from "react-redux";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";
import store from "./store";
import AddClient from "./components/clients/AddClient";
import ClientDetails from "./components/clients/ClientDetails";
import EditClient from "./components/clients/EditClient";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Settings from "./components/settings/Settings";


import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                component={UserIsAuthenticated(Dashboard)}
              />
              <Route
                exact
                path="/clients/add"
                component={UserIsAuthenticated(AddClient)}
              />
              <Route
                exact
                path="/clients/:id"
                component={UserIsAuthenticated(ClientDetails)}
              />
              <Route
                exact
                path="/clients/edit/:id"
                component={UserIsAuthenticated(EditClient)}
              />
              <Route
                exact
                path="/login"
                component={UserIsNotAuthenticated(Login)}
              />
              <Route
                exact
                path="/settings"
                component={UserIsAuthenticated(Settings)}
              />
              <Route
                exact
                path="/register"
                component={UserIsNotAuthenticated(Register)}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
