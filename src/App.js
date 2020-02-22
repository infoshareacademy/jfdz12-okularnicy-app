import React from 'react';
import './App.css';
import { Container } from "semantic-ui-react";
import Navigation from './navigation/Navigation';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import MainList from './main-list/Main-list';
import Dashboard from './dashboard/Dashboard';
import ItemDetails from './item-details/Item-details';
import UserList from './user-list/User-list';
import { AuthContext } from './auth/Auth';
import UserProfile from './user-profile/User-profile';
import { ItemForm } from './item-form/Item-form';
import AuthProtected from './auth/AuthProtected';



function App() {
  return (
  
      <BrowserRouter>
        <Navigation />
        <Container style={{ paddingTop: '78px'}} >
          <AuthProtected>
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
                path='/userProfile'
                component={UserProfile}
              />
              <Route
                path="/dashboard"
                component={Dashboard}
              />
              <Route
                path="/item-add"
                component={ItemForm}
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
          </AuthProtected>
        </Container>
      </BrowserRouter>

  );
}

export default App;
