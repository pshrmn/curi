import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

let argumentsMeta = {
  title: "Arguments",
  hash: "useConfirm-arguments"
};
export let meta = {
  title: "useConfirm",
  hash: "useConfirm"
};

export function UseConfirmAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>useConfirm</IJS> hook adds and removes a navigation
        confirmation.
      </Paragraph>

      <CodeBlock lang="jsx">
        {`import { useConfirm } from '@curi/react-native';

useConfirm(confirmation);
// confirmation will be called when the user navigates

useConfirm();
// confirmation will not be called when the user navigates`}
      </CodeBlock>

      <HashSection tag="h3" meta={argumentsMeta}>
        <HashSection tag="h4" meta={{ title: "fn", hash: "useConfirm-fn" }}>
          <Paragraph>
            When passed a function, the function will be called when the user
            navigates and give them the option to confirm or prevent the
            navigation.
          </Paragraph>

          <Paragraph>
            When called with no argument, the existing navigation confirmation
            will be removed.
          </Paragraph>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
