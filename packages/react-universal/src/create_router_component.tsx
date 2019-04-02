import React from "react";
import { Provider } from "./Context";

import { CuriRouter, Emitted } from "@curi/types";

export interface RouterProps {
  children: React.ReactNode;
}

export default function curi_provider(
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

    return <Provider value={state}>{props.children}</Provider>;
  };
}
