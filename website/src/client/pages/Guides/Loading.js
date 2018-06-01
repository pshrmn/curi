import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/PrismBlocks";
import { Note } from "../../components/Messages";
import { Section } from "../../components/Sections";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>
    <SideBySide>
      <Explanation>
        <p>
          In the code splitting guide, we used the <IJS>on.initial()</IJS>{" "}
          property of routes. Routes also have <IJS>on.every()</IJS> and{" "}
          <IJS>response()</IJS> properties. While <IJS>initial</IJS>is only
          called the first time a route matches, <IJS>on.every()</IJS> and{" "}
          <IJS>response()</IJS> are called every time a route matches.
        </p>
      </Explanation>
    </SideBySide>

    <Section title="every" id="every">
      <SideBySide>
        <Explanation>
          <p>
            <IJS>on.every()</IJS> is where you should perform any data loading
            for the matched route.
          </p>
          <p>
            When the <IJS>Recipe</IJS> route matches, we want to fetch data for
            that specific recipe (using the <IJS>id</IJS> param from the path).
          </p>
        </Explanation>
        <CodeBlock>
          {`const routes = [
  {
    name: 'Recipe',
    path: 'recipe/:id'
  }
];`}
        </CodeBlock>
      </SideBySide>

      <SideBySide>
        <Explanation>
          <p>
            The <IJS>every</IJS> function will be passed a "route" object that
            contains the matched route response properties, including the route{" "}
            <IJS>params</IJS>.
          </p>
          <p>
            <IJS>on.every()</IJS> is expected to return a Promise.
          </p>
          <p>
            Now, when we navigate to <IJS>/recipe/chocolate-chip-cookies</IJS>,
            the <IJS>every</IJS> function will call the fake API function to
            load the <IJS>"chocolate-chip-cookies"</IJS> recipe. The function
            will resolve with the loaded data.
          </p>
        </Explanation>
        <CodeBlock>
          {`{
  name: 'Recipe',
  path: 'recipe/:id',
  on: {
    every: ({ params }) => fakeAPI.getRecipe(params.id)
  }
}`}
        </CodeBlock>
      </SideBySide>
    </Section>

    <Section title="response" id="response">
      <SideBySide>
        <Explanation>
          <p>
            While <IJS>on.every()</IJS> starts our data loading, it doesn't
            actually do anything. Instead, we should handle any loaded data with
            the <IJS>response()</IJS> function.
          </p>

          <p>
            The <IJS>response()</IJS> and <IJS>on.every()</IJS> are separate
            because while a route is resolving, the user may navigate again,
            which overrides the current navigation. We cannot cancel the{" "}
            <IJS>on.every()</IJS> function for the current navigation, so if it
            performs any side effects, our application is stuck with them. To
            avoid this, the <IJS>response()</IJS> function is not called until
            we know that the current navigation will complete.
          </p>

          <p>
            The <IJS>response()</IJS> function will receive an object with a
            number of properties. These are covered in detail in the{" "}
            <Link to="Guide" params={{ slug: "routes" }} hash="response">
              All About Routes
            </Link>{" "}
            guide. The function returns an object with values that will modify
            the response.
          </p>

          <p>
            Here, we will be using the <IJS>resolved</IJS> object to modify the
            response's <IJS>data</IJS>
          </p>
        </Explanation>
        <CodeBlock>
          {`{
  name: 'Recipe',
  path: 'recipe/:id',
  response({ resolved }) {
    return {
      body: Recipe,
      data: resolved.every
    }
  },
  on: {
    every: ({ params }) => fakeAPI.getRecipe(params.id),
  }
}`}
        </CodeBlock>
      </SideBySide>

      <SideBySide>
        <Explanation>
          <p>
            If at some point in time we decide that we want to change our URI
            pathname structure, we can also use the <IJS>response()</IJS>{" "}
            function to redirect.
          </p>

          <p>
            You can specify the route to redirect to with <IJS>redirectTo</IJS>.
            This takes the <IJS>name</IJS> of the route to redirect to,{" "}
            <IJS>params</IJS> if the route (or ancestor routes) have route
            params. <IJS>hash</IJS>, <IJS>query</IJS>, and <IJS>state</IJS> can
            also be provided.
          </p>
          <p>
            After Curi emits the response, it will also automatically redirect
            to the new location!
          </p>
        </Explanation>
        <CodeBlock>
          {`{
  name: 'Old Recipe',
  path: 'r/:id',
  response: ({ params }) => {
    // destructure the current location to preserve
    // query/hash values
    return {
      redirectTo: {
        name: 'Recipe',
        params: params,
        hash: location.hash
      }
    };
  }
}`}
        </CodeBlock>
      </SideBySide>
    </Section>
    <p>
      <IJS>every</IJS> and <IJS>response</IJS> offer a convenient way to do data
      loading prior to actually rendering the route, but please remember that
      your application will not be re-rendering until <em>after</em> the
      fetching has resolved. If you have a long running load function, you may
      wish to implement some sort of loading display. The{" "}
      <Link to="Example" params={{ category: "react", slug: "data-loading" }}>
        data loading example
      </Link>{" "}
      shows one approach to how to do this.
    </p>
  </BaseGuide>
);
