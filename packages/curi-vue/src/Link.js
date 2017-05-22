import Vue from 'vue';

const Link = {
  name: 'curi-link',

  props: ['to', 'params', 'details'],

  computed: {
    location: function() {
      const pathname = Vue.Curi.addons.pathname(this.to, this.params);
      return { pathname, ...this.details };
    },
    href: function() {
      return Vue.Curi.history.createHref(this.location);
    }
  },

  methods: {
    click: function(event) {
      event.preventDefault();
      Vue.Curi.history.push(this.location);
    }
  },

  render: function(h) {
    return h('a', {
        href: this.href,
        click: this.click
      },
      this.$slots.default
    );
  }
};

export default Link;
