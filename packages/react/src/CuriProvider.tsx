import React from "react";
import { Provider } from "./Context";

import {
  CuriRouter,
  CurrentResponse,
  Emitted,
  RemoveObserver
} from "@curi/router";

export type CuriRenderFn = (props: Emitted) => React.ReactNode;

export interface CuriProviderProps {
  children: CuriRenderFn;
  router: CuriRouter;
}

export interface CuriProviderState {
  router: CuriRouter;
  emitted: CurrentResponse;
}

class CuriProvider extends React.Component<
  CuriProviderProps,
  CuriProviderState
> {
  stopResponding: () => void;
  removed: boolean;

  constructor(props: CuriProviderProps) {
    super(props);
    this.state = {
      router: this.props.router,
      emitted: this.props.router.current()
    };
  }

  static getDerivedStateFromProps(
    nextProps: CuriProviderProps,
    prevState: CuriProviderState
  ) {
    if (nextProps.router !== prevState.router) {
      return {
        router: nextProps.router,
        emitted: nextProps.router.current()
      };
    }
    return null;
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
      ({ response, navigation }) => {
        if (!this.removed) {
          this.setState({
            emitted: { response, navigation }
          });
        }
      },
      { observe: true, initial: false }
    ) as RemoveObserver;
  }

  componentWillUnmount() {
    this.removed = true;
    /* istanbul ignore else */
    if (this.stopResponding) {
      this.stopResponding();
    }
  }

  render() {
    const { router, children } = this.props;
    const { response, navigation } = this.state.emitted;
    const value = { router, response, navigation };

    return <Provider value={value}>{children(value)}</Provider>;
  }
}

export default CuriProvider;
