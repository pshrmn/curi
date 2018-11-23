(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{54:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return m});var a=n(0),r=n.n(a),l=n(1),o=n(8),s=n(105),i=n(16),c=n(5),u={title:"Getting Started"};function m(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,u.title),r.a.createElement(s.a,{title:"The Router",id:"router-object"},r.a.createElement(c.b,null,r.a.createElement("p",null,"The router is the controller of the single-page application. A router is created using a ",r.a.createElement(o.b,null,"history")," object and a"," ",r.a.createElement(o.b,null,"routes")," array.")),r.a.createElement(c.a,null,"import { curi, prepareRoutes } from '@curi/router';\n\nconst history = Browser();\nconst routes = prepareRoutes([...]);\nconst router = curi(history, routes);"),r.a.createElement(c.b,null,r.a.createElement("p",null,"The"," ",r.a.createElement(l.b,{name:"Guide",params:{slug:"history"}},"history")," ","is used to navigate between locations within an application. The"," ",r.a.createElement(l.b,{name:"Guide",params:{slug:"routes-and-responses"},hash:"routes"},"routes")," ","describe valid locations in an application."))),r.a.createElement(s.a,{title:"Navigation",id:"navigation"},r.a.createElement(c.b,null,r.a.createElement("p",null,"When navigation occurs, the router receives the new location from its ",r.a.createElement(o.b,null,"history")," object. This either happens from in-app navigation (e.g. clicking a link) or platform navigation (e.g. clicking the back button or typing URL in the address bar and hitting enter)."),r.a.createElement("p",null,"The router has a ",r.a.createElement(o.b,null,"navigate()")," method to let you navigate with code. The function takes the ",r.a.createElement(o.b,null,"name")," of the route you want to navigate to and any route ",r.a.createElement(o.b,null,"params"),". The navigation"," ",r.a.createElement(o.b,null,"method")," controls how the history changes locations, with the default behavior acting like clicking a link.")),r.a.createElement(c.a,null,'router.navigate({\n  name: "Photo",\n  params: { albumID: 1357, photoID: 02468 },\n  hash: "comments"\n});\n// /photos/1357/02468#comments\n\nrouter.navigate({\n  name: "Login",\n  state: { next: location.pathname },\n  // replace the current location with the Login location\n  // "REPLACE" is ideal for redirects\n  method: "REPLACE"\n});'),r.a.createElement(c.b,null,r.a.createElement(i.a,null,"Render interfaces, like"," ",r.a.createElement(l.b,{name:"Package",params:{package:"react-dom"}},r.a.createElement(o.b,null,"@curi/react-dom")),", will call ",r.a.createElement(o.b,null,"router.nagivate()")," for you when the user clicks a link."))),r.a.createElement(s.a,{title:"Response Handlers",id:"response-handlers"},r.a.createElement(c.b,null,r.a.createElement("p",null,'Curi has a concept of "response" objects, which provide the application with information about the route that matches the current location.'),r.a.createElement("p",null,"Response handlers are functions that will be called when there is a new response. There are three types of response handlers: observers, one time functions, and side effects."),r.a.createElement("p",null,"Side effects are passed to the router when you are creating it. These are best suited for non-rendering tasks. You can read more about them in the"," ",r.a.createElement(l.b,{name:"Guide",params:{slug:"side-effects"}},"side effects guide"),".")),r.a.createElement(c.a,null,"const router = curi(history, routes, {\n  sideEffects: [scroll, title]\n})"),r.a.createElement(c.b,null,r.a.createElement("p",null,'"One time" response handlers, registered with'," ",r.a.createElement(o.b,null,"router.once()"),", will only be called one time. If a response already exists, then the response handler will be called immediately (unless configured not to). Otherwise, the one time response handler will be called after the next response is emitted."),r.a.createElement("p",null,"The primary use case for one time functions is to wait for the initial response to be generated before rendering.")),r.a.createElement(c.a,null,"const router = cur(history, routes);\nrouter.once(() => {\n  // this is not called until the initial response is ready\n  // so we can safely render now\n});"),r.a.createElement(c.b,null,r.a.createElement("p",null,"Observers are passed to the router using ",r.a.createElement(o.b,null,"router.observe()"),". Unlike one time functions, these will be called for every response emitted by the router (until you tell the router to stop calling it). You most likely will not need to call this yourself because the renderer implementations setup observers for you.")),r.a.createElement(c.a,null,"const stop = router.observe(({ response }) => {\n  console.log('new response!', response);\n});\n// ...\nstop();\n// no longer observing"),r.a.createElement(c.b,null,r.a.createElement("p",null,"If you have any asynchronous routes (routes with ",r.a.createElement(o.b,null,"resolve")," ","functions), ",r.a.createElement(o.b,null,"router.once()")," should be used to delay the initial render until after the initial response is ready.")),r.a.createElement(c.a,null,"// wait for initial response to be ready\nrouter.once(() => {\n  // safe to render async routes now\n});")),r.a.createElement(s.a,{title:"Rendering",id:"rendering"},r.a.createElement(c.b,null,r.a.createElement("p",null,"Rendering is left to whatever rendering library you are using. The way that Curi interfaces with each of them varies, but they all use observers to be notified when there is a new response.")),r.a.createElement(c.b,null,r.a.createElement("p",null,r.a.createElement(l.b,{name:"Package",params:{package:"@react-dom"}},r.a.createElement(o.b,null,"@curi/react-dom"))," ","uses a ",r.a.createElement(o.a,null,"Router")," with a render-invoked ",r.a.createElement(o.b,null,"children")," ","function that will be called whenever there is a new response."),r.a.createElement("p",null,"In React applications, ",r.a.createElement(o.b,null,"response.body")," should be a React component, so rendering the application means creating an element from ",r.a.createElement(o.b,null,"response.body"),"."),r.a.createElement("p",null,"The"," ",r.a.createElement(l.b,{name:"Tutorial",params:{slug:"react-basics"}},"React Basics Tutorial")," ","gets into more detail about how this works.")),r.a.createElement(c.a,null,"// React\nconst Router = curiProvider(router);\n\nReactDOM.render((\n  <Router>\n    {({ response }) => {\n      const { body:Body } = response;\n      return <Body />;\n    }}\n  </Router>\n), document.getElementById('root'));"),r.a.createElement(c.b,null,r.a.createElement("p",null,r.a.createElement(l.b,{name:"Package",params:{package:"@react-dom"}},r.a.createElement(o.b,null,"@curi/vue"))," ","sets up reactive objects that update when there is a new response."," ",r.a.createElement(o.a,null,"component :is")," can be used to render the ",r.a.createElement(o.b,null,"body")," ","component."),r.a.createElement("p",null,"The"," ",r.a.createElement(l.b,{name:"Tutorial",params:{slug:"react-basics"}},"Vue Basics Tutorial")," ","details how to use Vue and Curi.")),r.a.createElement(c.a,null,"// Vue\nVue.use(CuriPlugin, { router });\nnew Vue({\n  el: '#app',\n  template: '<app />',\n  components: { app }\n});"),r.a.createElement(c.b,null,r.a.createElement("p",null,r.a.createElement(l.b,{name:"Package",params:{package:"@react-dom"}},r.a.createElement(o.b,null,"@curi/svelte"))," ","uses the Svelte store and ",r.a.createElement(o.a,null,"svelte:component")," to render.")),r.a.createElement(c.a,null,"// Svelte\nconst store = curiStore(router);\nnew app({ target, store });")))}}}]);