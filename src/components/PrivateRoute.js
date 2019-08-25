import React from 'react';
import { Redirect } from '@reach/router';
import { isLoggedIn } from '../utils/auth';

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, location, ...rest } = this.props;
    if (!isLoggedIn()) {
      // console.log(location);
      // using Redirect with noThrow instead of imperative navigate to catch first render redirects
      return <Redirect from={location.pathname} to="/user/login" noThrow />;
      // navigate(`/user/login`, { replace: true });
      // return null;
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
