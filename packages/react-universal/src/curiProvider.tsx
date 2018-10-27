import React from "react";
import { Provider } from "./Context";

import { CuriRouter, Emitted } from "@curi/router";

export type CuriRenderFn = (props: Emitted) => React.ReactNode;

export interface RouterProps {
  children: CuriRenderFn;
}

export default function curiProvider(
  router: CuriRouter
): React.FunctionComponent {
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

    React.useLayoutEffect(() => {
      let removed = false;
      const stopResponding = router.observe(
        (emitted: Emitted) => {
          if (!removed) {
            setState(emitted);
          }
        },
        { initial: false }
      );
      return () => {
        removed = true;
        stopResponding();
      };
    }, []);

    return <Provider value={state}>{props.children(state)}</Provider>;
  };
}
