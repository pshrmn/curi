(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{40:function(e,t,n){"use strict";n.r(t),n.d(t,"component",function(){return m}),n.d(t,"contents",function(){return s});var r=n(0),a=n.n(r),o=n(22),l={title:"Route Interactions"},i={title:"Adding Interactions",hash:"adding"},u={title:"Slightly more advanced",hash:"Slightly-more-advanced"},c={title:"Creating Route Interactions",hash:"creating",children:[u]},s=[i,c];function m(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(o.f,null,a.a.createElement("h1",null,l.title),a.a.createElement("p",null,"Route interactions let you interact with a registered route using its name."),a.a.createElement("p",null,"A registered route is generally any route that is in the array of routes that you used to create your router. However, some interactions only register routes that meet some criteria. For example, the"," ",a.a.createElement(o.d,null,"prefetch")," interaction only registers routes with asynchronous methods."),a.a.createElement("p",null,"Route interactions are defined using objects with four properties: name, register, get, and reset."),a.a.createElement(o.b,null,"{\n  // The string you will use to call the interaction.\n  name: 'my',\n\n  // A function used internally to register routes\n  // with the interaction. You only need to use this when\n  // writing your own interactions.\n  register: function(route, parentData) {...},\n\n  // This is the function that you will call. For example,\n  // with this interaction, the get function will be\n  // called when you call router.route.my('...')\n  get: function(route) {...},\n  reset: function() {...}\n}"),a.a.createElement("p",null,"Instead of importing the actual route interaction object, you typically import a factory function to create the object. This isn't absolutely necessary, but is useful for server-side rendering."),a.a.createElement(o.b,null,'// interactions/my.js\nfunction createMyInteraction() {\n  return {\n    name: "my",\n    register() {...},\n    get() {...},\n    reset() {...}\n  };\n}\n\n// index.js\nimport createMyInteraction from "./interactions/my";\n\nconst interaction = createMyInteraction();')),a.a.createElement(o.c,{meta:i},a.a.createElement("p",null,"Route interactions are provided to the router call as an array using the ",a.a.createElement(o.d,null,"route")," property of the options object (the third argument)."),a.a.createElement(o.b,null,"const router = create_router(browser, routes, {\n  route: [createMyInteraction()]\n});"),a.a.createElement("p",null,"The route interaction will be added to the router's ",a.a.createElement(o.d,null,"route")," ","property. When you call an interaction, you pass the name of the route that you want to interact with."),a.a.createElement(o.b,null,"const myValue = router.route.my('Some Route', ...);")),a.a.createElement(o.c,{meta:c},a.a.createElement("p",null,"There are a few steps to creating your own route interactions."),a.a.createElement("p",null,"Remember to export a function that will create the interaction object, not the actual interaction object."),a.a.createElement(o.b,null,"// we'll create an interaction that confirms\n// a route is registered\nfunction confirmInteraction() {\n  ...\n}"),a.a.createElement("p",null,"The function should return an object with four properties:"," ",a.a.createElement(o.d,null,"name"),", ",a.a.createElement(o.d,null,"register"),", ",a.a.createElement(o.d,null,"get"),", and"," ",a.a.createElement(o.d,null,"reset"),"."),a.a.createElement(o.g,null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"property"),a.a.createElement("th",null,"description"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"name"),a.a.createElement("td",null,"a unique identifier for the route interaction")),a.a.createElement("tr",null,a.a.createElement("td",null,"register"),a.a.createElement("td",null,"a function to internally store information about routes")),a.a.createElement("tr",null,a.a.createElement("td",null,"get"),a.a.createElement("td",null,"a function that will receive a route's name (and possibly other arguments) and perform some task using the related route")),a.a.createElement("tr",null,a.a.createElement("td",null,"reset"),a.a.createElement("td",null,"a function that will reset the interaction's internal state (this is used if you call ",a.a.createElement(o.d,null,"router.replaceRoutes()"),")")))),a.a.createElement(o.b,null,"function confirmInteraction() {\n  // maintain an object of known routes\n  let knownRoutes = {};\n  return {\n    name: 'confirm',\n    // when a route is registered,\n    // we store it using its name\n    register: route => {\n      knownRoutes[route.name] = true;\n    },\n    // get checks the known routes to see if one exists\n    // with the requested name\n    get: (name) => {\n      return knownRoutes[name] != null\n    },\n    // reset the known routes\n    reset: () => {\n      knownRoutes = {};\n    }\n  };\n}"),a.a.createElement("p",null,"In your application, you can import it, call the factory to create the interaction, and register the interaction when you create the router."),a.a.createElement(o.b,null,"import { curi, prepare_routes } from '@curi/router';\nimport confirmFactory from './interactions/confirm'\n\nconst routes = prepare_routes([{ name: 'Home', path: '' }]);\n\nconst router = create_router(browser, routes, {\n  route: [confirmFactory()]\n});\n\nrouter.route.confirm('Home'); // true\nrouter.route.confirm('Elsewhere'); // false"),a.a.createElement(o.c,{meta:u,tag:"h3"},a.a.createElement("p",null,"You might want to write an interaction that uses data from parent routes when registering a route. For example, the built-in pathname interaction joins a route's path with it parent path(s)."),a.a.createElement("p",null,"The second argument passed to a router interaction's"," ",a.a.createElement(o.d,null,"register()")," function is a parent data object. For root routes, this will be ",a.a.createElement(o.d,null,"undefined"),". For nested routes, this is the value returned by the parent route's ",a.a.createElement(o.d,null,"register()")," ","function."),a.a.createElement(o.b,null,"function ParentFactory() {\n  let routeTree = {};\n  return {\n    name: 'routeParent',\n    register: (route, parent) => {\n      routeTree[route.name] = parent;\n      // we return route.name and any child routes will\n      // receive that as their parent value\n      return route.name;\n    },\n    get: (name) => {\n      return routeTree[name];\n    },\n    reset: () => {\n      routeTree = {};\n    }\n  }\n}"))))}}}]);