<template>
  <nav>
    <ul>
      <li><curi-link to='Home'>Home</curi-link></li>
      <li>
        <curi-link to='Contact'>Contact</curi-link>
        <ol>
          <li><curi-link to='Method' :params="{ method: 'phone' }">By Phone</curi-link></li>
          <li><curi-link to='Method' :params="{ method: 'email' }">By Email</curi-link></li>
          <li><curi-link to='Method' :params="{ method: 'mail' }">By Mail</curi-link></li>
        </ol>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'nav-links'
  };
</script>
