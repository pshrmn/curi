import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp
} from "../../../../../components/package/common";

const propsMeta = {
  title: "Props",
  hash: "navigating-props"
};
export const meta = {
  title: "<Navigating>",
  hash: "navigating",
  children: [propsMeta]
};

export function NavigatingAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <Cmp>Navigating</Cmp> component is used to cancel an active
        asynchronous navigation.
      </p>
      <p>
        A component is passed to <Cmp>Navigating</Cmp>. When there is an active
        asynchronous navigation, the component will be given a <IJS>cancel</IJS>{" "}
        function. When there is not an active asynchronous navigation,{" "}
        <IJS>cancel</IJS> will be <IJS>undefined</IJS>.
      </p>

      <CodeBlock lang="html">
        {`<Navigating component={Cancel} />

<script>
  import Navigating from "@curi/svelte/components/Navigating.html";
  import Cancel from "./Cancel";

  export default {
    components: { Navigating },
    data() {
      return { Cancel };
    }
  }
</script>`}
      </CodeBlock>

      <HashSection meta={propsMeta} tag="h3">
        <HashSection
          meta={{ title: "component", hash: "navigating-component" }}
          tag="h4"
        >
          <p>
            A component that receives a <IJS>cancel</IJS> function when there is
            an active asynchronous navigation.
          </p>

          <CodeBlock lang="html">
            {`{#if typeof cancel === "function"}
  <button on:click="cancelHandler(event, cancel)">
    Cancel Navigation
  </button>
{/if}

<script>
  export default {
    methods: {
      cancelHandler(event, cancel) {
        event.preventDefault();
        cancel();
      }
    }
  };
</script>`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
