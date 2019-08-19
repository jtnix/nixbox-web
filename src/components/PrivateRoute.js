import React from "react";
import { navigate } from "@reach/router";
import { isLoggedIn } from "../utils/auth";

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, location, ...rest } = this.props;
    if (!isLoggedIn()) {
      navigate(`/user/login`);
      return null;
    }
    return (
      <div>
        <h2>Private</h2>
        <Component {...rest} />
      </div>
    );
  }
}

export default PrivateRoute;
