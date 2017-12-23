<template>
  <nav>
    <ul>
      <li>
        <curi-link to="Home">Home</curi-link>
      </li>
      <li>
        <curi-link to="Contact">Contact</curi-link>
        <ul>
          <li v-for="m in methods" :key="m.method">
            <curi-link to="Method" :params="m">{{m.method}}</curi-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'app-nav',
    data: function() {
      return {
        methods: [
          { method: 'Phone' },
          { method: 'Email' },
          { method: 'Fax' }
        ]
      }
    }
  };
</script>