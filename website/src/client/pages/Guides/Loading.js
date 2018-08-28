import React from "react";
import { Link } from "@curi/react-dom";

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
          In the code splitting guide, we added a function that calls{" "}
          <IJS>import()</IJS> to a route's <IJS>match</IJS> object in order to
          dynamically load modules. We can do the same thing for other data.
        </p>
      </Explanation>
    </SideBySide>

    <Section title="match" id="match">
      <SideBySide>
        <Explanation>
          <p>
            An async function (with any name you want it to have) can be added
            to the <IJS>match</IJS> object and the value it resolves will be
            available in the route's <IJS>response()</IJS> function (as a
            property of the <IJS>resolved</IJS> object).
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
            Here, we will name the match function for fetching data{" "}
            <IJS>"data"</IJS>.
          </p>
          <p>
            The <IJS>match.data()</IJS> function will be passed an object that
            contains the matched route response properties, including the route{" "}
            <IJS>params</IJS>.
          </p>
          <p>
            All <IJS>match</IJS> functions are expected to return a Promise.
          </p>
          <p>
            Now, when we navigate to <IJS>/recipe/chocolate-chip-cookies</IJS>,
            the <IJS>match.data()</IJS> function will call the fake API function
            to load the <IJS>"chocolate-chip-cookies"</IJS> recipe. The function
            will resolve with the loaded data.
          </p>
        </Explanation>
        <CodeBlock>
          {`{
  name: 'Recipe',
  path: 'recipe/:id',
  match: {
    data: ({ params }) => fakeAPI.getRecipe(params.id)
  }
}`}
        </CodeBlock>
      </SideBySide>
    </Section>

    <Section title="response" id="response">
      <SideBySide>
        <Explanation>
          <p>
            While <IJS>match.data()</IJS> starts our data loading, it doesn't
            actually do anything. Instead, we should handle any loaded data with
            the <IJS>response()</IJS> function.
          </p>

          <p>
            The <IJS>response()</IJS> and <IJS>match.data()</IJS> are separate
            because while a route is resolving, the user may navigate again,
            which overrides the current navigation. We cannot cancel the{" "}
            <IJS>match.data()</IJS> function for the current navigation, so if
            it performs any side effects, our application is stuck with them. To
            avoid this, the <IJS>response()</IJS> function is not called until
            we know that the current navigation will complete.
          </p>

          <p>
            The <IJS>response()</IJS> function will receive an object with a
            number of properties. These are covered in in the{" "}
            <Link
              to="Guide"
              params={{ slug: "routes-and-responses" }}
              hash="route-response"
            >
              Routes and Responses
            </Link>{" "}
            guide, but the only one we care about right now is{" "}
            <IJS>resolved</IJS>.
          </p>
        </Explanation>
        <CodeBlock>
          {`{
  name: 'Recipe',
  path: 'recipe/:id',
  match: {
    data: ({ params }) => fakeAPI.getRecipe(params.id),
  },
  response({ resolved }) {
    return {
      body: Recipe,
      data: resolved.data
    }
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
      A route's <IJS>match</IJS> and <IJS>response()</IJS> functions offer a
      convenient way to do data loading prior to actually rendering the route,
      but please remember that your application will not be re-rendering until{" "}
      <em>after</em> the fetching has resolved. If you have a long running load
      function, you may wish to implement some sort of loading display. The{" "}
      <Link to="Example" params={{ category: "react", slug: "data-loading" }}>
        data loading example
      </Link>{" "}
      shows one approach to how to do this.
    </p>
  </BaseGuide>
);
