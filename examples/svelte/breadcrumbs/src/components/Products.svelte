<div>
  <h1>Products Page</h1>
  <h2>Categories</h2>
  <ul>
    {#each categories as category (category)}
      <li>
        <Link name="Category" params={{ category }}>
          {$router.route.title("Category", { category })}
        </Link>
      </li>
    {/each}
  </ul>
</div>


<script>
  import { getRouter, getResponse } from "@curi/svelte";
  import Link from "@curi/svelte/components/Link.svelte";

  const router = getRouter();
  const response = getResponse();

  $: categories = $response.data.categories;
</script>