const Block = {
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

  render: function(h) {
    return h('span');
  }
};

export default Block;
