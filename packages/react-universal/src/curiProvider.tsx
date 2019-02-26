import React from "react";
import { Provider } from "./Context";

import {
  CuriRouter,
  Emitted,
} from "@curi/router";

export interface RouterProps {
  children: React.ReactNode;
  suspend?: boolean;
}

export default function curiProvider(
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
    const [state, setState] = React.useState<Emitted>(initialState);

    React.useEffect(() => {
      let removed = false;
      const stopResponding = router.observe(
        (emitted: Emitted) => {
          if (!removed) {
            if (props.suspend) {
              // setTimeout until schedule is published
              setTimeout(() => {
                setState(emitted);
              });
            } else {
              setState(emitted);
            }
          }
        },
        { initial: false }
      );
      return () => {
        removed = true;
        stopResponding();
      };
    }, []);

    return <Provider value={state}>{props.children}</Provider>;
  };
}
