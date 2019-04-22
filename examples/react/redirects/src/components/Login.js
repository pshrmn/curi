import React from "react";
import { useRouter } from "@curi/react-dom";

import fakeAuth from "../fakeAuth";

const Login = ({ response }) => {
  const router = useRouter();
  return (
    <div>
      <button
        type="button"
        onClick={e => {
          fakeAuth.login();
          const { state } = response.location;
          const url = router.url(
            state && state.next ? state.next : { name: "Home" }
          );
          router.navigate({
            url,
            state,
            method: "replace"
          });
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
