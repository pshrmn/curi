import React from "react";
import { Provider } from "./Context";

import { CuriRouter, Emitted } from "@curi/router";

export type CuriRenderFn = (props: Emitted) => React.ReactNode;

export interface RouterProps {
  children: CuriRenderFn;
}

export interface RouterState {
  emitted: Emitted;
}

export default function curiProvider(router: CuriRouter) {
  return class Router extends React.Component<RouterProps, RouterState> {
    stopResponding: () => void;
    removed: boolean;

    constructor(props: RouterProps) {
      super(props);
      this.state = {
        emitted: {
          ...router.current(),
          router
        }
      };
    }

    componentDidMount() {
      this.setupRespond(router);
    }

    setupRespond(router: CuriRouter) {
      this.stopResponding = router.observe(
        (emitted: Emitted) => {
          if (!this.removed) {
            this.setState({ emitted });
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
      return (
        <Provider value={this.state.emitted}>
          {children(this.state.emitted)}
        </Provider>
      );
    }
  };
}
