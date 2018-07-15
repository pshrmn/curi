import React from "react";
import { Link } from "@curi/react";

import Content from "../../components/Content";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/PrismBlocks";
import {
  SideBySide,
  Explanation,
  CodeBlock
} from "../../components/SideBySide";

export default () => (
  <Content>
    <h1>Curi is a JavaScript router for single-page applications</h1>
    <p>Curi cares about routing, not how you render.</p>
    <SideBySide>
      <Explanation>
        <p>
          A router has two main pieces: a <IJS>history</IJS> object for
          controlling navigation and a <IJS>routes</IJS> array of the valid
          routes for an application.
        </p>
      </Explanation>
      <CodeBlock>
        {`import Browser from '@hickory/browser';

const history = Browser();
const routes = [
  { name: 'Home', path: '', ... },
  { name: 'User', path: 'u/:userID', ... },
  // ...
  { name: 'Not Found', path: '(.*)', ... }
];`}
      </CodeBlock>
    </SideBySide>
    <SideBySide>
      <Explanation>
        <p>
          A router is created by passing the <IJS>history</IJS> and{" "}
          <IJS>routes</IJS> to the <IJS>curi</IJS> function from the{" "}
          <Link to="Package" params={{ package: "router" }}>
            <IJS>@curi/router</IJS>
          </Link>{" "}
          package.
        </p>
      </Explanation>
      <CodeBlock>
        {`import { curi } from '@curi/router';

const router = curi(history, routes);`}
      </CodeBlock>
    </SideBySide>

    <SideBySide>
      <Explanation>
        <p>How you render depends on what framework you are using.</p>
      </Explanation>
    </SideBySide>
    <SideBySide>
      <Explanation>
        <p>
          For{" "}
          <Link to="Package" params={{ package: "react" }}>
            React
          </Link>{" "}
          applications, you would use the <Cmp>CuriProvider</Cmp>, which
          automatically re-renders your application after navigation. This works
          with both React DOM and React Native.
        </p>
      </Explanation>
      <CodeBlock lang="jsx">
        {`import { CuriProvider } from "@curi/react";
        
ReactDOM.render((
  <CuriProvider router={router}>
    {({ response }) => {
      const { body:Body } = response;
      return <Body response={response} />;
    }}
  </CuriProvider>
), holder);`}
      </CodeBlock>
    </SideBySide>
    <SideBySide>
      <Explanation>
        <p>
          With{" "}
          <Link to="Package" params={{ package: "vue" }}>
            Vue
          </Link>, the <IJS>CuriPlugin</IJS> sets up responsive rendering.
        </p>
      </Explanation>
      <CodeBlock lang="jsx">
        {`import { CuriPlugin } from "@curi/vue";
        
Vue.use(CuriPlugin, { router });
const vm = new Vue({
  el: '#root',
  template: '<app />',
  components: { app }
});

// app.html
<template>
  <component
    :is="$curi.response.body"
    :response="$curi.response"
  />
</template>`}
      </CodeBlock>
    </SideBySide>
    <SideBySide>
      <Explanation>
        <p>
          <Link to="Package" params={{ package: "svelte" }}>
            Svelte
          </Link>{" "}
          apps can use the store to interact with the router. The store is
          automatically updated after navigation to trigger re-renders.
        </p>
      </Explanation>
      <CodeBlock lang="jsx">
        {`import { curiStore } from "@curi/svelte";
const store = curiStore(router);

const view = new app({ target, store });

// app.html
<svelte:component
  this={$curi.response.body}
  response={$curi.response}
/>`}
      </CodeBlock>
    </SideBySide>
    <SideBySide>
      <Explanation>
        <p>
          While React, Vue, and Svelte are currently the only frameworks with
          "official" packages, with a little work Curi can work with most
          frameworks (and vanilla JavaScript)!
        </p>
      </Explanation>
    </SideBySide>
    <SideBySide>
      <Explanation>
        <p>
          Ready to learn more? Check out the{" "}
          <Link to="Guide" params={{ slug: "getting-started" }}>
            getting started
          </Link>{" "}
          guide.
        </p>
      </Explanation>
    </SideBySide>
  </Content>
);
