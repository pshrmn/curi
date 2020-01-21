<div>
  <h1>Products Page</h1>
  <h2>Categories</h2>
  <ul>
    {#each categories as category (category)}
      <li>
        <Link name="Category" params={{ category }}>
          {title(categoryRoute, { category })}
        </Link>
      </li>
    {/each}
  </ul>
</div>


<script>
  import { getRouter, getResponse } from "@curi/svelte";
  import Link from "@curi/svelte/components/Link.svelte";
  import title from "../titleInteraction";

  let router = getRouter();
  let response = getResponse();

  let categoryRoute = router.route("Category");

  $: categories = $response.data.categories;
</script>