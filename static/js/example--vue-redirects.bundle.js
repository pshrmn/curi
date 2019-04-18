(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{61:function(e,t,n){"use strict";n.r(t),n.d(t,"component",function(){return s}),n.d(t,"contents",function(){return u});var a=n(0),r=n.n(a),o=n(21),i={title:"Authentication"},l={title:"Explanation",hash:"explanation"},c={title:"Live Demo",hash:"demo"},u=[l,c,o.i];function s(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,i.title),r.a.createElement(o.d,{meta:l},r.a.createElement("p",null,"Sometimes you will want to redirect based on the results of your"," ",r.a.createElement(o.e,null,"resolve")," function. For instance, you might see that a user is not authenticated and shouldn't be able to view a page."),r.a.createElement("p",null,"A ",r.a.createElement(o.e,null,"respond")," function can modify the response by setting a"," ",r.a.createElement(o.e,null,"redirect")," property on its return object. Curi will automatically (unless configured not to) redirect to that location."),r.a.createElement(o.b,{lang:"javascript"},"const routes = prepareRoutes({\n  routes: [\n    // ...,\n    {\n      name: 'Protected',\n      path: 'super-secret',\n      respond: () => {\n        if (!store.userIsAuthenticated) {\n          return {\n            redirect: {\n              name: \"Login\"\n            },\n            meta: {\n              status: 302\n            }\n          };\n        }\n      }\n    },\n    {\n      name: 'Login',\n      path: 'login',\n      ...\n    }\n  ]\n});")),r.a.createElement(o.d,{meta:c},r.a.createElement(o.c,{id:"github/pshrmn/curi/tree/master/examples/vue/redirects",title:"Curi Vue redirects demo"})),r.a.createElement(o.g,{path:"vue/redirects"}))}}}]);