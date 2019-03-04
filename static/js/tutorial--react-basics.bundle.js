(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{25:function(e,t,n){"use strict";n.r(t),n.d(t,"component",function(){return x}),n.d(t,"contents",function(){return j});var a=n(0),r=n.n(a),o=n(3),l=n(24),c={title:"Demo",hash:"demo"},i={title:"Setup",hash:"setup"},s={title:"Path basics",hash:"path-basics"},u={title:"Routes",hash:"routes",children:[s]},m={title:"History",hash:"history"},h={title:"The Router",hash:"router"},p={title:"Responses and Navigation",hash:"responses"},d={title:"route.response()",hash:"route-response"},b={title:"Rendering with React",hash:"rendering",children:[p,d]},E={title:"The <Link> Component",hash:"link-component"},f={title:"A Navigation Menu",hash:"nav-menu"},g={title:"Linking to Books",hash:"book-links"},w={title:"Navigating between locations",hash:"navigating",children:[E,f,g]},k={title:"The Router's Navigate Method",hash:"nav-method"},y={title:"Let's go shopping",hash:"shopping",children:[k]},v={title:"What's next?",hash:"next"},j=[c,i,u,m,h,b,w,y,v];function x(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.h,null,r.a.createElement("h1",null,"React Basics Tutorial"),r.a.createElement("p",null,"In this tutorial, we will be building the front end of a website for a bookstore."),r.a.createElement(l.g,null,r.a.createElement("ul",null,r.a.createElement("li",null,"Creating a React application using"," ",r.a.createElement("a",{href:"https://facebook.github.io/create-react-app/"},"Create React App"),"."),r.a.createElement("li",null,"Defining the website's valid routes"),r.a.createElement("li",null,"Setting up a router"),r.a.createElement("li",null,"Rendering different content based on the current location."),r.a.createElement("li",null,"Writing links to navigate within the application.")))),r.a.createElement(l.d,{meta:c},r.a.createElement("p",null,"You can run a demo of the site we are building with CodeSandbox."),r.a.createElement(l.c,{id:"github/curijs/react-basic-tutorial/tree/master/"})),r.a.createElement(l.d,{meta:i},r.a.createElement("p",null,"We will be using"," ",r.a.createElement("a",{href:"https://github.com/facebook/create-react-app"},r.a.createElement(l.e,null,"create-react-app"))," ","to develop this website."),r.a.createElement(l.f,null,r.a.createElement("p",null,"The instructions here assume that you have NodeJS and NPM installed on your computer. If you do not, cannot, or prefer to avoid setup altogether, you can follow along using"," ",r.a.createElement("a",{href:"https://codesandbox.io/"},"CodeSandbox"),". Some of the boilerplate will be different, but the differences are minor.")),r.a.createElement("p",null,"Begin by opening a terminal and navigating to the directory where you want to save your code. Then, we will use ",r.a.createElement(l.e,null,"npx")," to create the application."),r.a.createElement(l.b,{lang:"bash"},"npx create-react-app curi-react-bookstore # create the app\ncd curi-react-bookstore # enter the new app directory"),r.a.createElement("p",null,"There are three routing related packages that we will be using, so let's install them now."),r.a.createElement("p",null,"The ",r.a.createElement(l.e,null,"@hickory/browser")," manages locations and navigation within an application. ",r.a.createElement(l.e,null,"@curi/router")," creates our router."," ",r.a.createElement(l.e,null,"@curi/react-dom")," provides React components that interact with the router."),r.a.createElement(l.b,{lang:"bash"},"npm install @hickory/browser @curi/router @curi/react-dom"),r.a.createElement("p",null,"Next, we can start ",r.a.createElement(l.e,null,"create-react-app"),"'s dev server. The dev server will automatically update when we change files, so we can leave that running."),r.a.createElement(l.b,{lang:"bash"},"npm run start # start the dev server")),r.a.createElement(l.d,{meta:u},r.a.createElement("p",null,'A single-page application is made up of a number of "routes", which are the valid locations within the application. The router matches the application against its routes to determine which one matches.'),r.a.createElement("p",null,"With Curi, routes are JavaScript objects. They have two required properties: ",r.a.createElement(l.e,null,"name")," and ",r.a.createElement(l.e,null,"path"),"."),r.a.createElement(l.b,null,'// this is a route\n{ name: "Home", path: "" }'),r.a.createElement("p",null,"A route's ",r.a.createElement(l.e,null,"name")," needs to be unique. Route names are used to identify which route to interact with for different functionality, like navigation."),r.a.createElement("p",null,"A route's ",r.a.createElement(l.e,null,"path")," is what the router uses to identify if a location matches the route. The ",r.a.createElement(l.e,null,"path")," is only matched against the location's pathname, the other parts of a URL are not used for matching."),r.a.createElement(l.d,{meta:s,className:"aside",tag:"h3"},r.a.createElement("p",null,"Route paths are strings describing the pathname segments of a URL that they should match."),r.a.createElement(l.b,null,"{ path: '' } // matches \"/\"\n{ path: 'about/stuff' } // matches \"/about/stuff\""),r.a.createElement("p",null,"Paths never begin with a slash."),r.a.createElement(l.b,null,"// yes\n{ path: '' }\n// no\n{ path: '/' }"),r.a.createElement("p",null,"Paths can include dynamic parameters. These are specified with a string that starts with a colon (",r.a.createElement(l.e,null,":"),") followed by the name of the params."),r.a.createElement(l.b,null,'// a param named "id"\n{ path: \'user/:id\' }\n// user/abc -> { id: "abc" }'),r.a.createElement("p",null,"Routes can be nested using the ",r.a.createElement(l.e,null,"children")," property of a route. A nested route inherits the path from its ancestor route(s), so its ",r.a.createElement(l.e,null,"path")," is only the additional part of the pathname that should be matched."),r.a.createElement(l.b,null,'{\n  name: "Parent",\n  path: "parent", // matches /parent\n  children: [\n    // matches /parent/daughter\n    { name: "Daughter", path: "daughter" },\n    // matches /parent/son\n    { name: "Son", path: "son" }\n  ]\n}')),r.a.createElement("p",null,"The website will start with four routes."),r.a.createElement(l.i,null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"name"),r.a.createElement("th",null,"path"),r.a.createElement("th",null,"use case"))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"Home"),r.a.createElement("td",null,r.a.createElement(l.e,null,'""')),r.a.createElement("td",null,"Lists books available for purchase.")),r.a.createElement("tr",null,r.a.createElement("td",null,"Book"),r.a.createElement("td",null,r.a.createElement(l.e,null,'"book/:id"')),r.a.createElement("td",null,"Details about an individual book. The ",r.a.createElement(l.e,null,"id")," param identifies a specific book.")),r.a.createElement("tr",null,r.a.createElement("td",null,"Checkout"),r.a.createElement("td",null,r.a.createElement(l.e,null,'"checkout"')),r.a.createElement("td",null,"Buy the books in the shopping cart.")),r.a.createElement("tr",null,r.a.createElement("td",null,"Catch All"),r.a.createElement("td",null,r.a.createElement(l.e,null,'"(.*)"')),r.a.createElement("td",null,"Display a not found page. This path matches every location (using a regular expression syntax), so it should be the last route.")))),r.a.createElement(l.f,null,r.a.createElement("p",null,"Curi uses the"," ",r.a.createElement("a",{href:"https://github.com/pillarjs/path-to-regexp"},r.a.createElement(l.e,null,"path-to-regexp"))," ","package for route matching. You can read its documentation to learn about more advanced path syntax.")),r.a.createElement("p",null,"Inside of the ",r.a.createElement(l.e,null,"src")," directory, we will create a"," ",r.a.createElement(l.e,null,"routes.js")," file where we can define the application's routes."),r.a.createElement(l.b,{lang:"bash"},"touch src/routes.js"),r.a.createElement("p",null,"We can create an array of routes using the above names and paths."),r.a.createElement("p",null,r.a.createElement(l.e,null,"@curi/router")," provides a ",r.a.createElement(l.e,null,"prepareRoutes")," function, which is used to setup routes for the router. We will pass the routes array to ",r.a.createElement(l.e,null,"prepareRoutes")," and export the result of that function call."),r.a.createElement(l.b,null,'// src/routes.js\nimport { prepareRoutes } from "@curi/router";\n\nexport default prepareRoutes([\n  {\n    name: "Home",\n    path: ""\n  },\n  {\n    name: "Book",\n    path: "book/:id"\n  },\n  {\n    name: "Checkout",\n    path: "checkout"\n  },\n  {\n    name: "Catch All",\n    path: "(.*)"\n  }\n]);'),r.a.createElement("p",null,"We will be creating the router in the ",r.a.createElement(l.e,null,"index.js")," file, so the routes array should be imported there."),r.a.createElement(l.b,{lang:"jsx","data-line":"5"},"// src/index.js\nimport React from 'react';\nimport ReactDOM from 'react-dom';\n\nimport routes from \"./routes\";\nimport './index.css';\nimport App from './App';\nimport registerServiceWorker from './registerServiceWorker';\n\nReactDOM.render(<App />, document.getElementById('root'));\nregisterServiceWorker();")),r.a.createElement(l.d,{meta:m},r.a.createElement("p",null,"Along with the routes, we also need to create a history object for the router. The history object is responsible for creating locations and navigation within the application."),r.a.createElement("p",null,"Curi uses the ",r.a.createElement("a",{href:"https://github.com/pshrmn/hickory"},"Hickory")," ","library for its history implementations. There are a few Hickory packages to choose from for different environments. For most websites, the ",r.a.createElement(l.e,null,"@hickory/browser")," is the right choice for the front end, which is what we will be using"),r.a.createElement("p",null,"We can import the ",r.a.createElement(l.e,null,"Browser")," function from"," ",r.a.createElement(l.e,null,"@hickory/browser")," in our index file (",r.a.createElement(l.e,null,"src/index.js"),", which ",r.a.createElement(l.e,null,"create-react-app")," created for us) and call the function to create a history object."),r.a.createElement(l.f,null,r.a.createElement("p",null,"The history object can be configured with"," ",r.a.createElement("a",{href:"https://github.com/pshrmn/hickory/blob/master/docs/api/Browser.md#options"},"an options object"),", but we will stick with the defaults.")),r.a.createElement(l.b,{lang:"jsx","data-line":"4,11"},"// src/index.js\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport Browser from '@hickory/browser';\n\nimport routes from \"./routes\";\nimport './index.css';\nimport App from './App';\nimport registerServiceWorker from './registerServiceWorker';\n\nconst history = Browser();\n\nReactDOM.render(<App />, document.getElementById('root'));\nregisterServiceWorker();")),r.a.createElement(l.d,{meta:h},r.a.createElement("p",null,"We are now ready to create the router. In the ",r.a.createElement(l.e,null,"src/index.js")," ","file, we should import the ",r.a.createElement(l.e,null,"curi")," function from"," ",r.a.createElement(l.e,null,"@curi/router"),". To create the router, call the"," ",r.a.createElement(l.e,null,"curi()")," function passing it the ",r.a.createElement(l.e,null,"history")," object and the ",r.a.createElement(l.e,null,"routes")," array."),r.a.createElement(l.b,{lang:"jsx","data-line":"4,13"},"// src/index.js\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport { curi } from '@curi/router';\nimport Browser from '@hickory/browser';\n\nimport routes from './routes';\nimport './index.css';\nimport App from './App';\nimport registerServiceWorker from './registerServiceWorker';\n\nconst history = Browser();\nconst router = curi(history, routes);\n\nReactDOM.render(<App />, document.getElementById('root'));\nregisterServiceWorker();"),r.a.createElement("p",null,"The router is now ready and we can render the application.")),r.a.createElement(l.d,{meta:b},r.a.createElement("p",null,"The ",r.a.createElement(l.e,null,"@curi/react-dom")," provides the components that we will use to interact with the router."),r.a.createElement("p",null,"We create a ",r.a.createElement(l.e,null,"Router")," component by passing the router to the"," ",r.a.createElement(l.e,null,"curiProvider")," higher-order component."),r.a.createElement(l.f,null,r.a.createElement("p",null,'Curi uses a higher-order component to create a component instead of a regular component because the router is a permanent "prop". An application should only have one router, so this approach discourages trying to swap routers.')),r.a.createElement(l.b,{lang:"jsx","data-line":"6,15"},"// src/index.js\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport { curi } from '@curi/router';\nimport Browser from '@hickory/browser';\nimport { curiProvider } from \"@curi/react-dom\";\n\nimport routes from './routes';\nimport './index.css';\nimport App from './App';\nimport registerServiceWorker from './registerServiceWorker';\n\nconst history = Browser();\nconst router = curi(history, routes);\nconst Router = curiProvider(router);\n\nReactDOM.render(<App />, document.getElementById('root'));\nregisterServiceWorker();"),r.a.createElement("p",null,"The ",r.a.createElement(l.e,null,"Router")," component will re-render the application whenever there is in-app navigation. It also sets up a React context, so any ",r.a.createElement(l.e,null,"@curi/react-dom")," components and hooks need to be descendants of the ",r.a.createElement(l.e,null,"Router")," in order to access the context."),r.a.createElement("p",null,"We will pass the ",r.a.createElement(l.e,null,"Router")," the ",r.a.createElement(l.e,null,"App")," element, which is where we will render the application's content."),r.a.createElement(l.b,{lang:"jsx","data-line":"17-21"},"// src/index.js\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport { curi } from '@curi/router';\nimport Browser from '@hickory/browser';\nimport { curiProvider } from \"@curi/react-dom\";\n\nimport routes from './routes';\nimport './index.css';\nimport App from './App';\nimport registerServiceWorker from './registerServiceWorker';\n\nconst history = Browser();\nconst router = curi(history, routes);\nconst Router = curiProvider(router);\n\nReactDOM.render((\n  <Router>\n    <App />\n  </Router>\n), document.getElementById('root'));\nregisterServiceWorker();"),r.a.createElement("p",null,"The existing content from ",r.a.createElement(l.e,null,"src/App.js")," can be removed and we will start from scratch."),r.a.createElement("p",null,"We will import the"," ",r.a.createElement(o.a,{name:"Package",params:{package:"react-dom",version:"v2"},hash:"useCuri"},r.a.createElement(l.e,null,"useCuri")," hook")," ","from ",r.a.createElement(l.e,null,"@curi/react-dom"),". This hook lets us read the context data that was set by the ",r.a.createElement(l.e,null,"Router"),". ",r.a.createElement(l.e,null,"useCuri")," returns three objects: ",r.a.createElement(l.e,null,"router"),", ",r.a.createElement(l.e,null,"response"),", and"," ",r.a.createElement(l.e,null,"navigation"),"."),r.a.createElement(l.b,{lang:"jsx"},'// src/App.js\nimport React from "react";\nimport { useCuri } from "@curi/react-dom";\n\nexport default function App() {\n\n}'),r.a.createElement("p",null,"The ",r.a.createElement(l.e,null,"router")," property is our Curi router, but what are the other two?"),r.a.createElement(l.d,{meta:p,className:"aside",tag:"h3"},r.a.createElement("p",null,"Whenever Curi receives a location, it matches its routes against it and creates a response object, which contains data about the route that matched the location."),r.a.createElement(l.b,null,"// a sample response object\n{\n  body: undefined,\n  data: undefined,\n  error: undefined,\n  location: { pathname: '/', ... },\n  name: 'Home',\n  params: {},\n  partials: [],\n  status: 200\n}"),r.a.createElement("p",null,"The router uses the"," ",r.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Observer_pattern"},"observer pattern")," ","to register functions that will be called when a new response is created. The ",r.a.createElement(l.e,null,"Router")," automatically observes the router so that it can re-render the application whenever there is a new response."),r.a.createElement("p",null,"The ",r.a.createElement(l.e,null,"navigation")," object contains additional information about a navigation that doesn't make sense to include in the response object. This includes the navigation's \"action\" (",r.a.createElement(l.e,null,"push"),", ",r.a.createElement(l.e,null,"pop"),", or ",r.a.createElement(l.e,null,"replace"),") and the previous response object."),r.a.createElement(l.b,null,'// a sample navigation object\n{\n  action: "push",\n  previous: { name: ..., location: ..., ... }\n}')),r.a.createElement("p",null,"The response is the most useful of these three properties, but the other two may can be handy. For example, the ",r.a.createElement(l.e,null,"navigation")," can be useful for animating route transitions."),r.a.createElement("p",null,"How do we render using the ",r.a.createElement(l.e,null,"response"),"? Any way you want! The best way is to use a ",r.a.createElement(l.e,null,"response"),"'s ",r.a.createElement(l.e,null,"body")," property."),r.a.createElement(l.d,{meta:d,className:"aside",tag:"h3"},r.a.createElement("p",null,"Route's can have a ",r.a.createElement(l.e,null,"response")," property, which is a function that returns an object. The (valid) properties of the object will be merged onto the response object."),r.a.createElement("p",null,"One of these valid properties is ",r.a.createElement(l.e,null,"body"),", so if the"," ",r.a.createElement(l.e,null,"response")," function returns an object with a"," ",r.a.createElement(l.e,null,"body")," property, we can access it from the response as"," ",r.a.createElement(l.e,null,"response.body"),"."),r.a.createElement(l.b,null,'{\n  name: "Home",\n  path: "",\n  response() {\n    return {\n      body: "Home, sweet home."\n    };\n    /*\n      * response = {\n      *   name: "Home",\n      *   location: {...},\n      *   body: "Home, sweet home.",\n      *   // ...\n      * }\n      */\n  }\n}')),r.a.createElement("p",null,"We can update the ",r.a.createElement(l.e,null,"App")," to get the response using"," ",r.a.createElement(l.e,null,"useCuri"),"."),r.a.createElement(l.b,{lang:"jsx"},'// src/App.js\nimport React from "react";\nimport { useCuri } from "@curi/react-dom";\n\nexport default function App() {\n  const { response } = useCuri();\n}'),r.a.createElement("p",null,"If a response's ",r.a.createElement(l.e,null,"body")," is a React component, we can render it! We haven't actually defined components for our routes yet, so we should throw together some placeholders."),r.a.createElement(l.b,{lang:"bash"},"mkdir -p src/components\ntouch src/components/Home.js src/components/Book.js \\\n  src/components/Checkout.js src/components/NotFound.js"),r.a.createElement(l.b,{lang:"jsx"},"// src/components/Home.js\nimport React from 'react';\n\nexport default function Home() {\n  return (\n    <div>Home</div>\n  );\n}"),r.a.createElement(l.b,{lang:"jsx"},"// src/components/Book.js\nimport React from 'react';\n\nexport default function Book(){\n  return (\n    <div>Book</div>\n  );\n}"),r.a.createElement(l.b,{lang:"jsx"},"// src/components/Checkout.js\nimport React from 'react';\n\nexport default function Checkout() {\n  return (\n    <div>Checkout</div>\n  );\n}"),r.a.createElement(l.b,{lang:"jsx"},"// src/components/NotFound.js\nimport React from 'react';\n\nexport default function NotFound() {\n  return (\n    <div>Not Found</div>\n  );\n}"),r.a.createElement("p",null,"These components can be imported in ",r.a.createElement(l.e,null,"src/routes.js"),". Each route can be given a ",r.a.createElement(l.e,null,"response")," function which returns an object with their respective component as its ",r.a.createElement(l.e,null,"body"),"."),r.a.createElement(l.b,{"data-line":"4-7,13-15,20-22,27-29,34-36"},'// src/routes.js\nimport { prepareRoutes } from "@curi/router";\n\nimport Home from \'./components/Home\';\nimport Book from \'./components/Book\';\nimport Checkout from \'./components/Checkout\';\nimport NotFound from \'./components/NotFound\';\n\nexport default prepareRoutes([\n  {\n    name: "Home",\n    path: "",\n    response() {\n      return { body: Home };\n    }\n  },\n  {\n    name: "Book",\n    path: "book/:id",\n    response() {\n      return { body: Book };\n    }\n  },\n  {\n    name: "Checkout",\n    path: "checkout",\n    response() {\n      return { body: Checkout };\n    }\n  },\n  {\n    name: "Catch All",\n    path: "(.*)",\n    response() {\n      return { body: NotFound };\n    }\n  }\n]);'),r.a.createElement("p",null,"Now that the responses have ",r.a.createElement(l.e,null,"body")," properties that are React components, we can update the ",r.a.createElement(l.e,null,"App")," to render them."),r.a.createElement("p",null,"We will also pass the ",r.a.createElement(l.e,null,"response")," as a prop to the rendered component, which means that each of the route components will have access to the ",r.a.createElement(l.e,null,"response")," when they are rendered. This isn't strictly necessary, but can come in handy."),r.a.createElement(l.b,{lang:"jsx","data-line":"7-8"},'// src/App.js\nimport React from "react";\nimport { useCuri } from "@curi/react-dom";\n\nexport default function App() {\n  const { response } = useCuri();\n  const { body:Body } = response;\n  return <Body response={response} />\n}'),r.a.createElement("p",null,"At this point in time our app is rendering, but is isn't very interesting because we cannot navigate between locations.")),r.a.createElement(l.d,{meta:w},r.a.createElement("p",null,"The ",r.a.createElement(l.e,null,"@curi/react-dom")," package provides a ",r.a.createElement(l.e,null,"Link")," ","component that we can use to navigate between locations within our application."),r.a.createElement(l.d,{meta:E,className:"aside",tag:"h3"},r.a.createElement("p",null,"Navigation isn't done by manually typing the pathname of the location the link should navigate to. Instead, we specify the name of the route using the ",r.a.createElement(l.e,null,"name")," prop."),r.a.createElement(l.b,{lang:"jsx"},'// { name: "Home", path: "" }\n<Link name="Home">Home</Link>\n// <a href="/">Home</a>'),r.a.createElement("p",null,"If a route has params, we provide these to the ",r.a.createElement(l.e,null,"Link")," as a"," ",r.a.createElement(l.e,null,"params")," object. For a nested route, we would also need to provide params for any ancestor routes."),r.a.createElement(l.b,{lang:"jsx"},'// { name: "Book", path: "book/:id" }\n<Link name="Book" params={{ id: 7 }}>The Dark Forest</Link>\n// <a href="/book/7">The Dark Forest</a>'),r.a.createElement("p",null,"The ",r.a.createElement(l.e,null,"Link")," is only for in-app navigation. If you want to link to pages outside of the application, use an anchor."),r.a.createElement(l.b,{lang:"jsx"},'// in-app\n<Link name="Some Route">Some Route</Link>\n\n// out of app\n<a href="https://github.com">GitHub</a>'),r.a.createElement("p",null,"If you need to attach query or hash data to a ",r.a.createElement(l.e,null,"Link"),", use the ",r.a.createElement(l.e,null,"query")," and ",r.a.createElement(l.e,null,"hash")," props."),r.a.createElement(l.b,{lang:"jsx"},'// { name: "Checkout", path: "checkout" }\n<Link name="Checkout" query=\'affiliate=123\'>Checkout</Link>\n// <a href="/checkout?affiliate=123">Checkout</a>')),r.a.createElement(l.d,{meta:f,tag:"h3"},r.a.createElement("p",null,"The application will have a navigation menu component with links to our home page and checkout page."),r.a.createElement(l.b,{lang:"bash"},"touch src/components/NavMenu.js"),r.a.createElement("p",null,"In order to link to these routes, we only need to know their name, not the actual pathname for the URL."),r.a.createElement(l.b,{lang:"jsx"},"// src/components/NavMenu.js\nimport React from 'react';\nimport { Link } from '@curi/react-dom';\n\nexport default function NavMenu() {\n  return (\n    <nav>\n      <ul>\n        <li>\n          <Link name=\"Home\">Home</Link>\n        </li>\n        <li>\n          <Link name=\"Checkout\">Checkout</Link>\n        </li>\n      </ul>\n    </nav>\n  );\n}"),r.a.createElement("p",null,"The menu can be rendered by the ",r.a.createElement(l.e,null,"App")," component. We can also add structure to the site by rendering ",r.a.createElement(l.a,null,"header")," and"," ",r.a.createElement(l.a,null,"main")," elements around their respective content."),r.a.createElement(l.b,{lang:"jsx","data-line":"5,10-19"},'// src/App.js\nimport React from "react";\nimport { useCuri } from "@curi/react-dom";\n\nimport NavMenu from \'./components/NavMenu\';\n\nexport default function App() {\n  const { response } = useCuri();\n  const { body:Body } = response;\n  return (\n    <React.Fragment>\n      <header>\n        <NavMenu />\n      </header>\n      <main>\n        <Body response={response} />\n      </main>\n    </React.Fragment>\n  );\n}')),r.a.createElement(l.d,{meta:g,tag:"h3"},r.a.createElement("p",null,"The website should link to individual books from its home page. To do this, we need data about the available books. Since we don't have a backend to fetch book data from, we'll hard-code the books data in the ",r.a.createElement(l.e,null,"src/books.js")," module."),r.a.createElement(l.b,{lang:"bash"},"touch src/books.js"),r.a.createElement("p",null,"You can copy+paste or modify the data, but the structure of the provided data should stay the same."),r.a.createElement(l.b,null,"// src/books.js\nexport default [\n  {\n    id: 0,\n    title: 'The Name of the Wind',\n    author: 'Patrick Rothfuss',\n    published: '2007',\n    pages: 662\n  },\n  {\n    id: 1,\n    title: \"The Wise Man's Fear\",\n    author: 'Patrick Rothfuss',\n    published: '2011',\n    pages: 994\n  },\n  {\n    id: 2,\n    title: 'The Way of Kings',\n    author: 'Brandon Sanderson',\n    published: '2010',\n    pages: 1007\n  },\n  {\n    id: 3,\n    title: 'A Storm of Swords',\n    author: 'George R.R. Martin',\n    published: '2003',\n    pages: 1177\n  },\n  {\n    id: 78,\n    title: 'Words of Radiance',\n    author: 'Brandon Sanderson',\n    published: '2014',\n    pages: 1087\n  }\n];"),r.a.createElement("p",null,"The data can be imported in the ",r.a.createElement(l.e,null,"Home")," component and we can iterate over the books to render a ",r.a.createElement(l.e,null,"Link")," to each one."),r.a.createElement(l.b,{lang:"jsx","data-line":"5,8-20"},"// src/components/Home.js\nimport React from 'react';\nimport { Link } from '@curi/react-dom';\n\nimport books from '../books';\n\nexport default function Home() {\n  return (\n    <div>\n      <ul>\n        {books.map(book => (\n          <li key={book.id}>\n            <Link name=\"Book\" params={{ id: book.id }} >\n              {book.title} by {book.author}\n            </Link>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"),r.a.createElement("p",null,"Now that we can navigate to the books, we should fill out the UI for the ",r.a.createElement(l.e,null,"Book")," component. Up above, we passed the"," ",r.a.createElement(l.e,null,"response")," object as a prop to the ",r.a.createElement(l.e,null,"response.body")," ","component. Now, we can use that object in the ",r.a.createElement(l.e,null,"Book")," ","component to access the captured route params so that we know which book to show."),r.a.createElement("p",null,"We will once again import the ",r.a.createElement(l.e,null,"books.js")," data. We can use"," ",r.a.createElement(l.e,null,"params.id")," to select the correct book."," ",r.a.createElement(l.e,null,"params.id")," is a string, so we will need to parse it into an integer. Sometimes there won't be a valid book for the"," ",r.a.createElement(l.e,null,"params.id"),". In that case, we will also want to display a message that the requested book could not be found."),r.a.createElement(l.b,{lang:"jsx","data-line":"4,6-20"},"// src/components/Book.js\nimport React from 'react';\n\nimport books from '../books';\n\nexport default function Book({ response }) {\n  const id = parseInt(response.params.id, 10);\n  const book = books.find(b => b.id === id);\n  if (!book) {\n    return <div>The requested book could not be found</div>;\n  }\n  return (\n    <div>\n      <h1>{book.title}</h1>\n      <h2>by {book.author}</h2>\n      <p>Published in {book.published}</p>\n      <p>{book.pages} pages</p>\n    </div>\n  );\n}"))),r.a.createElement(l.d,{meta:y},r.a.createElement("p",null,"Users of the website should be able to add books to their shopping cart. For brevity, we will store the cart data in memory (i.e. it will be lost when refreshing the page)."),r.a.createElement(l.b,{lang:"bash"},"touch src/cart.js"),r.a.createElement("p",null,"The shopping cart implementation will be a JavaScript ",r.a.createElement(l.e,null,"Map"),". We can call its ",r.a.createElement(l.e,null,"set")," method to add books, its"," ",r.a.createElement(l.e,null,"clear")," method to reset the cart, and iterate over its"," ",r.a.createElement(l.e,null,"entries")," with a ",r.a.createElement(l.e,null,"for...of")," loop."),r.a.createElement(l.f,null,r.a.createElement("p",null,"The ",r.a.createElement(l.e,null,"Map")," or some of its features may not work in older browsers.")),r.a.createElement(l.b,null,"// src/cart.js\nconst cart = new Map();\n\nexport default {\n  add(book, quantity) {\n    cart.set(book, quantity);\n  },\n  items() {\n    const books = [];\n    for (let [book, quantity] of cart.entries()) {\n      books.push({\n        title: book.title,\n        quantity\n      });\n    }\n    return books;\n  },\n  reset() {\n    cart.clear();\n  }\n};"),r.a.createElement("p",null,"Before we edit the ",r.a.createElement(l.e,null,"Book")," component, we should quickly revisit the ",r.a.createElement(l.e,null,"App")," component. In addition to passing the"," ",r.a.createElement(l.e,null,"response")," to the ",r.a.createElement(l.e,null,"Body"),", we should also pass it our"," ",r.a.createElement(l.e,null,"router"),", which will allow us to do programmatic navigation."),r.a.createElement(l.b,{lang:"jsx","data-line":"8,16"},'// src/App.js\nimport React from "react";\nimport { useCuri } from "@curi/react-dom";\n\nimport NavMenu from \'./components/NavMenu\';\n\nexport default function App() {\n  const { response, router } = useCuri();\n  const { body:Body } = response;\n  return (\n    <React.Fragment>\n      <header>\n        <NavMenu />\n      </header>\n      <main>\n        <Body response={response} router={router} />\n      </main>\n    </React.Fragment>\n  );\n}'),r.a.createElement("p",null,"We can now access our ",r.a.createElement(l.e,null,"router")," in the ",r.a.createElement(l.e,null,"Book")," ","component. The router's ",r.a.createElement(l.e,null,"navigate()")," function can be used to navigate to a new location. This means that when the user clicks a button to add a book to their shopping cart, we can automatically navigate to the checkout page."),r.a.createElement(l.d,{meta:k,className:"aside",tag:"h3"},r.a.createElement("p",null,r.a.createElement(l.e,null,"router.navigate()")," is used to navigate to new locations. There are three methods of navigation: ",r.a.createElement(l.e,null,"push"),","," ",r.a.createElement(l.e,null,"replace"),", and ",r.a.createElement(l.e,null,"anchor"),"."),r.a.createElement("p",null,r.a.createElement(l.e,null,"push")," pushes a new location after the current index, removing any locations after the current location."),r.a.createElement(l.b,null,"// session = ['/one', '/two', '/three'], index = 1\nrouter.navigate({ name: \"New\", method: \"push\" });\n// session = ['/one', '/two', '/new'], index = 2"),r.a.createElement("p",null,r.a.createElement(l.e,null,"replace")," replaces the location at the current index."),r.a.createElement(l.b,null,"// session = ['/one', '/two', '/three'], index = 1\nrouter.navigate({ name: \"Replace\", method: \"replace\" });\n// session = ['/one', '/replacement', '/three'], index = 1"),r.a.createElement("p",null,r.a.createElement(l.e,null,"anchor")," is a mix between ",r.a.createElement(l.e,null,"push")," and"," ",r.a.createElement(l.e,null,"replace"),". It mimics the behavior of clicking on links, so if you navigate to the same location as the current one it will replace, and if you navigate to a new location it will push."),r.a.createElement("p",null,"If ",r.a.createElement(l.e,null,"method.navigate()")," is called without a navigation"," ",r.a.createElement(l.e,null,"method"),", it will default to ",r.a.createElement(l.e,null,"anchor"),"."),r.a.createElement(l.b,null,"// session = ['/one', '/two', '/three'], index = 1\nrouter.navigate({ name: \"Two\", method: \"anchor\" });\n// session = ['/one', '/two', '/three'], index = 1\nrouter.navigate({ name: \"New\", method: \"anchor\" });\n// session = ['/one', '/two', '/new'], index = 2","`}")),r.a.createElement("p",null,"We also want to import our shopping cart API so that we can add a book to the cart."),r.a.createElement(l.b,{lang:"jsx","data-line":"5,19-27"},"// src/components/Book.js\nimport React from 'react';\n\nimport books from '../books';\nimport cart from '../cart';\n\nexport default function Book({ response, router }) {\n  const id = parseInt(response.params.id, 10);\n  const book = books.find(b => b.id === id);\n  if (!book) {\n    return <div>The requested book could not be found</div>;\n  }\n  return (\n    <div>\n      <h1>{book.title}</h1>\n      <h2>by {book.author}</h2>\n      <p>Published in {book.published}</p>\n      <p>{book.pages} pages</p>\n      <button\n        type=\"button\"\n        onClick={() => {\n          cart.add(book, 1);\n          router.navigate({ name: \"Checkout\" });\n        }}\n      >\n        Add to Cart\n      </button>\n    </div>\n  );\n}"),r.a.createElement("p",null,"Finally, we can update our ",r.a.createElement(l.e,null,"Checkout")," component to display the books in the shopping cart. To do this, we will import our cart and books. Our cart only stores book ",r.a.createElement(l.e,null,"id"),"s, so we will need to merge the book data with the cart data."),r.a.createElement("p",null,'When a user "buys" the books in their shopping cart, we need to clear out the cart. We will also replace the current location with one whose'," ",r.a.createElement(l.e,null,"location.hash"),' is the string "thanks". When that is present in the location, we can render a "Thanks for your purchase" message.'),r.a.createElement(l.b,{lang:"jsx"},"// src/components/Checkout.js\nimport React from 'react';\n\nimport cart from '../cart';\n\nexport default function Checkout({ router, response }) {\n  const books = cart.items();  \n  if (!books.length) {\n    return response.location.hash === 'thanks'\n      ? <div>Thanks for your purchase!</div>\n      : <div>The cart is currently empty</div>;\n  }\n  return (\n    <div>\n      <h1>Checkout</h1>\n      <ScrollableTable>\n        <thead>\n          <tr>\n            <th>Title</th>\n            <th>Quantity</th>\n          </tr>\n        </thead>\n        <tbody>\n          {books.map(book => (\n            <tr key={book.title}>\n              <td>{book.title}</td>\n              <td>{book.quantity}</td>\n            </tr>\n          ))}\n        </tbody>\n      </ScrollableTable>\n      <button\n        type=\"button\"\n        onClick={() => {\n          cart.reset();\n          const pathname = router.route.pathname('Checkout');\n          router.navigate({\n            name: \"Checkout\",\n            hash: \"thanks\",\n            method: \"replace\"\n          });\n        }}\n      >\n        Buy\n      </button>\n    </div>\n  );\n};")),r.a.createElement(l.d,{meta:v},r.a.createElement("p",null,"We now have a functional website built with React and Curi. What should you do next? Build another site! You can also check out the"," ",r.a.createElement(o.a,{name:"Guides"},"guides")," for information on advanced techniques.")))}}}]);