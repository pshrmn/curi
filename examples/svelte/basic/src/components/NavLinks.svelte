<nav>
  <ul>
  <li>
    <Link name='Home'>Home</Link>
  </li>
	<li>
		<Link name='Contact'>Contact Us</Link>
    <ul>
      {#each methods as method}
        <li>
          <Link name='Method' params={{ method }}>By {method}</Link>
        </li>
      {/each}
    </ul>
	</li>
  </ul>
</nav>

<script>
  import Link from "@curi/svelte/components/Link.svelte";

  let methods = ['email', 'phone'];
</script>