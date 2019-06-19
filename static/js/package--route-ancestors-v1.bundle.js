(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{81:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),l=n(20),o={title:"Arguments",hash:"arguments"},u={title:"ancestors",hash:"ancestors",children:[o]};var c={about:a.a.createElement(l.b,null,a.a.createElement("p",null,"The ",a.a.createElement(l.f,null,"@curi/route-ancestors")," route interaction returns the names of ancestor routes, which can be useful for generating breadcrumb links.")),api:a.a.createElement(l.a,null,a.a.createElement(function(){return a.a.createElement(l.e,{meta:u,tag:"h2"},a.a.createElement("p",null,"A function to create the ancestors route interaction. When you create your router, the result is passed to the router using the"," ",a.a.createElement(l.f,null,"route")," option, which will add an ",a.a.createElement(l.f,null,"ancestors")," function to the router's route interactions."),a.a.createElement("p",null,'The interaction returns the name of an ancestor route a given level "up" from the route. If no level is provided, then it will return an array of the names of all ancestor routes (from most ancient to parent).'),a.a.createElement(l.d,null,"import { curi } from '@curi/router';\nimport ancestors from '@curi/route-ancestors';\n\nconst routes = prepare_routes([\n  {\n    name: 'Grandparent', path: 'g',\n    children: [\n      {\n        name: 'Parent', path: 'p',\n        children: [\n          { name: 'Child', path: 'c' }\n        ]\n      }\n    ]\n  }\n]);\n\nconst router = curi(history,routes, {\n  route: [ancestors()]\n});"),a.a.createElement(l.e,{meta:o,tag:"h3"},a.a.createElement(l.h,null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"argument"),a.a.createElement("th",null,"description"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"name"),a.a.createElement("td",null,"the name of the route to get ancestors of")),a.a.createElement("tr",null,a.a.createElement("td",null,"level"),a.a.createElement("td",null,'a number of levels "up" to get the ancestor name of. If this argument is not provided, the interaction will return an array of all ancestor routes names (from most ancient to parent).')))),a.a.createElement(l.d,null,"const parent = router.route.ancestors('Child', 1);\n// parent === 'Parent'\nconst ancestors = router.route.ancestors('Child');\n// ancestors === ['Grandparent', 'Parent']")))},null))},s=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[u]}];n.d(t,"sections",function(){return c}),n.d(t,"contents",function(){return s})}}]);