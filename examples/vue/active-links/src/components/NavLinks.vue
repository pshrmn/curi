<template>
  <nav>
    <ul>
      <li>
        <curi-link to='Home' :active="{ merge }">Home</curi-link>
      </li>
      <li>
        <curi-link to='Contact' :active="{ merge, partial: true }">Contact</curi-link>
        <ul>
          <li>
            <curi-link
              to='Method'
              :active="{ merge }"
              :params="{ method: 'phone' }"
            >
              By Phone
            </curi-link>
          </li>
          <li>
            <curi-link
              to='Method'
              :active="{ merge }"
              :params="{ method: 'email' }"
            >
              By Email
            </curi-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'nav-links',
    methods: {
      merge: (props) => {
        props.class = 'active';
        return props;
      }
    }
  };
</script>


