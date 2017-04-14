let loggedIn = false;

export default {
  authenticated: () => loggedIn,
  login: () => loggedIn = true,
  logout: () => loggedIn = false
};
