(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{62:function(e,t,n){"use strict";n.r(t),n.d(t,"component",function(){return u}),n.d(t,"contents",function(){return c});var a=n(0),r=n.n(a),o=n(21),i={title:"Authentication"},l={title:"Explanation",hash:"explanation"},s={title:"Live Demo",hash:"demo"},c=[l,s,o.i];function u(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,i.title),r.a.createElement(o.d,{meta:l},r.a.createElement("p",null,"Sometimes you will want to redirect based on the results of your"," ",r.a.createElement(o.e,null,"resolve")," function. For instance, you might see that a user is not authenticated and shouldn't be able to view a page."),r.a.createElement("p",null,"A ",r.a.createElement(o.e,null,"response")," function can modify the response by setting a"," ",r.a.createElement(o.e,null,"redirectTo")," property on its return object. Curi will automatically (unless configured not to) redirect to that location."),r.a.createElement(o.b,{lang:"javascript"},"const routes = prepareRoutes([\n  // ...,\n  {\n    name: 'Protected',\n    path: 'super-secret',\n    response: () => {\n      if (!store.userIsAuthenticated) {\n        return {\n          name: \"Login\",\n          status: 302\n        };\n      }\n    }\n  },\n  {\n    name: 'Login',\n    path: 'login',\n    ...\n  }\n]);")),r.a.createElement(o.d,{meta:s},r.a.createElement(o.c,{id:"github/pshrmn/curi/tree/master/examples/vue/redirects"})),r.a.createElement(o.g,{path:"vue/redirects"}))}}}]);