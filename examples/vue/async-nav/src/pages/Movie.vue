<template>
  <div>
    <p v-if="$curi.response.data.error">
      The requested movie could not be found.
    </p>
    <h1 v-else>{{ $curi.response.data.movie.title }}</h1>
    <curi-link to="Home">Home</curi-link>
  </div>
</template>
