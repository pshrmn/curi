import React from "react";

import {
  HashSection,
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
      <p>
        The <IJS>useNavigating</IJS> hook is used to determine if the
        application is currently navigating. It pairs up with{" "}
        <IJS>router.cancel</IJS> to enable cancelling asynchronous navigation.
      </p>

      <p>
        This is only useful for asynchronous routes because with synchronous
        routes, navigation happens immediately.
      </p>

      <CodeBlock lang="jsx">
        {`import { useNavigating } from "@curi/react-native";

function CancelNavigation() {
  let cancel = useNavigating();

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
