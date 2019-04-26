<ul className="breadcrumbs">
  {#each ancestors as name (name)}
    <li>
      <Link name={name} params={params}>
        {$router.route.title(name, params)}
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
