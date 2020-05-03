import React from "react";
import { Link } from "@curi/react-dom";

import {
  TitledPlainSection,
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../components/guide/common";

let meta = {
  title: "Route Interactions"
};

let callingMeta = {
  title: "Calling Interactions",
  hash: "calling"
};

let providedMeta = {
  title: "Provided Interactions",
  hash: "provided"
};

let routePropertiesMeta = {
  title: "Route Properties",
  hash: "route-properties"
};

let contents = [providedMeta, callingMeta, routePropertiesMeta];

function RouterInteractionsGuide() {
  return (
    <React.Fragment>
      <TitledPlainSection title={meta.title}>
        <Paragraph>
          Route interactions are used to interact with routes.
        </Paragraph>
      </TitledPlainSection>

      <HashSection meta={providedMeta} tag="h2">
        <Paragraph>
          The <IJS>@curi/interactions</IJS> package provides four interactions:{" "}
          <Link
            name="Package"
            params={{ package: "interactions", version: "v2" }}
            hash="pathname"
          >
            <IJS>pathname</IJS>
          </Link>
          ,{" "}
          <Link
            name="Package"
            params={{ package: "interactions", version: "v2" }}
            hash="active"
          >
            <IJS>active</IJS>
          </Link>
          ,{" "}
          <Link
            name="Package"
            params={{ package: "interactions", version: "v2" }}
            hash="ancestors"
          >
            <IJS>ancestors</IJS>
          </Link>
          , and{" "}
          <Link
            name="Package"
            params={{ package: "interactions", version: "v2" }}
            hash="prefetch"
          >
            <IJS>prefetch</IJS>
          </Link>
          .
        </Paragraph>
      </HashSection>

      <HashSection meta={callingMeta} tag="h2">
        <Paragraph>
          All interactions take a route's public data as its first argument. A
          route's public data can be accessed using the router's{" "}
          <IJS>route</IJS> method.
        </Paragraph>

        <Paragraph>
          Any additional arguments to a route interaction are up to the
          interaction. For example, the <IJS>pathname</IJS> interaction takes a
          params object as its second argument, which it uses to generate
          pathnames for routes that have params.
        </Paragraph>

        <Paragraph>
          Interactions are stateless, so they can be imported in whatever module
          needs to use them.
        </Paragraph>

        <CodeBlock>
          {`import { pathname } from "@curi/interactions";
let route = router.route("Home");
let path = pathname(route);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={routePropertiesMeta} tag="h2">
        <Paragraph>
          What are the route properties that an interaction can access? There
          are a number of "base" properties based on the provided route object
          and its related routes. Additionally, there is a <IJS>methods</IJS>{" "}
          group containing some methods for interacting with the route.
        </Paragraph>

        <HashSection
          tag="h3"
          meta={{ title: "Base Properties", hash: "base-properties" }}
        >
          <Paragraph>
            A route's meta properties provide information about the route.
          </Paragraph>

          <HashSection tag="h4" meta={{ title: "name", hash: "base-name" }}>
            <Paragraph>The route's name string.</Paragraph>
          </HashSection>

          <HashSection tag="h4" meta={{ title: "keys", hash: "base-keys" }}>
            <Paragraph>
              An array of the names of params for the route. This includes the
              names of params for any ancestor routes.
            </Paragraph>
          </HashSection>

          <HashSection tag="h4" meta={{ title: "parent", hash: "base-parent" }}>
            <Paragraph>
              The route's parent's public data. For root routes, this is
              undefined.
            </Paragraph>

            <Paragraph>
              The <IJS>ancestors</IJS> interaction uses the <IJS>parent</IJS>{" "}
              property to generate an array of a route's ancestors.
            </Paragraph>
          </HashSection>

          <HashSection
            tag="h4"
            meta={{ title: "children", hash: "base-children" }}
          >
            <Paragraph>
              An array containing the public route data for each of the route's
              children. In turn, each child's <IJS>meta.children</IJS> array
              contains public route data for its children.
            </Paragraph>

            <Paragraph>
              The <IJS>active</IJS> interaction walks through a routes tree of
              descendants when checking if a route is a partial match.
            </Paragraph>
          </HashSection>

          <HashSection tag="h4" meta={{ title: "extra", hash: "base-extra" }}>
            <Paragraph>
              A route's extra property is the optional object of whatever you
              want to attach to a route using its <IJS>extra</IJS> property.
            </Paragraph>
          </HashSection>
        </HashSection>

        <HashSection
          tag="h3"
          meta={{ title: "methods", hash: "methods-properties" }}
        >
          <Paragraph>
            A route's methods properties are functions for interacting with the
            route.
          </Paragraph>

          <HashSection
            tag="h4"
            meta={{ title: "pathname", hash: "methods-pathname" }}
          >
            <Paragraph>
              A function for generating a pathname string from the route.
            </Paragraph>

            <Paragraph>
              The <IJS>pathname</IJS> interaction uses this method.
            </Paragraph>
          </HashSection>

          <HashSection
            tag="h4"
            meta={{ title: "resolve", hash: "methods-resolve" }}
          >
            <Paragraph>
              The route's <IJS>resolve</IJS> function (if it exists). This will
              be <IJS>undefined</IJS> if the route is synchronous.
            </Paragraph>

            <Paragraph>
              The <IJS>prefetch</IJS> interaction uses this method.
            </Paragraph>
          </HashSection>

          <HashSection
            tag="h4"
            meta={{ title: "respond", hash: "methods-respond" }}
          >
            <Paragraph>
              The route's <IJS>respond</IJS> function (if it exists).
            </Paragraph>
          </HashSection>
        </HashSection>
      </HashSection>
    </React.Fragment>
  );
}

export { RouterInteractionsGuide as component, contents };
