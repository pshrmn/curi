<p>Please do not contact us by {$response.params.method}!</p>

<script>
  import { getResponse } from "@curi/svelte";

  let response = getResponse();
  console.log({ params: $response.params });
</script>