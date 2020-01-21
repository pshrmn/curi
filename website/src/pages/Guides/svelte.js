import React from "react";
import { Link } from "@curi/react-dom";

import {
  TitledPlainSection,
  PlainSection,
  HashSection,
  CodeBlock,
  IJS,
  Cmp
} from "../../components/guide/common";

let meta = {
  title: "Svelte"
};

let renderingMeta = {
  title: "Rendering with the response",
  hash: "rendering-response"
};
let storeMeta = {
  title: "Store Integration",
  hash: "store",
  children: [renderingMeta]
};

let navigatingMeta = {
  title: "Navigating",
  hash: "navigating"
};

let contents = [storeMeta, navigatingMeta];

function SvelteGuide() {
  return (
    <React.Fragment>
      <TitledPlainSection title={meta.title} />

      <HashSection meta={storeMeta} tag="h2">
        <p>
          Curi's Svelte integration relies on stores and context. These are
          setup automatically if you pass a Curi router to the <IJS>Router</IJS>{" "}
          component.
        </p>

        <CodeBlock>
          {`import App from "./components/App.svelte";

let router = createRouter(browser, routes);
new App({ target, props: { router } });`}
        </CodeBlock>

        <p>
          The <IJS>Router</IJS> component makes router related data available
          throughout the application.
        </p>

        <CodeBlock lang="html">
          {`<!-- /components/App.svelte -->
<Router {router}>
  <Content />
</Router>

<script>
  import Router from "@curi/svelte/components/Router.svelte";
  import Content from "./components/Content.svelte";

  export let router;
</script>`}
        </CodeBlock>

        <p>
          Components that need to access the <IJS>router</IJS>,{" "}
          <IJS>response</IJS>, or <IJS>navigation</IJS> can do so with their
          corresponding getter functions.
        </p>

        <CodeBlock lang="html">
          {`<script>
  import { getRouter, getResponse, getNavigation } from "@curi/svelte";

  let router = getRouter();
  let response = getResponse();
  let navigation = getNavigation();
</script>`}
        </CodeBlock>

        <p>
          The <IJS>getRouter</IJS> function returns the actual router, while{" "}
          <IJS>getResponse</IJS> and <IJS>getNavigation</IJS> return stores that
          update whenever the application navigates.
        </p>

        <HashSection meta={renderingMeta} tag="h3">
          <p>
            Svelte allows you to render dynamic components using the{" "}
            <Cmp>svelte:component this</Cmp> syntax. If you set Svelte
            components as the <IJS>body</IJS> properties on your responses, you
            can combine <Cmp>svelte:component this</Cmp> and{" "}
            <IJS>response.body</IJS> to render the appropriate component for a{" "}
            <IJS>response</IJS>.
          </p>
          <p>
            A root component is a good place to perform general application
            layout, like menus, in addition to rendering the response's{" "}
            <IJS>body</IJS>.
          </p>

          <CodeBlock lang="html">
            {`<!-- components/Content.svelte -->
<header>
  <NavLinks />
</header>
<main>
  <svelte:component this={$response.body} />
</main>

<script>
  import { getResponse } from "@curi/svelte";
  import NavLinks from "./NavLinks";

  let response = getResponse();
</script>`}
          </CodeBlock>

          <p>
            If your routes use an object to attach multiple components to a
            response, splitting them apart in computed properties may give your
            templates a cleaner look.
          </p>
          <p>
            If you do attach multiple components to a response, please remember
            that you want every route to set the same <IJS>body</IJS> shape.
            Otherwise, you'll have to determine the shape and change how you
            render, which can quickly become messy.
          </p>

          <CodeBlock>
            {`let routes = prepareRoutes([
  {
    name: "Home",
    path: "",
    respond() {
      return {
        body: {
          main: HomeMain,
          menu: HomeMenu
        }
      }
    }
  },
  // ...
]);`}
          </CodeBlock>

          <CodeBlock lang="html">
            {`<header>
  <svelte:component this={menu} />
</header>
<main>
  <svelte:component this={main} />
</main>

<script>
  import { getResponse } from "@curi/svelte";

  let response = getResponse();
  $: main = $response.body.main;
  $: menu = $response.body.menu;
</script>`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={navigatingMeta} tag="h2">
        <p>
          The <IJS>Link</IJS> component is used to navigate between routes
          within an application. When it renders in the DOM, it will render as
          an anchor (<Cmp>a</Cmp>) element.
        </p>
        <p>
          The <IJS>Link</IJS>'s <IJS>name</IJS> prop describes which route
          clicking the link should navigate to. If you pass an invalid route
          name, Curi will warn you.
        </p>
        <p>
          If a route has any params (or if any of a route's ancestors have
          params for nested routes), the <IJS>params</IJS> prop is used to pass
          these to the <IJS>Link</IJS>.
        </p>

        <CodeBlock lang="html">
          {`<template>
  <nav>
    <ul>
      <li>
        <Link name="Home">Home</Link>
      </li>
      <li>
        <Link name="About">About</Link>
      </li>
      <li>
        <Link name="User" params={{ id: 'blue' }}>
          Blue
        </Link>
      </li>
    </ul>
  </nav>
</template>

<script>
  import Link from "@curi/svelte/components/Link.svelte";
</script>`}
        </CodeBlock>

        <p>
          The <IJS>Link</IJS> also takes <IJS>hash</IJS>, <IJS>query</IJS>, and{" "}
          <IJS>state</IJS> props to attach their values to the location that
          will be navigated to.
        </p>

        <CodeBlock lang="jsx">
          {`<Link name="Home" hash="details">Home</Link>
// renders
<a href="/#details">Home</a>`}
        </CodeBlock>
      </HashSection>

      <PlainSection>
        <p>
          Please check out the full{" "}
          <Link
            name="Package"
            params={{ package: "svelte", version: "v1" }}
            hash="API"
          >
            <IJS>@curi/svelte</IJS>
          </Link>{" "}
          API documentation to see every component that the package provides.
        </p>
      </PlainSection>
    </React.Fragment>
  );
}

export { SvelteGuide as component, contents };
