import React from "react";
import warning from "warning";

import { Provider } from "./Context";

import { CuriRouter, Emitted, Response, Navigation } from "@curi/core";

export type CuriRenderFn = (props: Emitted) => React.ReactNode;

export interface CuriProviderProps {
  render: CuriRenderFn;
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
      { initial: false }
    );
  }

  componentWillReceiveProps(nextProps: CuriProviderProps) {
    warning(
      nextProps.router === this.props.router,
      'The "router" prop of <CuriProvider> cannot be changed.'
    );
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

    return <Provider value={value}>{this.props.render(value)}</Provider>;
  }
}

export default CuriProvider;
