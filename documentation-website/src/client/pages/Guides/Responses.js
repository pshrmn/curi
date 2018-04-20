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
      others can be configured using the <IJS>set</IJS> functions in a route's{" "}
      <IJS>response()</IJS> method.
    </p>
    <Note>
      You can review the <IJS>set</IJS> functions in the{" "}
      <Link
        to="Guide"
        params={{ slug: "routes" }}
        details={{ hash: "response-set" }}
      >
        routes guide
      </Link>.
    </Note>
    <Section
      title="The Properties of a Response Object"
      id="response-properties"
    >
      <PrismBlock lang="javascript">
        {`{
  // The location key
  key: '1.0',

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

  // The status code for the response.
  // This defaults to 200, but is 404 if no routes match.
  // It can also be set with set.status() and set.redirect()
  // in a route's response() method.
  status: 200,

  // This can be anything you want. It is set using
  // the set.data() in a route's response() method.
  // The default value is undefined.
  data: {...},

  // The title string is set by calling set.title() in
  // response(). The default value is an empty string.
  title: 'Photo 12345',

  // The value set using set.body. This is where you can attach
  // component(s) to a route. The structure here is up to
  // you, but each of your routes should have the same structure.
  body: Photo,
  // or maybe
  body: {
    menu: PhotoMenu,
    main: Photo
  },
  // Please see below for more information about this property

  // A value set by the response()'s set.error() function
  error: undefined
}`}
      </PrismBlock>

      <Subsection title="Redirect Response" id="redirect-properties">
        <p>
          When you call{" "}
          <Link
            to="Guide"
            params={{ slug: "routes" }}
            details={{ hash: "response-set" }}
          >
            <IJS>set.redirect()</IJS>
          </Link>{" "}
          in <IJS>response()</IJS>, the response will have a{" "}
          <IJS>redirectTo</IJS> property. Curi will automatically trigger a
          redirect when it sees this.
        </p>
        <PrismBlock lang="javascript">
          {`{
  // The redirectTo property provides information on
  // where you should redirect to
  redirectTo: { pathname: '/login' }
}`}
        </PrismBlock>
        <p>
          You can choose whether or not you want redirect responses emitted to
          response handlers. The default behavior is that they are, but this
          also means that you have to render using the redirect response. You
          can pass the <IJS>{`{ emitRedirects: false }`}</IJS> option when you
          create your router to prevent this.
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
        The body property of a response is likely the most important property of
        a <IJS>response</IJS> because it is what you will actually render. It is
        the value set by the matched route's <IJS>response()</IJS> function,
        using{" "}
        <Link
          to="Guide"
          params={{ slug: "routes" }}
          details={{ hash: "response-set" }}
        >
          <IJS>set.body()</IJS>
        </Link>. This value can be anything you want it to be, but it should
        usually be a function/component or an object containing
        functions/components.
      </p>
      <PrismBlock lang="javascript">
        {`{
  name: "Home",
  path: "",
  response: ({ set }) => {
    // a function/component
    set.body(Home);
    // an object containing
    // functions/componnets
    set.body({
      menu: HomeMenu,
      body: Home
    });
  }
}`}
      </PrismBlock>
      <Note>
        It is important that each route uses the same structure for setting the
        body. Mixing structures will make renderin more difficult to reason
        about.
      </Note>
    </Section>

    <div>
      <h2>Next</h2>
      <p>
        Next, we'll take a look at another object passed to response handlers:{" "}
        <Link to="Guide" params={{ slug: "navigation-objects" }}>
          navigation objects
        </Link>{" "}
        .
      </p>
    </div>
  </BaseGuide>
);
