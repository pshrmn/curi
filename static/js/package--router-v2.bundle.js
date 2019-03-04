(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{82:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(20),o=n(3),s={title:"history",hash:"history"},u={title:"routes",hash:"routes"},c={title:"options",hash:"options"},i={title:"Arguments",hash:"arguments",children:[s,u,c]},m={title:"navigate(details)",hash:"navigate"},h={title:"once(fn, options)",hash:"once"},p={title:"observe(fn, options)",hash:"observe"},d={title:"cancel(fn)",hash:"cancel-property"},E={title:"current()",hash:"current-property"},f={title:"route",hash:"router-route"},g={title:"refresh()",hash:"refresh-property"},b={title:"history",hash:"history-property"},y={title:"external",hash:"router-external"},v={title:"Router",hash:"router",children:[m,h,p,d,E,f,g,b,y]},w={title:"curi()",hash:"curi",children:[i,v]};function T(){return r.a.createElement(l.e,{meta:w},r.a.createElement("p",null,"The ",r.a.createElement(l.f,null,"curi")," export is a function to create a router. It has two required arguments: a ",r.a.createElement(l.f,null,"history")," object and a ",r.a.createElement(l.f,null,"routes")," ","array, and an optional third argument: an ",r.a.createElement(l.f,null,"options")," object."),r.a.createElement(l.d,null,"import { curi } from '@curi/router';\n\nconst router = curi(history, routes, options);"),r.a.createElement(l.e,{tag:"h4",meta:i},r.a.createElement(l.e,{tag:"h5",meta:s},r.a.createElement("p",null,"A ",r.a.createElement("a",{href:"https://github.com/pshrmn/hickory"},"Hickory")," history object that will power navigation within the application. The"," ",r.a.createElement(o.a,{name:"Guide",params:{slug:"getting-started"},hash:"history-object"},"getting started guide")," ","provides more information on how to choose which history type is right for an application."),r.a.createElement(l.d,{lang:"jsx"},'import { Browser } from "@hickory/browser";\n\nconst history = Browser();\nconst router = curi(history, routes);')),r.a.createElement(l.e,{tag:"h5",meta:u},r.a.createElement("p",null,"An array of prepared"," ",r.a.createElement(o.a,{name:"Guide",params:{slug:"routes"}},"route")," ","objects describing all valid routes in the application."),r.a.createElement(l.d,{lang:"jsx"},'const routes = prepareRoutes([\n  { name: "Home", path: "" },\n  { name: "About", path: "about" }\n]);\n\nconst router = curi(history, routes);')),r.a.createElement(l.e,{tag:"h5",meta:c},r.a.createElement("p",null,"An optional object with additional properties that can be passed to the router."),r.a.createElement(l.e,{tag:"h6",meta:{title:r.a.createElement(l.f,null,"route"),hash:"options-route"}},r.a.createElement("p",null,"An array of"," ",r.a.createElement(o.a,{name:"Guide",params:{slug:"route-interactions"}},"route interactions"),". These are functions for interacting with routes based on their"," ",r.a.createElement(l.f,null,"name"),"."),r.a.createElement("p",null,"The ",r.a.createElement(l.f,null,"pathname")," interaction is included by default; any other interactions are provided through this array."),r.a.createElement(l.d,null,'import active from "@curi/route-active";\nimport ancestors from "@curi/route-ancestors";\n\nconst routes = prepareRoutes([{ name: "Home", path: "" }]);\n\nconst router = curi(history, routes, {\n  route: [active(), ancestors()]\n});'),r.a.createElement("p",null,"Route interactions are called via the router's ",r.a.createElement(l.f,null,"route")," ","object."),r.a.createElement(l.d,null,'router.route.active("Home");\n// returns true when location.pathname = "/"\n\nrouter.route.pathname("Home");\n// returns "/"')),r.a.createElement(l.e,{tag:"h6",meta:{title:r.a.createElement(l.f,null,"sideEffects"),hash:"options-sideEffects"}},r.a.createElement("p",null,"An array of"," ",r.a.createElement(o.a,{name:"Guide",params:{slug:"side-effects"}},"side effect")," ","objects."),r.a.createElement(l.i,null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"property"),r.a.createElement("th",null,"description"))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"effect"),r.a.createElement("td",null,"An observer that will be called whenever a response is generated.")),r.a.createElement("tr",null,r.a.createElement("td",null,"after"),r.a.createElement("td",null,"(default ",r.a.createElement(l.f,null,"false"),") controls whether the side effect is called before or after non-side effect observers.")))),r.a.createElement(l.d,null,'import scroll from "@curi/side-effect-scroll";\n\nconst router = curi(history, routes, {\n  sideEffects: [scroll()]\n});')),r.a.createElement(l.e,{tag:"h6",meta:{title:r.a.createElement(l.f,null,"external"),hash:"options-external"}},r.a.createElement("p",null,"Values that should be accessible to a route's ",r.a.createElement(l.f,null,"resolve")," ","function ",r.a.createElement(l.f,null,"response")," functions."),r.a.createElement("p",null,"Using ",r.a.createElement(l.f,null,"external")," allows you to access APIs, data, etc. without having to be able to import it in the module where the routes are defined."),r.a.createElement(l.d,null,'const client = new ApolloClient();\nconst router = curi(history, routes, {\n  external: { client, greeting: "Hi!" }\n});'),r.a.createElement(l.d,null,'const routes = prepareRoutes([\n  {\n    name: "User",\n    path: "user/:id",\n    resolve(match, external) {\n      // use the external object to make a query\n      return external.client.query();\n    }\n  }\n]);')),r.a.createElement(l.e,{tag:"h6",meta:{title:r.a.createElement(l.f,null,"emitRedirects"),hash:"options-emitRedirects"}},r.a.createElement("p",null,"When ",r.a.createElement(l.f,null,"false")," (default is ",r.a.createElement(l.f,null,"true"),"), response objects with the ",r.a.createElement(l.f,null,"redirectTo")," property"," ",r.a.createElement("strong",null,"will not be emitted")," to observers. This can be useful for avoiding an extra render, but should not be used on the server."),r.a.createElement(l.d,null,'const routes = prepareRoutes([\n  {\n    name: "Old",\n    path: "old/:id",\n    response({ params }) {\n      // setup a redirect to the "New" route\n      return {\n        redirectTo: {\n          name: "New",\n          params\n        }\n      };\n    }\n  },\n  {\n    name: "New",\n    path: "new/:id"\n  }\n]);\n\nconst router = curi(history, routes, {\n  emitRedirects: false                 \n});\n// navigating to "/old/2" will automatically redirect\n// to "/new/2" without emitting a response')),r.a.createElement(l.e,{tag:"h6",meta:{title:r.a.createElement(l.f,null,"automaticRedirects"),hash:"options-automaticRedirects"}},r.a.createElement("p",null,"When the initially matched route is synchronous and redirects, the router's automatic redirect will occur before any response handlers (registered with ",r.a.createElement(l.f,null,"once()")," or"," ",r.a.createElement(l.f,null,"observe()"),") are called. This means that they will be called with the response for the location that was redirected to instead of the initial location. This is fine on the client side, but causes issues with server side rendering. When"," ",r.a.createElement(l.f,null,"automaticRedirects")," is ",r.a.createElement(l.f,null,"false"),", the automatic redirect will not happen."," ",r.a.createElement("strong",null,"Setting ",r.a.createElement(l.f,null,"automaticRedirects")," to ",r.a.createElement(l.f,null,"false")," is recommend for server side rendering.")),r.a.createElement(l.d,null,'const routes = prepareRoutes([\n  {\n    name: "Old",\n    path: "old/:id",\n    response({ params }) {\n      // setup a redirect to the "New" route\n      return {\n        redirectTo: {\n          name: "New",\n          params\n        }\n      };\n    }\n  },\n  {\n    name: "New",\n    path: "new/:id"\n  }\n]);\nconst history = InMemory({ locations: ["old/1" ]});\nconst router = curi(history, routes, {\n  automaticRedirects: false                 \n});\nrouter.once(({ response }) => {\n  // response = { name: "Old", ... }\n});')),r.a.createElement(l.e,{tag:"h6",meta:{title:r.a.createElement(l.f,null,"pathnameOptions"),hash:"options-pathnameOptions"}},r.a.createElement("p",null,"Curi uses"," ",r.a.createElement("a",{href:"https://github.com/pillarjs/path-to-regexp"},r.a.createElement(l.f,null,"path-to-regexp"))," ","to handle route matching and pathname generation."," ",r.a.createElement(l.f,null,"path-to-regexp")," can take a custom"," ",r.a.createElement("a",{href:"https://github.com/pillarjs/path-to-regexp#compile-reverse-path-to-regexp"},r.a.createElement(l.f,null,"encode"))," ","function for creating pathnames, which you can specify with this options."),r.a.createElement(l.d,null,"const router = curi(history, routes, {\n  pathOptions: {\n    encode: (value, token) => { /* ... */ }\n  }\n});")))),r.a.createElement(l.e,{tag:"h4",meta:v},r.a.createElement("p",null,"The router has a number of properties for you to use when rendering your application."),r.a.createElement(l.e,{tag:"h5",meta:m},r.a.createElement("p",null,"The ",r.a.createElement(l.f,null,"navigate()")," method is used to navigate programmatically. It takes a ",r.a.createElement(l.f,null,"details")," object with the details of where you want to navigate to as well as the"," ",r.a.createElement(l.f,null,"method")," of navigation."),r.a.createElement(l.i,null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"property"),r.a.createElement("th",null,"description"))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"name"),r.a.createElement("td",null,"The name of the route to navigate to")),r.a.createElement("tr",null,r.a.createElement("td",null,"params"),r.a.createElement("td",null,"An object of any route params for the named route (and any of its ancestors that require params).")),r.a.createElement("tr",null,r.a.createElement("td",null,"hash"),r.a.createElement("td",null,"The hash string of the location to navigate to.")),r.a.createElement("tr",null,r.a.createElement("td",null,"query"),r.a.createElement("td",null,"The query value of the location to navigate to.")),r.a.createElement("tr",null,r.a.createElement("td",null,"state"),r.a.createElement("td",null,"Any serializable state to attach to the location.")),r.a.createElement("tr",null,r.a.createElement("td",null,"method"),r.a.createElement("td",null,"How to navigate. ",r.a.createElement(l.f,null,'"push"')," appends the new location after the current one. ",r.a.createElement(l.f,null,'"replace"')," replaces the current location. ",r.a.createElement(l.f,null,'"anchor"')," is the default method and acts like clicking a link. This behavior is a mix of"," ",r.a.createElement(l.f,null,'"push"')," and ",r.a.createElement(l.f,null,'"replace"')," where the current location is replaced if the new location has the exact same URL.")),r.a.createElement("tr",null,r.a.createElement("td",null,"finished"),r.a.createElement("td",null,"A function to call once the navigation has finished.")),r.a.createElement("tr",null,r.a.createElement("td",null,"cancelled"),r.a.createElement("td",null,"A function to call if the navigation is superseded by another navigation.")))),r.a.createElement(l.d,null,'const routes = prepareRoutes([\n  {\n    name: "Album",\n    path: "photos/:albumID",\n    children: [\n      { name: "Photo", path: ":photoID" }\n    ]\n  },\n  // ...\n]);\nconst router = curi(history, routes);\n\nrouter.navigate({\n  name: "Photo",\n  params: { albumID: 123, photoID: 456 }\n});\n// navigates to "/photos/123/456"\n// using default "anchor" method')),r.a.createElement(l.e,{tag:"h5",meta:h},r.a.createElement("p",null,"The ",r.a.createElement(l.f,null,"once()")," method takes a response handler function. If a response already exists, the function will be called immediately. Otherwise, the function will be called once a new response is created. The ",r.a.createElement(l.f,null,"{ initial: false }")," option can be used to prevent an immediate call even if a response already exists."),r.a.createElement(l.i,null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"property"),r.a.createElement("th",null,"description"))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"response"),r.a.createElement("td",null,"The generated response object.")),r.a.createElement("tr",null,r.a.createElement("td",null,"navigation"),r.a.createElement("td",null,"The navigation's ",r.a.createElement(l.f,null,"action")," (",r.a.createElement(l.f,null,"push"),","," ",r.a.createElement(l.f,null,"replace"),", or ",r.a.createElement(l.f,null,"pop"),") and the"," ",r.a.createElement(l.f,null,"previous")," response object.")),r.a.createElement("tr",null,r.a.createElement("td",null,"router"),r.a.createElement("td",null,"The Curi router")))),r.a.createElement("p",null,"When a matched route is async (it has a ",r.a.createElement(l.f,null,"resolve")," ","function), a response will not be created until the function has resolved."),r.a.createElement(l.d,null,"router.once(({ response }) => {\n  // render the application based on the response\n});"),r.a.createElement(l.e,{tag:"h6",meta:{title:"options",hash:"once-options"}},r.a.createElement("div",{style:{overflowX:"scroll"}},r.a.createElement(l.i,null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"option"),r.a.createElement("th",null,"default"),r.a.createElement("th",null,"description"))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"initial"),r.a.createElement("td",null,"true"),r.a.createElement("td",null,"When true, the function will be called immediately if a response exists. When false, the response function will not be called until the next response is emitted."))))),r.a.createElement(l.d,null,"router.once(responseHandler, {\n  initial: false\n});"))),r.a.createElement(l.e,{tag:"h5",meta:p},r.a.createElement("p",null,"The ",r.a.createElement(l.f,null,"observe()")," method takes a response handler function. The response handler will be called every time a new response is emitted (and it a response already exists, the function will be called immediately). The ",r.a.createElement(l.f,null,"{ initial: false }")," option can be used to prevent an immediate call even if a response already exists."),r.a.createElement(l.i,null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"property"),r.a.createElement("th",null,"description"))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"response"),r.a.createElement("td",null,"The generated response object.")),r.a.createElement("tr",null,r.a.createElement("td",null,"navigation"),r.a.createElement("td",null,"The navigation's ",r.a.createElement(l.f,null,"action")," (",r.a.createElement(l.f,null,"push"),","," ",r.a.createElement(l.f,null,"replace"),", or ",r.a.createElement(l.f,null,"pop"),") and the"," ",r.a.createElement(l.f,null,"previous")," response object.")),r.a.createElement("tr",null,r.a.createElement("td",null,"router"),r.a.createElement("td",null,"The Curi router")))),r.a.createElement("p",null,"When a matched route is async (it has a ",r.a.createElement(l.f,null,"resolve")," ","function), a response will not be created until the function has resolved."),r.a.createElement(l.d,null,"router.observe(({ response }) => {\n  // render the application based on the response\n});"),r.a.createElement(l.e,{tag:"h6",meta:{title:"options",hash:"observe-options"}},r.a.createElement("div",{style:{overflowX:"scroll"}},r.a.createElement(l.i,null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"option"),r.a.createElement("th",null,"default"),r.a.createElement("th",null,"description"))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"initial"),r.a.createElement("td",null,"true"),r.a.createElement("td",null,"When true, the function will be called immediately if a response exists. When false, the response function will not be called until the next response is emitted."))))),r.a.createElement(l.d,null,"router.observe(responseHandler, {\n  initial: false\n});"),r.a.createElement("p",null,r.a.createElement(l.f,null,"observe()")," returns a function to stop calling the response handler function for new responses."),r.a.createElement(l.d,null,"const stopObserving = router.observe(\n  () => {...}\n);\n// the router will now call the observer for all responses\n\nstopObserving();\n// the router no longer calls the observer"))),r.a.createElement(l.e,{tag:"h5",meta:d},r.a.createElement("p",null,"With asynchronous routes, after a user begins navigation, but before the route's asynchronous actions have finished, the user does not have a good way to cancel the navigation. They can either refresh the page (causing a full reload) or click a link with the same URL as the current location, but neither of these are intuitive or ideal."),r.a.createElement("p",null,r.a.createElement(l.f,null,"cancel()")," takes an observer function that will be called when navigation starts and when the navigation is finished. When the navigation starts, the observer function will be given a function to cancel the navigation. When the navigation finishes, the function will be called with ",r.a.createElement(l.f,null,"undefined"),"."),r.a.createElement("p",null,"Calling ",r.a.createElement(l.f,null,"cancel()")," returns a function to stop observing."),r.a.createElement(l.d,null,"const stopCancelling = router.cancel(fn => {\n  if (fn === undefined) {\n    // the navigation has finished/been cancelled\n  } else {\n    // calling fn will cancel the navigation\n  }\n});")),r.a.createElement(l.e,{tag:"h5",meta:E},r.a.createElement("p",null,"The ",r.a.createElement(l.f,null,"router.current()")," method returns the current"," ",r.a.createElement(l.f,null,"response")," and ",r.a.createElement(l.f,null,"navigation")," objects."),r.a.createElement(l.g,null,r.a.createElement("p",null,"If you call ",r.a.createElement(l.f,null,"router.current()")," before the initial response has been emitted, the ",r.a.createElement(l.f,null,"response")," and"," ",r.a.createElement(l.f,null,"navigation")," properties will be ",r.a.createElement(l.f,null,"null"),".")),r.a.createElement(l.d,null,"const router = curi(history, routes);\nconst tooSoon = router.current();\n// tooSoon.response === null\n// tooSoon.navigation === null\n\nrouter.once(({ response, navigation }) => {\n  const perfect = router.current();\n  // perfect.response === response\n  // perfect.navigation === navigation\n});")),r.a.createElement(l.e,{tag:"h5",meta:f},r.a.createElement("p",null,"The router's"," ",r.a.createElement(o.a,{name:"Guide",params:{slug:"route-interactions"}},"route interactions")," ","are accessed through the ",r.a.createElement(l.f,null,"route")," property. These are used to interact with routes using their names."),r.a.createElement(l.e,{tag:"h6",meta:{title:"pathname",hash:"pathname-interaction"}},r.a.createElement("p",null,"Curi includes one built-in interaction, ",r.a.createElement(l.f,null,"pathname"),", which generates location pathnames using the name of a route and an optional object containing any necessary params."),r.a.createElement(l.d,null,"const routes = prepareRoutes([\n  { name: 'User', path: 'user/:id' }\n]);\nconst router = curi(history, routes);\nconst userPathname = router.route.pathname(\n  'User',\n  { id: '12345' }\n);\n// userPathname === '/user/12345'"))),r.a.createElement(l.e,{tag:"h5",meta:g},r.a.createElement("p",null,"The ",r.a.createElement(l.f,null,"refresh()")," function takes an array of new routes, which will replace the existing routes. The router will emit a new response based on the current location."),r.a.createElement("p",null,"The function can be called without any arguments and it will emit a response using the existing routes."),r.a.createElement(l.d,null,"const oldRoutes = prepareRoutes([...]);\nconst newRoutes = prepareRoutes([...]);\n\nconst router = curi(history, oldRoutes);\n// generates responses using old routes\n\nrouter.refresh(newRoutes);\n// generates responses using new routes")),r.a.createElement(l.e,{tag:"h5",meta:b},r.a.createElement("p",null,"The route's history object, in case you need to interact directly with that.")),r.a.createElement(l.e,{tag:"h5",meta:y},r.a.createElement("p",null,"The ",r.a.createElement(l.f,null,"external")," value that was passed through"," ",r.a.createElement(o.a,{hash:"options-external"},r.a.createElement(l.f,null,"curi"),"'s options"),"."))))}var j={title:"prepareRoutes()",hash:"prepareRoutes"};function x(){return r.a.createElement(l.e,{meta:j},r.a.createElement("p",null,"The ",r.a.createElement(l.f,null,"prepareRoutes()")," export is used to build the routes for Curi. This will pre-compile paths for location matching and pathname building, which is particularly useful for server rendering."),r.a.createElement(l.d,null,'import { prepareRoutes } from \'@curi/router\';\n\nconst routes = prepareRoutes([\n  { name: "Home", path: "" },\n  // ...\n  { name: "Not Found", path: "(.*)" }\n]);'),r.a.createElement(l.j,null,r.a.createElement("p",null,"Passing a non-prepared routes array to ",r.a.createElement(l.f,null,"curi()")," is still supported, but deprecated and will be removed in the next major version.")))}var R={title:"Route Objects",hash:"route-objects"};function A(){return r.a.createElement(l.e,{meta:R},r.a.createElement(l.e,{meta:{title:"route.name",hash:"name"},tag:"h3"},r.a.createElement("p",null,"A string, this must be unique for every route."),r.a.createElement(l.d,null,"[\n  { name: 'Home' },\n  { name: 'Album' },\n  { name: 'Not Found' }\n];")),r.a.createElement(l.e,{meta:{title:"route.path",hash:"path"},tag:"h3"},r.a.createElement("p",null,"A string pattern describing what the route matches. Whenever the router receives a new location, it will loop through the known route paths to determine which one matches the new location's"," ",r.a.createElement(l.f,null,"pathname")," the best."),r.a.createElement("p",null,"Curi uses"," ",r.a.createElement("a",{href:"https://github.com/pillarjs/path-to-regexp#parameters"},r.a.createElement(l.f,null,"path-to-regexp"))," ","for path matching, which enables routes to have"," ",r.a.createElement("a",{href:"https://github.com/pillarjs/path-to-regexp#parameters"},"path parameters"),". When a route with parameters matches a location, the parameters will be be parsed from the location's ",r.a.createElement(l.f,null,"pathname"),"."),r.a.createElement("p",null,r.a.createElement(l.f,null,"path")," strings should ",r.a.createElement("strong",null,"not")," have a leading slash."),r.a.createElement(l.d,null,"[\n  { name: 'Home', path: '' },\n  // when the pathname is a/yo, albumID = \"yo\"\n  { name: 'Album', path: 'a/:albumID' },\n  // the path (.*) matches every pathname\n  { name: 'Not Found', path: '(.*)' }\n];\n\n// don't include a leading forward slash\n// { name: 'Home', path: '/' }"),r.a.createElement(l.j,null,r.a.createElement("p",null,r.a.createElement(l.f,null,"path-to-regexp")," supports arrays and RegExps, but Curi only supports string paths."))),r.a.createElement(l.e,{meta:{title:"route.resolve",hash:"resolve"},tag:"h3"},r.a.createElement("p",null,"The ",r.a.createElement(l.f,null,"resolve")," property is a function that returns a Promise. It is used to run asynchronous actions for a route prior to rendering."),r.a.createElement("p",null,"A route with a ",r.a.createElement(l.f,null,"resolve")," function is asynchronous, while one with no ",r.a.createElement(l.f,null,"resolve")," functions is synchronous. You can read more about this in the"," ",r.a.createElement(o.a,{name:"Guide",params:{slug:"sync-or-async"}},"sync or async")," ","guide."),r.a.createElement("p",null,"The ",r.a.createElement(l.f,null,"resolve")," function is called every time that a route matches the current location."),r.a.createElement("p",null,"The function will be passed an object with the matched route properties: ",r.a.createElement(l.f,null,"name"),", ",r.a.createElement(l.f,null,"params"),", ",r.a.createElement(l.f,null,"partials"),", and ",r.a.createElement(l.f,null,"location"),"."),r.a.createElement(l.d,null,"const about = {\n  name: 'About',\n  path: 'about',\n  resolve({ name, params, partials, location }) {\n    return Promise.resolve(\"hurray!\");\n  }\n};"),r.a.createElement(l.g,null,r.a.createElement("p",null,"You should not perform side effects (e.g. passing the loaded data to a Redux store) in ",r.a.createElement(l.f,null,"resolve")," because it is possible that navigating to the route might be cancelled. If you must perform side effects for a route, you should do so in the route's"," ",r.a.createElement(l.f,null,"response")," function.")),r.a.createElement("p",null,"The value resolved by the ",r.a.createElement(l.f,null,"resolve")," function will be passed to the route's ",r.a.createElement(l.f,null,"response")," function through its"," ",r.a.createElement(l.f,null,"resolved")," property. If there is an uncaught error,"," ",r.a.createElement(l.f,null,"resolved")," will be ",r.a.createElement(l.f,null,"null")," and the ",r.a.createElement(l.f,null,"error")," ","will be passed."),r.a.createElement(l.d,null,"const about = {\n  name: 'About',\n  path: 'about',\n  resolve({ name, params, partials, location }) {\n    return Promise.resolve(\"hurray!\");\n  },\n  response({ resolved, error }) {\n    if (error) {\n      // there was an uncaught error in the resolve function\n    }\n  }\n};")),r.a.createElement(l.e,{meta:{title:"route.response()",hash:"response"}},r.a.createElement("p",null,'A function for modifying the response object. This returns an object whose properties will be merged with the matched route properties to create the "final" response.'),r.a.createElement("p",null,"Only valid properties will be merged onto the response; everything else will be ignored. The valid properties are:"),r.a.createElement("ol",null,r.a.createElement("li",null,r.a.createElement("p",null,r.a.createElement(l.f,null,"body")," - This is usually what you will render."),r.a.createElement(l.d,null,'import Home from "./components/Home";\nconst routes = prepareRoutes([\n  {\n    name: "Home",\n    path: "",\n    response() {\n      return { body: Home };\n    }\n  },\n  // ...\n]);\n// response = { body: Home, ... }')),r.a.createElement("li",null,r.a.createElement("p",null,r.a.createElement(l.f,null,"status")," - A number. This is useful for redirects or locations caught by your catch-all route while using server-side rendering. The default status value is ",r.a.createElement(l.f,null,"200"),"."),r.a.createElement(l.d,null,"{\n  response(){\n    return {\n      status: 301,\n      redirectTo: {...}\n    };\n  }\n}\n// response = { status: 301, ... }")),r.a.createElement("li",null,r.a.createElement("p",null,r.a.createElement(l.f,null,"error")," - If an error occurs with the route's"," ",r.a.createElement(l.f,null,"resolve")," function, you might want to attach an error message to the response."),r.a.createElement(l.d,null,'{\n  resolve() {\n    return Promise.reject("woops!");\n  },\n  response({ error }) {\n    return { error };\n  }\n}\n// response = { error: "woops!", ... }')),r.a.createElement("li",null,r.a.createElement("p",null,r.a.createElement(l.f,null,"data")," - Anything you want it to be."),r.a.createElement(l.d,null,"{\n  response() {\n    return { data: Math.random() };\n  }\n}\n// response = { data: 0.8651606708109429, ... }")),r.a.createElement("li",null,r.a.createElement("p",null,r.a.createElement(l.f,null,"title")," - This can be used with"," ",r.a.createElement(l.f,null,"@curi/side-effect-title")," to update the page's"," ",r.a.createElement(l.f,null,"document.title"),"."),r.a.createElement(l.d,null,'{\n  response({ params }) {\n    return { title: `User ${params.id}` };\n  }\n}\n// when visting /user/2\n// response = { title: "User 2", ... }')),r.a.createElement("li",null,r.a.createElement("p",null,r.a.createElement(l.f,null,"redirectTo")," - An object with the ",r.a.createElement(l.f,null,"name")," of the route to redirect to, ",r.a.createElement(l.f,null,"params")," (if required), and optional ",r.a.createElement(l.f,null,"hash"),", ",r.a.createElement(l.f,null,"query"),", and ",r.a.createElement(l.f,null,"state")," ","properties."),r.a.createElement("p",null,"The other values are copied directly, but ",r.a.createElement(l.f,null,"redirectTo")," ","will be turned into a location object using the object's"," ",r.a.createElement(l.f,null,"name")," (and ",r.a.createElement(l.f,null,"params")," if required)."),r.a.createElement(l.d,null,'[\n  {\n    name: "Old Photo",\n    path: "photo/:id",\n    response({ params }) {\n      return {\n        redirectTo: { name: "Photo", params }\n      };\n    }\n  },\n  {\n    name: "New Photo",\n    path: "p/:id"\n  }\n]\n// when the user navigates to /photo/1:\n// response = { redirectTo: { pathname: "/p/1", ... } }'))),r.a.createElement("p",null,"This function is passed an object with a number of properties that can be useful for modifying the response."),r.a.createElement(l.d,null,"{\n  response: ({ match, resolved, error }) => {\n    // ...\n  }\n}"),r.a.createElement(l.e,{meta:{title:"match",hash:"response-match"},tag:"h3"},r.a.createElement("p",null,"An object with the matched route properties of a response."),r.a.createElement(l.i,null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"property"),r.a.createElement("th",null,"description"))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"name"),r.a.createElement("td",null,"the name of the matched route")),r.a.createElement("tr",null,r.a.createElement("td",null,"params"),r.a.createElement("td",null,"route parameters parsed from the location")),r.a.createElement("tr",null,r.a.createElement("td",null,"partials"),r.a.createElement("td",null,"the names of any ancestor routes of the matched route")),r.a.createElement("tr",null,r.a.createElement("td",null,"location"),r.a.createElement("td",null,"the location that was used to match the route")),r.a.createElement("tr",null,r.a.createElement("td",null,"key"),r.a.createElement("td",null,"the location's ",r.a.createElement(l.f,null,"key"),", which is a unique identifier"))))),r.a.createElement(l.e,{meta:{title:"resolved",hash:"response-resolved"},tag:"h3"},r.a.createElement("p",null,r.a.createElement(l.f,null,"resolved")," is an object with the values resolved by the"," ",r.a.createElement(l.f,null,"resolve")," functions."),r.a.createElement("p",null,"If a route isn't async, ",r.a.createElement(l.f,null,"resolved")," will be ",r.a.createElement(l.f,null,"null"),"."),r.a.createElement(l.d,null,"// attach resolved data to the response\nconst user = {\n  name: 'User',\n  path: ':id',\n  resolve({ params, location }) {\n    return fetch(`/api/users/${params.id}`)\n      .then(resp => JSON.parse(resp));\n  },\n  response: ({ resolved }) => {\n    return {\n      data: resolved\n    };\n  }\n}")),r.a.createElement(l.e,{meta:{title:"error",hash:"response-error"},tag:"h3"},r.a.createElement("p",null,r.a.createElement(l.f,null,"error")," is an uncaught error thrown by the route's"," ",r.a.createElement(l.f,null,"resolve")," function."),r.a.createElement(l.d,null,"// check if any of a route's resolve functions threw\nconst user = {\n  name: 'User',\n  path: ':id',\n  resolve({ params, location }) {\n    return fetch(`/api/users/${params.id}`)\n      .then(resp => JSON.parse(resp));\n  },\n  response: ({ error, resolved }) => {\n    if (error) {\n      return { error };\n    }\n    return {\n      data: resolved.data\n    };\n  }\n}"))),r.a.createElement(l.e,{meta:{title:"children",hash:"children"},tag:"h3"},r.a.createElement("p",null,"An optional array of route objects for creating nested routes. Any child routes will be matched relative to their parent route's"," ",r.a.createElement(l.f,null,"path"),". This means that if a parent route's ",r.a.createElement(l.f,null,"path")," ","string is ",r.a.createElement(l.f,null,"'one'")," and a child route's ",r.a.createElement(l.f,null,"path")," string is ",r.a.createElement(l.f,null,"'two'"),", the child will match when the pathname is"," ",r.a.createElement(l.f,null,"'one/two'"),"."),r.a.createElement(l.d,null,"// '/a/Coloring+Book/All+Night' will be matched\n// by the \"Song\" route, with the params\n// { album: 'Coloring+Book', title: 'All+Night' }\n{\n  name: 'Album',\n  path: 'a/:album',\n  children: [\n    {\n      name: 'Song',\n      path: ':title'\n    }\n  ]\n}")),r.a.createElement(l.e,{meta:{title:"params",hash:"params"},tag:"h3"},r.a.createElement("p",null,"When ",r.a.createElement(l.f,null,"path-to-regexp")," matches your paths, all parameters are extracted as strings. If you prefer for some route params to be other types, you can provide functions to transform params using the"," ",r.a.createElement(l.f,null,"route.params")," object."),r.a.createElement("p",null,"Properties of the ",r.a.createElement(l.f,null,"route.params")," object are the names of params to be parsed. The paired value should be a function that takes a string (the value from the ",r.a.createElement(l.f,null,"pathname"),") and returns a new value (transformed using the function you provide)."),r.a.createElement(l.d,null,"const routes = prepareRoutes([\n  {\n    name: 'Number',\n    path: 'number/:num',\n    params: {\n      num: n => parseInt(n, 10)\n    }\n  }\n]);\n\n// when the user visits /number/1,\n// response.params will be { num: 1 }\n// instead of { num: \"1\" }")),r.a.createElement(l.e,{meta:{title:"pathOptions",hash:"pathOptions"},tag:"h3"},r.a.createElement("p",null,"If you need to provide different path options than"," ",r.a.createElement("a",{href:"https://github.com/pillarjs/path-to-regexp#usage"},"the defaults")," ","used by ",r.a.createElement(l.f,null,"path-to-regexp"),", you can provide them with a"," ",r.a.createElement(l.f,null,"pathOptions")," object."),r.a.createElement(l.g,null,r.a.createElement("p",null,"If a route has a children array property, it will"," ",r.a.createElement("strong",null,"always")," have the ",r.a.createElement(l.f,null,"end")," path option set to false."))),r.a.createElement(l.e,{meta:{title:"extra",hash:"extra"},tag:"h3"},r.a.createElement("p",null,"If you have any additional properties that you want attached to a route, use the ",r.a.createElement(l.f,null,"extra")," property. You will be able to use"," ",r.a.createElement(l.f,null,"route.extra")," in any custom route interactions."),r.a.createElement(l.d,null,"const routes = prepareRoutes([\n  {\n    name: 'A Route',\n    path: 'a-route',\n    extra: {\n      transition: 'fade'\n    }\n  },\n  {\n    name: 'B Route',\n    path: 'b-route',\n    extra: {\n      enter: 'slide-right'\n    }\n  }\n]);")))}function k(e){return(k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function I(e,t){return!t||"object"!==k(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function H(e,t){return(H=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var N=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),I(this,P(t).apply(this,arguments))}var n,a,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&H(e,t)}(t,r.a.PureComponent),n=t,(a=[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.b,null,r.a.createElement("p",null,"The ",r.a.createElement(l.f,null,"@curi/router")," package is used to create a router.")),r.a.createElement(l.a,null,r.a.createElement(T,null),r.a.createElement(x,null),r.a.createElement(A,null)))}}])&&O(n.prototype,a),o&&O(n,o),t}(),W=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[w,j,R]}];n.d(t,"component",function(){return N}),n.d(t,"contents",function(){return W})}}]);