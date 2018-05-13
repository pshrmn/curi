import React from "react";
import invariant from "invariant";
import warning from "warning";
import { Curious } from "./Context";

import { ReactNode } from "react";
import { CuriRouter, Response, Resolved } from "@curi/core";
import { HickoryLocation } from "@hickory/root";

export interface WhichOnFns {
  initial?: boolean;
  every?: boolean;
}

export interface MatchData {
  name: string;
  params?: object;
  location?: HickoryLocation;
  partials?: Array<string>;
}

export type MaybeResolved = Resolved | null;

export interface PrefetchProps {
  children: (
    ref: React.RefObject<any>,
    resolved: MaybeResolved
  ) => React.ReactElement<any>;
  match: MatchData;
  which?: WhichOnFns;
  forwardedRef?: React.RefObject<any>;
}

interface PrefetchPropsWithRouter extends PrefetchProps {
  router: CuriRouter;
}

interface PrefetchState {
  resolved: MaybeResolved;
}

class PrefetchWhenVisible extends React.Component<
  PrefetchPropsWithRouter,
  PrefetchState
> {
  obs: IntersectionObserver;
  intersectionRef: React.RefObject<any>;

  constructor(props: PrefetchPropsWithRouter) {
    super(props);
    invariant(
      props.router.route.prefetch,
      'You are attempting to use the "prefetch" function, but have not included the "prefetch" ' +
        "route interaction (@curi/route-prefetch) in your Curi router."
    );

    this.state = {
      resolved: null
    };

    // re-use ref if provided, otherwise create a new one
    this.intersectionRef = props.forwardedRef
      ? props.forwardedRef
      : React.createRef();

    if (typeof window !== "undefined" && IntersectionObserver) {
      this.obs = new IntersectionObserver(entries => {
        const ref = this.intersectionRef.current;
        const { router, match, which } = this.props;
        entries.forEach(entry => {
          if (ref === entry.target && entry.intersectionRatio > 0) {
            this.obs.unobserve(ref);
            this.obs.disconnect();
            router.route
              .prefetch(match.name, match, which)
              .then((resolved: Resolved) => {
                this.setState({ resolved });
              });
          }
        });
      });
    }
  }

  render() {
    return this.props.children(this.intersectionRef, this.state.resolved);
  }

  componentDidMount() {
    warning(
      this.intersectionRef.current,
      "The ref provided to the children function is null. Did you forget to pass it to a component?"
    );
    if (this.intersectionRef.current != null) {
      this.obs.observe(this.intersectionRef.current);
    }
  }
}

const Prefetch = React.forwardRef(
  (
    props: PrefetchProps,
    ref: React.RefObject<any>
  ): React.ReactElement<any> => (
    <Curious>
      {({ router }) => (
        <PrefetchWhenVisible router={router} forwardedRef={ref} {...props}>
          {props.children}
        </PrefetchWhenVisible>
      )}
    </Curious>
  )
);

export default Prefetch;
