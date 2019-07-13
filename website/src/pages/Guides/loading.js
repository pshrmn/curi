import React from "react";
import { Link } from "@curi/react-dom";

import {
  TitledPlainSection,
  PlainSection,
  HashSection,
  CodeBlock,
  IJS
} from "../../components/guide/common";

const meta = {
  title: "Loading Route Data"
};

const resolveMeta = {
  title: "resolve",
  hash: "resolve"
};
const responseMeta = {
  title: "response",
  hash: "response"
};

const contents = [resolveMeta, responseMeta];

function LoadingGuide() {
  return (
    <React.Fragment>
      <TitledPlainSection title={meta.title}>
        <p>
          In the code splitting guide, we added a function that uses dynamic{" "}
          <IJS>import</IJS> in a route's <IJS>resolve</IJS> function to
          dynamically load modules. We can do the same thing for other data.
        </p>
      </TitledPlainSection>

      <HashSection meta={resolveMeta} tag="h2">
        <p>
          An async function (with any name you want it to have) can be added to
          the <IJS>resolve</IJS> function and the value it resolves will be
          available in the route's <IJS>respond</IJS> function.
        </p>

        <p>
          When the <IJS>Recipe</IJS> route matches, we want to fetch data for
          that specific recipe (using the <IJS>id</IJS> param from the path).
        </p>

        <CodeBlock>
          {`const routes = prepareRoutes([
  {
    name: 'Recipe',
    path: 'recipe/:id'
  }
]);`}
        </CodeBlock>

        <p>
          The <IJS>resolve</IJS> function is passed an object that contains the
          matched route response properties, including the route{" "}
          <IJS>params</IJS>.
        </p>

        <p>
          Now, when we navigate to <IJS>/recipe/cookies</IJS>, the{" "}
          <IJS>resolve</IJS> function will call the fake API function to load
          the <IJS>"cookies"</IJS> recipe. The function will resolve with the
          loaded data.
        </p>

        <CodeBlock>
          {`{
  name: 'Recipe',
  path: 'recipe/:id',
  resolve({ params }) {
    return fakeAPI.getRecipe(params.id);
  }
}`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={responseMeta} tag="h2">
        <p>
          While <IJS>resolve</IJS> starts our data loading, it doesn't actually
          do anything. Instead, we should handle any loaded data with the{" "}
          <IJS>respond</IJS> function.
        </p>

        <p>
          The <IJS>respond</IJS> and <IJS>resolve</IJS> functions are separate
          because while a route is resolving, the user may navigate again, which
          overrides the current navigation. We cannot cancel the{" "}
          <IJS>resolve</IJS> function for the current navigation, so if it
          performs any side effects, our application is stuck with them. To
          avoid this, the <IJS>respond</IJS> function is not called until we
          know that the current navigation will complete.
        </p>

        <p>
          The <IJS>respond</IJS> function will receive an object with a number
          of properties. These are covered in in the{" "}
          <Link
            name="Guide"
            params={{ slug: "routes-and-responses" }}
            hash="route-response"
          >
            Routes and Responses
          </Link>{" "}
          guide, but the only one we care about right now is <IJS>resolved</IJS>
          .
        </p>

        <CodeBlock>
          {`{
  name: 'Recipe',
  path: 'recipe/:id',
  resolve({ params }) {
    return fakeAPI.getRecipe(params.id);
  },
  respond({ resolved }) {
    return {
      body: Recipe,
      data: resolved.data
    }
  }
}`}
        </CodeBlock>

        <p>
          If at some point in time we decide that we want to change our URI
          pathname structure, we can also use the <IJS>respond</IJS> function to
          redirect.
        </p>

        <p>
          You can specify the route to redirect to with <IJS>redirect</IJS>.
          This takes the <IJS>name</IJS> of the route to redirect to,{" "}
          <IJS>params</IJS> if the route (or ancestor routes) have route params.{" "}
          <IJS>hash</IJS>, <IJS>query</IJS>, and <IJS>state</IJS> can also be
          provided.
        </p>
        <p>
          After Curi emits the response, it will also automatically redirect to
          the new location!
        </p>

        <CodeBlock>
          {`{
  name: 'Old Recipe',
  path: 'r/:id',
  respond: ({ params }) => {
    // destructure the current location to preserve
    // query/hash values
    return {
      redirect: {
        name: 'Recipe',
        params: params,
        hash: location.hash
      }
    };
  }
}`}
        </CodeBlock>
      </HashSection>

      <PlainSection>
        <p>
          A route's <IJS>resolve</IJS> and <IJS>respond</IJS> functions offer a
          convenient way to do data loading prior to actually rendering the
          route, but please remember that your application will not be
          re-rendering until <em>after</em> the fetching has resolved. If you
          have a long running load function, you may wish to implement some sort
          of loading display to let the user know that something is happening.
          The{" "}
          <Link name="Example" params={{ slug: "async" }}>
            async examples
          </Link>{" "}
          shows one approach to how to do this.
        </p>
      </PlainSection>
    </React.Fragment>
  );
}

export { LoadingGuide as component, contents };
