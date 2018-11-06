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
  name?: string;
  params?: object;
  hash?: string;
  query?: any;
  state?: any;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  anchor?: React.ReactType;
  children: NavigatingChildren | React.ReactNode;
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

interface BaseLinkProps extends LinkProps {
  router: CuriRouter;
  forwardedRef: React.Ref<any> | undefined;
}

interface LinkState {
  navigating: boolean;
}

let hasWarnedTo = false;
let hasWarnedAnchorProps = false;

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
      const { to, name, params, query, state, hash } = this.props;
      const routeName = name || to;
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
        name: routeName,
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
      name,
      params,
      hash,
      query,
      state,
      onClick,
      anchor,
      router,
      forwardedRef,
      children,
      anchorProps,
      ...rest
    } = this.props;
    if (process.env.NODE_ENV !== "production") {
      if (!hasWarnedTo && to !== undefined) {
        hasWarnedTo = true;
        console.warn(`Deprecation warning:
The "to" prop should be replaced with the "name" prop. The "to" prop will be removed in @curi/react-dom v2.

<Link name="Route Name">...</Link>`);
      }

      if (!hasWarnedAnchorProps && Object.keys(rest).length > 0) {
        hasWarnedAnchorProps = true;
        console.warn(`Deprecation warning:
Passing additional props to a <Link> will no longer be forwarded to the rendered component in v2.

Instead, please use the "anchorProps" prop to pass an object of props to be attached to the component.

<Link to="Route Name" anchorProps={{ className: "test" }}>`);
      }
    }

    const routeName = name || to;

    const Anchor: React.ReactType = anchor ? anchor : "a";
    const href: string = router.history.toHref({
      hash,
      query,
      state,
      pathname: routeName ? router.route.pathname(routeName, params) : ""
    });

    const additionalProps = {
      ...rest,
      ...anchorProps
    };

    return (
      <Anchor
        {...additionalProps}
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
