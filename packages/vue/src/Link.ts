import Vue, { CreateElement, ComponentOptions } from "vue";
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
  navigating: boolean;
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

  props: ["name", "params", "hash", "query", "state", "click"],

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
      if (canNavigate(event)) {
        event.preventDefault();
        let cancelled, finished;
        if (this.$scopedSlots.default) {
          cancelled = finished = () => {
            this.navigating = false;
          };
          this.navigating = true;
        }
        this.$router.navigate({
          name: this.name,
          params: this.params,
          hash: this.hash,
          query: this.query,
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
        attrs: { href: this.href },
        on: { click: this.clickHandler }
      },
      this.$scopedSlots.default
        ? this.$scopedSlots.default({
            navigating: this.navigating
          })
        : this.$slots.default
    );
  }
};

export default Link;
