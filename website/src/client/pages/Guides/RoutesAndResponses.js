import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
import { Note, Warning } from "../../components/Messages";
import { Section, Subsection } from "../../components/Sections";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>
    <SideBySide>
      <Explanation>
        <p>
          Routes describe the valid locations within an application. Responses
          provide data about the route that matches the current location.
        </p>
      </Explanation>
    </SideBySide>
    <Section title="Responses" id="responses">
      <SideBySide>
        <Explanation>
          <p>
            When Curi receives a location, it compares the location's{" "}
            <IJS>pathname</IJS> to each route's <IJS>path</IJS> to find which
            one matches best and uses that route to create a response object.
          </p>
        </Explanation>
      </SideBySide>
      <Subsection
        title="The Properties of a Response Object"
        id="response-properties"
      >
        <SideBySide>
          <Explanation>
            <p>There are two types of response properties.</p>
          </Explanation>
        </SideBySide>
        <SideBySide>
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
        </SideBySide>
        <SideBySide>
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
                    data loaded in the route's <IJS>match</IJS> functions.
                  </td>
                </tr>
                <tr>
                  <td>title</td>
                  <td>
                    The response's title, which can be used with{" "}
                    <Link
                      to="Package"
                      params={{ package: "side-effect-title" }}
                    >
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
        </SideBySide>
      </Subsection>
      <Subsection title="Response Body" id="response-body">
        <SideBySide>
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
              Each route should use the same <IJS>body</IJS> "shape". If one
              route returns a single component while another route return an
              object, you will be making rendering more complicated for
              yourself.
            </Note>
          </Explanation>
          <CodeBlock>
            {`// do NOT do this
// mixing body shapes complicates rendering
const routes = [
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
];`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
      <Subsection title="Redirect Response" id="redirect-properties">
        <SideBySide>
          <Explanation>
            <p>
              When a route's <IJS>response()</IJS> function returns an object
              with a{" "}
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
        </SideBySide>
        <SideBySide>
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
        </SideBySide>
      </Subsection>
    </Section>

    <Section title="Routes" id="routes">
      <SideBySide>
        <Explanation>
          <p>
            Routes are JavaScript objects with two required properties—<IJS>
              name
            </IJS>{" "}
            and <IJS>path</IJS>—and a number of optional properties.
          </p>
          <p>
            A route's <IJS>path</IJS> is used to determine if a route matches a
            location. Path strings use{" "}
            <a href="https://github.com/pillarjs/path-to-regexp">
              <IJS>path-to-regexp</IJS>
            </a>{" "}
            formatting, which allows you to define dynamic path parameters that
            a route should match.
          </p>
          <p>
            A route's <IJS>name</IJS> is a unique identifier for a route. The{" "}
            <IJS>name</IJS> is used to{" "}
            <Link to="Guide" params={{ slug: "route-interactions" }}>
              interact
            </Link>{" "}
            with a specific route.
          </p>
        </Explanation>
        <CodeBlock>
          {`const routes = [
  {
    name: "Home",
    path: ""
  },
  {
    name: "Album",
    // the "id" segment can be any value
    path: "a/:id"
  }
];`}
        </CodeBlock>
      </SideBySide>
      <Subsection title="Match" id="match">
        <SideBySide>
          <Explanation>
            <p>
              When a route matches, you might want to perform some actions
              before the application re-renders. This can include validating
              that a user is authorized to navigate to a route and loading data
              based on the path parameters parsed from the location.
            </p>
            <p>
              A route's <IJS>match</IJS> property is an optional object for
              attaching functions to a route. A response will not be emitted
              until after all of a route's <IJS>match</IJS> functions have
              finished.
            </p>
            <p>
              A route with <IJS>match</IJS> properties is asynchronous, which
              has effects to be aware of. You can read about these in the{" "}
              <Link to="Guide" params={{ slug: "sync-or-async" }}>
                Sync or Async
              </Link>{" "}
              guide.
            </p>
            <p>
              Curi uses Promises to manage a route's <IJS>match</IJS> functions.
              Each function should return a Promise. This makes it easy to wait
              for all of the <IJS>match</IJS> functions to complete before
              emitting the response for a matched route.
            </p>
            <Note>
              <IJS>Promise.resolve()</IJS> can be used to return a Promise.
            </Note>
            <p>
              When <IJS>match</IJS> functions are called, they will be passed an
              object with the "match" properties of a response. These are the
              matched route's <IJS>name</IJS>, the <IJS>location</IJS>, an
              object of parsed <IJS>params</IJS>, and an array of the names of{" "}
              <IJS>partial</IJS> route matches.
            </p>
          </Explanation>
          <CodeBlock>
            {`{
  name: "User",
  path: "u/:id",
  match: {
    authorized: () => {
      // run code to verify the user can view the page
      return Promise.resolve(true);
    },
    body: () => {
      // import the User component using the import() API
      return import("./components/User");
    },
    data: ({ name, location, params, partials }) => {
      // get specific data using the route's params
      return UserAPI.get(params.id);
    }
  }
}`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
      <Subsection title="The Response Function" id="route-response">
        <SideBySide>
          <Explanation>
            <p>
              Each route can have a <IJS>response()</IJS> function. The role of
              the <IJS>response()</IJS> function is to return an object of
              properties to merge onto the response object that will be emitted
              for the new location.
            </p>
            <p>
              Only valid response properties will be merged onto the response.
              These are the optional response properties listed above (<IJS>
                body
              </IJS>, <IJS>title</IJS>, <IJS>status</IJS>, <IJS>data</IJS>,{" "}
              <IJS>redirectTo</IJS>, and <IJS>error</IJS>).
            </p>
            <p>
              The function receives an object with a number of properties you
              might find useful.
            </p>
            <p>
              The first is an object of <IJS>match</IJS> properties (the base
              response properties).
            </p>
            <p>
              The second is a <IJS>resolved</IJS> object, which contains the
              resolved values from the route's <IJS>match</IJS> functions.
            </p>
            <p>
              The third property is an <IJS>error</IJS>, which is only defined
              if one of the <IJS>match</IJS> functions throws an error and you
              don't catch it.
            </p>
          </Explanation>
          <CodeBlock>
            {`import User from "./components/User";

const routes = [
  {
    name: "User",
    path: "u/:id",
    match: {
      data: ({ params }) => UserAPI.get(params.id)
    },
    response({ match, resolved, error }) {
      if (error) {
        // ...
      }
      return {
        body: User,
        data: resolved.data,
        title: \`User \${match.params.id}\`
      };
    }
  }
];`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
      <Section title="Matching Routes" id="matching-routes">
        <SideBySide>
          <Explanation>
            <p>
              Whenever Curi receives a new location, it will determine which
              route has a <IJS>path</IJS> that matches the new location's{" "}
              <IJS>pathname</IJS> by walking over the route objects in the order
              that they are defined in the array. If a route has{" "}
              <IJS>children</IJS>, those will be checked before moving to the
              route's nest sibling.
            </p>
            <p>
              We'll use this simple route setup to demonstrate how this works.
            </p>
          </Explanation>
          <CodeBlock>
            {`const routes = [
  {
    name: 'Home',
    path: '',
  },
  {
    name: 'Album',
    path: 'a/:album'
  },
  {
    name: 'Not Found',
    path: '(.*)' // this matches EVERY pathname
  }
];`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              Curi's default matching behavior looks for exact matches. This
              means that when the route only matches part of the pathname, it
              does not count as a match. If the user navigates to a location
              with the pathname <IJS>"/a/red/yellow"</IJS>, the <IJS>Album</IJS>{" "}
              route will only partially match, so Curi will move on to the next
              route, <IJS>Not Found</IJS>, which has a catch all <IJS>path</IJS>{" "}
              that matches every pathname. Routes can be configured to allow
              partial matching, but exact matching is usually preferable.
            </p>
            <p>
              If a route has children, Curi will check if any of those routes
              form a complete match before moving on to the next route in the
              routes array.
            </p>
          </Explanation>
          <CodeBlock>
            {`// when the pathname is '/a/Coloring+Book/All+Night',
// the Album route will partially match the pathname.
// Then, its child route Song will be tested and fully
// match the pathname.
{
  name: 'Album',
  path: 'a/:album',
  children: [
    {
      name: 'Song',
      path: ':title'
    }
  ]
}`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              You can control whether a route does exact or partial matching
              with{" "}
              <Link hash="pathOptions">
                <IJS>pathOptions</IJS>
              </Link>{" "}
              property. If you set <IJS>{`{ end: false }`}</IJS>, a route that
              partially matches will consider itself matched.
            </p>
          </Explanation>
          <CodeBlock>
            {`// when the pathname is
// '/a/Good+Kid,+M.A.A.D+City/Poetic+Justice',
// the Album route will partially match, but because
// it sets "end" to false, the partial match will still be used.
{
  name: 'Album',
  path: 'a/:albumID',
  pathOptions: {
    end: false
  }
}`}
          </CodeBlock>
        </SideBySide>
        <Subsection title="No Matching Route" id="catch-all">
          <Warning>
            <SideBySide>
              <Explanation>
                <p>
                  If none of your routes match a location, Curi will do nothing!
                  You need to set a catch-all route to match these locations
                  yourself. The best way to do this is to add a route to the end
                  of your routes array with a <IJS>path</IJS> of{" "}
                  <IJS>"(.*)"</IJS>, which will match every pathname.
                </p>
              </Explanation>
              <CodeBlock>
                {`{
  name: 'Not Found',
  path: '(.*)',
}`}
              </CodeBlock>
            </SideBySide>
          </Warning>
        </Subsection>
      </Section>
    </Section>
  </BaseGuide>
);
