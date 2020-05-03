import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS,
  Note
} from "../../../../../components/package/common";

export let meta = {
  title: "useNavigating",
  hash: "useNavigating"
};

export function UseNavigatingAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>useNavigating</IJS> hook is used to determine if the
        application is currently navigating. It pairs up with{" "}
        <IJS>router.cancel</IJS> to enable cancelling asynchronous navigation.
      </Paragraph>

      <Paragraph>
        This is only useful for asynchronous routes because with synchronous
        routes, navigation happens immediately.
      </Paragraph>

      <CodeBlock lang="jsx">
        {`import { useNavigating } from "@curi/react-dom";

function CancelNavigation() {
  let cancel = useNavigating();

  return cancel
    ? <button onClick={cancel}>Cancel</button>
    : null;
}`}
      </CodeBlock>

      <Note>
        <Paragraph>
          Ideally, browsers would natively handle asynchronous navigation and
          this would be unnecessary. For the time being, this is the next best
          solution.
        </Paragraph>
      </Note>
    </HashSection>
  );
}
