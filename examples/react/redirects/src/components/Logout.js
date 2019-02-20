import React from "react";

import fakeAuth from "../fakeAuth";

const Logout = ({ router }) => (
  <div>
    <button
      type="button"
      onClick={e => {
        fakeAuth.logout();
        router.navigate({ name: "Home", method: "replace" });
      }}
    >
      Logout
    </button>
  </div>
);

export default Logout;
