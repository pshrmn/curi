(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{40:function(e,t,n){"use strict";n.r(t),n.d(t,"component",function(){return g}),n.d(t,"contents",function(){return m});var a=n(0),r=n.n(a),l=n(3),s=n(21),o={title:"New Responses"},c={title:"Response Handlers",hash:"response-handlers"},i={title:"Registering Response Handlers",hash:"registering"},u={title:"Setup",hash:"setup"},d={title:"Rendering",hash:"rendering"},h={title:"Side Effects",hash:"side-effects"},p={title:"Use Cases",hash:"use-cases",children:[u,d,h]},m=[c,i,p];function g(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.f,null,r.a.createElement("h1",null,o.title),r.a.createElement("p",null,"Curi uses an observer pattern to call registered functions (called response handlers) when there is a new response. The primary use care for this is to re-render the application whenever there is a new response, but other functionalities (like logging) can also be performed.")),r.a.createElement(s.c,{meta:c,tag:"h3"},r.a.createElement("p",null,"When response handlers are called, they are passed an object with three properties:"," ",r.a.createElement(l.a,{name:"Package",params:{package:"router",version:"v2"},hash:"properties"},r.a.createElement(s.d,null,"router")),","," ",r.a.createElement(l.a,{name:"Guide",params:{slug:"responses"}},r.a.createElement(s.d,null,"response")),", and"," ",r.a.createElement(l.a,{name:"Guide",params:{slug:"navigation-objects"}},r.a.createElement(s.d,null,"navigation")),". Which objects/properties you use depends on what the response handler is doing."),r.a.createElement(s.b,null,"function responseHandler({\n  router,\n  response,\n  navigation\n}) {\n  // ...\n}")),r.a.createElement(s.c,{meta:i,tag:"h3"},r.a.createElement("p",null,"There are three ways to attach response handlers to the router:"," ",r.a.createElement(s.d,null,"router.once")," and ",r.a.createElement(s.d,null,"router.observe")," or as a side effect."),r.a.createElement("p",null,"Response handlers registered with ",r.a.createElement(s.d,null,"router.once")," will only be called one time, while those registered with ",r.a.createElement(s.d,null,"router.observe")," ","and side effects will be called for every new response."),r.a.createElement("p",null,"When you register a response handler using ",r.a.createElement(s.d,null,"router.observe"),", it will return a function that you can use to stop calling the response handler for new responses. You should rarely need to do this, but it can be useful for memory management if you are adding and removing lots of observers."),r.a.createElement(s.b,null,"// fn will only be called one time\nrouter.once(fn);\n\n// obs will be called for every new response\nconst stop = router.observe(fn);")),r.a.createElement(s.c,{meta:p,tag:"h3"},r.a.createElement("p",null,"What should you use response handlers for?"),r.a.createElement(s.c,{meta:u,tag:"h4"},r.a.createElement("p",null,"If any of the routes in an application have ",r.a.createElement(s.d,null,"resolve")," ","functions, when they match their responses are created asynchronously. When the application first renders, if the router matches an async route, the response isn't immediately ready to use. To deal with this, you can use an observer to render once the initial response is ready."),r.a.createElement("p",null,"A setup function only needs to be called one time, so you can register it with ",r.a.createElement(s.d,null,"router.once"),"."),r.a.createElement(s.e,null,r.a.createElement("p",null,"In most applications, waiting for the initial response is the only time you may need to write response handlers yourself.")),r.a.createElement(s.b,{lang:"jsx"},"const Router = createRouterComponent(router);\n\nfunction setup() {\n  ReactDOM.render((\n    <Router>\n      <App />\n    </Router>\n  ), document.getElementById('root'));\n}\n\nrouter.once(setup);")),r.a.createElement(s.c,{meta:d,tag:"h4"},r.a.createElement("p",null,"Rendering libraries need to know when there is a new response so that they can re-render the application."),r.a.createElement("p",null,"The Curi rendering packages (",r.a.createElement(l.a,{name:"Package",params:{package:"react-dom",version:"v2"}},r.a.createElement(s.d,null,"@curi/react-dom")),","," ",r.a.createElement(l.a,{name:"Package",params:{package:"react-native",version:"v2"}},r.a.createElement(s.d,null,"@curi/react-native")),","," ",r.a.createElement(l.a,{name:"Package",params:{package:"vue",version:"v1"}},r.a.createElement(s.d,null,"@curi/vue")),", and"," ",r.a.createElement(l.a,{name:"Package",params:{package:"svelte",version:"v1"}},r.a.createElement(s.d,null,"@curi/svelte")),") setup an observer internally so that they can automatically re-render."),r.a.createElement("p",null,"If you are using vanilla JavaScript to render your application or you are writing your own framework implementation, you would use"," ",r.a.createElement(s.d,null,"router.observe")," to re-render new responses."),r.a.createElement(s.b,null,"function observer({ response }) {\n  // let the app know there is a new response\n}\n\nrouter.observe(observer);")),r.a.createElement(s.c,{meta:h,tag:"h4"},r.a.createElement("p",null,"Side effects are observers that are provided to the router at creation instead of by calling ",r.a.createElement(s.d,null,"router.observe"),". These can be useful for tasks that are not rendering related as well as for tasks that need to be performed after a render has completed."),r.a.createElement("p",null,"The"," ",r.a.createElement(l.a,{name:"Package",params:{package:"router",version:"v2"},hash:"title"},r.a.createElement(s.d,null,"title"))," ","function exported by ",r.a.createElement(s.d,null,"@curi/router")," is a side effect that will use ",r.a.createElement(s.d,null,"response.meta.title")," to set the page's"," ",r.a.createElement(s.d,null,"document.title"),"."),r.a.createElement("p",null,"With single-page applications, clicking on links wish hashes won't always scroll to the matching element in the page. The"," ",r.a.createElement(l.a,{name:"Package",params:{package:"router",version:"v2"},hash:"scroll"},r.a.createElement(s.d,null,"scroll"))," ","function exported by ",r.a.createElement(s.d,null,"@curi/router")," is a side effect that scrolls the page to the element that matches the new response's hash (",r.a.createElement(s.d,null,"response.location.hash"),") after the new response has rendered."),r.a.createElement("p",null,"If you need to add logging to your application, you could write your own observer to do this. Your observer can either be added as a side effect when the router is constructed or later using"," ",r.a.createElement(s.d,null,"router.observe"),"."),r.a.createElement(s.b,null,"function logger({ response }) {\n  loggingAPI.add(response.location);\n}\n\n// as a side-effect\nconst router = createRouter(browser, routes, {\n  sideEffects: [{ fn: logger }]\n});\n\n// as an observer\nrouter.observe(logger);"))))}}}]);