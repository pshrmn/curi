(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{95:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return c});var a=n(0),r=n.n(a),o=n(8),i=n(5),l=n(105),s=n(106),u={title:"Authentication"};function c(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,u.title),r.a.createElement(l.a,{title:"Explanation",id:"explanation"},r.a.createElement("p",null,"Sometimes you will want to redirect based on the results of your"," ",r.a.createElement(o.b,null,"resolve")," functions. For instance, you might see that a user is not authenticated and shouldn't be able to view a page."),r.a.createElement("p",null,"A ",r.a.createElement(o.b,null,"response()")," function can modify the response by setting a"," ",r.a.createElement(o.b,null,"redirectTo")," property on its return object. Curi will automatically (unless configured not to) redirect to that location."),r.a.createElement(i.a,{lang:"javascript"},"const routes = prepareRoutes([\n  // ...,\n  {\n    name: 'Protected',\n    path: 'super-secret',\n    response: () => {\n      if (!store.userIsAuthenticated) {\n        return {\n          redirectTo: { name: \"Login\" },\n          status: 302\n        };\n      }\n    }\n  },\n  {\n    name: 'Login',\n    path: 'login',\n    ...\n  }\n]);")),r.a.createElement(l.a,{title:"Live Demo",id:"demo"},r.a.createElement(s.a,{id:"github/pshrmn/curi/tree/master/examples/svelte/authentication"})),r.a.createElement(l.a,{title:"On GitHub",id:"source"},"If you want to run this code locally, the source code is available on GitHub"," ",r.a.createElement("a",{href:"https://github.com/pshrmn/curi/tree/master/examples/svelte/authentication"},"here"),"."))}}}]);