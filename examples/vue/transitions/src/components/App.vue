<template>
  <div>
    <NavLinks />
    <transition name="component-fade">
      <component :key="$curi.response.location.key" :is="$curi.response.body" />
    </transition>
  </div>
</template>

<script>
import NavLinks from "./NavLinks";
export default {
  name: "app",
  components: { NavLinks }
};
</script>

<style>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
  position: absolute;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
  position: absolute;
}
</style>
