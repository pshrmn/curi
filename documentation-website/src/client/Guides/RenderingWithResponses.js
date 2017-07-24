import React from 'react';
import BaseGuide from '../components/BaseGuide';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from 'curi-react';
import { Section, Subsection } from '../components/Sections';

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>
    <p>
      Response objects are what you use to help render your application. They are essentially
      just a collection of properties related to which route matched the current location. You
      can pick and choose which ones you need to use when you are rendering. There is no one
      "correct" way render with a response, but in this guide we will use the response's body
      property and a render function.
    </p>
    
    <Section
      title='The Properties of a Response Object'
      id='properties'
    >

      <PrismBlock lang='javascript'>
      {
`{
  // The location key
  key: '1.0',

  // The location object used to generate the response.
  location: { pathname: '/photos/6789/12345', ... },

  // The status code for the response.
  // This defaults to 200, but can be changed
  // if no routes match or a route issues a redirect.
  status: 200,

  // If the route had a load function and called
  // setData, that value will be set here. If not,
  // this will be undefined.
  data: {...},

  // The title string generated by the route
  // or an empty string if the route has no title property
  title: 'Photo 12345',

  // The value returned by the route's body function
  body: Photo,

  // The name of the best matching route
  name: 'Photo',

  // The name of ancestor routes that matched
  // part of the location's pathname
  partials: ['Album'],

  // An object containing the values parsed
  // from the pathname by path-to-regexp.
  params: { photoID: 12345, albumID: 6789 },

  // If an error occurs while generating the
  // response, it will be set here
  error: undefined
}`
       }
      </PrismBlock>

      <Subsection
        title='Redirect Response'
        id='redirect-properties'
      >
        <p>
          When you redirect, a slightly different response object will be created. You are in
          charge of actually redirecting, Curi just generates a response that lets you know
          that you should redirect. You can redirect by using your history object's
          replace (or push) methods, or if you are using one of the library specific Curi packages,
          there might be a built-in way for you to redirect (e.g. curi-react provides the{' '}
          <InlineJS>&lt;Redirect&gt;</InlineJS> component).
        </p>
        <PrismBlock lang='javascript'>
          {
`{
  // These properties also exist on the redirect response
  key: '1.0',
  location: { pathname: '/photos/6789/12345', ... },
  status: 301,
  data: {...},
  title: 'Photo 12345',

  // The redirectTo property provides information on
  // where you should redirect to
  redirectTo: { pathname: '/login' }
}`
          }
        </PrismBlock>
      </Subsection>
    </Section>

    <Section
      title='The Body Property'
      id='body-property'
    >
      <p>
        The body property of a response is the value returned by the matched route's body property.
        This value can be anything you want it to be, but it should usually be a function/component.
        Here, we will assume that each of your routes have body properties that return a function.
      </p>
      <PrismBlock lang='javascript'>
        {
`// we are assuming all routes are setup like this
{
  ...,
  body: () => function() {...}
}`
        }
      </PrismBlock>
      <p>
        The response's body function should take other response properties as its arguments. Which ones
        will vary based on your application, but if you are using path parameters, then the params object
        should be one of these. If you are doing data loading in your routes (using the load property),
        then you will probably also want to pass the data property to your body function.
      </p>
      <Note>
        It is important that each body function has the same argument signature. If you want to play
        it safe, you can just have each function expect to receive the full response object as an
        argument.
      </Note>
      <p>
        As stated above, the body property does not have to be a function. You may want to pass extra
        data for each route, in which case it might be convenient for the route's body function to return
        an object. This can be useful if you want to have multiple render functions (where each one would
        manipulate a different part of your application).
      </p>
      <PrismBlock lang='javascript'>
        {
`{
  name: 'User',
  body: () => ({
    main: function User() {...},
    menu: function UserMenu() {...}
  })
}`
        }
      </PrismBlock>
    </Section>

    <Section
      title='The Render Function'
      id='render-function'
    >
      <p>
        A render function is simply a function that receives a response object as its argument
        and manipulates the DOM (or its equivalent for non-browser environments) using the response.
        In React or Vue, a render function would trigger a re-rendering of your application. In
        vanilla JavaScript, a render function would manually update the DOM.
      </p>

      <Subsection
        title='Rendering Redirects'
        id='rendering-redirects'
      >
        <p>
          The first thing you should do in your render function is to check if the response has a{' '}
          <InlineJS>redirectTo</InlineJS> property. If it does, then you should redirect to the new
          location instead of rendering.
        </p>
        <p>
          curi-react and curi-vue both provide components that will do this for you, but you can also
          just use your history object to redirect. You will want to use your history's replace function
          to redirect.
        </p>
        <PrismBlock lang='javascript'>
          { 
`function render(response) {
  // assuming that your history object is in scope
  if (response.redirectTo) {
    history.replace(response.redirectTo)
  }
}`
          }
        </PrismBlock>
      </Subsection>

      <Subsection
        title='Rendering HTML'
        id='rendering-HTML'
      >
        <p>
          Once we have verified that we don't have to redirect, we are ready to render the content
          using the response. There is still one thing to verify: that our response actually has a
          body property. If none of your routes match, then the response will not have a body property.
          You can rememdy this by adding a wildcard route to the end of your routes array, but this is
          not necessary. You can also just have a default function that will be used when there is no
          body property.
        </p>
        <PrismBlock lang='javascript'>
          {
`// use a wildcard route
const routes = [
  // ...,
  {
    name: 'Not Found',
    path: '*'
  }
];

// or have a default body function
function render(response) {
  //...
  const body = response.body || function defaultBody() {...}
  body(response.params);
}`
          }
        </PrismBlock>

        <p>
          Now that we have our body function, we just need to call it. The exact behavior will vary
          based on how you are rendering your application. For a React application, we would just
          pass the body function to React's <InlineJS>createElement</InlineJS> function (or use JSX).
          For vanilla JavaScript, our body function probably returns an HTML string, so we would assign
          the returned value to the DOM node that holds our application.
        </p>

        <PrismBlock lang='javascript'>
          {
`// vanilla JavaScript
const root = document.getElementById('root');

function render(response) {
  // call the body function to return content
  root.innerHTML = response.body(response.params, response.data);
}

// react
function render(response) {
  // This function should be a property of the <Navigator> and
  // it should return a React element
  const Body = response.body || defaultBody;
  return React.createElement(Body, { params: response.params });
}`
        }
        </PrismBlock>
      </Subsection>

    </Section>

    <div>
      <h2>Next</h2>
      <p>
        Let's take a moment to go back to our configuration object and look at what
        Curi's addons are for in the{' '}
        <Link to='Guide' params={{ slug: 'addons' }}>Using Addons</Link> guide.
      </p>
    </div>
  </BaseGuide>
);
