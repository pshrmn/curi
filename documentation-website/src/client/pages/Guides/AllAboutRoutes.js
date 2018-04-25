import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
import { Note, Warning } from "../../components/Messages";
import { Section, Subsection } from "../../components/Sections";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      Routes are JavaScript objects with two required props: <IJS>name</IJS> and{" "}
      <IJS>path</IJS>. There are also a number of other props that you can use
      to enhance the routes, which are covered below.
    </p>

    <PrismBlock lang="javascript">
      {`{
  name: 'Home',
  path: ''
};`}
    </PrismBlock>
    <Section title="Route properties" id="route-properties">
      <Subsection title="route.name" id="name">
        <p>A string, this must be unique for every route.</p>
        <PrismBlock lang="javascript">
          {`[
  { name: 'Home' },
  { name: 'Album' },
  { name: 'Not Found' }
];`}
        </PrismBlock>
      </Subsection>

      <Subsection title="route.path" id="path">
        <p>
          A string that will be passed to{" "}
          <a href="https://github.com/pillarjs/path-to-regexp#parameters">
            <IJS>path-to-regexp</IJS>
          </a>{" "}
          to generate a regular expression use for matching the route to a
          location's <IJS>pathname</IJS>.{" "}
          <a href="https://github.com/pillarjs/path-to-regexp#parameters">
            Path parameters
          </a>{" "}
          will be captured so that they can be parsed from a location's{" "}
          <IJS>pathname</IJS> when the route matches.
        </p>
        <p>
          <IJS>path</IJS> strings should <strong>not</strong> have a leading
          slash
        </p>
        <PrismBlock lang="javascript">
          {`[
  { name: 'Home', path: '' },
  { name: 'Album', path: 'a/:albumID' },
  { name: 'Not Found', path: '(.*)' }
];
// don't do this
// { name: 'Home', path: '/' }`}
        </PrismBlock>
        <Warning>
          <IJS>path-to-regexp</IJS> supports arrays and RegExps, but only string
          paths are supported here. This is because Curi needs to generate
          pathnames given a route name, which <IJS>path-to-regexp</IJS> can only
          do with strings.
        </Warning>
      </Subsection>

      <Subsection title="route.on" id="on">
        <p>
          The <IJS>on</IJS> object groups functions that will be called when the
          route matches.
        </p>

        <Subsection tag="h5" title="on.initial()" id="initial">
          <p>
            <IJS>on.initial()</IJS> will be called the first time that a route
            matches and its result will be re-used on subsequent matches. It
            should return a Promise.
          </p>
          <p>
            This can be used for loading resources that are required for the
            route to display properly, but don't change based on{" "}
            <IJS>params</IJS>. For example, if you are doing code splitting with
            Webpack using <IJS>import()</IJS>, you can load the modules in{" "}
            <IJS>on.initial()</IJS>.
          </p>
          <p>
            The <IJS>initial</IJS> function will be passed the matched route
            properties: <IJS>name</IJS>, <IJS>params</IJS>, <IJS>partials</IJS>,{" "}
            <IJS>location</IJS>, and <IJS>key</IJS>.
          </p>
          <PrismBlock lang="javascript">
            {`const about = {
  name: 'About',
  path: 'about',
  on: {
    initial: () => import('./components/About')
  }
};`}
          </PrismBlock>
        </Subsection>

        <Subsection tag="h5" title="on.every()" id="every">
          <p>
            <IJS>on.every()</IJS> will be called every time a route matches.
            This can be useful for data fetching. Like <IJS>on.initial()</IJS>,{" "}
            <IJS>on.every()</IJS> should return a Promise.
          </p>
          <p>
            The <IJS>every</IJS> function will be passed the matched route
            properties: <IJS>name</IJS>, <IJS>params</IJS>, <IJS>partials</IJS>,{" "}
            <IJS>location</IJS>, and <IJS>key</IJS>.
          </p>
          <PrismBlock lang="javascript">
            {`// fetch user data
const user = {
  name: 'User',
  path: ':id',
  on: {
    every: ({ params, location }) =>
      fetch(\`/api/users/$\{params.id\}\`)
        .then(resp => JSON.parse(resp))
  }
}`}
          </PrismBlock>
          <Note>
            You should not perform side effects (e.g. passing the loaded data to
            a Redux store) in <IJS>on.every()</IJS> because it is possible that
            navigating to the route might be cancelled. If you must perform side
            effects, you should do so in <IJS>response()</IJS>.
          </Note>
        </Subsection>
      </Subsection>
      <Subsection title="route.response()" id="response">
        <p>A function for modifying the response object.</p>
        <p>
          Only valid properties will be merged onto the response; everything
          else will be ignored. The valid properties are:
        </p>
        <ol>
          <li>
            <p>
              <IJS>body</IJS> - This is usually what you will render.
            </p>
            <PrismBlock lang="javascript">
              {`import Home from "./components/Home";
const routes = [
  {
    name: "Home",
    path: "",
    response: () => ({
      body: Home
    })
  },
  // ...
];
// response = { body: Home, ... }`}
            </PrismBlock>
          </li>
          <li>
            <p>
              <IJS>status</IJS> - A number. This is useful for redirects or
              locations caught by your catch-all route while using server-side
              rendering. The default status value is <IJS>200</IJS>.
            </p>
            <PrismBlock lang="javascript">
              {`{
  response: () => ({
    status: 301,
    redirectTo: {...}
  })
}
// response = { status: 301, ... }`}
            </PrismBlock>
          </li>
          <li>
            <p>
              <IJS>error</IJS> - If an error occurs with the route's{" "}
              <IJS>on</IJS> methods, you might want to attach an error message
              to the response.
            </p>
            <PrismBlock lang="javascript">
              {`{
  on: {
    initial: () => Promise.reject("woops!")
  },
  response: ({ error }) => ({
    error
  })
}
// response = { error: "woops!", ... }`}
            </PrismBlock>
          </li>
          <li>
            <p>
              <IJS>data</IJS> - Anything you want it to be.
            </p>
            <PrismBlock lang="javascript">
              {`{
  response = () => ({
    data: Math.random();
  })
}
// response = { data: 0.8651606708109429, ... }`}
            </PrismBlock>
          </li>
          <li>
            <p>
              <IJS>title</IJS> - This can be used with{" "}
              <IJS>@curi/side-effect-title</IJS> to update the page's{" "}
              <IJS>document.title</IJS>.
            </p>
            <PrismBlock lang="javascript">
              {`{
  response: ({ params }) => ({
    title: \`User \${params.id}\`
  })
}
// when visting /user/2
// response = { title: "User 2", ... }`}
            </PrismBlock>
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
            <PrismBlock lang="javascript">
              {`[
  {
    name: "Old Photo",
    path: "photo/:id",
    response = ({ params }) => ({
      redirectTo: { name: "Photo", params }
    })
  },
  {
    name: "New Photo",
    path: "p/:id"
  }
]
// when the user navigates to /photo/1:
// response = { redirectTo: { pathname: "/p/1", ... }, ... }`}
            </PrismBlock>
          </li>
        </ol>

        <p>
          This function is passed an object with a number of properties that can
          be useful for modifying the response.
        </p>
        <PrismBlock lang="javascript">
          {`{
  response: ({ match, resolved }) => {
    // ...
  }
}`}
        </PrismBlock>
        <ul>
          <Subsection tag="li" title="match" id="response-match">
            <p>An object with the matched route properties of a response.</p>
            <table>
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
            </table>
          </Subsection>
          <Subsection tag="li" title="resolved" id="response-resolved">
            <p>
              <IJS>resolved</IJS> is an object with the values resolved by the{" "}
              <IJS>on.initial()</IJS> and <IJS>on.every()</IJS> functions.
            </p>
            <table>
              <thead>
                <tr>
                  <th>property</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>error</td>
                  <td>
                    if either <IJS>on.initial()</IJS> or <IJS>on.every()</IJS>{" "}
                    throw and the error is not caught, it will be available here
                  </td>
                </tr>
                <tr>
                  <td>initial</td>
                  <td>
                    the value resolved by <IJS>on.initial()</IJS>
                  </td>
                </tr>
                <tr>
                  <td>every</td>
                  <td>
                    the value resolved by <IJS>on.every()</IJS>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              If a route isn't async, <IJS>resolved</IJS> will be{" "}
              <IJS>null</IJS>.
            </p>
            <PrismBlock lang="javascript">
              {`// attach resolved data to the response
const user = {
  name: 'User',
  path: ':id',
  response: ({ resolved }) => {
    const modifiers = {};
    if (resolved.error) {
      modifiers.error = resolved.error;
    } else {
      modifiers.data = resolved.every;
    }
    return modifiers;
  },
  on: {
    every: ({ params, location }) => (
      fetch(\`/api/users/$\{params.id\}\`)
        .then(resp => JSON.parse(resp))
    ),
  }
}`}
            </PrismBlock>
          </Subsection>
        </ul>
      </Subsection>

      <Subsection title="children" id="children">
        <p>
          An optional array of route objects for creating nested routes. Any
          child routes will be matched relative to their parent route's{" "}
          <IJS>path</IJS>. This means that if a parent route's <IJS>path</IJS>{" "}
          string is <IJS>'one'</IJS> and a child route's <IJS>path</IJS> string
          is <IJS>'two'</IJS>, the child will match when the pathname is{" "}
          <IJS>'one/two'</IJS>.
        </p>
        <PrismBlock lang="javascript">
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
        </PrismBlock>
      </Subsection>

      <Subsection title="params" id="params">
        <p>
          When <IJS>path-to-regexp</IJS> matches your paths, all parameters are
          extracted as strings. However, you might prefer for some route params
          to be other types. You can provide functions to transform params using
          the <IJS>route.params</IJS> object.
        </p>
        <p>
          Properties of the <IJS>route.params</IJS> object are the names of
          params to be parsed. The paired value should be a function that takes
          a string (the value from the <IJS>pathname</IJS>) and returns a new
          value (transformed however you want).
        </p>
        <PrismBlock lang="javascript">
          {`const routes = [
  {
    name: 'Number',
    path: 'number/:num',
    params: {
      num: n => parseInt(n, 10)
    }
  }
]
// when the user visits /number/1,
// response.params will be { num: 1 } instead of { num: "1" }`}
        </PrismBlock>
      </Subsection>

      <Subsection title="pathOptions" id="pathOptions">
        <p>
          If you need to provide different path options than{" "}
          <a href="https://github.com/pillarjs/path-to-regexp#usage">
            the defaults
          </a>{" "}
          used by <IJS>path-to-regexp</IJS>, you can provide them with a{" "}
          <IJS>pathOptions</IJS> object.
        </p>
        <Note>
          If a route has a children array property, it will{" "}
          <strong>always</strong> have the <IJS>end</IJS> path option set to
          false.
        </Note>
      </Subsection>

      <Subsection title="extra" id="extra">
        <p>
          If you have any additional properties that you want attached to a
          route, use the <IJS>extra</IJS> property. You will be able to use{" "}
          <IJS>route.extra</IJS> in any custom route interactions.
        </p>

        <PrismBlock lang="javascript">
          {`const routes = [
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
];`}
        </PrismBlock>
      </Subsection>
    </Section>

    <Section title="Matching Routes" id="matching-routes">
      <p>
        Whenever Curi receives a new location, it will determine which route has
        a <IJS>path</IJS> that matches the new location's <IJS>pathname</IJS> by
        walking over the route objects in the order that they are defined in the
        array. If a route has <IJS>children</IJS>, those will be checked before
        moving to the route's nest sibling.
      </p>
      <p>We'll use this simple route setup to demonstrate how this works.</p>
      <PrismBlock lang="javascript">
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
      </PrismBlock>
      <p>
        Curi's default matching behavior looks for exact matches. This means
        that when the route only matches part of the pathname, it does not count
        as a match. If the user navigates to a location with the pathname{" "}
        <IJS>"/a/red/yellow"</IJS>, the <IJS>Album</IJS> route will only
        partially match, so Curi will move on to the next route,{" "}
        <IJS>Not Found</IJS>, which has a catch all <IJS>path</IJS> that matches
        every pathname.
      </p>
      <p>
        However, if a route has children, then Curi will check if any of those
        routes form a complete match before moving on to the next route in the
        routes array.
      </p>
      <PrismBlock lang="javascript">
        {`// when the pathname is '/a/Coloring+Book/All+Night',
// the Album route will partially match the pathname. Then,
// its child route Song will be tested and fully match the pathname.
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
      </PrismBlock>
      <p>
        You can control whether a route does exact or partial matching with{" "}
        <Link hash="pathOptions">
          <IJS>pathOptions</IJS>
        </Link>{" "}
        property. If you set <IJS>{`{ end: false }`}</IJS>, a route that
        partially matches will consider itself matched.
      </p>
      <PrismBlock lang="javascript">
        {`// when the pathname is '/a/Good+Kid,+M.A.A.D+City/Poetic+Justice',
// the Album route will partially match. However, because it sets
// end to false, the partial match will be used.
{
  name: 'Album',
  path: 'a/:albumID',
  pathOptions: {
    end: false
  }
}`}
      </PrismBlock>
      <Subsection title="No Matching Route" id="catch-all">
        <Warning>
          <p>
            If none of your routes match a location, Curi will do nothing! You
            need to set a catch-all route to match these locations yourself. The
            best way to do this is to add a route to the end of your routes
            array with a <IJS>path</IJS> of <IJS>"(.*)"</IJS>, which will match
            every pathname.
          </p>
          <PrismBlock lang="javascript">
            {`{
  name: 'Not Found',
  path: '(.*)',
}`}
          </PrismBlock>
        </Warning>
      </Subsection>
    </Section>

    <div>
      <h2>Next</h2>
      <p>
        Now that you know how to setup your routes, we will take a look at{" "}
        <Link to="Guide" params={{ slug: "response-handlers" }}>
          response handlers
        </Link>.
      </p>
    </div>
  </BaseGuide>
);
