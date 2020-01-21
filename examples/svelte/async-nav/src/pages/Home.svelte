<div class="container">
  {#each $response.data as movie (movie.id)}
    <AsyncLink
      name="Movie"
      params={{ id: movie.id }}
      wrapper={SpinWhileNavigating}
    >
      {movie.title}
    </AsyncLink>
  {/each}
</div>

<script>
  import { getResponse } from "@curi/svelte";
  import AsyncLink from "@curi/svelte/components/AsyncLink.svelte";
  import SpinWhileNavigating from "../components/SpinWhileNavigating.svelte";

  let response = getResponse();
</script>

<style>
  .container {
    display: flex;
    flex-flow: column nowrap;
  }

  .container :global(a) {
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
