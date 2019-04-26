<ul className="breadcrumbs">
  {#each ancestors as ancestor (ancestor)}
    <li>
      <Link name={ancestor} params={params}>
        {$router.route.title(ancestor, params)}
      </Link>
    </li>
  {/each}
</ul>

<script>
  import { getRouter } from "@curi/svelte";
  import Link from "@curi/svelte/components/Link.svelte";

  export let name;
  export let params;

  const router = getRouter();

  $: ancestors = $router.route.ancestors(name).reverse();
</script>
