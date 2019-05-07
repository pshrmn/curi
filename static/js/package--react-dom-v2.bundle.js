(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{76:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(3),o=n(21),s={title:"Arguments",hash:"createRouterComponent-arguments"},i={title:"Return Value",hash:"createRouterComponent-return"},c={title:"createRouterComponent",hash:"createRouterComponent",children:[s,i]};function u(){return r.a.createElement(o.e,{meta:c},r.a.createElement("p",null,"A higher-order component that returns a ",r.a.createElement(o.f,null,"Router")," component."),r.a.createElement(o.d,{lang:"jsx"},"import { createRouterComponent } from '@curi/react-dom';\n\nconst router = createRouter(browser, routes);\nconst Router = createRouterComponent(router);\n\nReactDOM.render((\n  <Router>\n    <App />\n  </Router>\n), node);"),r.a.createElement(o.g,null,r.a.createElement("p",null,"Why a higher-order component not regular component? Props signify values that can change, but an application should only ever have one router. Using a higher-order component hard-codes the provided"," ",r.a.createElement(o.f,null,"router")," as the one and only router.")),r.a.createElement(o.e,{tag:"h3",meta:s},r.a.createElement(o.e,{tag:"h4",meta:{title:"router",hash:"createRouterComponent-router"}},r.a.createElement("p",null,"A Curi"," ",r.a.createElement(l.a,{name:"Package",params:{package:"router",version:"v2"},hash:"curi"},"router"),"."))),r.a.createElement(o.e,{tag:"h3",meta:i},r.a.createElement("p",null,"A component that sets routing context data. Any component that relies on routing data must be a descendant of the ",r.a.createElement(o.f,null,"Router"),"."),r.a.createElement(o.e,{tag:"h4",meta:{title:"children",hash:"createRouterComponent-children"}},r.a.createElement("p",null,"The ",r.a.createElement(o.f,null,"Router")," takes any valid React node (elements, strings, etc.) as its ",r.a.createElement(o.f,null,"children"),"."))))}var m={title:"Props",hash:"Link-props"},h={title:"<Link>",hash:"Link",children:[m]};function p(){return r.a.createElement(o.e,{meta:h},r.a.createElement("p",null,"A ",r.a.createElement(o.f,null,"Link")," is use for in-app navigation. By default, the component renders an anchor element (",r.a.createElement(o.c,null,"a"),"). When the rendered element is clicked, instead of reloading the page it will use the router to navigate."),r.a.createElement("p",null,"With the ",r.a.createElement(o.f,null,"Link"),", instead of providing a URI to navigate to, you specify the name of the route that you want to link to. The pathname of the URI you want the component to link to will be automatically generated for you."),r.a.createElement(o.d,{lang:"jsx"},"import { Link } from '@curi/react-dom';\n\n<Link name='User' params={{ id: 16 }}>User 16</Link>\n// <a href='/user/16'>User 16</a>"),r.a.createElement(o.e,{tag:"h3",meta:m},r.a.createElement(o.e,{tag:"h4",meta:{title:"name",hash:"Link-name"}},r.a.createElement("p",null,"The name of the route that the ",r.a.createElement(o.f,null,"Link")," should navigate to when it is clicked."),r.a.createElement("p",null,"To navigate within the same location, the ",r.a.createElement(o.f,null,"name")," can be skipped. This is useful for linking to hashes within the current page."),r.a.createElement(o.d,{lang:"jsx"},'// Home route is { name: "Home", path: "" }\n<Link name="Home">Home</Link>')),r.a.createElement(o.e,{tag:"h4",meta:{title:"params",hash:"Link-params"}},r.a.createElement("p",null,"If the named route (or any of its parents) include path parameters, they must be provided using the ",r.a.createElement(o.f,null,"params")," prop."),r.a.createElement(o.d,{lang:"jsx"},"// User route is { name: 'User', path: '/user/:id' }\n<Link name='User' params={{ id: 16 }}>User 16</Link>")),r.a.createElement(o.e,{tag:"h4",meta:{title:"hash, query & state",hash:"Link-hash-query-state"}},r.a.createElement("p",null,"The ",r.a.createElement(o.f,null,"query"),", ",r.a.createElement(o.f,null,"hash"),", and ",r.a.createElement(o.f,null,"state")," values for the location to navigate to."),r.a.createElement(o.d,{lang:"jsx"},'<Link\n  name=\'Products\'\n  params={{ type: \'vacuums\' }}\n  hash="iroomba"\n  query="volume=loud"\n  state={{ owner: "Tom Haverford" }}\n>\n  DJ Roomba\n</Link>\n\n// <a href="products/vacuums?volume=loud#iroomba">\n//  DJ Roomba\n// </a>')),r.a.createElement(o.e,{tag:"h4",meta:{title:"children",hash:"Link-children"}},r.a.createElement("p",null,"A valid React Node (e.g. a React element, a string, or"," ",r.a.createElement(o.f,null,"null"),")."),r.a.createElement(o.d,{lang:"jsx"},'// a React node\n<Link name="Home">\n  Home\n</Link>')),r.a.createElement(o.e,{tag:"h4",meta:{title:"anchor",hash:"Link-anchor"}},r.a.createElement("p",null,"A ",r.a.createElement(o.f,null,"Link")," renders an anchor element by default, but this can be changed using the ",r.a.createElement(o.f,null,"anchor")," prop. This can be useful for using styled components."),r.a.createElement(o.j,null,r.a.createElement("p",null,"You can provide any component that you want, but you"," ",r.a.createElement("em",null,"should")," stick with an anchor (or a component that renders an anchor). There are accessibility issues that will occur when you use other DOM elements as links. The component's prop type is func in an attempt to discourage you from making your link render a button, div, span, etc."))),r.a.createElement(o.e,{tag:"h4",meta:{title:"rest",hash:"Link-rest"}},r.a.createElement("p",null,"Any additional props attached to the ",r.a.createElement(o.f,null,"Link")," will be attached to the element rendered by the ",r.a.createElement(o.f,null,"Link"),"."),r.a.createElement(o.d,{lang:"jsx"},'<Link\n  name="Home"\n  className="home"\n>\n  Home\n</Link>\n// <a href="/" class="home">Home</a>'))))}var d={title:"Props",hash:"AsyncLink-props"},f={title:"<AsyncLink>",hash:"AsyncLink",children:[d]};function E(){return r.a.createElement(o.e,{meta:f},r.a.createElement("p",null,"An ",r.a.createElement(o.f,null,"AsyncLink")," is similar to a"," ",r.a.createElement(l.a,{hash:"Link"},r.a.createElement(o.f,null,"Link")),", but uses a render-invoked function as its ",r.a.createElement(o.f,null,"children")," ","component."),r.a.createElement(o.d,{lang:"jsx"},"import { AsyncLink } from '@curi/react-dom';\n\n<AsyncLink name='User' params={{ id: 16 }}>\n  {navigating => {\n    return navigating\n      ? \"Navigating to User 16\"\n      : \"Go to User 16\"\n  }}\n</AsyncLink>\n\n<a href='/user/16'>Go to User 16</a>\n// click link\n<a href='/user/16'>Navigating to User 16</a>\n// navigating finishes\n<a href='/user/16'>Go to User 16</a>"),r.a.createElement(o.e,{tag:"h3",meta:d},r.a.createElement(o.e,{tag:"h4",meta:{title:"name",hash:"AsyncLink-name"}},r.a.createElement("p",null,"See ",r.a.createElement(l.a,{hash:"Link-name"},"Link name"))),r.a.createElement(o.e,{tag:"h4",meta:{title:"params",hash:"AsyncLink-params"}},r.a.createElement("p",null,"See ",r.a.createElement(l.a,{hash:"Link-params"},"Link params"))),r.a.createElement(o.e,{tag:"h4",meta:{title:"hash, query & state",hash:"AsyncLink-hash-query-state"}},r.a.createElement("p",null,"See"," ",r.a.createElement(l.a,{hash:"Link-hash-query-state"},"Link hash, query & state"))),r.a.createElement(o.e,{tag:"h4",meta:{title:"children",hash:"AsyncLink-children"}},r.a.createElement("p",null,"A render-invoked ",r.a.createElement(o.f,null,"children")," function that is called with the ",r.a.createElement(o.f,null,"AsyncLink"),"'s navigation state. The navigation state is"," ",r.a.createElement(o.f,null,"false")," to start, ",r.a.createElement(o.f,null,"true")," when the"," ",r.a.createElement(o.f,null,"AsyncLink")," is clicked, and ",r.a.createElement(o.f,null,"false")," when the the navigation finishes/is cancelled."),r.a.createElement(o.d,{lang:"jsx"},'<AsyncLink name="User" params={{ id: 1 }}>\n  {navigating => (\n    <React.Fragment>\n      User 1\n      {navigating ? <Spinner /> : null}\n    </React.Fragment>\n  )}\n</AsyncLink>')),r.a.createElement(o.e,{tag:"h4",meta:{title:"anchor",hash:"AsyncLink-anchor"}},r.a.createElement("p",null,"See ",r.a.createElement(l.a,{hash:"Link-anchor"},"Link anchor"))),r.a.createElement(o.e,{tag:"h4",meta:{title:"rest",hash:"AsyncLink-rest"}},r.a.createElement("p",null,"See ",r.a.createElement(l.a,{hash:"Link-rest"},"Link rest")))))}var g={title:"useResponse",hash:"useResponse"};function v(){return r.a.createElement(o.e,{meta:g},r.a.createElement("p",null,"The ",r.a.createElement(o.f,null,"useResponse")," hook reads the current ",r.a.createElement(o.f,null,"response")," ","and ",r.a.createElement(o.f,null,"navigation")," values from React's context. This will be called every time a new response is emitted."),r.a.createElement(o.d,{lang:"jsx"},"import { useResponse } from '@curi/react-dom';\n\nfunction App() {\n  const {\n    response,\n    navigation\n  } = useResponse();\n  return (\n    <ThingThatNeedsResponse\n      response={response}\n    />\n  );\n}"))}var k={title:"useRouter",hash:"useRouter"};function y(){return r.a.createElement(o.e,{meta:k},r.a.createElement("p",null,"The ",r.a.createElement(o.f,null,"useRouter")," hook returns the ",r.a.createElement(o.f,null,"router")," object."),r.a.createElement(o.d,{lang:"jsx"},"import { useRouter } from '@curi/react-dom';\n\nfunction App() {\n  const router = useRouter();\n  // ...\n}"))}var b={title:"Options",hash:"useActive-opts"},L={title:"useActive",hash:"useActive",children:[b]};function R(){return r.a.createElement(o.e,{meta:L},r.a.createElement("p",null,"The ",r.a.createElement(o.f,null,"useActive")," hook determines if a route is active by comparing a route name (and possibly params) to a ",r.a.createElement(o.f,null,"response")," ","object."),r.a.createElement(o.d,{lang:"jsx"},'import { useActive, Link } from \'@curi/react-dom\';\n\nfunction ActiveLink({\n  name,\n  params,\n  partial,\n  children\n}) {\n  const active = useActive({ name, params, partial });\n  return (\n    <Link\n      name={name}\n      params={params}\n      className={active ? "active" : ""}\n    >\n      {children}\n    </Link>\n  );\n}\n\n<ActiveLink name="Home">Home</ActiveLink>'),r.a.createElement(o.e,{tag:"h3",meta:b},r.a.createElement("p",null,r.a.createElement(o.f,null,"useActive")," takes a single argument, an options object."),r.a.createElement(o.e,{tag:"h4",meta:{title:"name",hash:"useActive-name"}},r.a.createElement("p",null,"The name of the route to compare against the response object.")),r.a.createElement(o.e,{tag:"h4",meta:{title:"params",hash:"useActive-params"}},r.a.createElement("p",null,"An object containing route parameters. These will be compared against the route params of the response object.")),r.a.createElement(o.e,{tag:"h4",meta:{title:"partial",hash:"useActive-partial"}},r.a.createElement("p",null,"Allows ancestor routes to be considered active when true. Defaults to false."),r.a.createElement(o.d,{lang:"jsx"},'// response = { name: "User Album", params: { id: "abcde" }}\n// where "User Album" is a child route of "User"\n\nuseActive({ name: "User" }); // false\nuseActive({ name: "User", partial: true }); // true'))),r.a.createElement(o.e,{tag:"h4",meta:{title:"components",hash:"useActive-components"}},r.a.createElement("p",null,"The base active check only checks that the route (i.e. pathname) is active. ",r.a.createElement(o.f,null,"components")," allows you to check if other components of the location are also active."),r.a.createElement(o.d,{lang:"jsx"},'useActive({\n  name: "Results",\n  components: loc => loc.query === "page=3"\n});\n\n// active for /results?page=3\n// not active for /results?page=1')))}var A={title:"Options",hash:"useNavigationFocus-opts"},w={title:"useNavigationFocus",hash:"useNavigationFocus",children:[A]};function T(){return r.a.createElement(o.e,{meta:w},r.a.createElement("p",null,"The ",r.a.createElement(o.f,null,"useNavigationFocus")," hook is used to focus a DOM element after a navigation."),r.a.createElement(o.g,null,r.a.createElement("p",null,'The DOM component that gets the ref should either already be "focusable", like an ',r.a.createElement(o.c,null,"input"),", or be given a"," ",r.a.createElement(o.f,null,"tabIndex")," prop (usually with the value of ",r.a.createElement(o.f,null,"-1"),"). If neither of these conditions is met, then the document's"," ",r.a.createElement(o.c,null,"body")," will be focused.")),r.a.createElement(o.d,{lang:"jsx"},'import { useNavigationFocus } from "@curi/react-dom";\n\nfunction App() {\n  const ref = React.createRef(null);\n  useNavigationFocus(ref);\n\n  return (\n    <div tabIndex={-1} ref={ref}>\n      {/* ... */}\n    </div>\n  );\n}'),r.a.createElement("p",null,"The focused element will have an outline (the exact style varies by browser). You can remove this with CSS by setting ",r.a.createElement(o.f,null,"outline")," to"," ",r.a.createElement(o.f,null,'"none"'),". This should only be done for non-focusable elements. Setting ",r.a.createElement(o.f,null,"outline")," to ",r.a.createElement(o.f,null,'"none"')," globally is bad for accessibility."),r.a.createElement(o.d,{lang:"jsx"},'<div\n  ref={ref}\n  tabIndex={-1}\n  style={{ outline: "none" }}\n>\n  {/* ... */}\n</div>'),r.a.createElement(o.e,{tag:"h3",meta:A},r.a.createElement(o.e,{tag:"h4",meta:{title:"preventScroll",hash:"useNavigationFocus-preventScroll"}},r.a.createElement("p",null,"The default behavior for focusing an element is to scroll to it. If you want to prevent this, set ",r.a.createElement(o.f,null,"preventScroll")," to"," ",r.a.createElement(o.f,null,"true"),"."),r.a.createElement(o.d,{lang:"jsx"},"// scrolls\nuseNavigationFocus(ref);\n\n// does not scroll\nuseNavigationFocus(ref, { preventScroll: true });")),r.a.createElement(o.e,{tag:"h4",meta:{title:"preserve",hash:"useNavigationFocus-preserve"}},r.a.createElement("p",null,"The default focus behavior is to always focus the element that the ref is attached to. However, if you want to preserve the focus on some other element (e.g. an autofocused element), setting the"," ",r.a.createElement(o.f,null,"preserve")," option to ",r.a.createElement(o.f,null,"true")," will stop the"," ",r.a.createElement(o.f,null,"ref")," element from claiming the focus."),r.a.createElement("p",null,"This only works when the already-focused element is a child of the"," ",r.a.createElement(o.f,null,"ref")," element. If it is not a child, then the"," ",r.a.createElement(o.f,null,"ref")," element will take the focus."),r.a.createElement(o.d,{lang:"jsx"},"// claim focus for the <div>\nuseNavigationFocus(ref)\n<div tabIndex={-1} ref={ref}>\n  <input autoFocus={true} />\n</div>\n\n// preserve focus on the <input>\nuseNavigationFocus(ref, { preserve: true });\n<div tabIndex={-1} ref={ref}>\n  <input autoFocus={true} />\n</div>"))))}var j={title:"useNavigating",hash:"useNavigating"};function x(){return r.a.createElement(o.e,{meta:j},r.a.createElement("p",null,"The ",r.a.createElement(o.f,null,"useNavigating")," hook is used to determine if the application is currently navigating. It pairs up with"," ",r.a.createElement(o.f,null,"router.cancel")," to enable cancelling asynchronous navigation."),r.a.createElement("p",null,"This is only useful for asynchronous routes because with synchronous routes, navigation happens immediately."),r.a.createElement(o.d,{lang:"jsx"},'import { useNavigating } from "@curi/react-dom";\n\nfunction CancelNavigation() {\n  const cancel = useNavigating();\n\n  return cancel\n    ? <button onClick={cancel}>Cancel</button>\n    : null;\n}'),r.a.createElement(o.g,null,r.a.createElement("p",null,"Ideally, browsers would natively handle asynchronous navigation and this would be unnecessary. For the time being, this is the next best solution.")))}var U={title:"Options",hash:"useURL-opts"},C={title:"useURL",hash:"useURL",children:[U]};function N(){return r.a.createElement(o.e,{meta:C},r.a.createElement("p",null,"The ",r.a.createElement(o.f,null,"useURL")," hook creates a URL string."),r.a.createElement(o.d,{lang:"jsx"},'import { useURL } from \'@curi/react-dom\';\n\nconst href = useURL({\n  name: "Video",\n  params: { id: "jaifeo9" } },\n  hash: "comments",\n  query: "t=15"\n});\n// href = "/video/jaifeo9?t=15#comments"'),r.a.createElement(o.e,{tag:"h3",meta:U},r.a.createElement(o.e,{tag:"h4",meta:{title:"name",hash:"useURL-name"}},r.a.createElement("p",null,"The name of the route to generate the location's pathname from. If this is not provided, the generated location's pathname will be an empty string (",r.a.createElement(o.f,null,'""'),");")),r.a.createElement(o.e,{tag:"h4",meta:{title:"params",hash:"useURL-params"}},r.a.createElement("p",null,"An object of params for the named route.")),r.a.createElement(o.e,{tag:"h4",meta:{title:"hash",hash:"useURL-hash"}},r.a.createElement("p",null,"A hash string for the location.")),r.a.createElement(o.e,{tag:"h4",meta:{title:"query",hash:"useURL-query"}},r.a.createElement("p",null,"The location's query value."),r.a.createElement("p",null,"By default, this is expected to be a string, but if you configure your history object with the"," ",r.a.createElement("a",{href:"https://github.com/pshrmn/hickory/blob/master/docs/api/browser.md#options"},r.a.createElement(o.f,null,"query"))," ","option, this may be something else."))))}var F={title:"Props",hash:"ResponseConsumer-props"},I={title:"<ResponseConsumer>",hash:"ResponseConsumer",children:[F]};function q(){return r.a.createElement(o.e,{meta:I},r.a.createElement("p",null,"A context consumer component for injecting response values into components. Its primary use case is in class components."),r.a.createElement(o.d,{lang:"jsx"},"import { ResponseConsumer } from '@curi/react-dom';\n\nclass MyComponent {\n  render() {\n    return (\n      <ResponseConsumer>\n        {({ response, navigation }) => {\n          // pass these props to any components\n          // that needs them\n          return (\n            <ThingThatNeedsResponse\n              response={response}\n            />\n          );\n        }}\n      </ResponseConsumer>\n    );\n  }\n}"),r.a.createElement(o.e,{tag:"h3",meta:F},r.a.createElement(o.e,{tag:"h4",meta:{title:"children",hash:"ResponseConsumer-children"}},r.a.createElement("p",null,"A render-invoked function that returns a React element. This function will receive an object with ",r.a.createElement(o.f,null,"response")," and"," ",r.a.createElement(o.f,null,"navigation")," properties."))))}var H={title:"Props",hash:"RouterConsumer-props"},S={title:"<RouterConsumer>",hash:"RouterConsumer",children:[H]};function D(){return r.a.createElement(o.e,{meta:S},r.a.createElement("p",null,"A context consumer component for injecting the router into components. Its primary use case is in class components."),r.a.createElement(o.d,{lang:"jsx"},"import { RouterConsumer } from '@curi/react-dom';\n\nclass MyComponent {\n  render() {\n    return (\n      <RouterConsumer>\n        {router => {\n          return (\n            <button onClick={e => {\n              login();\n              const url = router.url({ name: \"Home\" });\n              router.navigate({ url });\n            }}>\n              Submit\n            </button>\n          );\n        }}\n      </RouterConsumer>\n    );\n  }\n}"),r.a.createElement(o.e,{tag:"h3",meta:H},r.a.createElement(o.e,{tag:"h4",meta:{title:"children",hash:"RouterConsumer-children"}},r.a.createElement("p",null,"A render-invoked function that returns a React element. This function will receive the application's ",r.a.createElement(o.f,null,"router"),"."))))}var O=r.a.memo(function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.b,null,r.a.createElement("p",null,"The ",r.a.createElement(o.f,null,"@curi/react-dom")," package provides a number of React components that you can use for rendering your application."),r.a.createElement("p",null,"For more information on using Curi with React DOM, please check out the"," ",r.a.createElement(l.a,{name:"Guide",params:{slug:"react-dom"}},"React DOM guide"),".")),r.a.createElement(o.a,null,r.a.createElement(u,null),r.a.createElement(p,null),r.a.createElement(E,null),r.a.createElement(v,null),r.a.createElement(y,null),r.a.createElement(R,null),r.a.createElement(T,null),r.a.createElement(x,null),r.a.createElement(N,null),r.a.createElement(q,null),r.a.createElement(D,null)))}),P=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[c,h,f,g,k,L,w,j,C,I,S]}];n.d(t,"component",function(){return O}),n.d(t,"contents",function(){return P})}}]);