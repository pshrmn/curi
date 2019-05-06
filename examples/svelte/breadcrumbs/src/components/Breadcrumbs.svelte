<ul className="breadcrumbs">
  {#each ancestors as name (name)}
    <li>
      <Link name={name} params={params}>
        {title(router.route(name), params)}
      </Link>
    </li>
  {/each}
</ul>

<script>
  import { getRouter } from "@curi/svelte";
  import Link from "@curi/svelte/components/Link.svelte";
  import { ancestors as ancestorsInteraction } from "@curi/router";
  import title from "../titleInteraction";

  export let name;
  export let params;

  const router = getRouter();

  let route = router.route(name);
  let ancestors = ancestorsInteraction(route);
</script>
