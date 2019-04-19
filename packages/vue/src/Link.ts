import Vue from "vue";
import { canNavigate } from "./utils/canNavigate";

import { CreateElement, ComponentOptions } from "vue";
import { SessionLocation } from "@hickory/root";

export interface LinkComponent extends Vue {
  name: string;
  params?: object;
  hash?: string;
  query?: any;
  state?: any;
  location: SessionLocation;
  href: string;
  click(e: MouseEvent): void;
  forward?: object;
}

const Link: ComponentOptions<LinkComponent> = {
  name: "curi-link",

  props: ["name", "params", "hash", "query", "state", "click", "forward"],

  computed: {
    location: function() {
      const pathname = this.name
        ? this.$router.route.pathname(this.name, this.params)
        : "";
      return {
        hash: this.hash,
        query: this.query,
        state: this.state,
        pathname
      };
    },
    href: function() {
      return this.$router.history.href(this.location);
    }
  },

  methods: {
    clickHandler: function(event: MouseEvent) {
      if (this.click) {
        this.click(event);
      }
      if (canNavigate(event)) {
        event.preventDefault();
        this.$router.navigate({
          name: this.name,
          params: this.params,
          hash: this.hash,
          query: this.query,
          state: this.state
        });
      }
    }
  },

  render: function(h: CreateElement) {
    return h(
      "a",
      {
        attrs: { href: this.href, ...this.forward },
        on: { click: this.clickHandler }
      },
      this.$slots.default
    );
  }
};

export default Link;
