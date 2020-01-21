import Vue from "vue";
import { canNavigate } from "./utils/canNavigate";

import { CreateElement, ComponentOptions } from "vue";

export interface LinkComponent extends Vue {
  name: string;
  params?: object;
  hash?: string;
  query?: any;
  state?: any;
  url: string;
  click(e: MouseEvent): void;
}

let Link: ComponentOptions<LinkComponent> = {
  name: "curi-link",

  props: ["name", "params", "hash", "query", "state", "click"],

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

  methods: {
    clickHandler: function(event: MouseEvent) {
      if (this.click) {
        this.click(event);
      }
      // @ts-ignore
      if (canNavigate(event)) {
        event.preventDefault();
        this.$router.navigate({
          url: this.url,
          state: this.state
        });
      }
    }
  },

  render: function(h: CreateElement) {
    return h(
      "a",
      {
        attrs: { href: this.url },
        on: { click: this.clickHandler }
      },
      this.$slots.default
    );
  }
};

export default Link;
