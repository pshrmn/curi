import React from "react";
import { RouterProvider, ResponseProvider } from "./Context";

import { CuriRouter, Emitted } from "@curi/types";

export interface RouterProps {
  children: React.ReactNode;
}

export default function createRouterComponent(
  router: CuriRouter
): React.FunctionComponent<RouterProps> {
  function initialState() {
    const { response, navigation } = router.current();
    return {
      router,
      response,
      navigation
    };
  }

  return function Router(props: RouterProps) {
    const [response, setResponse] = React.useState<Emitted>(initialState);

    React.useEffect(() => {
      let removed = false;
      const stop = router.observe(
        (emitted: Emitted) => {
          if (!removed) {
            setResponse(emitted);
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
