import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../components/PrismBlocks";
import { Note } from "../components/Messages";
import { Section, Subsection } from "../components/Sections";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <PrismBlock lang="bash">{`npm install @curi/react`}</PrismBlock>
    <Note>This guide assumes that you are already familiar with React.</Note>

    <p>
      Curi provides a number of React components through the{" "}
      <Link to="Package" params={{ package: "react" }}>
        <IJS>@curi/react</IJS>
      </Link>{" "}
      package. To get started, there are only two components that you need to be
      aware of: <Cmp>CuriProvider</Cmp> and <Cmp>Link</Cmp>.
    </p>

    <Section title={<Cmp>CuriProvider</Cmp>} id="CuriProvider">
      <p>
        In order for other components to access router-related variables, we
        need to make them available through React's <IJS>context</IJS>. The{" "}
        <Link
          to="Package"
          params={{ package: "react" }}
          details={{ hash: "CuriProvider" }}
        >
          <Cmp>CuriProvider</Cmp>
        </Link>{" "}
        component is responsible for doing this. You pass it two props: a Curi{" "}
        <IJS>router</IJS> and a <IJS>children</IJS> render function. The{" "}
        <IJS>router</IJS> will listen for new responses to be emitted and call
        the render function to re-render your application.
      </p>

      <PrismBlock lang="jsx">
        {`import { CuriProvider } from '@curi/react';

<CuriProvider router={router}>
  {render}
</CuriProvider>`}
      </PrismBlock>

      <Subsection title="The render function" id="render-fn">
        <p>
          The <IJS>children</IJS> prop is a function that will be called every
          time the <Cmp>CuriProvider</Cmp> is rendered. The render function
          should return the React elements that make up your application.
        </p>
        <p>
          The <IJS>children</IJS> render function receives an object with three
          properties to help you render your application: <IJS>response</IJS>,{" "}
          <IJS>navigation</IJS>, and <IJS>router</IJS>. The <IJS>response</IJS>{" "}
          object is the most important of these, while the others may
          occasionally be useful or you may never use them.
        </p>

        <p>
          In our routes, we can attach a <IJS>body</IJS> property to response
          objects, which we can then use in a <IJS>render</IJS> function.
        </p>

        <PrismBlock lang="javascript">
          {`import Home from './components/Home';

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
  ...
]`}
        </PrismBlock>
        <PrismBlock lang="javascript">
          {`function render({ response }) {
  const { body:Body } = response;
  return <Body />;
}`}
        </PrismBlock>
        <Note>
          We rename "body" to "Body" so that the JSX is{" "}
          <a href="https://facebook.github.io/react/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized">
            transformed properly
          </a>.
        </Note>

        <p>
          When no routes match, the body property of a response is{" "}
          <IJS>undefined</IJS>. The best way to deal with this is with a catch
          all route.
        </p>

        <PrismBlock lang="javascript">
          {`import NotFound from './components/NotFound';

const routes = [
  // ...,
  {
    name: 'Not Found',
    path: '(.*)' // this path matches EVERY pathname
    match: {
      response({ set }) {
        set.body(NotFound);
      }
    }
  }
];`}
        </PrismBlock>

        <p>
          Finally, you can pass any props that you want to the <Cmp>Body</Cmp>{" "}
          component. Generally speaking, it is useful to pass the entire{" "}
          <IJS>response</IJS> object. You can review all of the response
          properties in the{" "}
          <Link
            to="Guide"
            params={{ slug: "responses" }}
            details={{ hash: "properties" }}
          >
            Rendering with Responses
          </Link>{" "}
          guide.
        </p>

        <PrismBlock lang="javascript">
          {`function render({ response }) {
  const { body:Body } = response;
  return <Body response={response} />;
}`}
        </PrismBlock>
      </Subsection>
    </Section>

    <Section title={<Cmp>Link</Cmp>} id="link">
      <p>
        A single page application isn't very useful if you cannot navigate
        between locations. The{" "}
        <Link
          to="Package"
          params={{ package: "react" }}
          details={{ hash: "Link" }}
        >
          <Cmp>Link</Cmp>
        </Link>{" "}
        component provides you with an easy way to do this by rendering anchor (<Cmp
        >
          a
        </Cmp>) elements.
      </p>

      <PrismBlock lang="jsx">
        {`import { Link } from '@curi/react'
<Link to='Home'>Home</Link>`}
      </PrismBlock>

      <p>
        The most important prop of the <Cmp>Link</Cmp> is <IJS>to</IJS>. This
        value should be the name of the route that you want to navigate to. For
        instance, take about following route:
      </p>

      <PrismBlock lang="javascript">
        {`{
  name: 'About',
  path: 'about',
  ...
}
`}
      </PrismBlock>
      <p>
        If you were to render a Link whose to property is <IJS>"About"</IJS>,
        then it would render an anchor whose <IJS>href</IJS> attribute is{" "}
        <IJS>/about</IJS>. The great thing about this is that you don't have to
        know the URI of the route that you want to navigate to, only its name
        because Curi handles creating URI pathnames for you.
      </p>

      <PrismBlock lang="jsx">
        {`<Link to='About'>About</Link>
// <a href="/about">About</a>`}
      </PrismBlock>

      <p>
        That works well enough for simple paths, but what about paths that
        include params? For that, you need to pass an object using the{" "}
        <IJS>params</IJS> property. This object's keys should be the same as the
        route's expected params. The params object should also include the
        params for any parent routes.
      </p>

      <PrismBlock lang="jsx">
        {`{
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

<Link to='Song' params={{ albumID: 2390, songID: 7 }}>
  Some Song on Some Album
</Link>
// <a href="/a/2390/7>Some Song on Some Album</a>`}
      </PrismBlock>

      <p>
        If you want to attach additional location information to a Link, you can
        do so using the <IJS>details</IJS> prop. This is an object that has any
        other location properties that you want to link to. These would be{" "}
        <IJS>query</IJS>, <IJS>hash</IJS>, and <IJS>state</IJS>.
      </p>

      <PrismBlock lang="jsx">
        {`<Link
  to='Song'
  params={{ albumID: 2390, songID: 8 }}
  details={{ query: { time: 17 } }}
>
  Some Song on Some Album
</Link>
// <a href="/a/2390/8?time=17>Some Song on Some Album</a>`}
      </PrismBlock>

      <p>
        The <IJS>children</IJS> prop will simply be passed as the children of
        the anchor, the same as if you were to use a regular anchor.
      </p>
      <Subsection title="Why not an anchor?" id="why-link">
        <p>
          We use a <Cmp>Link</Cmp> because a regular anchor would not work here.
          Clicking the anchor would cause a full page reload. The{" "}
          <Cmp>Link</Cmp> uses calls the <IJS>navigate</IJS> method from your
          Hickory history object to allow for in-app navigation without
          reloading the page.
        </p>

        <PrismBlock lang="jsx">
          {`// if you render this, clicking it will reload the page
<a href="/about">About</a>

// while rendering this will not cause a reload
<Link to='About'>About</Link>
`}
        </PrismBlock>
        <p>
          Both of the above elements render the same thing to the page, an
          anchor element, but the "magic" is the Link's usage of your history
          object.
        </p>
      </Subsection>

      <Note>
        This does not cover all of the Link props. Please check out the{" "}
        <Link
          to="Package"
          params={{ package: "react" }}
          details={{ hash: "Link" }}
        >
          Link
        </Link>{" "}
        API docs to learn more about the other props.
      </Note>
    </Section>
    <p>
      The above guide should cover what you need to know to get started with
      using Curi and React. However, there are also more React components that
      you might find useful. You can read more about them in the{" "}
      <Link to="Package" params={{ package: "react" }}>
        <IJS>@curi/react</IJS>
      </Link>{" "}
      documentation.
    </p>
  </BaseGuide>
);
