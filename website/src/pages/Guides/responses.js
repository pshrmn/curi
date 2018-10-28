import React from "react";
import { Link } from "@curi/react-dom";

import { InlineJS as IJS } from "../../components/highlight/Inline";
import { Note, Warning } from "../../components/Messages";
import { Section } from "../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

const meta = {
  title: "Responses"
};

export default function RoutesAndResponsesGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Explanation>
        <p>
          When Curi receives a location, it compares the location's{" "}
          <IJS>pathname</IJS> to each route's <IJS>path</IJS> to find which one
          matches best and uses that route to create a response object.
        </p>
      </Explanation>

      <Section
        title="The Properties of a Response Object"
        id="response-properties"
      >
        <Explanation>
          <p>There are two types of response properties.</p>
        </Explanation>

        <Explanation>
          <p>
            The "match" properties are set based on the route that matches a
            location. A response always has these properties.
          </p>
        </Explanation>
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

        <Explanation>
          <p>
            The "settable" properties are ones that are added by a matched
            route's <IJS>response()</IJS> function. These only exist on the
            response when they are returned by a route's <IJS>response()</IJS>{" "}
            function.
          </p>
          <p>The "settable" properties are:</p>
          <table>
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
                <td>
                  An http status, mostly useful for server side rendering.
                </td>
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
                  <Link to="Package" params={{ package: "side-effect-title" }}>
                    <IJS>@curi/side-effect-title</IJS>
                  </Link>{" "}
                  to set the browsers tab's title.
                </td>
              </tr>
              <tr>
                <td>error</td>
                <td>
                  A convenient place to attach any errors to the response.
                </td>
              </tr>
              <tr>
                <td>redirectTo</td>
                <td>
                  An object describing a route that Curi should automatically
                  redirect to.
                </td>
              </tr>
            </tbody>
          </table>
        </Explanation>
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
      </Section>

      <Section title="Response Body" id="response-body">
        <Explanation>
          <p>
            Curi isn't strict about how you use responses, but you will most
            likely always want to use a route's <IJS>response()</IJS> function
            to attach a <IJS>body</IJS> property to a response. The usual
            pattern is to use a route's <IJS>body</IJS> property to describe
            which component(s) to render when a route matches. This can either
            be a single component for basic layouts or an object with a number
            of components for{" "}
            <Link
              to="Example"
              params={{ category: "react", slug: "multi-body" }}
            >
              advanced layouts
            </Link>.
          </p>
          <Note>
            Each route should use the same <IJS>body</IJS> "shape". If one route
            returns a single component while another route return an object, you
            will be making rendering more complicated for yourself.
          </Note>
        </Explanation>
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
      </Section>

      <Section title="Redirect Response" id="redirect-properties">
        <Explanation>
          <p>
            When a route's <IJS>response()</IJS> function returns an object with
            a{" "}
            <Link to="Package" params={{ package: "router" }} hash="response">
              <IJS>redirectTo</IJS> property
            </Link>, the router will use it to generate a location object that
            Curi will automatically redirect to.
          </p>
        </Explanation>
        <CodeBlock>
          {`{
  // The redirectTo property provides information on
  // where you should redirect to
  redirectTo: { pathname: '/login' }
}`}
        </CodeBlock>

        <Explanation>
          <p>
            You can choose whether or not you want responses with a{" "}
            <IJS>redirectTo</IJS> property to be emitted. If they are not
            emitted, then the router will redirect without the application's
            observers knowing about the redirect. The default behavior is to
            emit redirects, but this also means that you have to render using
            the redirect response. The <IJS>{`{ emitRedirects: false }`}</IJS>{" "}
            option prevents this.
          </p>
        </Explanation>
        <CodeBlock>
          {`const router = curi(history, routes, {
  emitRedirects: false
});`}
        </CodeBlock>
      </Section>
    </React.Fragment>
  );
}
