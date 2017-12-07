import React from 'react';
import { Link } from '@curi/react';

import BaseGuide from './base/BaseGuide';
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section } from '../components/Sections';

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <Note>
      This guide assumes that you are already familiar with React.
    </Note>

    <p>
      Curi provides a number of React components through the{' '}
      <Link to='Package' params={{ package: 'react' }}><IJS>@curi/react</IJS></Link> package.
      To get started, there are only two components that you need to be aware of:{' '}
      <Cmp>Navigator</Cmp> and <Cmp>Link</Cmp>.
    </p>

    <Section
      title='The Navigator'
      id='navigator'
    >
      <PrismBlock lang='bash'>
        {`npm install @curi/react`}
      </PrismBlock>
      <p>
        The{' '}
        <Link
          to='Package'
          params={{ package: 'react' }}
          details={{ hash: 'Navigator' }}
        >Navigator</Link> component is responsible for placing values on React's <IJS>context</IJS>
        {' '}so that child components can access them. To do this, you pass it a Curi configuration
        object, a <IJS>response</IJS> object, and an <IJS>action</IJS> string. You should re-render
        this whenever the a new response is emitted, so it makes sense to render this inside of a
        response handler (the function passed to <IJS>config.respond</IJS>).
      </p>

      <PrismBlock lang='javascript'>
        {
`import { Navigator } from '@curi/react';

const config = createConfig(history, routes);
ReactDOM.render((
  <Navigator config={config} ... />
), holder);`
        }
      </PrismBlock>

      <p>
        In addition to the configuration object, the Navigator also takes a{' '}
        <IJS>render</IJS> prop. That is a function that returns the React elements that
        make up your application. The render function will receive two arguments:{' '}
        <IJS>response</IJS> and <IJS>config</IJS>. Response is a response object and config
        is your configuration object (which can be useful to have access to, but you may
        also never have a reason to use it).
      </p>

      <PrismBlock lang='javascript'>
        {
`const config = createConfig(history, routes);

function render(response, config) {
  // return a React element (or null)
}

ReactDOM.render((
  <Navigator config={config} render={render} />
), holder);`
        }
      </PrismBlock>

      <p>
        You <em>can</em> define your render function inline, but typically it is easier to
        define the function in its own module and import it wherever you are rendering your
        Navigator. Inlining would also mean that the function gets recreated every time that
        the Navigator is re-rendered by its parent, which is not ideal.
      </p>

      <p>
        The primary property of the response object that you will find useful is{' '}
        <IJS>body</IJS>. The body property is the value set by calling <IJS>set.body()</IJS>
        {' '}in the route's <IJS>match.response</IJS> function. Since this is a React guide,
        this value should be a React component that will render the contents of the page for
        a specific route. For example, a <Cmp>Home</Cmp> component might render the contents
        of your homepage while an <Cmp>About</Cmp> component might render a page describing
        your application.
      </p>

      <PrismBlock lang='javascript'>
        {
`import Home from './components/Home';
import About from './components/About';

const routes = [
  {
    name: 'Home',
    path: '',
    match: {
      response: ({ set }) => {
        set.body(Home);
      }
    }
  },
  {
    name: 'About',
    path: 'about',
    match: {
      response: ({ set }) => {
        set.body(About);
      }
    }
  }
]`
        }
      </PrismBlock>

      <p>
        When the body property of a response is <IJS>undefined</IJS>, that means that none of
        your routes matched the new location and you should render some sort of 404/page not
        found component. You may also want to add a catch all route (one whose path is <IJS>(.*)</IJS>)
        so that you can expect to always have a <IJS>body</IJS> property on the response.
      </p>
      <PrismBlock lang='javascript'>
        {
`function render(response) {
  const { body:Body } = response;
  return <Body />;
}`
        }
      </PrismBlock>
      <Note>
        We rename "body" to "Body" so that the JSX is{' '}
        <a href='https://facebook.github.io/react/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized'>
          transformed properly
        </a>.
      </Note>

      <p>
        You can review all of the response properties in the{' '}
        <Link to='Guide' params={{ slug: 'responses' }} details={{ hash: 'properties' }}>
          Rendering with Responses
        </Link> guide. The other ones that you will most likely be interested in are
        <IJS>params</IJS> and <IJS>data</IJS>.
      </p>

      <PrismBlock lang='javascript'>
        {
`function render(response) {
  const { body:Body, params, data } = response;
  return <Body params={params} data={data} />;
}`
        }
      </PrismBlock>

      <Note>
        This does not cover all of the Link props. Please check out the{' '}
        <Link
          to='Package'
          params={{ package: 'react' }}
          details={{ hash: 'Navigator' }}
        >Navigator</Link> API docs to learn more about the other props.
      </Note>
    </Section>

    <Section
      title='The Link'
      id='link'
    >
      <PrismBlock lang='bash'>
        {`npm install @curi/react`}
      </PrismBlock>

      <p>
        A single page application isn't very useful if you cannot navigate between locations.
        The{' '}
        <Link
          to='Package'
          params={{ package: 'react' }}
          details={{ hash: 'Link' }}
        >Link</Link> component provides
        you with an easy way to do this by rendering anchor (<Cmp>a</Cmp>) elements.
      </p>

      <PrismBlock lang='javascript'>
        {
`import { Link } from '@curi/react'
<Link to='Home'>Home</Link>`
        }
      </PrismBlock>


      <p>
        The most important prop of the Link is <IJS>to</IJS>. This value should be the name of
        the route that you want to navigate to. For instance, take about following route:
      </p>

      <PrismBlock lang='javascript'>
        {
`{
  name: 'About',
  path: 'about',
  ...
}
`
        }
      </PrismBlock>
      <p>
        If you were to render a Link whose to property is "About", then it would render an
        anchor whose <IJS>href</IJS> attribute is <IJS>/about</IJS>. The great thing about
        this is that you don't have to know the URI of the route that you want to navigate to,
        only its name. Curi (using the built-in <IJS>pathname</IJS> addon), handles creating
        URI pathnames for you.
      </p>

      <PrismBlock lang='javascript'>
        {
`<Link to='About'>About</Link>
// <a href="/about">About</a>`
        }
      </PrismBlock>

      <p>
        That works well enough for simple paths, but what about paths that include params?
        For that, you need to pass an object using the <IJS>params</IJS> property. This
        object's keys should be the same as the route's expected params. The params object
        should also include the params for any parent routes.
      </p>

      <PrismBlock lang='javascript'>
        {
`{
  name: 'Album',
  path: 'a/:albumID',
  ...,
  children: [
    {
      name: 'Song',
      path: ':songID',
      ...
    }
  ]
}

<Link to='Song' params={{ albumID: 2390, songID: 7 }}>Some Song on Some Album</Link>
// <a href="/a/2390/7>Some Song on Some Album</a>`
        }
      </PrismBlock>

      <p>
        If you want to attach additional location information to a Link, you can do so
        using the <IJS>details</IJS> prop. This is an object that has any other location
        properties that you want to link to. These would be <IJS>query</IJS>, <IJS>hash</IJS>,
        and <IJS>state</IJS>.
      </p>

      <PrismBlock lang='javascript'>
        {
`<Link
  to='Song'
  params={{ albumID: 2390, songID: 8 }}
  details={{ query: { time: 17 } }}
>
  Some Song on Some Album
</Link>
// <a href="/a/2390/8?time=17>Some Song on Some Album</a>`
        }
      </PrismBlock>

      <p>
        The <IJS>children</IJS> prop has been used, but not mentioned. The contents
        of the children prop will simply be passed as the children of the anchor, the same
        as if you were to use a regular anchor. Using a regular anchor would not work
        here, though. You could hand code the URI to link to, which is half of what the
        Link does, but clicking the anchor would cause a full page reload. The Link uses
        calls the <IJS>navigate</IJS> method from your Hickory history object to allow for
        in-app navigation without reloading the page.
      </p>

      <PrismBlock lang='javascript'>
        {
`// if you render this, clicking it will reload the page
<a href="/about">About</a>

// while rendering this will not cause a reload
<Link to='About'>About</Link>
`
        }
      </PrismBlock>     
      <p>
        Both of the above elements render the same thing to the page, an anchor element,
        but the "magic" is the Link's usage of your history object.
      </p>

      <Note>
        This does not cover all of the Link props. Please check out the{' '}
        <Link
          to='Package'
          params={{ package: 'react' }}
          details={{ hash: 'Link' }}
        >Link</Link> API docs to learn more about the other props.
      </Note>
    </Section>
  </BaseGuide>
);
