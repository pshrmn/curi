<template>
  <nav>
    <ul>
      <li><curi-link name="Home">Home</curi-link></li>
      <li><curi-link name="Protected">Protected</curi-link></li>
      <li>
        <curi-link v-if="$store.state.user" name="Logout">Logout</curi-link>
        <curi-link v-else name="Login">Login</curi-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "nav-links"
};
</script>
