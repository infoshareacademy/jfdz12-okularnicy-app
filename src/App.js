import React from 'react';
import './App.css';
import ReactDOM from "react-dom";
import { Container, Header, List } from "semantic-ui-react";
import Navigation from './navigation/Navigation';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import MainList from './main-list/Main-list';
import Dashboard from './dashboard/Dashboard';
import ItemDetails from './item-details/Item-details';
import UserList from './user-list/User-list';

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route
          path="/user-list"
          component={UserList}
        />
        
        <Route
          path="/dashboard"
          component={Dashboard}
        />
        <Route
          path="/items/:id"
          component={ItemDetails}
          exact
        />
        <Route
          path="/"
          component={MainList}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
