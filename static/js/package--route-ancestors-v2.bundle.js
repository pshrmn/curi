(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{87:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(20),l={title:"Arguments",hash:"arguments"},s={title:"ancestors",hash:"ancestors",children:[l]};function c(){return a.a.createElement(o.e,{meta:s},a.a.createElement("p",null,"A function to create the ancestors route interaction."),a.a.createElement("p",null,'The interaction returns the name of an ancestor route a given level "up" from the route. If no level is provided, then it will return an array of the names of all ancestor routes (from most ancient to parent).'),a.a.createElement(o.d,null,"import { prepareRoutes, createRouter } from \"@curi/router\";\nimport ancestors from '@curi/route-ancestors';\n\nconst routes = prepareRoutes({\n  routes: [\n    {\n      name: 'Grandparent', path: 'g',\n      children: [\n        {\n          name: 'Parent', path: 'p',\n          children: [\n            { name: 'Child', path: 'c' }\n          ]\n        }\n      ]\n    }\n  ],\n  interactions: [ancestors()]\n});\n\nconst router = createRouter(history,routes);"),a.a.createElement(o.e,{meta:l,tag:"h3"},a.a.createElement(o.e,{tag:"h4",meta:{title:"name",hash:"arguments-name"}},a.a.createElement("p",null,"The name of the route to get the ancestors of.")),a.a.createElement(o.e,{tag:"h4",meta:{title:"level",hash:"arguments-level"}},a.a.createElement("p",null,'A number of levels "up" to get the ancestor name of. If this argument is not provided, the interaction will return an array of all ancestor routes names (from most ancient to parent).')),a.a.createElement(o.d,null,"const parent = router.route.ancestors('Child', 1);\n// parent === 'Parent'\nconst ancestors = router.route.ancestors('Child');\n// ancestors === ['Grandparent', 'Parent']")))}var u=a.a.memo(function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(o.b,null,a.a.createElement("p",null,"The ",a.a.createElement(o.f,null,"@curi/route-ancestors")," route interaction returns the names of ancestor routes, which can be useful for generating breadcrumb links.")),a.a.createElement(o.a,null,a.a.createElement(c,null)))}),i=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[s]}];n.d(t,"component",function(){return u}),n.d(t,"contents",function(){return i})}}]);