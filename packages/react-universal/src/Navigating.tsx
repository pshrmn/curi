import React from "react";
import { Curious } from "./Context";

import { ReactNode } from "react";
import {
  CuriRouter,
  CancelActiveNavigation,
  RemoveCancellable
} from "@curi/router";

export interface NavigatingProps {
  children(cancel: CancelActiveNavigation | void): ReactNode;
}

interface BaseNavigatingProps extends NavigatingProps {
  router?: CuriRouter;
}

interface NavigatingState {
  cancelFn: CancelActiveNavigation | void;
}

class BaseNavigating extends React.Component<
  BaseNavigatingProps,
  NavigatingState
> {
  removed: boolean;
  stopCancelling: RemoveCancellable;

  shouldComponentUpdate(
    nextProps: BaseNavigatingProps,
    nextState: NavigatingState
  ) {
    return (
      nextState.cancelFn !== this.state.cancelFn ||
      nextProps.children === this.props.children
    );
  }

  constructor(props: BaseNavigatingProps) {
    super(props);
    this.state = {
      cancelFn: undefined
    };
  }

  render() {
    const { cancelFn } = this.state;
    return this.props.children(cancelFn);
  }

  componentDidMount() {
    this.stopCancelling = this.props.router.whileNavigating(
      (cancelFn: CancelActiveNavigation) => {
        if (!this.removed) {
          this.setState({
            cancelFn
          });
        }
      }
    );
  }

  componentWillUnmount() {
    this.removed = true;
    if (this.stopCancelling) {
      this.stopCancelling();
    }
  }
}

const Navigating = (props: NavigatingProps) => {
  return (
    <Curious>
      {({ router }) => <BaseNavigating {...props} router={router} />}
    </Curious>
  );
};

export default Navigating;
