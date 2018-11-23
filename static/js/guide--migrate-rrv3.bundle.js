(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{72:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return h});var a=n(0),r=n.n(a),o=n(1),l=n(8),s=n(16),u=n(105),c=n(5),i={title:"React Router v2/3"};function h(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,i.title),r.a.createElement(c.b,null,r.a.createElement("p",null,"Curi is mostly conceptually similar to React Router versions 2 and 3."),r.a.createElement("ol",null,r.a.createElement("li",null,"Both use a centralized router."),r.a.createElement("li",null,"Both routers are made up of route objects (although with React Router some of these are disguised as JSX with ",r.a.createElement(l.a,null,"Route")," ","components)."),r.a.createElement("li",null,"With both Reaft Router and Curi, routes can be nested. This can be used to specify child routes that build off of the paths from their parent routes.")),r.a.createElement("p",null,"Migration from React Router v2/3 to Curi should not require a complete reworking of your application, but there are some key differences."),r.a.createElement("ol",null,r.a.createElement("li",null,"Curi's routing is handled entirely outside of React; there are no"," ",r.a.createElement(l.a,null,"Route")," components."),r.a.createElement("li",null,"With Curi, when a nested route matches, only that route renders. Any ancestor routes that also (partially) match are not rendered. This is different from React Router, where ancestors of the best matched route also render."))),r.a.createElement(u.a,{title:"Routes",id:"routes"},r.a.createElement("p",null,"Let’s get started with setting up our routes."),r.a.createElement(u.a,{title:"With React Router",id:"routes-with-react-router",tag:"h3"},r.a.createElement(c.b,null,r.a.createElement("p",null,"In React Router v2/3, there are two ways to define routes. You can either use JavaScript objects or JSX ",r.a.createElement(l.a,null,"Route"),"s (which React Router converts to JavaScript objects)."),r.a.createElement("p",null,"Both styles described above define the same route structure for three routes: ",r.a.createElement(l.b,null,"/"),", ",r.a.createElement(l.b,null,"/inbox"),", and"," ",r.a.createElement(l.b,null,"/inbox/:message"),". Each one of these has a component that will be rendered when it matches. The ",r.a.createElement(l.b,null,"/inbox/:message")," ","route has some methods defined to describe its behavior when the route enters, updates, and leaves.")),r.a.createElement(c.a,{lang:"jsx"},"// JavaScript objects\n{\n  path: '/',\n  component: App,\n  indexRoute: Home,\n  childRoutes: [\n    {\n      path: 'inbox',\n      component: Inbox,\n      childRoutes: [\n        {\n          path: ':message',\n          component: Message,\n          onEnter: (next) => {...},\n          onChange: (prev, next) => {...},\n          onLeave: (prev) => {...}\n        }\n      ]\n    }\n  ]\n// JSX\n<Route path='/' component={App}>\n  <IndexRoute component={Home} />\n  <Route path='inbox' component={Inbox}>\n    <Route\n      path=':message'\n      component={Message}\n      onEnter={next => {...}}\n      onChange={(prev, next) => {...}}\n      onLeave={prev => {...}}\n    />\n  </Route>\n</Route>")),r.a.createElement(u.a,{title:"With Curi",id:"routes-with-curi",tag:"h3"},r.a.createElement(c.b,null,r.a.createElement("p",null,"Routes in Curi are always JavaScript objects. Like React Router, each route object has a path property that describes the path segments that the route matches. React Router v2/3 uses a custom path matcher, but Curi uses ",r.a.createElement(l.b,null,"path-to-regexp"),". You can read learn how to format paths from the"," ",r.a.createElement("a",{href:"https://github.com/pillarjs/path-to-regexp"},r.a.createElement(l.b,null,"path-to-regexp")," repo"),"."),r.a.createElement("p",null,"First, we will define the names and paths for our routes."),r.a.createElement("p",null,"Each route must also have a unique name. A route's name will be used for interacting with it. For example, to navigate to a route, you only have to know its name, not its URL."),r.a.createElement("p",null,"The biggest difference between the Curi paths and the React Router paths is that with Curi, you never include a forward slash at the beginning of the path. This means that while the root path for React Router is ",r.a.createElement(l.b,null,"'/'"),", the root path for Curi is"," ",r.a.createElement(l.b,null,"''"),".")),r.a.createElement(c.a,null,"const routes = prepareRoutes([\n  {\n    name: 'Home',\n    path: ''\n  },\n  {\n    name: 'Inbox',\n    path: 'inbox',\n    children: [\n      {\n        name: 'Message',\n        path: ':message'\n      }\n    ]\n  }\n]);"),r.a.createElement(c.b,null,r.a.createElement("p",null,"Next, we should add our components to each route. We will ignore the ",r.a.createElement(l.a,null,"App")," component that is used in the React Router routes. That is not route specific and will be rendered by our application (assuming we actually need it)."),r.a.createElement("p",null,'With Curi, the router creates a "response" object when it matches locations. Some of the properties of the response are automatically set based on the location and the matching route. Others can be set by a route. This is done using the'," ",r.a.createElement(l.b,null,"response()")," property, which is a function that returns an object whose properties will be added to the response. For this React application, we want a response's ",r.a.createElement(l.b,null,"body")," property to be the React component associated with each route."),r.a.createElement(s.a,null,"Only known properties will be merged onto the response.")),r.a.createElement(c.a,null,"import { prepareRoutes } from \"@curi/router\";\n            \nimport Home from './pages/Home';\nimport Inbox from './pages/Inbox';\nimport Mesage from './pages/Message';\n\nconst routes = prepareRoutes([\n  {\n    name: 'Home',\n    path: '',\n    response: () => {\n      return {\n        body: Home\n      };\n    }\n  },\n  {\n    name: 'Inbox',\n    path: 'inbox',\n    response: () => {\n      return {\n        body: Inbox\n      };\n    },\n    children: [\n      {\n        name: 'Message',\n        path: ':message',\n        response: () => {\n          return {\n            body: Message\n          };\n        }\n      }\n    ]\n  }\n]);"),r.a.createElement(c.b,null,r.a.createElement("p",null,"We are close to replicating our React Router routes, but we still need to implement the ",r.a.createElement(l.b,null,"on___")," methods for our ",r.a.createElement(l.b,null,":message")," ","route. With Curi, routes can have functions that are called when they match the new location. These are grouped under the route's"," ",r.a.createElement(l.b,null,"resolve")," object. The ",r.a.createElement(l.b,null,"resolve")," functions are called every time that a route matches a location."),r.a.createElement("p",null,"With React Router, ",r.a.createElement(l.b,null,"onEnter")," is called when the route first matches, while ",r.a.createElement(l.b,null,"onChange")," is called when the same route matches a new location (e.g. with new path parameters)."," ",r.a.createElement(l.b,null,"onEnter")," and ",r.a.createElement(l.b,null,"onChange")," are nearly the same; the big difference between the two is that ",r.a.createElement(l.b,null,"onChange")," ","will receive the previous props, which could be used to determine which props changed. The functionality for both ",r.a.createElement(l.b,null,"onEnter")," ","and ",r.a.createElement(l.b,null,"onChange")," can be covered using a ",r.a.createElement(l.b,null,"resolve")," ","function."),r.a.createElement("p",null,"There currently is no equivalent to ",r.a.createElement(l.b,null,"onLeave")," with Curi. This is mostly because I haven’t seen a compelling need for it. It certainly could be implemented, but so far I have not found a reason to use that. If you have something you need this functionality for, please open up an issue in the GitHub repo."),r.a.createElement("p",null,"The"," ",r.a.createElement(o.b,{name:"Package",params:{package:"router"},hash:"route-properties"},r.a.createElement(l.b,null,"@curi/router")," route API documentation")," ","covers all of the route properties.")),r.a.createElement(c.a,null,"const routes = prepareRoutes([\n  {\n    name: 'Home',\n    path: '',\n    response: () => {\n      return {\n        body: Home\n      };\n    }\n  },\n  {\n    name: 'Inbox',\n    path: 'inbox',\n    response: () => {\n      return {\n        body: Inbox\n      };\n    },\n    children: [\n      {\n        name: 'Message',\n        path: ':message',\n        response: () => {\n          return {\n            body: Message\n          };\n        },\n        resolve: {\n          data: (route) => { return ... },\n        }\n      }\n    ]\n  }\n]);")),r.a.createElement("p",null,"Once your routes have been defined, you can move on to creating your Curi router.")),r.a.createElement(u.a,{title:"Creating the router",id:"creating-the-router"},r.a.createElement(c.b,null,r.a.createElement("p",null,"With React Router, you create your router by rendering a"," ",r.a.createElement(l.a,null,"Router"),". That either takes the ",r.a.createElement(l.a,null,"Route")," components as props or the route objects through its ",r.a.createElement(l.b,null,"routes")," prop. The ",r.a.createElement(l.a,null,"Router")," also takes a ",r.a.createElement(l.b,null,"history")," prop, which is either one of the pre-routerured objects (",r.a.createElement(l.b,null,"browserHistory")," ","or ",r.a.createElement(l.b,null,"hashHistory"),") or one that you create yourself.")),r.a.createElement(c.a,{lang:"jsx"},"import { Router, browserHistory } from 'react-router';\nconst routes = prepareRoutes([...]);\nReactDOM.render((\n  <Router history={browserHistory} routes={routes} />\n), holder);"),r.a.createElement(c.b,null,r.a.createElement("p",null,"With Curi, the router is created prior to rendering. It takes a Hickory history object, your routes array, and possibly an options object. ",r.a.createElement("a",{href:"https://github.com/pshrmn/hickory"},"Hickory")," is similar to the ",r.a.createElement(l.b,null,"history")," package used by React Router, but has a slight modified API (easier navigation blocking and navigation that imitates how anchors work) and more convenient location objects (you can use a ",r.a.createElement(l.b,null,"query")," object instead of having to manually create a ",r.a.createElement(l.b,null,"search")," string).")),r.a.createElement(c.a,null,"import { curi, prepareRoutes } from '@curi/router';\nimport Browser from '@hickory/browser';\nconst history = Browser();\nconst routes = prepareRoutes([...]);\nconst router = curi(history, routes);")),r.a.createElement(u.a,{title:"Rendering",id:"rendering"},r.a.createElement(c.b,null,r.a.createElement("p",null,"We will walk through the rendering differences between React Router and Curi by looking at what happens in each when we navigate to the URI ",r.a.createElement(l.b,null,"/inbox/test-message-please-ignore"),".")),r.a.createElement(u.a,{title:"React Router v2/3",id:"rendering-react-router",tag:"h3"},r.a.createElement(c.b,null,r.a.createElement("p",null,"React Router uses the ",r.a.createElement(l.a,null,"Router")," component to subscribe to location changes. Each time that the location changes, it walks over its routes and determines which route(s!) match."),r.a.createElement("p",null,"React Router starts by rendering the root component. In the above router, that is the ",r.a.createElement(l.a,null,"App"),". Next, our ",r.a.createElement(l.b,null,"inbox")," ","route also matches, so React Router also renders our"," ",r.a.createElement(l.a,null,"Inbox")," component. Finally, the URI"," ",r.a.createElement(l.b,null,"/inbox/test-message-please-ignore")," also matches our ",r.a.createElement(l.b,null,":message")," ","route (which is concatenated with its parents to form the path"," ",r.a.createElement(l.b,null,"/inbox/:message"),"), so ",r.a.createElement(l.a,null,"Message")," is rendered as well. Each child component is rendered by its parent, so we end up with a component tree that looks something like this:"),r.a.createElement("p",null,"With this structure, any routes with children will be rendered when one of the children matches. That means that those routes need to know how to render based on what type of match they have. For example, ",r.a.createElement(l.a,null,"Inbox")," needs to know how to render for an exact match (the URI is ",r.a.createElement(l.b,null,"/inbox"),") and for a partial match (",r.a.createElement(l.b,null,"/inbox/test-message-please-ignore"),"). Also, if the"," ",r.a.createElement(l.a,null,"Inbox")," needs to pass any props to ",r.a.createElement(l.a,null,"Message"),", it has to use ",r.a.createElement(l.b,null,"React.cloneElement"),", which works but is not the cleanest looking code.")),r.a.createElement(c.a,{lang:"jsx"},"<App>\n  <Inbox>\n    <Message>\n  </Inbox>\n</App>")),r.a.createElement(u.a,{title:"Curi",id:"rendering-with-curi",tag:"h3"},r.a.createElement(c.b,null,r.a.createElement("p",null,"With Curi, we also need to re-render our application every time that the location changes. We will do this by creating a root Curi component by calling the ",r.a.createElement(l.b,null,"curiProvider()")," function, which comes from the ",r.a.createElement(l.b,null,"@curi/react-dom")," package, and passing it our Curi router. While the name of this component is entirely up to you, we will refer to it as the ",r.a.createElement(l.a,null,"Router")," here."),r.a.createElement("p",null,"The ",r.a.createElement(l.a,null,"Router")," will setup an observer on the provided router so that it can re-render your application whenever there is a new ",r.a.createElement(l.b,null,"response"),". The ",r.a.createElement(l.a,null,"Router")," expects a function as its ",r.a.createElement(l.b,null,"children")," prop (a render-invoked function). This function renders the application using the"," ",r.a.createElement(l.b,null,"response"),"."),r.a.createElement("p",null,"When the ",r.a.createElement(l.a,null,"Router"),"'s ",r.a.createElement(l.b,null,"children()")," function is called, it will receive an object with three properties:"),r.a.createElement("ol",null,r.a.createElement("li",null,r.a.createElement(l.b,null,"response")," is the new response object"),r.a.createElement("li",null,r.a.createElement(l.b,null,"navigation")," is an object with additional information about the navigation"),r.a.createElement("li",null,r.a.createElement(l.b,null,"router")," is your Curi router (mostly useful if the function is defined in a separate file)")),r.a.createElement("p",null,"Above, we added ",r.a.createElement(l.b,null,"response()")," functions to each route. The functions set React components as the ",r.a.createElement(l.b,null,"body")," property of responses. We can now use ",r.a.createElement(l.b,null,"response.body")," to render those components."),r.a.createElement("p",null,"In the React Router section, we had three components that were rendered: ",r.a.createElement(l.a,null,"App"),",",r.a.createElement(l.a,null,"Inbox"),", and ",r.a.createElement(l.a,null,"Message"),". With Curi, only the most accurately matched route actually matches. That means that for the URL ",r.a.createElement(l.b,null,"/inbox/test-message-please-ignore"),", the"," ",r.a.createElement(l.b,null,'"Message"')," route will match, but its parent route,"," ",r.a.createElement(l.b,null,'"Inbox"')," will not, so ",r.a.createElement(l.b,null,"response.body")," will be the ",r.a.createElement(l.a,null,"Message")," component. Unlike React Router, we don’t render ",r.a.createElement(l.a,null,"Inbox")," because we did not match the"," ",r.a.createElement(l.b,null,"inbox")," route.")),r.a.createElement(c.a,{lang:"jsx"},'import { curiProvider } from "@curi/react-dom";\n\nconst router = curi(history, routes);            \nconst Router = curiProvider(router);\n\nReactDOM.render((\n  <Router>\n    {({ response }) => {\n      const { body:Body } = response;\n      return <Body />;\n    }}\n  </Router>\n), holder);\n\n/*\n  <Router>\n    <Message />\n  </Router>\n*/'),r.a.createElement(c.b,null,r.a.createElement(s.a,null,"Wildcard routes (",r.a.createElement(l.b,null,"{ path: '(.*)' }"),") can be used to easily display a not found page for any location not matched by other routes.")),r.a.createElement(c.a,null,'const routes = prepareRoutes([\n  // ...,\n  {\n    name: "Not Found",\n    path: "(.*)",\n    response() {\n      return { body: NotFound };\n    }\n  }\n]);'),r.a.createElement(c.b,null,r.a.createElement("p",null,"It was mentioned above that there is no need for the"," ",r.a.createElement(l.a,null,"App")," component with Curi. If you want to have an"," ",r.a.createElement(l.a,null,"App")," component, you can render it either inside of the"," ",r.a.createElement(l.b,null,"children()")," function or as a parent of your"," ",r.a.createElement(l.a,null,"Router"),". This can be useful for rendering content that is unrelated to specific routes, like a page header or menu."),r.a.createElement("p",null,"Rendering the ",r.a.createElement(l.a,null,"App")," inside of the ",r.a.createElement(l.b,null,"children()")," ","function is necessary if any of the components rendered by the"," ",r.a.createElement(l.a,null,"App")," are location aware components, since they need to access the Curi router (through React’s context, which the"," ",r.a.createElement(l.a,null,"Router")," provides)")),r.a.createElement(c.a,{lang:"jsx"},"function render({ response }) {\n  const { body:Body } = response;\n  return (\n    <App>\n      <Body />\n    </App>\n  );\n}\n// or\nfunction render({ response }) {\n  const { body:Body } = response;\n  return (\n    <div>\n      <Header />\n      <Body />\n      <Footer />\n    </div>\n  );\n}"),r.a.createElement(c.b,null,r.a.createElement("p",null,"What about props that you want to send to your route components? Pass them to the ",r.a.createElement(l.a,null,"Body")," component that you render. Props can be passed individually, but passing the whole"," ",r.a.createElement(l.b,null,"response")," object is recommended.")),r.a.createElement(c.a,{lang:"jsx"},"function render({ response }) {\n  const { body:Body } = response;\n  return <Body response={response} />;\n}"))),r.a.createElement(u.a,{title:"Links",id:"links"},r.a.createElement(c.b,null,r.a.createElement("p",null,"You will want to be able to navigate between routes in your application. React Router provides a ",r.a.createElement(l.a,null,"Link")," component to do this, and so does Curi (through the ",r.a.createElement(l.b,null,"@curi/react-dom")," ","package). There are a few differences to note between these two components:")),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(c.b,null,r.a.createElement("p",null,"React Router expects you to generate the pathname yourself, while Curi expects you to pass the name of the route that you want to navigate to. Any path parameters are passed to Curi’s"," ",r.a.createElement(l.a,null,"Link")," using the ",r.a.createElement(l.b,null,"params")," prop.")),r.a.createElement(c.a,{lang:"jsx"},"// React Router\n<Link to='/'>Home</Link>\n<Link to={`/inbox/${message}`}>Hello</Link>\n\n// Curi\n<Link name='Home'>Home</Link>\n<Link name='Message' params={{ message }}>Hello</Link>")),r.a.createElement("li",null,r.a.createElement(c.b,null,r.a.createElement("p",null,"With React Router, any additional location properties are passed to the ",r.a.createElement(l.a,null,"Link")," using the ",r.a.createElement(l.b,null,"to")," object. With Curi, these properties are passed using the prop name (",r.a.createElement(l.b,null,"hash"),", ",r.a.createElement(l.b,null,"query")," &",r.a.createElement(l.b,null,"state"),").")),r.a.createElement(c.a,{lang:"jsx"},"// React Router\n<Link to={{ pathname: '/inbox', hash: '#test' }}>\n  Inbox\n</Link>\n\n// Curi\n<Link name='Inbox' hash='test'>Inbox</Link>")),r.a.createElement("li",null,r.a.createElement(c.b,null,r.a.createElement("p",null,"Active detection with Curi uses an ",r.a.createElement(l.a,null,"Active")," component."," ",r.a.createElement(l.a,null,"Active"),"'s ",r.a.createElement(l.b,null,"children")," prop is a render-invoked function that receives a boolean ",r.a.createElement(l.b,null,"true")," when the named route is active and ",r.a.createElement(l.b,null,"false")," when it is not. You can also pass ",r.a.createElement(l.b,null,"partial={true}")," to let partial matches (ancestor routes) be considered active (the opposite of React Router's ",r.a.createElement(l.b,null,"onlyActiveOnIndex"),").")),r.a.createElement(c.a,{lang:"jsx"},"// React Router\n<Link\n  to='/'\n  onlyActiveOnIndex\n  activeClassName='active'\n>\n  Home\n</Link>\n\n// Curi\n// You need to add @curi/route-active\n// to your router object\nimport active from '@curi/route-active';\nconst router = curi(history, routes, {\n  route: [active()]\n});\n\n// The <Active> component determines if a route is active\n// and passes true/false to the render-invoked children\n// function\n<Active name=\"Home\">\n  {active => (\n    <Link\n      name='Home'\n      forward={{\n        className: active ? \"active\" : \"\"\n      }}\n    >Home</Link>\n  )}\n</Active>")))),r.a.createElement(u.a,{title:"Accessing router props from nested components",id:"router-props"},r.a.createElement(c.b,null,r.a.createElement("p",null,"React Router provides a ",r.a.createElement(l.b,null,"withRouter")," higher-order component that will inject router props into the wrapped component."),r.a.createElement("p",null,"Curi provides similar functionality with the ",r.a.createElement(l.b,null,"Curious")," ","component."),r.a.createElement("p",null,r.a.createElement(l.b,null,"Curious")," has a render-invoked ",r.a.createElement(l.b,null,"children")," ","function, which you can use to inject the Curi ",r.a.createElement(l.b,null,"router"),", the current ",r.a.createElement(l.b,null,"response"),", and the current"," ",r.a.createElement(l.b,null,"navigation")," object into components.")),r.a.createElement(c.a,null,"// React Router\nexport default withRouter(SomeComponent);\n\n// Curi\nexport default () => (\n  <Curious>\n    {({ response }) => (\n      <SomeComponent response={response} />\n    )}\n  </Curious>\n);")),r.a.createElement("p",null,"At this point, hopefully you are comfortable with migrating from React Router v2/3 to Curi. If there are any concepts not covered here that you think should be, please feel free to open up an issue"," ",r.a.createElement("a",{href:"https://github.com/pshrmn/curi/issues"},"on GitHub"),"."))}}}]);