<template>
  <nav>
    <ul>
      <li><curi-link to='Home'>Home</curi-link></li>
      <li><curi-link to='Protected'>Protected</curi-link></li>
      <li>
        <curi-link v-if="$store.state.user" to='Logout'>Logout</curi-link>
        <curi-link v-else to='Login'>Login</curi-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'nav-links'
  };
</script>
