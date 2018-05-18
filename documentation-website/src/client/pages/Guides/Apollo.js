import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from "../../components/PrismBlocks";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/Sections";
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
          <a href="https://apollographql.com">Apollo</a> is a great solution for
          managing an application's data using{" "}
          <a href="http://graphql.org">GraphQL</a>.
        </p>
        <p>
          Using Apollo with Curi doesn't require any "special" integration, but
          there are a few different implementation strategies you may choose
          based on how tightly you want them to be paired.
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
      </Explanation>
    </SideBySide>

    <Section title="Setup" id="setup">
      <SideBySide>
        <Explanation>
          <p>
            Apollo's React components include an <Cmp>ApolloProvider</Cmp>{" "}
            component for accessing your Apollo client throughout the
            application. The <Cmp>CuriProvider</Cmp> should be a descendant of
            the <Cmp>ApolloProvider</Cmp> because we don't need to re-render the{" "}
            <Cmp>ApolloProvider</Cmp> for every new response.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`import { ApolloProvider } from "react-apollo";
import { CuriProvider } from "@curi/react";

ReactDOM.render((
  <ApolloProvider client={client}>
    <CuriProvider router={router}>
      {() => {...}}
    </CuriProvider>
  </ApolloProvider>
), holder);`}
        </CodeBlock>
      </SideBySide>
    </Section>

    <Section title="Loose Pairing" id="loose-pairing">
      <SideBySide>
        <Explanation>
          <p>
            Apollo and Curi don't actually have to know about each other. Curi
            can create a response without doing any data fetching and let Apollo
            handle that with its <Cmp>Query</Cmp> component.
          </p>
        </Explanation>
        <CodeBlock>
          {`// routes.js
import Noun from "./pages/Noun";

// nothing Apollo related in here
const routes = [
  {
    name: 'Noun',
    path: 'noun/:word',
    response: () => {
      return {
        body: Noun
      };
    }
  }
];`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            Any location data that a query needs can be taken from the response
            object. The best way to access this from your components would be to
            pass the <IJS>response</IJS> as a prop to the components rendered in
            the <Cmp>CuriProvider</Cmp> component's render-invoked{" "}
            <IJS>children</IJS> prop.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`// index.js
ReactDOM.render((
  <ApolloProvider client={client}>
    <CuriProvider router={router}>
      {({ response }) => {
        const { body:Body } = response;
        return <Body response={response} />;
      }}
    </CuriProvider>
  </ApolloProvider>
), holder);          
          
// pages/Nouns.js
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

// use the "word" param from the response
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
      </SideBySide>
    </Section>

    <Section title="Tight Pairing" id="tight-pairing">
      <SideBySide>
        <Explanation>
          <p>
            You can use your Apollo client to call queries in a route's{" "}
            <IJS>on.every()</IJS> function to tightly pair Curi and Apollo.{" "}
            <IJS>client.query()</IJS> returns a Promise, just like{" "}
            <IJS>on.every()</IJS> should, so <IJS>on.every()</IJS> can return a{" "}
            <IJS>client.query()</IJS> call. This allows you to delay navigation
            until after a route's GraphQL data has been loaded by Apollo.
          </p>
          <p>
            There are two strategies for doing this. Both approaches require you
            to be able to import your Apollo client in the module where you
            define your routes. If you create and export your Apollo Client in
            its own module, you can import it throughout your application.
          </p>
        </Explanation>
        <CodeBlock>
          {`// apollo.js
import ApolloClient from "apollo-boost";

export default ApolloClient({
  uri: "https://example.com/graphql"
});

// index.js
import client from "./apollo";

ReactDOM.render((
  <ApolloProvider client={client}>
    /*...*/
  </ApolloProvider>
), holder);

// routes.js
import client from "./apollo";

// ...`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            The first approach is to avoid the <Cmp>Query</Cmp> altogether.
            Instead, you can use a route's <IJS>response()</IJS> property to
            attach the data fetched by Apollo directly to a response.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`// routes.js
import client from "./apollo";
import GET_VERB from "./queries";

import Verb from "./pages/Verb";

export default [
  {
    name: "Verb",
    path: "verb/:word",
    on: {
      every({ params }) {
        // load the data
        return client.query({
          query: GET_VERB,
          variables: { word: params.word }
        })
      }
    },
    response({ resolved }) {
      // attach the resolved data to the response.
      // in the real world, you would also check for errors
      // here in case something goes wrong with the query
      return {
        body: Verb,
        data: resolved.every.data
      }
    }
  }
];

// pages/Verb.js
const Verb = ({ response }) => (
  <div>
    <h1>{response.data.verb.word}</h1>
    <p>
      {response.data.verb.definition}
    </p>
  </div>
)`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            The second approach is to use <IJS>on.every()</IJS> as a way to
            cache the data, but also use <Cmp>Query</Cmp>. When the{" "}
            <Cmp>Query</Cmp> calls the query, Apollo will grab the data from its
            cache instead of re-sending a request to your server.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`// routes.js
import client from "./apollo";
import { GET_VERB } from "./queries";

export default [
  {
    name: "Verb",
    path: "verb/:word",
    on: {
      every({ params }) {
        // load the data so it is cached by
        // your Apollo client
        return client.query({
          query: GET_VERB,
          variables: { word: params.word }
        })
      }
    }
  }
];

// pages/Verb.js
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
      </SideBySide>
      <Subsection title="Prefetching" id="prefetch">
        <SideBySide>
          <Explanation>
            <p>
              One additional benefit of adding queries to routes using{" "}
              <IJS>on.every()</IJS> functions is that you can prefetch data for
              a route.
            </p>
            <p>
              The{" "}
              <Link to="Package" params={{ package: "route-prefetch" }}>
                <IJS>@curi/route-prefetch</IJS>
              </Link>{" "}
              interaction lets you programmatically fetch the data for a route
              prior to navigating to a location.
            </p>
          </Explanation>
          <CodeBlock>
            {`// index.js
import prefetch from "@curi/route-prefetch";

const routes = [
  {
    name: "Example",
    path: "example/:id",
    on: {
      every({ params }) {
        client.query({
          query: GET_EXAMPLES,
          variables: { id: params.id }
        })
      }
    }
  }
]

const router = curi(history, routes, {
  route: [prefetch()]
});

// this will call the GET_EXAMPLES query
// and Apollo will cache the results
route.prefetch("Example", {
  params: { id: 2 }
});`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              <Link to="Package" params={{ package: "react " }}>
                <IJS>@curi/react</IJS>
              </Link>{" "}
              provides a <Cmp>Prefetch</Cmp> component that will automatically
              prefetch the data for a route once an element becomes visible in
              the page.
            </p>
            <p>
              <Cmp>Prefetch</Cmp> relies on you attaching a <IJS>ref</IJS> to
              the element that should trigger prefetching.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { Prefetch, Link } from "@curi/react";
            
// don't forget to attach the ref to a component!
const PrefetchLink = ({ to, params, ...rest }) => (
  <Prefetch match={{ name: to, params }}>
    {ref => (
      <Link to={to} params={params} ref={ref} {...rest} />
    )}
  </Prefetch>
);

// usage
<PrefetchLink to="Example" params={{ id: 3 }}>
  Example 3
</Prefetch>`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              If you want to get really fancy, <Cmp>Prefetch</Cmp> also lets you
              access the prefetched data with the second argument to its
              render-invoked <IJS>children</IJS> prop. You can do this to update
              your UI to indicate that the data has loaded or even use the
              loaded data with some filler content.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`const PrefetchLink = ({ to, params, children, ...rest }) => (
  <Prefetch match={{ name: to, params }}>
    {(ref, resolved) => (
      <Link to={to} params={params} ref={ref} {...rest}>
        {children}
        {resolved ? <Loading /> : <Loaded />}
      </Link>
    )}
  </Prefetch>
);`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
    </Section>
  </BaseGuide>
);
