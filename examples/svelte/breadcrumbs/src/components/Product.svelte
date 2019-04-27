<div>
  <Breadcrumbs name="Product" params={params} />
  <h1>{product.name}</h1>
  <p>{product.description}</p>
</div>

<script>
  import { getResponse } from "@curi/svelte";
  import Breadcrumbs from "./Breadcrumbs.svelte";

  const response = getResponse();

  $: params = $response.params;
  $: product = $response.data.product;
</script>
