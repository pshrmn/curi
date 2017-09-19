const canNavigate = event => {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
};

const Link = {
  name: 'curi-link',

  props: ['to', 'params', 'details'],

  computed: {
    location: function() {
      const pathname = this.$curi.addons.pathname(this.to, this.params);
      return { pathname, ...this.details };
    },
    href: function() {
      return this.$curi.history.toHref(this.location);
    }
  },

  methods: {
    click: function(event) {
      if (canNavigate(event)) {
        event.preventDefault();
        this.$curi.history.update(this.location);
      }
    }
  },

  render: function(h) {
    return h(
      'a',
      {
        attrs: {
          href: this.href
        },
        on: {
          click: this.click
        }
      },
      this.$slots.default
    );
  }
};

export default Link;
