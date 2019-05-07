(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{47:function(e,n,t){"use strict";t.r(n),t.d(n,"component",function(){return h}),t.d(n,"contents",function(){return d});var r=t(0),a=t.n(r),o=t(3),l=t(23),s={title:"Apollo Integration"},u={title:"Setup",hash:"setup"},i={title:"Loose Pairing",hash:"loose-pairing"},c={title:"Prefetching",hash:"prefetch"},p={title:"Tight Pairing",hash:"tight-pairing",children:[c]},d=[u,i,p];function h(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(l.f,null,a.a.createElement("h1",null,s.title),a.a.createElement("p",null,a.a.createElement("a",{href:"https://apollographql.com"},"Apollo")," is a great solution for managing an application's data using"," ",a.a.createElement("a",{href:"http://graphql.org"},"GraphQL"),"."),a.a.createElement("p",null,"There are a few different implementation strategies for integrating Apollo and Curi based on how tightly you want them to be paired."),a.a.createElement(l.e,null,a.a.createElement("p",null,"This guide only covers integration between Curi and Apollo. If you are not already familiar with how to use Apollo, you will want to learn that first."),a.a.createElement("p",null,"Also, this guide will only be referencing Apollo's React implementation, but the principles are the same no matter how you render your application."))),a.a.createElement(l.c,{meta:u},a.a.createElement("p",null,"Apollo's React package provides an ",a.a.createElement(l.d,null,"ApolloProvider")," component for accessing your Apollo client throughout the application. The"," ",a.a.createElement(l.d,null,"Router")," (or whatever you name the root Curi component) should be a descendant of the ",a.a.createElement(l.d,null,"ApolloProvider")," because we don't need to re-render the ",a.a.createElement(l.d,null,"ApolloProvider")," for every new response."),a.a.createElement(l.b,{lang:"jsx"},'import { ApolloProvider } from "react-apollo";\nimport { createRouterComponent } from "@curi/react-dom";\n\nconst Router = createRouterComponent(router);\n\nReactDOM.render((\n  <ApolloProvider client={client}>\n    <Router>\n      <App />\n    </Router>\n  </ApolloProvider>\n), holder);')),a.a.createElement(l.c,{meta:i},a.a.createElement("p",null,"Apollo and Curi don't actually have to know about each other. Curi can create a response without doing any data fetching and let Apollo handle that with its ",a.a.createElement(l.d,null,"Query")," component."),a.a.createElement(l.b,null,"// routes.js\nimport Noun from \"./pages/Noun\";\n\n// nothing Apollo related in here\nconst routes = prepareRoutes({\n  routes: [\n    {\n      name: 'Noun',\n      path: 'noun/:word',\n      respond: () => {\n        return {\n          body: Noun\n        };\n      }\n    }\n  ]\n});"),a.a.createElement("p",null,"Any location data that a query needs can be taken from the response object. The best way to access this is to read the current"," ",a.a.createElement(l.d,null,"response")," from the context. This can either be done in the component or the response can be passed down from the root app."),a.a.createElement(l.b,{lang:"jsx"},'import { useResponse } from "@curi/react-dom";\n\nfunction App() {\n  const { response } = useResponse();\n  const { body:Body } = response;\n  return <Body response={response} />;\n}'),a.a.createElement("p",null,"Because we pass the ",a.a.createElement(l.d,null,"response")," to the route's ",a.a.createElement(l.d,null,"body")," ","component, we can pass a ",a.a.createElement(l.d,null,"Query")," the response's location params using ",a.a.createElement(l.d,null,"props.response.params"),"."),a.a.createElement(l.b,{lang:"jsx"},'// pages/Nouns.js\nimport { Query } from "react-apollo";\n\nconst GET_NOUN = gql`\n  query noun($word: String!) {\n    noun(word: $word) {\n      word,\n      type,\n      definition\n    }\n  }\n`;\n\n// use the "word" param from the response props\n// to query the correct data\nconst Noun = ({ response }) => (\n  <Query\n    query={GET_NOUN}\n    variables={{ word: response.params.word }}\n  >\n    {({ loading, error, data }) => {\n      if (loading) {\n        return <Loading />;\n      }\n      // ...\n\n      return (\n        <div>\n          <h1>{data.noun.word}</h1>\n          <p>{data.noun.definition}</p>\n        </div>\n      )\n    }}\n  </Query>\n);')),a.a.createElement(l.c,{meta:p},a.a.createElement("p",null,"You can use your Apollo client instance to call queries in a route's"," ",a.a.createElement(l.d,null,"resolve")," function. ",a.a.createElement(l.d,null,"resolve")," is expected to return a Promise, which is exactly what ",a.a.createElement(l.d,null,"client.query")," returns. Tightly pairing Curi and Apollo is mostly center around using"," ",a.a.createElement(l.d,null,"resolve")," to return a ",a.a.createElement(l.d,null,"client.query")," call. This will delay navigation until after a route's GraphQL data has been loaded by Apollo."),a.a.createElement("p",null,"The ",a.a.createElement(l.d,null,"external")," option can be used when creating the router to make the Apollo client accessible from routes."),a.a.createElement(l.b,null,'import client from "./apollo";\n\nconst router = createRouter(browser, routes, {\n  external: { client }\n});'),a.a.createElement(l.b,null,'import { EXAMPLE_QUERY } from "./queries";\n\nconst routes = prepareRoutes({\n  routes: [\n    {\n      name: "Example",\n      path: "example/:id",\n      resolve({ params }, external) {\n        return external.client.query({\n          query: EXAMPLE_QUERY,\n          variables: { id: params.id }\n        });\n      }\n    }\n  ]\n});'),a.a.createElement("p",null,"There are two strategies for doing this."),a.a.createElement("p",null,"The first approach is to avoid the ",a.a.createElement(l.d,null,"Query")," altogether. Instead, you can use a route's ",a.a.createElement(l.d,null,"response")," property to attach the data fetched by Apollo directly to a response through its"," ",a.a.createElement(l.d,null,"data")," property."),a.a.createElement("p",null,"While we know at this point that the query has executed, we should also check ",a.a.createElement(l.d,null,"error")," in the ",a.a.createElement(l.d,null,"respond")," function to ensure that the query was executed successfully."),a.a.createElement(l.b,null,'// routes.js\nimport GET_VERB from "./queries";\n\nimport Verb from "./pages/Verb";\n\nexport default [\n  {\n    name: "Verb",\n    path: "verb/:word",\n    resolve({ params }, external) {\n      return external.client.query({\n        query: GET_VERB,\n        variables: { word: params.word }\n      });\n    },\n    respond({ error, resolved }) {\n      if (error) {\n        // handle failed queries\n      }\n      return {\n        body: Verb,\n        data: resolved.verb.data\n      }\n    }\n  }\n];'),a.a.createElement("p",null,"When rendering, you can access the query data through the"," ",a.a.createElement(l.d,null,"response"),"'s ",a.a.createElement(l.d,null,"data")," property."),a.a.createElement(l.b,{lang:"jsx"},"// pages/Verb.js\nconst Verb = ({ response }) => (\n  <div>\n    <h1>{response.data.verb.word}</h1>\n    <p>\n      {response.data.verb.definition}\n    </p>\n  </div>\n)"),a.a.createElement("p",null,"The second approach is to use the ",a.a.createElement(l.d,null,"resolve")," function as a way to cache the data, but also use ",a.a.createElement(l.d,null,"Query"),". With this approach, we do not have to attach the query data to the response; we are just relying on the fact that Apollo will execute and cache the results prior to navigation."),a.a.createElement(l.b,null,'// routes.js\nimport { GET_VERB } from "./queries";\n\nexport default [\n  {\n    name: "Verb",\n    path: "verb/:word",\n    resolve({ params, external }) {\n      // load the data so it is cached by\n      // your Apollo client\n      return external.client.query({\n        query: GET_VERB,\n        variables: { word: params.word }\n      });\n    }\n  }\n];'),a.a.createElement("p",null,"The route's component will render a ",a.a.createElement(l.d,null,"Query")," to also call the query. Because the query has already been executed, Apollo will grab the data from its cache instead of re-sending a request to your server."),a.a.createElement(l.b,{lang:"jsx"},'// pages/Verb.js\nimport { GET_VERB } from "../queries";\n\nconst Verb = ({ response }) => (\n  <Query\n    query={GET_VERB}\n    variables={{ word: response.params.word }}\n  >\n    {({ loading, error, data }) => {\n      // ...\n      return (\n        <div>\n          <h1>{data.verb.word}</h1>\n          <p>\n            {data.verb.definition}\n          </p>\n        </div>\n      );\n    }}\n  </Query>\n)'),a.a.createElement(l.c,{meta:c,tag:"h3"},a.a.createElement("p",null,"One additional benefit of adding queries to routes using"," ",a.a.createElement(l.d,null,"resolve")," is that you can prefetch data for a route."),a.a.createElement("p",null,"The"," ",a.a.createElement(o.a,{name:"Package",params:{package:"interactions",version:"v2"},hash:"prefetch"},a.a.createElement(l.d,null,"prefetch"))," ","interaction lets you programmatically fetch the data for a route prior to navigating to a location."),a.a.createElement(l.b,null,'// index.js\nimport { prefetch } from "@curi/router";\n\nconst routes = prepareRoutes({\n  routes: [\n    {\n      name: "Example",\n      path: "example/:id",\n      resolve({ params }, external) {\n        return external.client.query({\n          query: GET_EXAMPLES,\n          variables: { id: params.id }\n        });\n      }\n    }\n  ]\n});\n\nconst router = createRouter(browser, routes);\n\n// this will call the GET_EXAMPLES query\n// and Apollo will cache the results\nconst exampleRoute = router.route("Example");\nprefetch(exampleRoute, { params: { id: 2 }});'))))}}}]);