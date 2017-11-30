webpackJsonp([2],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BasePackage = _interopRequireDefault(__webpack_require__(61));

var _APIBlock = _interopRequireDefault(__webpack_require__(62));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name,
      version = _ref.version,
      globalName = _ref.globalName;
  return _react.default.createElement(_BasePackage.default, {
    name: name,
    version: version,
    globalName: globalName,
    about: _react.default.createElement("p", null, "This package allows you to set ", _react.default.createElement(_PrismBlocks.InlineJS, null, "title"), " properties on your routes and will automatically set the page's title whenever the location changes.")
  }, _react.default.createElement(_APIBlock.default, null, _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "createTitleSideEffect",
    id: "createTitleSideEffect"
  }, _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import createConfig from '@curi/core';\nimport createTitleSideEffect from '@curi/side-effect-title';\n\nconst setTitle = createTitleSideEffect({ suffix: '| My Site' });\n\nconst config = createConfig(history, routes, {\n  sideEffects: [setTitle]\n});"), _react.default.createElement("p", null, "In order for this to work, you will need to set title properties on your routes. You can learn more about ", _react.default.createElement(_PrismBlocks.InlineJS, null, "route.title"), " in the", ' ', _react.default.createElement(_react2.Link, {
    to: "Guide",
    params: {
      slug: 'routes'
    }
  }, "all about routes"), " guide."), _react.default.createElement("p", null, "You can provide a prefix and/or a suffix string that will be included before/after the title."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const prefixedTitle = createTitleSideEffect({ prefix: 'Before |'});\n// response.title = 'Middle'\n// document.title = 'Before | Middle';\n\nconst suffixedTitle = createTitleSideEffect({ suffix: '| After'});\n// response.title = 'Middle'\n// document.title = 'Middle | After';"))));
};

exports.default = _default;

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BasePackage = _interopRequireDefault(__webpack_require__(61));

var _APIBlock = _interopRequireDefault(__webpack_require__(62));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name,
      version = _ref.version,
      globalName = _ref.globalName;
  return _react.default.createElement(_BasePackage.default, {
    name: name,
    version: version,
    globalName: globalName,
    about: _react.default.createElement("div", null, _react.default.createElement("p", null, "Hickory, the history package that Curi uses, uses the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "pushState"), ' ', "and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "replaceState"), " methods for navigation. Unfortunately, these do not trigger scrolling to the top of the page when you navigate. This package provides a side effect function that will scroll to the top of the page whenever those functions are used for navigation."), _react.default.createElement("p", null, "Other types of navigation, such as clicking the browser's back and forward buttons, will rely on the browser to correctly restore the scroll position."))
  }, _react.default.createElement(_APIBlock.default, null, _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "createScrollSideEffect",
    id: "createScrollSideEffect"
  }, _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import createConfig from '@curi/core';\nimport createScrollSideEffect from '@curi/side-effect-scroll';\n\nconst scrollTo = createScrollSideEffect();\n\nconst config = createConfig(history, routes, {\n  sideEffects: [scrollTo]\n});"))));
};

exports.default = _default;

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BasePackage = _interopRequireDefault(__webpack_require__(61));

var _APIBlock = _interopRequireDefault(__webpack_require__(62));

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(12);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name,
      version = _ref.version,
      globalName = _ref.globalName;
  return _react.default.createElement(_BasePackage.default, {
    name: name,
    version: version,
    globalName: globalName,
    about: _react.default.createElement("div", null, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/react"), " provides a number of React components that you can use for rendering your application."))
  }, _react.default.createElement(_APIBlock.default, null, _react.default.createElement(_Sections.Section, {
    title: _react.default.createElement(_PrismBlocks.InlineComponent, null, "Navigator"),
    id: "Navigator"
  }, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Navigator"), " component provides a way to automatically re-render your application when the location changes. This component gets passed a Curi configuration object, which it will subscribe to so that it can re-render when the location changes."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import { Navigator } from '@curi/react';"), _react.default.createElement("p", null), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "const config = createConfig(history, routes);\n\nReactDOM.render((\n  <Navigator config={config}>\n    {(response, config) => {\n      if (!response) {\n        return null;\n      }\n      return response.body ? <response.body /> : null;\n    }}\n  </Navigator>\n), holder);"), _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "Props",
    id: "Navigator-props"
  }, _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "config",
    id: "Navigator-config"
  }, _react.default.createElement("p", null, "A configuration object (created by calling curi's createConfig function).")), _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "render",
    id: "Navigator-render"
  }, _react.default.createElement("p", null, "A render function. This will be called whenever the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Navigator"), ' ', "renders. The function will be passed the current response object and the config object it was passed as a prop. The function must return a React element.")), _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "response",
    id: "Navigator-response"
  }, _react.default.createElement("p", null, "A response object. You can pass your ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Navigator"), " a response object and it will use that instead of subscribing to the configuration object. This is ideal for server-side rendering.")))), _react.default.createElement(_Sections.Section, {
    title: _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"),
    id: "Link"
  }, _react.default.createElement("p", null, "A ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), " allows you to navigate within your application using an anchor element (", _react.default.createElement(_PrismBlocks.InlineComponent, null, "a"), "). When the rendered element is clicked, instead of reloading the page it will use your configuration object's history object to navigate."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import { Link } from '@curi/react';"), _react.default.createElement("p", null, "With the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), ", instead of providing a URI to navigate to, you just need to specify the name of the route you want to link to. Then, the pathname of the URI you want the component to link to will be automatically generated for you."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "<Link to='User' params={{ id: 16 }}>User 16</Link>\n// <a href='/user/16'>User 16</a>"), _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "Props",
    id: "Link-props"
  }, _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "to",
    id: "Link-to"
  }, _react.default.createElement("p", null, "The name of the route that you want to navigate to.")), _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "params",
    id: "Link-params"
  }, _react.default.createElement("p", null, "If the route that you want to navigate to (or any of its parents) include path parameters, you can specify them using the params prop."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// User route is { name: 'User', path: '/user/:id' }\n<Link to='User' params={{ id: 16 }}>User 16</Link>")), _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "details",
    id: "Link-details"
  }, _react.default.createElement("p", null, "While the pathname of the location to navigate to will be generated for you, this does not cover over location properties (query, hash, and state). You can provide these values using the details prop."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "<Link\n  to='Products'\n  params={{ type: 'vacuums' }}\n  details={{ hash: 'iroomba' }}\n>\n  DJ Roomba\n</Link>"), _react.default.createElement(_Messages.Note, null, "You can also include a pathname property in the details object and it will overwrite the one generated from the to prop. This isn't recommended, but does work.")), _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "anchor",
    id: "Link-anchor"
  }, _react.default.createElement("p", null, "By default, when you render a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), ", an anchor element will be rendered (", _react.default.createElement(_PrismBlocks.InlineJS, null, "React.createElement('a', ...)"), "). However, you can provide your own component to be rendered instead. This can be useful for using styled components to navigate."), _react.default.createElement(_Messages.Warning, null, "You can provide any component that you want, but you ", _react.default.createElement("em", null, "should"), " stick with an anchor (or a component that renders an anchor). There are accessibility issues that will occur when you use other DOM elements as links. The component's prop type is func in an attempt to discourage you from making your link render a button, div, span, etc.")), _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "active",
    id: "Link-active"
  }, _react.default.createElement("p", null, "The active prop gives you an opportunity to style the element rendered by the", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), " when it is \"active\". Being active means that the", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), "'s route parameters are the same as the current response's route parameters. This ", _react.default.createElement("strong", null, "does not"), " take into account any query parameters or the hash."), _react.default.createElement("p", null, "The active prop is an object with two properties. The first one, merge is required. The merge property must be a function. That function's argument is the props object that will be passed used to render the element rendered by the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), ". The merge function can modify these props however it likes. It must return the resulting props object."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "function mergeActive(props) {\n  props.className = 'active';\n  return props;\n}\n\n<Link to='Home' active={{ merge: mergeActive }}>Home</Link>"), _react.default.createElement("p", null, "The second property of the active object is partial. By default, only", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), "s that match the response object's name can be considered \"active\". However, when partial is true, any parent routes can also be \"active\". This is done using the response object's partials property."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "<Link to='Users' active={{ partial: true, merge: mergeActive }}>Users</Link>"), _react.default.createElement(_Messages.Note, null, "If you use the active prop, you have to include the", ' ', _react.default.createElement(_react2.Link, {
    to: "Package",
    params: {
      package: 'addon-active'
    }
  }, "@curi/addon-active"), " addon in your Curi configuration object. If you do not, an error will be thrown.")))), _react.default.createElement(_Sections.Section, {
    title: _react.default.createElement(_PrismBlocks.InlineComponent, null, "Active"),
    id: "Active"
  }, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Active"), " component allows you to style its child component as \"active\" when the location that ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Active"), " describe matches the current location."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import { Active } from '@curi/react';"), _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Active"), " component lets you modify its children element's props. It takes a merge function as a prop, which you can use to modify the child element's props when the component is \"active\"."), _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "Props",
    id: "Active-props"
  }, _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "name",
    id: "Active-name"
  }, _react.default.createElement("p", null, "The name of the route to compare against the response object.")), _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "params",
    id: "Active-params"
  }, _react.default.createElement("p", null, "An object containing route parameters. These will be compared against the route params of the response object.")), _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "children",
    id: "Active-children"
  }, _react.default.createElement("p", null, "A React element that will have its props updated when the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Active"), ' ', "component is \"active\".")), _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "merge",
    id: "Active-merge"
  }, _react.default.createElement("p", null, "A function that will modify the children element's props. It receives a props object as its argument and must return a props object.")), _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "partial",
    id: "Active-partial"
  }, _react.default.createElement("p", null, "A boolean that defaults to false. When it is true, the \"active\" check will check the response's partials array in addition to its name. This allows you to style ancestor routes of the actually \"active\" route."))), _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "Usage",
    id: "Active-usage"
  }, _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "function merge(props) {\n  props.className = 'active';\n  return props; \n}\n\nconst Users = (props) => (\n  {\n    props.users.map(u => (\n      <Active\n        key={u.id}\n        name='User'\n        merge={merge}\n        params={u}\n      >\n        <User {...u} />\n      </Active>\n    ))\n  }\n);"), _react.default.createElement("p", null, "This relies on the active addon from", ' ', _react.default.createElement(_react2.Link, {
    to: "Package",
    params: {
      package: 'addon-active'
    }
  }, "@curi/addon-active"), " being added to your configuration object."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import createActiveAddon from '@curi/active-addon';\n\nconst config = createConfig(history, routes, {\n  addons: [createActiveAddon]\n});"), _react.default.createElement("p", null, "While not strictly a requirement, the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Active"), " relies on the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "curi"), " and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "curiResponse"), " context variables existing, so your application should have a", ' ', _react.default.createElement(_react2.Link, {
    to: "Package",
    params: {
      package: 'react'
    },
    details: {
      hash: 'Navigator'
    }
  }, _react.default.createElement(_PrismBlocks.InlineComponent, null, "Navigator")), " as an ancestor of your ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Active"), "components in order to ensure that those exist."))), _react.default.createElement(_Sections.Section, {
    title: _react.default.createElement(_PrismBlocks.InlineComponent, null, "Block"),
    id: "Block"
  }, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Block"), " component lets you prevent navigation until a user has confirmed that they want to navigate. This can be useful when the user attempts to navigate away from a partially filled form. This ", _react.default.createElement("strong", null, "will not"), " prevent the user from navigating to another site, it only works for navigation within the application."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import { Block } from '@curi/react';"), _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "Props",
    id: "Block-props"
  }, _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "active",
    id: "Block-active"
  }, _react.default.createElement("p", null, "A boolean, which is true by default. When it is true, the navigation block is active. When it is false, navigation will not be blocked."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// will block navigation\n<Block active={true} confirm={confirm} />\n\n// will not block navigation\n<Block active={false} confirm={confirm} />")), _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "confirm",
    id: "Block-confirm"
  }, _react.default.createElement("p", null, "The confirm prop is a function that will be called whenever there is navigation. The function will receive four arguments: location, action, success, and failure. The location and action values are the location object that is being navigated to and the type of navigation. The success and failure arguments are functions that you should call depending on whether or not you want to let the navigation happen. When the navigation should occur, the confirm function should call the success function. When the navigation should be cancelled, the failure function should be called."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "<Block\n  confirm={({ location, action }, success, failure) => {\n    const response = window.confirm(\"Shall we?\");\n    if (response) {\n      success();\n    } else {\n      failure();\n    }\n  }}\n/>")))), _react.default.createElement(_Sections.Section, {
    title: _react.default.createElement(_PrismBlocks.InlineJS, null, "curious()"),
    id: "curious"
  }, _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import { curious } from '@curi/react';"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "class MyComponent extends React.Component {\n  render() {\n    // because this component is wrapped with curious,\n    // you can access this.props.curi and\n    // this.props.response\n  }\n}\n\nexport default curious(MyComponent);"), _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "Props",
    id: "curious-props"
  }, _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "internalRef",
    id: "curious-internalRef"
  }, _react.default.createElement("p", null, "A ref function that you can use to access the wrapped component."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "const WrappedComponent = curious(MyComponent);\n\n<WrappedComponent internalRef={node => ref = node} />")), _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "Other Props",
    id: "curious-other-props"
  }, _react.default.createElement("p", null, "Any other props that you pass to the wrapped component will be available to the base component."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "const WrappedComponent = curious(MyComponent);\n\n<WrappedComponent one='two' red='blue' />\n// MyComponent's props: { curi: {...}, response: {...}, one: 'two', red: 'blue' }"))))));
};

exports.default = _default;

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BasePackage = _interopRequireDefault(__webpack_require__(61));

var _APIBlock = _interopRequireDefault(__webpack_require__(62));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

var _Messages = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name,
      version = _ref.version,
      globalName = _ref.globalName;
  return _react.default.createElement(_BasePackage.default, {
    name: name,
    version: version,
    globalName: globalName,
    about: _react.default.createElement("p", null, "This package allows you to synchronize the response objects generated by Curi with your Redux store. Whenever location changes occur, they will be dispatched to your store. If you use this (with a React application), you do not have to use the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Navigator"), ".")
  }, _react.default.createElement(_APIBlock.default, null, _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import { syncResponses, curiReducer } from '@curi/redux';"), _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "syncResponses",
    id: "syncResponses"
  }, _react.default.createElement("p", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "syncResponses"), " is responsible for linking your Redux store with your Curi configuration object. It subscribes to location changes emitted from your configuration object with a function that will dispatch a \"location changed\" event to the Redux store. It will also add your Curi configuration object to the store."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const config = createConfig(history, routes);\nconst store = createStore(reducer);\n\nsyncResponses(store, config);\n// whenever navigation happens, the config object will now\n// pass the response and action to your Redux store.\n")), _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "curiReducer",
    id: "curiReducer"
  }, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "curiReducer"), " keeps track of your Curi configuration object, the latest response object, and the latest action string in your Redux store."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const config = createConfig(history, routes);\nconst reducer = combineReducers({\n  curi: config,\n  ...\n});\nconst store = createStore(reducer);\nsyncResponses(store, config);\nconst { curi } = store.getState();\n// curi = { config, response, action }"))));
};

exports.default = _default;

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BasePackage = _interopRequireDefault(__webpack_require__(61));

var _APIBlock = _interopRequireDefault(__webpack_require__(62));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name,
      version = _ref.version,
      globalName = _ref.globalName;
  return _react.default.createElement(_BasePackage.default, {
    name: name,
    version: version,
    globalName: globalName,
    about: _react.default.createElement("p", null, "This package enables you to use Curi alongside Svelte. ", _react.default.createElement("strong", null, "This package relies on the Svelte store."))
  }, _react.default.createElement(_APIBlock.default, null, _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"),
    id: "link"
  }, _react.default.createElement("p", null, "In order for the components provided by this package to work, they need to have access to your Curi config object."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<div>\n  <Link to='Home'>Home</Link>\n  <Link to='User' params='{{ { userID: 5 } }}'>Profile</Link>\n</div>\n<script>\n  import { Link } from '@curi/svelte';\n  export default {\n    components: { Link }\n  }\n</script>"))), _react.default.createElement(_Sections.Section, {
    title: "Usage",
    id: "usage"
  }, _react.default.createElement("p", null, "The components exported by ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/svelte"), " rely on Svelte's store. The store should include a ", _react.default.createElement(_PrismBlocks.InlineJS, null, "curi"), " property that has a ", _react.default.createElement(_PrismBlocks.InlineJS, null, "config"), " property. Future releases might also include", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "action"), " properties, but for now", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "config"), " is the only required property."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import { Store } from 'svelte/store';\n\nconst config = createConfig(history, routes);\nconst store = new Store({\n  curi: { config }\n});"), _react.default.createElement("p", null, "As far as rendering your application goes, you should use the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "subscribe"), " method provided by the Curi configuration object to re-render whenever a new response is emitted."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const config = createConfig(history, routes);\n\nconst store = new Store({\n  curi: { config }\n});\n\nconst root = document.getElementById('root');\nlet view;\n\nconfig.subscribe(response => {\n  if (view) {\n    view.destroy();\n  }\n  view = new response.body({\n    target: root,\n    store,\n    data: response\n  });\n});")));
};

exports.default = _default;

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BasePackage = _interopRequireDefault(__webpack_require__(61));

var _APIBlock = _interopRequireDefault(__webpack_require__(62));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name,
      version = _ref.version,
      globalName = _ref.globalName;
  return _react.default.createElement(_BasePackage.default, {
    name: name,
    version: version,
    globalName: globalName,
    about: _react.default.createElement("p", null, "This package enables you to use Curi alongside VueJS. This is more of a proof of concept than a fleshed out routing solution and only provides bare routing functionality.")
  }, _react.default.createElement(_APIBlock.default, null, _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "CuriPlugin",
    id: "curiplugin"
  }, _react.default.createElement("p", null, "curi-vue exports a Vue plugin that you can use to add Curi support to a Vue application. The plugin is passed to Vue using the use method. Along with the plugin, you will need to pass your Curi configuration object to ", _react.default.createElement(_PrismBlocks.InlineJS, null, "Vue.use"), "."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import CuriPlugin from '@curi/vue';\n\nconst config = createConfig(history, routes);\nVue.use(CuriPlugin, { config });"), _react.default.createElement("p", null, "This will do two things. First, it will register a ", _react.default.createElement(_PrismBlocks.InlineJS, null, "curi-link"), " component with Vue. You can use that component to navigate within your application. Second, it makes your configuration a global Vue property, which you can then access as ", _react.default.createElement(_PrismBlocks.InlineJS, null, "Vue.Curi"), "."), _react.default.createElement(_Sections.Subsection, {
    tag: "h4",
    title: "Components",
    id: "components"
  }, _react.default.createElement("p", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "CuriPlugin"), " will register a few components that you can use throughout your application."), _react.default.createElement(_Sections.Subsection, {
    tag: "h5",
    title: _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"),
    id: "link"
  }, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"), " component will render an anchor (", _react.default.createElement(_PrismBlocks.InlineComponent, null, "a"), ") element. It can take three props:"), _react.default.createElement("ul", null, _react.default.createElement("li", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "to"), " - The name of the route to navigate to. ", _react.default.createElement("em", null, "This is required"), "."), _react.default.createElement("li", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "params"), " - An object containing the key-value params for the route. For example, if you are linking to a route with the path ", _react.default.createElement(_PrismBlocks.InlineJS, null, "album/:title"), ", the params object should have a", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "title"), " property."), _react.default.createElement("li", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "details"), " - An object containing additional location properties that should be used for generating the anchor's ", _react.default.createElement(_PrismBlocks.InlineJS, null, "href"), ". These additional properties may be ", _react.default.createElement(_PrismBlocks.InlineJS, null, "query"), ", ", _react.default.createElement(_PrismBlocks.InlineJS, null, "hash"), ", and", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "state"), " (which isn't actually part of the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "href"), ").")), _react.default.createElement("p", null, "Additionally, any slots that you pass to the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"), " will be rendered inside of the anchor."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<curi-link to='Album' :params=\"{ title: 'Coloring Book' }\">Coloring Book</curi-link>")), _react.default.createElement(_Sections.Subsection, {
    tag: "h5",
    title: _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-block"),
    id: "block"
  }, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-block"), " component can be used to automatically block navigation from a page. This will only block in-app navigation. If the user attempts to leave your application, they will not be blocked."), _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-block"), " expects two props: ", _react.default.createElement(_PrismBlocks.InlineJS, null, "action"), " and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "confirm"), "."), _react.default.createElement("ul", null, _react.default.createElement("li", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "active"), " - When this is true, navigation will be blocked and when it is false, navigation will be allowed. If you do not provide this prop, it will default to ", _react.default.createElement(_PrismBlocks.InlineJS, null, "true"), "."), _react.default.createElement("li", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "confirm"), " - The function that will be called to confirm/deny the navigation.")), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<template>\n  <div>\n    <!-- ... -->\n    <curi-block :active=\"active\" :confirm=\"confirm\" />\n  </div>\n</template>\n\n<script>\n  export default {\n    data: {\n      active: true\n    },\n    methods: {\n      confirm(information, go, stay) {\n        const confirmed = window.confirm('Navigate?');\n        if (confirmed) {\n          go();\n        } else {\n          stay();\n        }\n      }\n    }\n  }\n</script>"))))), _react.default.createElement(_Sections.Section, {
    title: "Usage",
    id: "usage"
  }, _react.default.createElement("p", null, "You can either use a Vue component or a render function to render Curi responses."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- App.vue -->\n<template>\n  <div>\n    <Nav />\n    <component :is=\"response.body\" :params=\"response.params\" :data=\"response.data\" />\n  </div>\n</template>\n\n<script>\n  import Nav from './Nav';\n  export default {\n    name: 'app',\n    props: ['response'],\n    components: { Nav }\n  }\n</script>\n"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// renderFunction.js\nimport Nav from './Nav';\nexport default function renderFunction(h, resp) {\n  return h('div', [\n    h(Nav),\n    h(resp.body, { props: { params: resp.params, data: resp.data } })\n  ]);\n}"), _react.default.createElement("p", null, "To actually render the application, you will want to make ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " an observed property of your application. Then, you can use ", _react.default.createElement(_PrismBlocks.InlineJS, null, "config.subscribe"), " to update that object whenever a new response is emitted."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// 1. declare a variable for storing our Vue app\nlet vm;\n// 2. subscribe to the configuration object so we can re-render\n// whenever a new response is created\nconfig.subscribe(response => {\n  // 3. create the Vue app if it doesn't exist\n  if (!vm) {\n    vm = new Vue({\n      el: '#app',\n      // 4. initialize the data with the first response object\n      data: { response },\n  \n      // 4. either use a template or a render function\n      // 4a. TEMPLATE\n      template: '<app :response=\"response\" />',\n      components: { app: App },\n  \n      // 4b. RENDER FUNCTION\n      methods: {\n        render: function(h, resp) {\n          const { body } = resp;\n          return h(body, { params: resp.params });\n        }\n      },\n      render: function(h) {\n        return this.render(h, this.response);\n      }\n    });\n  }\n  // if the Vue app does exist, just update the response\n  else {\n    vm.response = response;\n  }\n});")));
};

exports.default = _default;

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _PrismBlocks = __webpack_require__(2);

var _Packages = _interopRequireDefault(__webpack_require__(91));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var params = _ref.params,
      data = _ref.data;

  if (!data) {
    return _react.default.createElement("div", null, "The package ", _react.default.createElement(_PrismBlocks.InlineJS, null, params.package), " could not be found");
  }

  var Component = _Packages.default[params.package];
  var name = data.name,
      version = data.version,
      globalName = data.globalName;
  return _react.default.createElement(Component, {
    name: name,
    version: version,
    globalName: globalName
  });
};

exports.default = _default;

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subsection = exports.Section = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var Sectional = function Sectional(_ref) {
  var title = _ref.title,
      id = _ref.id,
      children = _ref.children,
      Tag = _ref.tag,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'section' : _ref$type;
  return _react.default.createElement("div", {
    className: type
  }, _react.default.createElement(Tag, {
    id: id
  }, title, _react.default.createElement(_react2.Link, {
    className: "header-link",
    details: {
      hash: id
    }
  }, "#")), children);
};

var Section = function Section(_ref2) {
  var _ref2$tag = _ref2.tag,
      tag = _ref2$tag === void 0 ? 'h2' : _ref2$tag,
      rest = _objectWithoutProperties(_ref2, ["tag"]);

  return _react.default.createElement(Sectional, _extends({
    type: "section",
    tag: tag
  }, rest));
};

exports.Section = Section;

var Subsection = function Subsection(_ref3) {
  var _ref3$tag = _ref3.tag,
      tag = _ref3$tag === void 0 ? 'h3' : _ref3$tag,
      rest = _objectWithoutProperties(_ref3, ["tag"]);

  return _react.default.createElement(Sectional, _extends({
    type: "subsection",
    tag: tag
  }, rest));
};

exports.Subsection = Subsection;

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _Installation = _interopRequireDefault(__webpack_require__(93));

var _About = _interopRequireDefault(__webpack_require__(94));

var _GitHubLink = _interopRequireDefault(__webpack_require__(95));

var _NPMLink = _interopRequireDefault(__webpack_require__(96));

var _PackageLinks = _interopRequireDefault(__webpack_require__(13));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDir(name) {
  if (name.indexOf('addon-') === 0) {
    return 'addons';
  } else if (name.indexOf('side-effect-') === 0) {
    return 'side-effects';
  } else {
    return;
  }
}

var BasePackage = function BasePackage(_ref) {
  var name = _ref.name,
      version = _ref.version,
      globalName = _ref.globalName,
      children = _ref.children,
      about = _ref.about;
  return _react.default.createElement("div", {
    className: "package"
  }, _react.default.createElement("div", {
    className: "content"
  }, _react.default.createElement("h1", null, "@curi/", name), _react.default.createElement("div", {
    className: "package-info"
  }, _react.default.createElement("div", null, "v", version), _react.default.createElement(_GitHubLink.default, {
    name: name,
    dir: getDir(name)
  }), _react.default.createElement(_NPMLink.default, {
    name: name
  })), _react.default.createElement(_About.default, {
    about: about
  }), _react.default.createElement(_Installation.default, {
    name: name,
    version: version,
    globalName: globalName
  }), children || null), _react.default.createElement("div", {
    className: "sidebar"
  }, _react.default.createElement("h2", null, "Packages"), _react.default.createElement(_PackageLinks.default, null)));
};

var _default = BasePackage;
exports.default = _default;

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var children = _ref.children;
  return _react.default.createElement(_Sections.Section, {
    title: "API",
    id: "API"
  }, children);
};

exports.default = _default;

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Core = _interopRequireDefault(__webpack_require__(92));

var _AddonActive = _interopRequireDefault(__webpack_require__(97));

var _AddonAncestors = _interopRequireDefault(__webpack_require__(98));

var _AddonPrefetch = _interopRequireDefault(__webpack_require__(99));

var _SideEffectTitle = _interopRequireDefault(__webpack_require__(100));

var _SideEffectScroll = _interopRequireDefault(__webpack_require__(101));

var _ReactPkg = _interopRequireDefault(__webpack_require__(102));

var _Redux = _interopRequireDefault(__webpack_require__(103));

var _Svelte = _interopRequireDefault(__webpack_require__(104));

var _Vue = _interopRequireDefault(__webpack_require__(105));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  'core': _Core.default,
  'addon-active': _AddonActive.default,
  'addon-ancestors': _AddonAncestors.default,
  'addon-prefetch': _AddonPrefetch.default,
  'side-effect-title': _SideEffectTitle.default,
  'side-effect-scroll': _SideEffectScroll.default,
  'react': _ReactPkg.default,
  'redux': _Redux.default,
  'svelte': _Svelte.default,
  'vue': _Vue.default
};
exports.default = _default;

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BasePackage = _interopRequireDefault(__webpack_require__(61));

var _APIBlock = _interopRequireDefault(__webpack_require__(62));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name,
      version = _ref.version,
      globalName = _ref.globalName;
  return _react.default.createElement(_BasePackage.default, {
    name: name,
    version: version,
    globalName: globalName,
    about: _react.default.createElement("p", null, "The core Curi package provides the function that creates Curi configuration objects. While you can pick and choose between the other Curi packages, every application that uses Curi for its routing/navigation ", _react.default.createElement("em", null, "must"), " use ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/core"), ".")
  }, _react.default.createElement(_APIBlock.default, null, _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "createConfig",
    id: "createConfig"
  }, _react.default.createElement("p", null, "The Curi package has one export, which is a function that returns a Curi configuration object. It is a default export, so you can name it whatever you like when importing it. Throughout the documentation, it is imported as", ' ', " ", _react.default.createElement(_PrismBlocks.InlineJS, null, "createConfig"), " for consistency and because that is what the function does."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import createConfig from '@curi/core';\n\nconst config = createConfig(history, routes, options);"), _react.default.createElement(_Sections.Section, {
    tag: "h4",
    title: "Arguments",
    id: "arguments"
  }, _react.default.createElement(_Sections.Subsection, {
    tag: "h5",
    title: "history",
    id: "history"
  }, _react.default.createElement("p", null, "A Hickory history object")), _react.default.createElement(_Sections.Subsection, {
    tag: "h5",
    title: "routes",
    id: "routes"
  }, _react.default.createElement("p", null, "An array of route objects")), _react.default.createElement(_Sections.Subsection, {
    tag: "h5",
    title: "options",
    id: "options"
  }, _react.default.createElement("p", null, "An optional object with additional properties that can be passed to your configuration object."), _react.default.createElement("ul", null, _react.default.createElement("li", null, "addons - An array of addon instances. The pathname addon is included by default, but any other addons that you wish to use should be provided in this array."), _react.default.createElement("li", null, "middleware - An array of middleware functions. These are functions that will be able to interact with/modify response objects before they are emitted to subscribed functions."), _react.default.createElement("li", null, "cache - An object with get/set properties. This allows you to cache old responses, preventing any load functions from being re-called when navigating to an already-visited location."), _react.default.createElement("li", null, "pathnameOptions - An object with an ", _react.default.createElement(_PrismBlocks.InlineJS, null, "encode"), " function that will be used to encode the string created when generating a pathname from a route and its params.")))), _react.default.createElement(_Sections.Section, {
    tag: "h4",
    title: "Configuration Object Properties",
    id: "properties"
  }, _react.default.createElement("p", null, "The configuration object has a number of properties for you to use when rendering your application."), _react.default.createElement(_Sections.Subsection, {
    tag: "h5",
    title: "subscribe(fn, options)",
    id: "subscribe"
  }, _react.default.createElement("p", null, "The returned object provides a subscribe method that allows your application to be informed of navigation. It expects to be passed a function, which will be called whenever a new response is generated."), _react.default.createElement("p", null, "If the best-matched route has either a preload and/or load loading function, the configuration object will not call the subscribed functions until the loading functions have all resolved."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "config.subscribe((response) => {\n  // render the application based on the response\n});"), _react.default.createElement(_Sections.Subsection, {
    tag: "h6",
    title: "options",
    id: "subscribe-options"
  }, _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "{ once: true } // default false\n// When true, the subscriber function will only be called once. When\n// once is true, config.subscribe does not return an unsubscribe function."))), _react.default.createElement(_Sections.Subsection, {
    tag: "h5",
    title: "addons",
    id: "addons"
  }, _react.default.createElement("p", null, "You can access all of the configuration object's addons through the addons property. This allows you to call an addon's get method directly."), _react.default.createElement("p", null, "For example, with the builtin pathname addon, you can do the following:"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const config = createConfig(history, [{ name: 'User', path: 'user/:id' }]);\nconst userPathname = config.addons.pathname('User', { id: '12345' });\n// userPathname === '/user/12345'")), _react.default.createElement(_Sections.Subsection, {
    tag: "h5",
    title: "history",
    id: "history-property"
  }, _react.default.createElement("p", null, "You can access the history object that you passed to ", _react.default.createElement(_PrismBlocks.InlineJS, null, "createConfig"), " through the configuration object's history property. This allows you to just pass the configuration object throughout your project instead of both that and the history object."))))));
};

exports.default = _default;

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NPM = function NPM(_ref) {
  var name = _ref.name;
  return _react.default.createElement("div", null, _react.default.createElement("p", null, "You can install the ", _react.default.createElement(_PrismBlocks.InlineJS, null, name), " package from NPM."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "npm install @curi/".concat(name)));
};

var Unpkg = function Unpkg(_ref2) {
  var name = _ref2.name,
      version = _ref2.version,
      globalName = _ref2.globalName;
  return _react.default.createElement("div", null, _react.default.createElement("p", null, "If you prefer to use script tags, ", _react.default.createElement("a", {
    href: "https://unpkg.com"
  }, "Unpkg"), " will always have the latest version of ", _react.default.createElement(_PrismBlocks.InlineJS, null, name), " available for you."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "markup"
  }, "<script src=\"https://unpkg.com/@curi/".concat(name, "@").concat(version, "/dist/curi-").concat(name, ".js\" />")), _react.default.createElement("p", null, "There is also a minimized version available if you change the filename to", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, name, ".min.js"), ". The package will be attached to the window as ", _react.default.createElement(_PrismBlocks.InlineJS, null, "window.", globalName), "."));
};

var _default = function _default(_ref3) {
  var name = _ref3.name,
      version = _ref3.version,
      globalName = _ref3.globalName;
  return _react.default.createElement(_Sections.Section, {
    title: "Installation",
    id: "installation"
  }, _react.default.createElement(NPM, {
    name: name
  }), _react.default.createElement(Unpkg, {
    name: name,
    version: version,
    globalName: globalName
  }));
};

exports.default = _default;

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var about = _ref.about;
  return _react.default.createElement(_Sections.Section, {
    title: "About",
    id: "about"
  }, about);
};

exports.default = _default;

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name,
      dir = _ref.dir;
  return _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/packages/".concat(dir ? dir + '/' : '').concat(name)
  }, _react.default.createElement("img", {
    style: {
      height: 16,
      marginRight: 5
    },
    src: "/static/img/github-logo.png"
  }), "GitHub Repo");
};

exports.default = _default;

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement("a", {
    href: "https://npmjs.com/package/@curi/".concat(name)
  }, _react.default.createElement("img", {
    style: {
      height: 16,
      marginRight: 5
    },
    src: "/static/img/npm-logo.png"
  }), "NPM Package");
};

exports.default = _default;

/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BasePackage = _interopRequireDefault(__webpack_require__(61));

var _APIBlock = _interopRequireDefault(__webpack_require__(62));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name,
      version = _ref.version,
      globalName = _ref.globalName;
  return _react.default.createElement(_BasePackage.default, {
    name: name,
    version: version,
    globalName: globalName,
    about: _react.default.createElement("p", null, "The curi-addon-active package compares a location object's pathname to the current location in order to determine if the location object is \"active\". This can be restricted to complete matches or allow partial matches so that locations that represent an ancestor of the current location are also considered \"active\".")
  }, _react.default.createElement(_APIBlock.default, null, _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "createActiveAddon",
    id: "createActiveAddon"
  }, _react.default.createElement("p", null, "curi-addon-active has one, default export function (so you can import it with whatever name you want to. It is an addon factory that will add an", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "active"), " function to your configuration object's addon property."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import createConfig from '@curi/core';\nimport createActiveAddon from '@curi/addon-active';\n\nconst config = createConfig(history, routes, {\n  addons: [createActiveAddon()]\n});"), _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "active"), " addon function takes four arguments: the name of the route you want to check, the current response object, any params of the route that you want to check, and whether to consider partial matches as active. A partial match would occur when you check an ancestor route of the current route."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const isActive = config.addons.active('Some Route', response, { id: 10 });"))));
};

exports.default = _default;

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BasePackage = _interopRequireDefault(__webpack_require__(61));

var _APIBlock = _interopRequireDefault(__webpack_require__(62));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name,
      version = _ref.version,
      globalName = _ref.globalName;
  return _react.default.createElement(_BasePackage.default, {
    name: name,
    version: version,
    globalName: globalName,
    about: _react.default.createElement("p", null, "This addon allows you to get the names of ancestor routes. This can be useful for generating breadcrumb links.")
  }, _react.default.createElement(_APIBlock.default, null, _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "createAncestorsAddon",
    id: "createAncestorsAddon"
  }, _react.default.createElement("p", null, "curi-addon-ancestors has one, default export function (so you can import it with whatever name you want to. It is an addon factory that will add an", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "ancestors"), " function to your configuration object's addon property."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import createConfig from '@curi/core';\nimport createAncestorsAddon from '@curi/addon-ancestors';\n\nconst routes = [\n  {\n    name: 'Grandparent', path: '0',\n    children: [\n      {\n        name: 'Parent', path: '1',\n        children: [ { name: 'Child', path: '2' } ]\n      }\n    ]\n  }\n];\n\nconst config = createConfig(history,routes, {\n  addons: [createAncestorsAddon()]\n});"), _react.default.createElement("p", null, "The ancestors addon takes the name of the route and the ancestor \"level\" that you want to get. 1 refers to the route's parent, 2 is its grandparent, etc. If the provided value is not a positive integer or if there is no ancestor at the requested level, the addon will return undefined."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const parent = config.addons.ancestors('Child', 1);\n// parent === 'Parent'\n"), _react.default.createElement("p", null, "If the level value is undefined (or null), then you will receive the array of all ancestors. This can be used to build breadcrumbs for a given route."))));
};

exports.default = _default;

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BasePackage = _interopRequireDefault(__webpack_require__(61));

var _APIBlock = _interopRequireDefault(__webpack_require__(62));

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(12);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name,
      version = _ref.version,
      globalName = _ref.globalName;
  return _react.default.createElement(_BasePackage.default, {
    name: name,
    version: version,
    globalName: globalName,
    about: _react.default.createElement("p", null, "The prefetch addon can be used to make data fetching calls prior to navigation by calling a route's ", _react.default.createElement(_PrismBlocks.InlineJS, null, "load"), " function. This is different than calling the load function while generating the response because this is done without actually changing locations.")
  }, _react.default.createElement(_APIBlock.default, null, _react.default.createElement(_Sections.Section, {
    tag: "h3",
    title: "createPrefetchAddon",
    id: "createPrefetchAddon"
  }, _react.default.createElement("p", null, "curi-addon-prefetch has one, default export function (so you can import it with whatever name you want to. It is an addon factory that will add an", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "prefetch"), " function to your configuration object's addon property."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import createConfig from '@curi/core';\nimport prefetch from '@curi/addon-prefetch';\n\nconst config = createConfig(history, routes, { addons: [prefetch()] });\n"), _react.default.createElement("p", null, "The prefetch addon allows you to call a route's load function manually. Why would you want to do this? Preloading data can give your users a faster navigation time when navigating to a page whose data has already been loaded."), _react.default.createElement(_Messages.Note, null, "You should only use this if you implement some sort of caching/lookup in your load functions. The load function will be recalled when the user actually navigates to the route, so the benefit comes from the load function using a cached value instead of sending a new request to your server."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// call a route's load function manually\nconfig.addons.prefetch('User', { id: 2 })"), _react.default.createElement("p", null, "This addon will only register routes that have a load function in their load object."))));
};

exports.default = _default;

/***/ })

});