import React from "react";
import { useRouter } from "@curi/react-dom";
import fakeAuth from "../fakeAuth";

let Logout = () => {
  let router = useRouter();
  return (
    <div>
      <button
        type="button"
        onClick={e => {
          fakeAuth.logout();
          let url = router.url({ name: "Home" });
          router.navigate({ url, method: "replace" });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
