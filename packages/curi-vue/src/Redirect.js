const Redirect = {
  name: 'curi-redirect',

  props: ['to', 'params', 'details'],

  computed: {
    location: function() {
      const pathname = this.$curi.addons.pathname(this.to, this.params);
      return { pathname, ...this.details };
    },
    href: function() {
      return this.$curi.history.createHref(this.location);
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

  render: function(h) {
    return this.$slots.default && this.$slots.default[0];
  }
};

export default Redirect;
