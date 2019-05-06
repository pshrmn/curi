import React from "react";
import { Link } from "@curi/react-dom";

import {
  PlainSection,
  HashSection,
  CodeBlock,
  Note,
  IJS
} from "../../components/guide/common";

const meta = {
  title: "Apollo Integration"
};

const setupMeta = {
  title: "Setup",
  hash: "setup"
};
const looseMeta = {
  title: "Loose Pairing",
  hash: "loose-pairing"
};
const prefetchMeta = {
  title: "Prefetching",
  hash: "prefetch"
};
const tightMeta = {
  title: "Tight Pairing",
  hash: "tight-pairing",
  children: [prefetchMeta]
};

const contents = [setupMeta, looseMeta, tightMeta];

function ApolloGuide() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>{meta.title}</h1>

        <p>
          <a href="https://apollographql.com">Apollo</a> is a great solution for
          managing an application's data using{" "}
          <a href="http://graphql.org">GraphQL</a>.
        </p>

        <p>
          There are a few different implementation strategies for integrating
          Apollo and Curi based on how tightly you want them to be paired.
        </p>

        <Note>
          <p>
            This guide only covers integration between Curi and Apollo. If you
            are not already familiar with how to use Apollo, you will want to
            learn that first.
          </p>

          <p>
            Also, this guide will only be referencing Apollo's React
            implementation, but the principles are the same no matter how you
            render your application.
          </p>
        </Note>
      </PlainSection>

      <HashSection meta={setupMeta}>
        <p>
          Apollo's React package provides an <IJS>ApolloProvider</IJS> component
          for accessing your Apollo client throughout the application. The{" "}
          <IJS>Router</IJS> (or whatever you name the root Curi component)
          should be a descendant of the <IJS>ApolloProvider</IJS> because we
          don't need to re-render the <IJS>ApolloProvider</IJS> for every new
          response.
        </p>

        <CodeBlock lang="jsx">
          {`import { ApolloProvider } from "react-apollo";
import { createRouterComponent } from "@curi/react-dom";

const Router = createRouterComponent(router);

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
), holder);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={looseMeta}>
        <p>
          Apollo and Curi don't actually have to know about each other. Curi can
          create a response without doing any data fetching and let Apollo
          handle that with its <IJS>Query</IJS> component.
        </p>

        <CodeBlock>
          {`// routes.js
import Noun from "./pages/Noun";

// nothing Apollo related in here
const routes = prepareRoutes({
  routes: [
    {
      name: 'Noun',
      path: 'noun/:word',
      respond: () => {
        return {
          body: Noun
        };
      }
    }
  ]
});`}
        </CodeBlock>

        <p>
          Any location data that a query needs can be taken from the response
          object. The best way to access this is to read the current{" "}
          <IJS>response</IJS> from the context. This can either be done in the
          component or the response can be passed down from the root app.
        </p>

        <CodeBlock lang="jsx">
          {`import { useResponse } from "@curi/react-dom";

function App() {
  const { response } = useResponse();
  const { body:Body } = response;
  return <Body response={response} />;
}`}
        </CodeBlock>

        <p>
          Because we pass the <IJS>response</IJS> to the route's <IJS>body</IJS>{" "}
          component, we can pass a <IJS>Query</IJS> the response's location
          params using <IJS>props.response.params</IJS>.
        </p>

        <CodeBlock lang="jsx">
          {`// pages/Nouns.js
import { Query } from "react-apollo";

const GET_NOUN = gql\`
  query noun(\$word: String!) {
    noun(word: $word) {
      word,
      type,
      definition
    }
  }
\`;

// use the "word" param from the response props
// to query the correct data
const Noun = ({ response }) => (
  <Query
    query={GET_NOUN}
    variables={{ word: response.params.word }}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <Loading />;
      }
      // ...

      return (
        <div>
          <h1>{data.noun.word}</h1>
          <p>{data.noun.definition}</p>
        </div>
      )
    }}
  </Query>
);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={tightMeta}>
        <p>
          You can use your Apollo client instance to call queries in a route's{" "}
          <IJS>resolve</IJS> function. <IJS>resolve</IJS> is expected to return
          a Promise, which is exactly what <IJS>client.query</IJS> returns.
          Tightly pairing Curi and Apollo is mostly center around using{" "}
          <IJS>resolve</IJS> to return a <IJS>client.query</IJS> call. This will
          delay navigation until after a route's GraphQL data has been loaded by
          Apollo.
        </p>

        <p>
          The <IJS>external</IJS> option can be used when creating the router to
          make the Apollo client accessible from routes.
        </p>

        <CodeBlock>
          {`import client from "./apollo";

const router = createRouter(browser, routes, {
  external: { client }
});`}
        </CodeBlock>
        <CodeBlock>
          {`import { EXAMPLE_QUERY } from "./queries";

const routes = prepareRoutes({
  routes: [
    {
      name: "Example",
      path: "example/:id",
      resolve({ params }, external) {
        return external.client.query({
          query: EXAMPLE_QUERY,
          variables: { id: params.id }
        });
      }
    }
  ]
});`}
        </CodeBlock>

        <p>There are two strategies for doing this.</p>

        <p>
          The first approach is to avoid the <IJS>Query</IJS> altogether.
          Instead, you can use a route's <IJS>response</IJS> property to attach
          the data fetched by Apollo directly to a response through its{" "}
          <IJS>data</IJS> property.
        </p>
        <p>
          While we know at this point that the query has executed, we should
          also check <IJS>error</IJS> in the <IJS>respond</IJS> function to
          ensure that the query was executed successfully.
        </p>

        <CodeBlock>
          {`// routes.js
import GET_VERB from "./queries";

import Verb from "./pages/Verb";

export default [
  {
    name: "Verb",
    path: "verb/:word",
    resolve({ params }, external) {
      return external.client.query({
        query: GET_VERB,
        variables: { word: params.word }
      });
    },
    respond({ error, resolved }) {
      if (error) {
        // handle failed queries
      }
      return {
        body: Verb,
        data: resolved.verb.data
      }
    }
  }
];`}
        </CodeBlock>

        <p>
          When rendering, you can access the query data through the{" "}
          <IJS>response</IJS>'s <IJS>data</IJS> property.
        </p>

        <CodeBlock lang="jsx">
          {`// pages/Verb.js
const Verb = ({ response }) => (
  <div>
    <h1>{response.data.verb.word}</h1>
    <p>
      {response.data.verb.definition}
    </p>
  </div>
)`}
        </CodeBlock>

        <p>
          The second approach is to use the <IJS>resolve</IJS> function as a way
          to cache the data, but also use <IJS>Query</IJS>. With this approach,
          we do not have to attach the query data to the response; we are just
          relying on the fact that Apollo will execute and cache the results
          prior to navigation.
        </p>

        <CodeBlock>
          {`// routes.js
import { GET_VERB } from "./queries";

export default [
  {
    name: "Verb",
    path: "verb/:word",
    resolve({ params, external }) {
      // load the data so it is cached by
      // your Apollo client
      return external.client.query({
        query: GET_VERB,
        variables: { word: params.word }
      });
    }
  }
];`}
        </CodeBlock>

        <p>
          The route's component will render a <IJS>Query</IJS> to also call the
          query. Because the query has already been executed, Apollo will grab
          the data from its cache instead of re-sending a request to your
          server.
        </p>

        <CodeBlock lang="jsx">
          {`// pages/Verb.js
import { GET_VERB } from "../queries";

const Verb = ({ response }) => (
  <Query
    query={GET_VERB}
    variables={{ word: response.params.word }}
  >
    {({ loading, error, data }) => {
      // ...
      return (
        <div>
          <h1>{data.verb.word}</h1>
          <p>
            {data.verb.definition}
          </p>
        </div>
      );
    }}
  </Query>
)`}
        </CodeBlock>

        <HashSection meta={prefetchMeta} tag="h3">
          <p>
            One additional benefit of adding queries to routes using{" "}
            <IJS>resolve</IJS> is that you can prefetch data for a route.
          </p>

          <p>
            The{" "}
            <Link
              name="Package"
              params={{ package: "router", version: "v2" }}
              hash="prefetch"
            >
              <IJS>prefetch</IJS>
            </Link>{" "}
            interaction lets you programmatically fetch the data for a route
            prior to navigating to a location.
          </p>

          <CodeBlock>
            {`// index.js
import { prefetch } from "@curi/router";

const routes = prepareRoutes({
  routes: [
    {
      name: "Example",
      path: "example/:id",
      resolve({ params }, external) {
        return external.client.query({
          query: GET_EXAMPLES,
          variables: { id: params.id }
        });
      }
    }
  ]
});

const router = createRouter(browser, routes);

// this will call the GET_EXAMPLES query
// and Apollo will cache the results
const exampleRoute = router.route("Example");
prefetch(exampleRoute, { params: { id: 2 }});`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </React.Fragment>
  );
}

export { ApolloGuide as component, contents };
