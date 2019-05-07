<template>
  <div class="container">
    <curi-link
      name="Movie"
      v-for="movie in $curi.response.data"
      :key="movie.id"
      :params="{ id: movie.id }"
    >
      <template slot-scope="{ navigating }">
        {{ movie.title }}
        <HalfCircleSpinner v-if="navigating" :size="30" color="#444" />
      </template>
    </curi-link>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
export default {
  components: {
    HalfCircleSpinner
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
}
a {
  background: #efefef;
  color: #444;
  margin: 5px 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
  padding: 5px;
  border-radius: 5px;
  height: 30px;
  width: 250px;
}
</style>
