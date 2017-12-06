import React from 'react';
import { Link } from '@curi/react';

import BaseGuide from './base/BaseGuide';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section, Subsection } from '../components/Sections';

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      Routes are simply JavaScript objects with two required props: name and path. There are also a number
      of other props that you can use to enhance the routes. We will cover these below.
    </p>

    <PrismBlock lang='javascript'>
      {
`{
  name: 'Home',
  path: ''
};`
      }
    </PrismBlock>

    <Section
      title='Matching Routes'
      id='matching-routes'
    >
      <p>
        First, we should cover how route matching works. Curi takes an array of route objects. Whenever Curi
        receives a new location, it will walk over the route objects in the order that they are defined in
        the array.
      </p>
      <p>
        Sometimes a route's path with only partially match the location's pathname. When this happens, the
        matching behavior will vary based on the route's props. By default, routes perform exact matching.
        This means that when the route only matches part of the pathname, it does not count as a match.
      </p>
      <PrismBlock lang='javascript'>
        {
`// when the pathname is '/a/Run+The+Jewels+3/Hey+Kids',
// the Album route will partially match the pathname. However,
// Curi looks for complete matches, so it will move on to the
// next route
{
  name: 'Album',
  path: 'a/:album'
}`
        }
      </PrismBlock>
      <p>
        However, if the route has children, then Curi will check if any of those routes form a complete
        match before moving on to the next route in the routes array.
      </p>
      <PrismBlock lang='javascript'>
        {
`// when the pathname is '/a/Coloring+Book/All+Night',
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
}`
        }
      </PrismBlock>
      <p>
        Another possibility happens when you use the <IJS>pathOptions</IJS> object to set{' '}
        <IJS>end: false</IJS>. When you do that, then a route the partially matches will consider
        itself matched.
      </p>
      <PrismBlock lang='javascript'>
        {
`// when the pathname is '/a/Good+Kid,+M.A.A.D+City/Poetic+Justice',
// the Album route will partially match. However, because it sets
// end to false, the partial match will be used.
{
  name: 'Album',
  path: 'a/:albumID',
  pathOptions: {
    end: false
  }
}`
        }
      </PrismBlock>
      <p>
        If none of your routes match a pathname, then Curi will set a "404"
        status on the response object. The <IJS>body</IJS> property of the
        response will also be <IJS>undefined</IJS>, so it is important that
        your application checks the response's status when it goes to render
        a response. You can also add a wildcard route (<IJS>path: '(.*)'</IJS>)
        to the end of your routes array, and that route will always match.
        You may want to still manually set the status to "404" for the wildcard
        route, but it is not required.
      </p>
    </Section>

    <Section
      title='Route properties'
      id='route-properties'
    >

      <Subsection
        title='name'
        id='name'
      >
        <p>
          A unique identifier. This should be a string or a symbol.
        </p>
      </Subsection>

      <Subsection
        title='path'
        id='path'
      >
        <p>
          A path-to-regexp style string. This should <strong>not</strong> have a leading slash. The string
          will be passed to path-to-regexp to generate a regular expression. Any{' '}
          <a href="https://github.com/pillarjs/path-to-regexp#parameters">parameters</a> will be identified
          so that they can be parsed out when matching against a location's pathname.
        </p>
        <Note>
          While path-to-regexp supports arrays and RegExps, only string paths are supported here. This is
          because the path must also be reversible to create a pathname given params.
        </Note>
      </Subsection>

      <Subsection
        title='pathOptions'
        id='pathOptions'
      >
        <p>
          If you need to provide different path options than{' '}
          <a href="https://github.com/pillarjs/path-to-regexp#usage">the defaults</a> used by path-to-regexp,
          you should specify them with a <IJS>pathOptions</IJS> object.
        </p>
        <Note>
          If a route has a children array property, it will <strong>always</strong> have the <IJS>end</IJS>
          {' '} path option set to false.
        </Note>
      </Subsection>

      <Subsection
        title='match'
        id='match'
      >
        <p>
          The <IJS>match</IJS> object is where you can attach functions that will be
          called when a route matches.
        </p>
        <p>
          While not required (like the <IJS>name</IJS> and <IJS>path</IJS> properties),
          you will almost always want to have a <IJS>match.finish</IJS> property on your
          routes.
        </p>
        <Subsection
          tag='h5'
          title='initial'
          id='initial'
        >
          <p>
            A function that will be called the first time that a route matches.
            This should be used for loading resources that are required for the
            route to display properly. For example, if you are doing code splitting
            with Webpack using <IJS>import()</IJS>, you would load the modules in{' '}
            <IJS>initial</IJS>.
          </p>
          <p>
            The <IJS>initial</IJS> function must return a Promise.
          </p>
          <PrismBlock lang='javascript'>
            {
`const about = {
  name: 'About',
  path: 'about',
  match: {
    initial: () => import('./components/About')
  }
};`
            }
          </PrismBlock>
        </Subsection>
        
        <Subsection
          tag='h5'
          title='every'
          id='every'
        >
          <p>
            A function that will be called every time a route matches. This can be
            useful for data fetching. The <IJS>every</IJS> function will be passed
            the a "route" object containing the <IJS>params</IJS> parsed from the
            location's pathname (using the route and its ancestor's paths), the
            current <IJS>location</IJS>, and the <IJS>name</IJS> of the matched route.
          </p>
          <p>
            Like <IJS>initial</IJS>, <IJS>every</IJS> must return a Promise.
          </p>
          <PrismBlock lang='javascript'>
            {
`// fetch user data
const user = {
  name: 'User',
  path: ':id',
  match: {
    every: ({ params, location }) =>
      fetch(\`/api/users/$\{params.id\}\`)
        .then(resp => JSON.parse(resp))
  }
}`
          }
        </PrismBlock>
        <p>
          You should not perform side effects in <IJS>every</IJS> because it is
          possible that navigating to the route might be cancelled. Instead,
          side effects should be performed in <IJS>match.finish</IJS>.
        </p>
      </Subsection>

      <Subsection
        tag='h5'
        title='finish'
        id='finish'
      >
        <p>
          A function that will be called right before a response is emitted.{' '}
          <IJS>finish</IJS> will be passed an object with a number of properties.
          The <IJS>finish</IJS> function gives you an opportunity to modify the
          response object that will be emitted, including using the data that was
          loaded in either the <IJS>initial</IJS> or <IJS>every</IJS> functions.
        </p>
          <Subsection
            tag='h6'
            title='error'
            id='finish-error'
          >
            <p>
              If either the <IJS>initial</IJS> or <IJS>every</IJS> functions
              reject with an error, that error will be passed to the <IJS>finish</IJS>
              {' '}function.
            </p>
            <PrismBlock lang='javascript'>
            {
`// check if there was an error in every or initial
const user = {
  name: 'User',
  path: ':id',
  match: {
    every: ({ params, location }) => (
      Promise.reject('Nope!')
    ),
    finish: ({ error, set }) => {
      if (error) {
        set.error(error);
      }
    }
  }
}`
          }
        </PrismBlock>
          </Subsection>
          <Subsection
            tag='h6'
            title='resolved'
            id='finish-resolved'
          >
            <p>
              <IJS>resolved</IJS> is the value that was resolved by the <IJS>every</IJS>
              {' '}function. If a route does not have a <IJS>match.every</IJS> function,
              then this property will be <IJS>undefined</IJS>.
            </p>
            <PrismBlock lang='javascript'>
            {
`// attach resolved data to the response
const user = {
  name: 'User',
  path: ':id',
  match: {
    every: ({ params, location }) => (
      fetch(\`/api/users/$\{params.id\}\`)
        .then(resp => JSON.parse(resp))
    ),
    finish: ({ resolved, set }) => {
      set.data(resolved);
    }
  }
}`
          }
        </PrismBlock>
          </Subsection>
          <Subsection
            tag='h6'
            title='route'
            id='finish-route'
          >
            <p>
              This is the same object that is passed to the <IJS>every</IJS> function
              and contains three properties: the parsed <IJS>params</IJS>, the{' '}
              <IJS>location</IJS>, and the <IJS>name</IJS> of the matched route.
            </p>
          </Subsection>
          <Subsection
            tag='h6'
            title='set'
            id='finish-set'
          >
            <p>
              The <IJS>set</IJS> object contains a number of functions that you can
              use to modify the response.
            </p>
            <ul>
              <li>
                <IJS>body(body)</IJS> - The value passed to this method will be set as the
                response's <IJS>body</IJS> property.
              </li>
              <li>
                <IJS>data(data)</IJS> - The value passed to this method will be set as the
                response's <IJS>data</IJS> property.
              </li>
              <li>
                <IJS>redirect(to, code)</IJS> - This allows you to turn the response into a
                redirect response. When you application receives a redirect response, it should redirect
                to the new location (using your history object) instead of re-rendering. If you do not
                provide a code, then 301 will be used. Setting the status code is mostly important for
                rendering on the server. The <IJS>to</IJS> argument should be a string or a location
                object. Once the response has been created, Curi will automatically redirect
                to the <IJS>to</IJS> location.
              </li>
              <li>
                <IJS>error(error)</IJS> - A method to call when something goes wrong. This will
                add an error property to the response.
              </li>
              <li>
                <IJS>status(code)</IJS> - This method will set a new status for the response
                (the default status is 200 when a route matches and 404 when no routes match).
              </li>
            </ul>
            <PrismBlock lang='javascript'>
              {
`// when the user visits /contact, the response object's body
// property will be the Contact value
import Contact from './components/Contact';

const routes = [
  {
    name: 'Contact',
    path: 'contact',
    match: {
      finish: ({ set }) => {
        set.body(Contact);
      }
    }
  }
];`
              }
            </PrismBlock>
          </Subsection>
          
          <Subsection
            tag='h6'
            title='addons'
            id='finish-addons'
          >
            <p>
              The addons that have been registered with Curi are available to the{' '}
              <IJS>finish</IJS> function. This includes the built-in <IJS>pathname</IJS>
              {' '}addon, which you might find useful if you need to redirect in a{' '}
              <IJS>finish</IJS> function.
            </p>
            <PrismBlock lang='javascript'>
              {
`// set a permanent redirect
// navigating to /photo/123 will automatically redirect to /p/123
const routes = [
  {
    name: 'Photo',
    path: 'p/:id'
  },
  {
    name: 'Old Photo',
    path: 'photo/:id',
    match: {
      finish: ({ route, set, addons }) => {
        const pathname = addons.pathname('Photo', route.params);
        set.redirect({ ...route.location, pathname }, 301);
      }
    }
  }
];`
              }
            </PrismBlock>
          </Subsection>
        </Subsection>
      </Subsection>

      <Subsection
        title='title'
        id='title'
      >
        <p>
          You can use the title property of a route to specify a title string that should be set on the response
          when that route matches. This can either be a string or a function. If it is a string, then
          <IJS>response.title</IJS> will be set to the value of <IJS>route.title</IJS>. If
          it is a function, it will be called (and passed the <IJS>response.params</IJS> and{' '}
          <IJS>response.data</IJS> values) to generate the title string.
        </p>
        <p>
          If a route does not have a title property, when it matches, the response's title property will be an
          empty string.
        </p>
        <PrismBlock lang='javascript'>
          {
`// as a string
{
  name: 'Contact',
  path: 'contact',
  title: 'How to contact us'
}

// as a function
{
  name: 'Contact Method',
  path: ':method',
  title: (params, data) => \`Contact via $\{params.method\}\`
}`
          }
        </PrismBlock>
      </Subsection>

      <Subsection
        title='children'
        id='children'
      >
        <p>
          An optional array of route objects. Any child routes will be matched relative to their parent route's path.
          This means that if a parent route's path string is 'one' and a child route's path string is 'two',
          the child will match when the pathname is 'one/two'.
        </p>
      </Subsection>

      
      <Subsection
        title='params'
        id='params'
      >
        <p>
          When <IJS>path-to-regexp</IJS> matches your paths, all parameters are extracted as strings. However, you might have
          some route params to be other types. You can provide functions to transform params using the <IJS>route.params</IJS>
          {' '}object. To transform a param, its name should be the string value from the path. The paired value should be a
          function that takes a string (the value from the pathname) and returns a new value (transformed however you want).
        </p>
        <PrismBlock lang='javascript'>
          {
`const routes = [
  {
    name: 'Number',
    path: 'number/:num',
    params: {
      num: n => parseInt(n, 10)
    }
  }
]
// when the user visits /number/1,
// response.params will be { num: 1 } instead of { num: "1" }`
          }
        </PrismBlock>
      </Subsection>

      <Subsection
        title='extra'
        id='extra'
      >
        <p>
          If you have any additional properties that you want attached to a route, use the <IJS>extra</IJS> property. You will be
          able to use <IJS>route.extra</IJS> in any custom addons or when a route matches via <IJS>response.route.extra</IJS>.
        </p>

        <p>
          You can attach anything you want to <IJS>extra</IJS> or you may never find yourself needing to use this. One possible
          use case for <IJS>extra</IJS> is that you could specify entrance/exit animation types. One route might want to fade in,
          while another might slide in.
        </p>

        <PrismBlock lang='javascript'>
          {
`const routes = [
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
];`
          }
        </PrismBlock>
      </Subsection>
    </Section>

    <div>
      <h2>Next</h2>
      <p>
        Now that you know how to setup your routes, we can get to the good part: actually
        rendering your application using response objects. Check out the{' '}
        <Link to='Guide' params={{ slug: 'responses' }}>Rendering with Responses</Link> guide
        to learn how.
      </p>
    </div>
  </BaseGuide>
);
