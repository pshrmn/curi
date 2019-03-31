(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{96:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(20),l={title:"scrollEffect()",hash:"scrollEffect"};function i(){return o.a.createElement(a.e,{meta:l},o.a.createElement(a.d,null,"import { create_router } from \"@curi/router\";\nimport scroll from '@curi/side-effect-scroll';\n\nconst router = create_router(browser, routes, {\n  side_effects: [scroll()]\n});"))}var s=o.a.memo(function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(a.b,null,o.a.createElement("p",null,"When Curi is running in a browser, it relies on the"," ",o.a.createElement("a",{href:"https://developer.mozilla.org/en-US/docs/Web/API/History_API"},"History API")," ","to change locations, but this does not trigger scrolling to the top of the page when you navigate. This package provides a side effect function that will scroll to the top of the page whenever those functions are used for navigation."),o.a.createElement("p",null,"Other types of navigation, such as clicking the browser's back and forward buttons, will rely on the browser to correctly restore the scroll position.")),o.a.createElement(a.a,null,o.a.createElement(i,null)))}),c=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[l]}];n.d(t,"component",function(){return s}),n.d(t,"contents",function(){return c})}}]);