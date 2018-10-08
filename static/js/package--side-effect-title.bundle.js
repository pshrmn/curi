(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{123:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return m});var r=n(0),o=n.n(r),a=(n(2),n(26)),i=n(27),l=n(9),u=n(10),c=n(6);function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var m=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),p(this,b(t).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(t,o.a.PureComponent),function(e,t,n){t&&f(e.prototype,t),n&&f(e,n)}(t,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(i.a,null,o.a.createElement(c.b,null,o.a.createElement("p",null,"This package adds a side effect to the router that updates the page's title as a result of navigation."))),o.a.createElement(a.a,null,o.a.createElement(u.a,{tag:"h3",title:"titleEffect",id:"titleEffect"},o.a.createElement(c.b,null,o.a.createElement("p",null,o.a.createElement(l.b,null,"@curi/side-effect-title")," exports a function for creating a side effect that will update the page's title whenever a new response is created."),o.a.createElement("p",null,"When creating the title side effect, you pass it a function. That function will be passed the object emitted by the router (with ",o.a.createElement(l.b,null,"response"),", ",o.a.createElement(l.b,null,"navigation"),", and"," ",o.a.createElement(l.b,null,"router")," properties). The function returns a string, which the side effect will set as the document's"," ",o.a.createElement(l.b,null,"title"),".")),o.a.createElement(c.a,null,"import { curi } from '@curi/router';\nimport titleEffect from '@curi/side-effect-title';\n\nconst setTitle = titleEffect(({ response }) => {\n  return `${response.title} | My Site`;\n});\n\nconst router = curi(history, routes, {\n  sideEffects: [setTitle]\n});"),o.a.createElement(c.b,null,o.a.createElement("p",null,"While you can use any properties of the ",o.a.createElement(l.b,null,"response")," to generate the string, the ",o.a.createElement(l.b,null,"response.title")," property is intended to be used with this side effect.")),o.a.createElement(c.a,null,'{\n  name: "About",\n  path: "about",\n  response() {\n    return {\n      body: Home,\n      title: "About"\n    }\n  }              \n}\n// when the About route matches, document.title = "About | My Site"'))))}}]),t}()}}]);