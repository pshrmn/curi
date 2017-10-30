import Vue, { CreateElement, ComponentOptions } from 'vue';
import { HickoryLocation } from '@hickory/root';

export interface LinkComponent extends Vue {
  to: string;
  params?: object;
  details?: object;
  location: HickoryLocation;
  href: string;
  click(e: MouseEvent): void;
}

const canNavigate = (event: MouseEvent) => {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
};

const Link: ComponentOptions<LinkComponent> = {
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
    click: function(event: MouseEvent) {
      if (canNavigate(event)) {
        event.preventDefault();
        this.$curi.history.navigate(this.location);
      }
    }
  },

  render: function(h: CreateElement) {
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
