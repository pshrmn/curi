import Vue from "vue";
import invariant from "invariant";

import { CreateElement, ComponentOptions, VNode } from "vue";
import { HickoryLocation } from "@hickory/root";
import { Resolved } from "@curi/core";

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

export interface PrefetchComponent extends Vue {
  match: MatchData;
  which?: WhichOnFns;
  resolved: MaybeResolved;
}

const Prefetch: ComponentOptions<PrefetchComponent> = {
  name: "curi-prefetch",

  props: ["match", "which"],

  data() {
    return {
      resolved: null,
      obs: undefined
    };
  },

  render: function(h: CreateElement) {
    return this.$scopedSlots.default({
      resolved: this.resolved
    });
  },

  beforeCreate: function() {
    invariant(
      this.$router.route.prefetch,
      'You are attempting to use the "prefetch" function, but have not included the "prefetch" ' +
        "route interaction (@curi/route-prefetch) in your Curi router."
    );
  },

  beforeMount: function() {
    if (typeof window !== "undefined" && IntersectionObserver) {
      this.obs = new IntersectionObserver(entries => {
        const ref = this.$vnode.elm;
        entries.forEach(entry => {
          if (ref === entry.target && entry.intersectionRatio > 0) {
            this.obs.unobserve(ref);
            this.obs.disconnect();
            this.$router.route
              .prefetch(this.match.name, this.match, this.which)
              .then((resolved: Resolved) => {
                this.resolved = resolved;
              });
          }
        });
      });
    }
  },

  mounted: function() {
    const ref = this.$vnode.elm;
    this.obs.observe(ref);
  },

  destroyed: function() {
    this.obs.disconnect();
  }
};

export default Prefetch;
