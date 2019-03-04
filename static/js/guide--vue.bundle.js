(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{39:function(e,n,t){"use strict";t.r(n),t.d(n,"component",function(){return h}),t.d(n,"contents",function(){return p});var a=t(0),l=t.n(a),r=t(3),o=t(22),i={title:"Vue"},s={title:"Rendering with the response",hash:"rendering-response"},u={title:"Accessibility",hash:"accessibility"},c={title:"The Curi Plugin",hash:"plugin",children:[s]},m={title:"Navigating",hash:"navigating"},p=[c,m];function h(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(o.f,null,l.a.createElement("h1",null,i.title)),l.a.createElement(o.c,{meta:c},l.a.createElement("p",null,"The ",l.a.createElement(o.d,null,"CuriPlugin")," for Vue allows you to interface your router with a Vue application. The plugin sets up a reactive object for tracking responses using an"," ",l.a.createElement(r.a,{name:"Guide",params:{slug:"navigating"},hash:"observer"},"observer"),", so whenever there is a new response, the parts of your application that use the response will be re-rendered."),l.a.createElement("p",null,"The plugin also makes the ",l.a.createElement(o.d,null,"response")," accessible to every component in your application through the ",l.a.createElement(o.d,null,"$curi")," property."),l.a.createElement(o.b,{lang:"jsx"},'import Vue from "vue";\nimport { CuriPlugin } from "@curi/vue";\n\nimport router from "./router";\n\nVue.use(CuriPlugin, { router });'),l.a.createElement(o.c,{meta:s,tag:"h3"},l.a.createElement("p",null,"Vue allows you to render dynamic components using the"," ",l.a.createElement(o.a,null,"component :is")," syntax. If you set Vue components as the"," ",l.a.createElement(o.d,null,"body")," properties on your responses, you can combine"," ",l.a.createElement(o.a,null,"component :is")," and ",l.a.createElement(o.d,null,"response.body")," to render the appropriate component for a ",l.a.createElement(o.d,null,"response"),"."),l.a.createElement("p",null,"A root component is a good place to perform general application layout, like menus, in addition to rendering the response's"," ",l.a.createElement(o.d,null,"body"),"."),l.a.createElement(o.b,{lang:"html"},'<template>\n  <header>\n    <NavLinks />\n  </header>\n  <main>\n    <component :is="$curi.response.body" />\n  </main>\n</template>\n\n<script>\n  import NavLinks from "./NavLinks";\n  export default {\n    components: { NavLinks }\n  };\n<\/script>'),l.a.createElement("p",null,"If your routes use an object to attach multiple components to a response, splitting them apart in computed properties may give your templates a cleaner look."),l.a.createElement("p",null,"If you do attach multiple components to a response, please remember that you want every route to set the same ",l.a.createElement(o.d,null,"body")," shape. Otherwise, you'll have to determine the shape and change how you render, which can quickly become messy."),l.a.createElement(o.b,{lang:"html"},'<script>\nconst routes = prepareRoutes([\n  {\n    name: "Home",\n    path: "",\n    response() {\n      return {\n        body: {\n          main: HomeMain,\n          menu: HomeMenu\n        }\n      }\n    }\n  },\n  // ...\n]);\n<\/script>\n\n<template>\n  <header>\n    <component :is="menu" />\n  </header>\n  <main>\n    <component :is="main" />\n  </main>\n</template>\n\n<script>\n  export default {\n    computed: {\n      main() {\n        return this.$curi.response.body.main;\n      },\n      menu() {\n        return this.$curi.response.body.menu;\n      }\n    }\n  }\n<\/script>'),l.a.createElement("p",null,"In addition to the ",l.a.createElement(o.d,null,"response"),", the current"," ",l.a.createElement(o.d,null,"navigation")," object (the ",l.a.createElement(o.d,null,"previous")," response and the navigation ",l.a.createElement(o.d,null,"action"),") is globally available through"," ",l.a.createElement(o.d,null,"$curi.navigation")),l.a.createElement("p",null,"The router is globally available as ",l.a.createElement(o.d,null,"$router"),".")),l.a.createElement(o.c,{meta:u,tag:"h3"},l.a.createElement("p",null,"Managing the application's focus when navigating is useful for users who use screen readers. The ",l.a.createElement(o.d,null,"curi-focus")," directive provides a convenient way to focus a page's main content when it renders a new response."),l.a.createElement("p",null,"You can read some more about accessibility in the"," ",l.a.createElement(r.a,{name:"Guide",params:{slug:"accessibility"}},"accessibility")," ","guide."),l.a.createElement(o.b,{lang:"html","data-line":"5"},'<template>\n  <header>\n    <NavLinks />\n  </header>\n  <main :tabIndex="-1" v-curi-focus="$curi.response">\n    <component :is="$curi.response.body" />\n  </main>\n</template>\n\n<script>\n  import NavLinks from "./NavLinks";\n  export default {\n    components: { NavLinks }\n  };\n<\/script>'))),l.a.createElement(o.c,{meta:m},l.a.createElement("p",null,"The ",l.a.createElement(o.d,null,"curi-link")," component is used to navigate between routes within an application. When it renders in the DOM, it will render as an anchor (",l.a.createElement(o.a,null,"a"),") element."),l.a.createElement("p",null,"The ",l.a.createElement(o.d,null,"curi-link"),"'s ",l.a.createElement(o.d,null,"to")," prop describes which route clicking the link should navigate to. If you pass an invalid route name, Curi will warn you."),l.a.createElement("p",null,"If a route has any params (or if any of a route's ancestors have params for nested routes), the ",l.a.createElement(o.d,null,"params")," prop is used to pass these to the ",l.a.createElement(o.d,null,"curi-link"),"."),l.a.createElement(o.b,{lang:"html"},'<template>\n  <nav>\n    <ul>\n      <li>\n        <curi-link to="Home">Home</curi-link>\n      </li>\n      <li>\n        <curi-link to="About">About</curi-link>\n      </li>\n      <li>\n        <curi-link to="User" :params="{ id: \'blue\' }">\n          Blue\n        </curi-link>\n      </li>\n    </ul>\n  </nav>\n</template>'),l.a.createElement("p",null,"The ",l.a.createElement(o.d,null,"curi-link")," also takes ",l.a.createElement(o.d,null,"hash"),", ",l.a.createElement(o.d,null,"query"),", and ",l.a.createElement(o.d,null,"state")," props to attach their values to the location that will be navigated to."),l.a.createElement(o.b,{lang:"jsx"},'<curi-link to="Home" hash="details">Home</curi-link>\n// renders\n<a href="/#details">Home</a>')),l.a.createElement(o.f,null,l.a.createElement("p",null,"Please check out the full"," ",l.a.createElement(r.a,{name:"Package",params:{package:"vue",version:"v1"},hash:"API"},l.a.createElement(o.d,null,"@curi/vue"))," ","API documentation to see every component that the package provides.")))}}}]);