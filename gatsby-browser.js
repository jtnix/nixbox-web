/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

const { default: Auth } = require('@aws-amplify/auth');
const { setUser } = require('./src/utils/auth');

export const onRouteUpdate = (state, page, pages) => {
  Auth.currentAuthenticatedUser()
    .then(user => {
      const userInfo = {
        ...user.attributes,
        username: user.username
      };
      setUser(userInfo);
    })
    .catch(err => {
      window.localStorage.setItem('gatsbyUser', null);
    });
};
