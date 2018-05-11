import React from "react";
import invariant from "invariant";
import { Curious } from "./Context";

import { ReactNode } from "react";
import { CuriRouter, Response } from "@curi/core";
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

export interface PrefetchProps {
  children: (ref: React.RefObject<any>) => React.ReactElement<any>;
  match: MatchData;
  which?: WhichOnFns;
  forwardedRef?: React.RefObject<any>;
}

interface PrefetchPropsWithRouter extends PrefetchProps {
  router: CuriRouter;
}

class PrefetchWhenVisible extends React.Component<PrefetchPropsWithRouter> {
  obs: IntersectionObserver;
  intersectionRef: React.RefObject<any>;
  lastEle: any;

  constructor(props: PrefetchPropsWithRouter) {
    super(props);
    invariant(
      props.router.route.prefetch,
      'You are attempting to use the "prefetch" function, but have not included the "prefetch" ' +
        "route interaction (@curi/route-prefetch) in your Curi router."
    );
    // re-use ref if provided, otherwise create a new one
    this.intersectionRef = props.forwardedRef
      ? props.forwardedRef
      : React.createRef();

    if (!!(window && IntersectionObserver)) {
      this.obs = new IntersectionObserver(entries => {
        const ref = this.intersectionRef.current;
        const { router, match, which } = this.props;
        entries.forEach(entry => {
          if (ref === entry.target) {
            if (entry.intersectionRatio > 0) {
              router.route.prefetch(match.name, match, which);
              this.obs.unobserve(ref);
              this.obs.disconnect();
            }
          }
        });
      });
    }
  }

  render() {
    return this.props.children(this.intersectionRef);
  }

  componentDidMount() {
    this.obs.observe(this.intersectionRef.current);
    this.lastEle = this.intersectionRef.current;
  }

  componentDidUpdate() {
    if (this.intersectionRef.current !== this.lastEle) {
      this.obs.unobserve(this.lastEle);
      this.obs.observe(this.intersectionRef.current);
      this.lastEle = this.intersectionRef;
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
