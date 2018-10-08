(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{94:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return s});var n=a(0),o=a.n(n),i=a(9),l=a(10),r=a(25);function s(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(l.a,{title:"Explanation",id:"explanation"},o.a.createElement("p",null,"This example mimics the way that Pinterest works. Whether or not this is a good design pattern is up for debate, but at the very least it is helpful to see one way that you can do this with Curi."),o.a.createElement("p",null,'If you are unfamiliar with the Pinterest model, this is how it works: When you navigate to a "modal route" from within the application, the route will open in a modal window (preserving the background content from the page that the user navigated from). If you load the same location manually, it will render the location in a full window.'),o.a.createElement("p",null,"You will have to take a number of things into consideration when implementing this:"),o.a.createElement("p",null,"The first is how to know whether to render a modal window or a full page. The easiest way to do his is to use ",o.a.createElement(i.b,null,"location.state")," to attach a value to the location that indicates that you want to render a modal. State is persistent across refreshes and the user clicking the browser's forward/back buttons, so you will also have to take that into consideration."),o.a.createElement("p",null,"Second, ",o.a.createElement(i.b,null,"navigation.previous")," is used to render the base layer displayed under the modal."),o.a.createElement("p",null)),o.a.createElement(l.a,{title:"Live Demo",id:"demo"},o.a.createElement(r.a,{id:"github/pshrmn/curi/tree/master/examples/vue/modal"})),o.a.createElement(l.a,{title:"On GitHub",id:"source"},"If you want to run this code locally, the source code is available on GitHub"," ",o.a.createElement("a",{href:"https://github.com/pshrmn/curi/tree/master/examples/vue/modal"},"here"),"."))}}}]);