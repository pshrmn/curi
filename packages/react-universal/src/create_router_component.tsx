import React from "react";
import { RouterProvider, EmittedProvider } from "./Context";

import { CuriRouter, Emitted } from "@curi/types";

export interface RouterProps {
  children: React.ReactNode;
}

export default function create_router_component(
  router: CuriRouter
): React.FunctionComponent<RouterProps> {
  function initial_state() {
    const { response, navigation } = router.current();
    return {
      router,
      response,
      navigation
    };
  }

  return function Router(props: RouterProps) {
    const [state, set_state] = React.useState<Emitted>(initial_state);

    React.useEffect(() => {
      let removed = false;
      const stop = router.observe(
        (emitted: Emitted) => {
          if (!removed) {
            set_state(emitted);
          }
        },
        { initial: false }
      );
      return () => {
        removed = true;
        stop();
      };
    }, []);

    return (
      <RouterProvider value={router}>
        <EmittedProvider value={state}>{props.children}</EmittedProvider>
      </RouterProvider>
    );
  };
}
