import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

let propsMeta = {
  title: "Props",
  hash: "navigating-props"
};
export let meta = {
  title: "Navigating",
  hash: "navigating"
};

export function NavigatingAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>Navigating</IJS> component is used to cancel an active
        asynchronous navigation.
      </Paragraph>
      <Paragraph>
        A component is passed to <IJS>Navigating</IJS>. When there is an active
        asynchronous navigation, the component will be given a <IJS>cancel</IJS>{" "}
        function. When there is not an active asynchronous navigation,{" "}
        <IJS>cancel</IJS> will be <IJS>undefined</IJS>.
      </Paragraph>

      <CodeBlock lang="html">
        {`<Navigating component={Cancel} />

<script>
  import Navigating from "@curi/svelte/components/Navigating.svelte";
  import Cancel from "./Cancel";
</script>`}
      </CodeBlock>

      <HashSection meta={propsMeta} tag="h3">
        <HashSection
          meta={{ title: "component", hash: "navigating-component" }}
          tag="h4"
        >
          <Paragraph>
            A component that receives a <IJS>cancel</IJS> function when there is
            an active asynchronous navigation.
          </Paragraph>

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
