import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS,
  Cmp,
  Note
} from "../../../../../components/package/common";

let optsMeta = {
  title: "Options",
  hash: "useNavigationFocus-opts"
};
export let meta = {
  title: "useNavigationFocus",
  hash: "useNavigationFocus"
};

export function UseNavigationFocusAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>useNavigationFocus</IJS> hook is used to focus a DOM element
        after a navigation.
      </Paragraph>

      <Note>
        <Paragraph>
          The DOM component that gets the ref should either already be
          "focusable", like an <Cmp>input</Cmp>, or be given a{" "}
          <IJS>tabIndex</IJS> prop (usually with the value of <IJS>-1</IJS>
          ). If neither of these conditions is met, then the document's{" "}
          <Cmp>body</Cmp> will be focused.
        </Paragraph>
      </Note>

      <CodeBlock lang="jsx">
        {`import { useNavigationFocus } from "@curi/react-dom";

function App() {
  let ref = React.createRef(null);
  useNavigationFocus(ref);

  return (
    <main tabIndex={-1} ref={ref}>
      {/* ... */}
    </main>
  );
}`}
      </CodeBlock>

      <Paragraph>
        The focused element will have an outline (the exact style varies by
        browser). You can remove this with CSS by setting <IJS>outline</IJS> to{" "}
        <IJS>"none"</IJS>. This should only be done for non-focusable elements.
        Setting <IJS>outline</IJS> to <IJS>"none"</IJS> globally is bad for
        accessibility.
      </Paragraph>

      <CodeBlock lang="jsx">
        {`<main
  ref={ref}
  tabIndex={-1}
  style={{ outline: "none" }}
>
  {/* ... */}
</main>`}
      </CodeBlock>

      <HashSection tag="h3" meta={optsMeta}>
        <HashSection
          tag="h4"
          meta={{
            title: "preventScroll",
            hash: "useNavigationFocus-preventScroll"
          }}
        >
          <Paragraph>
            The default behavior for focusing an element is to scroll to it. If
            you want to prevent this, set <IJS>preventScroll</IJS> to{" "}
            <IJS>true</IJS>.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`// scrolls
useNavigationFocus(ref);

// does not scroll
useNavigationFocus(ref, { preventScroll: true });`}
          </CodeBlock>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "preserve", hash: "useNavigationFocus-preserve" }}
        >
          <Paragraph>
            The default focus behavior is to always focus the element that the
            ref is attached to. However, if you want to preserve the focus on
            some other element (e.g. an autofocused element), setting the{" "}
            <IJS>preserve</IJS> option to <IJS>true</IJS> will stop the{" "}
            <IJS>ref</IJS> element from claiming the focus.
          </Paragraph>
          <Paragraph>
            This only works when the already-focused element is a child of the{" "}
            <IJS>ref</IJS> element. If it is not a child, then the{" "}
            <IJS>ref</IJS> element will take the focus.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`// claim focus for the <main>
useNavigationFocus(ref)
<main tabIndex={-1} ref={ref}>
  <input autoFocus={true} />
</main>

// preserve focus on the <input>
useNavigationFocus(ref, { preserve: true });
<main tabIndex={-1} ref={ref}>
  <input autoFocus={true} />
</main>`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
