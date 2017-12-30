<template>
  <div>
    <button
      type='button'
      v-on:click="onClick"
    >
      Logout
    </button>
  </div>
</template>

<script>
  export default {
    name: 'logout',
    methods: {
      onClick: function(e) {
        this.$store.commit('logout');
        this.$curi.router.history.replace('/');
      }
    }
  };
</script>
