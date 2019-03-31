(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{83:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(3),o=n(20),i={title:"curiStore()",hash:"curiStore"};function c(){return l.a.createElement(o.e,{meta:i},l.a.createElement("p",null,l.a.createElement(o.f,null,"@curi/svelte")," components rely on being able to access router related values (",l.a.createElement(o.f,null,"router"),", ",l.a.createElement(o.f,null,"response"),", and"," ",l.a.createElement(o.f,null,"navigation"),") from a Svelte store. While you can set this up manually, the ",l.a.createElement(o.f,null,"curiStore")," will handle this for you."),l.a.createElement("p",null,"This will setup an observer to automatically update the store when new responses are emitted by the router."),l.a.createElement(o.d,null,"import { curiStore } from '@curi/svelte';\n\nconst router = create_router(history, routes);\nconst store = curiStore(router);"),l.a.createElement("p",null,"If you already have a store, you can pass it to ",l.a.createElement(o.f,null,"curiStore")," and the Curi values will be added to it."),l.a.createElement(o.d,null,"import { curiStore } from '@curi/svelte';\nimport { Store } from 'svelte/store';\n\nconst router = create_router(history, routes);\nconst store = new Store({...});\ncuriStore(router, store);"))}var m={title:"Props",hash:"link-props"},s={title:"<Link>",hash:"link",children:[m]};function u(){return l.a.createElement(o.e,{meta:s},l.a.createElement("p",null,"The ",l.a.createElement(o.f,null,"Link")," component is used to create an anchor for navigating to another route."),l.a.createElement(o.d,{lang:"html"},"<div>\n  <Link name='Home'>Home</Link>\n  <Link name='User' params={{ userID: 5 }}>\n    Profile\n  </Link>\n</div>\n\n<script>\n  import Link from '@curi/svelte/components/Link.html';\n  export default {\n    components: { Link }\n  }\n<\/script>"),l.a.createElement(o.e,{meta:m,tag:"h3"},l.a.createElement(o.e,{meta:{title:"name",hash:"link-name"},tag:"h4"},l.a.createElement("p",null,"The name of the route to link to."),l.a.createElement(o.d,{lang:"html"},'<Link name="Home">Home</Link>\n\x3c!-- <a href="/">Home</a> --\x3e')),l.a.createElement(o.e,{meta:{title:"params",hash:"link-params"},tag:"h4"},l.a.createElement("p",null,"An object of route params for the linked route."),l.a.createElement(o.d,{lang:"html"},'<Link name="User" params={{ userID: 5 }}>\n  Profile\n</Link>\n\x3c!-- <a href="/user/5">Profile</a> --\x3e')),l.a.createElement(o.e,{meta:{title:"hash",hash:"link-hash"},tag:"h4"},l.a.createElement("p",null,"The hash for the location to link to."),l.a.createElement(o.d,{lang:"html"},'<Link name="Home" hash="test">Home</Link>\n\x3c!-- <a href="/#test">Home</a> --\x3e')),l.a.createElement(o.e,{meta:{title:"query",hash:"link-query"},tag:"h4"},l.a.createElement("p",null,"The query for the location to link to."),l.a.createElement(o.d,{lang:"html"},'<Link name="Home" query="one=1">Home</Link>\n\x3c!-- <a href="/?one=1">Home</a> --\x3e')),l.a.createElement(o.e,{meta:{title:"state",hash:"link-state"},tag:"h4"},"Some (ephemeral) state associated with the location.")))}var h={title:"Props",hash:"navigating-props"},p={title:"<Navigating>",hash:"navigating",children:[h]};function f(){return l.a.createElement(o.e,{meta:p},l.a.createElement("p",null,"The ",l.a.createElement(o.f,null,"Navigating")," component is used to cancel an active asynchronous navigation."),l.a.createElement("p",null,"A component is passed to ",l.a.createElement(o.f,null,"Navigating"),". When there is an active asynchronous navigation, the component will be given a ",l.a.createElement(o.f,null,"cancel")," ","function. When there is not an active asynchronous navigation,"," ",l.a.createElement(o.f,null,"cancel")," will be ",l.a.createElement(o.f,null,"undefined"),"."),l.a.createElement(o.d,{lang:"html"},'<Navigating component={Cancel} />\n\n<script>\n  import Navigating from "@curi/svelte/components/Navigating.html";\n  import Cancel from "./Cancel";\n\n  export default {\n    components: { Navigating },\n    data() {\n      return { Cancel };\n    }\n  }\n<\/script>'),l.a.createElement(o.e,{meta:h,tag:"h3"},l.a.createElement(o.e,{meta:{title:"component",hash:"navigating-component"},tag:"h4"},l.a.createElement("p",null,"A component that receives a ",l.a.createElement(o.f,null,"cancel")," function when there is an active asynchronous navigation."),l.a.createElement(o.d,{lang:"html"},'{#if typeof cancel === "function"}\n  <button on:click="cancelHandler(event, cancel)">\n    Cancel Navigation\n  </button>\n{/if}\n\n<script>\n  export default {\n    methods: {\n      cancelHandler(event, cancel) {\n        event.preventDefault();\n        cancel();\n      }\n    }\n  };\n<\/script>'))))}var E=l.a.memo(function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(o.b,null,l.a.createElement("p",null,"This package enables you to use Curi alongside Svelte."),l.a.createElement("p",null,"For more information on using Curi with Svelte, please check out the"," ",l.a.createElement(r.a,{name:"Guide",params:{slug:"svelte"}},"Svelte guide"),".")),l.a.createElement(o.a,null,l.a.createElement(c,null),l.a.createElement(u,null),l.a.createElement(f,null)))}),g=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[i,s,p]}];n.d(t,"component",function(){return E}),n.d(t,"contents",function(){return g})}}]);