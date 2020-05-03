import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS,
  Cmp,
  Warning
} from "../../../../../components/package/common";

let propsMeta = {
  title: "Props",
  hash: "Link-props"
};
export let meta = {
  title: "Link",
  hash: "Link"
};

export function LinkAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        A <IJS>Link</IJS> is use for in-app navigation. By default, the
        component renders an anchor element (<Cmp>a</Cmp>). When the rendered
        element is clicked, instead of reloading the page it will use the router
        to navigate.
      </Paragraph>

      <Paragraph>
        With the <IJS>Link</IJS>, instead of providing a URI to navigate to, you
        specify the name of the route that you want to link to. The pathname of
        the URI you want the component to link to will be automatically
        generated for you.
      </Paragraph>

      <CodeBlock lang="jsx">
        {`import { Link } from '@curi/react-dom';

<Link name='User' params={{ id: 16 }}>User 16</Link>
// <a href='/user/16'>User 16</a>`}
      </CodeBlock>

      <HashSection tag="h3" meta={propsMeta}>
        <HashSection tag="h4" meta={{ title: "name", hash: "Link-name" }}>
          <Paragraph>
            The name of the route that the <IJS>Link</IJS> should navigate to
            when it is clicked.
          </Paragraph>

          <Paragraph>
            To navigate within the same location, the <IJS>name</IJS> can be
            skipped. This is useful for linking to hashes within the current
            page.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`// Home route is { name: "Home", path: "" }
<Link name="Home">Home</Link>`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "params", hash: "Link-params" }}>
          <Paragraph>
            If the named route (or any of its parents) include path parameters,
            they must be provided using the <IJS>params</IJS> prop.
          </Paragraph>

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
          <Paragraph>
            The <IJS>query</IJS>, <IJS>hash</IJS>, and <IJS>state</IJS> values
            for the location to navigate to.
          </Paragraph>

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
          <Paragraph>
            A valid React Node (e.g. a React element, a string, or{" "}
            <IJS>null</IJS>).
          </Paragraph>
          <CodeBlock lang="jsx">
            {`// a React node
<Link name="Home">
  Home
</Link>`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "anchor", hash: "Link-anchor" }}>
          <Paragraph>
            A <IJS>Link</IJS> renders an anchor element by default, but this can
            be changed using the <IJS>anchor</IJS> prop. This can be useful for
            using styled components.
          </Paragraph>
          <Warning>
            <Paragraph>
              You can provide any component that you want, but you{" "}
              <em>should</em> stick with an anchor (or a component that renders
              an anchor). There are accessibility issues that will occur when
              you use other DOM elements, such as a div or a button, as links.
            </Paragraph>
          </Warning>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "rest", hash: "Link-rest" }}>
          <Paragraph>
            Any additional props attached to the <IJS>Link</IJS> will be
            attached to the element rendered by the <IJS>Link</IJS>.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`<Link
  name="Home"
  className="home"
>
  Home
</Link>
// <a href="/" class="home">Home</a>`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
