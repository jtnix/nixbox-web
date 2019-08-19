import React from "react";
import { Router } from "@reach/router";
import Layout from "../../components/Layout";
import Details from "../../components/Details";
import Home from "../../components/Home";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import PrivateRoute from "../../components/PrivateRoute";

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <h1 className="title is-size-2 has-text-weight-bold">Users</h1>
          <Router>
            <PrivateRoute path="/user/home" component={Home} />
            <PrivateRoute path="/user/profile" component={Details} />
            <Login path="/user/login" />
            <SignUp path="/user/signup" />
          </Router>
        </div>
      </Layout>
    );
  }
}
