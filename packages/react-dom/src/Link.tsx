import React from "react";
import { Curious } from "@curi/react-universal";
import shallowEqual from "shallowequal";

import { CuriRouter } from "@curi/router";

const canNavigate = (event: React.MouseEvent<HTMLElement>) => {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
};

export type NavigatingChildren = (navigating: boolean) => React.ReactNode;

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  params?: object;
  hash?: string;
  query?: any;
  state?: any;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  anchor?: React.ReactType;
  children: NavigatingChildren | React.ReactNode;
}

export interface BaseLinkProps extends LinkProps {
  router: CuriRouter;
  forwardedRef: React.Ref<any> | undefined;
}

export interface LinkState {
  navigating: boolean;
}

class BaseLink extends React.Component<BaseLinkProps, LinkState> {
  removed: boolean;

  state = {
    navigating: false
  };

  shouldComponentUpdate(nextProps: BaseLinkProps, nextState: LinkState) {
    const { params: nextParams, ...nextRest } = nextProps;
    const { params: currentParams, ...currentRest } = this.props;
    return (
      !shallowEqual(nextState, this.state) ||
      !shallowEqual(nextParams, currentParams) ||
      !shallowEqual(nextRest, currentRest)
    );
  }

  clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const { onClick, router, target } = this.props;
    if (onClick) {
      onClick(event);
    }

    if (canNavigate(event) && !target) {
      event.preventDefault();
      const { to: name, params, query, state, hash } = this.props;
      let cancelled, finished;
      // only trigger re-renders when children uses state
      if (typeof this.props.children === "function") {
        cancelled = finished = () => {
          if (!this.removed) {
            this.setState({ navigating: false });
          }
        };
        if (!this.removed) {
          this.setState({ navigating: true });
        }
      }
      router.navigate({
        name,
        params,
        query,
        state,
        hash,
        cancelled,
        finished
      });
    }
  };

  render(): React.ReactNode {
    const {
      to,
      params,
      hash,
      query,
      state,
      onClick,
      anchor,
      router,
      forwardedRef,
      children,
      ...rest
    } = this.props;
    const Anchor: React.ReactType = anchor ? anchor : "a";
    const href: string = router.history.toHref({
      hash,
      query,
      state,
      pathname: to ? router.route.pathname(to, params) : ""
    });

    return (
      <Anchor
        {...rest}
        onClick={this.clickHandler}
        href={href}
        ref={forwardedRef}
      >
        {typeof children === "function"
          ? (children as NavigatingChildren)(this.state.navigating)
          : children}
      </Anchor>
    );
  }

  componentWillUnmount() {
    this.removed = true;
  }
}

const Link = React.forwardRef(
  (props: LinkProps, ref): React.ReactElement<any> => (
    <Curious>
      {({ router }) => (
        <BaseLink {...props} router={router} forwardedRef={ref} />
      )}
    </Curious>
  )
);

export default Link;
