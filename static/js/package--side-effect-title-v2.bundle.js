(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{98:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(20),i={title:"titleEffect()",hash:"titleEffect"};function s(){return l.a.createElement(r.e,{meta:i},l.a.createElement("p",null,l.a.createElement(r.f,null,"@curi/side-effect-title")," exports a function for creating a side effect that will update the page's title whenever a new response is created."),l.a.createElement("p",null,"When creating the title side effect, you pass it a function. That function will be passed the object emitted by the router (with"," ",l.a.createElement(r.f,null,"response"),", ",l.a.createElement(r.f,null,"navigation"),", and ",l.a.createElement(r.f,null,"router")," ","properties). The function returns a string, which the side effect will set as the document's ",l.a.createElement(r.f,null,"title"),"."),l.a.createElement(r.d,null,"import { curi } from '@curi/router';\nimport titleEffect from '@curi/side-effect-title';\n\nconst setTitle = titleEffect(({ response }) => {\n  return `${response.title} | My Site`;\n});\n\nconst router = curi(history, routes, {\n  side_effects: [setTitle]\n});"),l.a.createElement("p",null,"While you can use any properties of the ",l.a.createElement(r.f,null,"response")," to generate the string, the ",l.a.createElement(r.f,null,"response.title")," property is intended to be used with this side effect."),l.a.createElement(r.d,null,'{\n  name: "About",\n  path: "about",\n  response() {\n    return {\n      body: Home,\n      title: "About"\n    }\n  }              \n}\n// when the About route matches, document.title = "About | My Site"'))}var o=l.a.memo(function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(r.b,null,l.a.createElement("p",null,"This package adds a side effect to the router that updates the page's title as a result of navigation.")),l.a.createElement(r.a,null,l.a.createElement(s,null)))}),u=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[i]}];n.d(t,"component",function(){return o}),n.d(t,"contents",function(){return u})}}]);