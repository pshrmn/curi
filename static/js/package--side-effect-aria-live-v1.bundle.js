(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{91:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),i=n(21),r={title:"ariaLiveEffect",hash:"ariaLiveEffect"};function s(){return l.a.createElement(i.e,{meta:r},l.a.createElement("p",null,"When you create an ARIA live side effect, an element with a"," ",l.a.createElement(i.f,null,"aria-live")," attribute will be added to the DOM. This element will be styled to not be displayed on screen (but not actually hidden) so that only screen readers detect it."),l.a.createElement(i.j,null,l.a.createElement("p",null,"This side-effect should only be used in the browser.")),l.a.createElement("p",null,"The side-effect factory takes a function, which will receives the same arguments as an observer (",l.a.createElement(i.f,null,"response"),", ",l.a.createElement(i.f,null,"navigation"),", and ",l.a.createElement(i.f,null,"router"),"). Using the objects, the function returns a string, which is the message about the navigation that will be read by the screen reader."),l.a.createElement("p",null,"The DOM element's ",l.a.createElement(i.f,null,"aria-live")," attribute will be"," ",l.a.createElement(i.f,null,'"assertive"')," by default, but you can use the side-effect factory's second argument to pass an alternative (i.e."," ",l.a.createElement(i.f,null,'"polite"'),")."),l.a.createElement(i.d,null,"import { curi } from '@curi/router';\nimport ariaLive from '@curi/side-effect-aria-live';\n\nconst announcer = ariaLive(\n  ({ response }) => `Navigated to ${response.title}`\n);\n\nconst politeAnnouncer = ariaLive(\n  ({ response }) => `Navigated to ${response.title}`,\n  \"polite\"\n);\n\nconst router = curi(history, routes, {\n  sideEffects: [announcer]\n});"))}var o=l.a.memo(function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(i.b,null,l.a.createElement("p",null,"When you navigate in a non-single-page application, users who rely on a screen reader will get an announcement about the navigation. Unfortunately, this behavior does not natively exist with single-page applications and the History API."),l.a.createElement("p",null,"This side-effect usea"," ",l.a.createElement("a",{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions"},"ARIA live regions")," ","to announce navigations to users who use screen readers.")),l.a.createElement(i.a,null,l.a.createElement(s,null)))}),c=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[r]}];n.d(t,"component",function(){return o}),n.d(t,"contents",function(){return c})}}]);