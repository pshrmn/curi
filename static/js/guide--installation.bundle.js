(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{29:function(e,t,r){"use strict";r.r(t),r.d(t,"component",function(){return u}),r.d(t,"contents",function(){return p});var a=r(0),n=r.n(a),l=r(23),o={title:"Installation"},s={title:"NPM",hash:"npm"},i={title:"Unpkg",hash:"unpkg"},c={title:"Promises",hash:"promises"},p=[s,i,c];function u(){return n.a.createElement(n.a.Fragment,null,n.a.createElement(l.f,null,n.a.createElement("h1",null,o.title)),n.a.createElement(l.c,{meta:s},n.a.createElement("p",null,"There are a number of Curi packages, all of which can be installed using NPM. The only one that every application requires is"," ",n.a.createElement(l.d,null,"@curi/router"),", which provides the core routing/navigation functionality."),n.a.createElement("p",null,"Curi also requires that you create your own history object. There are three packages to choose from: ",n.a.createElement(l.d,null,"@hickory/browser"),","," ",n.a.createElement(l.d,null,"@hickory/hash"),", and ",n.a.createElement(l.d,null,"@hickory/in-memory"),". Which package you need depends on the application, but the browser package is best for most websites."),n.a.createElement(l.b,{lang:"bash"},"npm install @hickory/browser @curi/router")),n.a.createElement(l.c,{meta:i},n.a.createElement("p",null,"These packages can also be loaded from"," ",n.a.createElement("a",{href:"https://unpkg.com"},"Unpkg"),"."),n.a.createElement(l.b,{lang:"markup"},'<script\n  src="https://unpkg.com/@hickory/browser/dist/hickory-browser.min.js"\n><\/script>\n<script\n  src="https://unpkg.com/@curi/router/dist/curi-router.min.js"\n><\/script>')),n.a.createElement(l.c,{meta:c},n.a.createElement("p",null,"Curi uses Promises, so you may need to include a polyfill to add Promise support for older browsers (including IE 11)."),n.a.createElement("p",null,"If you need a general ES2015 polyfill, you can check out the one provided by Babel's"," ",n.a.createElement("a",{href:"https://babeljs.io/docs/usage/polyfill/#usage-in-browser"},"babel-polyfill")," ","package. If you only need a Promise polyfill,"," ",n.a.createElement("a",{href:"https://github.com/stefanpenner/es6-promise"},"es6-promise")," ","package or"," ",n.a.createElement("a",{href:"https://polyfill.io/v2/docs/features/"},"polyfill.io")," should do the trick."),n.a.createElement(l.b,{lang:"html"},'<script\n  src="https://cdn.polyfill.io/v2/polyfill.js?features=Promise"\n><\/script>')))}}}]);