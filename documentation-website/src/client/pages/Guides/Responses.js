import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { PrismBlock, InlineJS as IJS } from "../../components/PrismBlocks";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/Sections";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>
    <p>
      Response objects are created by the router to descibe the route that
      matches a location. Some of these properties are set automatically, while
      others can be modified using the object returned a route's{" "}
      <IJS>response()</IJS> function.
    </p>
    <Note>
      You can review the response properties that can be modified in the{" "}
      <Link to="Guide" params={{ slug: "routes" }} hash="response">
        routes guide
      </Link>.
    </Note>
    <Section
      title="The Properties of a Response Object"
      id="response-properties"
    >
      <p>
        There are two types of response properties. The "match" properties are
        set based on the route that matches a location. A response always has
        these proeprties. The "settable" properties are ones that are added by a
        matched route's <IJS>response()</IJS> function. These only exist on the
        response when they are returned by <IJS>route.response()</IJS>.
      </p>
      <PrismBlock lang="javascript">
        {`// match properties
{
  // The location object used to generate the response.
  location: { pathname: '/photos/6789/12345', ... },

  // The name of the best matching route
  name: 'Photo',

  // The name of ancestor routes that matched
  // part of the location's pathname
  partials: ['Album'],

  // An object containing the values parsed
  // from the pathname by path-to-regexp.
  // This includes params from ancestor routes.
  params: { photoID: 12345, albumID: 6789 },
        }`}
      </PrismBlock>
      <PrismBlock lang="javascript">
        {`// settable properties
{
  // The body value is set using a route's response() return object.
  // This is where you can attach component(s) to a route. The structure here
  // is up to you, but each of your routes should have the same structure.
  body: Photo,
  // or maybe
  body: {
    menu: PhotoMenu,
    main: Photo
  },
  // Please see below for more information about this property

  // The status code for the response.
  // This is mostly useful for server-side rendering
  status: 200,

  // This can be anything you want. It is set using
  // a route's response() return object.
  data: {...},

  // The title string is set using a route's response() return object
  title: 'Photo 12345',

  // A value set by the route's response() return object.
  error: undefined,

  // A location to redirect to
  redirectTo: {...}
}`}
      </PrismBlock>

      <Subsection title="Redirect Response" id="redirect-properties">
        <p>
          When <IJS>route.response()</IJS> returns an object with a{" "}
          <Link to="Guide" params={{ slug: "routes" }} hash="response">
            <IJS>redirectTo</IJS> property
          </Link>{" "}
          the router will turn this into a location object. Curi will
          automatically redirect to this location.
        </p>
        <PrismBlock lang="javascript">
          {`{
  // The redirectTo property provides information on
  // where you should redirect to
  redirectTo: { pathname: '/login' }
}`}
        </PrismBlock>
        <p>
          You can choose whether or not you want responses with a{" "}
          <IJS>redirectTo</IJS> property to be emitted. The default behavior is
          to emit them, but this also means that you have to render using the
          redirect response. The <IJS>{`{ emitRedirects: false }`}</IJS> option
          prevents this.
        </p>
        <PrismBlock lang="javascript">
          {`const router = curi(history, routes, {
  emitRedirects: false
});`}
        </PrismBlock>
      </Subsection>
    </Section>

    <Section title="The Body Property" id="body-property">
      <p>
        The <IJS>body</IJS> property of a response is likely the most important
        property of a <IJS>response</IJS> because it is what you will actually
        render. This value can be anything you want it to be, but it should
        usually be a function/component or an object containing
        functions/components.
      </p>
      <PrismBlock lang="javascript">
        {`{
  name: "Home",
  path: "",
  response: () => {
    // a function/component
    return {
      body: Home
    };
    // an object containing
    // functions/componnets
    return {
      body: {
        menu: HomeMenu,
        main: Home
      }
    };
  }
}`}
      </PrismBlock>
      <Note>
        It is important that each route uses the same structure for setting the
        body. Mixing structures will make rendering more difficult.
      </Note>
    </Section>

    <div>
      <h2>Next</h2>
      <p>
        Next, we'll take a look at{" "}
        <Link to="Guide" params={{ slug: "observers" }}>
          observers
        </Link>.
      </p>
    </div>
  </BaseGuide>
);
