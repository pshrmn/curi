(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{70:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(3),s=n(20),o={title:"Arguments",hash:"createRouterComponent-arguments"},i={title:"Return Value",hash:"createRouterComponent-return"},c={title:"createRouterComponent",hash:"createRouterComponent"};var m={title:"Props",hash:"Link-props"},u={title:"Link",hash:"Link"};var h={title:"Props",hash:"AsyncLink-props"},p={title:"AsyncLink",hash:"AsyncLink"};var E={title:"useResponse",hash:"useResponse"};var g={title:"useRouter",hash:"useRouter"};var d={title:"Options",hash:"useActive-opts"},f={title:"useActive",hash:"useActive"};var v={title:"useNavigating",hash:"useNavigating"};var k={title:"Options",hash:"useURL-opts"},y={title:"useURL",hash:"useURL"};var L={title:"Props",hash:"ResponseConsumer-props"},b={title:"ResponseConsumer",hash:"ResponseConsumer"};var R={title:"Props",hash:"RouterConsumer-props"},T={title:"RouterConsumer",hash:"RouterConsumer"};var A={about:r.a.createElement(s.b,null,r.a.createElement("p",null,"The ",r.a.createElement(s.f,null,"@curi/react-native")," package provides components to use Curi routing in a React Native application."),r.a.createElement("p",null,"For more information on using Curi with React Native, please check out the"," ",r.a.createElement(l.a,{name:"Guide",params:{slug:"react-native"}},"React Native guide"),".")),api:r.a.createElement(s.a,null,r.a.createElement(function(){return r.a.createElement(s.e,{meta:c},r.a.createElement("p",null,"A higher-order component that returns a ",r.a.createElement(s.f,null,"Router")," component."),r.a.createElement(s.d,{lang:"jsx"},"import { createRouterComponent } from '@curi/react-native';\n\nconst router = createRouter(browser, routes);\nconst Router = createRouterComponent(router);"),r.a.createElement(s.g,null,r.a.createElement("p",null,"Why a higher-order component not regular component? Props signify values that can change, but an application should only ever have one router. Using a higher-order component hard-codes the provided"," ",r.a.createElement(s.f,null,"router")," as the one and only router.")),r.a.createElement(s.e,{tag:"h3",meta:o},r.a.createElement(s.e,{tag:"h4",meta:{title:"router",hash:"createRouterComponent-router"}},r.a.createElement("p",null,"A Curi"," ",r.a.createElement(l.a,{name:"Package",params:{package:"router",version:"v2"},hash:"curi"},"router"),"."))),r.a.createElement(s.e,{tag:"h3",meta:i},r.a.createElement("p",null,"A component that sets routing context data. Any component that relies on routing data must be a descendant of the ",r.a.createElement(s.f,null,"Router"),"."),r.a.createElement(s.e,{tag:"h4",meta:{title:"children",hash:"createRouterComponent-children"}},r.a.createElement("p",null,"The ",r.a.createElement(s.f,null,"Router")," takes any valid React node (elements, strings, etc.) as its ",r.a.createElement(s.f,null,"children"),"."))))},null),r.a.createElement(function(){return r.a.createElement(s.e,{meta:u},r.a.createElement("p",null,"A ",r.a.createElement(s.f,null,"Link")," is used for navigating within your application. By default, this will render a ",r.a.createElement(s.f,null,"TouchableHighlight"),". When the rendered element is pressed, it will use the router to navigate."),r.a.createElement("p",null,"With the ",r.a.createElement(s.f,null,"Link"),", instead of providing a URI to navigate to, you specify the name of the route that you want to link to. Then, the pathname of the URI you want the component to link to will be automatically generated for you."),r.a.createElement(s.d,{lang:"jsx"},"import { Link } from '@curi/react-native';\n\n<Link name='User' params={{ id: 16 }}>\n  <Text>User 16</Text>\n</Link>\n// <TouchableHighlight>\n//   <Text>User 16</Text>\n// </TouchableHighlight>"),r.a.createElement(s.e,{tag:"h3",meta:m},r.a.createElement(s.e,{tag:"h4",meta:{title:"name",hash:"Link-to"}},r.a.createElement("p",null,"The name of the route that the ",r.a.createElement(s.f,null,"Link")," should navigate to when it is pressed."),r.a.createElement("p",null,"To navigate within the same location, the ",r.a.createElement(s.f,null,"name")," can be skipped. This is useful for linking to hashes within the current page."),r.a.createElement(s.d,{lang:"jsx"},'// Home route is { name: "Home", path: "" }\n<Link name="Home">Home</Link>')),r.a.createElement(s.e,{tag:"h4",meta:{title:"params",hash:"Link-params"}},r.a.createElement("p",null,"If the named route (or any of its parents) include path parameters, they must be provided using the ",r.a.createElement(s.f,null,"params")," prop."),r.a.createElement(s.d,{lang:"jsx"},"// User route is { name: 'User', path: '/user/:id' }\n<Link name='User' params={{ id: 16 }}>User 16</Link>")),r.a.createElement(s.e,{tag:"h4",meta:{title:"hash, query & state",hash:"Link-hash-query-state"}},r.a.createElement("p",null,"The ",r.a.createElement(s.f,null,"query"),", ",r.a.createElement(s.f,null,"hash"),", and ",r.a.createElement(s.f,null,"state")," values for the location to navigate to."),r.a.createElement(s.d,{lang:"jsx"},'<Link\n  name="Products"\n  params={{ type: "vacuums" }}\n  hash="iroomba"\n  query="volume=loud"\n  state={{ owner: "Tom Haverford" }}\n>\n  DJ Roomba\n</Link>')),r.a.createElement(s.e,{tag:"h4",meta:{title:"children",hash:"Link-children"}},r.a.createElement("p",null,"A valid React Node (e.g. a React element, a string, or"," ",r.a.createElement(s.f,null,"null"),")."),r.a.createElement(s.d,{lang:"jsx"},'// a React node\n<Link name="Home">\n  <Text>Home</Text>\n</Link>')),r.a.createElement(s.e,{tag:"h4",meta:{title:"anchor",hash:"Link-anchor"}},r.a.createElement("p",null,"A ",r.a.createElement(s.f,null,"Link")," renders a ",r.a.createElement(s.f,null,"TouchableHighlight")," element by default, but this can be changed using the ",r.a.createElement(s.f,null,"anchor")," prop. This can be useful for using styled components."),r.a.createElement(s.d,{lang:"jsx"},'<Link\n  name="User"\n  params={{ id: 16 }}\n  anchor={TouchableOpacity}\n>\n<Text>User 16</Text>\n</Link>\n// <TouchableOpacity>\n//   <Text>User 16</Text>\n// </TouchableOpacity>')),r.a.createElement(s.e,{tag:"h4",meta:{title:"rest",hash:"Link-rest"}},r.a.createElement("p",null,"Any additional props attached to the ",r.a.createElement(s.f,null,"Link")," will be attached to the element rendered by the ",r.a.createElement(s.f,null,"Link"),"."),r.a.createElement(s.d,{lang:"jsx"},'<Link\n  name="Home"\n  style={{ ... }}\n>\n  <Text>Home</Text>\n</Link>\n// <TouchableOpacity style={{...}}>\n//   <Text>Home</Text>\n// </TouchableOpacity>'))))},null),r.a.createElement(function(){return r.a.createElement(s.e,{meta:p},r.a.createElement("p",null,"An ",r.a.createElement(s.f,null,"AsyncLink")," is similar to a"," ",r.a.createElement(l.a,{hash:"Link"},r.a.createElement(s.f,null,"Link")),", but uses a render-invoked function as its ",r.a.createElement(s.f,null,"children")," ","component."),r.a.createElement(s.d,{lang:"jsx"},"import { AsyncLink } from '@curi/react-dom';\n\n<AsyncLink name='User' params={{ id: 16 }}>\n  {navigating => {\n    return navigating\n      ? <Text>Navigating to User 16</Text>\n      : <Text>Go to User 16</Text>\n  }}\n</AsyncLink>\n\n<TouchableHighlight>\n  <Text>Go to User 16</Text>\n</TouchableHighlight>\n// press button\n<TouchableHighlight>\n  <Text>Navigating to User 16</Text>\n</TouchableHighlight>"),r.a.createElement(s.e,{tag:"h3",meta:h},r.a.createElement(s.e,{tag:"h4",meta:{title:"name",hash:"AsyncLink-name"}},r.a.createElement("p",null,"See ",r.a.createElement(l.a,{hash:"Link-name"},"Link name"))),r.a.createElement(s.e,{tag:"h4",meta:{title:"params",hash:"AsyncLink-params"}},r.a.createElement("p",null,"See ",r.a.createElement(l.a,{hash:"Link-params"},"Link params"))),r.a.createElement(s.e,{tag:"h4",meta:{title:"hash, query & state",hash:"AsyncLink-hash-query-state"}},r.a.createElement("p",null,"See"," ",r.a.createElement(l.a,{hash:"Link-hash-query-state"},"Link hash, query & state"))),r.a.createElement(s.e,{tag:"h4",meta:{title:"children",hash:"AsyncLink-children"}},r.a.createElement("p",null,"A render-invoked ",r.a.createElement(s.f,null,"children")," function that is called with the ",r.a.createElement(s.f,null,"AsyncLink"),"'s navigation state. The navigation state is"," ",r.a.createElement(s.f,null,"false")," to start, ",r.a.createElement(s.f,null,"true")," when the"," ",r.a.createElement(s.f,null,"AsyncLink")," is clicked, and ",r.a.createElement(s.f,null,"false")," when the the navigation finishes/is cancelled."),r.a.createElement(s.d,{lang:"jsx"},'<AsyncLink name="User" params={{ id: 1 }}>\n  {navigating => (\n    <React.Fragment>\n      <Text>User 1</Text>\n      {navigating ? <Spinner /> : null}\n    </React.Fragment>\n  )}\n</AsyncLink>')),r.a.createElement(s.e,{tag:"h4",meta:{title:"anchor",hash:"AsyncLink-anchor"}},r.a.createElement("p",null,"See ",r.a.createElement(l.a,{hash:"Link-anchor"},"Link anchor"))),r.a.createElement(s.e,{tag:"h4",meta:{title:"rest",hash:"AsyncLink-rest"}},r.a.createElement("p",null,"See ",r.a.createElement(l.a,{hash:"Link-rest"},"Link rest")))))},null),r.a.createElement(function(){return r.a.createElement(s.e,{meta:E},r.a.createElement("p",null,"The ",r.a.createElement(s.f,null,"useResponse")," hook reads the current ",r.a.createElement(s.f,null,"response")," ","and ",r.a.createElement(s.f,null,"navigation")," values from React's context. This will be called every time a new response is emitted."),r.a.createElement(s.d,{lang:"jsx"},"import { useResponse } from '@curi/react-native';\n\nfunction App() {\n  const {\n    response,\n    navigation\n  } = useResponse();\n  return (\n    <ThingThatNeedsResponse\n      response={response}\n    />\n  );\n}"))},null),r.a.createElement(function(){return r.a.createElement(s.e,{meta:g},r.a.createElement("p",null,"The ",r.a.createElement(s.f,null,"useRouter")," hook returns the ",r.a.createElement(s.f,null,"router")," object."),r.a.createElement(s.d,{lang:"jsx"},"import { useRouter } from '@curi/react-native';\n\nfunction App() {\n  const router = useRouter();\n  // ...\n}"))},null),r.a.createElement(function(){return r.a.createElement(s.e,{meta:f},r.a.createElement("p",null,"The ",r.a.createElement(s.f,null,"useActive")," hook determines if a route is active by comparing a route name (and possibly params) to a ",r.a.createElement(s.f,null,"response")," ","object."),r.a.createElement(s.d,{lang:"jsx"},'import { useActive, Link } from \'@curi/react-native\';\n\nfunction ActiveLink({\n  name,\n  params,\n  partial,\n  children\n}) {\n  const active = useActive({ name, params, partial });\n  return (\n    <Link\n      name={name}\n      params={params}\n      className={active ? "active" : "" }\n    >\n      {children}\n    </Link>\n  );\n}\n\n<ActiveLink name="Home">Home</ActiveLink>'),r.a.createElement(s.e,{tag:"h3",meta:d},r.a.createElement("p",null,r.a.createElement(s.f,null,"useActive")," takes a single argument, an options object."),r.a.createElement(s.e,{tag:"h4",meta:{title:"name",hash:"useActive-name"}},r.a.createElement("p",null,"The name of the route to compare against the response object.")),r.a.createElement(s.e,{tag:"h4",meta:{title:"params",hash:"useActive-params"}},r.a.createElement("p",null,"An object containing route parameters. These will be compared against the route params of the response object.")),r.a.createElement(s.e,{tag:"h4",meta:{title:"partial",hash:"useActive-partial"}},r.a.createElement("p",null,"Allows ancestor routes to be considered active when true. Defaults to false."),r.a.createElement(s.d,{lang:"jsx"},'// response = { name: "User Album", params: { id: "abcde" }}\n// where "User Album" is a child route of "User"\n\nuseActive({ name: "User" }); // false\nuseActive({ name: "User", partial: true }); // true'))),r.a.createElement(s.e,{tag:"h4",meta:{title:"components",hash:"useActive-components"}},r.a.createElement("p",null,"The base active check only checks that the route (i.e. pathname) is active. ",r.a.createElement(s.f,null,"components")," allows you to check if other components of the location are also active."),r.a.createElement(s.d,{lang:"jsx"},'useActive({\n  name: "Results",\n  components: loc => loc.query === "page=3"\n});\n\n// active for /results?page=3\n// not active for /results?page=1')))},null),r.a.createElement(function(){return r.a.createElement(s.e,{meta:v},r.a.createElement("p",null,"The ",r.a.createElement(s.f,null,"useNavigating")," hook is used to determine if the application is currently navigating. It pairs up with"," ",r.a.createElement(s.f,null,"router.cancel")," to enable cancelling asynchronous navigation."),r.a.createElement("p",null,"This is only useful for asynchronous routes because with synchronous routes, navigation happens immediately."),r.a.createElement(s.d,{lang:"jsx"},'import { useNavigating } from "@curi/react-native";\n\nfunction CancelNavigation() {\n  const cancel = useNavigating();\n\n  return cancel\n    ? <button onClick={cancel}>Cancel</button>\n    : null;\n}'),r.a.createElement(s.g,null,r.a.createElement("p",null,"Ideally, browsers would natively handle asynchronous navigation and this would be unnecessary. For the time being, this is the next best solution.")))},null),r.a.createElement(function(){return r.a.createElement(s.e,{meta:y},r.a.createElement("p",null,"The ",r.a.createElement(s.f,null,"useURL")," hook creates a URL string."),r.a.createElement(s.d,{lang:"jsx"},'import { useURL } from \'@curi/react-dom\';\n\nconst href = useURL({\n  name: "Video",\n  params: { id: "jaifeo9" } },\n  hash: "comments",\n  query: "t=15"\n});\n// href = "/video/jaifeo9?t=15#comments"'),r.a.createElement(s.e,{tag:"h3",meta:k},r.a.createElement(s.e,{tag:"h4",meta:{title:"name",hash:"useURL-name"}},r.a.createElement("p",null,"The name of the route to generate the location's pathname from. If this is not provided, the generated location's pathname will be an empty string (",r.a.createElement(s.f,null,'""'),");")),r.a.createElement(s.e,{tag:"h4",meta:{title:"params",hash:"useURL-params"}},r.a.createElement("p",null,"An object of params for the named route.")),r.a.createElement(s.e,{tag:"h4",meta:{title:"hash",hash:"useURL-hash"}},r.a.createElement("p",null,"A hash string for the location.")),r.a.createElement(s.e,{tag:"h4",meta:{title:"query",hash:"useURL-query"}},r.a.createElement("p",null,"The location's query value."),r.a.createElement("p",null,"By default, this is expected to be a string, but if you configure your history object with the"," ",r.a.createElement("a",{href:"https://github.com/pshrmn/hickory/blob/master/docs/api/browser.md#options"},r.a.createElement(s.f,null,"query"))," ","option, this may be something else."))))},null),r.a.createElement(function(){return r.a.createElement(s.e,{meta:b},r.a.createElement("p",null,"A context consumer component for injecting response values into components. Its primary use case is in class components."),r.a.createElement(s.d,{lang:"jsx"},"import { ResponseConsumer } from '@curi/react-native';\n\nclass MyComponent {\n  render() {\n    return (\n      <ResponseConsumer>\n        {({ response, navigation }) => {\n          // pass these props to any components\n          // that needs them\n          return (\n            <ThingThatNeedsResponse\n              response={response}\n            />\n          );\n        }}\n      </ResponseConsumer>\n    );\n  }\n}"),r.a.createElement(s.e,{tag:"h3",meta:L},r.a.createElement(s.e,{tag:"h4",meta:{title:"children",hash:"ResponseConsumer-children"}},r.a.createElement("p",null,"A render-invoked function that returns a React element. This function will receive an object with ",r.a.createElement(s.f,null,"response")," and"," ",r.a.createElement(s.f,null,"navigation")," properties."))))},null),r.a.createElement(function(){return r.a.createElement(s.e,{meta:T},r.a.createElement("p",null,"A context consumer component for injecting the router into components. Its primary use case is in class components."),r.a.createElement(s.d,{lang:"jsx"},"import { RouterConsumer } from '@curi/react-native';\n\nclass MyComponent {\n  render() {\n    return (\n      <RouterConsumer>\n        {router => {\n          return (\n            <button onClick={e => {\n              login();\n              const url = router.url({ name: \"Home\" });\n              router.navigate({ url });\n            }}>\n              Submit\n            </button>\n          );\n        }}\n      </RouterConsumer>\n    );\n  }\n}"),r.a.createElement(s.e,{tag:"h3",meta:R},r.a.createElement(s.e,{tag:"h4",meta:{title:"children",hash:"RouterConsumer-children"}},r.a.createElement("p",null,"A render-invoked function that returns a React element. This function will receive the application's ",r.a.createElement(s.f,null,"router"),"."))))},null))},x=[{title:"Installation",hash:"installation"},{title:"About",hash:"about"},{title:"API",hash:"API",children:[c,u,p,E,g,f,v,y,b,T]}];n.d(t,"sections",function(){return A}),n.d(t,"contents",function(){return x})}}]);