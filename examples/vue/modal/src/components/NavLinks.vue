<template>
  <nav>
    <ul>
      <li>
        <curi-link name="Home">Home</curi-link>
      </li>
      <li>
        Paints
        <ol>
          <li>
            <curi-link
              name="Product"
              :params="{ color: 'DarkSlateBlue' }"
              :state="{ name: 'Dark Slate Blue' }"
            >
              Dark Slate Blue
            </curi-link>
          </li>
          <li>
            <curi-link
              name="Product"
              :params="{ color: 'SeaGreen' }"
              :state="{ name: 'Sea Green' }"
            >
              Sea Green
            </curi-link>
          </li>
          <li>
            <curi-link
              name="Product"
              :params="{ color: 'Crimson' }"
              :state="{ name: 'Crimson' }"
            >
              Crimson
            </curi-link>
          </li>
        </ol>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navcuri-links"
};
</script>
