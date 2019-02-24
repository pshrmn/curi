import Vue, { CreateElement, ComponentOptions } from "vue";
import { ConfirmationFunction } from "@hickory/root";

export interface BlockComponent<Q> extends Vue {
  active?: boolean;
  confirm: ConfirmationFunction<Q>;
  on(): void;
  off(): void;
  update(): void;
}

// TODO: restrict BlockComponent generic
const Block: ComponentOptions<BlockComponent<any>> = {
  name: "curi-block",

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
      this.$router.history.confirmWith(this.confirm);
    },
    off: function() {
      this.$router.history.removeConfirmation();
    },
    update: function() {
      this.off();
      if (this.active) {
        this.on();
      }
    }
  },

  beforeMount: function() {
    if (this.active) {
      this.on();
    }
  },

  watch: {
    active() {
      this.update();
    },
    confirm() {
      this.update();
    }
  },

  beforeDestroy: function() {
    this.off();
  },

  render: function(h: CreateElement) {
    return null;
  }
};

export default Block;
