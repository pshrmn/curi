<template>
  <div>
    Paint color: {{ response.location.state.name || "Unknown" }}
    <Preview :color="response.params.color" />
    <curi-link
      name="Product Detail"
      :params="response.params"
      :state="{ modal: true }"
    >
      Detail View
    </curi-link>
  </div>
</template>

<script>
import Preview from "./Preview";

export default {
  name: "Product",
  props: ["response"],
  components: { Preview }
};
</script>
