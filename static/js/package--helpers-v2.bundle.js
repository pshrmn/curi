(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{86:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(20),o={title:"once()",hash:"once"};function u(){return l.a.createElement(r.e,{meta:o},l.a.createElement("p",null,l.a.createElement(r.f,null,"once()")," takes a function as its argument and returns a new function. The first time the returned function is called, it will call the function passed to it and return its result. Every call after that will re-use the result from the first call."),l.a.createElement("p",null,"The ",l.a.createElement(r.f,null,"once()")," function is useful for any async functions that only need to be called once."),l.a.createElement(r.g,null,l.a.createElement("p",null,"This will not work for functions whose result depends on variables that will change for a route (i.e. loading data based on route params).")),l.a.createElement(r.d,null,'import { once } from "@curi/helpers";\n\nconst cachedGetItems = once(() => api.getItems);\n\nconst routes = prepare_routes([\n  {\n  name: "Menu",\n  path: "menu",\n  resolve() {\n    // this function will be called every time the user\n    // navigates to the "Menu" route\n    const nonCached = api.getItems();\n\n    // this function is only called the first time the\n    // user navigates to the "Menu" route\n    const cached = cachedGetItems();\n    return Promise.all([nonCached, cached]);\n  }\n]);'))}var c={title:"prefer_default()",hash:"prefer_default"};function i(){return l.a.createElement(r.e,{meta:c},l.a.createElement("p",null,"When using dynamic import syntax (",l.a.createElement(r.f,null,'import("someModule")'),"), the resolved module is a module object containing all of the exports from that module. If the module has a default export (",l.a.createElement(r.f,null,"export default ..."),"), that will be the module's"," ",l.a.createElement(r.f,null,"default")," property. The ",l.a.createElement(r.f,null,"prefer_default()")," function will resolve with the ",l.a.createElement(r.f,null,"default")," property of the module if it exists and with the module if it does not."),l.a.createElement(r.d,null,'import { prefer_default } from "@curi/helpers";\n\nconst routes = prepare_routes([\n  {\n    name: "Menu",\n    path: "menu",\n    resolve() {\n      return import("./components/Menu")\n        .then(prefer_default);\n    },\n    response({ resolved }) {\n      return { body: resolved }\n    }\n  }\n]);'))}var s=l.a.memo(function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(r.b,null,l.a.createElement("p",null,"The ",l.a.createElement(r.f,null,"@curi/helpers")," package provides functions that may be useful in a Curi application.")),l.a.createElement(r.a,null,l.a.createElement(u,null),l.a.createElement(i,null)))}),m=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[o,c]}];n.d(t,"component",function(){return s}),n.d(t,"contents",function(){return m})}}]);