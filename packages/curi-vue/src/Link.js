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

  template: '<a :href="href" @click="this.click"><slot></slot></a>'
};

export default Link;
