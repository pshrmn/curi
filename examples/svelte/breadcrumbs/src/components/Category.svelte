<div>
  <Breadcrumbs name="Category" params={params} />
  <h1>{params.category}</h1>
  <p>List of products</p>
  <ul>
    {#each products as product (product.id)}
      <li>
        <Link name="Product" params={{ ...params, productID: product.id }}>
          {title(productRoute, { name: product.name })}
        </Link>
      </li>
    {/each}
  </ul>
</div>

<script>
  import { getRouter, getResponse } from "@curi/svelte";
  import Link from "@curi/svelte/components/Link.svelte";
  import Breadcrumbs from "./Breadcrumbs.svelte";
  import title from "../titleInteraction";

  const router = getRouter();
  const response = getResponse();

  const productRoute = router.route("Product");

  $: params = $response.params;
  $: products = $response.data.products;
</script>