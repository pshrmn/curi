import Vue from "vue";
import { canNavigate } from "./utils/canNavigate";

import { CreateElement, ComponentOptions } from "vue";

export interface AsyncLinkComponent extends Vue {
  name: string;
  params?: object;
  hash?: string;
  query?: any;
  state?: any;
  url: string;
  click(e: MouseEvent): void;
  navigating: boolean;
  forward?: object;
}

const Link: ComponentOptions<AsyncLinkComponent> = {
  name: "curi-async-link",

  props: ["name", "params", "hash", "query", "state", "click", "forward"],

  computed: {
    url: function() {
      return this.$router.url({
        name: this.name,
        params: this.params,
        hash: this.hash,
        query: this.query
      });
    }
  },

  data: function() {
    return {
      navigating: false
    };
  },

  methods: {
    clickHandler: function(event: MouseEvent) {
      if (this.click) {
        this.click(event);
      }
      // @ts-ignore
      if (canNavigate(event, this.forward && this.forward.target)) {
        event.preventDefault();
        let cancelled, finished;
        cancelled = finished = () => {
          this.navigating = false;
        };
        this.navigating = true;

        this.$router.navigate({
          url: this.url,
          state: this.state,
          cancelled,
          finished
        });
      }
    }
  },

  render: function(h: CreateElement) {
    return h(
      "a",
      {
        attrs: { href: this.url, ...this.forward },
        on: { click: this.clickHandler }
      },
      this.$scopedSlots.default({
        navigating: this.navigating
      })
    );
  }
};

export default Link;
