(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{72:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(3),o=n(20),i={title:"Props",hash:"router-props"},c={title:"Router",hash:"router"};var m={title:"Props",hash:"link-props"},s={title:"Link",hash:"link"};var h={title:"Props",hash:"asynclink-props"},u={title:"AsyncLink",hash:"asynclink"};var p={title:"Props",hash:"navigating-props"},g={title:"Navigating",hash:"navigating"};var E={title:"getRouter",hash:"getRouter"};var f={title:"getResponse",hash:"getResponse"};var v={title:"getNavigation",hash:"getNavigation"};var k={about:l.a.createElement(o.b,null,l.a.createElement("p",null,"This package enables you to use Curi alongside Svelte."),l.a.createElement("p",null,"For more information on using Curi with Svelte, please check out the"," ",l.a.createElement(r.a,{name:"Guide",params:{slug:"svelte"}},"Svelte guide"),".")),api:l.a.createElement(o.a,null,l.a.createElement(function(){return l.a.createElement(o.e,{meta:c,tag:"h2"},l.a.createElement("p",null,"The ",l.a.createElement(o.f,null,"Router")," component is used to make router related data available to components throughout the application."),l.a.createElement(o.d,{lang:"html"},'<Router {router}>\n  <Content />\n</Router>\n\n<script>\n  import Router from "@curi/svelte/components/Router.svelte";\n\n  export let router;\n<\/script>'),l.a.createElement(o.e,{meta:i,tag:"h3"},l.a.createElement(o.e,{meta:{title:"router",hash:"router-router"},tag:"h4"},l.a.createElement("p",null,"A Curi router."))))},null),l.a.createElement(function(){return l.a.createElement(o.e,{meta:s,tag:"h2"},l.a.createElement("p",null,"The ",l.a.createElement(o.f,null,"Link")," component is used to create an anchor for navigating to another route."),l.a.createElement(o.d,{lang:"html"},"<div>\n  <Link name='Home'>Home</Link>\n  <Link name='User' params={{ userID: 5 }}>\n    Profile\n  </Link>\n</div>\n\n<script>\n  import Link from '@curi/svelte/components/Link.svelte';\n<\/script>"),l.a.createElement(o.e,{meta:m,tag:"h3"},l.a.createElement(o.e,{meta:{title:"name",hash:"link-name"},tag:"h4"},l.a.createElement("p",null,"The name of the route to link to."),l.a.createElement(o.d,{lang:"html"},'<Link name="Home">Home</Link>\n\x3c!-- <a href="/">Home</a> --\x3e')),l.a.createElement(o.e,{meta:{title:"params",hash:"link-params"},tag:"h4"},l.a.createElement("p",null,"An object of route params for the linked route."),l.a.createElement(o.d,{lang:"html"},'<Link name="User" params={{ userID: 5 }}>\n  Profile\n</Link>\n\x3c!-- <a href="/user/5">Profile</a> --\x3e')),l.a.createElement(o.e,{meta:{title:"hash",hash:"link-hash"},tag:"h4"},l.a.createElement("p",null,"The hash for the location to link to."),l.a.createElement(o.d,{lang:"html"},'<Link name="Home" hash="test">Home</Link>\n\x3c!-- <a href="/#test">Home</a> --\x3e')),l.a.createElement(o.e,{meta:{title:"query",hash:"link-query"},tag:"h4"},l.a.createElement("p",null,"The query for the location to link to."),l.a.createElement(o.d,{lang:"html"},'<Link name="Home" query="one=1">Home</Link>\n\x3c!-- <a href="/?one=1">Home</a> --\x3e')),l.a.createElement(o.e,{meta:{title:"state",hash:"link-state"},tag:"h4"},"Some (ephemeral) state associated with the location.")))},null),l.a.createElement(function(){return l.a.createElement(o.e,{meta:u,tag:"h2"},l.a.createElement("p",null,"The ",l.a.createElement(o.f,null,"AsyncLink")," component is used to create an anchor for navigating to another route. This is similar to the the"," ",l.a.createElement(r.a,{hash:"link"},l.a.createElement(o.f,null,"Link")),", but also takes a ",l.a.createElement(o.f,null,"wrapper")," component for"),l.a.createElement(o.d,{lang:"html"},"<div>\n  <AsyncLink wrapper={NavSpinner} name='User' params={{ userID: 5 }}>\n    Profile\n  </AsyncLink>\n</div>\n\n<script>\n  import AsyncLink from '@curi/svelte/components/AsyncLink.svelte';\n<\/script>"),l.a.createElement(o.e,{meta:h,tag:"h3"},l.a.createElement(o.e,{meta:{title:"wrapper",hash:"asynclink-wrapper"},tag:"h4"},l.a.createElement("p",null,"A wrapper component to be rendered around the anchor. The wrapper will receive a ",l.a.createElement(o.f,null,"navigating")," prop that defaults to"," ",l.a.createElement(o.f,null,"false"),", is set to ",l.a.createElement(o.f,null,"true")," when a user clicks the anchor to begin a navigation, and resets to ",l.a.createElement(o.f,null,"false")," when the navigation completes."),l.a.createElement(o.d,{lang:"html"},'<AsyncLink wrapper={NavSpinner} name="Home">Home</AsyncLink>'),l.a.createElement("p",null,"For a demonstration, please check out the"," ",l.a.createElement(r.a,{name:"Example",params:{slug:"async"}},"asynchronous navigation example"),".")),l.a.createElement(o.e,{meta:{title:"name",hash:"asynclink-name"},tag:"h4"},l.a.createElement("p",null,"The name of the route to link to."),l.a.createElement(o.d,{lang:"html"},'<AsyncLink name="Home" wrapper={NavSpinner}>Home</AsyncLink>\n\x3c!-- <a href="/">Home</a> --\x3e')),l.a.createElement(o.e,{meta:{title:"params",hash:"asynclink-params"},tag:"h4"},l.a.createElement("p",null,"An object of route params for the linked route."),l.a.createElement(o.d,{lang:"html"},'<AsyncLink\n  name="User"\n  params={{ userID: 5 }}\n  wrapper={NavSpinner}\n>\n  Profile\n</AsyncLink>\n\x3c!-- <a href="/user/5">Profile</a> --\x3e')),l.a.createElement(o.e,{meta:{title:"hash",hash:"asynclink-hash"},tag:"h4"},l.a.createElement("p",null,"The hash for the location to link to."),l.a.createElement(o.d,{lang:"html"},'<AsyncLink\n  name="Home"\n  hash="test"\n  wrapper={NavSpinner}\n>Home</AsyncLink>\n\x3c!-- <a href="/#test">Home</a> --\x3e')),l.a.createElement(o.e,{meta:{title:"query",hash:"asynclink-query"},tag:"h4"},l.a.createElement("p",null,"The query for the location to link to."),l.a.createElement(o.d,{lang:"html"},'<AsyncLink\n  name="Home"\n  query="one=1"\n  wrapper={NavSpinner}\n>Home</AsyncLink>\n\x3c!-- <a href="/?one=1">Home</a> --\x3e')),l.a.createElement(o.e,{meta:{title:"state",hash:"asynclink-state"},tag:"h4"},"Some (ephemeral) state associated with the location.")))},null),l.a.createElement(function(){return l.a.createElement(o.e,{meta:g,tag:"h2"},l.a.createElement("p",null,"The ",l.a.createElement(o.f,null,"Navigating")," component is used to cancel an active asynchronous navigation."),l.a.createElement("p",null,"A component is passed to ",l.a.createElement(o.f,null,"Navigating"),". When there is an active asynchronous navigation, the component will be given a ",l.a.createElement(o.f,null,"cancel")," ","function. When there is not an active asynchronous navigation,"," ",l.a.createElement(o.f,null,"cancel")," will be ",l.a.createElement(o.f,null,"undefined"),"."),l.a.createElement(o.d,{lang:"html"},'<Navigating component={Cancel} />\n\n<script>\n  import Navigating from "@curi/svelte/components/Navigating.svelte";\n  import Cancel from "./Cancel";\n<\/script>'),l.a.createElement(o.e,{meta:p,tag:"h3"},l.a.createElement(o.e,{meta:{title:"component",hash:"navigating-component"},tag:"h4"},l.a.createElement("p",null,"A component that receives a ",l.a.createElement(o.f,null,"cancel")," function when there is an active asynchronous navigation."),l.a.createElement(o.d,{lang:"html"},'{#if typeof cancel === "function"}\n  <button on:click="cancelHandler(event, cancel)">\n    Cancel Navigation\n  </button>\n{/if}\n\n<script>\n  export default {\n    methods: {\n      cancelHandler(event, cancel) {\n        event.preventDefault();\n        cancel();\n      }\n    }\n  };\n<\/script>'))))},null),l.a.createElement(function(){return l.a.createElement(o.e,{meta:E,tag:"h2"},l.a.createElement("p",null,"The ",l.a.createElement(o.f,null,"getRouter")," function is used to read the ",l.a.createElement(o.f,null,"router")," ","from Svelte's context."),l.a.createElement(o.d,{lang:"html"},'<h1>{pathname}</h1>\n\n<script>\n  import { getRouter } from "@curi/svelte";\n\n  const router = getRouter();\n\n  const homeRoute = router.route("Home");\n<\/script>'))},null),l.a.createElement(function(){return l.a.createElement(o.e,{meta:f,tag:"h2"},l.a.createElement("p",null,"The ",l.a.createElement(o.f,null,"getResponse")," function is used to read the"," ",l.a.createElement(o.f,null,"response")," store from Svelte's context. The value will update whenever there is a new response."),l.a.createElement(o.d,{lang:"html"},'<h1>{$response.name}</h1>\n\n<script>\n  import { getResponse } from "@curi/svelte";\n\n  const response = getResponse();\n<\/script>'))},null),l.a.createElement(function(){return l.a.createElement(o.e,{meta:v,tag:"h2"},l.a.createElement("p",null,"The ",l.a.createElement(o.f,null,"getNavigation")," function is used to read the"," ",l.a.createElement(o.f,null,"navigation")," store from Svelte's context. The value will update whenever there is a new navigation."),l.a.createElement(o.d,{lang:"html"},'<h1>{$navigation.action}</h1>\n\n<script>\n  import { getNavigation } from "@curi/svelte";\n\n  const navigation = getNavigation();\n<\/script>'))},null))},d=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[c,s,u,g,E,f,v]}];n.d(t,"sections",function(){return k}),n.d(t,"contents",function(){return d})}}]);