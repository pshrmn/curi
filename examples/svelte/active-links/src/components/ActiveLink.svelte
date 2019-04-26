<Link
  name={name}
  params={params}
  forward={{ class: className }}
>
  <slot></slot>
</Link>

<script>
  import { getRouter, getResponse } from "@curi/svelte";
  import Link from "@curi/svelte/components/Link.svelte";

  const router = getRouter();
  const response = getResponse();

  export let name;
  export let params;
  export let partial = false;

  $: active = $router.route.active(name, $response.response, { params, partial });
  $: className = active ? "active" : "";
</script>
