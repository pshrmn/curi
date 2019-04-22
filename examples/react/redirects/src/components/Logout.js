import React from "react";
import { useRouter } from "@curi/react-dom";
import fakeAuth from "../fakeAuth";

const Logout = () => {
  const router = useRouter();
  return (
    <div>
      <button
        type="button"
        onClick={e => {
          fakeAuth.logout();
          const url = router.url({ name: "Home" });
          router.navigate({ url, method: "replace" });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
