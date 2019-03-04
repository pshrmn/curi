(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{86:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(20),c={title:"Arguments",hash:"arguments"},o={title:"active()",hash:"active",children:[c]};function u(){return r.a.createElement(l.e,{meta:o},r.a.createElement("p",null,"A function to create the active route interaction. When you create your router, the result is passed to the router using the `route` option, which will add an ",r.a.createElement(l.f,null,"active()")," function to the router's route interactions."),r.a.createElement("p",null,"The interaction returns a boolean: ",r.a.createElement(l.f,null,"true"),' when a route is "active" (it matches the response\'s ',r.a.createElement(l.f,null,"location"),") and"," ",r.a.createElement(l.f,null,"false")," when it does not."),r.a.createElement(l.d,null,"import { curi } from '@curi/router';\nimport active from '@curi/route-active';\n\nconst router = curi(history, routes, {\n  route: [active()]\n});"),r.a.createElement(l.e,{meta:c,tag:"h3"},r.a.createElement(l.i,null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"argument"),r.a.createElement("th",null,"description"))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"name"),r.a.createElement("td",null,"the name of the route to check if it is active")),r.a.createElement("tr",null,r.a.createElement("td",null,"response"),r.a.createElement("td",null,"the response to check the route against.")),r.a.createElement("tr",null,r.a.createElement("td",null,"params"),r.a.createElement("td",null,"any route params for the route that is being checked")),r.a.createElement("tr",null,r.a.createElement("td",null,"partial"),r.a.createElement("td",null,"when ",r.a.createElement(l.f,null,"true"),", ancestor routes can be considered active. (default ",r.a.createElement(l.f,null,"false"),")")))),r.a.createElement(l.d,null,"const isActive = router.route.active(\n  'Some Route',\n  response,\n  { id: 10 },\n  false\n);")))}var i=r.a.memo(function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.b,null,r.a.createElement("p",null,"The ",r.a.createElement(l.f,null,"@curi/route-active"),' package determines whether a route is "active" by comparing it to the current response. This can be restricted to complete matches or allow partial matches so that locations that represent an ancestor of the current location are also considered "active".')),r.a.createElement(l.a,null,r.a.createElement(u,null)))}),s=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[o]}];n.d(t,"component",function(){return i}),n.d(t,"contents",function(){return s})}}]);