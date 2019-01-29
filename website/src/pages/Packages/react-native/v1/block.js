import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp,
  ScrollableTable
} from "../../../../components/package/common";

export const meta = {
  title: "<Block>",
  hash: "Block",
  children: [
    {
      title: "Props",
      hash: "Block-props"
    }
  ]
};

export function BlockAPI() {
  return (
    <HashSection title={meta.title} id={meta.hash}>
      <p>
        The <Cmp>Block</Cmp> component lets you prevent navigation until a user
        has confirmed that they want to navigate. This can be useful when the
        user attempts to navigate away from a partially filled form.
      </p>

      <CodeBlock>{`import { Block } from '@curi/react-native';`}</CodeBlock>

      <HashSection tag="h3" title="Props" id="Block-props">
        <HashSection tag="h4" title="active" id="Block-active">
          <p>
            A boolean, which is <IJS>true</IJS> by default. When it is{" "}
            <IJS>true</IJS>, the navigation will be blocked. When it is{" "}
            <IJS>false</IJS>, navigation will not be blocked.
          </p>

          <CodeBlock lang="jsx">
            {`// will block navigation
<Block active={true} confirm={confirm} />

// will not block navigation
<Block active={false} confirm={confirm} />`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" title="confirm" id="Block-confirm">
          <p>
            The confirm prop is a function that will be called whenever there is
            navigation.
          </p>
          <ScrollableTable>
            <thead>
              <tr>
                <th>argument</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>location</td>
                <td>the location that is being navigated to</td>
              </tr>
              <tr>
                <td>action</td>
                <td>the type of navigation</td>
              </tr>
              <tr>
                <td>success</td>
                <td>a function to call when navigation should happen</td>
              </tr>
              <tr>
                <td>failure</td>
                <td>a function to call when navigation should be cancelled.</td>
              </tr>
            </tbody>
          </ScrollableTable>

          <CodeBlock lang="jsx">
            {`<Block
  confirm={({ location, action }, success, failure) => {
    const response = window.confirm("Shall we?");
    if (response) {
      success();
    } else {
      failure();
    }
  }}
/>`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
