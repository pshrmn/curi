import React from "react";
import { Link } from "@curi/react-dom";

import {
  PlainSection,
  HashSection,
  CodeBlock,
  Note,
  IJS,
  ScrollableTable
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

      <HashSection meta={propertiesMeta}>
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
          <IJS>response()</IJS> function. These only exist on the response when
          they are returned by a route's <IJS>response()</IJS> function.
        </p>
        <p>The "settable" properties are:</p>

        <ScrollableTable>
          <thead>
            <tr>
              <th>property</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>body</td>
              <td>The component(s) that should be rendered for a route.</td>
            </tr>
            <tr>
              <td>status</td>
              <td>An http status, mostly useful for server side rendering.</td>
            </tr>
            <tr>
              <td>data</td>
              <td>
                A place to attach any data you want to the response, such as
                data loaded in the route's <IJS>resolve</IJS> functions.
              </td>
            </tr>
            <tr>
              <td>title</td>
              <td>
                The response's title, which can be used with{" "}
                <Link
                  name="Package"
                  params={{ package: "side-effect-title", version: "v1" }}
                >
                  <IJS>@curi/side-effect-title</IJS>
                </Link>{" "}
                to set the browsers tab's title.
              </td>
            </tr>
            <tr>
              <td>error</td>
              <td>A convenient place to attach any errors to the response.</td>
            </tr>
            <tr>
              <td>redirectTo</td>
              <td>
                An object describing a route that Curi should automatically
                redirect to.
              </td>
            </tr>
          </tbody>
        </ScrollableTable>

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

  status: 200,

  data: {...},

  title: 'Photo 12345',

  error: undefined,

  redirectTo: {...}
}`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={bodyMeta}>
        <p>
          Curi isn't strict about how you use responses, but you will most
          likely always want to use a route's <IJS>response()</IJS> function to
          attach a <IJS>body</IJS> property to a response. The usual pattern is
          to use a route's <IJS>body</IJS> property to describe which
          component(s) to render when a route matches. This can either be a
          single component for basic layouts or an object with a number of
          components for{" "}
          <Link
            name="Example"
            params={{ category: "react", slug: "multi-body" }}
          >
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
    response() {
      return { body: One }
    }
  },
  {
    response() {
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

      <HashSection meta={redirectMeta}>
        <p>
          When a route's <IJS>response()</IJS> function returns an object with a{" "}
          <Link
            name="Package"
            params={{ package: "router", version: "v1" }}
            hash="response"
          >
            <IJS>redirectTo</IJS> property
          </Link>
          , the router will use it to generate a location object that Curi will
          automatically redirect to.
        </p>

        <CodeBlock>
          {`{
  // The redirectTo property provides information on
  // where you should redirect to
  redirectTo: { name: "Login" }
}`}
        </CodeBlock>

        <p>
          When creating a router, you can set the <IJS>emitRedirects</IJS>{" "}
          option to <IJS>false</IJS> and the response will not be sent to
          observers and one time functions. Redirect responses don't usually
          have anything to render, so setting this option is usually ideal.
        </p>

        <CodeBlock>
          {`const router = curi(history, routes, {
  emitRedirects: false
});`}
        </CodeBlock>
      </HashSection>
    </React.Fragment>
  );
}

export { ResponsesGuide as component, contents };
