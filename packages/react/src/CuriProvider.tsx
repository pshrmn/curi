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
  router: CuriRouter;
}

class CuriProvider extends React.Component<CuriProviderProps> {
  stopResponding: () => void;

  constructor(props: CuriProviderProps) {
    super(props);
    this.state = this.props.router.current();
  }

  componentDidMount() {
    this.setupRespond(this.props.router);
  }

  componentDidUpdate(prevProps: CuriProviderProps) {
    if (prevProps.router !== this.props.router) {
      if (this.stopResponding) {
        this.stopResponding();
      }
      this.setupRespond(this.props.router);
    }
  }

  setupRespond(router: CuriRouter) {
    this.stopResponding = router.respond(
      ({ response, navigation }: Emitted) => {
        this.setState({});
      },
      { observe: true, initial: false }
    ) as RemoveObserver;
  }

  componentWillUnmount() {
    /* istanbul ignore else */
    if (this.stopResponding) {
      this.stopResponding();
    }
  }

  render() {
    const { router, children } = this.props;
    const { response, navigation } = router.current();
    const value = { router, response, navigation };

    return <Provider value={value}>{children(value)}</Provider>;
  }
}

export default CuriProvider;
