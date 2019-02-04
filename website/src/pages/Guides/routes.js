import React from "react";
import { Link } from "@curi/react-dom";

import {
  PlainSection,
  HashSection,
  CodeBlock,
  Note,
  Warning,
  IJS
} from "../../components/guide/common";

const meta = {
  title: "Routes"
};

const pathMeta = {
  title: "Route path",
  hash: "route-path"
};
const namesMeta = {
  title: "Route names",
  hash: "route-names"
};
const asyncMeta = {
  title: "Asynchronous Routes",
  hash: "async"
};
const responseMeta = {
  title: "The Response Function",
  hash: "route-response"
};
const propertiesMeta = {
  title: "Route Properties",
  hash: "properties",
  children: [pathMeta, namesMeta, asyncMeta, , responseMeta]
};

const prepareMeta = {
  title: "Preparing Routes",
  hash: "prepareRoutes"
};

const noMatchMeta = {
  title: "No Matching Route",
  hash: "no-match"
};
const walkthroughMeta = {
  title: "Route Matching Walkthrough",
  hash: "match-walkthrough"
};
const optionsMeta = {
  title: "Path Matching Options",
  hash: "options"
};
const matchingMeta = {
  title: "Matching Routes",
  hash: "matching-routes",
  children: [noMatchMeta, walkthroughMeta]
};

const contents = [propertiesMeta, matchingMeta, prepareMeta];

function RoutesGuide() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>{meta.title}</h1>

        <p>
          Routes are JavaScript objects that describe valid locations within an
          application.
        </p>
      </PlainSection>

      <HashSection meta={propertiesMeta}>
        <p>
          Routes have two required properties—
          <IJS>name</IJS> and <IJS>path</IJS>—and a number of{" "}
          <Link
            name="Package"
            params={{ package: "router" }}
            hash="route-objects"
          >
            optional properties
          </Link>
          .
        </p>

        <HashSection meta={pathMeta} tag="h3">
          <p>
            A route's <IJS>path</IJS> is used to determine if a route matches a
            location. Path strings use{" "}
            <a href="https://github.com/pillarjs/path-to-regexp">
              <IJS>path-to-regexp</IJS>
            </a>{" "}
            formatting, which allows you to define dynamic path parameters that
            a route should match.
          </p>

          <CodeBlock>
            {`const routes = prepareRoutes([
  {
    path: "" // matches the root "/"
  },
  {
    // the "id" segment can be any value
    path: "a/:id"
  }
]);`}
          </CodeBlock>
        </HashSection>

        <HashSection meta={namesMeta} tag="h3">
          <p>
            A route's <IJS>name</IJS> is a unique identifier for a route.
          </p>

          <CodeBlock>
            {`const routes = prepareRoutes([
  {
    name: "Home",
    path: ""
  },
  {
    name: "Album",
    // the "id" segment can be any value
    path: "a/:id"
  }
]);`}
          </CodeBlock>

          <p>
            Curi lets you{" "}
            <Link name="Guide" params={{ slug: "route-interactions" }}>
              interact
            </Link>{" "}
            with routes using their names. For example, Curi provides a{" "}
            <IJS>pathname</IJS> route interaction to generate the pathname of a
            URL. Instead of manually writing pathname strings, you give the{" "}
            <IJS>pathname</IJS> interaction a route's name and it will create
            the pathname string for you. This is particularly useful for routes
            with path params, since the <IJS>pathname</IJS> interaction will
            automatically insert these for you.
          </p>

          <CodeBlock>
            {`const pathname = router.route.pathname(
  "Album", { id: "abcd" }
);
// pathname = "/a/abcd"`}
          </CodeBlock>
        </HashSection>

        <HashSection meta={asyncMeta} tag="h3">
          <p>
            When a route matches, you might want to perform some actions before
            the application re-renders. This can include validating that a user
            is authorized to navigate to a route and loading data based on the
            path parameters parsed from the location.
          </p>
          <p>
            A route's <IJS>resolve</IJS> property is a function that runs
            asynchronous actions and returns a Promise. A response will not be
            emitted until after a route's <IJS>resolve</IJS> function has
            resolved.
          </p>

          <CodeBlock>
            {`{
  name: "User",
  path: "u/:id",
  resolve({ params }) {
    // run code to verify the user can view the page
    const authorized = Promise.resolve(true);

    // import the User component using the import() API
    const body = import("./components/User");
    
    // get specific data using the route's params
    const data = UserAPI.get(params.id);
    return Promise.all([ authorized, body, data ]);
  }
}`}
          </CodeBlock>

          <p>
            A route with <IJS>resolve</IJS> properties is asynchronous, which
            has some effects to be aware of. You can read about these in the{" "}
            <Link name="Guide" params={{ slug: "sync-or-async" }}>
              Sync or Async
            </Link>{" "}
            guide.
          </p>
        </HashSection>

        <HashSection meta={responseMeta} tag="h3">
          <p>
            Each route can have a <IJS>response</IJS> function. When a route
            matches, a response object with "match" properties is generated. An
            object returned by the <IJS>response</IJS> function gets merged with
            the match response object*. The{" "}
            <Link name="Guide" params={{ slug: "responses" }}>
              responses guide
            </Link>{" "}
            covers all of the response properties.
          </p>

          <p>
            <em>* Only valid properties are merged.</em>
          </p>

          <p>
            The <IJS>response</IJS> function receives an object with a number of
            properties.
          </p>

          <ol>
            <li>
              <IJS>match</IJS> is an object of properties based on the matched
              route.
            </li>
            <li>
              <IJS>resolved</IJS> is an object with the results of the route's{" "}
              <IJS>resolve</IJS> functions.
            </li>
            <li>
              <IJS>error</IJS> is only defined when the <IJS>resolve</IJS>{" "}
              function has an uncaught error.
            </li>
          </ol>

          <CodeBlock>
            {`import User from "./components/User";

const routes = prepareRoutes([
  {
    name: "User",
    path: "u/:id",
    resolve({ params }) {
      return UserAPI.get(params.id);
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
]);`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={matchingMeta}>
        <p>
          When you create a router, you pass an array of all of the valid routes
          for the application. Whenever Curi receives a new location, it matches
          the new location's <IJS>pathname</IJS> against the valid routes to
          determine which one matches.
        </p>

        <p>
          Route matching tests the route objects in the order that they are
          defined in the array. If a route partially matches (i.e. it matches
          the beginning of the pathname, but there are leftover unmatched
          segments of the pathname), and it has <IJS>children</IJS> routes,
          those will be checked before moving to the route's next sibling.
        </p>

        <CodeBlock lang="js">
          {`const routes = prepareRoutes([
  { name: "One", path: "one" },
  { name: "Two", path: "two", children: [
    { name: "And a half", path: "point-five" },
    // matches /two/point-five
  ]},
  { name: "Three", path: "three" },
]);

// route match order:
// 1. One
// 2. Two
// 3. And a half (only if Two partially matches)
// 4. Three
`}
        </CodeBlock>

        <HashSection meta={noMatchMeta} tag="h3">
          <p>
            If none of your routes match a location, Curi will do nothing! Your
            routes should include a "catch all" route to match these locations.
            The path <IJS>"(.*)"</IJS> matches every pathname, so using that as
            the path of the last route will catch every location.
          </p>

          <Warning>
            <p>
              The catch all path should be used on the last route, otherwise it
              will match locations that might have a better match.
            </p>
          </Warning>

          <CodeBlock>
            {`{
  name: 'Not Found',
  path: '(.*)',
}`}
          </CodeBlock>
        </HashSection>

        <HashSection meta={walkthroughMeta} tag="h3">
          <CodeBlock>
            {`const routes = prepareRoutes([
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
    path: '(.*)'
  }
]);`}
          </CodeBlock>

          <Note>
            <p>
              Curi's default matching behavior is to match locations exactly.
              This means that when the route only matches part of the pathname,
              it does not consider that a match. Routes can be configured to
              allow partial matching, but exact matching is usually preferable.
            </p>
          </Note>

          <p>
            If the user navigates to a location with the pathname{" "}
            <IJS>"/a/red/yellow"</IJS>, the <IJS>Album</IJS> route will only
            partially match, so Curi will move on to the next route,{" "}
            <IJS>Not Found</IJS>. <IJS>Not Found</IJS> has a catch all{" "}
            <IJS>path</IJS> that matches every pathname, so it will match the
            location.
          </p>

          <p>
            If a route has children, Curi will check if any of those routes form
            a complete match before moving on to the next route in the routes
            array.
          </p>

          <CodeBlock>
            {`const routes = prepareRoutes([
  {
    name: 'Home',
    path: '',
  },
  {
    name: 'Album',
    path: 'a/:album',
    children: [
      {
        name: 'Song',
        path: ':title'
      }
    ]
  },
  {
    name: 'Not Found',
    path: '(.*)'
  }
]);`}
          </CodeBlock>

          <p>
            If the pathname is <IJS>'/a/Coloring+Book/All+Night'</IJS>, the{" "}
            <IJS>Album</IJS> route will partially match the pathname (
            <IJS>"/a/Coloring+Book"</IJS>). That route has children routes, so
            the unmatched segments (<IJS>"/All+Night"</IJS>) will be checked
            against those routes. The <IJS>Song</IJS> route matches the
            remaining segments, so the router matches the <IJS>Song</IJS> route
            to the location.
          </p>
        </HashSection>

        <HashSection meta={optionsMeta} tag="h3">
          <p>
            You can control whether a route does exact or partial matching with{" "}
            <Link hash="pathOptions">
              <IJS>pathOptions</IJS>
            </Link>{" "}
            property. If you set <IJS>{`{ end: false }`}</IJS>, a route that
            partially matches will consider itself matched.
          </p>

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
        </HashSection>
      </HashSection>

      <HashSection meta={prepareMeta}>
        <p>
          The routes array should be wrapped in a <IJS>prepareRoutes()</IJS>{" "}
          call. This will pre-build the routes for the router, which is
          especially useful for server rendering, where a new router is created
          for every request.
        </p>

        <CodeBlock>
          {`import { prepareRoutes } from "@curi/router";

// plain routes
const routes = [...]

// prepared routes
export default prepareRoutes(routes);`}
        </CodeBlock>
      </HashSection>
    </React.Fragment>
  );
}

export { RoutesGuide as component, contents };
