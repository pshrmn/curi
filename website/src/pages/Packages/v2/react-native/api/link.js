import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
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
        A <IJS>Link</IJS> is used for navigating within your application. By
        default, this will render a <IJS>TouchableHighlight</IJS>. When the
        rendered element is pressed, it will use the router to navigate.
      </Paragraph>

      <Paragraph>
        With the <IJS>Link</IJS>, instead of providing a URI to navigate to, you
        specify the name of the route that you want to link to. Then, the
        pathname of the URI you want the component to link to will be
        automatically generated for you.
      </Paragraph>

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
          <Paragraph>
            The name of the route that the <IJS>Link</IJS> should navigate to
            when it is pressed.
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
          <Paragraph>
            A valid React Node (e.g. a React element, a string, or{" "}
            <IJS>null</IJS>).
          </Paragraph>

          <CodeBlock lang="jsx">
            {`// a React node
<Link name="Home">
  <Text>Home</Text>
</Link>`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "anchor", hash: "Link-anchor" }}>
          <Paragraph>
            A <IJS>Link</IJS> renders a <IJS>TouchableHighlight</IJS> element by
            default, but this can be changed using the <IJS>anchor</IJS> prop.
            This can be useful for using styled components.
          </Paragraph>

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

        <HashSection tag="h4" meta={{ title: "rest", hash: "Link-rest" }}>
          <Paragraph>
            Any additional props attached to the <IJS>Link</IJS> will be
            attached to the element rendered by the <IJS>Link</IJS>.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`<Link
  name="Home"
  style={{ ... }}
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
