import Vue, { CreateElement, ComponentOptions } from 'vue';
import { HickoryLocation } from '@hickory/root';

export interface RedirectComponent extends Vue {
  to: string;
  params?: object;
  details?: object;
  location: HickoryLocation;
}

const Redirect: ComponentOptions<RedirectComponent> = {
  name: 'curi-redirect',

  props: ['to', 'params', 'details'],

  computed: {
    location: function() {
      const pathname = this.$curi.addons.pathname(this.to, this.params);
      return { pathname, ...this.details };
    }
  },

  beforeMount: function() {
    if (this.$slots.default && this.$slots.default.length > 1) {
      console.warn(
        'A <curi-redirect> should only render one slot, but was given ' +
          this.$slots.default.length
      );
    }
  },

  mounted: function() {
    this.$curi.history.replace(this.location);
  },

  render: function(h: CreateElement) {
    return this.$slots.default && this.$slots.default[0];
  }
};

export default Redirect;
