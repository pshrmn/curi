import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp,
  Note
} from "../../../../../components/package/common";

export const meta = {
  title: "<Active>",
  hash: "Active",
  children: [
    {
      title: "Props",
      hash: "Active-props"
    }
  ]
};

export function ActiveAPI() {
  return (
    <HashSection title={meta.title} id={meta.hash}>
      <p>
        The <Cmp>Active</Cmp> component is used to render based on whether or
        not a route is "active" (its name and params match the current
        response's name and params) using a render-invoked <IJS>children</IJS>{" "}
        function.
      </p>

      <CodeBlock lang="jsx">
        {`import { Active } from '@curi/react-native';

function ActiveLink({
  name,
  params,
  partial,
  forward,
  ...rest
}) {
  return (
    <Active name={name} params={params} partial={partial}>
      {active => (
        <Link
          name={name}
          params={params}
          {...rest}
          forward={{
            ...forward,
            style: [...forward.style, activeStyle]
          }}
        />
      )}
    </Active>
  );
}

<ActiveLink name="Home">Home</ActiveLink>`}
      </CodeBlock>

      <Note>
        <p>
          This relies on the active route interaction from{" "}
          <Link
            name="Package"
            params={{ package: "route-active", version: "v1" }}
          >
            @curi/route-active
          </Link>{" "}
          being added to your router.
        </p>

        <CodeBlock>
          {`import active from '@curi/route-active';

const router = curi(history, routes, {
  route: [active()]
});`}
        </CodeBlock>
      </Note>

      <HashSection tag="h3" title="Props" id="Active-props">
        <HashSection tag="h4" title="name" id="Active-name">
          <p>The name of the route to compare against the response object.</p>
        </HashSection>

        <HashSection tag="h4" title="params" id="Active-params">
          <p>
            An object containing route parameters. These will be compared
            against the route params of the response object.
          </p>
        </HashSection>

        <HashSection tag="h4" title="children" id="Active-children">
          <p>
            A render-invoked function whose first argument is whether the route
            (determined using the <IJS>name</IJS> and <IJS>params</IJS>) is
            active.
          </p>

          <CodeBlock lang="jsx">
            {`// response = { name: "Photo", params: { id: "abcde" }}

<Active name="Photo" params={{ id: "abcde" }}>
  {active => ( // if active === true
    <Photo className={active ? "active" : "inactive"} />
  )}
</Active>
// <Photo className="active" />

<Active name="Photo" params={{ id: "qwerty" }}>
  {active => ( // if active === false
    <Photo className={active ? "active" : "inactive"} />
  )}
</Active>
// <Photo className="inactive" />`}
          </CodeBlock>

          <p>
            The second argument passed to the render-invoked function is the
            current <IJS>response</IJS>. <Cmp>Active</Cmp> only checks if the
            route is active (i.e. matches the current location's{" "}
            <IJS>pathname</IJS>). If you want to check if the <IJS>query</IJS>{" "}
            or <IJS>hash</IJS>, you should do this yourself inside of the
            render-invoked function. You can compare the <IJS>query</IJS>/
            <IJS>hash</IJS> against the response's <IJS>location</IJS>.
          </p>

          <CodeBlock lang="jsx">
            {`<Active name="Home">
  {(active, response) => {
    const activeHash = response.hash === "ahoy"
    // ...
  }}
</Active>`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" title="partial" id="Active-partial">
          <p>
            When <IJS>true</IJS>, <IJS>partial</IJS> allows ancestor routes to
            be considered active. Defaults to <IJS>false</IJS>.
          </p>

          <CodeBlock lang="jsx">
            {`// response = { name: "Photo", params: { id: "abcde" }}
// where "Photo" is a child route of "Album"

<Active name="Album">
  {active => ( // if active === false
    <Album className={active ? "active" : "inactive"} />
  )}
</Active>
// <Album className="inactive" />

<Active name="Album" partial={true}>
  {active => ( // if active === true
    <Album className={active ? "active" : "inactive"} />
  )}
</Active>
// <Album className="active" />`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
