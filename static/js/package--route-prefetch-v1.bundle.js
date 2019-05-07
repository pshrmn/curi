(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{89:function(e,t,n){"use strict";n.r(t);var l=n(0),r=n.n(l),a=n(21),o={title:"Arguments",hash:"arguments"},u={title:"prefetch",hash:"prefetch",children:[o]};function c(){return r.a.createElement(a.e,{meta:u},r.a.createElement("p",null,"A function to create the prefetch route interaction. When you create your router, the result is passed to the router using the"," ",r.a.createElement(a.f,null,"route")," option, which will add a ",r.a.createElement(a.f,null,"prefetch")," function to the router's route interactions."),r.a.createElement(a.d,null,"import { curi } from '@curi/router';\nimport prefetch from '@curi/route-prefetch';\n\nconst router = curi(history, routes, {\n  route: [prefetch()]\n});\n\nrouter.route.prefetch(\"Some Route\");"),r.a.createElement(a.e,{meta:o,tag:"h3"},r.a.createElement(a.i,null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"argument"),r.a.createElement("th",null,"description"))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"name"),r.a.createElement("td",null,"The name of the route to prefetch.")),r.a.createElement("tr",null,r.a.createElement("td",null,"resolve"),r.a.createElement("td",null,"Route props that are used by the ",r.a.createElement(a.f,null,"resolve")," functions.")),r.a.createElement("tr",null,r.a.createElement("td",null,"which"),r.a.createElement("td",null,"An array whose values are the names of the ",r.a.createElement(a.f,null,"resolve")," ","functions that should be called. If this array is not provided, all available functions will be called.")))),r.a.createElement(a.g,null,r.a.createElement("p",null,"This route interaction will only register routes that have"," ",r.a.createElement(a.f,null,"resolve")," functions. If you try calling this for any routes with neither of those, ",r.a.createElement(a.f,null,"prefetch")," will resolve an object with an ",r.a.createElement(a.f,null,"error")," property.")),r.a.createElement(a.d,null,"\n{\n  name: \"User\",\n  path: \"u/:id\",\n  resolve: {\n    one: () => {...},\n    two: () => {...}\n  }\n}\n\n// call a route's resolve.one() and resolve.two() functions\nrouter.route.prefetch(\n  'User',\n  { params: { id: 2 }}\n)\n\n// only call the route's resolve.one() function\nrouter.route.prefetch(\n  'User',\n  { params: { id: 3 }},\n  ['one']\n);")))}var i=r.a.memo(function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(a.b,null,r.a.createElement("p",null,"The prefetch route interaction can be used fetch data for a route prior to navigating. The interaction will call a route's"," ",r.a.createElement(a.f,null,"resolve")," functions (if they exist on the route)."),r.a.createElement("p",null,"Prefetching data means results in faster renders after navigation because you don't have to wait for the data to load.")),r.a.createElement(a.h,null,r.a.createElement(a.g,null,r.a.createElement("p",null,"Prefetching ",r.a.createElement(a.f,null,"resolve")," function calls is only beneficial if you cache the results because the function will be re-called when the user navigates to that route. Functions wrapped by the"," ",r.a.createElement(a.f,null,"once")," wrapper (from ",r.a.createElement(a.f,null,"@curi/helpers"),") will automatically re-use the results from their first call."))),r.a.createElement(a.a,null,r.a.createElement(c,null)))}),s=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[u]}];n.d(t,"component",function(){return i}),n.d(t,"contents",function(){return s})}}]);