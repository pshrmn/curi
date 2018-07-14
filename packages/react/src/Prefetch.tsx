import React from "react";
import { Curious } from "./Context";

import { CuriRouter, Resolved, ResolveResults } from "@curi/router";
import { WhichFns } from "@curi/route-prefetch";
import { HickoryLocation } from "@hickory/root";

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
    resolved: MaybeResolved,
    error: any
  ) => React.ReactElement<any>;
  match: MatchData;
  which?: WhichFns;
  forwardedRef?: React.RefObject<any>;
}

interface PrefetchPropsWithRouter extends PrefetchProps {
  router: CuriRouter;
}

interface PrefetchState {
  resolved: MaybeResolved;
  error: any;
}

class PrefetchWhenVisible extends React.Component<
  PrefetchPropsWithRouter,
  PrefetchState
> {
  obs: IntersectionObserver;
  intersectionRef: React.RefObject<any>;

  constructor(props: PrefetchPropsWithRouter) {
    super(props);
    if (process.env.NODE_ENV !== "production") {
      if (!props.router.route.prefetch) {
        throw new Error(
          `You are attempting to use the "prefetch" route interaction, but have not included it in your Curi router.

import curi from "@curi/router";
import prefetch from "@curi/route-prefetch";

const router = curi(history, routes, {
  route: [prefetch()]
});`
        );
      }
    }

    this.state = {
      resolved: null,
      error: null
    };

    // re-use ref if provided, otherwise create a new one
    this.intersectionRef = props.forwardedRef
      ? props.forwardedRef
      : React.createRef();

    /* istanbul ignore else */
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
              .then((results: ResolveResults) => {
                this.setState(results);
              });
          }
        });
      });
    }
  }

  render() {
    return this.props.children(
      this.intersectionRef,
      this.state.resolved,
      this.state.error
    );
  }

  componentDidMount() {
    if (process.env.NODE_ENV !== "production") {
      if (this.intersectionRef.current == null) {
        console.warn(
          "The ref provided to the children function is null. Did you forget to pass it to a component?"
        );
      }
    }
    if (this.intersectionRef.current != null) {
      this.obs.observe(this.intersectionRef.current);
    }
  }

  componentWillUnmount() {
    this.obs.disconnect();
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
