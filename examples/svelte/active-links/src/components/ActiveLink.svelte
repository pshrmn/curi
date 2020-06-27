<Link
  name={name}
  params={params}
  class={className}
>
  <slot></slot>
</Link>

<script>
  import { getRouter, getResponse } from "@curi/svelte";
  import Link from "@curi/svelte/components/Link.svelte";
  import { active as activeInteraction } from "@curi/interactions";

  let router = getRouter();
  let response = getResponse();

  export let name;
  export let params;
  export let partial = false;

  $: route = router.route(name);
  $: active = activeInteraction(route, $response, { params, partial });
  $: className = active ? "active" : "";
</script>
