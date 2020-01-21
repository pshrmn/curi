<template>
  <div>
    <button type="button" v-on:click="onClick">
      Login
    </button>
  </div>
</template>

<script>
export default {
  name: "login",
  methods: {
    onClick: function(e) {
      this.$store.commit("login");
      let { query } = this.$curi.response.location;
      this.$router.navigate({ url: query.next || "/", method: "replace" });
    }
  }
};
</script>
