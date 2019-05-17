(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{38:function(e,t,n){"use strict";n.r(t),n.d(t,"component",function(){return u}),n.d(t,"contents",function(){return c});var a=n(0),o=n.n(a),i=n(21),r={title:"Navigation Objects"},l={title:"The Properties of a Navigation Object",hash:"navigation-properties"},s={title:"Usage",hash:"usage"},c=[l,s];function u(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(i.f,null,o.a.createElement("h1",null,r.title),o.a.createElement("p",null,"The ",o.a.createElement(i.d,null,"navigation")," object contains information about the previous location and how the user navigated to the current location.")),o.a.createElement(i.c,{meta:l},o.a.createElement("p",null,"A navigation object has two properties: ",o.a.createElement(i.d,null,"action")," and"," ",o.a.createElement(i.d,null,"previous"),"."),o.a.createElement(i.b,null,"{\n  // the type of navigation,\n  // either push, replace, or pop\n  action: 'push',\n\n  // the previous response object\n  // or null for the initial response\n  previous: {\n    name: 'Home',\n    ...\n  }\n}")),o.a.createElement(i.c,{meta:s},o.a.createElement("p",null,"What is the point of the ",o.a.createElement(i.d,null,"navigation")," object? It is there to provide you information about a navigation that doesn't make sense to attach to a ",o.a.createElement(i.d,null,"response")," object."),o.a.createElement("p",null,"One usage of it would be to display a Pinterest/Twitter style modal. You could render the background using the previous response while rendering the modal using the new response."),o.a.createElement("p",null,"Another use case may be to determine how to transition between two locations, either using the ",o.a.createElement(i.d,null,"action")," to determine"," ",o.a.createElement("em",null,"how")," the application navigated or the ",o.a.createElement(i.d,null,"previous")," ","response to map between two routes.")))}}}]);