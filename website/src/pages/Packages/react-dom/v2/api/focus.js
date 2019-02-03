import React from "react";
import { Link } from "@curi/react-dom";

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
        <Cmp>Focus</Cmp> is a wrapper around the{" "}
        <Link hash="useNavigationFocus">
          <IJS>useNavigationFocus</IJS>
        </Link>{" "}
        hook.
      </p>

      <CodeBlock lang="jsx">
        {`import { Focus } from "@curi/react-dom";

<Focus preventScroll={true} preserve={false}>
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
            See{" "}
            <Link hash="useNavigationFocus-preventScroll">
              <IJS>useNavigationFocus</IJS> <IJS>preventScroll</IJS>
            </Link>
          </p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "preserve", hash: "focus-preserve" }}
        >
          <p>
            See{" "}
            <Link hash="useNavigationFocus-preserve">
              <IJS>useNavigationFocus</IJS> <IJS>preserve</IJS>
            </Link>
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
