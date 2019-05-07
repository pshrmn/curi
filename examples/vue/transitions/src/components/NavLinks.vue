<template>
  <nav>
    <ul>
      <li><curi-link name="Home">Home</curi-link></li>
      <li>
        <curi-link name="Contact">Contact</curi-link>
        <ol>
          <li>
            <curi-link name="Method" :params="{ method: 'phone' }"
              >By Phone</curi-link
            >
          </li>
          <li>
            <curi-link name="Method" :params="{ method: 'email' }"
              >By Email</curi-link
            >
          </li>
          <li>
            <curi-link name="Method" :params="{ method: 'mail' }"
              >By Mail</curi-link
            >
          </li>
        </ol>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "nav-links"
};
</script>
