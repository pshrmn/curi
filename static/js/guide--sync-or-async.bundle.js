(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{43:function(e,t,n){"use strict";n.r(t),n.d(t,"component",function(){return c}),n.d(t,"contents",function(){return u});var a=n(0),r=n.n(a),o=n(3),l=n(22),s={title:"Sync or Async"},i={title:"Async Things to Think About",hash:"think"},u=[i];function c(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.f,null,r.a.createElement("h1",null,s.title),r.a.createElement("p",null,"With Curi, routes can be synchronous or asynchronous."),r.a.createElement("p",null,"When a navigation event is triggered (e.g. clicking a link or button), the router will match a route. If the route is synchronous, the response will be emitted immediately. If the route is asynchronous, the response will not be emitted until the route's async functions have finished. Asynchronous routes are useful for code splitting and preloading data."),r.a.createElement("p",null,"By default, routes are synchronous. If a route has any functions in its ",r.a.createElement(l.d,null,"resolve")," object, it becomes async."),r.a.createElement(l.b,null,'// sync\n{ name: "Home", path: "" },\n\n// async\n{\n  name: "User",\n  path: "user/:id,\n  // any functions in here makes the route async\n  resolve: {\n    body: () => import("./components/User"),\n  }\n}')),r.a.createElement(l.c,{meta:i},r.a.createElement("p",null,"For the most part, it shouldn't matter to you (or your users) whether routes are sync or async, but there are a couple of things that you should be aware of when it comes to async matching."),r.a.createElement("ol",null,r.a.createElement("li",null,r.a.createElement("p",null,"If the initial route that matches is async and you try to render immediately, the ",r.a.createElement(l.d,null,"response")," will be ",r.a.createElement(l.d,null,"null"),". You can wait to render until the initial response is ready with"," ",r.a.createElement(l.d,null,"router.once()"),"."),r.a.createElement(l.b,null,"const router = curi(history, routes);\nrouter.once(() => {\n  // the initial response is ready,\n  // so it is safe to render\n  ReactDOM.render(...);\n});")),r.a.createElement("li",null,r.a.createElement("p",null,"With async routes, there is a delay between when the user clicks a link and when the new response is emitted (the delay being the time it takes for the asynchronous actions to run). During this time, the navigation can be interrupted with a new navigation. It can be useful to update your UI after a link/button is clicked to indicate that the next page is loading."),r.a.createElement("p",null,"You can see an example of this in the"," ",r.a.createElement(o.b,{name:"Example",params:{category:"react",slug:"async-nav"}},"Asynchronous Navigation Example"),".")))))}}}]);