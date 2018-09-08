<template>
  <div>
    <NavLinks />
    <Display
      :response="$curi.response"
      :navigation="$curi.navigation"
    />
  </div>
</template>

<script>
import NavLinks from "./NavLinks";
import Display from "./Display";
export default {
  name: "App",
  components: {
    NavLinks,
    Display
  }
};
</script>

<style>
body {
  min-height: 100vh;
}
</style>
