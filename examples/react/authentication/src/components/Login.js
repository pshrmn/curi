import React from "react";

import fakeAuth from "../fakeAuth";

const Login = props => (
  <div>
    <button
      type="button"
      onClick={e => {
        fakeAuth.login();
        const { query } = props.location;
        props.history.navigate(query.next || "/", "REPLACE");
      }}
    >
      Login
    </button>
  </div>
);

export default Login;
