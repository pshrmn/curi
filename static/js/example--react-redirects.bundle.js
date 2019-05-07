(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{53:function(e,t,n){"use strict";n.r(t),n.d(t,"component",function(){return u}),n.d(t,"contents",function(){return s});var r=n(0),a=n.n(r),o=n(22),i={title:"Redirects"},l={title:"Explanation",hash:"explanation"},c={title:"Live Demo",hash:"demo"},s=[l,c,o.i];function u(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",null,i.title),a.a.createElement(o.d,{meta:l},a.a.createElement("p",null,"Sometimes you will want to redirect based on the results of your"," ",a.a.createElement(o.e,null,"resolve")," function. For instance, you might see that a user is not authenticated and shouldn't be able to view a page."),a.a.createElement("p",null,"A ",a.a.createElement(o.e,null,"respond")," function can modify the response by setting a"," ",a.a.createElement(o.e,null,"redirect")," property on its return object. Curi will automatically (unless configured not to) redirect to that location."),a.a.createElement(o.b,{lang:"javascript"},"const routes = prepareRoutes({\n  routes: [\n    // ...,\n    {\n      name: 'Protected',\n      path: 'super-secret',\n      respond: () => {\n        if (!store.userIsAuthenticated) {\n          // tell Curi to redirect to the Login route\n          return {\n            redirect: { name: \"Login\" },\n            meta: {\n              status: 302\n            }\n          };\n        }\n      }\n    },\n    {\n      name: 'Login',\n      path: 'login',\n      ...\n    }\n  ]\n});")),a.a.createElement(o.d,{meta:c},a.a.createElement(o.c,{id:"github/pshrmn/curi/tree/master/examples/react/redirects",title:"Curi React redirect demo"})),a.a.createElement(o.g,{path:"react/redirects"}))}}}]);