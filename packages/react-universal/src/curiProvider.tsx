import React from "react";
import { Provider } from "./Context";

import {
  CuriRouter,
  CurrentResponse,
  Emitted,
  RemoveObserver
} from "@curi/router";

export type CuriRenderFn = (props: Emitted) => React.ReactNode;

export interface RouterProps {
  children: CuriRenderFn;
}

export interface RouterState {
  emitted: CurrentResponse;
}

export default function curiProvider(router: CuriRouter) {
  return class Router extends React.Component<RouterProps, RouterState> {
    stopResponding: () => void;
    removed: boolean;

    constructor(props: RouterProps) {
      super(props);
      this.state = {
        emitted: router.current()
      };
    }

    componentDidMount() {
      this.setupRespond(router);
    }

    setupRespond(router: CuriRouter) {
      this.stopResponding = router.observe(
        ({ response, navigation }) => {
          if (!this.removed) {
            this.setState({
              emitted: { response, navigation }
            });
          }
        },
        { initial: false }
      );
    }

    componentWillUnmount() {
      this.removed = true;
      /* istanbul ignore else */
      if (this.stopResponding) {
        this.stopResponding();
      }
    }

    render() {
      const { children } = this.props;
      const { response, navigation } = this.state.emitted;
      const value = { router, response, navigation };

      return <Provider value={value}>{children(value)}</Provider>;
    }
  };
}
