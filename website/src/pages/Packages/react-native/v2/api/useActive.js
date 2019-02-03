import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp,
  Note
} from "../../../../../components/package/common";

const argsMeta = {
  title: "Arguments",
  hash: "useActive-args"
};
export const meta = {
  title: "useActive()",
  hash: "useActive",
  children: [argsMeta]
};

export function UseActiveAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>useActive</IJS> hook determines if a route is active by
        comparing a route name (and possibly params) to a <IJS>response</IJS>{" "}
        object.
      </p>

      <CodeBlock lang="jsx">
        {`import { useActive, Link } from '@curi/react-native';

function ActiveLink({
  name,
  params,
  partial,
  children
}) {
  const active = useActive({ name, params, partial });
  return (
    <Link
      name={name}
      params={params}
      forward={{ className: active ? "active" : "" }}
    >
      {children}
    </Link>
  );
}

<ActiveLink name="Home">Home</ActiveLink>`}
      </CodeBlock>

      <Note>
        <p>
          <IJS>useActive</IJS> relies on the active route interaction from{" "}
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

      <HashSection tag="h3" meta={argsMeta}>
        <HashSection
          tag="h4"
          meta={{ title: "Route Options", hash: "useActive-opts" }}
        >
          <p>
            The first argument is an options object to describe which route to
            match.
          </p>

          <HashSection
            tag="h5"
            meta={{ title: "name", hash: "useActive-name" }}
          >
            <p>The name of the route to compare against the response object.</p>
          </HashSection>

          <HashSection
            tag="h5"
            meta={{ title: "params", hash: "useActive-params" }}
          >
            <p>
              An object containing route parameters. These will be compared
              against the route params of the response object.
            </p>
          </HashSection>

          <HashSection
            tag="h5"
            meta={{ title: "partial", hash: "useActive-partial" }}
          >
            <p>
              Allows ancestor routes to be considered active when true. Defaults
              to false.
            </p>

            <CodeBlock lang="jsx">
              {`// response = { name: "User Album", params: { id: "abcde" }}
// where "User Album" is a child route of "User"

useActive({ name: "User" }); // false
useActive({ name: "User", partial: true }); // true`}
            </CodeBlock>
          </HashSection>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "responseCheck", hash: "useActve-responseCheck" }}
        >
          <p>
            The response check argument is a function that will be given the
            current response and returns a boolean, true if it is active and
            false otherwise.
          </p>

          <p>
            The base active check verifies that the provided route information
            matches the pathname segment of the current response's location. If
            you want to perform more specific verification, such as matching a
            query, you cando so with the response check function.
          </p>

          <CodeBlock lang="jsx">
            {`useActive(
  { name: "Results" },
  response => response.location.query === "page=3"
);

// active for /results?page=3
// not active for /results?page=1`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
