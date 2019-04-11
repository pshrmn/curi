import React from "react";
import { RouterProvider, ResponseProvider } from "./Context";

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
    const [response, set_response] = React.useState<Emitted>(initial_state);

    React.useEffect(() => {
      let removed = false;
      const stop = router.observe(
        (emitted: Emitted) => {
          if (!removed) {
            set_response(emitted);
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
        <ResponseProvider value={response}>{props.children}</ResponseProvider>
      </RouterProvider>
    );
  };
}
