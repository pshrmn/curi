(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{44:function(e,t,n){"use strict";n.r(t),n.d(t,"component",function(){return v}),n.d(t,"contents",function(){return w});var r=n(0),a=n.n(r),l=n(22),s={title:"Server-Side Rendering"},o={title:"Reusing Code",hash:"reuse"},i={title:"Web Framework",hash:"framework"},c={title:"Client-Side Routes",hash:"client-side-routes"},u={title:"Static Assets",hash:"static-assets"},d={title:"Path Order",hash:"path-order"},h={title:"Request Matching",hash:"request-matching",children:[c,u,d]},m={title:"Render Handler",hash:"handler"},p={title:"History",hash:"history"},E={title:"Routes",hash:"routes"},y={title:"Automatic Redirects",hash:"automatic-redirects"},f={title:"Router",hash:"router",children:[p,E,y]},g={title:"Redirect Responses",hash:"redirect-responses"},b={title:"Handling the Response",hash:"handling-response",children:[g]},w=[o,i,h,m,f,b];function v(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(l.f,null,a.a.createElement("h1",null,s.title),a.a.createElement("p",null,"Server-side rendering (SSR) allows an application to generate the HTML for pages on the server. While not strictly necessary for single-page applications, server-side rendering can potentially be beneficial by:"),a.a.createElement("ol",null,a.a.createElement("li",null,"Speeding up the initial render time."),a.a.createElement("li",null,"Making it easier for web crawlers to view the application's content (which ",a.a.createElement("em",null,"may")," improve SEO).")),a.a.createElement("p",null,"This guide will cover how to setup server-side rendering and some of the issues that you may run into.")),a.a.createElement(l.c,{meta:o},a.a.createElement("p",null,"Being able to reuse code on the client and server is one of the benefits of JavaScript. If you are using syntax in your client-side code that Node doesn't know how to parse, such as import/export or JSX, you may quickly run into issues."),a.a.createElement("p",null,"The ",a.a.createElement("a",{href:"https://babeljs.io/"},"Babel")," package"," ",a.a.createElement(l.d,null,"@babel/node")," lets Babel compile your code on the fly to syntax that Node understands. Anywhere that you would call"," ",a.a.createElement(l.d,null,"node <command>"),", you should call"," ",a.a.createElement(l.d,null,"babel-node <command>")," instead."),a.a.createElement(l.b,{lang:"bash"},"npm install --save-dev @babel/node"),a.a.createElement(l.h,null,a.a.createElement("p",null,a.a.createElement(l.d,null,"@babel/node")," should only be used in development. For production, the server's modules should be pre-compiled (using Babel)."))),a.a.createElement(l.c,{meta:i},a.a.createElement("p",null,"In order to render JavaScript on the server, you will need to use Node. This guide will be using the"," ",a.a.createElement("a",{href:"https://expressjs.com/"},"Express")," web framework."),a.a.createElement(l.e,null,a.a.createElement("p",null,"There are ways to mix Node server-side rendering with non-Node frameworks, but that is outside of the scope of this guide.")),a.a.createElement("p",null,"Familiarity with Express is not expected, so to get you started, this guide will provide some code snippets for a basic setup."),a.a.createElement(l.b,{lang:"bash"},"npm install express"),a.a.createElement("p",null,"The server's setup code can be placed anywhere, but we will follow Node's convention and save it in a ",a.a.createElement(l.d,null,"server.js")," file."),a.a.createElement(l.b,null,'// server.js\nconst express = require("express");\n\nconst app = express();\n\n// ...\n\napp.listen("8080", () => {\n  console.log("Server is running.");\n});'),a.a.createElement(l.b,{lang:"bash"},"# tell node to start the server\n# (development only!)\nbabel-node server.js"),a.a.createElement("p",null,"With the server ready to go, we can start configuring it to render a single-page application.")),a.a.createElement(l.c,{meta:h},a.a.createElement("p",null,"A web framework receives requests from the client and returns responses."),a.a.createElement("p",null,"In the client-side application, we define the routes that are valid for the application. Similarly, the server needs to define which request paths are valid so that it can properly respond to them."),a.a.createElement("p",null,"Server paths are given handler functions. These can do a variety of things, but we will only be using them to send responses."),a.a.createElement(l.b,null,'app.use("/hi", function(req, res) {\n  res.send("Hey!");\n})'),a.a.createElement(l.c,{tag:"h3",meta:c},a.a.createElement("p",null,"Instead of telling the server about every single valid client-side route, a wildcard path is used to match every request. Determining what to render for the request will be done by a Curi router, which we will create in the wildcard's handler function."),a.a.createElement(l.b,null,'// the wildcard matches every GET request\napp.get("*", renderHandler);'),a.a.createElement(l.e,null,a.a.createElement("p",null,"The ",a.a.createElement(l.d,null,"*")," wildcard handler is similar to the Curi path"," ",a.a.createElement(l.d,null,"(.*)"),". Express and Curi both use"," ",a.a.createElement(l.d,null,"path-to-regexp")," for path matching. However, Express uses an old version. ",a.a.createElement(l.d,null,"path-to-regexp")," removed support for the barebones ",a.a.createElement(l.d,null,"*")," pattern in the version that Curi uses, which is why we have to use ",a.a.createElement(l.d,null,"(.*)")," in Curi routes."))),a.a.createElement(l.c,{tag:"h3",meta:u},a.a.createElement("p",null,"Page requests aren't the only requests that the framework will handle. Requests for static resources, like scripts, stylesheet, and images shouldn't be handled by Curi. Express provides a"," ",a.a.createElement(l.d,null,"static()"),' method to map request locations "real" (files exist on the server) locations.'),a.a.createElement(l.b,null,'app.use("/static", express.static());'),a.a.createElement("p",null,"Using the above static file handler, all static file requests in HTML/JavaScript should begin with ",a.a.createElement(l.d,null,"/static"),"."),a.a.createElement(l.b,{lang:"html"},'<img src="/static/img/circle.png" />')),a.a.createElement(l.c,{tag:"h3",meta:d},a.a.createElement("p",null,"Express matches against paths in the order that they are registered, so the static files path needs to be defined before the wildcard path."),a.a.createElement("p",null,"Any other non-page paths, like APIs, would also need to be defined before the catch-all."),a.a.createElement(l.b,null,'app.use("/static", express.static());\napp.use("/api", dataHandler);\napp.get("*", renderHandler);'))),a.a.createElement(l.c,{meta:m},a.a.createElement("p",null,"The render handler function receives the request object and a response object. The response object is used to build and send a response to the user."),a.a.createElement(l.b,null,'// renderer.js\nfunction renderHandler(req, res) {\n\n}\n\n// server.js\nconst renderHandler = require("./renderer");\n\napp.get("*", renderHandler)'),a.a.createElement(l.e,null,a.a.createElement("p",null,"If you are setting up a server without server-side rendering, the"," ",a.a.createElement(l.d,null,"renderHandler")," function could use"," ",a.a.createElement(l.d,null,"res.sendFile()")," to return a universal HTML file for every route.")),a.a.createElement(l.b,null,'const index = path.join(__dirname, "public", "index.html");\n          \nfunction renderHandler(req, res) {\n  res.sendFile(index);\n}')),a.a.createElement(l.c,{meta:f},a.a.createElement("p",null,"A router instance will be created for every single request. This is a big reason why we wrap the routes array in a ",a.a.createElement(l.d,null,"prepareRoutes")," ","call. Without ",a.a.createElement(l.d,null,"prepareRoutes"),", the route pathes would need to be re-compiled for every request!"),a.a.createElement("p",null,"The router will match the requested location to its routes and generate a response. Once the response is generated, the handler can render the application."),a.a.createElement(l.b,null,"// renderer.js\nfunction handler(req, res) {\n  const router = curi(history, routes);\n  router.once(({ response }) => {\n    // render the response\n  })\n}"),a.a.createElement("p",null,"Where do the history and routes come from?"),a.a.createElement(l.c,{tag:"h3",meta:p},a.a.createElement("p",null,"On the client-side, a single-page application uses"," ",a.a.createElement(l.d,null,"@hickory/browser")," to create a history instance. However, that uses browser only APIs. On the server, the"," ",a.a.createElement(l.d,null,"@hickory/in-memory")," package is used to create an equivalent history instance."),a.a.createElement(l.b,{lang:"bash"},"npm install @hickory/in-memory"),a.a.createElement("p",null,"An in-memory history takes an array of locations. For server-side rendering, we want to pass it the location from the request."),a.a.createElement(l.b,null,'// handler.js\nimport { InMemory } from "@hickory/in-memory";\n\nfunction handler(req, res) {\n  const history = InMemory({ locations: [req.path] });\n  const router = curi(history, routes);\n  // ...\n}')),a.a.createElement(l.c,{tag:"h3",meta:E},a.a.createElement("p",null,"Ideally, you will be able to re-use your client side routes on the server, but if the client routes use browser only APIs, you may need to adapt the routes to work on the server."),a.a.createElement(l.b,null,'// handler.js\nimport routes from "../client/routes";'),a.a.createElement("p",null,"One approach to client/server routes is to keep two copies: one for the client and one for the server. However, this should be a last resort because it can lead to inconsistencies if you update one file but not the other."),a.a.createElement("p",null,'A more reusable approach would be to use "universal" wrappers around any environment specific APIs. For example, the'," ",a.a.createElement("a",{href:"https://github.com/matthew-andrews/isomorphic-fetch"},a.a.createElement(l.d,null,"isomorphic-fetch"))," ","package could be used to support ",a.a.createElement(l.d,null,"fetch()")," in the browser and Node."),a.a.createElement(l.b,null,'// routes.js\nimport fetch from "isomorphic-fetch";\nimport { prepareRoutes } from "@curi/router";\n\nexport default prepareRoutes([\n  {\n    name: "Test",\n    path: "test",\n    resolve() {\n      return fetch("/test-data");\n    }\n  }\n]);')),a.a.createElement(l.c,{tag:"h3",meta:y},a.a.createElement("p",null,"Curi automatically redirects to a new location when a response with a ",a.a.createElement(l.d,null,"redirectTo")," property is generated. On the client, this is convenient because it saves you from having to detect the redirect and manually redirecting yourself. However, on the server it can cause issues."),a.a.createElement("p",null,"The issue happens because when Curi automatically redirects, another response is created for the location that Curi redirects to. If this response is ready before you try to render the current response, you'll render the redirected location's response instead of the initial response."),a.a.createElement("p",null,"Curi's ",a.a.createElement(l.d,null,"automaticRedirects")," option lets you disable automatic redirects when its value is ",a.a.createElement(l.d,null,"false"),". This lets you be certain that you are rendering using the initial response."),a.a.createElement(l.b,{"data-line":"3-5"},"function renderHandler(req, res) {\n  const history = InMemory({ locations: [req.path] });\n  const router = curi(history, routes, {\n    automaticRedirects: false\n  });\n}"))),a.a.createElement(l.c,{meta:b},a.a.createElement("p",null,"When the router is created, it will start generating a response by matching its ",a.a.createElement(l.d,null,"history")," object's current location. If the application has any asynchronous routes, the ",a.a.createElement(l.d,null,"response")," may not be ready immediately. The safest approach is to use"," ",a.a.createElement(l.d,null,"router.once")," to wait for the ",a.a.createElement(l.d,null,"response"),"."),a.a.createElement(l.b,{"data-line":"6-8"},"function renderHandler(req, res) {\n  const history = InMemory({ locations: [req.path] });\n  const router = curi(history, routes, {\n    automaticRedirects: false\n  });\n  router.once(({ response }) => {\n    // ...\n  });\n}"),a.a.createElement("p",null,"The next step is to render the application to generate an HTML response string that will be sent to the user. How exactly you do this depends on what UI renderer you are using, but the process is approximately the same for most renderering libraries."),a.a.createElement("p",null,"Here, we will assume that you are using React. The"," ",a.a.createElement(l.d,null,"react-dom")," package (through its ",a.a.createElement(l.d,null,"server")," module), provides a ",a.a.createElement(l.d,null,"renderToString")," method, which will render an application as a string."),a.a.createElement("p",null,"Rendering with React on the server is essentially the same as rendering on the client. We create a ",a.a.createElement(l.d,null,"Router")," and use"," ",a.a.createElement(l.d,null,"renderToString")," (instead of ",a.a.createElement(l.d,null,"ReactDOM.render"),") to render the component, passing it a render-invoked function."),a.a.createElement(l.b,{"data-line":"1-2,10-18"},'import { renderToString } from "react-dom/server";\nimport { curiProvider } from "@curi/react-dom";\n         \nfunction renderHandler(req, res) {\n  const history = InMemory({ locations: [req.path] });\n  const router = curi(history, routes, {\n    automaticRedirects: false\n  });\n  router.once(({ response }) => {\n    const Router = curiProvider(router);\n    const markup = renderToString(\n      <Router>\n        <App />\n      </Router>\n    );\n  });\n}'),a.a.createElement("p",null,"Rendering with ",a.a.createElement(l.d,null,"renderToString")," only generates an HTML string for the application. We are missing the ",a.a.createElement(l.a,null,"html"),","," ",a.a.createElement(l.a,null,"head"),",",a.a.createElement(l.a,null,"body"),", ",a.a.createElement(l.a,null,"script"),", etc. tags that are required for the full HTML page."),a.a.createElement("p",null,"We can write a function that takes the string created by"," ",a.a.createElement(l.d,null,"renderToString"),"and inserts it into the full HTML string for a page."),a.a.createElement("p",null,"For a React application, the markup string should be set as the child of its container element. If you render into the ",a.a.createElement(l.d,null,"#root")," ","element on the client, the HTML should have a ",a.a.createElement(l.d,null,"#root")," ","element."),a.a.createElement("p",null,"Any JavaScript scripts that need to be rendered should also be included in the HTML. Make sure that their paths are absolute; if the path is relative, then you will run into errors resolving the location for nested routes!"),a.a.createElement("p",null,"If your routes set ",a.a.createElement(l.d,null,"title")," strings on the ",a.a.createElement(l.d,null,"response"),", you can also pass that value to the markup insertion function and set the title in the HTML string."),a.a.createElement(l.b,{"data-line":"4-15,32-33"},'import { renderToString } from "react-dom/server";\nimport { curiProvider } from "@curi/react-dom";\n\nfunction insertMarkup(markup, title) {\n  return `<!doctype html>\n<html>\n  <head>\n    <title>${title} | My Site</title>\n  </head>\n  <body>\n    <div id="root">${markup}</div>\n    <script src="/static/js/bundle.js"><\/script>\n  </body>\n</html>`;\n}\n\nfunction renderHandler(req, res) {\n  const history = InMemory({ locations: [req.path] });\n  const router = curi(history, routes, {\n    automaticRedirects: false\n  });\n  router.once(({ response }) => {\n    const Router = curiProvider(router);\n    const markup = renderToString(\n      <Router>\n        <App />\n      </Router>\n    );\n    const html = insertMarkup(markup, response.title);\n    res.send(html);\n  });\n}'),a.a.createElement(l.e,null,a.a.createElement("p",null,"If you server render a React application, you should use"," ",a.a.createElement(l.d,null,"ReactDOM.hydrate")," instead of ",a.a.createElement(l.d,null,"ReactDOM.render")," on the client.")),a.a.createElement(l.c,{tag:"h3",meta:g},a.a.createElement("p",null,"If a route matches and it redirects, you can handle it without rendering the application. A ",a.a.createElement(l.d,null,"response")," is a redirect if it has a ",a.a.createElement(l.d,null,"redirectTo")," property. ",a.a.createElement(l.d,null,"redirectTo.url")," is that full URL (",a.a.createElement(l.d,null,"pathname"),", ",a.a.createElement(l.d,null,"query"),", and"," ",a.a.createElement(l.d,null,"hash"),")."),a.a.createElement(l.b,{"data-line":"10-13"},'import { renderToString } from "react-dom/server";\nimport { curiProvider } from "@curi/react-dom";\n\nfunction renderHandler(req, res) {\n  const history = InMemory({ locations: [req.path] });\n  const router = curi(history, routes, {\n    automaticRedirects: false\n  });\n  router.once(({ response }) => {\n    if (response.redirectTo) {\n      res.redirect(301);\n      return;\n    }\n    // otherwise, render\n  });\n}'))))}}}]);