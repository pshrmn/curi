(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{65:function(e,n,t){"use strict";t.r(n),t.d(n,"component",function(){return m}),t.d(n,"contents",function(){return c});var a=t(0),i=t.n(a),r=t(21),o={title:"Transitions"},l={title:"Explanation",hash:"explanation"},s={title:"Live Demo",hash:"demo"},c=[l,s,r.i];function m(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("h1",null,o.title),i.a.createElement(r.d,{meta:l},i.a.createElement("p",null,"Route transitions can be performed using Vue's ",i.a.createElement(r.e,null,"transition")," ","component."),i.a.createElement("p",null,"Transitions generally need a key to identify when to perform a transition. The location's ",i.a.createElement(r.e,null,"pathname")," is generally ideal for this."),i.a.createElement(r.b,{lang:"html"},'<transition>\n  <component\n    :is="$curi.response.body"\n    :key="$curi.response.location.pathname"\n  />\n</transition>')),i.a.createElement(r.d,{meta:s},i.a.createElement(r.c,{id:"github/pshrmn/curi/tree/master/examples/vue/transitions"})),i.a.createElement(r.g,{path:"vue/transitions"}))}}}]);