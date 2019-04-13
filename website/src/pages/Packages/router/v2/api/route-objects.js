import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note,
  Warning
} from "../../../../../components/package/common";

export const meta = {
  title: "Route Objects",
  hash: "route-objects"
};

export function RoutePropertiesAPI() {
  return (
    <HashSection meta={meta}>
      <HashSection meta={{ title: "route.name", hash: "name" }} tag="h3">
        <p>
          A string that will be used to identify a route. This must be unique
          for every route.
        </p>

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
          A string pattern describing what the route matches. <IJS>path</IJS>{" "}
          strings should not have a leading slash.
        </p>

        <CodeBlock>
          {`[
  { path: "" }, // yes
  { path: "/" }, // no
]`}
        </CodeBlock>

        <p>
          A route's <IJS>path</IJS> is used to check if it matches a location's{" "}
          <IJS>pathname</IJS>. When the <IJS>path</IJS> matches, the route is
          selected.
        </p>

        <p>
          Path matching is done using regular expressions compiled by{" "}
          <a href="https://github.com/pillarjs/path-to-regexp">
            <IJS>path-to-regexp</IJS>
          </a>
          . A path can include{" "}
          <a href="https://github.com/pillarjs/path-to-regexp#parameters">
            parameters
          </a>
          , which are dynamic variables that are parsed from a location's{" "}
          <IJS>pathname</IJS>. For advanced path formatting, please read{" "}
          <IJS>path-to-regexp</IJS>'s documentaion.
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
          Every time that a route with a <IJS>resolve</IJS> function matches,
          the route's <IJS>resolve</IJS> function will be called. Simple caching
          can be done with the <IJS>once</IJS> function from{" "}
          <Link
            name="Package"
            params={{ package: "helpers", version: "v2" }}
            hash="once"
          >
            <IJS>@curi/helpers</IJS>
          </Link>
          , while more advanced caching is left to the user.
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
            <IJS>response</IJS> function, but even that should be avoided.
          </p>
        </Note>

        <p>
          The value returned by the <IJS>resolve</IJS> function will be passed
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

      <HashSection meta={{ title: "route.response", hash: "response" }}>
        <p>A function for modifying the response object.</p>

        <p>
          The object returned by a route's <IJS>response</IJS> function will be
          merged with the route's intrinsic match properties to create the
          response object.
        </p>

        <p>
          Only valid properties will be merged onto the response; everything
          else will be ignored. The valid properties are:
        </p>

        <HashSection
          tag="h3"
          meta={{ title: "Arguments", hash: "response-arguments" }}
        >
          <HashSection
            tag="h4"
            meta={{ title: "options", hash: "response-options" }}
          >
            <p>
              A <IJS>response</IJS> function is passed an object with a number
              of properties that can be useful for modifying the response.
            </p>

            <CodeBlock>
              {`{
  response: ({ match, resolved, error }) => {
    // ...
  }
}`}
            </CodeBlock>

            <HashSection
              tag="h5"
              meta={{ title: "match", hash: "response-options-match" }}
            >
              <p>
                An object with the intrinsic route properties of a response.
              </p>

              <HashSection
                tag="h6"
                meta={{ title: "name", hash: "response-options-match-name" }}
              >
                <p>The name of the matched route.</p>
              </HashSection>

              <HashSection
                tag="h6"
                meta={{
                  title: "params",
                  hash: "response-options-match-params"
                }}
              >
                <p>Route parameters parsed from the location.</p>
              </HashSection>

              <HashSection
                tag="h6"
                meta={{
                  title: "partials",
                  hash: "response-options-match-partials"
                }}
              >
                <p>The names of any ancestor routes of the matched route.</p>
              </HashSection>

              <HashSection
                tag="h6"
                meta={{
                  title: "location",
                  hash: "response-options-match-location"
                }}
              >
                <p>The location that was used to match the route.</p>
              </HashSection>

              <HashSection
                tag="h6"
                meta={{ title: "key", hash: "response-options-match-key" }}
              >
                <p>
                  A two number tuple. The first number is the location's place
                  in the session array. The second number starts and zero and is
                  incremented by <IJS>replace</IJS> navigation (<IJS>[1,0]</IJS>{" "}
                  would be replaced by <IJS>[1,1]</IJS>).
                </p>
              </HashSection>
            </HashSection>

            <HashSection
              tag="h5"
              meta={{ title: "resolved", hash: "response-resolved" }}
            >
              <p>
                An object with the value returned by the route's{" "}
                <IJS>resolve</IJS> function.
              </p>

              <p>
                If a route isn't async, <IJS>resolved</IJS> will be{" "}
                <IJS>null</IJS>.
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

            <HashSection
              tag="h5"
              meta={{ title: "error", hash: "response-error" }}
            >
              <p>
                If the route has a <IJS>resolve</IJS> function that throws an
                uncaught error, the <IJS>error</IJS> property will be that
                error. Otherwise, the property will be <IJS>null</IJS>.
              </p>

              <p>
                Ideally, the <IJS>resolve</IJS> function will always catch its
                errors, but <IJS>error</IJS> serves as a safety check.
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
        </HashSection>

        <HashSection
          tag="h3"
          meta={{ title: "Return Value", hash: "response-return" }}
        >
          <HashSection tag="h4" meta={{ title: "body", hash: "response-body" }}>
            <p>
              Typically, the <IJS>body</IJS> is a component (or components) that
              will be rendered.
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
          </HashSection>

          <HashSection
            tag="h4"
            meta={{ title: "status", hash: "response-status" }}
          >
            <p>
              A number. This is useful for redirects or locations caught by your
              catch-all route while using server-side rendering. The default
              status value is <IJS>200</IJS>.
            </p>

            <CodeBlock>
              {`{
  response(){
    return {
      status: 301,
      redirect: {...}
    };
  }
}
// response = { status: 301, ... }`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h4"
            meta={{ title: "error", hash: "response-error" }}
          >
            <p>
              If an error occurs with the route's <IJS>resolve</IJS> function,
              you might want to attach an error message to the response.
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
          </HashSection>

          <HashSection tag="h4" meta={{ title: "data", hash: "response-data" }}>
            <p>Anything you want it to be.</p>

            <CodeBlock>
              {`{
  response() {
    return { data: Math.random() };
  }
}
// response = { data: 0.8651606708109429, ... }`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h4"
            meta={{ title: "title", hash: "response-title" }}
          >
            <p>
              This can be used with <IJS>@curi/side-effect-title</IJS> to update
              the page's <IJS>document.title</IJS>.
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
          </HashSection>

          <HashSection
            tag="h4"
            meta={{ title: "redirect", hash: "response-redirect" }}
          >
            <p>
              An object with the <IJS>name</IJS> of the route to redirect to,{" "}
              <IJS>params</IJS> (if required), and optional <IJS>hash</IJS>,{" "}
              <IJS>query</IJS>, and <IJS>state</IJS> properties.
            </p>

            <p>
              The other values are copied directly, but <IJS>redirect</IJS> will
              be turned into a location object using the object's{" "}
              <IJS>name</IJS> (and <IJS>params</IJS> if required).
            </p>

            <CodeBlock>
              {`[
  {
    name: "Old Photo",
    path: "photo/:id",
    response({ params }) {
      return {
        redirect: { name: "Photo", params }
      };
    }
  },
  {
    name: "New Photo",
    path: "p/:id"
  }
]
// when the user navigates to /photo/1:
// response = { redirect: { pathname: "/p/1", ... } }`}
            </CodeBlock>

            <p>
              The <IJS>redirect</IJS> property can also be used to specify a
              redirect to an external location. An external redirect object has
              only one property: <IJS>exernalURL</IJS>.
            </p>

            <CodeBlock>
              {`{
  name: "Redirects",
  path: "redirects",
  response() {
    return {
      redirect: {
        externalURL: "https://example.com"
      }
    }
  }
}`}
            </CodeBlock>

            <p>
              Responses with an external redirect are always emitted, even when{" "}
              <IJS>invisibleRedirects</IJS> is <IJS>true</IJS>. The actual
              location changing is left to the application.
            </p>
          </HashSection>
        </HashSection>
      </HashSection>

      <HashSection meta={{ title: "children", hash: "children" }} tag="h3">
        <p>An optional array of route objects for creating nested routes.</p>

        <p>
          Any child routes will be matched relative to their parent route's{" "}
          <IJS>path</IJS>. This means that if a parent route's <IJS>path</IJS>{" "}
          string is <IJS>"one"</IJS> and a child route's <IJS>path</IJS> string
          is <IJS>"two"</IJS>, the child will match a location whose pathname is{" "}
          <IJS>/one/two</IJS>.
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
          When <IJS>path-to-regexp</IJS> matches paths, all parameters are
          extracted as strings. The <IJS>params</IJS> object is used to specify
          functions to transform the extracted value.
        </p>

        <p>
          Properties of the <IJS>route.params</IJS> object are the names of
          params to be parsed. The paired value should be a function that takes
          a string (the value from the <IJS>pathname</IJS>) and returns a new
          value (transformed using the function you provide).
        </p>

        <p>
          By default, each param is decoded using <IJS>decodeURIComponent</IJS>.
          A param function can be used to leave the param in its encoded form or
          to parse an integer param into a number.
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

        <p>
          Unnamed params are referred to by their index in the <IJS>path</IJS>.
        </p>

        <CodeBlock>
          {`const routes = prepareRoutes([
  {
    name: 'Not Found',
    path: '(.*)',
    params: {
      // skip decoding the unmatched value
      0: value => value
    }
  }
]);`}
        </CodeBlock>
      </HashSection>

      <HashSection
        meta={{ title: "pathOptions", hash: "pathOptions" }}
        tag="h3"
      >
        <p>
          An object for configuring how the{" "}
          <a href="https://github.com/pillarjs/path-to-regexp">
            <IJS>path-to-regexp</IJS>
          </a>{" "}
          handles the <IJS>path</IJS>.
        </p>

        <CodeBlock>
          {`{
  name: "My Route",
  path: "my/:item",
  pathOptions: {
    match: {
      sensitive: false
    },
    compile: {
      encode: (value, token) => value
    }
  }
}`}
        </CodeBlock>

        <HashSection
          tag="h4"
          meta={{ title: "match", hash: "pathOptions-match" }}
        >
          <p>
            Properties for parsing the <IJS>path</IJS> into a regular
            expression.
          </p>

          <p>
            You can see the options and their default values in the{" "}
            <a href="https://github.com/pillarjs/path-to-regexp#usage">
              <IJS>path-to-regexp</IJS> documentation
            </a>
            .
          </p>

          <Note>
            <p>
              If a route has a children array property, it will{" "}
              <strong>always</strong> have the <IJS>end</IJS> path option set to{" "}
              <IJS>false</IJS>.
            </p>
          </Note>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "compile", hash: "pathOptions-compile" }}
        >
          <p>
            For pathname generation, the options are passed through a{" "}
            <IJS>compile</IJS> object. There is only one possible option, which
            is an <IJS>encode</IJS> function for encoding params. The default{" "}
            <IJS>encode</IJS> function encodes params using{" "}
            <IJS>encodeURIComponent</IJS>.
          </p>
        </HashSection>
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
