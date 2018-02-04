<template>
  <div class="modal">
    <slot></slot>
    <button
      type="button"
      v-on:click="this.close"
    >
      Close
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    close: function(e) {
      e.preventDefault();
      this.$router.history.go(-1);
    }
  }
};
</script>

<style>
.modal {
  position: absolute;
  top: 15%;
  bottom: 15%;
  left: 15%;
  right: 15%;
  border: 1px solid #666;
  padding: 15px;
  background: #efefef;
}
</style>
