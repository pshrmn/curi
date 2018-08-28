import React from "react";
import { Curious } from "@curi/react-universal";

import { CuriRouter, Response } from "@curi/router";

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
  response: Response;
  forwardedRef: React.Ref<any> | undefined;
}

export interface LinkState {
  navigating: boolean;
}

class BaseLink extends React.PureComponent<BaseLinkProps, LinkState> {
  state = {
    navigating: false
  };

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
          this.setState({ navigating: false });
        };
        this.setState({ navigating: true });
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
      response,
      forwardedRef,
      children,
      ...rest
    } = this.props;
    const Anchor: React.ReactType = anchor ? anchor : "a";
    const href: string = router.history.toHref({
      hash,
      query,
      state,
      pathname: to
        ? router.route.pathname(to, params)
        : response.location.pathname
    });

    return (
      <Anchor
        {...rest}
        onClick={this.clickHandler}
        href={href}
        ref={forwardedRef}
      >
        {typeof children === "function"
          ? children(this.state.navigating)
          : children}
      </Anchor>
    );
  }
}

const Link = React.forwardRef(
  (props: LinkProps, ref): React.ReactElement<any> => (
    <Curious>
      {({ router, response }) => (
        <BaseLink
          {...props}
          router={router}
          response={response}
          forwardedRef={ref}
        />
      )}
    </Curious>
  )
);

export default Link;
