import React from "react";
import { Link } from "@curi/react-dom";

import {
  PlainSection,
  HashSection,
  CodeBlock,
  Note,
  IJS
} from "../../components/guide/common";

const meta = {
  title: "Responses"
};

const propertiesMeta = {
  title: "The Properties of a Response Object",
  hash: "response-properties"
};

const bodyMeta = {
  title: "Response Body",
  hash: "response-body"
};

const redirectMeta = {
  title: "Redirect Response",
  hash: "redirect-properties"
};

const contents = [propertiesMeta, bodyMeta, redirectMeta];

function ResponsesGuide() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>{meta.title}</h1>

        <p>
          When Curi receives a location, it compares the location's{" "}
          <IJS>pathname</IJS> to each route's <IJS>path</IJS> to find which one
          matches best and uses that route to create a response object.
        </p>
      </PlainSection>

      <HashSection meta={propertiesMeta} tag="h2">
        <p>There are two types of response properties.</p>

        <p>
          The "match" properties are set based on the route that matches a
          location. A response always has these properties.
        </p>

        <CodeBlock>
          {`// match properties
{
  // The location object used to generate the response.
  location: { pathname: '/photos/6789/12345', ... },

  // The name of the best matching route
  name: 'Photo',

  // The name of ancestor routes that matched
  // part of the location's pathname
  partials: ['Album'],

  // An object containing the values parsed
  // from the pathname by path-to-regexp.
  // This includes params from ancestor routes.
  params: { photoID: 12345, albumID: 6789 },
}`}
        </CodeBlock>

        <p>
          The "settable" properties are ones that are added by a matched route's{" "}
          <IJS>respond</IJS> function. These only exist on the response when
          they are returned by a route's <IJS>respond</IJS> function.
        </p>
        <p>The "settable" properties are:</p>

        <HashSection tag="h3" meta={{ title: "body", hash: "settable-body" }}>
          <p>The component(s) that should be rendered for a route.</p>
        </HashSection>

        <HashSection tag="h3" meta={{ title: "meta", hash: "settable-meta" }}>
          <p>An object with metadata for a response.</p>
        </HashSection>

        <HashSection tag="h3" meta={{ title: "data", hash: "settable-data" }}>
          <p>
            A place to attach any data you want to the response, such as data
            loaded in the route's <IJS>resolve</IJS> function.
          </p>
        </HashSection>

        <HashSection
          tag="h3"
          meta={{ title: "redirect", hash: "settable-redirect" }}
        >
          <p>
            An object describing a route that Curi should automatically redirect
            to.
          </p>
        </HashSection>

        <CodeBlock>
          {`// settable properties (optional)
{
  body: Photo,
  // or maybe
  body: {
    menu: PhotoMenu,
    main: Photo
  },
  // Please see below for more information
  // about this property

  meta: {
    status: 200,
    title: 'Photo 12345'
  },

  data: {...},

  redirect: {...}
}`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={bodyMeta} tag="h2">
        <p>
          Curi isn't strict about how you use responses, but you will most
          likely always want to use a route's <IJS>respond</IJS> function to
          attach a <IJS>body</IJS> property to a response. The usual pattern is
          to use a route's <IJS>body</IJS> property to describe which
          component(s) to render when a route matches. This can either be a
          single component for basic layouts or an object with a number of
          components for{" "}
          <Link name="Example" params={{ slug: "multi-body" }}>
            advanced layouts
          </Link>
          .
        </p>
        <Note>
          <p>
            Each route should use the same <IJS>body</IJS> "shape". If one route
            returns a single component while another route return an object, you
            will be making rendering more complicated for yourself.
          </p>
        </Note>

        <CodeBlock>
          {`// do NOT do this
// mixing body shapes complicates rendering
const routes = prepareRoutes([
  {
    respond() {
      return { body: One }
    }
  },
  {
    respond() {
      return {
        body: {
          main: Main,
          menu: Menu
        }
      }
    }
  }
]);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={redirectMeta} tag="h2">
        <p>
          When a route's <IJS>respond</IJS> function returns an object with a{" "}
          <Link
            name="Package"
            params={{ package: "router", version: "v2" }}
            hash="response"
          >
            <IJS>redirect</IJS> property
          </Link>
          , the router will use it to generate a location object that Curi will
          automatically redirect to.
        </p>

        <CodeBlock>
          {`{
  // The redirect property provides information on
  // where you should redirect to
  redirect: { name: "Login" }
}`}
        </CodeBlock>

        <p>
          When creating a router, you can set the <IJS>invisibleRedirects</IJS>{" "}
          option to <IJS>true</IJS> and the response will not be sent to
          observers and one time functions. Instead, the response for the
          location that is redirected to will be the next emitted response. In
          either case, the router will automatically redirect to the route
          specified by <IJS>response.redirect</IJS>.
        </p>

        <CodeBlock>
          {`const router = createRouter(browser, routes, {
  invisibleRedirects: true
});`}
        </CodeBlock>

        <p>
          This property can also be used to specify an external redirect (a
          redirect to a location that is not within the application). This is
          done by setting an <IJS>externalURL</IJS> property on the{" "}
          <IJS>redirect</IJS> object. It is up to the application to redirect to
          the external location. Responses with an external redirect will be
          emitted when <IJS>invisibleRedirects</IJS> is <IJS>true</IJS>.
        </p>

        <CodeBlock>
          {`// a route with an external redirect
{
  respond() {
    return {
      redirect: {
        externalURL: "https://example.com"
      }
    };
  }
}

// a route observe can detect and automatically redirect
router.observe(({ response }) => {
  if (response.redirect && response.redirect.externalURL) {
    window.location.replace(response.redirect.externalURL);
  }
})`}
        </CodeBlock>
      </HashSection>
    </React.Fragment>
  );
}

export { ResponsesGuide as component, contents };
