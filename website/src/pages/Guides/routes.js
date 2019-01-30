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

const prepareMeta = {
  title: "Preparing Routes",
  hash: "prepareRoutes"
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

const contents = [
  prepareMeta,
  namesMeta,
  asyncMeta,
  responseMeta,
  matchingMeta
];

function RoutesGuide() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>{meta.title}</h1>

        <p>
          Routes are JavaScript objects with two required properties—
          <IJS>name</IJS> and <IJS>path</IJS>—and a number of optional
          properties.
        </p>

        <p>
          A route's <IJS>path</IJS> is used to determine if a route matches a
          location. Path strings use{" "}
          <a href="https://github.com/pillarjs/path-to-regexp">
            <IJS>path-to-regexp</IJS>
          </a>{" "}
          formatting, which allows you to define dynamic path parameters that a
          route should match.
        </p>

        <p>
          A route's <IJS>name</IJS> is a unique identifier for a route. The{" "}
          <IJS>name</IJS> is used to{" "}
          <Link name="Guide" params={{ slug: "route-interactions" }}>
            interact
          </Link>{" "}
          with a specific route.
        </p>

        <Note>
          <p>
            <IJS>path</IJS> strings do not start with a slash.
          </p>
        </Note>

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
      </PlainSection>

      <HashSection meta={prepareMeta}>
        <p>
          The routes array should be wrapped in a <IJS>prepareRoutes()</IJS>{" "}
          call. This will pre-build the routes for the router.
        </p>

        <CodeBlock>
          {`import { prepareRoutes } from "@curi/router";

// plain routes
const routes = [...]

// prepared routes
export default prepareRoutes(routes);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={namesMeta}>
        <p>
          Why do routes have names? Curi lets you interact with routes using
          their names.
        </p>
        <p>
          For example, Curi provides a <IJS>pathname</IJS> route interaction to
          generate the <IJS>pathname</IJS> of a location to navigate to. Instead
          of manually writing <IJS>pathname</IJS> strings, you tell Curi the
          name of the route that you want to navigate to (and also any required
          params) and Curi will create the <IJS>pathname</IJS> for you.
        </p>

        <CodeBlock>
          {`const pathname = router.route.pathname(
  "Album", { id: "abcd" }
);
// pathname = "/a/abcd"`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={asyncMeta}>
        <p>
          When a route matches, you might want to perform some actions before
          the application re-renders. This can include validating that a user is
          authorized to navigate to a route and loading data based on the path
          parameters parsed from the location.
        </p>
        <p>
          A route's <IJS>resolve</IJS> property is an optional object for
          attaching functions to a route. A response will not be emitted until
          after all of a route's <IJS>resolve</IJS> functions have finished.
        </p>

        <CodeBlock>
          {`{
  name: "User",
  path: "u/:id",
  resolve: {
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

        <p>
          A route with <IJS>resolve</IJS> properties is asynchronous, which has
          some effects to be aware of. You can read about these in the{" "}
          <Link name="Guide" params={{ slug: "sync-or-async" }}>
            Sync or Async
          </Link>{" "}
          guide.
        </p>
      </HashSection>

      <HashSection meta={responseMeta}>
        <p>
          Each route can have a <IJS>response()</IJS> function, which returns an
          object of properties to merge with route's "match" properties. This
          combined object is a{" "}
          <Link name="Guide" params={{ slug: "responses" }}>
            "response"
          </Link>{" "}
          object.
        </p>

        <CodeBlock>
          {`import User from "./components/User";

const routes = prepareRoutes([
  {
    name: "User",
    path: "u/:id",
    resolve: {
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
]);`}
        </CodeBlock>

        <p>
          Only valid response properties will be merged onto the response. These
          are the optional response properties listed above (<IJS>body</IJS>,{" "}
          <IJS>title</IJS>, <IJS>status</IJS>, <IJS>data</IJS>,{" "}
          <IJS>redirectTo</IJS>, and <IJS>error</IJS>).
        </p>
        <p>
          The function receives an object with a number of properties you might
          find useful.
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
            <IJS>error</IJS> is only defined when one of the <IJS>resolve</IJS>{" "}
            functions throws an error does not catch it itself.
          </li>
        </ol>
      </HashSection>

      <HashSection meta={matchingMeta}>
        <p>
          Whenever Curi receives a new location, it will determine which route
          has a <IJS>path</IJS> that matches the new location's{" "}
          <IJS>pathname</IJS>. It does this by walking over the route objects in
          the order that they are defined in the array. If a route has{" "}
          <IJS>children</IJS>, those will be checked before moving to the
          route's nest sibling.
        </p>

        <HashSection meta={noMatchMeta} tag="h3">
          <Warning>
            If none of your routes match a location, Curi will do nothing! Your
            routes should include catch all route to match these locations
            yourself. The best way to do this is to add a route to the end of
            your routes array with a <IJS>path</IJS> of <IJS>"(.*)"</IJS>, which
            will match every pathname.
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
    path: '(.*)' // this matches EVERY pathname
  }
]);`}
          </CodeBlock>

          <p>
            Curi's default matching behavior looks for exact matches. This means
            that when the route only matches part of the pathname, it does not
            count as a match. Routes can be configured to allow partial
            matching, but exact matching is usually preferable.
          </p>
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
    </React.Fragment>
  );
}

export { RoutesGuide as component, contents };
