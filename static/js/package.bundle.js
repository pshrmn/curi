(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{104:function(e,a,n){},125:function(e,a,n){"use strict";n.r(a);var t=n(0),r=n.n(t),l=n(21),c=n(9),i=n(10),m=n(6);function o(e){var a=e.name;return r.a.createElement(r.a.Fragment,null,r.a.createElement(m.b,null,r.a.createElement("p",null,"The package can be installed through ",r.a.createElement(c.b,null,"npm")," (you need to have Node & NPM installed).")),r.a.createElement(m.a,{lang:"bash"},"npm install @curi/".concat(a)))}var u=function(e){var a=e.name,n=e.version,t=e.globalName;return r.a.createElement(m.b,null,r.a.createElement("p",null,"Prefer inline scripts? A full (",r.a.createElement(c.b,null,".umd.js"),") and minified (",r.a.createElement(c.b,null,".min.js"),") script is available for every version through"," ",r.a.createElement("a",{href:"https://unpkg.com/@curi/".concat(a,"@").concat(n,"/dist/")},"Unpkg"),". You can access the package's exports through"," ",r.a.createElement(c.b,null,"window.",t),"."))};function s(e){var a=e.name,n=e.version,t=e.globalName,l=e.script;return r.a.createElement(i.a,{title:"Installation",id:"installation"},r.a.createElement(o,{name:a}),l?r.a.createElement(u,{name:a,version:n,globalName:t}):null)}function g(e){var a=e.name,n=e.dir;return r.a.createElement("a",{href:"https://github.com/pshrmn/curi/tree/master/packages/".concat(n?n+"/":"").concat(a)},r.a.createElement("img",{style:{height:16,marginRight:5},src:"/static/img/github-logo.png",alt:"GitHub logo"}),"GitHub Repo")}function p(e){var a=e.name;return r.a.createElement("a",{href:"https://npmjs.com/package/@curi/".concat(a)},r.a.createElement("img",{style:{height:16,marginRight:5},src:"/static/img/npm-logo.png",alt:"NPM logo"}),"NPM Package")}n(104);function h(e){var a=e.name,n=e.version,t=e.globalName,l=e.children,c=e.script,i=void 0===c||c;return void 0!==a?r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"@curi/",a),r.a.createElement("div",{className:"package-info"},r.a.createElement("div",null,"v",n),r.a.createElement(g,{name:a,dir:function(e){return 0===e.indexOf("route-")?"interactions":0===e.indexOf("side-effect-")?"side-effects":void 0}(a)}),r.a.createElement(p,{name:a})),r.a.createElement(s,{name:a,version:n,globalName:t,script:i}),l||null):l}function E(e){var a=e.response.data,n=a.content,t=a.name,c=a.version,i=a.globalName,m=a.script;return r.a.createElement(l.a,null,r.a.createElement(h,{name:t,version:c,globalName:i,script:m},r.a.createElement(n,null)))}n.d(a,"default",function(){return E})}}]);