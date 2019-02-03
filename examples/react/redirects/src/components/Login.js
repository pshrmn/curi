import React from "react";

import fakeAuth from "../fakeAuth";

const Login = ({ response, router }) => (
  <div>
    <button
      type="button"
      onClick={e => {
        fakeAuth.login();
        const { state } = response.location;
        const to = state && state.next ? state.next : { name: "Home" };
        router.navigate({
          ...to,
          method: "REPLACE"
        });
      }}
    >
      Login
    </button>
  </div>
);

export default Login;
