import React from 'react';
import './App.css';
import { Container } from "semantic-ui-react";
import Navigation from './navigation/Navigation';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import MainList from './main-list/Main-list';
import Dashboard from './dashboard/Dashboard';
import ItemDetails from './item-details/Item-details';
import UserList from './user-list/User-list';
import {AuthContext}   from './auth/Auth';
import { ItemForm } from './item-form/Item-form';


function App() {
  return (
    <AuthContext>
    <BrowserRouter>
      <Navigation />
      <Container text style={{marginTop: '78px'}} >
        <Switch>
          <Route
            path="/user-list"
            component={UserList}
          />
          <Route
            path="/item-form"
            component={ItemForm}
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
        </Container>
    </BrowserRouter>
    </AuthContext>
  );
}

export default App;
