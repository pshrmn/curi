import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS,
  Note,
  Warning
} from "../../../../../components/package/common";

export let meta = {
  title: "Route Objects",
  hash: "route-objects"
};

export function RoutePropertiesAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <HashSection meta={{ title: "route.name", hash: "name" }} tag="h3">
        <Paragraph>
          A string that will be used to identify a route. This must be unique
          for every route.
        </Paragraph>

        <CodeBlock>
          {`[
  { name: 'Home' },
  { name: 'Album' },
  { name: 'Not Found' }
];`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={{ title: "route.path", hash: "path" }} tag="h3">
        <Paragraph>
          A string pattern describing what the route matches. <IJS>path</IJS>{" "}
          strings should not have a leading slash.
        </Paragraph>

        <CodeBlock>
          {`[
  { path: "" }, // yes
  { path: "/" }, // no
]`}
        </CodeBlock>

        <Paragraph>
          A route's <IJS>path</IJS> is used to check if it matches a location's{" "}
          <IJS>pathname</IJS>. When the <IJS>path</IJS> matches, the route is
          selected.
        </Paragraph>

        <Paragraph>
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
        </Paragraph>

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
          <Paragraph>
            <IJS>path-to-regexp</IJS> supports arrays and RegExps, but Curi only
            supports string paths.
          </Paragraph>
        </Warning>
      </HashSection>

      <HashSection meta={{ title: "route.resolve", hash: "resolve" }} tag="h3">
        <Paragraph>
          The <IJS>resolve</IJS> property is a function that returns a Promise.
          It is used to run asynchronous actions for a route prior to rendering.
        </Paragraph>

        <Paragraph>
          A route with a <IJS>resolve</IJS> function is asynchronous, while one
          with no <IJS>resolve</IJS> functions is synchronous. You can read more
          about this in the{" "}
          <Link name="Guide" params={{ slug: "sync-or-async" }}>
            sync or async
          </Link>{" "}
          guide.
        </Paragraph>

        <Paragraph>
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
        </Paragraph>

        <Paragraph>
          The function will be passed an object with the matched route
          properties: <IJS>name</IJS>, <IJS>params</IJS>, <IJS>partials</IJS>,
          and <IJS>location</IJS>.
        </Paragraph>

        <CodeBlock>
          {`let about = {
  name: 'About',
  path: 'about',
  resolve({ name, params, partials, location }) {
    return Promise.resolve("hurray!");
  }
};`}
        </CodeBlock>

        <Note>
          <Paragraph>
            You should not perform side effects (e.g. passing the loaded data to
            a Redux store) in <IJS>resolve</IJS> because it is possible that
            navigating to the route might be cancelled. If you must perform side
            effects for a route, you should do so in the route's{" "}
            <IJS>respond</IJS> function, but even that should be avoided.
          </Paragraph>
        </Note>

        <Paragraph>
          The value returned by the <IJS>resolve</IJS> function will be passed
          to the route's <IJS>respond</IJS> function through its{" "}
          <IJS>resolved</IJS> property. If there is an uncaught error,{" "}
          <IJS>resolved</IJS> will be <IJS>null</IJS> and the <IJS>error</IJS>{" "}
          will be passed.
        </Paragraph>

        <CodeBlock>
          {`let about = {
  name: 'About',
  path: 'about',
  resolve({ name, params, partials, location }) {
    return Promise.resolve("hurray!");
  },
  respond({ resolved, error }) {
    if (error) {
      // there was an uncaught error in the resolve function
    }
  }
};`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={{ title: "route.respond", hash: "respond" }} tag="h3">
        <Paragraph>A function for modifying the response object.</Paragraph>

        <Paragraph>
          The object returned by a route's <IJS>respond</IJS> function will be
          merged with the route's intrinsic match properties to create the
          response object.
        </Paragraph>

        <Paragraph>
          Only valid properties will be merged onto the response; everything
          else will be ignored. The valid properties are:
        </Paragraph>

        <HashSection
          tag="h4"
          meta={{ title: "Arguments", hash: "response-arguments" }}
        >
          <HashSection
            tag="h5"
            meta={{ title: "options", hash: "response-options" }}
          >
            <Paragraph>
              A <IJS>respond</IJS> function is passed an object with a number of
              properties that can be useful for modifying the response.
            </Paragraph>

            <CodeBlock>
              {`{
  respond: ({ match, resolved, error }) => {
    // ...
  }
}`}
            </CodeBlock>

            <HashSection
              tag="h6"
              meta={{ title: "match", hash: "response-options-match" }}
            >
              <Paragraph>
                An object with the intrinsic route properties of a response.
              </Paragraph>

              <HashSection
                tag="h6"
                meta={{ title: "name", hash: "response-options-match-name" }}
              >
                <Paragraph>The name of the matched route.</Paragraph>
              </HashSection>

              <HashSection
                tag="h6"
                meta={{
                  title: "params",
                  hash: "response-options-match-params"
                }}
              >
                <Paragraph>
                  Route parameters parsed from the location.
                </Paragraph>
              </HashSection>

              <HashSection
                tag="h6"
                meta={{
                  title: "partials",
                  hash: "response-options-match-partials"
                }}
              >
                <Paragraph>
                  The names of any ancestor routes of the matched route.
                </Paragraph>
              </HashSection>

              <HashSection
                tag="h6"
                meta={{
                  title: "location",
                  hash: "response-options-match-location"
                }}
              >
                <Paragraph>
                  The location that was used to match the route.
                </Paragraph>
              </HashSection>

              <HashSection
                tag="h6"
                meta={{ title: "key", hash: "response-options-match-key" }}
              >
                <Paragraph>
                  A two number tuple. The first number is the location's place
                  in the session array. The second number starts and zero and is
                  incremented by <IJS>replace</IJS> navigation (<IJS>[1,0]</IJS>{" "}
                  would be replaced by <IJS>[1,1]</IJS>).
                </Paragraph>
              </HashSection>
            </HashSection>

            <HashSection
              tag="h6"
              meta={{ title: "resolved", hash: "response-options-resolved" }}
            >
              <Paragraph>
                An object with the value returned by the route's{" "}
                <IJS>resolve</IJS> function.
              </Paragraph>

              <Paragraph>
                If a route isn't async, <IJS>resolved</IJS> will be{" "}
                <IJS>null</IJS>.
              </Paragraph>

              <CodeBlock>
                {`// attach resolved data to the response
let user = {
  name: 'User',
  path: ':id',
  resolve({ params, location }) {
    return fetch(\`/api/users/$\{params.id\}\`)
      .then(resp => JSON.parse(resp));
  },
  respond: ({ resolved }) => {
    return {
      data: resolved
    };
  }
}`}
              </CodeBlock>
            </HashSection>

            <HashSection
              tag="h6"
              meta={{ title: "error", hash: "response-options-error" }}
            >
              <Paragraph>
                If the route has a <IJS>resolve</IJS> function that throws an
                uncaught error, the <IJS>error</IJS> property will be that
                error. Otherwise, the property will be <IJS>null</IJS>.
              </Paragraph>

              <Paragraph>
                Ideally, the <IJS>resolve</IJS> function will always catch its
                errors, but <IJS>error</IJS> serves as a safety check.
              </Paragraph>

              <CodeBlock>
                {`// check if any of a route's resolve functions threw
let user = {
  name: 'User',
  path: ':id',
  resolve({ params, location }) {
    return fetch(\`/api/users/$\{params.id\}\`)
      .then(resp => JSON.parse(resp));
  },
  respond: ({ error, resolved }) => {
    if (error) {
      return {
        meta: {
          error
        }
      };
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
          tag="h4"
          meta={{ title: "Return Value", hash: "response-return" }}
        >
          <HashSection tag="h5" meta={{ title: "body", hash: "response-body" }}>
            <Paragraph>
              Typically, the <IJS>body</IJS> is a component (or components) that
              will be rendered.
            </Paragraph>

            <CodeBlock>
              {`import Home from "./components/Home";
let routes = prepareRoutes([
  {
    name: "Home",
    path: "",
    respond() {
      return { body: Home };
    }
  },
  // ...
]);
// response = { body: Home, ... }`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h5"
            meta={{ title: "meta", hash: "response-return-meta" }}
          >
            <Paragraph>
              An object whose properties are metadata about the response. This
              may include the status of the response (200, 301, etc.), a title
              string for the document, or a description to be set as a page's{" "}
              <IJS>{`<meta name="Description">`}</IJS>.
            </Paragraph>

            <CodeBlock>
              {`{
  respond(){
    return {
      meta: {
        title: "Some Page",
        description: "This is some page",
        status: 200
      }
    };
  }
}`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h5"
            meta={{ title: "data", hash: "response-return-data" }}
          >
            <Paragraph>Anything you want it to be.</Paragraph>

            <CodeBlock>
              {`{
  respond() {
    return { data: Math.random() };
  }
}
// response = { data: 0.8651606708109429, ... }`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h5"
            meta={{ title: "redirect", hash: "response-return-redirect" }}
          >
            <Paragraph>
              An object with the <IJS>name</IJS> of the route to redirect to,{" "}
              <IJS>params</IJS> (if required), and optional <IJS>hash</IJS>,{" "}
              <IJS>query</IJS>, and <IJS>state</IJS> properties.
            </Paragraph>

            <Paragraph>
              The other values are copied directly, but <IJS>redirect</IJS> will
              be turned into a location object using the object's{" "}
              <IJS>name</IJS> (and <IJS>params</IJS> if required).
            </Paragraph>

            <CodeBlock>
              {`[
  {
    name: "Old Photo",
    path: "photo/:id",
    respond({ params }) {
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

            <Paragraph>
              The <IJS>redirect</IJS> property can also be used to specify a
              redirect to an external location. An external redirect object has
              only one property: <IJS>exernalURL</IJS>.
            </Paragraph>

            <CodeBlock>
              {`{
  name: "Redirects",
  path: "redirects",
  respond() {
    return {
      redirect: {
        externalURL: "https://example.com"
      }
    }
  }
}`}
            </CodeBlock>

            <Paragraph>
              Responses with an external redirect are always emitted, even when{" "}
              <IJS>invisibleRedirects</IJS> is <IJS>true</IJS>. The actual
              location changing is left to the application.
            </Paragraph>
          </HashSection>
        </HashSection>
      </HashSection>

      <HashSection meta={{ title: "children", hash: "children" }} tag="h3">
        <Paragraph>
          An optional array of route objects for creating nested routes.
        </Paragraph>

        <Paragraph>
          Any child routes will be matched relative to their parent route's{" "}
          <IJS>path</IJS>. This means that if a parent route's <IJS>path</IJS>{" "}
          string is <IJS>"one"</IJS> and a child route's <IJS>path</IJS> string
          is <IJS>"two"</IJS>, the child will match a location whose pathname is{" "}
          <IJS>/one/two</IJS>.
        </Paragraph>

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
        <Paragraph>
          When <IJS>path-to-regexp</IJS> matches paths, all parameters are
          extracted as strings. The <IJS>params</IJS> object is used to specify
          functions to transform the extracted value.
        </Paragraph>

        <Paragraph>
          Properties of the <IJS>route.params</IJS> object are the names of
          params to be parsed. The paired value should be a function that takes
          a string (the value from the <IJS>pathname</IJS>) and returns a new
          value (transformed using the function you provide).
        </Paragraph>

        <Paragraph>
          By default, each param is decoded using <IJS>decodeURIComponent</IJS>.
          A param function can be used to leave the param in its encoded form or
          to parse an integer param into a number.
        </Paragraph>

        <CodeBlock>
          {`let routes = prepareRoutes([
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

        <Paragraph>
          Unnamed params are referred to by their index in the <IJS>path</IJS>.
        </Paragraph>

        <CodeBlock>
          {`let routes = prepareRoutes([
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
        <Paragraph>
          An object for configuring how the{" "}
          <a href="https://github.com/pillarjs/path-to-regexp">
            <IJS>path-to-regexp</IJS>
          </a>{" "}
          handles the <IJS>path</IJS>.
        </Paragraph>

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
          <Paragraph>
            Properties for parsing the <IJS>path</IJS> into a regular
            expression.
          </Paragraph>

          <Paragraph>
            You can see the options and their default values in the{" "}
            <a href="https://github.com/pillarjs/path-to-regexp#usage">
              <IJS>path-to-regexp</IJS> documentation
            </a>
            .
          </Paragraph>

          <Note>
            <Paragraph>
              If a route has a children array property, it will{" "}
              <strong>always</strong> have the <IJS>end</IJS> path option set to{" "}
              <IJS>false</IJS>.
            </Paragraph>
          </Note>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "compile", hash: "pathOptions-compile" }}
        >
          <Paragraph>
            For pathname generation, the options are passed through a{" "}
            <IJS>compile</IJS> object. There is only one possible option, which
            is an <IJS>encode</IJS> function for encoding params. The default{" "}
            <IJS>encode</IJS> function encodes params using{" "}
            <IJS>encodeURIComponent</IJS>.
          </Paragraph>
        </HashSection>
      </HashSection>

      <HashSection meta={{ title: "extra", hash: "extra" }} tag="h3">
        <Paragraph>
          If you have any additional properties that you want attached to a
          route, use the <IJS>extra</IJS> property. You will be able to use{" "}
          <IJS>route.extra</IJS> in any custom route interactions.
        </Paragraph>

        <CodeBlock>
          {`let routes = prepareRoutes([
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
