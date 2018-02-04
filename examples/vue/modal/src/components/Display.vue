<template>
  <div v-if="isModal">
    <component :is="navigation.previous.body" :response="navigation.previous" />
    <Modal>
      <component :is="response.body" :response="response" />
    </Modal>
  </div>
  <div v-else>
    <component :is="response.body" :response="response" />
  </div>
</template>

<script>
import Modal from "./Modal";

export default {
  props: ["response", "navigation"],
  computed: {
    isModal: function() {
      const location = this.response.location;
      return !!(
        location.state &&
        location.state.modal &&
        this.navigation.previous
      );
    }
  },
  components: { Modal }
};
</script>
