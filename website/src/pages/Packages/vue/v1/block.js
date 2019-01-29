import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp
} from "../../../../components/package/common";

export const meta = {
  title: "<curi-block>",
  hash: "block"
};

export function BlockAPI() {
  return (
    <HashSection title={meta.title} id={meta.hash}>
      <p>
        The <Cmp>curi-block</Cmp> component can be used to automatically block
        navigation from a page. This will only block in-app navigation. If the
        user attempts to leave your application, they will not be blocked.
      </p>
      <p>
        The <Cmp>curi-block</Cmp> expects two props: <IJS>active</IJS> and{" "}
        <IJS>confirm</IJS>.
      </p>
      <ul>
        <li>
          <IJS>active</IJS> - When this is true, navigation will be blocked and
          when it is false, navigation will be allowed. If you do not provide
          this prop, it will default to <IJS>true</IJS>.
        </li>
        <li>
          <IJS>confirm</IJS> - The function that will be called to confirm/deny
          the navigation.
        </li>
      </ul>

      <CodeBlock lang="html">
        {`<template>
  <div>
    <!-- ... -->
    <curi-block :active="active" :confirm="confirm" />
  </div>
</template>

<script>
  export default {
    data: {
      active: true
    },
    methods: {
      confirm(information, go, stay) {
        const confirmed = window.confirm('Navigate?');
        if (confirmed) {
          go();
        } else {
          stay();
        }
      }
    }
  }
</script>`}
      </CodeBlock>
    </HashSection>
  );
}
