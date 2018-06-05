import React from "react";
import { Provider } from "./Context";

import {
  CuriRouter,
  Emitted,
  Response,
  Navigation,
  RemoveObserver
} from "@curi/router";

export type CuriRenderFn = (props: Emitted) => React.ReactNode;

export interface CuriProviderProps {
  children: CuriRenderFn;
  router?: CuriRouter;
}

export interface CuriProviderState {
  response: Response;
  navigation: Navigation;
}

class CuriProvider extends React.Component<
  CuriProviderProps,
  CuriProviderState
> {
  stopResponding: () => void;

  constructor(props: CuriProviderProps) {
    super(props);
    this.state = this.props.router.current();
  }

  componentDidMount() {
    this.stopResponding = this.props.router.respond(
      ({ response, navigation }: Emitted) => {
        this.setState({ response, navigation });
      },
      { observe: true, initial: false }
    ) as RemoveObserver;
  }

  componentWillReceiveProps(nextProps: CuriProviderProps) {
    if (process.env.NODE_ENV !== "production") {
      if (nextProps.router !== this.props.router) {
        console.warn(
          `The "router" prop passed to <CuriProvider> cannot be changed. If you need to update the router's routes, use router.replaceRoutes().`
        );
      }
    }
  }

  componentWillUnmount() {
    /* istanbul ignore else */
    if (this.stopResponding) {
      this.stopResponding();
    }
  }

  render() {
    const router = this.props.router;
    const { response, navigation } = this.state;
    const value = { router, response, navigation };

    return <Provider value={value}>{this.props.children(value)}</Provider>;
  }
}

export default CuriProvider;
