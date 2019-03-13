(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{26:function(e,t,n){"use strict";n.r(t),n.d(t,"component",function(){return g}),n.d(t,"contents",function(){return y});var a=n(0),o=n.n(a),r=n(3),l=n(24),i={title:"Demo",hash:"demo"},s={title:"Setup",hash:"setup"},c={title:"Initial Render",hash:"initial-render"},u={title:"Asynchronous Routes",hash:"async",children:[c]},m={title:"Code Splitting",hash:"code-splitting"},d={title:"Code Splitting in Routes",hash:"code-splitting-routes",children:[m]},p={title:"The Fake API",hash:"fake-api"},h={title:"Preloading Data",hash:"preloading-data",children:[p]},f={title:"<Link> is navigating?",hash:"link-navigating"},b={title:"Visualizing Loading",hash:"loading",children:[f]},E={title:"Async Caveats",hash:"caveats"},y=[i,s,u,d,h,b,E];function g(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(l.h,null,o.a.createElement("h1",null,"React Advanced Tutorial"),o.a.createElement("p",null,"In this tutorial, we will be expanding on the website built in the"," ",o.a.createElement(r.a,{name:"Tutorial",params:{slug:"react-basics"}},"React basics tutorial"),". We will take advantage of Curi's async features to add code splitting and data preloading to the application."),o.a.createElement(l.g,null,o.a.createElement("ul",null,o.a.createElement("li",null,"Add code splitting to routes."),o.a.createElement("li",null,"Preload route data with asynchronous navigation.")))),o.a.createElement(l.d,{meta:i},o.a.createElement("p",null,"You can run a demo of the site we are building with CodeSandbox."),o.a.createElement(l.c,{id:"github/curijs/react-advanced-tutorial/tree/master/",title:"Curi React advanced tutorial"})),o.a.createElement(l.d,{meta:s},o.a.createElement("p",null,"If you did not complete the React basics tutorial, you should either clone its"," ",o.a.createElement("a",{href:"https://github.com/curijs/react-basic-tutorial/"},"repo")," or fork its"," ",o.a.createElement("a",{href:"https://codesandbox.io/s/github/curijs/react-basic-tutorial/tree/master/"},"sandbox"),"."),o.a.createElement("p",null,"If you are cloning the repo, you should also install its dependencies and then start the development server."),o.a.createElement(l.b,{lang:"bash"},"git clone https://github.com/curijs/react-basic-tutorial react-advanced-tutorial\ncd react-advanced-tutorial\nnpm install\nnpm run start")),o.a.createElement(l.d,{meta:u},o.a.createElement("p",null,"Curi lets you attach async functions to a route through its"," ",o.a.createElement(l.e,null,"resolve")," function. When that route matches, a response will not be emitted until the ",o.a.createElement(l.e,null,"resolve")," has resolved."),o.a.createElement("p",null,o.a.createElement(l.e,null,"resolve")," be passed an object of the matched route properties, which you may use to specify what data to load."),o.a.createElement("p",null,"The results of the async functions will be available in a route's"," ",o.a.createElement(l.e,null,"response")," function through the ",o.a.createElement(l.e,null,"resolved")," object. Each result will be stored in the object using the async function's name."),o.a.createElement("p",null,"If any of the async functions throws an uncaught error, that error will be available in the ",o.a.createElement(l.e,null,"response")," function through the"," ",o.a.createElement(l.e,null,"error")," property. That said, it is preferable for you to catch and handle the errors yourself."),o.a.createElement(l.b,null,'{\n  name: "A Route",\n  path: "route/:id",\n  resolve({ params }) {\n    const body = import("./components/SomeComponent").then(preferDefault);\n    const data = fetch(`/api/data/${params.id}`);\n    return Promise.all([ component, data ]);\n  },\n  response({ resolved, error }) {\n    if (error) {\n      // handle an uncaught error\n    }\n    const [body, data] = resolved;\n    return { body, data };\n  }\n}'),o.a.createElement(l.f,null,o.a.createElement("p",null,"These async functions are called every time a route matches. If you have functions that should re-use the results from previous calls, you will probably want to implement some caching. Curi provides a"," ",o.a.createElement(r.a,{name:"Package",params:{package:"helpers",version:"v1"},hash:"once"},o.a.createElement(l.e,null,"once()"))," ","function for simple caching, but leaves more advanced caching solutions to the user.")),o.a.createElement("p",null,"Curi uses Promises to manage async code, so async functions should return Promises. ",o.a.createElement(l.e,null,"Promise.resolve()")," can be used to wrap a return value in a Promise."),o.a.createElement(l.b,null,'import { preferDefault } from "@curi/helpers";\n\nconst routes = prepareRoutes([\n  {\n    name: "A Route",\n    path: "route/:id",\n    resolve({ params }) {\n      const body = import("./components/SomeComponent").then(preferDefault);\n      const data = fetch(`/api/data/${params.id}`);\n      return Promise.all([ component, data ]);\n    },\n    response({ resolved, error }) {\n      if (error) {\n        // handle an uncaught error\n      }\n      const [body, data] = resolved;\n      return { body, data };\n    }\n  }\n]);'),o.a.createElement(l.d,{meta:c,className:"aside",tag:"h3"},o.a.createElement("p",null,"There is one caveat to async routes: we cannot safely render the application immediately on load because the initial response might not be ready yet."),o.a.createElement("p",null,"Curi does not emit a response object to its observers until it is ready. If the initial route that matches is asynchronous, then there is a delay between when the application is ready to render and when there is a response to render."),o.a.createElement("p",null,"If you attempt to render immediately after creating a router and the initial response is still being created, the ",o.a.createElement(l.e,null,"response")," ","that will be passed to the ",o.a.createElement(l.e,null,"Router"),"'s ",o.a.createElement(l.e,null,"children()")," ","will be ",o.a.createElement(l.e,null,"null"),"."),o.a.createElement("p",null,"There are a few possible ways to handle this situation."),o.a.createElement("p",null,"The first is to delay rendering by placing your"," ",o.a.createElement(l.e,null,"ReactDOM.render()")," call inside of a"," ",o.a.createElement(l.e,null,"router.once()")," callback. This will guarantee that the render isn't called until the first response is ready."),o.a.createElement(l.b,null,"// delay rendering\nrouter.once(() => {\n  ReactDOM.render((\n    <Router>\n      <App />\n    </Router>\n  ), holder);\n});\n"),o.a.createElement("p",null,"Alternatively, you can update the root ",o.a.createElement(l.e,null,"App")," component to detect when the ",o.a.createElement(l.e,null,"response")," is ",o.a.createElement(l.e,null,"null")," and render a loading message."),o.a.createElement(l.b,null,"// render fallback when response is null\nfunction App() {\n  const { response } = useCuri();\n  if (response == null) {\n    return <div>Loading...</div>;\n  }\n  const { body:Body } = response;\n  return <Body response={response} />;\n}"),o.a.createElement("p",null,"Which approach is best will depend on the specifics of an application. If there are routes that will take a long time for the initial load, you will probably want to render something while they load. For async code with short loading times, a blank screen might be more acceptable.")),o.a.createElement("p",null,"For more information on async route properties, please refer to the"," ",o.a.createElement(r.a,{name:"Guide",params:{slug:"routes"}},"routes guide"),".")),o.a.createElement(l.d,{meta:d},o.a.createElement("p",null,"Currently, the ",o.a.createElement(l.e,null,"routes.js")," module imports all of the route modules at the top of the file. This results in a single bundle of all of a website's code. This can be improved by adding code splitting to an application, which will result in more, but smaller, bundles."),o.a.createElement(l.d,{meta:m,className:"aside",tag:"h3"},o.a.createElement("p",null,'Code splitting works by "dynamically" importing modules using the'," ",o.a.createElement(l.e,null,"import()")," function. When bundlers like Webpack see"," ",o.a.createElement(l.e,null,"import()")," functions, they know to create a separate bundle for that module (and that module's imports, etc.)."),o.a.createElement("p",null,"You can set a chunk's name using the"," ",o.a.createElement("a",{href:"https://webpack.js.org/api/module-methods/#magic-comments"},o.a.createElement(l.e,null,"webpackChunkName"))," ","magic comment with an ",o.a.createElement(l.e,null,"import()")," call."),o.a.createElement("p",null,"Create React App's default configuration is already setup to support code splitting, but if you were creating your own Webpack configuration, you would need to use"," ",o.a.createElement("a",{href:"https://webpack.js.org/configuration/output/#output-chunkfilename"},o.a.createElement(l.e,null,"output.chunkFilename"))," ","to support code splitting."),o.a.createElement(l.b,null,'// this creates a "Test" bundle\nimport(/* webpackChunkName: "Test" */ "./components/Test.js")'),o.a.createElement("p",null,o.a.createElement(l.e,null,"import()")," returns a module object, so if you want to access a module's default export, you can use a ",o.a.createElement(l.e,null,"then")," ","function to get that value."),o.a.createElement(l.b,null,'import("some-module.js")\n  .then(module => module.default)')),o.a.createElement("p",null,"Currently ",o.a.createElement(l.e,null,"response")," returns an object whose ",o.a.createElement(l.e,null,"body")," ","property is a module imported at the top of the file. In order to add code splitting to routes, we can add a ",o.a.createElement(l.e,null,"resolve")," function that imports the module."),o.a.createElement("p",null,"The ",o.a.createElement(l.e,null,"@curi/helpers")," package provides a"," ",o.a.createElement(l.e,null,"preferDefault")," function. This function will return an imported module's default property if it exists, and returns the entire module if it doesn't have a default property."),o.a.createElement(l.b,null,'import { preferDefault } from "@curi/helpers";\n\nconst routes = prepareRoutes([\n  {\n    name: "Test",\n    path: "test",\n    resolve() {\n      return import(/* webpackChunkName: "Test" */ "./components/Test.js")\n        .then(preferDefault);\n    }\n  }\n]);'),o.a.createElement("p",null,"When a module fails to load, the error will be passed to the"," ",o.a.createElement(l.e,null,"response")," function through the ",o.a.createElement(l.e,null,"error")," property. We won't be incorporating this into the application here, but in a real application you probably want to have a fallback component to display an error message (especially if you have an offline mode with service workers)."),o.a.createElement(l.b,null,'import displayLoadError from "./components/LoadError";\n\nconst routes = prepareRoutes([\n  {\n    name: "One",\n    path: "one",\n    resolve() {\n      return import("./components/One.js")\n        .then(preferDefault)\n        .catch(err => displayLoadError(err);\n    },\n    response({ resolved }) {\n      return {\n        body: resolved\n      };\n    }\n  }\n]);'),o.a.createElement("p",null,"We can now update the ",o.a.createElement(l.e,null,"routes.js")," module to remove the imports at the top of the file and use ",o.a.createElement(l.e,null,"import()")," to import the route components. We will use ",o.a.createElement(l.e,null,"preferDefault")," to only resolve the component instead of the entire module object."),o.a.createElement("p",null,"The ",o.a.createElement(l.e,null,"response")," functions should also be updated to set the return object's ",o.a.createElement(l.e,null,"body")," property to ",o.a.createElement(l.e,null,"resolved.body")," ","instead of the import at the top of the file."),o.a.createElement(l.b,{"data-line":"3,9-15,20-26,31-37,42-48"},'// src/routes.js\nimport { prepareRoutes } from "@curi/router";\nimport { preferDefault } from "@curi/helpers";\n\nexport default prepareRoutes([\n  {\n    name: "Home",\n    path: "",\n    resolve() {\n      return import("./components/Home")\n        .then(preferDefault);\n    },\n    response({ resolved }) {\n      return { body: resolved };\n    }\n  },\n  {\n    name: "Book",\n    path: "book/:id",\n    resolve() {\n      return import("./components/Book")\n        .then(preferDefault);\n    },\n    response({ resolved }) {\n      return { body: resolved };\n    }\n  },\n  {\n    name: "Checkout",\n    path: "checkout",\n    resolve() {\n      return import("./components/Checkout")\n        .then(preferDefault);\n    },\n    response({ resolved }) {\n      return { body: resolved };\n    }\n  },\n  {\n    name: "Catch All",\n    path: "(.*)",\n    resolve() {\n      return import("./components/NotFound")\n        .then(preferDefault);\n    },\n    response({ resolved }) {\n      return { body: resolved };\n    }\n  }\n]);'),o.a.createElement("p",null,"For this tutorial, we will use ",o.a.createElement(l.e,null,"router.once()")," to delay the initial render while we wait for the initial response. We should update the ",o.a.createElement(l.e,null,"index.js")," module to do this."),o.a.createElement(l.b,{"data-line":"17-23"},"// src/index.js\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport { curi } from '@curi/router';\nimport { Browser } from '@hickory/browser';\nimport { curiProvider } from '@curi/react-dom';\n\nimport routes from './routes';\nimport './index.css';\nimport NavMenu from './components/NavMenu';\nimport registerServiceWorker from './registerServiceWorker';\n\nconst router = curi(Browser, routes);\nconst Router = curiProvider(router);\n\nrouter.once(() => {\n  ReactDOM.render((\n    <Router>\n      <App />\n    </Router>\n  ), document.getElementById('root'));\n});\nregisterServiceWorker();"),o.a.createElement("p",null,"With those changes, Webpack will now split the application into multiple bundles. The initial render will be delayed until after the code split bundle for the first route has been loaded.")),o.a.createElement(l.d,{meta:h},o.a.createElement("p",null,"Preloading data lets you delay navigation until after the data for a route has loaded. This can save you from having to render a partial page with spinners if the data takes a while to load."),o.a.createElement("p",null,"While the data is loading, the user will be able to continue interacting with the current page. This means that the user can also start a new navigation while the current navigation is running. When this happens, Curi knows to to cancel the previous navigation and perform the new navigation instead."),o.a.createElement("p",null,"We have two routes that need to load data: ",o.a.createElement(l.e,null,"Home")," and"," ",o.a.createElement(l.e,null,"Book"),". The ",o.a.createElement(l.e,null,"Home")," route will load the known books, while the ",o.a.createElement(l.e,null,"Book")," route will load data about a specific book."),o.a.createElement("p",null,"Currently the data for both of these routes is imported in their components. In a real site you would most likely make API calls to a REST or GraphQL endpoint, but here we will simulate this with a fake API."),o.a.createElement(l.d,{meta:p,tag:"h3"},o.a.createElement("p",null,"The fake API will simulate asynchronous calls to the server by returning Promises, similarly to the"," ",o.a.createElement("a",{href:"https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"},"Fetch API"),"."),o.a.createElement("p",null,"First, we will create an ",o.a.createElement(l.e,null,"api.js")," module that exports the fake API functions."),o.a.createElement(l.b,{lang:"bash"},"touch src/api.js"),o.a.createElement("p",null,"In the API module, we will import the ",o.a.createElement(l.e,null,"books.js")," data."),o.a.createElement("p",null,"We need to write two functions. The first returns a list of all books and the second returns the data for a specific book. For both, we can use ",o.a.createElement(l.e,null,"Promise.resolve()")," to return a Promise, even though we don't really have any asynchronous code being run."),o.a.createElement(l.b,null,'// src/api.js\nimport books from "./books";\n\nexport const BOOKS = () => Promise.resolve(books);\n\nexport const BOOK = id => Promise.resolve(\n  const intID = parseInt(id, 10);\n  books.find(b => b.id === intID)\n);')),o.a.createElement("p",null,"When the router is created, it can take a third argument, which is an options object. One of the properties of this object is"," ",o.a.createElement(l.e,null,"external"),", which is used to pass in external values that will be accessible in a route's ",o.a.createElement(l.e,null,"resolve")," and"," ",o.a.createElement(l.e,null,"response")," functions. This is particularly useful for data that is initialized at runtime, like an Apollo store, but we will also use it here."),o.a.createElement(l.b,{"data-line":"11,15-19"},"// src/index.js\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport { curi } from '@curi/router';\nimport { Browser } from '@hickory/browser';\nimport { curiProvider } from '@curi/react-dom';\n\nimport routes from './routes';\nimport './index.css';\nimport NavMenu from './components/NavMenu';\nimport * as bookAPI from \"./api\";\nimport registerServiceWorker from './registerServiceWorker';\n\nconst router = curi(Browser, routes, {\n  external: {\n    bookAPI\n  }\n});\nconst Router = curiProvider(router);\n\nrouter.once(() => {\n  ReactDOM.render((\n    <Router>\n      <App />\n    </Router>\n  ), document.getElementById('root'));\n});\nregisterServiceWorker();"),o.a.createElement("p",null,"What do we want to do with the data loaded from the API calls? Along with the ",o.a.createElement(l.e,null,"body")," property, another valid return property for"," ",o.a.createElement(l.e,null,"response")," functions is ",o.a.createElement(l.e,null,"data"),". This is a convenient way to attach any data to a response, which we can read from while rendering."),o.a.createElement("p",null,"The ",o.a.createElement(l.e,null,"Home")," route already has an asynchronous action: importing the ",o.a.createElement(l.e,null,"body")," component. We will name the async call to load the books data ",o.a.createElement(l.e,null,'"books"'),"."),o.a.createElement("p",null,"The ",o.a.createElement(l.e,null,"Book")," route's ",o.a.createElement(l.e,null,"response")," also needs to be updated to attach the books data (",o.a.createElement(l.e,null,"resolved.books"),") to the response."),o.a.createElement("p",null,"The ",o.a.createElement(l.e,null,"book()")," API call expects to be given the ",o.a.createElement(l.e,null,"id")," ","number of the book it should return data for. We can grab the correct param (",o.a.createElement(l.e,null,"id"),") from the ",o.a.createElement(l.e,null,"params")," property. However, when params are parsed, they are stored as strings. To convert it to a number, we can use the route's ",o.a.createElement(l.e,null,"params")," property to tell Curi how to parse the ",o.a.createElement(l.e,null,"id"),". By giving it a function that calls"," ",o.a.createElement(l.e,null,"parseInt()")," on the provided value, ",o.a.createElement(l.e,null,"params.id")," will be a number instead of a string."),o.a.createElement(l.b,{"data-line":"12,15-18,27,30-33"},'// src/routes.js\nimport { prepareRoutes } from "@curi/router";\nimport { preferDefault } from "@curi/helpers";\n\nexport default prepareRoutes([\n  {\n    name: "Home",\n    path: "",\n    resolve(_, external) {\n      const body = import("./components/Home")\n        .then(preferDefault);\n      const books = external.bookAPI.BOOKS();\n      return Promise.all([body, books]);\n    },\n    response({ resolved }) {\n      const [body, books] = resolved;\n      return {\n        body,\n        data: { books }\n      };\n    }\n  },\n  {\n    name: "Book",\n    path: "book/:id",\n    resolve({ params }, external) {\n      const body = import("./components/Book")\n        .then(preferDefault);\n      const book = external.bookAPI.BOOK(params.id);\n      return Promise.all([body, books]);\n    },\n    response({ resolved }) {\n      const [body, book] = resolved;\n      return {\n        body,\n        data: { book }\n      };\n    }\n  },\n  {\n    name: "Checkout",\n    path: "checkout",\n    resolve() {\n      return import("./components/Checkout")\n        .then(preferDefault);\n    },\n    response({ resolved }) {\n      return { body: resolved };\n    }\n  },\n  {\n    name: "Catch All",\n    path: "(.*)",\n    resolve() {\n      return import("./components/NotFound")\n        .then(preferDefault);\n    },\n    response({ resolved }) {\n      return { body: resolved };\n    }\n  }\n]);'),o.a.createElement("p",null,"With the data attached to our responses, we can remove the data imports from the components and just read from the response."),o.a.createElement("p",null,"In the ",o.a.createElement(l.e,null,"Home")," component's module, we can remove the"," ",o.a.createElement(l.e,null,"books.js")," import and grab the response from the component's props. The books data can be access as ",o.a.createElement(l.e,null,"response.data.books"),"."),o.a.createElement(l.b,{lang:"jsx","data-line":"5,9"},"// src/components/Home.js\nimport React from 'react';\nimport { Link } from '@curi/react-dom';\n\nexport default function Home({ response }) {\n  return (\n    <div>\n      <ul>\n        {response.data.books.map(book => (\n          <li key={book.id}>\n            <Link name=\"Book\" params={{ id: book.id }} >\n              {book.title} by {book.author}\n            </Link>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"),o.a.createElement("p",null,"Likewise, we can remove the ",o.a.createElement(l.e,null,"books.js")," import from the"," ",o.a.createElement(l.e,null,"Book")," component's module and grab the book data from"," ",o.a.createElement(l.e,null,"response.data")," instead of searching for it in the books array."),o.a.createElement(l.b,{lang:"jsx","data-line":"7"},"// src/components/Book.js\nimport React from 'react';\n\nimport cart from '../cart';\n\nexport default function Book({ response, router }) {\n  const { book } = response.data;\n  if (!book) {\n    return <div>The requested book could not be found</div>;\n  }\n  return (\n    <div>\n      <h1>{book.title}</h1>\n      <h2>by {book.author}</h2>\n      <p>Published in {book.published}</p>\n      <p>{book.pages} pages</p>\n      <button\n        type=\"button\"\n        onClick={() => {\n          cart.add(book, 1);\n          router.navigate({ to: \"Checkout\" });\n        }}\n      >\n        Add to Cart\n      </button>\n    </div>\n  );\n};")),o.a.createElement(l.d,{meta:b},o.a.createElement("p",null,"At this point, we have the same functionality as the basic tutorial, but we have added async data loading. The bundle importing has real loading times, but the fake API calls resolve immediately, which doesn't necessarily reflect real world performance."),o.a.createElement("p",null,"We can update the fake API to delay resolving so that we can take a look at some of the ",o.a.createElement(l.e,null,"@curi/react-dom")," components that are navigation-aware. The implementation here isn't important, so you can just copy+paste the code. The only thing to know is that the"," ",o.a.createElement(l.e,null,"BOOKS()")," function has a one second delay and the"," ",o.a.createElement(l.e,null,"BOOK()")," function has a 2.5 second delay the first time a book is requested (and responds instantly on subsequent calls)."),o.a.createElement(l.b,null,'// src/api.js\nimport books from "./books";\n\nexport const BOOKS = () => new Promise(resolve => {\n  // artificial delay\n  setTimeout(() => {\n    resolve(books);\n  }, 1000);\n});\n\nconst BOOK_CACHE = {};\nexport const BOOK = id => new Promise(resolve => {\n  if (BOOK_CACHE[id]) {\n    resolve(BOOK_CACHE[id]);\n    return;\n  }\n  const intID = parseInt(id, 10);\n  // artificial delay on first call\n  setTimeout(() => {\n    const book = books.find(b => b.id === id);\n    BOOK_CACHE[id] = book;\n    resolve(book);\n  }, 2500);\n});'),o.a.createElement(l.d,{meta:f,tag:"h3"},o.a.createElement("p",null,"The ",o.a.createElement(l.e,null,"Link")," component can be called with a render-invoked"," ",o.a.createElement(l.e,null,"children()")," function. If you do this, the function will be called with a ",o.a.createElement(l.e,null,"navigating")," boolean that indicates whether the router is currently navigating to that link. This is useful for when you know that there is a long (multiple seconds) delay between when the user clicks the link and when the navigation will occur."),o.a.createElement("p",null,"We can update the ",o.a.createElement(l.e,null,"Link"),"s in the ",o.a.createElement(l.e,null,"Home")," component to using render-invoked functions and display a loading spinner while we wait for the book data to load."),o.a.createElement(l.b,{lang:"jsx"},'import { Link } from "@curi/react-dom";\n\n<Link name="Book" params={{ id: 1 }}>\n  {navigating => (\n    <React.Fragment>\n      Book 1\n      {navigating ? <Spinner /> : null}\n    </React.Fragment>\n  )}\n</Link>'),o.a.createElement("p",null,o.a.createElement("a",{href:"https://github.com/KyleAMathews/react-spinkit"},o.a.createElement(l.e,null,"react-spinkit"))," ","provides some pretty loading spinners, so we will use that."),o.a.createElement(l.b,{lang:"bash"},"npm install react-spinkit"),o.a.createElement("p",null,"In the ",o.a.createElement(l.e,null,"Home")," component's module, we need to import the"," ",o.a.createElement(l.e,null,"Spinner")," component. The ",o.a.createElement(l.e,null,"Link")," needs to be swapped from a React element to a render-invoked function. We wrap the contents in a ",o.a.createElement(l.e,null,"React.Fragment")," to avoid unnecessary DOM elements. In the function, we render a ",o.a.createElement(l.e,null,"Spinner")," when the"," ",o.a.createElement(l.e,null,"Link")," is navigating and ",o.a.createElement(l.e,null,"null")," when it is not."),o.a.createElement(l.f,null,o.a.createElement("p",null,o.a.createElement(l.e,null,"react-spinkit")," is highly customizable, but we are sticking with the defaults here. ",o.a.createElement(l.e,null,"react-spinkit")," has a default one second render delay, which is why the spinner does not display immediately.")),o.a.createElement(l.b,{lang:"jsx","data-line":"4,13-18"},"// src/components/Home.js\nimport React from 'react';\nimport { Link } from '@curi/react-dom';\nimport Spinner from \"react-spinkit\";\n\nexport default function Home({ response }) {\n  return (\n    <div>\n      <ul>\n        {response.data.books.map(book => (\n          <li key={book.id}>\n            <Link name=\"Book\" params={{ id: book.id }} >\n              {navigating => (\n                <React.Fragment>\n                  {book.title} by {book.author}\n                  {navigating ? <Spinner /> : null}\n                </React.Fragment>\n              )}\n            </Link>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"))),o.a.createElement(l.d,{meta:E},o.a.createElement("p",null,"Adding asynchronous loading to an application can help reduce initial load size and speed up user interactions, however it also has some issues that you will need to consider."),o.a.createElement("p",null,"The biggest consideration is that there is nothing the frontend can do to get the data for the initial render faster. Your application's frontend can only fetch data as it discovers it needs it. If you are performing server-side rendering, you may want to load the initial data on the server and inject it into the page's HTML output. The implementation details for this vary greatly and are more related to how you store data (e.g."," ",o.a.createElement("a",{href:"https://redux.js.org/recipes/server-rendering#the-server-side"},"with redux"),")."),o.a.createElement("p",null,'Another consideration is whether or not you want to "hoist" data requirements. Curi\'s async functionality relies on you knowing all of the data requirements for a route, but you might prefer to keep the data associated with individual components. React Suspense will help with this (and Curi will support it once it releases), but this is still a ways out. At the very least, I would recommend using Curi for code splitting routes. Whether your should hoist other data requirements is something that should be determined on a case-by-case basis.')))}}}]);