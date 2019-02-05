import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp,
  Note
} from "../../../../../components/package/common";

const propsMeta = {
  title: "Props",
  hash: "Focus-props"
};
export const meta = {
  title: "<Focus>",
  hash: "Focus",
  children: [propsMeta]
};

export function FocusAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        <IJS>Focus</IJS> lets you focus a DOM element whenever there is a new
        response.
      </p>
      <p>
        The DOM component that gets the ref should either already be
        "focusable", like an <Cmp>input</Cmp>, or be given a <IJS>tabIndex</IJS>{" "}
        prop (usually with the value of <IJS>-1</IJS>
        ). If neither of these conditions is met, then the document's{" "}
        <Cmp>body</Cmp> will be focused.
      </p>
      <p>
        The focused element will have an outline (the exact style varies by
        browser). You can remove this visual with a CSS <IJS>outline</IJS> of{" "}
        <IJS>"none"</IJS>.
      </p>
      <Note>
        <p>
          Only one <IJS>Focus</IJS> should be rendered at a time.
        </p>
      </Note>

      <CodeBlock lang="jsx">
        {`import { Focus } from "@curi/react-dom";

<Focus>
  {ref => (
    <div tabIndex={-1} ref={ref}>
      {/* ... */}
    </div>
  )}
</Focus>`}
      </CodeBlock>
      <HashSection tag="h3" meta={propsMeta}>
        <HashSection
          tag="h4"
          meta={{ title: "children()", hash: "Focus-children" }}
        >
          <p>
            The <IJS>children()</IJS> function is a render-invoked prop that
            will be passed a <IJS>ref</IJS>. The <IJS>ref</IJS> should be
            attached to the element that you want focused.
          </p>
          <p>
            If you need to pass this through class/functional components, you
            should use either <IJS>React.forwardRef()</IJS> or pass it as a prop
            with a name other than <IJS>ref</IJS> (like <IJS>innerRef</IJS>).
          </p>

          <CodeBlock lang="jsx">
            {`<Focus>
  {ref => (
    <div tabIndex={-1} ref={ref} />
  )}
</Focus>

<Focus>
  {ref => <SomeComponent innerRef={ref} />}
</Focus>`}
          </CodeBlock>
        </HashSection>
        <HashSection
          tag="h4"
          meta={{ title: "preventScroll", hash: "focus-preventScroll" }}
        >
          <p>
            The default behavior for focusing an element is to scroll to it. If
            you want to prevent this, pass <IJS>{`preventScroll=\{true\}`}</IJS>{" "}
            to the <IJS>Focus</IJS>.
          </p>

          <CodeBlock lang="jsx">
            {`// scrolls
<Focus>{ref => ...}</Focus>

// does not scroll
<Focus preventScroll={true}>{ref => ...}</Focus>`}
          </CodeBlock>
        </HashSection>
        <HashSection
          tag="h4"
          meta={{ title: "preserve", hash: "focus-preserve" }}
        >
          <p>
            The default focus behavior is to always focus the element that the
            ref is attached to. However, if you want to preserve the focus on
            some other element (e.g. an autofocused element),{" "}
            <IJS>{`preserve=\{true\}`}</IJS> will stop the <IJS>ref</IJS>{" "}
            element from claiming the focus.
          </p>
          <p>
            This only works when the already-focused element is a child of the{" "}
            <IJS>ref</IJS> element. If it is not a child, then the{" "}
            <IJS>ref</IJS> element will take the focus.
          </p>

          <CodeBlock lang="jsx">
            {`// claim focus for the <div>
<Focus>
  {ref => (
    <div tabIndex={-1} ref={ref}>
      <input autoFocus={true} />
    </div>
  )}
</Focus>

// preserve focus on the <input>
<Focus preserve={true}>
  {ref => (
    <div tabIndex={-1} ref={ref}>
      <input autoFocus={true} />
    </div>
  )}
</Focus>`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
