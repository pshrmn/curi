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

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      In the code splitting guide, we used the <IJS>on.initial()</IJS> property
      of routes. Routes also have <IJS>on.every()</IJS> and{" "}
      <IJS>response()</IJS> properties. While <IJS>initial</IJS>is only called
      the first time a route matches, <IJS>on.every()</IJS> and{" "}
      <IJS>response()</IJS> are called every time a route matches.
    </p>

    <Section title="every" id="every">
      <p>
        <IJS>on.every()</IJS> is where you should perform any data loading for
        the matched route.
      </p>

      <PrismBlock lang="javascript">
        {`const routes = [
  {
    name: 'Recipe',
    path: 'recipe/:id'
  }
];`}
      </PrismBlock>

      <p>
        When the <IJS>Recipe</IJS> route matches, we want to fetch data for that
        specific recipe (using the <IJS>id</IJS> param from the path).
      </p>

      <p>
        The <IJS>every</IJS> function will be passed a "route" object that
        contains <IJS>params</IJS>, <IJS>location</IJS> and <IJS>name</IJS>{" "}
        properties. Between those properties, you should be able to create any
        data API requests.
      </p>
      <p>
        Just like the <IJS>on.initial()</IJS> function, <IJS>on.every()</IJS> is
        expected to return a Promise.
      </p>
      <PrismBlock lang="javascript">
        {`{
  name: 'Recipe',
  path: 'recipe/:id',
  on: {
    every: ({ params }) => fakeAPI.getRecipe(params.id)
  }
}`}
      </PrismBlock>

      <p>
        Now, when we navigate to <IJS>/recipe/chocolate-chip-cookies</IJS>, our{" "}
        <IJS>every</IJS> function will call the fake API function to load the
        recipe. The function will resolve with the loaded data.
      </p>
    </Section>

    <Section title="response" id="response">
      <p>
        While <IJS>on.every()</IJS> starts our data loading, it doesn't actually
        do anything. Instead, we should handle any loaded data with the{" "}
        <IJS>response()</IJS> function.
      </p>

      <p>
        The <IJS>response()</IJS> and <IJS>on.every()</IJS> are separate because
        while a route is resolving, the user may navigate again, which overrides
        the current navigation. We cannot cancel the <IJS>on.every()</IJS>{" "}
        function for the current navigation, so if it performs any side effects,
        our application is stuck with them. To avoid this, the{" "}
        <IJS>response()</IJS> function is not called until we know that the
        current navigation will complete.
      </p>

      <p>
        The <IJS>response()</IJS> function will receive an object with a number
        of properties. These are covered in detail in the{" "}
        <Link
          to="Guide"
          params={{ slug: "routes" }}
          details={{ hash: "response" }}
        >
          All About Routes
        </Link>{" "}
        guide.
      </p>

      <p>
        Here, we will be using the <IJS>resolved</IJS> and <IJS>set</IJS>{" "}
        properties. We will use <IJS>set.data</IJS> to attach the data loaded
        from our API to our response. Calling <IJS>set.data</IJS> will set the{" "}
        <IJS>data</IJS> property of the response object.
      </p>

      <PrismBlock lang="javascript">
        {`{
  name: 'Recipe',
  path: 'recipe/:id',
  response({ set, resolved }) {                                                                                                                                   : ({ resolved, set }) => {
    set.data(resolved);
    set.body(Recipe);
  },
  on: {
    every: ({ params }) => fakeAPI.getRecipe(params.id),
  }
}`}
      </PrismBlock>

      <p>
        If at some point in time we decide that we want to change our URI
        pathname structure, we can also use the <IJS>response()</IJS> function
        to redirect.
      </p>

      <p>
        By calling the <IJS>set.redirect</IJS> method, you can specify the route
        that we should redirect to.
      </p>

      <PrismBlock lang="javascript">
        {`{
  name: 'Old Recipe',
  path: 'r/:id',
  response: ({ route, set }) => {
    // destructure the current location to preserve
    // query/hash values
    set.redirect({
      name: 'Recipe',
      params: route.params,
      ...route.location
    });
  }
}`}
      </PrismBlock>
      <p>
        After Curi emits the response, it will also automatically redirect to
        the new location!
      </p>
    </Section>
    <p>
      <IJS>every</IJS> and <IJS>response</IJS> offer a conveneint great place to
      do any route setup prior to actually rendering the route. Please remember,
      however, that your application will not be re-rendering until after the
      fetching has resolved. If you have a long running load function, you may
      wish to implement some sort of loading display. The{" "}
      <Link to="Example" params={{ category: "react", slug: "data-loading" }}>
        data loading example
      </Link>{" "}
      shows one approach to how to do this.
    </p>
  </BaseGuide>
);
