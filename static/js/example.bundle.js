webpackJsonp([0],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActiveLinks = __webpack_require__(101);

var _ActiveLinks2 = _interopRequireDefault(_ActiveLinks);

var _Authentication = __webpack_require__(103);

var _Authentication2 = _interopRequireDefault(_Authentication);

var _BasicVue = __webpack_require__(104);

var _BasicVue2 = _interopRequireDefault(_BasicVue);

var _BasicSvelte = __webpack_require__(105);

var _BasicSvelte2 = _interopRequireDefault(_BasicSvelte);

var _BlockingNavigation = __webpack_require__(106);

var _BlockingNavigation2 = _interopRequireDefault(_BlockingNavigation);

var _BlockingNavigationVue = __webpack_require__(107);

var _BlockingNavigationVue2 = _interopRequireDefault(_BlockingNavigationVue);

var _Breadcrumbs = __webpack_require__(108);

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _BreadcrumbsVue = __webpack_require__(109);

var _BreadcrumbsVue2 = _interopRequireDefault(_BreadcrumbsVue);

var _CodeSplitting = __webpack_require__(110);

var _CodeSplitting2 = _interopRequireDefault(_CodeSplitting);

var _DataLoading = __webpack_require__(111);

var _DataLoading2 = _interopRequireDefault(_DataLoading);

var _Modal = __webpack_require__(112);

var _Modal2 = _interopRequireDefault(_Modal);

var _Redux = __webpack_require__(113);

var _Redux2 = _interopRequireDefault(_Redux);

var _ScriptTags = __webpack_require__(114);

var _ScriptTags2 = _interopRequireDefault(_ScriptTags);

var _ServerRendering = __webpack_require__(115);

var _ServerRendering2 = _interopRequireDefault(_ServerRendering);

var _SideEffect = __webpack_require__(116);

var _SideEffect2 = _interopRequireDefault(_SideEffect);

var _Transitions = __webpack_require__(117);

var _Transitions2 = _interopRequireDefault(_Transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  'active-links': _ActiveLinks2.default,
  'authentication': _Authentication2.default,
  'basic-vue': _BasicVue2.default,
  'basic-svelte': _BasicSvelte2.default,
  'blocking-navigation': _BlockingNavigation2.default,
  'blocking-navigation-vue': _BlockingNavigationVue2.default,
  'breadcrumbs': _Breadcrumbs2.default,
  'breadcrumbs-vue': _BreadcrumbsVue2.default,
  'code-splitting': _CodeSplitting2.default,
  'data-loading': _DataLoading2.default,
  'modal': _Modal2.default,
  'redux': _Redux2.default,
  'script-tags': _ScriptTags2.default,
  'server-rendering': _ServerRendering2.default,
  'side-effect': _SideEffect2.default,
  'transitions': _Transitions2.default
};

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

var _CodeSandboxDemo = __webpack_require__(53);

var _CodeSandboxDemo2 = _interopRequireDefault(_CodeSandboxDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'You may want to style a link differently when it is "active" (based on the current response object). You can do so using the active prop of ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'Link'
        ),
        '.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The active prop must be an object with a ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'merge'
        ),
        ' function as one of its properties. The merge function is responsible for updating the props that will be passed to the anchor (',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'a'
        ),
        ').'
      ),
      _react2.default.createElement(
        'p',
        null,
        'You can also pass a ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'partial'
        ),
        ' property to the active object. partial should be a boolean, and when it is true (the Link\'s ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'to'
        ),
        ' property is in the response\'s partials array) it can be "active" if its params match the response\'s params.'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Live Demo',
        id: 'demo'
      },
      _react2.default.createElement(_CodeSandboxDemo2.default, { id: 'github/pshrmn/curi/tree/master/examples/active-links' })
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      'If you want to run this code locally, the source code is available on GitHub',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/tree/master/examples/active-links' },
        'here'
      ),
      '.'
    )
  );
};

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(1);

var _examples = __webpack_require__(8);

var _examples2 = _interopRequireDefault(_examples);

var _styleActive = __webpack_require__(7);

var _styleActive2 = _interopRequireDefault(_styleActive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var _ref$withDescription = _ref.withDescription,
      withDescription = _ref$withDescription === undefined ? false : _ref$withDescription;
  return _react2.default.createElement(
    'ul',
    { className: 'link-list' },
    _examples2.default.map(function (example) {
      return _react2.default.createElement(
        'li',
        { key: example.slug, className: withDescription ? 'with' : 'solo' },
        _react2.default.createElement(
          _react3.Link,
          {
            to: 'Example',
            params: { slug: example.slug },
            active: { merge: _styleActive2.default }
          },
          example.name
        ),
        withDescription && _react2.default.createElement(
          'p',
          null,
          example.description
        )
      );
    })
  );
};

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

var _CodeSandboxDemo = __webpack_require__(53);

var _CodeSandboxDemo2 = _interopRequireDefault(_CodeSandboxDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'Sometimes you will want to redirect based on the results of your load function. For instance, you might see that a user is not authenticated and shouldn\'t be able to view a page.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'When this happens, your load function should modify the response by calling its redirect method.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const routes = [\n  // ...,\n  {\n    name: \'Protected\',\n    path: \'super-secret\',\n    load: (resp) => {\n      if (!store.userIsAuthenticated) {\n        resp.redirect(\'/login\', 302);\n      }\n    }\n  }\n];'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Then, in your render function (the ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'Navigator'
        ),
        '\'s children prop), you would check the if the response\'s ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'redirectTo'
        ),
        ' property is set. If it is, you could manually redirect using',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'config.history'
        ),
        ' or just render a ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'Redirect'
        ),
        ' and that will be handled for you.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'function render(response, config) {\n  if (response.redirectTo) {\n    return <Redirect to={response.redirectTo} />\n  }\n  // ...\n}'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Live Demo',
        id: 'demo'
      },
      _react2.default.createElement(_CodeSandboxDemo2.default, { id: 'github/pshrmn/curi/tree/master/examples/authentication' })
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      'If you want to run this code locally, the source code is available on GitHub',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/tree/master/examples/authentication' },
        'here'
      ),
      '.'
    )
  );
};

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _CodeSandboxDemo = __webpack_require__(53);

var _CodeSandboxDemo2 = _interopRequireDefault(_CodeSandboxDemo);

var _PrismBlocks = __webpack_require__(6);

var _Messages = __webpack_require__(12);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'While Vue does have an official router, this project shows how you could use Curi as the router for a Vue project instead. It uses ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'curi-link'
        ),
        ' ',
        'component provided by the the curi-vue package. Unlike the React examples, which use a ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'Navigator'
        ),
        ' component to automatically subscribe, here we are manually subscribing to navigation changes. We keep a reactive response object on our view model in order to automatically re-render when a new response is generated.'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Live Demo',
        id: 'demo'
      },
      _react2.default.createElement(_CodeSandboxDemo2.default, { id: 'github/pshrmn/curi/tree/master/examples/basic-vue' })
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      _react2.default.createElement(
        'p',
        null,
        'If you want to run this code locally, the source code is available on GitHub',
        ' ',
        _react2.default.createElement(
          'a',
          { href: 'https://github.com/pshrmn/curi/tree/master/examples/basic-vue' },
          'here'
        ),
        '.'
      ),
      _react2.default.createElement(
        _Messages.Note,
        null,
        'If you are experienced with Vue, you will probably notice that the layout of this application is not optimal. That is a just testament to my lack of familiarity with Vue. Hopefully will be fixed as I learn the best practices. Please feel free to point out any issues and I will update this example.'
      )
    )
  );
};

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _CodeSandboxDemo = __webpack_require__(53);

var _CodeSandboxDemo2 = _interopRequireDefault(_CodeSandboxDemo);

var _PrismBlocks = __webpack_require__(6);

var _Messages = __webpack_require__(12);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'There are a couple things to keep in mind when using Svelte:'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The first is that ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'Link'
        ),
        's need to access your Curi configuration object in order to navigate/create ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'href'
        ),
        's. In theory you can pass this purely through component attributes, but that can get old quite quickly. Instead,',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '@curi/svelte'
        ),
        ' provides a ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'setConfig'
        ),
        ' function to store your configuration object, allowing the ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'Link'
        ),
        ' to just import it. Once you have created your configuration object, you should call ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'setConfig(config)'
        ),
        ' ',
        '(where config is your configuration object).'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The second thing is how to re-render your application when the location changes. By having the route\'s ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'body'
        ),
        ' functions return Svelte render functions, we can just call ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'response.body'
        ),
        ' to render our view. Of course, we will want to destroy the current view before doing this. All of this should be done in a subscription function (',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'config.subscribe(fn)'
        ),
        ').'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Live Demo',
        id: 'demo'
      },
      _react2.default.createElement(_CodeSandboxDemo2.default, { id: 'github/pshrmn/curi/tree/master/examples/basic-svelte' })
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      _react2.default.createElement(
        'p',
        null,
        'If you want to run this code locally, the source code is available on GitHub',
        ' ',
        _react2.default.createElement(
          'a',
          { href: 'https://github.com/pshrmn/curi/tree/master/examples/basic-svelte' },
          'here'
        ),
        '.'
      )
    )
  );
};

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

var _CodeSandboxDemo = __webpack_require__(53);

var _CodeSandboxDemo2 = _interopRequireDefault(_CodeSandboxDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'Sometimes, you don\'t want the user to leave the page. Ideally, this is for their own good, such as when a form is half filled out, and not becacuse you\'re running a spam site.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'When you want to do this, you can use the ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'Block'
        ),
        ' component from react-curi to display a user confirmation that requires user input before navigation will occur.'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Live Demo',
        id: 'demo'
      },
      _react2.default.createElement(_CodeSandboxDemo2.default, { id: 'github/pshrmn/curi/tree/master/examples/blocking-navigation' })
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      'If you want to run this code locally, the source code is available on GitHub',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/tree/master/examples/blocking-navigation' },
        'here'
      ),
      '.'
    )
  );
};

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

var _CodeSandboxDemo = __webpack_require__(53);

var _CodeSandboxDemo2 = _interopRequireDefault(_CodeSandboxDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'Sometimes, you don\'t want the user to leave the page. Ideally, this is for their own good, such as when a form is half filled out, and not becacuse you\'re running a spam site.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'When you want to do this, you can use the ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'curi-block'
        ),
        ' component from react-curi to display a user confirmation that requires user input before navigation will occur.'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Live Demo',
        id: 'demo'
      },
      _react2.default.createElement(_CodeSandboxDemo2.default, { id: 'github/pshrmn/curi/tree/master/examples/blocking-navigation-vue' })
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      'If you want to run this code locally, the source code is available on GitHub',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/tree/master/examples/blocking-navigation-vue' },
        'here'
      ),
      '.'
    )
  );
};

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _Sections = __webpack_require__(50);

var _CodeSandboxDemo = __webpack_require__(53);

var _CodeSandboxDemo2 = _interopRequireDefault(_CodeSandboxDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'You can easily generate breadcrumb navigation links for the current route using the curi-addon-ancestors package. This allows you to get the route names for the current route. Using these names you can render a Link for each one (passing the parameters if necessary).'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Live Demo',
        id: 'demo'
      },
      _react2.default.createElement(_CodeSandboxDemo2.default, { id: 'github/pshrmn/curi/tree/master/examples/breadcrumbs' })
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      'If you want to run this code locally, the source code is available on GitHub',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/tree/master/examples/breadcrumbs' },
        'here'
      ),
      '.'
    )
  );
};

/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _Sections = __webpack_require__(50);

var _CodeSandboxDemo = __webpack_require__(53);

var _CodeSandboxDemo2 = _interopRequireDefault(_CodeSandboxDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'You can easily generate breadcrumb navigation links for the current route using the curi-addon-ancestors package. This allows you to get the route names for the current route. Using these names you can render a Link for each one (passing the parameters if necessary).'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Live Demo',
        id: 'demo'
      },
      _react2.default.createElement(_CodeSandboxDemo2.default, { id: 'github/pshrmn/curi/tree/master/examples/breadcrumbs-vue' })
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      'If you want to run this code locally, the source code is available on GitHub',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/tree/master/examples/breadcrumbs-vue' },
        'here'
      ),
      '.'
    )
  );
};

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _react3 = __webpack_require__(1);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'Code splitting with curi routes is done using the preload property. The',
        ' ',
        _react2.default.createElement(
          _react3.Link,
          { to: 'Guide', params: { slug: 'code-splitting' } },
          'code splitting'
        ),
        ' guide covers the basic principles for how to do this. This example just provides you with code that actually implements what is explained there.'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      'If you want to run this code locally, the source code is available on GitHub',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/tree/master/examples/code-splitting' },
        'here'
      ),
      '.'
    )
  );
};

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

var _CodeSandboxDemo = __webpack_require__(53);

var _CodeSandboxDemo2 = _interopRequireDefault(_CodeSandboxDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'When a user navigates to one of your routes, the re-rendering will not be triggered until a response has been created. If the route that matches has a `load` function that has to make a request to the server, the re-render will be delayed, possibly giving the user the impression that nothing is happening. One way that you can attempt to show that something is happening is by adding a loading bar to your page that will demonstrate to the user that their request is going through.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The `nprogress` package allows you to render a loading bar that will run across the top of your page. There are many possible solutions, but this one is very easy to use, so it works well for our example. The basis of what we will do is to tell `nprogress` to start when the user clicks a link, and then when we re-render, we tell `nprogres` that we are done loading.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '// when the user clicks a <Link>\nnprogress.start();\n// when we are re-rendering\nnprogress.done();\n'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The example implementation can definitely be improved. Currently we are calling',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'nprogress.done()'
        ),
        ' as a side-effect of our render function. This is not ideal, but again, this is just a minimum viable example. In your own application, you could add a subscriber or use a Curi side-effect.'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Live Demo',
        id: 'demo'
      },
      _react2.default.createElement(_CodeSandboxDemo2.default, { id: 'github/pshrmn/curi/tree/master/examples/data-loading' })
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      'If you want to run this code locally, the source code is available on GitHub',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/tree/master/examples/prefetch-data' },
        'here'
      ),
      '.'
    )
  );
};

/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

var _CodeSandboxDemo = __webpack_require__(53);

var _CodeSandboxDemo2 = _interopRequireDefault(_CodeSandboxDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slug = 'modal';
var name = 'Modal';

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'This example mimics the way that Pinterest works. Whether or not this is a good design pattern is up for debate, but at the very least it is helpful to see one way that you can do this with Curi.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'If you are unfamiliar with the Pinterest model, this is how it works: when you navigate to a "modal route" from within the application, the route will open in a modal window (preserving the background content from the page that the user navigated from). However, if you load the same location manually, it will render the location in a full window.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'You will have to take a number of things into consideration when implementing this:'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The first is how to know whether to render a modal window or a full page. The easiest way to do his is to use ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'location.state'
        ),
        ' to attach a value to the location that indicates that you want to render a modal. State is persistent across refreshes and the user clicking the browser\'s forward/back buttons, so you will also have to take that into consideration.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Second, you will also have to implement some mechanism to render the base layer (under the modal) using the previous location. In a React application, you can do this by storing the previous',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'props.children'
        ),
        '.'
      ),
      _react2.default.createElement('p', null)
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Live Demo',
        id: 'demo'
      },
      _react2.default.createElement(_CodeSandboxDemo2.default, { id: 'github/pshrmn/curi/tree/master/examples/modal' })
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      'If you want to run this code locally, the source code is available on GitHub',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/tree/master/examples/modal' },
        'here'
      ),
      '.'
    )
  );
};

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

var _CodeSandboxDemo = __webpack_require__(53);

var _CodeSandboxDemo2 = _interopRequireDefault(_CodeSandboxDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'Redux is straightforward to integrate with a Curi project.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'You will most likely want to export your store from its own module so that it can be imported throughout your project. Then, any routes that need data to be loaded prior to rendering would dispatch to the store from their load function.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import store from \'./store\';\nimport setData from \'./actions\';\nconst routes = [\n  // ...,\n  {\n    name: \'Data\',\n    path: \'data/:id\'\n    value: Data,\n    load: (resp) => {\n      const { id } = resp.params;\n      // get the data associated with the id\n      return fetch(`/api/data/${id}`)\n        .then(data => {\n          store.dispatch(setData(data));\n        });\n    }\n  }\n  // ...\n];'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Live Demo',
        id: 'demo'
      },
      _react2.default.createElement(_CodeSandboxDemo2.default, { id: 'github/pshrmn/curi/tree/master/examples/redux' })
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      'If you want to run this code locally, the source code is available on GitHub',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/tree/master/examples/redux' },
        'here'
      ),
      '.'
    )
  );
};

/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'This example uses unbundled JavaScript and script tags to serve its content.If you want to use ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'script'
        ),
        ' tags in your application, Curi does provide builds for that. You can easily use ',
        _react2.default.createElement(
          'a',
          { href: 'https://unpkg.com' },
          'unpkg'
        ),
        ' to load the scripts, or download and serve them yourself.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The global variable names for each package is upper camel case, so the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'curi'
        ),
        ' ',
        'package is globally available as ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'Curi'
        ),
        ' and the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'curi-react'
        ),
        ' ',
        'package is globally available as ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'CuriReact'
        ),
        '.'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      'If you want to run this code locally, the source code is available on GitHub',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/tree/master/examples/umd-example' },
        'here'
      ),
      '.'
    )
  );
};

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'Server rendering with Curi is fairly straightforward. You should have a catch all route handler that will respond to all (non-static file) requests.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'function catchAll(req, res) {\n  // 1. Create a memory history using the requested location\n  const history = InMemory({ locations: [req.url]});\n\n  // 2. Create a config\n  const config = createConfig(history, routes);\n\n  // 3. Wait for the initial location\'s response to finish\n  config.ready()\n    .then(response => {\n      // 4. Generate the HTML markup by rendering a <Navigator> and\n      // passing it the response\n      const markup = renderToString(\n        <Navigator response={response} config={config} children={renderFunction} />\n      );\n      // 5. Insert the markup into the page\'s html and send it\n      res.send(renderFullPage(markup));\n    })\n    .catch(err => {\n      // 6. You should also handle any errors that might occur\n    });\n}'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The above example is very basic. Some other things that you might need to consider are:'
      ),
      _react2.default.createElement(
        'ul',
        null,
        _react2.default.createElement(
          'li',
          null,
          'redirects \u2014 You should redirect instead of rendering markup when redirectTo is set.',
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'javascript' },
            'config.ready()\n  .then(response => {\n    if (response.redirectTo) {\n      res.redirect(response.redirectTo);\n    }\n    // ...\n  });'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          'Data loading \u2014 You would need to maintain two copies of your routes if you want to handle data fetching on the server differently than it works on the client side. This is not something that I have explored very closely yet, so I don\'t have any recommendations on exactly how to approach this.'
        ),
        _react2.default.createElement(
          'li',
          null,
          'Code splitting \u2014 In order to use dynamic imports on the server, you will probably need to use a Babel plugin like dynamic-import-node. Unfortunately, dynamic-import-node breaks Webpack\'s code splitting. In order for your code to be split into multiple bundles, you should ensure that dynamic-import-node isn\'t being run when building your client side bundle. The solution used in this experiment is to use the env property.',
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'javascript' },
            '{\n  "presets": [ "es2015", "react" ],\n  "plugins": [\n    "syntax-dynamic-import"\n  ],\n  "env": {\n    "server": {\n      "plugins": ["dynamic-import-node"]\n    }\n  }\n}'
          ),
          'Then, when starting the server, make sure that BABEL_ENV=server.',
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'markup' },
            'cross-env BABEL_ENV=server npm start'
          )
        )
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      'If you want to run this code locally, the source code is available on GitHub',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/tree/master/examples/server-rendering' },
        'here'
      ),
      '.'
    )
  );
};

/***/ }),

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

var _CodeSandboxDemo = __webpack_require__(53);

var _CodeSandboxDemo2 = _interopRequireDefault(_CodeSandboxDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'Side effects are pretty straightforward. Once a response has completed (any preload and load functions have resolved), the response\'s properties are used to create a JavaScript object. Then, any subscribed functions are called and passed that JavaScript object as their argument. Between those two steps, side effect functions can be run. They receive the new response as well as the action type used to trigger the navigation (POP, PUSH, or REPLACE).'
      ),
      _react2.default.createElement(
        'p',
        null,
        'A side effect function just does something using its arguments. It is basically a subscriber, but a permanent one (cannot be removed).'
      ),
      _react2.default.createElement(
        'p',
        null,
        'You pass any side effect functions that you want to use to the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'createConfig'
        ),
        ' call, using the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'sideEffects'
        ),
        ' property of the options object.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import createConfig from \'curi\';\nimport mySideEffect from \'./mySideEffect\';\n\nconst config = createConfig(history, routes, {\n  sideEffects: [mySideEffect]\n});'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Live Demo',
        id: 'demo'
      },
      _react2.default.createElement(_CodeSandboxDemo2.default, { id: 'github/pshrmn/curi/tree/master/examples/side-effect' })
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      'If you want to run this code locally, the source code is available on GitHub',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/tree/master/examples/side-effect' },
        'here'
      ),
      '.'
    )
  );
};

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseExample = __webpack_require__(51);

var _BaseExample2 = _interopRequireDefault(_BaseExample);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

var _CodeSandboxDemo = __webpack_require__(53);

var _CodeSandboxDemo2 = _interopRequireDefault(_CodeSandboxDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseExample2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Explanation',
        id: 'explanation'
      },
      _react2.default.createElement(
        'p',
        null,
        'This example uses ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'react-transition-group'
        ),
        ' (v1) to animate navigation transitions, but it should be relatively straightforward to adapt this for other animation packages (e.g. react-motion).'
      ),
      _react2.default.createElement(
        'p',
        null,
        'All that this does is to render a ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'CSSTransitionGroup'
        ),
        ' around the response\'s body. The only other thing that you need to do is to set a key on the rendered component, which is necessary for ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'CSSTransitionGroup'
        ),
        ' to know which of its children are entering/leaving/staying.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'jsx' },
        'function render(response) {\n  return (\n    <CSSTransitionGroup>\n      <response.body key={response.location.pathname} />\n    </CSSTransitionGroup>\n  );\n}'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Live Demo',
        id: 'demo'
      },
      _react2.default.createElement(_CodeSandboxDemo2.default, { id: 'github/pshrmn/curi/tree/master/examples/transitions' })
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'On GitHub',
        id: 'source'
      },
      'If you want to run this code locally, the source code is available on GitHub',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/tree/master/examples/transitions' },
        'here'
      ),
      '.'
    )
  );
};

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Examples = __webpack_require__(100);

var _Examples2 = _interopRequireDefault(_Examples);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var params = _ref.params,
      data = _ref.data;

  if (!data) {
    return _react2.default.createElement(
      'div',
      null,
      'The requested example could not be found.'
    );
  }
  var Component = _Examples2.default[params.slug];
  return _react2.default.createElement(Component, { name: data.name });
};

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subsection = exports.Section = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Sectional = function Sectional(_ref) {
  var title = _ref.title,
      id = _ref.id,
      children = _ref.children,
      Tag = _ref.tag,
      _ref$type = _ref.type,
      type = _ref$type === undefined ? 'section' : _ref$type;
  return _react2.default.createElement(
    'div',
    { className: type },
    _react2.default.createElement(
      Tag,
      { id: id },
      title,
      _react2.default.createElement(
        _react3.Link,
        { className: 'header-link', details: { hash: id } },
        '#'
      )
    ),
    children
  );
};

var Section = function Section(_ref2) {
  var _ref2$tag = _ref2.tag,
      tag = _ref2$tag === undefined ? 'h2' : _ref2$tag,
      rest = _objectWithoutProperties(_ref2, ['tag']);

  return _react2.default.createElement(Sectional, _extends({ type: 'section', tag: tag }, rest));
};

exports.Section = Section;
var Subsection = function Subsection(_ref3) {
  var _ref3$tag = _ref3.tag,
      tag = _ref3$tag === undefined ? 'h3' : _ref3$tag,
      rest = _objectWithoutProperties(_ref3, ['tag']);

  return _react2.default.createElement(Sectional, _extends({ type: 'subsection', tag: tag }, rest));
};
exports.Subsection = Subsection;

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ExampleLinks = __webpack_require__(102);

var _ExampleLinks2 = _interopRequireDefault(_ExampleLinks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { className: 'example' },
    _react2.default.createElement(
      'div',
      { className: 'content' },
      children || null
    ),
    _react2.default.createElement(
      'div',
      { className: 'sidebar' },
      _react2.default.createElement(
        'h2',
        null,
        'Examples'
      ),
      _react2.default.createElement(_ExampleLinks2.default, null)
    )
  );
};

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodeSandboxDemo = function CodeSandboxDemo(_ref) {
  var id = _ref.id;
  return _react2.default.createElement(
    'div',
    { className: 'demo' },
    _react2.default.createElement('iframe', {
      src: 'https://codesandbox.io/embed/' + id,
      width: '100%',
      height: '600px',
      sandbox: 'allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
    }),
    _react2.default.createElement(
      'p',
      null,
      'Use the three buttons at the top of the Sandbox to toggle view modes. Clicking the menu button in the top left corner opens a menu that allows you to switch between files.'
    )
  );
};

exports.default = CodeSandboxDemo;

/***/ })

});