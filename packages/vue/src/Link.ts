import Vue, { CreateElement, ComponentOptions } from "vue";
import { HickoryLocation } from "@hickory/root";

export interface LinkComponent extends Vue {
  to: string;
  params?: object;
  hash?: string;
  query?: any;
  state?: any;
  location: HickoryLocation;
  href: string;
  click(e: MouseEvent): void;
}

const canNavigate = (event: MouseEvent) => {
  return (
    !event.defaultPrevented &&
    (event.button !== undefined && event.button === 0) &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
};

const Link: ComponentOptions<LinkComponent> = {
  name: "curi-link",

  props: ["to", "params", "hash", "query", "state", "click"],

  computed: {
    location: function() {
      const pathname = this.to
        ? this.$router.route.pathname(this.to, this.params)
        : this.$curi.response.location.pathname;
      return {
        hash: this.hash,
        query: this.query,
        state: this.state,
        pathname
      };
    },
    href: function() {
      return this.$router.history.toHref(this.location);
    }
  },

  methods: {
    clickHandler: function(event: MouseEvent) {
      if (this.click) {
        this.click(event);
      }
      if (canNavigate(event)) {
        event.preventDefault();
        this.$router.history.navigate(this.location);
      }
    }
  },

  render: function(h: CreateElement) {
    return h(
      "a",
      {
        attrs: { href: this.href },
        on: { click: this.clickHandler }
      },
      this.$slots.default
    );
  }
};

export default Link;
