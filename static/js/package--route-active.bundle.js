(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{118:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return b});var r=n(0),a=n.n(r),o=n(26),l=n(27),c=n(9),u=n(10),i=n(6);function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var b=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),f(this,p(t).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(t,a.a.PureComponent),function(e,t,n){t&&m(e.prototype,t),n&&m(e,n)}(t,[{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(l.a,null,a.a.createElement(i.b,null,a.a.createElement("p",null,"The ",a.a.createElement(c.b,null,"@curi/route-active"),' package determines whether a route is "active" by comparing it to the current response. This can be restricted to complete matches or allow partial matches so that locations that represent an ancestor of the current location are also considered "active".'))),a.a.createElement(o.a,null,a.a.createElement(u.a,{tag:"h3",title:"active",id:"active"},a.a.createElement(i.b,null,a.a.createElement("p",null,"A function to create the active route interaction. When you create your router, the result is passed to the router using the `route` option, which will add an ",a.a.createElement(c.b,null,"active()")," function to the router's route interactions."),a.a.createElement("p",null,"The interaction returns a boolean: ",a.a.createElement(c.b,null,"true"),' when a route is "active" (it matches the response\'s ',a.a.createElement(c.b,null,"location"),") and"," ",a.a.createElement(c.b,null,"false")," when it does not.")),a.a.createElement(i.a,null,"import { curi } from '@curi/router';\nimport active from '@curi/route-active';\n\nconst router = curi(history, routes, {\n  route: [active()]\n});"),a.a.createElement(u.b,{title:"Arguments",id:"arguments"},a.a.createElement(i.b,null,a.a.createElement("table",null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"argument"),a.a.createElement("th",null,"description"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"name"),a.a.createElement("td",null,"the name of the route to check if it is active")),a.a.createElement("tr",null,a.a.createElement("td",null,"response"),a.a.createElement("td",null,"the response to check the route against.")),a.a.createElement("tr",null,a.a.createElement("td",null,"params"),a.a.createElement("td",null,"any route params for the route that is being checked")),a.a.createElement("tr",null,a.a.createElement("td",null,"partial"),a.a.createElement("td",null,"when ",a.a.createElement(c.b,null,"true"),", ancestor routes can be considered active. (default ",a.a.createElement(c.b,null,"false"),")"))))),a.a.createElement(i.a,null,"const isActive = router.route.active(\n  'Some Route',\n  response,\n  { id: 10 },\n  false\n);")))))}}]),t}()}}]);