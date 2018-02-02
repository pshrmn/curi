import Vue, { CreateElement, ComponentOptions } from "vue";
import { HickoryLocation, LocationDetails } from "@hickory/root";
import warning from "warning";

export interface ActiveLink {
  merge(props: object): object;
  partial?: boolean;
  extra?(l: HickoryLocation, d: object): boolean;
}

export interface LinkComponent extends Vue {
  to: string;
  params?: object;
  details?: LocationDetails;
  location: HickoryLocation;
  href: string;
  active: ActiveLink;
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

  props: ["to", "params", "details", "active", "click"],

  computed: {
    location: function() {
      return this.$router.createLocation({
        name: this.to,
        params: this.params,
        ...this.details
      });
    },
    href: function() {
      return this.$router.history.toHref(this.location);
    },
    isActive: function() {
      if (!this.$router.addons.active) {
        warning(
          !this.active,
          'You are attempting to use the "active" prop, but have not included the "active" ' +
            "addon (@curi/addon-active) in your Curi router."
        );
        return false;
      }

      return (
        this.$router.addons.active(
          this.to,
          this.$curi.response,
          this.params,
          !!this.active.partial
        ) &&
        (this.active.extra
          ? this.active.extra(this.$curi.response.location, this.details)
          : true)
      );
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
    let props = {
      attrs: { href: this.href },
      on: { click: this.clickHandler }
    };
    if (this.active && this.isActive) {
      props = this.active.merge(props);
    }
    return h("a", props, this.$slots.default);
  }
};

export default Link;
