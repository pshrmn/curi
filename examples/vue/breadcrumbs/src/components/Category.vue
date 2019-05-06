<template>
  <div>
    <breadcrumbs name="Category" :params="$curi.response.params" />
    <h1>{{ $curi.response.params.category }}</h1>
    <p>List of products</p>
    <ul>
      <li v-for="product in $curi.response.data" :key="product.id">
        <curi-link name="Product" :params="linkParams(product.id)">
          {{ title(product.name) }}
        </curi-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Breadcrumbs from "./Breadcrumbs";
import title from "../titleInteraction";

export default {
  name: "contact-method",
  methods: {
    title(name) {
      const productRoute = this.$router.route("Product");
      return title(productRoute, { name });
    },
    linkParams(productID) {
      return { ...this.$curi.response.params, productID };
    }
  },
  components: { breadcrumbs: Breadcrumbs }
};
</script>
