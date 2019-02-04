import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note,
  Warning,
  ScrollableTable
} from "../../../../../components/package/common";

export const meta = {
  title: "Route Objects",
  hash: "route-objects"
};

export function RoutePropertiesAPI() {
  return (
    <HashSection meta={meta}>
      <HashSection meta={{ title: "route.name", hash: "name" }} tag="h3">
        <p>A string, this must be unique for every route.</p>

        <CodeBlock>
          {`[
  { name: 'Home' },
  { name: 'Album' },
  { name: 'Not Found' }
];`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={{ title: "route.path", hash: "path" }} tag="h3">
        <p>
          A string pattern describing what the route matches. Whenever the
          router receives a new location, it will loop through the known route
          paths to determine which one matches the new location's{" "}
          <IJS>pathname</IJS> the best.
        </p>
        <p>
          Curi uses{" "}
          <a href="https://github.com/pillarjs/path-to-regexp#parameters">
            <IJS>path-to-regexp</IJS>
          </a>{" "}
          for path matching, which enables routes to have{" "}
          <a href="https://github.com/pillarjs/path-to-regexp#parameters">
            path parameters
          </a>
          . When a route with parameters matches a location, the parameters will
          be be parsed from the location's <IJS>pathname</IJS>.
        </p>
        <p>
          <IJS>path</IJS> strings should <strong>not</strong> have a leading
          slash.
        </p>

        <CodeBlock>
          {`[
  { name: 'Home', path: '' },
  // when the pathname is a/yo, albumID = "yo"
  { name: 'Album', path: 'a/:albumID' },
  // the path (.*) matches every pathname
  { name: 'Not Found', path: '(.*)' }
];

// don't include a leading forward slash
// { name: 'Home', path: '/' }`}
        </CodeBlock>

        <Warning>
          <p>
            <IJS>path-to-regexp</IJS> supports arrays and RegExps, but Curi only
            supports string paths.
          </p>
        </Warning>
      </HashSection>

      <HashSection meta={{ title: "route.resolve", hash: "resolve" }} tag="h3">
        <p>
          The <IJS>resolve</IJS> property is a function that returns a Promise.
          It is used to run asynchronous actions for a route prior to rendering.
        </p>

        <p>
          A route with a <IJS>resolve</IJS> function is asynchronous, while one
          with no <IJS>resolve</IJS> functions is synchronous. You can read more
          about this in the{" "}
          <Link name="Guide" params={{ slug: "sync-or-async" }}>
            sync or async
          </Link>{" "}
          guide.
        </p>

        <p>
          The <IJS>resolve</IJS> function is called every time that a route
          matches the current location.
        </p>

        <p>
          The function will be passed an object with the matched route
          properties: <IJS>name</IJS>, <IJS>params</IJS>, <IJS>partials</IJS>,
          and <IJS>location</IJS>.
        </p>

        <CodeBlock>
          {`const about = {
  name: 'About',
  path: 'about',
  resolve({ name, params, partials, location }) {
    return Promise.resolve("hurray!");
  }
};`}
        </CodeBlock>

        <Note>
          <p>
            You should not perform side effects (e.g. passing the loaded data to
            a Redux store) in <IJS>resolve</IJS> because it is possible that
            navigating to the route might be cancelled. If you must perform side
            effects for a route, you should do so in the route's{" "}
            <IJS>response</IJS> function.
          </p>
        </Note>

        <p>
          The value resolved by the <IJS>resolve</IJS> function will be passed
          to the route's <IJS>response</IJS> function through its{" "}
          <IJS>resolved</IJS> property. If there is an uncaught error,{" "}
          <IJS>resolved</IJS> will be <IJS>null</IJS> and the <IJS>error</IJS>{" "}
          will be passed.
        </p>

        <CodeBlock>
          {`const about = {
  name: 'About',
  path: 'about',
  resolve({ name, params, partials, location }) {
    return Promise.resolve("hurray!");
  },
  response({ resolved, error }) {
    if (error) {
      // there was an uncaught error in the resolve function
    }
  }
};`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={{ title: "route.response()", hash: "response" }}>
        <p>
          A function for modifying the response object. This returns an object
          whose properties will be merged with the matched route properties to
          create the "final" response.
        </p>
        <p>
          Only valid properties will be merged onto the response; everything
          else will be ignored. The valid properties are:
        </p>

        <ol>
          <li>
            <p>
              <IJS>body</IJS> - This is usually what you will render.
            </p>

            <CodeBlock>
              {`import Home from "./components/Home";
const routes = prepareRoutes([
  {
    name: "Home",
    path: "",
    response() {
      return { body: Home };
    }
  },
  // ...
]);
// response = { body: Home, ... }`}
            </CodeBlock>
          </li>
          <li>
            <p>
              <IJS>status</IJS> - A number. This is useful for redirects or
              locations caught by your catch-all route while using server-side
              rendering. The default status value is <IJS>200</IJS>.
            </p>

            <CodeBlock>
              {`{
  response(){
    return {
      status: 301,
      redirectTo: {...}
    };
  }
}
// response = { status: 301, ... }`}
            </CodeBlock>
          </li>
          <li>
            <p>
              <IJS>error</IJS> - If an error occurs with the route's{" "}
              <IJS>resolve</IJS> function, you might want to attach an error
              message to the response.
            </p>

            <CodeBlock>
              {`{
  resolve() {
    return Promise.reject("woops!");
  },
  response({ error }) {
    return { error };
  }
}
// response = { error: "woops!", ... }`}
            </CodeBlock>
          </li>
          <li>
            <p>
              <IJS>data</IJS> - Anything you want it to be.
            </p>

            <CodeBlock>
              {`{
  response() {
    return { data: Math.random() };
  }
}
// response = { data: 0.8651606708109429, ... }`}
            </CodeBlock>
          </li>
          <li>
            <p>
              <IJS>title</IJS> - This can be used with{" "}
              <IJS>@curi/side-effect-title</IJS> to update the page's{" "}
              <IJS>document.title</IJS>.
            </p>

            <CodeBlock>
              {`{
  response({ params }) {
    return { title: \`User \${params.id}\` };
  }
}
// when visting /user/2
// response = { title: "User 2", ... }`}
            </CodeBlock>
          </li>
          <li>
            <p>
              <IJS>redirectTo</IJS> - An object with the <IJS>name</IJS> of the
              route to redirect to, <IJS>params</IJS> (if required), and
              optional <IJS>hash</IJS>, <IJS>query</IJS>, and <IJS>state</IJS>{" "}
              properties.
            </p>
            <p>
              The other values are copied directly, but <IJS>redirectTo</IJS>{" "}
              will be turned into a location object using the object's{" "}
              <IJS>name</IJS> (and <IJS>params</IJS> if required).
            </p>

            <CodeBlock>
              {`[
  {
    name: "Old Photo",
    path: "photo/:id",
    response({ params }) {
      return {
        redirectTo: { name: "Photo", params }
      };
    }
  },
  {
    name: "New Photo",
    path: "p/:id"
  }
]
// when the user navigates to /photo/1:
// response = { redirectTo: { pathname: "/p/1", ... } }`}
            </CodeBlock>
          </li>
        </ol>

        <p>
          This function is passed an object with a number of properties that can
          be useful for modifying the response.
        </p>

        <CodeBlock>
          {`{
  response: ({ match, resolved, error }) => {
    // ...
  }
}`}
        </CodeBlock>

        <HashSection meta={{ title: "match", hash: "response-match" }} tag="h3">
          <p>An object with the matched route properties of a response.</p>
          <ScrollableTable>
            <thead>
              <tr>
                <th>property</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>name</td>
                <td>the name of the matched route</td>
              </tr>
              <tr>
                <td>params</td>
                <td>route parameters parsed from the location</td>
              </tr>
              <tr>
                <td>partials</td>
                <td>the names of any ancestor routes of the matched route</td>
              </tr>
              <tr>
                <td>location</td>
                <td>the location that was used to match the route</td>
              </tr>
              <tr>
                <td>key</td>
                <td>
                  the location's <IJS>key</IJS>, which is a unique identifier
                </td>
              </tr>
            </tbody>
          </ScrollableTable>
        </HashSection>

        <HashSection
          meta={{ title: "resolved", hash: "response-resolved" }}
          tag="h3"
        >
          <p>
            <IJS>resolved</IJS> is an object with the values resolved by the{" "}
            <IJS>resolve</IJS> functions.
          </p>
          <p>
            If a route isn't async, <IJS>resolved</IJS> will be <IJS>null</IJS>.
          </p>

          <CodeBlock>
            {`// attach resolved data to the response
const user = {
  name: 'User',
  path: ':id',
  resolve({ params, location }) {
    return fetch(\`/api/users/$\{params.id\}\`)
      .then(resp => JSON.parse(resp));
  },
  response: ({ resolved }) => {
    return {
      data: resolved
    };
  }
}`}
          </CodeBlock>
        </HashSection>

        <HashSection meta={{ title: "error", hash: "response-error" }} tag="h3">
          <p>
            <IJS>error</IJS> is an uncaught error thrown by the route's{" "}
            <IJS>resolve</IJS> function.
          </p>

          <CodeBlock>
            {`// check if any of a route's resolve functions threw
const user = {
  name: 'User',
  path: ':id',
  resolve({ params, location }) {
    return fetch(\`/api/users/$\{params.id\}\`)
      .then(resp => JSON.parse(resp));
  },
  response: ({ error, resolved }) => {
    if (error) {
      return { error };
    }
    return {
      data: resolved.data
    };
  }
}`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={{ title: "children", hash: "children" }} tag="h3">
        <p>
          An optional array of route objects for creating nested routes. Any
          child routes will be matched relative to their parent route's{" "}
          <IJS>path</IJS>. This means that if a parent route's <IJS>path</IJS>{" "}
          string is <IJS>'one'</IJS> and a child route's <IJS>path</IJS> string
          is <IJS>'two'</IJS>, the child will match when the pathname is{" "}
          <IJS>'one/two'</IJS>.
        </p>

        <CodeBlock>
          {`// '/a/Coloring+Book/All+Night' will be matched
// by the "Song" route, with the params
// { album: 'Coloring+Book', title: 'All+Night' }
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

      <HashSection meta={{ title: "params", hash: "params" }} tag="h3">
        <p>
          When <IJS>path-to-regexp</IJS> matches your paths, all parameters are
          extracted as strings. If you prefer for some route params to be other
          types, you can provide functions to transform params using the{" "}
          <IJS>route.params</IJS> object.
        </p>
        <p>
          Properties of the <IJS>route.params</IJS> object are the names of
          params to be parsed. The paired value should be a function that takes
          a string (the value from the <IJS>pathname</IJS>) and returns a new
          value (transformed using the function you provide).
        </p>

        <CodeBlock>
          {`const routes = prepareRoutes([
  {
    name: 'Number',
    path: 'number/:num',
    params: {
      num: n => parseInt(n, 10)
    }
  }
]);

// when the user visits /number/1,
// response.params will be { num: 1 }
// instead of { num: "1" }`}
        </CodeBlock>
      </HashSection>

      <HashSection
        meta={{ title: "pathOptions", hash: "pathOptions" }}
        tag="h3"
      >
        <p>
          If you need to provide different path options than{" "}
          <a href="https://github.com/pillarjs/path-to-regexp#usage">
            the defaults
          </a>{" "}
          used by <IJS>path-to-regexp</IJS>, you can provide them with a{" "}
          <IJS>pathOptions</IJS> object.
        </p>
        <Note>
          <p>
            If a route has a children array property, it will{" "}
            <strong>always</strong> have the <IJS>end</IJS> path option set to
            false.
          </p>
        </Note>
      </HashSection>

      <HashSection meta={{ title: "extra", hash: "extra" }} tag="h3">
        <p>
          If you have any additional properties that you want attached to a
          route, use the <IJS>extra</IJS> property. You will be able to use{" "}
          <IJS>route.extra</IJS> in any custom route interactions.
        </p>

        <CodeBlock>
          {`const routes = prepareRoutes([
  {
    name: 'A Route',
    path: 'a-route',
    extra: {
      transition: 'fade'
    }
  },
  {
    name: 'B Route',
    path: 'b-route',
    extra: {
      enter: 'slide-right'
    }
  }
]);`}
        </CodeBlock>
      </HashSection>
    </HashSection>
  );
}
