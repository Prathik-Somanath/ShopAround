import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { Layout, Button } from 'antd'
import styled from 'styled-components';

import Home from './components/Home'
import ProdRegistration from './components/ProductRegistration'
import Cart from './components/Cart'
import ProdEdit from './components/ProductEdit'
import Login from './components/Login'
import Logout from './components/Logout'
import Navbar from './components/Navbar'
import CustomerRegistration from './components/CustomerRegistration'
import VendorRegistration from './components/VendorRegistration'
import './App.css';
import 'antd/dist/antd.css'
import 'bulma/css/bulma.css'
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from "@apollo/react-hooks";
const Content = Layout

const Body = styled(Content) `
  padding: 0 5rem;
  margin-top: 20vh;
`

// const creatApolloClient = () => {
//   return new ApolloClient({
//     link: new HttpLink({
//       uri: "http://localhost:8080/v1/graphql"
//     }),
//     cache: new InMemoryCache()
//   });
// }
const App = () => {
  const httpLink = new HttpLink({
    uri: "http://localhost:8080/v1/graphql"
  });
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Navbar />

        {/* DECLARING REACT ROUTES */}
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Home />;
            }}
          />
          <Route
            path="/productregistration"
            render={() => {
              return <ProdRegistration vid={localStorage.getItem("vid")} />;
            }}
          />
          <Route
            path="/cart"
            render={() => {
              return <Cart cusid={localStorage.getItem("cusid")} />;
            }}
          />
          <Route
            path="/prodedit"
            render={() => {
              return <ProdEdit vid={localStorage.getItem("vid")} />;
            }}
          />
          <Route
            path="/customerregistration"
            render={() => {
              return <CustomerRegistration />;
            }}
          />
          <Route
            path="/vendorregistration"
            render={() => {
              return <VendorRegistration />;
            }}
          />
          <Route
            path="/login"
            render={() => {
              return <Login />;
            }}
          />
          <Route
            path="/logout"
            render={() => {
              return <Logout />;
            }}
          />
        </Switch>
      </Layout>
    </ApolloProvider>
  );
};

export default App;

