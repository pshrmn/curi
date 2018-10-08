(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{61:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return i});var n=a(0),l=a.n(n),r=a(2),o=a(9),s=a(17),c=a(10),u=a(6);function i(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(u.b,null,l.a.createElement("p",null,"Routes describe the valid locations within an application. Responses provide data about the route that matches the current location.")),l.a.createElement(c.a,{title:"Responses",id:"responses"},l.a.createElement(u.b,null,l.a.createElement("p",null,"When Curi receives a location, it compares the location's"," ",l.a.createElement(o.b,null,"pathname")," to each route's ",l.a.createElement(o.b,null,"path")," to find which one matches best and uses that route to create a response object.")),l.a.createElement(c.b,{title:"The Properties of a Response Object",id:"response-properties"},l.a.createElement(u.b,null,l.a.createElement("p",null,"There are two types of response properties.")),l.a.createElement(u.b,null,l.a.createElement("p",null,'The "match" properties are set based on the route that matches a location. A response always has these properties.')),l.a.createElement(u.a,null,"// match properties\n{\n  // The location object used to generate the response.\n  location: { pathname: '/photos/6789/12345', ... },\n\n  // The name of the best matching route\n  name: 'Photo',\n\n  // The name of ancestor routes that matched\n  // part of the location's pathname\n  partials: ['Album'],\n\n  // An object containing the values parsed\n  // from the pathname by path-to-regexp.\n  // This includes params from ancestor routes.\n  params: { photoID: 12345, albumID: 6789 },\n}"),l.a.createElement(u.b,null,l.a.createElement("p",null,'The "settable" properties are ones that are added by a matched route\'s ',l.a.createElement(o.b,null,"response()")," function. These only exist on the response when they are returned by a route's ",l.a.createElement(o.b,null,"response()")," ","function."),l.a.createElement("p",null,'The "settable" properties are:'),l.a.createElement("table",null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"property"),l.a.createElement("th",null,"description"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",null,"body"),l.a.createElement("td",null,"The component(s) that should be rendered for a route.")),l.a.createElement("tr",null,l.a.createElement("td",null,"status"),l.a.createElement("td",null,"An http status, mostly useful for server side rendering.")),l.a.createElement("tr",null,l.a.createElement("td",null,"data"),l.a.createElement("td",null,"A place to attach any data you want to the response, such as data loaded in the route's ",l.a.createElement(o.b,null,"resolve")," functions.")),l.a.createElement("tr",null,l.a.createElement("td",null,"title"),l.a.createElement("td",null,"The response's title, which can be used with"," ",l.a.createElement(r.c,{to:"Package",params:{package:"side-effect-title"}},l.a.createElement(o.b,null,"@curi/side-effect-title"))," ","to set the browsers tab's title.")),l.a.createElement("tr",null,l.a.createElement("td",null,"error"),l.a.createElement("td",null,"A convenient place to attach any errors to the response.")),l.a.createElement("tr",null,l.a.createElement("td",null,"redirectTo"),l.a.createElement("td",null,"An object describing a route that Curi should automatically redirect to."))))),l.a.createElement(u.a,null,"// settable properties (optional)\n{\n  body: Photo,\n  // or maybe\n  body: {\n    menu: PhotoMenu,\n    main: Photo\n  },\n  // Please see below for more information\n  // about this property\n\n  status: 200,\n\n  data: {...},\n\n  title: 'Photo 12345',\n\n  error: undefined,\n\n  redirectTo: {...}\n}")),l.a.createElement(c.b,{title:"Response Body",id:"response-body"},l.a.createElement(u.b,null,l.a.createElement("p",null,"Curi isn't strict about how you use responses, but you will most likely always want to use a route's ",l.a.createElement(o.b,null,"response()")," function to attach a ",l.a.createElement(o.b,null,"body")," property to a response. The usual pattern is to use a route's ",l.a.createElement(o.b,null,"body")," property to describe which component(s) to render when a route matches. This can either be a single component for basic layouts or an object with a number of components for"," ",l.a.createElement(r.c,{to:"Example",params:{category:"react",slug:"multi-body"}},"advanced layouts"),"."),l.a.createElement(s.a,null,"Each route should use the same ",l.a.createElement(o.b,null,"body"),' "shape". If one route returns a single component while another route return an object, you will be making rendering more complicated for yourself.')),l.a.createElement(u.a,null,"// do NOT do this\n// mixing body shapes complicates rendering\nconst routes = [\n  {\n    response() {\n      return { body: One }\n    }\n  },\n  {\n    response() {\n      return {\n        body: {\n          main: Main,\n          menu: Menu\n        }\n      }\n    }\n  }\n];")),l.a.createElement(c.b,{title:"Redirect Response",id:"redirect-properties"},l.a.createElement(u.b,null,l.a.createElement("p",null,"When a route's ",l.a.createElement(o.b,null,"response()")," function returns an object with a"," ",l.a.createElement(r.c,{to:"Package",params:{package:"router"},hash:"response"},l.a.createElement(o.b,null,"redirectTo")," property"),", the router will use it to generate a location object that Curi will automatically redirect to.")),l.a.createElement(u.a,null,"{\n  // The redirectTo property provides information on\n  // where you should redirect to\n  redirectTo: { pathname: '/login' }\n}"),l.a.createElement(u.b,null,l.a.createElement("p",null,"You can choose whether or not you want responses with a"," ",l.a.createElement(o.b,null,"redirectTo")," property to be emitted. If they are not emitted, then the router will redirect without the application's observers knowing about the redirect. The default behavior is to emit redirects, but this also means that you have to render using the redirect response. The ",l.a.createElement(o.b,null,"{ emitRedirects: false }")," ","option prevents this.")),l.a.createElement(u.a,null,"const router = curi(history, routes, {\n  emitRedirects: false\n});"))),l.a.createElement(c.a,{title:"Routes",id:"routes"},l.a.createElement(u.b,null,l.a.createElement("p",null,"Routes are JavaScript objects with two required properties—",l.a.createElement(o.b,null,"name")," ","and ",l.a.createElement(o.b,null,"path"),"—and a number of optional properties."),l.a.createElement("p",null,"A route's ",l.a.createElement(o.b,null,"path")," is used to determine if a route matches a location. Path strings use"," ",l.a.createElement("a",{href:"https://github.com/pillarjs/path-to-regexp"},l.a.createElement(o.b,null,"path-to-regexp"))," ","formatting, which allows you to define dynamic path parameters that a route should match."),l.a.createElement("p",null,"A route's ",l.a.createElement(o.b,null,"name")," is a unique identifier for a route. The"," ",l.a.createElement(o.b,null,"name")," is used to"," ",l.a.createElement(r.c,{to:"Guide",params:{slug:"route-interactions"}},"interact")," ","with a specific route.")),l.a.createElement(u.a,null,'const routes = [\n  {\n    name: "Home",\n    path: ""\n  },\n  {\n    name: "Album",\n    // the "id" segment can be any value\n    path: "a/:id"\n  }\n];'),l.a.createElement(c.b,{title:"Resolve",id:"resolve"},l.a.createElement(u.b,null,l.a.createElement("p",null,"When a route matches, you might want to perform some actions before the application re-renders. This can include validating that a user is authorized to navigate to a route and loading data based on the path parameters parsed from the location."),l.a.createElement("p",null,"A route's ",l.a.createElement(o.b,null,"resolve")," property is an optional object for attaching functions to a route. A response will not be emitted until after all of a route's ",l.a.createElement(o.b,null,"resolve")," functions have finished."),l.a.createElement("p",null,"A route with ",l.a.createElement(o.b,null,"resolve")," properties is asynchronous, which has effects to be aware of. You can read about these in the"," ",l.a.createElement(r.c,{to:"Guide",params:{slug:"sync-or-async"}},"Sync or Async")," ","guide."),l.a.createElement("p",null,"Curi uses Promises to manage a route's ",l.a.createElement(o.b,null,"resolve")," ","functions. Each function should return a Promise. This makes it easy to wait for all of the ",l.a.createElement(o.b,null,"resolve")," functions to complete before emitting the response for a matched route."),l.a.createElement(s.a,null,l.a.createElement(o.b,null,"Promise.resolve()")," can be used to return a Promise."),l.a.createElement("p",null,"When ",l.a.createElement(o.b,null,"resolve"),' functions are called, they will be passed an object with the "match" properties of a response. These are the matched route\'s ',l.a.createElement(o.b,null,"name"),", the ",l.a.createElement(o.b,null,"location"),", an object of parsed ",l.a.createElement(o.b,null,"params"),", and an array of the names of"," ",l.a.createElement(o.b,null,"partial")," route matches.")),l.a.createElement(u.a,null,'{\n  name: "User",\n  path: "u/:id",\n  resolve: {\n    authorized: () => {\n      // run code to verify the user can view the page\n      return Promise.resolve(true);\n    },\n    body: () => {\n      // import the User component using the import() API\n      return import("./components/User");\n    },\n    data: ({ name, location, params, partials }) => {\n      // get specific data using the route\'s params\n      return UserAPI.get(params.id);\n    }\n  }\n}')),l.a.createElement(c.b,{title:"The Response Function",id:"route-response"},l.a.createElement(u.b,null,l.a.createElement("p",null,"Each route can have a ",l.a.createElement(o.b,null,"response()")," function. The role of the ",l.a.createElement(o.b,null,"response()")," function is to return an object of properties to merge onto the response object that will be emitted for the new location."),l.a.createElement("p",null,"Only valid response properties will be merged onto the response. These are the optional response properties listed above (",l.a.createElement(o.b,null,"body"),", ",l.a.createElement(o.b,null,"title"),", ",l.a.createElement(o.b,null,"status"),", ",l.a.createElement(o.b,null,"data"),","," ",l.a.createElement(o.b,null,"redirectTo"),", and ",l.a.createElement(o.b,null,"error"),")."),l.a.createElement("p",null,"The function receives an object with a number of properties you might find useful."),l.a.createElement("p",null,"The first is an object of ",l.a.createElement(o.b,null,"resolve")," properties (the base response properties)."),l.a.createElement("p",null,"The second is a ",l.a.createElement(o.b,null,"resolved")," object, which contains the resolved values from the route's ",l.a.createElement(o.b,null,"resolve")," functions."),l.a.createElement("p",null,"The third property is an ",l.a.createElement(o.b,null,"error"),", which is only defined if one of the ",l.a.createElement(o.b,null,"resolve")," functions throws an error and you don't catch it.")),l.a.createElement(u.a,null,'import User from "./components/User";\n\nconst routes = [\n  {\n    name: "User",\n    path: "u/:id",\n    resolve: {\n      data: ({ params }) => UserAPI.get(params.id)\n    },\n    response({ match, resolved, error }) {\n      if (error) {\n        // ...\n      }\n      return {\n        body: User,\n        data: resolved.data,\n        title: `User ${match.params.id}`\n      };\n    }\n  }\n];')),l.a.createElement(c.a,{title:"Matching Routes",id:"matching-routes"},l.a.createElement(u.b,null,l.a.createElement("p",null,"Whenever Curi receives a new location, it will determine which route has a ",l.a.createElement(o.b,null,"path")," that matches the new location's"," ",l.a.createElement(o.b,null,"pathname")," by walking over the route objects in the order that they are defined in the array. If a route has"," ",l.a.createElement(o.b,null,"children"),", those will be checked before moving to the route's nest sibling."),l.a.createElement("p",null,"We'll use this simple route setup to demonstrate how this works.")),l.a.createElement(u.a,null,"const routes = [\n  {\n    name: 'Home',\n    path: '',\n  },\n  {\n    name: 'Album',\n    path: 'a/:album'\n  },\n  {\n    name: 'Not Found',\n    path: '(.*)' // this matches EVERY pathname\n  }\n];"),l.a.createElement(u.b,null,l.a.createElement("p",null,"Curi's default matching behavior looks for exact matches. This means that when the route only matches part of the pathname, it does not count as a match. If the user navigates to a location with the pathname ",l.a.createElement(o.b,null,'"/a/red/yellow"'),", the ",l.a.createElement(o.b,null,"Album")," ","route will only partially match, so Curi will move on to the next route, ",l.a.createElement(o.b,null,"Not Found"),", which has a catch all ",l.a.createElement(o.b,null,"path")," ","that matches every pathname. Routes can be configured to allow partial matching, but exact matching is usually preferable."),l.a.createElement("p",null,"If a route has children, Curi will check if any of those routes form a complete match before moving on to the next route in the routes array.")),l.a.createElement(u.a,null,"// when the pathname is '/a/Coloring+Book/All+Night',\n// the Album route will partially match the pathname.\n// Then, its child route Song will be tested and fully\n// match the pathname.\n{\n  name: 'Album',\n  path: 'a/:album',\n  children: [\n    {\n      name: 'Song',\n      path: ':title'\n    }\n  ]\n}"),l.a.createElement(u.b,null,l.a.createElement("p",null,"You can control whether a route does exact or partial matching with"," ",l.a.createElement(r.c,{hash:"pathOptions"},l.a.createElement(o.b,null,"pathOptions"))," ","property. If you set ",l.a.createElement(o.b,null,"{ end: false }"),", a route that partially matches will consider itself matched.")),l.a.createElement(u.a,null,"// when the pathname is\n// '/a/Good+Kid,+M.A.A.D+City/Poetic+Justice',\n// the Album route will partially match, but because\n// it sets \"end\" to false, the partial match will still be used.\n{\n  name: 'Album',\n  path: 'a/:albumID',\n  pathOptions: {\n    end: false\n  }\n}"),l.a.createElement(c.b,{title:"No Matching Route",id:"catch-all"},l.a.createElement(s.b,null,l.a.createElement(u.b,null,l.a.createElement("p",null,"If none of your routes match a location, Curi will do nothing! You need to set a catch-all route to match these locations yourself. The best way to do this is to add a route to the end of your routes array with a ",l.a.createElement(o.b,null,"path")," of"," ",l.a.createElement(o.b,null,'"(.*)"'),", which will match every pathname.")),l.a.createElement(u.a,null,"{\n  name: 'Not Found',\n  path: '(.*)',\n}"))))))}}}]);