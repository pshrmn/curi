<nav>
  <ul>
  <li>
    <ActiveLink name='Home'>Home</ActiveLink>
  </li>
	<li>
		<ActiveLink name='Contact' partial={false}>Contact Us</ActiveLink>
    <ul>
      {#each methods as method}
        <li>
          <ActiveLink name='Method' params={{ method }}>By {method}</ActiveLink>
        </li>
      {/each}
    </ul>
	</li>
  </ul>
</nav>

<script>
  import ActiveLink from "./ActiveLink.svelte";

  let methods = ['email', 'phone'];
</script>