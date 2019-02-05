import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp,
  Note,
  Warning
} from "../../../../../components/package/common";

const propsMeta = {
  title: "Props",
  hash: "Link-props"
};
export const meta = {
  title: "<Link>",
  hash: "Link",
  children: [propsMeta]
};

export function LinkAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        A <IJS>Link</IJS> is for navigating within your application using an
        anchor element (<Cmp>a</Cmp>). When the rendered element is clicked,
        instead of reloading the page it will use your router object's history
        object to navigate.
      </p>

      <p>
        With the <IJS>Link</IJS>, instead of providing a URI to navigate to, you
        specify the name of the route that you want to link to. Then, the
        pathname of the URI you want the component to link to will be
        automatically generated for you.
      </p>

      <CodeBlock lang="jsx">
        {`import { Link } from '@curi/react-dom';

<Link name='User' params={{ id: 16 }}>User 16</Link>
// <a href='/user/16'>User 16</a>`}
      </CodeBlock>

      <HashSection tag="h3" meta={propsMeta}>
        <HashSection tag="h4" meta={{ title: "name", hash: "Link-name" }}>
          <p>The name of the route that you want to navigate to.</p>
          <p>
            If <IJS>name</IJS> is not provided, the <IJS>Link</IJS> will re-use
            the current location's <IJS>pathname</IJS>. This is useful for
            linking to hashes within the current page.
          </p>

          <CodeBlock lang="jsx">
            {`// Home route is { name: "Home", path: "" }
<Link name="Home">Home</Link>`}
          </CodeBlock>

          <Note>
            <p>
              The <IJS>name</IJS> prop is a replacement for the <IJS>to</IJS>{" "}
              prop from previous versions. You can continue to use <IJS>to</IJS>{" "}
              in <IJS>@curi/react-dom</IJS> v1, but it will be removed in v2.
            </p>
          </Note>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "params", hash: "Link-params" }}>
          <p>
            If the route that you want to navigate to (or any of its parents)
            include path parameters, you can specify them using the params prop.
          </p>

          <CodeBlock lang="jsx">
            {`// User route is { name: 'User', path: '/user/:id' }
<Link name='User' params={{ id: 16 }}>User 16</Link>`}
          </CodeBlock>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{
            title: "hash, query & state",
            hash: "Link-hash-query-state"
          }}
        >
          <p>
            While the pathname of the location to navigate to will be generated
            for you, this does not cover over location properties (query, hash,
            and state). The <IJS>query</IJS>, <IJS>hash</IJS>, and{" "}
            <IJS>state</IJS> props are used to pass these values.
          </p>

          <CodeBlock lang="jsx">
            {`<Link
  name='Products'
  params={{ type: 'vacuums' }}
  hash="iroomba"
  query="volume=loud"
  state={{ owner: "Tom Haverford" }}
>
  DJ Roomba
</Link>

// <a href="products/vacuums?volume=loud#iroomba">
//  DJ Roomba
// </a>`}
          </CodeBlock>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "children", hash: "Link-children" }}
        >
          <p>
            The <IJS>children</IJS> prop can take two forms: either a valid
            React Node (e.g. a React element, a string, or <IJS>null</IJS>) or a
            render-invoked <IJS>children</IJS> function.
          </p>
          <p>
            The render-invoked <IJS>children</IJS> function will be called with
            the <IJS>Link</IJS>'s navigation state. The navigation state is{" "}
            <IJS>false</IJS> to start, <IJS>true</IJS> when the <IJS>Link</IJS>{" "}
            is clicked, and <IJS>false</IJS> when the the navigation finishes/is
            cancelled.
          </p>

          <CodeBlock lang="jsx">
            {`// a React node
<Link name="Home">
  Home
</Link>

// a render-invoked function
<Link name="User" params={{ id: 1 }}>
  {navigating => (
    <React.Fragment>
      User 1
      {navigating ? <Spinner /> : null}
    </React.Fragment>
  )}
</Link>`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "anchor", hash: "Link-anchor" }}>
          <p>
            By default, when you render a <IJS>Link</IJS>, an anchor element
            will be rendered. <IJS>anchor</IJS> lets you provide your own
            component to be rendered instead. This can be useful for using
            styled components to navigate.
          </p>
          <Warning>
            <p>
              You can provide any component that you want, but you{" "}
              <em>should</em> stick with an anchor (or a component that renders
              an anchor). There are accessibility issues that will occur when
              you use other DOM elements as links. The component's prop type is
              func in an attempt to discourage you from making your link render
              a button, div, span, etc.
            </p>
          </Warning>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "forward", hash: "Link-forward" }}>
          <p>
            The <IJS>forward</IJS> prop is an object of props to pass on to the
            rendered anchor component.
          </p>

          <CodeBlock lang="jsx">
            {`<Link
  name="Home"
  forward={{
    className: "home"
  }}
>Home</Link>
// <a href="/" class="home">Home</a>`}
          </CodeBlock>

          <Note>
            <p>
              Previously, any extra props passed to a <IJS>Link</IJS> would be
              forwarded to the anchor component. This behavior is now deprecated
              and will be removed in <IJS>@curi/react-native</IJS> v2. Please
              use the <IJS>forward</IJS> prop instead.
            </p>
          </Note>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
