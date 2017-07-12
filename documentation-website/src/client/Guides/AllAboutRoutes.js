import React from 'react';
import BaseGuide from '../components/BaseGuide';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from 'curi-react';

const slug = 'routes';
const name = 'All About Routes';

const AllAboutRoutes = () => (
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

    <div className='section'>
      <h2>Matching routes</h2>
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
        Another possibility happens when you use the <InlineJS>pathOptions</InlineJS> object to set{' '}
        <InlineJS>end: false</InlineJS>. When you do that, then a route the partially matches will consider
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
        If none of your routes match a pathname, then Curi will set a "404" status on the response object.
        The body property of the response will also be <InlineJS>undefined</InlineJS>, so it is important
        that your application checks the response's status when it goes to render a response. You can also
        add a wildcard route (<InlineJS>path: '*'</InlineJS>) to the end of your routes array, and that route
        will always match. You may want to still manually set the status to "404" for the wildcard route, but
        it is not required.
      </p>
    </div>

    <div className='section'>
      <h2>Route properties</h2>

      <div className='subsection'>
        <h3>name</h3>
        <p>
          A unique identifier. This should be a string or a symbol.
        </p>
      </div>

      <div className='subsection'>
        <h3>path</h3>
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
      </div>

      <div className='subsection'>
        <h3>pathOptions</h3>
        <p>
          If you need to provide different path options than{' '}
          <a href="https://github.com/pillarjs/path-to-regexp#usage">the defaults</a> used by path-to-regexp,
          you should specify them with a <InlineJS>pathOptions</InlineJS> object.
        </p>
        <Note>
          If a route has a children array property, it will <strong>always</strong> have the <InlineJS>end</InlineJS>
          {' '} path option set to false.
        </Note>
      </div>

      <div className='subsection'>
        <h3>body</h3>
        <p>
          The body property gives you the opportunity to set the body property of a response for a given
          route. This must be a function and its return value will be what is set as the response object's
          body property.
        </p>
        <PrismBlock lang='javascript'>
          {
`// when the user visits /contact, the response object's body
// property will be the Contact value
const contact = {
  name: 'Contact',
  path: 'contact',
  body: () => Contact
};`
          }
        </PrismBlock>
      </div>

      <div className='subsection'>
        <h3>title</h3>
        <p>
          You can use the title property of a route to specify a title string that should be set on the response
          when that route matches. This can either be a string or a function. If it is a string, then
          <InlineJS>response.title</InlineJS> will be set to the value of <InlineJS>route.title</InlineJS>. If
          it is a function, it will be called (and passed the <InlineJS>response.params</InlineJS> and{' '}
          <InlineJS>response.data</InlineJS> values) to generate the title string.
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
      </div>

      <div className='subsection'>
        <h3>children</h3>
      </div>
      <p>
        An optional array of route objects. Any child routes will be matched relative to their parent route's path.
        This means that if a parent route's path string is 'one' and a child route's path string is 'two',
        the child will match when the pathname is 'one/two'.
      </p>

      <div className='subsection'>
        <h3>preload</h3>
        <p>
          A function that will only be called the first time that a route matches. This should only be
          used for loading resources that are required for the route to display properly. For example,
          if you are doing code splitting with Webpack using <InlineJS>import()</InlineJS>, you would
          load the modules in preload.
        </p>
        <p>
          The preload function must return a Promise.
        </p>
        <PrismBlock lang='javascript'>
          {
`const about = {
  name: 'About',
  path: 'about',
  preload: () => {
    return import('./components/About')
      .then(module => AsyncStore.register(module.default));
  }
};`
          }
        </PrismBlock>
      </div>
      
      <div className='subsection'>
        <h3>load</h3>
        <p>
          A function that can be used for data fetching as well as for triggering redirects.
          The load function will be passed the params object that is parsed from the location's
          pathname (using the route and its ancestor's paths) and the modifiers object
          that can be used to modify the response object that will be created.
        </p>
        <p>
          Like preload, load must return a Promise.
        </p>
        <PrismBlock lang='javascript'>
          {

`const user = {
  name: 'User',
  path: ':id',
  load: (params, mod) => {
    return fetch(\`/api/users/$\{params.id\}\`)
      .then(resp => JSON.parse(resp))
      .then(data => mod.setData(data);)
      .catch(err => {
        mod.fail(err);
        mod.setStatus(404);
      });
  }
}`
          }
        </PrismBlock>
        <p>
          What is that modifiers object that gets passed to the load function?
          It contains a number of functions that you can use to modify the response. These
          functions are <InlineJS>redirect</InlineJS>, <InlineJS>fail</InlineJS>,{' '}
          <InlineJS>setStatus</InlineJS>, and <InlineJS>setData</InlineJS>.
        </p>
        <ul>
          <li>
            <InlineJS>redirect(to, code)</InlineJS> - This allows you to turn the response into a
            redirect response. When you application receives a redirect response, it should redirect
            to the new location (using your history object) instead of re-rendering. If you do not
            provide a code, then 301 will be used. The <InlineJS>to</InlineJS> argument can be whatever
            you want it to be, you will just need to know how to deal with it in your render function.
          </li>
          <li>
            <InlineJS>fail(error)</InlineJS> - A method to call when something goes wrong. This will
            add an error property to the response.
          </li>
          <li>
            <InlineJS>setStatus(code)</InlineJS> - This method will set a new status for the response
            (the default status is 200 when a route matches and 404 when no routes match).
          </li>
          <li>
            <InlineJS>setData(data)</InlineJS> - The value passed to this method will be set as the
            response's data property.
          </li>
        </ul>
      </div>
    </div>

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

export default {
  name,
  slug,
  component: AllAboutRoutes 
};
