import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp,
  Note
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
        A <IJS>Link</IJS> is used for navigating within your application. By
        default, this will render a <IJS>TouchableHighlight</IJS>, but you can
        also provide another component. When the rendered element is touched, it
        will use the router's <IJS>history</IJS> object to change locations,
        which will trigger a re-render.
      </p>

      <p>
        With the <IJS>Link</IJS>, instead of providing a URI to navigate to, you
        specify the name of the route that you want to link to. Then, the
        pathname of the URI you want the component to link to will be
        automatically generated for you.
      </p>

      <CodeBlock lang="jsx">
        {`import { Link } from '@curi/react-native';

<Link name='User' params={{ id: 16 }}>
  <Text>User 16</Text>
</Link>
// <TouchableHighlight>
//   <Text>User 16</Text>
// </TouchableHighlight>`}
      </CodeBlock>

      <HashSection tag="h3" meta={propsMeta}>
        <HashSection tag="h4" meta={{ title: "name", hash: "Link-to" }}>
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
  name="Products"
  params={{ type: "vacuums" }}
  hash="iroomba"
  query="volume=loud"
  state={{ owner: "Tom Haverford" }}
>
  DJ Roomba
</Link>`}
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
  <Text>Home</Text>
</Link>

// a render-invoked function
<Link name="User" params={{ id: 1 }}>
  {navigating => (
    <React.Fragment>
      <Text>User 1</Text>
      {navigating ? <Spinner /> : null}
    </React.Fragment>
  )}
</Link>`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "anchor", hash: "Link-anchor" }}>
          <p>
            By default, when you render a <IJS>Link</IJS>, a{" "}
            <IJS>TouchableHighlight</IJS> element will be rendered.{" "}
            <IJS>anchor</IJS> lets you provide your own component to be rendered
            instead.
          </p>

          <CodeBlock lang="jsx">
            {`<Link
  name="User"
  params={{ id: 16 }}
  anchor={TouchableOpacity}
>
<Text>User 16</Text>
</Link>
// <TouchableOpacity>
//   <Text>User 16</Text>
// </TouchableOpacity>`}
          </CodeBlock>
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
    style: {...}
  }}
>
  <Text>Home</Text>
</Link>
// <TouchableOpacity style={{...}}>
//   <Text>Home</Text>
// </TouchableOpacity>`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
