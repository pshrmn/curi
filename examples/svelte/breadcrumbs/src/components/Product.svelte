{#if $response.response.name === "Product"}
<div>
  <Breadcrumbs name="Product" params={params} />
  <h1>{product.name}</h1>
  <p>{product.description}</p>
</div>
{/if}

<script>
  import { getResponse } from "@curi/svelte";
  import Breadcrumbs from "./Breadcrumbs.svelte";

  const response = getResponse();

  $: params = $response.response.params;
  $: product = $response.response.data;
</script>