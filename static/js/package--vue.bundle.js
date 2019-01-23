(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{46:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return f});var l=n(0),a=n.n(l),r=n(3),i=n(30);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}function u(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var f=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),u(this,m(t).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(t,a.a.PureComponent),function(e,t,n){t&&c(e.prototype,t),n&&c(e,n)}(t,[{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(i.b,null,a.a.createElement(i.e,null,a.a.createElement("p",null,"This package enables you to use Curi alongside VueJS."),a.a.createElement("p",null,"For more information on using Curi with Vue, please check out the"," ",a.a.createElement(r.b,{name:"Guide",params:{slug:"vue"}},"Vue guide"),"."))),a.a.createElement(i.a,null,a.a.createElement(i.i,{title:"CuriPlugin",id:"curiplugin"},a.a.createElement(i.e,null,a.a.createElement("p",null,"What does the plugin do?"),a.a.createElement("ol",null,a.a.createElement("li",null,"Register ",a.a.createElement(i.c,null,"curi-link")," and ",a.a.createElement(i.c,null,"curi-block")," ","components with Vue so they can be used anywhere within your application without manually importing."),a.a.createElement("li",null,"Makes the Curi router globally available to Vue components as"," ",a.a.createElement(i.f,null,"$router"),"."),a.a.createElement("li",null,"Makes responses and navigations available to components through the ",a.a.createElement(i.f,null,"$curi")," property. ",a.a.createElement(i.f,null,"$curi")," is responsive, so when a new response is emitted,"," ",a.a.createElement(i.f,null,"$curi.response")," and ",a.a.createElement(i.f,null,"$curi.navigation")," will automatically be updated."))),a.a.createElement(i.d,null,"import { CuriPlugin } from '@curi/vue';\n\nconst router = curi(history, routes);\nVue.use(CuriPlugin, { router });")),a.a.createElement(i.i,{title:a.a.createElement(i.c,null,"curi-link"),id:"link"},a.a.createElement("p",null,"The ",a.a.createElement(i.c,null,"curi-link")," component will render an anchor (",a.a.createElement(i.c,null,"a"),") element."),a.a.createElement(i.i,{tag:"h4",title:"to",id:"Link-to"},a.a.createElement(i.e,null,a.a.createElement("p",null,a.a.createElement(i.f,null,"to")," - The name of the route to navigate to."," ",a.a.createElement("em",null,"This is required"),".")),a.a.createElement(i.d,{lang:"html"},"<curi-link to='Home'>Home</curi-link>\n\x3c!-- <a href=\"/\">Home</a> --\x3e")),a.a.createElement(i.i,{tag:"h4",title:"params",id:"Link-params"},a.a.createElement(i.e,null,a.a.createElement("p",null,a.a.createElement(i.f,null,"params")," - An object containing the key-value params for the route. For example, if you are linking to a route with the path ",a.a.createElement(i.f,null,"album/:title"),", the params object should have a ",a.a.createElement(i.f,null,"title")," property.")),a.a.createElement(i.d,{lang:"html"},"<curi-link\n  to='Album'\n  :params=\"{ title: 'Coloring Book' }\"\n  >\n  Coloring Book\n</curi-link>")),a.a.createElement(i.i,{tag:"h4",title:"hash",id:"Link-hash"},a.a.createElement(i.e,null,a.a.createElement("p",null,a.a.createElement(i.f,null,"hash")," - the hash for the location to link to")),a.a.createElement(i.d,{lang:"html"},'<curi-link to="Home" hash="test">Home</curi-link>\n\x3c!-- <a href="/#test">Home</a> --\x3e')),a.a.createElement(i.i,{tag:"h4",title:"query",id:"Link-query"},a.a.createElement(i.e,null,a.a.createElement("p",null,a.a.createElement(i.f,null,"query")," - the query for the location to link to")),a.a.createElement(i.d,{lang:"html"},'<curi-link to="Home" query="one=1">Home</curi-link>\n\x3c!-- <a href="/?one=1">Home</a> --\x3e')),a.a.createElement(i.i,{tag:"h4",title:"state",id:"Link-state"},a.a.createElement(i.e,null,a.a.createElement(i.f,null,"state")," - the state to associated with the location")),a.a.createElement(i.i,{tag:"h4",title:"slots",id:"Link-slots"},a.a.createElement(i.e,null,a.a.createElement("p",null,"The ",a.a.createElement(i.c,null,"curi-link"),"'s can take either a regular slot or a scoped slot."),a.a.createElement("p",null,"When given a scoped slot, the ",a.a.createElement(i.c,null,"curi-link")," will inject the link's navigation state (a ",a.a.createElement(i.f,null,"navigating")," ","property). The navigation state is ",a.a.createElement(i.f,null,"false")," by default, ",a.a.createElement(i.f,null,"true")," when the ",a.a.createElement(i.c,null,"curi-link")," is clicked, and ",a.a.createElement(i.f,null,"false")," when the the navigation finishes/is cancelled.")),a.a.createElement(i.d,{lang:"html"},'\x3c!-- a regular slot --\x3e\n<curi-link to="Home">\n  Home\n</curi-link>\n\n\x3c!-- a scoped slot --\x3e\n<curi-link to="User" :params="{ id: 1 }">\n  <template slot-scope="{ navigating }">\n    User 1\n    <spinner v-if="navigating" />\n  </template>\n</curi-ink>'))),a.a.createElement(i.i,{title:a.a.createElement(i.c,null,"curi-block"),id:"block"},a.a.createElement(i.e,null,a.a.createElement("p",null,"The ",a.a.createElement(i.c,null,"curi-block")," component can be used to automatically block navigation from a page. This will only block in-app navigation. If the user attempts to leave your application, they will not be blocked."),a.a.createElement("p",null,"The ",a.a.createElement(i.c,null,"curi-block")," expects two props: ",a.a.createElement(i.f,null,"active")," ","and ",a.a.createElement(i.f,null,"confirm"),"."),a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement(i.f,null,"active")," - When this is true, navigation will be blocked and when it is false, navigation will be allowed. If you do not provide this prop, it will default to"," ",a.a.createElement(i.f,null,"true"),"."),a.a.createElement("li",null,a.a.createElement(i.f,null,"confirm")," - The function that will be called to confirm/deny the navigation."))),a.a.createElement(i.d,{lang:"html"},'<template>\n  <div>\n    \x3c!-- ... --\x3e\n    <curi-block :active="active" :confirm="confirm" />\n  </div>\n</template>\n\n<script>\n  export default {\n    data: {\n      active: true\n    },\n    methods: {\n      confirm(information, go, stay) {\n        const confirmed = window.confirm(\'Navigate?\');\n        if (confirmed) {\n          go();\n        } else {\n          stay();\n        }\n      }\n    }\n  }\n<\/script>')),a.a.createElement(i.i,{title:a.a.createElement(i.f,null,"curi-focus"),id:"curi-focus"},a.a.createElement(i.e,null,a.a.createElement("p",null,"The ",a.a.createElement(i.f,null,"curi-focus")," directive is used to specify an element that should be focused when a new response is emitted."),a.a.createElement("p",null,'The DOM component that gets the ref should either already be "focusable", like an ',a.a.createElement(i.c,null,"input"),", or be given a"," ",a.a.createElement(i.f,null,"tabIndex")," prop (usually with the value of"," ",a.a.createElement(i.f,null,"-1"),"). If neither of these conditions is met, then the document's ",a.a.createElement(i.c,null,"body")," will be focused."),a.a.createElement("p",null,"The focused element will have an outline (the exact style varies by browser). You can remove this visual with a CSS outline of"," ",a.a.createElement(i.f,null,'"none"'),"."),a.a.createElement(i.g,null,"You should only have one focused element rendered at a time.")),a.a.createElement(i.d,{lang:"html"},'<template>\n  <main :tabIndex="-1" v-curi-focus="{ key: $curi.response }">\n    <component :is="$curi.response.body" />\n  </main>\n</template>'),a.a.createElement(i.i,{tag:"h3",title:"Properties",id:"focus-properties"},a.a.createElement(i.i,{tag:"h4",title:"key",id:"focus-key"},a.a.createElement(i.e,null,a.a.createElement("p",null,"A value that changes when there is a new response; the"," ",a.a.createElement(i.f,null,"response")," is usually fine for this."))),a.a.createElement(i.i,{tag:"h4",title:"preserve",id:"focus-preserve"},a.a.createElement(i.e,null,a.a.createElement("p",null,"When ",a.a.createElement(i.f,null,"true")," (",a.a.createElement(i.f,null,"false")," by default), the element will not be focused if one of its children elements is already focused."),a.a.createElement("p",null,"This is useful if the element has children that are automatically focused (",a.a.createElement(i.c,null,"input autofocus"),").")),a.a.createElement(i.d,{lang:"html"},'\x3c!-- <input> will be focused --\x3e\n<template>\n  <main\n    :tabIndex="-1"\n    v-curi-focus="{ key: $curi.response, preserve: true}"\n  >\n    <input autofocus />\n  </main>\n</template>\n\n\x3c!-- <main> will be focused --\x3e\n<template>\n  <main :tabIndex="-1" v-curi-focus="{ key: $curi.response }">\n    <input autofocus />\n  </main>\n</template>')),a.a.createElement(i.i,{tag:"h4",title:"preventScroll",id:"focus-preventScroll"},a.a.createElement(i.e,null,a.a.createElement("p",null,"When ",a.a.createElement(i.f,null,"true")," (",a.a.createElement(i.f,null,"false")," by default), the element will not be scrolled to when it is focused."),a.a.createElement("p",null,"This only works in browsers that support the"," ",a.a.createElement(i.f,null,"preventScroll")," option for ",a.a.createElement(i.f,null,"focus()"),".")),a.a.createElement(i.d,{lang:"html"},'<template>\n  <main\n    :tabIndex="-1"\n    v-curi-focus="{ key: $curi.response, preventScroll: true}"\n  >\n  <component :is="$curi.response.body" />\n  </main>\n</template>'))))))}}]),t}()}}]);