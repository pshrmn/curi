import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS,
  Cmp,
  Note
} from "../../../../../components/package/common";

let propertiesMeta = {
  title: "Properties",
  hash: "focus-properties"
};
export let meta = {
  title: "curi-focus",
  hash: "focus"
};

export function FocusAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>curi-focus</IJS> directive is used to specify an element that
        should be focused when a new response is emitted.
      </Paragraph>

      <Paragraph>
        The DOM component that gets the ref should either already be
        "focusable", like an <Cmp>input</Cmp>, or be given a <IJS>tabIndex</IJS>{" "}
        prop (usually with the value of <IJS>-1</IJS>
        ). If neither of these conditions is met, then the document's{" "}
        <Cmp>body</Cmp> will be focused.
      </Paragraph>

      <Paragraph>
        The focused element will have an outline (the exact style varies by
        browser). You can remove this visual with a CSS outline of{" "}
        <IJS>"none"</IJS>.
      </Paragraph>

      <Note>
        <Paragraph>
          You should only have one focused element rendered at a time.
        </Paragraph>
      </Note>

      <CodeBlock lang="html">
        {`<template>
  <main :tabIndex="-1" v-curi-focus="{ key: $curi.response }">
    <component :is="$curi.response.body" />
  </main>
</template>`}
      </CodeBlock>

      <HashSection tag="h3" meta={propertiesMeta}>
        <HashSection tag="h4" meta={{ title: "key", hash: "focus-key" }}>
          <Paragraph>
            A value that changes when there is a new response; the{" "}
            <IJS>response</IJS> is usually fine for this.
          </Paragraph>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "preserve", hash: "focus-preserve" }}
        >
          <Paragraph>
            When <IJS>true</IJS> (<IJS>false</IJS> by default), the element will
            not be focused if one of its children elements is already focused.
          </Paragraph>

          <Paragraph>
            This is useful if the element has children that are automatically
            focused (<Cmp>input autofocus</Cmp>).
          </Paragraph>

          <CodeBlock lang="html">
            {`<!-- <input> will be focused -->
<template>
  <main
    :tabIndex="-1"
    v-curi-focus="{ key: $curi.response, preserve: true}"
  >
    <input autofocus />
  </main>
</template>

<!-- <main> will be focused -->
<template>
  <main :tabIndex="-1" v-curi-focus="{ key: $curi.response }">
    <input autofocus />
  </main>
</template>`}
          </CodeBlock>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "preventScroll", hash: "focus-preventScroll" }}
        >
          <Paragraph>
            When <IJS>true</IJS> (<IJS>false</IJS> by default), the element will
            not be scrolled to when it is focused.
          </Paragraph>

          <Paragraph>
            This only works in browsers that support the{" "}
            <IJS>preventScroll</IJS> option for <IJS>focus</IJS>.
          </Paragraph>

          <CodeBlock lang="html">
            {`<template>
  <main
    :tabIndex="-1"
    v-curi-focus="{ key: $curi.response, preventScroll: true}"
  >
  <component :is="$curi.response.body" />
  </main>
</template>`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
