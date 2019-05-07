import React from "react";
import { Link } from "@curi/react-dom";

import {
  PlainSection,
  HashSection,
  CodeBlock,
  IJS
} from "../../components/guide/common";

const meta = {
  title: "Route Interactions"
};

const callingMeta = {
  title: "Calling Interactions",
  hash: "calling"
};

const providedMeta = {
  title: "Provided Interactions",
  hash: "provided"
};

const routePropertiesMeta = {
  title: "Route Properties",
  hash: "route-properties"
};

const contents = [providedMeta, callingMeta, routePropertiesMeta];

function RouterInteractionsGuide() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>{meta.title}</h1>

        <p>Route interactions are used to interact with routes.</p>
      </PlainSection>

      <HashSection meta={providedMeta}>
        <p>
          The <IJS>@curi/router</IJS> package provides four built-in
          interactions:{" "}
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
        </p>
      </HashSection>

      <HashSection meta={callingMeta}>
        <p>
          All interactions take a route's public data as its first argument. A
          route's public data can be accessed using the router's{" "}
          <IJS>route</IJS> method.
        </p>

        <p>
          Any additional arguments to a route interaction are up to the
          interaction. For example, the <IJS>pathname</IJS> interaction takes a
          params object as its second argument, which it uses to generate
          pathnames for routes that have params.
        </p>

        <p>
          Interactions are stateless, so they can be imported in whatever module
          needs to use them.
        </p>

        <CodeBlock>
          {`import { pathname } from "@curi/router";
const route = router.route("Home");
const path = pathname(route);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={routePropertiesMeta}>
        <p>
          What are the route properties that an interaction can access? The
          properties are split into three groups: <IJS>meta</IJS>,{" "}
          <IJS>methods</IJS>, and <IJS>extra</IJS>.
        </p>

        <HashSection tag="h3" meta={{ title: "meta", hash: "meta-properties" }}>
          <p>A route's meta properties provide information about the route.</p>

          <HashSection tag="h4" meta={{ title: "name", hash: "meta-name" }}>
            <p>The route's name string.</p>
          </HashSection>

          <HashSection tag="h4" meta={{ title: "keys", hash: "meta-keys" }}>
            <p>
              An array of the names of params for the route. This includes the
              names of params for any ancestor routes.
            </p>
          </HashSection>

          <HashSection tag="h4" meta={{ title: "parent", hash: "meta-parent" }}>
            <p>
              The route's parent's public data. For root routes, this is
              undefined.
            </p>

            <p>
              The <IJS>ancestors</IJS> interaction uses the <IJS>parent</IJS>{" "}
              property to generate an array of a route's ancestors.
            </p>
          </HashSection>

          <HashSection
            tag="h4"
            meta={{ title: "children", hash: "meta-children" }}
          >
            <p>
              An array containing the public route data for each of the route's
              children. In turn, each child's <IJS>meta.children</IJS> array
              contains public route data for its children.
            </p>

            <p>
              The <IJS>active</IJS> interaction walks through a routes tree of
              descendants when checking if a route is a partial match.
            </p>
          </HashSection>
        </HashSection>

        <HashSection
          tag="h3"
          meta={{ title: "methods", hash: "methods-properties" }}
        >
          <p>
            A route's methods properties are functions for interacting with the
            route.
          </p>

          <HashSection
            tag="h4"
            meta={{ title: "pathname", hash: "methods-pathname" }}
          >
            <p>A function for generating a pathname string from the route.</p>

            <p>
              The <IJS>pathname</IJS> interaction uses this method.
            </p>
          </HashSection>

          <HashSection
            tag="h4"
            meta={{ title: "resolve", hash: "methods-resolve" }}
          >
            <p>
              The route's <IJS>resolve</IJS> function (if it exists). This will
              be <IJS>undefined</IJS> if the route is synchronous.
            </p>

            <p>
              The <IJS>prefetch</IJS> interaction uses this method.
            </p>
          </HashSection>

          <HashSection
            tag="h4"
            meta={{ title: "respond", hash: "methods-respond" }}
          >
            <p>
              The route's <IJS>respond</IJS> function (if it exists).
            </p>
          </HashSection>
        </HashSection>

        <HashSection
          tag="h3"
          meta={{ title: "extra", hash: "extra-properties" }}
        >
          <p>
            A route's extra property is the optional object of whatever you want
            to attach to a route using its <IJS>extra</IJS> property.
          </p>
        </HashSection>
      </HashSection>
    </React.Fragment>
  );
}

export { RouterInteractionsGuide as component, contents };
