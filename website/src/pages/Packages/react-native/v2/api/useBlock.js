import React from "react";

import {
  HashSection,
  CodeBlock,
  Note,
  IJS
} from "../../../../../components/package/common";

const argsMeta = {
  title: "Arguments",
  hash: "useBlock-args"
};
export const meta = {
  title: "useBlock()",
  hash: "useBlock",
  children: [argsMeta]
};

export function UseBlockAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>useBlock</IJS> hook lets you setup navigation blocks.
        Navigation away from the page will be prevented unless the user confirms
        that they want to navigate.
      </p>

      <p>
        The primary use case for <IJS>useBlock</IJS> is to prevent accidental
        navigation away from a page with a a partially filled form.
      </p>

      <Note>
        <p>
          This <strong>will not</strong> prevent the user from navigating to
          another site, it only works for navigation within the application.
        </p>
      </Note>

      <CodeBlock lang="jsx">
        {`import { useBlock } from '@curi/react-dom';
        
useBlock(true, confirm);`}
      </CodeBlock>

      <HashSection tag="h3" meta={argsMeta}>
        <HashSection
          tag="h4"
          meta={{ title: "active", hash: "useBlock-active" }}
        >
          <p>Navigation is only blocked when active is true.</p>

          <CodeBlock lang="jsx">
            {`// will block navigation
useBlock(true, confirm);

// will not block navigation
useBlock(false, confirm);`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "fn", hash: "useBlock-fn" }}>
          <p>
            A function that will be called whenever there is navigation. The
            function is passed three arguments: <IJS>info</IJS>,{" "}
            <IJS>confirm</IJS>, and <IJS>prevent</IJS>.
          </p>

          <CodeBlock lang="jsx">
            {`useBlock(true, (info, success, failure) => {
  const response = window.confirm("Shall we?");
  if (response) {
    success();
  } else {
    failure();
  }
});`}
          </CodeBlock>

          <HashSection tag="h5" meta={{ title: "info", hash: "useBlock-info" }}>
            <p>
              <IJS>info</IJS> is an object which contains information about the
              navigation. The object has three properties:
            </p>

            <ul>
              <li>
                <IJS>to</IJS> - the navigation location
              </li>
              <li>
                <IJS>from</IJS> - the current location
              </li>
              <li>
                <IJS>action</IJS> - the type of navigation (push, replace, or
                pop).
              </li>
            </ul>
          </HashSection>

          <HashSection
            tag="h5"
            meta={{ title: "confirm", hash: "useBlock-confirm" }}
          >
            <p>
              A function that should be called when the user confirms that they
              want to navigate.
            </p>
          </HashSection>

          <HashSection
            tag="h5"
            meta={{ title: "prevent", hash: "useBlock-prevent" }}
          >
            <p>
              A function that should be called when the use wants to cancel the
              navigation.
            </p>
          </HashSection>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
