<template>
  <nav>
    <ul>
      <li>
        <active-link to='Home'>Home</active-link>
      </li>
      <li>
        <active-link to='Contact' :partial="true">Contact</active-link>
        <ul>
          <li>
            <active-link
              to='Method'
              :params="{ method: 'phone' }"
            >
              By Phone
            </active-link>
          </li>
          <li>
            <active-link
              to='Method'
              :params="{ method: 'email' }"
            >
              By Email
            </active-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import ActiveLink from "./ActiveLink";

export default {
  name: "nav-links",
  methods: {
    merge: props => {
      props.class = "active";
      return props;
    }
  },
  components: {
    "active-link": ActiveLink
  }
};
</script>
