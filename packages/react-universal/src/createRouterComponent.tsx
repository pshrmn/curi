import React from "react";
import { RouterProvider, ResponseProvider } from "./Context";

import { CuriRouter, ResponseAndNav } from "@curi/types";

export interface RouterProps {
  children: React.ReactNode;
}

export default function createRouterComponent(
  router: CuriRouter
): React.FunctionComponent<RouterProps> {
  function initialState() {
    return router.current();
  }

  return function Router(props: RouterProps) {
    const [response, setResponse] = React.useState<ResponseAndNav>(
      initialState
    );

    React.useEffect(() => {
      let removed = false;
      const stop = router.observe(
        ({ response, navigation }) => {
          if (!removed) {
            setResponse({ response, navigation });
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
