<ul className="breadcrumbs">
  {#each ancestors as route (route)}
    <li>
      <Link name={route.meta.name} params={params}>
        {title(route, params)}
      </Link>
    </li>
  {/each}
</ul>

<script>
  import { getRouter } from "@curi/svelte";
  import Link from "@curi/svelte/components/Link.svelte";
  import { ancestors as ancestorsInteraction } from "@curi/interactions";
  import title from "../titleInteraction";

  export let name;
  export let params;

  const router = getRouter();

  let route = router.route(name);
  let ancestors = ancestorsInteraction(route);
</script>
