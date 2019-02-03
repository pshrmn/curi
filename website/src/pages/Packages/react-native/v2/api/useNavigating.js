import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note
} from "../../../../../components/package/common";

export const meta = {
  title: "useNavigating()",
  hash: "useNavigating"
};

export function UseNavigatingAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>useNavigating</IJS> hook is used to determine if the
        application is currently navigating. When the application is navigating,
        it returns a function to cancel the navigation.
      </p>

      <p>
        This is only useful for asynchronous routes because with synchronous
        routes, navigation happens immediately.
      </p>

      <CodeBlock lang="jsx">
        {`import { useNavigating } from "@curi/react-dom";

function CancelNavigation() {
  const cancel = useNavigating();

  return cancel
    ? <button onClick={cancel}>Cancel</button>
    : null;
}`}
      </CodeBlock>

      <Note>
        <p>
          Ideally, browsers would natively handle asynchronous navigation and
          this would be unnecessary. For the time being, this is the next best
          solution.
        </p>
      </Note>
    </HashSection>
  );
}
