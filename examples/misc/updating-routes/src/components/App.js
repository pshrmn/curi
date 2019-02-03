import React from "react";
import { useCuri } from "@curi/react-dom";

import Nav from "./Nav";
import { baseRoutes, adminRoutes } from "../routes";

export default function App() {
  const { response, router } = useCuri();
  const [admin, setAdmin] = React.useState(false);
  const { body: Body } = response;
  return (
    <div>
      <Nav
        admin={admin}
        login={() => {
          router.refresh(adminRoutes);
          setAdmin(true);
        }}
        logout={() => {
          router.refresh(baseRoutes);
          setAdmin(false);
          router.navigate({ name: "Home" });
        }}
      />
      <Body />
    </div>
  );
}
