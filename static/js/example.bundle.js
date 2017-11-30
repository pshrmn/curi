webpackJsonp([0],{

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ActiveLinks = _interopRequireDefault(__webpack_require__(107));

var _Authentication = _interopRequireDefault(__webpack_require__(109));

var _BasicVue = _interopRequireDefault(__webpack_require__(110));

var _BasicSvelte = _interopRequireDefault(__webpack_require__(111));

var _BlockingNavigation = _interopRequireDefault(__webpack_require__(112));

var _BlockingNavigationVue = _interopRequireDefault(__webpack_require__(113));

var _Breadcrumbs = _interopRequireDefault(__webpack_require__(114));

var _BreadcrumbsVue = _interopRequireDefault(__webpack_require__(115));

var _CodeSplitting = _interopRequireDefault(__webpack_require__(116));

var _DataLoading = _interopRequireDefault(__webpack_require__(117));

var _Modal = _interopRequireDefault(__webpack_require__(118));

var _Redux = _interopRequireDefault(__webpack_require__(119));

var _ScriptTags = _interopRequireDefault(__webpack_require__(120));

var _ServerRendering = _interopRequireDefault(__webpack_require__(121));

var _SideEffect = _interopRequireDefault(__webpack_require__(122));

var _Transitions = _interopRequireDefault(__webpack_require__(123));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  'active-links': _ActiveLinks.default,
  'authentication': _Authentication.default,
  'basic-vue': _BasicVue.default,
  'basic-svelte': _BasicSvelte.default,
  'blocking-navigation': _BlockingNavigation.default,
  'blocking-navigation-vue': _BlockingNavigationVue.default,
  'breadcrumbs': _Breadcrumbs.default,
  'breadcrumbs-vue': _BreadcrumbsVue.default,
  'code-splitting': _CodeSplitting.default,
  'data-loading': _DataLoading.default,
  'modal': _Modal.default,
  'redux': _Redux.default,
  'script-tags': _ScriptTags.default,
  'server-rendering': _ServerRendering.default,
  'side-effect': _SideEffect.default,
  'transitions': _Transitions.default
};
exports.default = _default;

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "You may want to style a link differently when it is \"active\" (based on the current response object). You can do so using the active prop of ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), "."), _react.default.createElement("p", null, "The active prop must be an object with a ", _react.default.createElement(_PrismBlocks.InlineJS, null, "merge"), " function as one of its properties. The merge function is responsible for updating the props that will be passed to the anchor (", _react.default.createElement(_PrismBlocks.InlineComponent, null, "a"), ")."), _react.default.createElement("p", null, "You can also pass a ", _react.default.createElement(_PrismBlocks.InlineJS, null, "partial"), " property to the active object. partial should be a boolean, and when it is true (the Link's ", _react.default.createElement(_PrismBlocks.InlineJS, null, "to"), " property is in the response's partials array) it can be \"active\" if its params match the response's params.")), _react.default.createElement(_Sections.Section, {
    title: "Live Demo",
    id: "demo"
  }, _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi/tree/master/examples/active-links"
  })), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/active-links"
  }, "here"), "."));
};

exports.default = _default;

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _examples = _interopRequireDefault(__webpack_require__(8));

var _styleActive = _interopRequireDefault(__webpack_require__(7));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var _ref$withDescription = _ref.withDescription,
      withDescription = _ref$withDescription === void 0 ? false : _ref$withDescription;
  return _react.default.createElement("ul", {
    className: "link-list"
  }, _examples.default.map(function (example) {
    return _react.default.createElement("li", {
      key: example.slug,
      className: withDescription ? 'with' : 'solo'
    }, _react.default.createElement(_react2.Link, {
      to: "Example",
      params: {
        slug: example.slug
      },
      active: {
        merge: _styleActive.default
      }
    }, example.name), withDescription && _react.default.createElement("p", null, example.description));
  }));
};

exports.default = _default;

/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "Sometimes you will want to redirect based on the results of your load function. For instance, you might see that a user is not authenticated and shouldn't be able to view a page."), _react.default.createElement("p", null, "When this happens, your load function should modify the response by calling its redirect method."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const routes = [\n  // ...,\n  {\n    name: 'Protected',\n    path: 'super-secret',\n    load: (resp) => {\n      if (!store.userIsAuthenticated) {\n        resp.redirect('/login', 302);\n      }\n    }\n  }\n];"), _react.default.createElement("p", null, "Then, in your render function (the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Navigator"), "'s children prop), you would check the if the response's ", _react.default.createElement(_PrismBlocks.InlineJS, null, "redirectTo"), " property is set. If it is, you could manually redirect using", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "config.history"), " or just render a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Redirect"), " and that will be handled for you."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "function render(response, config) {\n  if (response.redirectTo) {\n    return <Redirect to={response.redirectTo} />\n  }\n  // ...\n}")), _react.default.createElement(_Sections.Section, {
    title: "Live Demo",
    id: "demo"
  }, _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi/tree/master/examples/authentication"
  })), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/authentication"
  }, "here"), "."));
};

exports.default = _default;

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(12);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "While Vue does have an official router, this project shows how you could use Curi as the router for a Vue project instead. It uses ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"), ' ', "component provided by the the curi-vue package. Unlike the React examples, which use a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Navigator"), " component to automatically subscribe, here we are manually subscribing to navigation changes. We keep a reactive response object on our view model in order to automatically re-render when a new response is generated.")), _react.default.createElement(_Sections.Section, {
    title: "Live Demo",
    id: "demo"
  }, _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi/tree/master/examples/basic-vue"
  })), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, _react.default.createElement("p", null, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/basic-vue"
  }, "here"), "."), _react.default.createElement(_Messages.Note, null, "If you are experienced with Vue, you will probably notice that the layout of this application is not optimal. That is a just testament to my lack of familiarity with Vue. Hopefully will be fixed as I learn the best practices. Please feel free to point out any issues and I will update this example.")));
};

exports.default = _default;

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(12);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "There are a couple things to keep in mind when using Svelte:"), _react.default.createElement("p", null, "The first is that ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), "s need to access your Curi configuration object in order to navigate/create ", _react.default.createElement(_PrismBlocks.InlineJS, null, "href"), "s. In theory you can pass this purely through component attributes, but that can get old quite quickly. Instead,", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/svelte"), " provides a ", _react.default.createElement(_PrismBlocks.InlineJS, null, "setConfig"), " function to store your configuration object, allowing the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), " to just import it. Once you have created your configuration object, you should call ", _react.default.createElement(_PrismBlocks.InlineJS, null, "setConfig(config)"), ' ', "(where config is your configuration object)."), _react.default.createElement("p", null, "The second thing is how to re-render your application when the location changes. By having the route's ", _react.default.createElement(_PrismBlocks.InlineJS, null, "body"), " functions return Svelte render functions, we can just call ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response.body"), " to render our view. Of course, we will want to destroy the current view before doing this. All of this should be done in a subscription function (", _react.default.createElement(_PrismBlocks.InlineJS, null, "config.subscribe(fn)"), ").")), _react.default.createElement(_Sections.Section, {
    title: "Live Demo",
    id: "demo"
  }, _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi/tree/master/examples/basic-svelte"
  })), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, _react.default.createElement("p", null, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/basic-svelte"
  }, "here"), ".")));
};

exports.default = _default;

/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "Sometimes, you don't want the user to leave the page. Ideally, this is for their own good, such as when a form is half filled out, and not becacuse you're running a spam site."), _react.default.createElement("p", null, "When you want to do this, you can use the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Block"), " component from react-curi to display a user confirmation that requires user input before navigation will occur.")), _react.default.createElement(_Sections.Section, {
    title: "Live Demo",
    id: "demo"
  }, _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi/tree/master/examples/blocking-navigation"
  })), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/blocking-navigation"
  }, "here"), "."));
};

exports.default = _default;

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "Sometimes, you don't want the user to leave the page. Ideally, this is for their own good, such as when a form is half filled out, and not becacuse you're running a spam site."), _react.default.createElement("p", null, "When you want to do this, you can use the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-block"), " component from react-curi to display a user confirmation that requires user input before navigation will occur.")), _react.default.createElement(_Sections.Section, {
    title: "Live Demo",
    id: "demo"
  }, _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi/tree/master/examples/blocking-navigation-vue"
  })), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/blocking-navigation-vue"
  }, "here"), "."));
};

exports.default = _default;

/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _Sections = __webpack_require__(55);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "You can easily generate breadcrumb navigation links for the current route using the curi-addon-ancestors package. This allows you to get the route names for the current route. Using these names you can render a Link for each one (passing the parameters if necessary).")), _react.default.createElement(_Sections.Section, {
    title: "Live Demo",
    id: "demo"
  }, _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi/tree/master/examples/breadcrumbs"
  })), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/breadcrumbs"
  }, "here"), "."));
};

exports.default = _default;

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _Sections = __webpack_require__(55);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "You can easily generate breadcrumb navigation links for the current route using the curi-addon-ancestors package. This allows you to get the route names for the current route. Using these names you can render a Link for each one (passing the parameters if necessary).")), _react.default.createElement(_Sections.Section, {
    title: "Live Demo",
    id: "demo"
  }, _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi/tree/master/examples/breadcrumbs-vue"
  })), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/breadcrumbs-vue"
  }, "here"), "."));
};

exports.default = _default;

/***/ }),

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _react2 = __webpack_require__(1);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "Code splitting with curi routes is done using the preload property. The", ' ', _react.default.createElement(_react2.Link, {
    to: "Guide",
    params: {
      slug: 'code-splitting'
    }
  }, "code splitting"), " guide covers the basic principles for how to do this. This example just provides you with code that actually implements what is explained there.")), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/code-splitting"
  }, "here"), "."));
};

exports.default = _default;

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "When a user navigates to one of your routes, the re-rendering will not be triggered until a response has been created. If the route that matches has a `load` function that has to make a request to the server, the re-render will be delayed, possibly giving the user the impression that nothing is happening. One way that you can attempt to show that something is happening is by adding a loading bar to your page that will demonstrate to the user that their request is going through."), _react.default.createElement("p", null, "The `nprogress` package allows you to render a loading bar that will run across the top of your page. There are many possible solutions, but this one is very easy to use, so it works well for our example. The basis of what we will do is to tell `nprogress` to start when the user clicks a link, and then when we re-render, we tell `nprogres` that we are done loading."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// when the user clicks a <Link>\nnprogress.start();\n// when we are re-rendering\nnprogress.done();\n"), _react.default.createElement("p", null, "The example implementation can definitely be improved. Currently we are calling", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "nprogress.done()"), " as a side-effect of our render function. This is not ideal, but again, this is just a minimum viable example. In your own application, you could add a subscriber or use a Curi side-effect.")), _react.default.createElement(_Sections.Section, {
    title: "Live Demo",
    id: "demo"
  }, _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi/tree/master/examples/data-loading"
  })), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/prefetch-data"
  }, "here"), "."));
};

exports.default = _default;

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slug = 'modal';
var name = 'Modal';

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "This example mimics the way that Pinterest works. Whether or not this is a good design pattern is up for debate, but at the very least it is helpful to see one way that you can do this with Curi."), _react.default.createElement("p", null, "If you are unfamiliar with the Pinterest model, this is how it works: when you navigate to a \"modal route\" from within the application, the route will open in a modal window (preserving the background content from the page that the user navigated from). However, if you load the same location manually, it will render the location in a full window."), _react.default.createElement("p", null, "You will have to take a number of things into consideration when implementing this:"), _react.default.createElement("p", null, "The first is how to know whether to render a modal window or a full page. The easiest way to do his is to use ", _react.default.createElement(_PrismBlocks.InlineJS, null, "location.state"), " to attach a value to the location that indicates that you want to render a modal. State is persistent across refreshes and the user clicking the browser's forward/back buttons, so you will also have to take that into consideration."), _react.default.createElement("p", null, "Second, you will also have to implement some mechanism to render the base layer (under the modal) using the previous location. In a React application, you can do this by storing the previous", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "props.children"), "."), _react.default.createElement("p", null)), _react.default.createElement(_Sections.Section, {
    title: "Live Demo",
    id: "demo"
  }, _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi/tree/master/examples/modal"
  })), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/modal"
  }, "here"), "."));
};

exports.default = _default;

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "Redux is straightforward to integrate with a Curi project."), _react.default.createElement("p", null, "You will most likely want to export your store from its own module so that it can be imported throughout your project. Then, any routes that need data to be loaded prior to rendering would dispatch to the store from their load function."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import store from './store';\nimport setData from './actions';\nconst routes = [\n  // ...,\n  {\n    name: 'Data',\n    path: 'data/:id'\n    value: Data,\n    load: (resp) => {\n      const { id } = resp.params;\n      // get the data associated with the id\n      return fetch(`/api/data/${id}`)\n        .then(data => {\n          store.dispatch(setData(data));\n        });\n    }\n  }\n  // ...\n];")), _react.default.createElement(_Sections.Section, {
    title: "Live Demo",
    id: "demo"
  }, _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi/tree/master/examples/redux"
  })), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/redux"
  }, "here"), "."));
};

exports.default = _default;

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "This example uses unbundled JavaScript and script tags to serve its content.If you want to use ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "script"), " tags in your application, Curi does provide builds for that. You can easily use ", _react.default.createElement("a", {
    href: "https://unpkg.com"
  }, "unpkg"), " to load the scripts, or download and serve them yourself."), _react.default.createElement("p", null, "The global variable names for each package is upper camel case, so the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "curi"), ' ', "package is globally available as ", _react.default.createElement(_PrismBlocks.InlineJS, null, "Curi"), " and the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "curi-react"), ' ', "package is globally available as ", _react.default.createElement(_PrismBlocks.InlineJS, null, "CuriReact"), ".")), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/umd-example"
  }, "here"), "."));
};

exports.default = _default;

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "Server rendering with Curi is fairly straightforward. You should have a catch all route handler that will respond to all (non-static file) requests."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "function catchAll(req, res) {\n  // 1. Create a memory history using the requested location\n  const history = InMemory({ locations: [req.url]});\n\n  // 2. Create a config\n  const config = createConfig(history, routes);\n\n  // 3. Subscribe to the config object\n  config.subscribe((response, action) => {\n      // 4. Generate the HTML markup by rendering a <Navigator> and\n      // passing it the response\n      const markup = renderToString(\n        <Navigator\n          response={response}\n          action={action}\n          config={config}\n          render={renderFunction}\n        />\n      );\n      // 5. Insert the markup into the page's html and send it\n      res.send(renderFullPage(markup));\n    })\n    .catch(err => {\n      // 6. You should also handle any errors that might occur\n    });\n}"), _react.default.createElement("p", null, "The above example is very basic. Some other things that you might need to consider are:"), _react.default.createElement("ul", null, _react.default.createElement("li", null, "Data loading \u2014 You would need to maintain two copies of your routes if you want to handle data fetching on the server differently than it works on the client side. This is not something that I have explored very closely yet, so I don't have any recommendations on exactly how to approach this."), _react.default.createElement("li", null, "Code splitting \u2014 In order to use dynamic imports on the server, you will probably need to use a Babel plugin like dynamic-import-node. Unfortunately, dynamic-import-node breaks Webpack's code splitting. In order for your code to be split into multiple bundles, you should ensure that dynamic-import-node isn't being run when building your client side bundle. The solution used in this experiment is to use the env property.", _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "{\n  \"presets\": [ \"es2015\", \"react\" ],\n  \"plugins\": [\n    \"syntax-dynamic-import\"\n  ],\n  \"env\": {\n    \"server\": {\n      \"plugins\": [\"dynamic-import-node\"]\n    }\n  }\n}"), "Then, when starting the server, make sure that BABEL_ENV=server.", _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "markup"
  }, "cross-env BABEL_ENV=server npm start")))), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/server-rendering"
  }, "here"), "."));
};

exports.default = _default;

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "Side effects are pretty straightforward. Once a response has completed (any preload and load functions have resolved), the response's properties are used to create a JavaScript object. Then, any subscribed functions are called and passed that JavaScript object as their argument. Between those two steps, side effect functions can be run. They receive the new response as well as the action type used to trigger the navigation (POP, PUSH, or REPLACE)."), _react.default.createElement("p", null, "A side effect function just does something using its arguments. It is basically a subscriber, but a permanent one (cannot be removed)."), _react.default.createElement("p", null, "You pass any side effect functions that you want to use to the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "createConfig"), " call, using the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "sideEffects"), " property of the options object."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import createConfig from 'curi';\nimport mySideEffect from './mySideEffect';\n\nconst config = createConfig(history, routes, {\n  sideEffects: [mySideEffect]\n});")), _react.default.createElement(_Sections.Section, {
    title: "Live Demo",
    id: "demo"
  }, _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi/tree/master/examples/side-effect"
  })), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/side-effect"
  }, "here"), "."));
};

exports.default = _default;

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _BaseExample = _interopRequireDefault(__webpack_require__(57));

var _PrismBlocks = __webpack_require__(2);

var _Sections = __webpack_require__(55);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var name = _ref.name;
  return _react.default.createElement(_BaseExample.default, null, _react.default.createElement("h1", null, name), _react.default.createElement(_Sections.Section, {
    title: "Explanation",
    id: "explanation"
  }, _react.default.createElement("p", null, "This example uses ", _react.default.createElement(_PrismBlocks.InlineJS, null, "react-transition-group"), " (v1) to animate navigation transitions, but it should be relatively straightforward to adapt this for other animation packages (e.g. react-motion)."), _react.default.createElement("p", null, "All that this does is to render a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "CSSTransitionGroup"), " around the response's body. The only other thing that you need to do is to set a key on the rendered component, which is necessary for ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "CSSTransitionGroup"), " to know which of its children are entering/leaving/staying."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "function render(response) {\n  return (\n    <CSSTransitionGroup>\n      <response.body key={response.location.pathname} />\n    </CSSTransitionGroup>\n  );\n}")), _react.default.createElement(_Sections.Section, {
    title: "Live Demo",
    id: "demo"
  }, _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi/tree/master/examples/transitions"
  })), _react.default.createElement(_Sections.Section, {
    title: "On GitHub",
    id: "source"
  }, "If you want to run this code locally, the source code is available on GitHub", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples/transitions"
  }, "here"), "."));
};

exports.default = _default;

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _Examples = _interopRequireDefault(__webpack_require__(106));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var params = _ref.params,
      data = _ref.data;

  if (!data) {
    return _react.default.createElement("div", null, "The requested example could not be found.");
  }

  var Component = _Examples.default[params.slug];
  return _react.default.createElement(Component, {
    name: data.name
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

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodeSandboxDemo = function CodeSandboxDemo(_ref) {
  var id = _ref.id;
  return _react.default.createElement("div", {
    className: "demo"
  }, _react.default.createElement("iframe", {
    src: "https://codesandbox.io/embed/".concat(id),
    width: "100%",
    height: "600px",
    sandbox: "allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  }), _react.default.createElement("p", null, "Use the three buttons at the top of the Sandbox to toggle view modes. Clicking the menu button in the top left corner opens a menu that allows you to switch between files."));
};

var _default = CodeSandboxDemo;
exports.default = _default;

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _ExampleLinks = _interopRequireDefault(__webpack_require__(108));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var children = _ref.children;
  return _react.default.createElement("div", {
    className: "example"
  }, _react.default.createElement("div", {
    className: "content"
  }, children || null), _react.default.createElement("div", {
    className: "sidebar"
  }, _react.default.createElement("h2", null, "Examples"), _react.default.createElement(_ExampleLinks.default, null)));
};

exports.default = _default;

/***/ })

});