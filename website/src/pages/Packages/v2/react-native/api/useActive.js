import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

let optsMeta = {
  title: "Options",
  hash: "useActive-opts"
};
export let meta = {
  title: "useActive",
  hash: "useActive"
};

export function UseActiveAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>useActive</IJS> hook determines if a route is active by
        comparing a route name (and possibly params) to a <IJS>response</IJS>{" "}
        object.
      </Paragraph>

      <CodeBlock lang="jsx">
        {`import { useActive, Link } from '@curi/react-native';

function ActiveLink({
  name,
  params,
  partial,
  children
}) {
  let active = useActive({ name, params, partial });
  return (
    <Link
      name={name}
      params={params}
      className={active ? "active" : "" }
    >
      {children}
    </Link>
  );
}

<ActiveLink name="Home">Home</ActiveLink>`}
      </CodeBlock>

      <HashSection tag="h3" meta={optsMeta}>
        <Paragraph>
          <IJS>useActive</IJS> takes a single argument, an options object.
        </Paragraph>

        <HashSection tag="h4" meta={{ title: "name", hash: "useActive-name" }}>
          <Paragraph>
            The name of the route to compare against the response object.
          </Paragraph>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "params", hash: "useActive-params" }}
        >
          <Paragraph>
            An object containing route parameters. These will be compared
            against the route params of the response object.
          </Paragraph>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "partial", hash: "useActive-partial" }}
        >
          <Paragraph>
            Allows ancestor routes to be considered active when true. Defaults
            to false.
          </Paragraph>

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
        meta={{ title: "components", hash: "useActive-components" }}
      >
        <Paragraph>
          The base active check only checks that the route (i.e. pathname) is
          active. <IJS>components</IJS> allows you to check if other components
          of the location are also active.
        </Paragraph>

        <CodeBlock lang="jsx">
          {`useActive({
  name: "Results",
  components: loc => loc.query === "page=3"
});

// active for /results?page=3
// not active for /results?page=1`}
        </CodeBlock>
      </HashSection>
    </HashSection>
  );
}
