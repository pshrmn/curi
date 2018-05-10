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
  children: ReactNode;
  match: MatchData;
  which?: WhichOnFns;
}

interface PrefetchPropsWithRouter extends PrefetchProps {
  router: CuriRouter;
}

/*
 * const PrefetchLink = ({ match, which, children }) => (
 *   <Prefetch
 *     match={match}
 *     which={which}
 *   >
 *     <Link to={match.name} params={match.params}>{children}</Link>
 *   </Prefetch>
 * );
 * 
 * <PrefetchLink match={{ name: "User", params: { id: 1 } }}>
 *   User 1
 * </PrefetchLink>
 */
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
    this.intersectionRef = React.createRef();

    if (!!(window && IntersectionObserver)) {
      this.obs = new IntersectionObserver(entries => {
        const ref = this.intersectionRef.current;
        const { router, match, which } = this.props;
        entries.forEach(entry => {
          if (ref === entry.target) {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
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
    return React.cloneElement(React.Children.only(this.props.children), {
      ref: this.intersectionRef
    });
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

const Prefetch = (props: PrefetchProps): ReactNode => (
  <Curious>
    {({ router }) => (
      <PrefetchWhenVisible router={router} {...props}>
        {props.children}
      </PrefetchWhenVisible>
    )}
  </Curious>
);

export default Prefetch;
