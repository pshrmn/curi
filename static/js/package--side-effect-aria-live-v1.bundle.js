(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{83:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),l=n(20),r={title:"ariaLiveEffect",hash:"ariaLiveEffect"};var s={about:i.a.createElement(l.b,null,i.a.createElement("p",null,"When you navigate in a non-single-page application, users who rely on a screen reader will get an announcement about the navigation. Unfortunately, this behavior does not natively exist with single-page applications and the History API."),i.a.createElement("p",null,"This side-effect usea"," ",i.a.createElement("a",{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions"},"ARIA live regions")," ","to announce navigations to users who use screen readers.")),api:i.a.createElement(l.a,null,i.a.createElement(function(){return i.a.createElement(l.e,{meta:r},i.a.createElement("p",null,"When you create an ARIA live side effect, an element with a"," ",i.a.createElement(l.f,null,"aria-live")," attribute will be added to the DOM. This element will be styled to not be displayed on screen (but not actually hidden) so that only screen readers detect it."),i.a.createElement(l.i,null,i.a.createElement("p",null,"This side-effect should only be used in the browser.")),i.a.createElement("p",null,"The side-effect factory takes a function, which will receives the same arguments as an observer (",i.a.createElement(l.f,null,"response"),", ",i.a.createElement(l.f,null,"navigation"),", and ",i.a.createElement(l.f,null,"router"),"). Using the objects, the function returns a string, which is the message about the navigation that will be read by the screen reader."),i.a.createElement("p",null,"The DOM element's ",i.a.createElement(l.f,null,"aria-live")," attribute will be"," ",i.a.createElement(l.f,null,'"assertive"')," by default, but you can use the side-effect factory's second argument to pass an alternative (i.e."," ",i.a.createElement(l.f,null,'"polite"'),")."),i.a.createElement(l.d,null,"import { curi } from '@curi/router';\nimport ariaLive from '@curi/side-effect-aria-live';\n\nconst announcer = ariaLive(\n  ({ response }) => `Navigated to ${response.title}`\n);\n\nconst politeAnnouncer = ariaLive(\n  ({ response }) => `Navigated to ${response.title}`,\n  \"polite\"\n);\n\nconst router = curi(history, routes, {\n  sideEffects: [announcer]\n});"))},null))},o=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[r]}];n.d(t,"sections",function(){return s}),n.d(t,"contents",function(){return o})}}]);