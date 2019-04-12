(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{73:function(e,n,t){"use strict";t.r(n),t.d(n,"component",function(){return u}),t.d(n,"contents",function(){return s});var r=t(0),a=t.n(r),o=t(21),l={title:"Server Rendering"},i={title:"Explanation",hash:"explanation"},s=[i,o.i];function u(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",null,l.title),a.a.createElement(o.d,{meta:i},a.a.createElement("p",null,"Server rendering with Curi is pretty similar to client side rendering. The server should have a catch all route handler that will respond to all (non-static file) requests."),a.a.createElement(o.b,{lang:"javascript"},'// express\nimport { createReusable } from "@curi/in-memory";\n\n// 1. Create a history constructor\nconst reusable = createReusable();\n\nfunction catchAll(req, res) {\n  // 2. Create a router using the current location\n  //    and the root React routing component\n  const router = createRouter(reusable, routes, {\n    history: { location: req.url }\n  });\n  const Router = createRouterComponent(router);\n\n  // 3. Wait for the response to be generated\n  router.once(({ response, navigation }) => {\n    // 4. Generate the HTML markup by rendering the <Router>\n    const markup = renderToString(\n      <Router>\n        {renderFunction}\n      </Router>\n    );\n    // 5. Insert the markup into the page\'s html and send it\n    res.send(renderFullPage(markup));\n  });\n}\n\napp.get("*", catchAll);'),a.a.createElement("p",null,"The above example is very basic. Some other things that you might need to consider are:"),a.a.createElement("ul",null,a.a.createElement("li",null,"Data loading — You would need to maintain two copies of your routes if you want to handle data fetching on the server differently than it works on the client side. This is not something that I have explored very closely yet, so I don't have any recommendations on exactly how to approach this."),a.a.createElement("li",null,"Code splitting — In order to use dynamic imports on the server, you will probably need to use a Babel plugin like"," ",a.a.createElement(o.e,null,"dynamic-import-node"),". Unfortunately,"," ",a.a.createElement(o.e,null,"dynamic-import-node")," breaks Webpack's code splitting. In order for your code to be split into multiple bundles, you should ensure that ",a.a.createElement(o.e,null,"dynamic-import-node")," isn't being run when building your client side bundle. The solution used in this experiment is to use the ",a.a.createElement(o.e,null,"env")," property.",a.a.createElement(o.b,{lang:"javascript"},'{\n    "presets": [ "es2015", "react" ],\n    "plugins": [\n      "syntax-dynamic-import"\n    ],\n    "env": {\n      "server": {\n        "plugins": ["dynamic-import-node"]\n      }\n    }\n  }'),a.a.createElement("p",null,"Then, when starting the server, make sure that BABEL_ENV=server."),a.a.createElement(o.b,{lang:"markup"},"cross-env BABEL_ENV=server npm start")))),a.a.createElement(o.g,{path:"misc/server-rendering"}))}}}]);