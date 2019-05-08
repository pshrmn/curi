(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{90:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(21),c={title:"Arguments",hash:"arguments"},u={title:"active",hash:"active",children:[c]};var o={about:l.a.createElement(r.b,null,l.a.createElement("p",null,"The ",l.a.createElement(r.f,null,"@curi/route-active"),' package determines whether a route is "active" by comparing it to the current response. This can be restricted to complete matches or allow partial matches so that locations that represent an ancestor of the current location are also considered "active".'),l.a.createElement(r.g,null,l.a.createElement("p",null,l.a.createElement(r.f,null,"@curi/router")," v2 automatically includes the active interaction, making this package unnecessary."))),api:l.a.createElement(r.a,null,l.a.createElement(function(){return l.a.createElement(r.e,{meta:u},l.a.createElement("p",null,"A function to create the active route interaction. When you create your router, the result is passed to the router using the ",l.a.createElement(r.f,null,"route")," ","option, which will add an ",l.a.createElement(r.f,null,"active")," function to the router's route interactions."),l.a.createElement("p",null,"The interaction returns a boolean: ",l.a.createElement(r.f,null,"true"),' when a route is "active" (it matches the response\'s ',l.a.createElement(r.f,null,"location"),") and"," ",l.a.createElement(r.f,null,"false")," when it does not."),l.a.createElement(r.d,null,"import { curi } from '@curi/router';\nimport active from '@curi/route-active';\n\nconst router = curi(history, routes, {\n  route: [active()]\n});"),l.a.createElement(r.e,{meta:c,tag:"h3"},l.a.createElement(r.h,null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"argument"),l.a.createElement("th",null,"description"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",null,"name"),l.a.createElement("td",null,"the name of the route to check if it is active")),l.a.createElement("tr",null,l.a.createElement("td",null,"response"),l.a.createElement("td",null,"the response to check the route against.")),l.a.createElement("tr",null,l.a.createElement("td",null,"params"),l.a.createElement("td",null,"any route params for the route that is being checked")),l.a.createElement("tr",null,l.a.createElement("td",null,"partial"),l.a.createElement("td",null,"when ",l.a.createElement(r.f,null,"true"),", ancestor routes can be considered active. (default ",l.a.createElement(r.f,null,"false"),")")))),l.a.createElement(r.d,null,"const isActive = router.route.active(\n  'Some Route',\n  response,\n  { id: 10 },\n  false\n);")))},null))},i=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[u]}];a.d(t,"sections",function(){return o}),a.d(t,"contents",function(){return i})}}]);