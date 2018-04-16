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
      <Subsection title="name" id="name">
        <p>A string, this must be unique for every route.</p>
        <PrismBlock lang="javascript">
          {`[
  { name: 'Home' },
  { name: 'Album' },
  { name: 'Not Found' }
];`}
        </PrismBlock>
      </Subsection>

      <Subsection title="path" id="path">
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

      <Subsection title="match" id="match">
        <p>
          The <IJS>match</IJS> object used to provide functions that will be
          called when the route matches.
        </p>
        <p>
          While not required, you will almost always want to have a{" "}
          <IJS>match.response</IJS> property on your routes.
        </p>
        <Subsection tag="h5" title="initial" id="initial">
          <p>
            A function that returns a Promise. It will be called the first time
            that a route matches.
          </p>
          <p>
            This can be used for loading resources that are required for the
            route to display properly, but don't change based on{" "}
            <IJS>params</IJS>. For example, if you are doing code splitting with
            Webpack using <IJS>import()</IJS>, you can load the modules in{" "}
            <IJS>initial</IJS>.
          </p>
          <PrismBlock lang="javascript">
            {`const about = {
  name: 'About',
  path: 'about',
  match: {
    initial: () => import('./components/About')
  }
};`}
          </PrismBlock>
        </Subsection>

        <Subsection tag="h5" title="every" id="every">
          <p>
            A function that will be called every time a route matches. This can
            be useful for data fetching. The <IJS>every</IJS> function will be
            passed the a "route" object containing the <IJS>params</IJS> parsed
            from the location's pathname (using the route and its ancestor's
            paths), the current <IJS>location</IJS>, and the <IJS>name</IJS> of
            the matched route.
          </p>
          <p>
            Like <IJS>initial</IJS>, <IJS>every</IJS> must return a Promise.
          </p>
          <PrismBlock lang="javascript">
            {`// fetch user data
const user = {
  name: 'User',
  path: ':id',
  match: {
    every: ({ params, location }) =>
      fetch(\`/api/users/$\{params.id\}\`)
        .then(resp => JSON.parse(resp))
  }
}`}
          </PrismBlock>
          <Note>
            You should not perform side effects (e.g. passing the loaded data to
            a Redux store) in <IJS>every</IJS> because it is possible that
            navigating to the route might be cancelled. If you must perform side
            effects, you should do so in <IJS>match.response</IJS>.
          </Note>
        </Subsection>

        <Subsection tag="h5" title="response" id="response">
          <p>
            A function that will be called right before a response is emitted.
            This function is where you can set various properties of the{" "}
            <IJS>response</IJS> object. The <IJS>response</IJS> function will be
            passed an object with a number of properties.
          </p>
          <PrismBlock lang="javascript">
            {`response: ({ error, resolved, route, set, addons }) => {
  // ...
}`}
          </PrismBlock>
          <ul>
            <Subsection tag="li" title="error" id="response-error">
              <p>
                If either the <IJS>initial</IJS> or <IJS>every</IJS> functions
                reject with an error, that error will be passed to the{" "}
                <IJS>response</IJS> function.
              </p>
              <PrismBlock lang="javascript">
                {`// check if there was an error in every or initial
const user = {
  name: 'User',
  path: ':id',
  match: {
    every: ({ params, location }) => {
      return Promise.reject('Nope!')
    },
    response: ({ error, set }) => {
      if (error) {
        set.error(error);
      }
    }
  }
};`}
              </PrismBlock>
            </Subsection>
            <Subsection tag="li" title="resolved" id="response-resolved">
              <p>
                <IJS>resolved</IJS> is an object with the values resolved by the{" "}
                <IJS>initial</IJS> and <IJS>every</IJS> functions (or{" "}
                <IJS>null</IJS> if the router has neither an <IJS>initial</IJS>{" "}
                function nor an <IJS>every</IJS> function. If the route has one,
                but not the other, the missing value will be{" "}
                <IJS>undefined</IJS> on the <IJS>resolved</IJS> object.
              </p>
              <PrismBlock lang="javascript">
                {`// attach resolved data to the response
const user = {
  name: 'User',
  path: ':id',
  match: {
    every: ({ params, location }) => (
      fetch(\`/api/users/$\{params.id\}\`)
        .then(resp => JSON.parse(resp))
    ),
    response: ({ resolved, set }) => {
      set.data(resolved.every);
    }
  }
}`}
              </PrismBlock>
            </Subsection>
            <Subsection tag="li" title="route" id="response-route">
              <p>
                This is the same object that is passed to the <IJS>every</IJS>{" "}
                function and contains three properties: the parsed{" "}
                <IJS>params</IJS>, the <IJS>location</IJS>, and the{" "}
                <IJS>name</IJS> of the matched route.
              </p>
            </Subsection>
            <Subsection tag="li" title="set" id="response-set">
              <p>
                The <IJS>set</IJS> object contains a number of functions that
                you can use to modify the response.
              </p>
              <ul>
                <li>
                  <IJS>body(body)</IJS> - The value passed to this method will
                  be set as the response's <IJS>body</IJS> property.
                </li>
                <li>
                  <IJS>data(data)</IJS> - The value passed to this method will
                  be set as the response's <IJS>data</IJS> property.
                </li>
                <li>
                  <IJS>{`redirect({ name, status, ... })`}</IJS> - This allows
                  you to turn the response into a redirect response. When you
                  application receives a redirect response, it should redirect
                  to the new location (using your history object) instead of
                  re-rendering. If you do not provide a code, then 301 will be
                  used. Setting the status code is mostly important for
                  rendering on the server. The <IJS>to</IJS> argument should be
                  a string or a location object. Once the response has been
                  created, Curi will automatically redirect to the <IJS>to</IJS>{" "}
                  location.
                </li>
                <li>
                  <IJS>error(error)</IJS> - A method to call when something goes
                  wrong. This will add an error property to the response.
                </li>
                <li>
                  <IJS>status(code)</IJS> - This method will set a new status
                  for the response (the default status is 200 when a route
                  matches and 404 when no routes match).
                </li>
                <li>
                  <IJS>title(t)</IJS> - This method will set the{" "}
                  <IJS>title</IJS> property of the response, which is used by{" "}
                  <IJS>@curi/side-effect-title</IJS> to set the document's
                  title.
                </li>
              </ul>
              <PrismBlock lang="javascript">
                {`// when the user visits /contact, the response object's body
// property will be the Contact value
import Contact from './components/Contact';

const routes = [
  {
    name: 'Contact',
    path: 'contact',
    match: {
      response: ({ set }) => {
        set.body(Contact);
      }
    }
  }
];`}
              </PrismBlock>
            </Subsection>

            <Subsection tag="li" title="addons" id="response-addons">
              <p>
                The add-ons that have been registered with Curi are available to
                the <IJS>response</IJS> function.
              </p>
            </Subsection>
          </ul>
        </Subsection>
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
          <IJS>route.extra</IJS> in any custom add-ons.
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
        <Link details={{ hash: "pathOptions" }}>
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
        <p>
          If none of your routes match a pathname, then Curi will set a "404"
          status on the <IJS>response</IJS> object. The <IJS>body</IJS> property
          of the response will also be <IJS>undefined</IJS>, so it is important
          that your application checks the response's status when it renders.
        </p>
        <p>
          A better option is to add a catch all route (<IJS>path: '(.*)'</IJS>)
          to the end of your routes array, and that route will always match. You
          may want to still manually set the status to "404" for the catch all
          route in the route's <IJS>match.response</IJS> method, but it is not
          required.
        </p>
        <PrismBlock lang="javascript">
          {`{
  name: 'Not Found',
  path: '(.*)',
}`}
        </PrismBlock>
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
