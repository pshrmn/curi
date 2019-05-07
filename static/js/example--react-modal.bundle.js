(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{58:function(e,t,a){"use strict";a.r(t),a.d(t,"component",function(){return c}),a.d(t,"contents",function(){return h});var n=a(0),o=a.n(n),l=a(22),i={title:"Modal Routes"},r={title:"Explanation",hash:"explanation"},s={title:"Live Demo",hash:"demo"},h=[r,s,l.i];function c(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(l.h,null,o.a.createElement("h1",null,i.title)),o.a.createElement(l.d,{meta:r},o.a.createElement("p",null,"This example mimics the way that Pinterest works. Whether or not this is a good design pattern is up for debate, but at the very least it is helpful to see one way that you can do this with Curi."),o.a.createElement("p",null,'When you navigate to a "modal route" from within the application, the content will be displayed in a modal window (preserving the background content from the page that the user navigated from). If you load the same location manually, it will render the location in a full window.'),o.a.createElement("p",null,o.a.createElement(l.e,null,"navigation.previous")," is used to render the base layer displayed under the modal. ",o.a.createElement(l.e,null,"previous")," is the previous location's ",o.a.createElement(l.e,null,"response")," object."),o.a.createElement("p",null,"Knowing whether to render a modal window or a full page can be tricky. One approach is to use ",o.a.createElement(l.e,null,"location.state")," to attach a value to the location that indicates that you want to render a modal. The downside of using state is that is is persistent across refreshes and the user clicking the browser's forward/back buttons, which means that you also have to take those into consideration when testing the modal's behavior.")),o.a.createElement(l.d,{meta:s},o.a.createElement(l.c,{id:"github/pshrmn/curi/tree/master/examples/react/modal",title:"Curi React modal demo"})),o.a.createElement(l.g,{path:"react/modal"}))}}}]);