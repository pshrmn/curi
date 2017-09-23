import Vue, { CreateElement, ComponentOptions } from 'vue';
import { ConfirmationFunction } from '@hickory/root';

export interface BlockComponent extends Vue {
  active?: boolean;
  confirm: ConfirmationFunction;
  on(): void;
  off(): void;
}

const Block: ComponentOptions<BlockComponent> = {
  name: 'curi-block',

  props: {
    active: {
      type: Boolean,
      default: true
    },
    confirm: {
      type: Function,
      required: true
    }
  },

  methods: {
    on: function() {
      this.$curi.history.confirmWith(this.confirm);  
    },
    off: function() {
      this.$curi.history.removeConfirmation();
    }
  },

  beforeMount: function() {
    if (this.active) {
      this.on();
    }
  },

  beforeUpdate: function() {
    this.off();
    if (this.active) {
      this.on();
    }
  },

  beforeDestroy: function() {
    this.off()
  },

  render: function(h: CreateElement) {
    return h('span');
  }
};

export default Block;
