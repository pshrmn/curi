webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrismBlock = exports.InlineJS = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactPrism = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InlineJS = exports.InlineJS = function InlineJS(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    _reactPrism.PrismCode,
    { className: 'language-javascript' },
    children
  );
};

var PrismBlock = exports.PrismBlock = function PrismBlock(_ref2) {
  var lang = _ref2.lang,
      children = _ref2.children;
  return _react2.default.createElement(
    _reactPrism.PrismCode,
    {
      className: 'language-' + lang,
      component: 'pre'
    },
    children
  );
};

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Installation = __webpack_require__(53);

var _Installation2 = _interopRequireDefault(_Installation);

var _GitHubLink = __webpack_require__(54);

var _GitHubLink2 = _interopRequireDefault(_GitHubLink);

var _PackageLinks = __webpack_require__(18);

var _PackageLinks2 = _interopRequireDefault(_PackageLinks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BasePackage = function BasePackage(_ref) {
  var name = _ref.name,
      version = _ref.version,
      children = _ref.children;
  return _react2.default.createElement(
    'div',
    { className: 'package' },
    _react2.default.createElement(
      'div',
      { className: 'content' },
      _react2.default.createElement(
        'h1',
        null,
        name
      ),
      _react2.default.createElement(_GitHubLink2.default, { name: name }),
      _react2.default.createElement(_Installation2.default, { name: name, version: version }),
      children || null
    ),
    _react2.default.createElement(
      'div',
      { className: 'sidebar' },
      _react2.default.createElement(
        'h2',
        null,
        'Packages'
      ),
      _react2.default.createElement(_PackageLinks2.default, null)
    )
  );
};

exports.default = BasePackage;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { id: 'API' },
    _react2.default.createElement(
      'h2',
      null,
      'API'
    ),
    children
  );
};

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _GuideLinks = __webpack_require__(43);

var _GuideLinks2 = _interopRequireDefault(_GuideLinks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { className: 'guide' },
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
        'Guides'
      ),
      _react2.default.createElement(_GuideLinks2.default, null)
    )
  );
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { className: 'note' },
    _react2.default.createElement(
      'strong',
      null,
      'Note:'
    ),
    ' ',
    children
  );
};

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.byName = undefined;

var _Installation = __webpack_require__(42);

var _Installation2 = _interopRequireDefault(_Installation);

var _GettingStarted = __webpack_require__(44);

var _GettingStarted2 = _interopRequireDefault(_GettingStarted);

var _AllAboutRoutes = __webpack_require__(45);

var _AllAboutRoutes2 = _interopRequireDefault(_AllAboutRoutes);

var _RenderingWithResponses = __webpack_require__(46);

var _RenderingWithResponses2 = _interopRequireDefault(_RenderingWithResponses);

var _UsingAddons = __webpack_require__(47);

var _UsingAddons2 = _interopRequireDefault(_UsingAddons);

var _UsingSideEffects = __webpack_require__(48);

var _UsingSideEffects2 = _interopRequireDefault(_UsingSideEffects);

var _ResponseCaching = __webpack_require__(49);

var _ResponseCaching2 = _interopRequireDefault(_ResponseCaching);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var guides = [_Installation2.default, _GettingStarted2.default, _AllAboutRoutes2.default, _RenderingWithResponses2.default, _UsingAddons2.default, _UsingSideEffects2.default, _ResponseCaching2.default];

var byName = exports.byName = guides.reduce(function (acc, curr) {
  acc[curr.slug] = curr;
  return acc;
}, {});

exports.default = guides;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  props.className = 'active';
  return props;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _curiReact = __webpack_require__(2);

var _Packages = __webpack_require__(19);

var _styleActive = __webpack_require__(17);

var _styleActive2 = _interopRequireDefault(_styleActive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupPackages = function GroupPackages(_ref) {
  var packages = _ref.packages;
  return _react2.default.createElement(
    'ul',
    null,
    packages.map(function (p) {
      return _react2.default.createElement(
        'li',
        { key: p.name },
        _react2.default.createElement(
          _curiReact.Link,
          {
            to: 'Package',
            params: { package: p.name },
            active: { merge: _styleActive2.default }
          },
          p.name
        )
      );
    })
  );
};

exports.default = function () {
  return _react2.default.createElement(
    'ul',
    null,
    Object.keys(_Packages.groupedPackages).map(function (name) {
      return _react2.default.createElement(
        'li',
        { key: name },
        _react2.default.createElement(
          'h3',
          null,
          name
        ),
        _react2.default.createElement(GroupPackages, { packages: _Packages.groupedPackages[name] })
      );
    })
  );
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.byName = exports.groupedPackages = undefined;

var _Curi = __webpack_require__(52);

var _Curi2 = _interopRequireDefault(_Curi);

var _CuriAddonActive = __webpack_require__(55);

var _CuriAddonActive2 = _interopRequireDefault(_CuriAddonActive);

var _CuriAddonAncestors = __webpack_require__(56);

var _CuriAddonAncestors2 = _interopRequireDefault(_CuriAddonAncestors);

var _CuriAddonPrefetch = __webpack_require__(57);

var _CuriAddonPrefetch2 = _interopRequireDefault(_CuriAddonPrefetch);

var _CuriSideEffectTitle = __webpack_require__(58);

var _CuriSideEffectTitle2 = _interopRequireDefault(_CuriSideEffectTitle);

var _CuriSideEffectScroll = __webpack_require__(59);

var _CuriSideEffectScroll2 = _interopRequireDefault(_CuriSideEffectScroll);

var _CuriReact = __webpack_require__(60);

var _CuriReact2 = _interopRequireDefault(_CuriReact);

var _CuriReactNavigator = __webpack_require__(61);

var _CuriReactNavigator2 = _interopRequireDefault(_CuriReactNavigator);

var _CuriReactLink = __webpack_require__(62);

var _CuriReactLink2 = _interopRequireDefault(_CuriReactLink);

var _CuriReactRedirect = __webpack_require__(64);

var _CuriReactRedirect2 = _interopRequireDefault(_CuriReactRedirect);

var _CuriReactBlock = __webpack_require__(65);

var _CuriReactBlock2 = _interopRequireDefault(_CuriReactBlock);

var _CuriReactCurious = __webpack_require__(66);

var _CuriReactCurious2 = _interopRequireDefault(_CuriReactCurious);

var _CuriReactActive = __webpack_require__(67);

var _CuriReactActive2 = _interopRequireDefault(_CuriReactActive);

var _CuriVue = __webpack_require__(68);

var _CuriVue2 = _interopRequireDefault(_CuriVue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var packages = [_Curi2.default, _CuriAddonActive2.default, _CuriAddonAncestors2.default, _CuriAddonPrefetch2.default, _CuriSideEffectTitle2.default, _CuriSideEffectScroll2.default, _CuriReact2.default, _CuriReactNavigator2.default, _CuriReactLink2.default, _CuriReactRedirect2.default, _CuriReactBlock2.default, _CuriReactCurious2.default, _CuriReactActive2.default, _CuriVue2.default];

var groupedPackages = exports.groupedPackages = packages.reduce(function (acc, curr) {
  if (!acc[curr.type]) {
    acc[curr.type] = [curr];
  } else {
    acc[curr.type].push(curr);
  }
  return acc;
}, {});

var byName = exports.byName = packages.reduce(function (acc, curr) {
  acc[curr.name] = curr;
  return acc;
}, {});

exports.default = packages;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(21);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _hickory = __webpack_require__(13);

var _curi = __webpack_require__(14);

var _curi2 = _interopRequireDefault(_curi);

var _curiReact = __webpack_require__(2);

var _curiSideEffectTitle = __webpack_require__(33);

var _curiSideEffectTitle2 = _interopRequireDefault(_curiSideEffectTitle);

var _curiSideEffectScroll = __webpack_require__(34);

var _curiSideEffectScroll2 = _interopRequireDefault(_curiSideEffectScroll);

var _curiAddonActive = __webpack_require__(35);

var _curiAddonActive2 = _interopRequireDefault(_curiAddonActive);

var _routes = __webpack_require__(36);

var _routes2 = _interopRequireDefault(_routes);

var _render = __webpack_require__(73);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setTitle = (0, _curiSideEffectTitle2.default)({ suffix: '| Curi Documentation' });
var scrollTo = (0, _curiSideEffectScroll2.default)();

var history = (0, _hickory.Browser)({
  baseSegment: '/curi'
});

var config = (0, _curi2.default)(history, _routes2.default, {
  addons: [_curiAddonActive2.default],
  sideEffects: [setTitle, scrollTo]
});

config.ready().then(function () {
  _reactDom2.default.render(_react2.default.createElement(_curiReact.Navigator, { config: config, children: _render2.default }), document.getElementById('root'));
});

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function createTitleSideEffect(options) {
  var _ref = options || {},
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === undefined ? '' : _ref$prefix,
      _ref$suffix = _ref.suffix,
      suffix = _ref$suffix === undefined ? '' : _ref$suffix;

  return function (response) {
    document.title = [prefix, response.title, suffix].join(' ');
  };
}

/* harmony default export */ __webpack_exports__["default"] = (createTitleSideEffect);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function createScrollSideEffect(options) {

  return function (response, action) {
    if (action === 'PUSH' || action === 'REPLACE') {
      window.scrollTo(0, 0);
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = (createScrollSideEffect);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function acceptableRouteName(name, response, partial) {
  if (name === response.name) {
    return true;
  } else if (partial && response.partials.some(function (n) {
    return name === n;
  })) {
    return true;
  } else {
    return false;
  }
}

function createActiveAddon() {
  var routeParams = {};

  return {
    name: 'active',
    register: function register(route, parentKeys) {
      var name = route.name,
          keys = route.keys;

      if (keys == null) {
        keys = [];
      }
      var fullKeys = Array.isArray(parentKeys) ? [].concat(toConsumableArray(parentKeys), toConsumableArray(keys)) : keys;
      if (routeParams[name] !== undefined) {
        console.warn('A route function with the name "' + name + '" already exists. Each route should' + 'have a unique name. By registering a route function with a name that already exists, ' + 'you are overwriting the existing one. This may break your application.');
      }
      routeParams[name] = fullKeys;
      return fullKeys;
    },
    get: function get$$1(name, response, params, partial) {
      if (routeParams[name] == null) {
        return false;
      }
      if (!acceptableRouteName(name, response, partial)) {
        return false;
      }
      var routeKeysToCheck = routeParams[name];
      for (var r = 0, length = routeKeysToCheck.length; r < length; r++) {
        var key = routeKeysToCheck[r];
        var param = params[key];
        if (!param || param !== response.params[key]) {
          return false;
        }
      }
      return true;
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = (createActiveAddon);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Home = __webpack_require__(37);

var _Home2 = _interopRequireDefault(_Home);

var _Guide = __webpack_require__(40);

var _Guide2 = _interopRequireDefault(_Guide);

var _PackageList = __webpack_require__(50);

var _PackageList2 = _interopRequireDefault(_PackageList);

var _Examples = __webpack_require__(71);

var _Examples2 = _interopRequireDefault(_Examples);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import the base routes
exports.default = [_Home2.default, _Guide2.default, _PackageList2.default, _Examples2.default];

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Home = __webpack_require__(38);

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Home',
  path: '',
  body: function body() {
    return _Home2.default;
  },
  title: 'Curi'
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactPrism = __webpack_require__(9);

var _curiReact = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'banner' },
      _react2.default.createElement(
        'h1',
        null,
        'Curi'
      ),
      _react2.default.createElement(
        'p',
        null,
        'A single page application router for any JavaScript rendering library.'
      ),
      _react2.default.createElement(
        _reactPrism.PrismCode,
        {
          className: 'language-javascript',
          component: 'pre'
        },
        'import { Browser } from \'hickory\';\nimport createConfig from \'curi\';\n\n// create your history object\nconst history = Browser();\n\n// define your routes\nconst routes = [\n  { name: \'Home\', path: \'\', ... },\n  { name: \'User\', path: \'u/:userID\', ... },\n  ...\n];\n\n// create your Curi configuration object\nconst config = createConfig(history, routes);\n\n// wait for the first response to be generated\nconfig.ready().then((response) => {\n  // and now, you\'re ready to render\n});'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Ready to learn more? Check out the',
        ' ',
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Guide', params: { slug: 'getting-started' } },
          'getting started'
        ),
        ' guide.'
      )
    )
  );
};

/***/ }),
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Guide = __webpack_require__(41);

var _Guide2 = _interopRequireDefault(_Guide);

var _Guides = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Guide',
  path: 'guides/:slug/',
  body: function body() {
    return _Guide2.default;
  },
  title: function title(params, data) {
    return (data ? data.name : 'Unknown') + ' Guide';
  },
  load: function load(params, rc) {
    if (_Guides.byName[params.slug]) {
      rc.setData(_Guides.byName[params.slug]);
    }
    return Promise.resolve();
  }
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var params = _ref.params,
      data = _ref.data;

  var Component = data && data.component;
  return Component ? _react2.default.createElement(Component, null) : _react2.default.createElement(
    'div',
    null,
    'The requested guide could not be found.'
  );
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstallationLink = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseGuide = __webpack_require__(6);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(1);

var _curiReact = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'Installation';
var slug = 'installation';

var InstallationLink = exports.InstallationLink = function InstallationLink(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    _curiReact.Link,
    { to: 'Guide', params: { slug: slug } },
    children || name
  );
};

var Installation = function Installation() {
  return _react2.default.createElement(
    _BaseGuide2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      'p',
      null,
      'You can install the latest version of Curi from NPM. Curi has a peer dependency on the Hickory package, so you should go ahead and install that as well.'
    ),
    _react2.default.createElement(
      _PrismBlocks.PrismBlock,
      { lang: 'bash' },
      'npm install hickory curi'
    ),
    _react2.default.createElement(
      'p',
      null,
      'If you prefer to use script tags, you can use ',
      _react2.default.createElement(
        'a',
        { href: 'https://unpkg.com' },
        'Unpkg'
      ),
      ' ',
      'to load Curi and Hickory.'
    ),
    _react2.default.createElement(
      _PrismBlocks.PrismBlock,
      { lang: 'markup' },
      '<script src="https://unpkg.com/hickory/dist/hickory.js" />\n<script src="https://unpkg.com/curi/dist/curi.js" />'
    ),
    _react2.default.createElement(
      'h2',
      null,
      'Promises'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Curi uses Promises, so you may need to include a polyfill to add Promise support for older browsers (including IE 11).'
    ),
    _react2.default.createElement(
      'p',
      null,
      'If you need a general ES2015 polyfill, you can check out the one provided by Babel\'s',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://babeljs.io/docs/usage/polyfill/#usage-in-browser' },
        'babel-polyfill'
      ),
      ' package. If you only need a Promise polyfill, then you should check out the',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/stefanpenner/es6-promise' },
        'es6-promise'
      ),
      ' package.'
    ),
    _react2.default.createElement(
      'h2',
      null,
      'Next'
    ),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        _curiReact.Link,
        { to: 'Guide', params: { slug: 'getting-started' } },
        'Get started'
      ),
      ' with Curi.'
    )
  );
};

exports.default = {
  name: name,
  slug: slug,
  component: Installation
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _curiReact = __webpack_require__(2);

var _Guides = __webpack_require__(16);

var _Guides2 = _interopRequireDefault(_Guides);

var _styleActive = __webpack_require__(17);

var _styleActive2 = _interopRequireDefault(_styleActive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'ul',
    null,
    Object.keys(_Guides2.default).map(function (key) {
      return _Guides2.default[key];
    }).map(function (guide) {
      return _react2.default.createElement(
        'li',
        { key: guide.slug },
        _react2.default.createElement(
          _curiReact.Link,
          {
            to: 'Guide',
            params: { slug: guide.slug },
            active: { merge: _styleActive2.default }
          },
          guide.name
        )
      );
    })
  );
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseGuide = __webpack_require__(6);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(1);

var _curiReact = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slug = 'getting-started';
var name = 'Getting Started';

var GettingStarted = function GettingStarted() {
  return _react2.default.createElement(
    _BaseGuide2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      'p',
      null,
      'Curi aims to be easy to setup. To get started, you just need to create a Hickory history object and an array of route objects. Pass those as arguments to the',
      ' ',
      _react2.default.createElement(
        _PrismBlocks.InlineJS,
        null,
        'createConfig'
      ),
      ' function to create your configuration object. Then, use the Promise returned by ',
      _react2.default.createElement(
        _PrismBlocks.InlineJS,
        null,
        'config.ready()'
      ),
      ' to wait for your first response to be generated and you\'re ready to render.'
    ),
    _react2.default.createElement(
      'div',
      { className: 'section' },
      _react2.default.createElement(
        'h2',
        null,
        'The History Object'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Curi\'s navigation is powered by the ',
        _react2.default.createElement(
          'a',
          { href: 'https://github.com/pshrmn/hickory' },
          'Hickory'
        ),
        ' ',
        'package. You just need to pick which type of Hickory history object is right for your application.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import { Browser, Hash, InMemory } from \'hickory\';\n\n// Use Browser when your website has a dynamic server\nconst browserHistory = Browser();\n\n// Use Hash when your website uses a static file server\nconst hashHistory = Hash();\n\n// Use InMemory when your application doesn\'t run in a browser\nconst memoryHistory = InMemory();'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Each history object has essentially the same API (InMemory has a few extra properties). The most important properties to know are the location object as well as the update, push, and replace methods.'
      ),
      _react2.default.createElement('p', null),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '// the location property is the current location object\nbrowserHistory.location === {\n  pathname: \'/guides/getting-started\',\n  ...\n};\n\n// the push method will navigate to a new location\nbrowserHistory.push({ pathname: \'/guides/installation\' });\n\n// the replace method will replace the current location\n// with the provided one\nbrowserHistory.push({ pathname: \'/guides/confirming-navigation\' });\n\n// the update method will choose whether to push or replace for you\nbrowserHistory.update({ pathname: \'/guides/getting-started\' });\n'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'section' },
      _react2.default.createElement(
        'h2',
        null,
        'The Routes Array'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Routes are objects with two required properties: name and path.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Paths can be any valid ',
        _react2.default.createElement(
          'a',
          { href: 'https://github.com/pillarjs/path-to-regexp' },
          'path-to-regexp'
        ),
        ' ',
        'string. It is just important that you do not begin the string with a forward slash (/). Forward slashes are fine anywhere else in the path. (',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'this/is/fine'
        ),
        ', but ',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '/this/is/not'
        ),
        ').'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The names are used to generate URIs for you. With Curi, you never have to write a URI\'s pathname string yourself. It is required that all of your routes have unique names. This is because Curi generates location pathnames using route names (and params for non-static paths).'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const routes = [\n  {\n    name: \'Home\',\n    path: \'\', // matches the pathname /\n    ...\n  },\n  ...\n]'
      ),
      _react2.default.createElement(
        'p',
        null,
        'How route matching works and the other route properties are explained more in-depth in the ',
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Guide', params: { slug: 'routes' } },
          'All About Routes'
        ),
        ' guide.'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'section' },
      _react2.default.createElement(
        'h2',
        null,
        'The Configuration Object'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Once you have your Hickory history object and your routes array, you just need to pass them to the default export from the Curi package (which we will name',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'createConfig'
        ),
        ' here).'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import createConfig from \'curi\';\nimport { Browser } from \'hickory\';\nimport routes from \'./routes\';\n\nconst history = Browser();\nconst config = createConfig(history, routes);\n'
      ),
      _react2.default.createElement(
        'div',
        { className: 'subsection' },
        _react2.default.createElement(
          'h3',
          null,
          'Other configuration options'
        ),
        _react2.default.createElement(
          'p',
          null,
          'The ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'createConfig'
          ),
          ' function can also take an optional third argument, which is an options object. You can use this to pass ',
          _react2.default.createElement(
            _curiReact.Link,
            { to: 'Guide', params: { slug: 'addons' } },
            'addons'
          ),
          ',',
          ' ',
          _react2.default.createElement(
            _curiReact.Link,
            { to: 'Guide', params: { slug: 'side-effects' } },
            'side effects'
          ),
          ', and a',
          ' ',
          _react2.default.createElement(
            _curiReact.Link,
            { to: 'Guide', params: { slug: 'response-caching' } },
            'cache'
          ),
          ' to your configuration object.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          'const config = createConfig(history, routes, {\n  addons: [...],\n  sideEffects: [...],\n  cache: cacheObject\n});'
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'section' },
      _react2.default.createElement(
        'h2',
        null,
        'Responses'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Whenever navigation happens, a new location object is created by Hickory. Curi uses that location object\'s pathname property to match against all of your routes. When it finds one that matches, it uses that route object to create a response object. You can subscribe to a Curi configuration object, and when a new response is created, your subscriber function will be called with the response.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const config = createConfig(history, routes);\nconfig.subscribe(response => {\n  // whenever the location changes, this function is called\n  // you can use this function to re-render your application\n  // using the new response object\n});\n'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Responses are generated asynchronously. A Curi configuration object has a',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'ready'
        ),
        ' function that returns a Promise and will resolve once the initial response has been generated. You do not have to use this, but it allows you to delay rendering until after the first response has been generated. If you want to render immediately, then you will need to handle how to render when there is no response.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const config = createConfig(history, routes);\n// wait to render until the first response is generated\nconfig.ready().then(response => {\n  // now we can render using the first response.\n});'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Your location-based rendering will be centered around these response objects, so you should be familiar with the different properties that will be available to you. We will get into more details about responses in the',
        ' ',
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Guide', params: { slug: 'responses' } },
          'Rendering with Responses'
        ),
        ' guide, but for now we will just go over how a route maps to a response.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '// if you have the following routes\nconst routes = [\n  ...,\n  {\n    name: \'Album\',\n    path: \'photos/:albumID\',\n    ...,\n    children: [\n      {\n        name: \'Photo\',\n        path: \':photoID\',\n        body: () => Photo\n      }\n    ]\n  }\n];\n// when the user visits the URI /photos/6789/12345\n// the following response object would be created:\n\n{\n  // The location key\n  key: \'1.0\',\n\n  // The location object used to generate the response.\n  location: { pathname: \'/photos/6789/12345\', ... },\n\n  // The value returned by the route\'s body function\n  body: Photo,\n\n  // The name of the best matching route\n  name: \'Photo\',\n\n  // The name of ancestor routes that matched\n  // part of the location\'s pathname\n  partials: [\'Album\'],\n\n  // An object containing the values parsed\n  // from the pathname by path-to-regexp.\n  params: { photoID: 12345, albumID: 6789 },\n\n  // There are a few more properties as well. Please read\n  // the Rendering with Responses guide to see those\n}'
      )
    ),
    _react2.default.createElement(
      'h2',
      null,
      'Next'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Now that you know the core of how Curi works, let\'s take a closer look at routes with the ',
      _react2.default.createElement(
        _curiReact.Link,
        { to: 'Guide', params: { slug: 'routes' } },
        'All About Routes'
      ),
      ' guide.'
    )
  );
};

exports.default = {
  name: name,
  slug: slug,
  component: GettingStarted
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseGuide = __webpack_require__(6);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(1);

var _Note = __webpack_require__(7);

var _Note2 = _interopRequireDefault(_Note);

var _curiReact = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slug = 'routes';
var name = 'All About Routes';

var AllAboutRoutes = function AllAboutRoutes() {
  return _react2.default.createElement(
    _BaseGuide2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      'p',
      null,
      'Routes are simply JavaScript objects with two required props: name and path. There are also a number of other props that you can use to enhance the routes. We will cover these below.'
    ),
    _react2.default.createElement(
      _PrismBlocks.PrismBlock,
      { lang: 'javascript' },
      '{\n  name: \'Home\',\n  path: \'\'\n};'
    ),
    _react2.default.createElement(
      'div',
      { className: 'section' },
      _react2.default.createElement(
        'h2',
        null,
        'Matching routes'
      ),
      _react2.default.createElement(
        'p',
        null,
        'First, we should cover how route matching works. Curi takes an array of route objects. Whenever Curi receives a new location, it will walk over the route objects in the order that they are defined in the array.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Sometimes a route\'s path with only partially match the location\'s pathname. When this happens, the matching behavior will vary based on the route\'s props. By default, routes perform exact matching. This means that when the route only matches part of the pathname, it does not count as a match.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '// when the pathname is \'/a/Run+The+Jewels+3/Hey+Kids\',\n// the Album route will partially match the pathname. However,\n// Curi looks for complete matches, so it will move on to the\n// next route\n{\n  name: \'Album\',\n  path: \'a/:album\'\n}'
      ),
      _react2.default.createElement(
        'p',
        null,
        'However, if the route has children, then Curi will check if any of those routes form a complete match before moving on to the next route in the routes array.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '// when the pathname is \'/a/Coloring+Book/All+Night\',\n// the Album route will partially match the pathname. Then,\n// its child route Song will be tested and fully match the pathname.\n{\n  name: \'Album\',\n  path: \'a/:album\',\n  children: [\n    {\n      name: \'Song\',\n      path: \':title\'\n    }\n  ]\n}'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Another possibility happens when you use the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'pathOptions'
        ),
        ' object to set',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'end: false'
        ),
        '. When you do that, then a route the partially matches will consider itself matched.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '// when the pathname is \'/a/Good+Kid,+M.A.A.D+City/Poetic+Justice\',\n// the Album route will partially match. However, because it sets\n// end to false, the partial match will be used.\n{\n  name: \'Album\',\n  path: \'a/:albumID\',\n  pathOptions: {\n    end: false\n  }\n}'
      ),
      _react2.default.createElement(
        'p',
        null,
        'If none of your routes match a pathname, then Curi will set a "404" status on the response object. The body property of the response will also be ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'undefined'
        ),
        ', so it is important that your application checks the response\'s status when it goes to render a response. You can also add a wildcard route (',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'path: \'*\''
        ),
        ') to the end of your routes array, and that route will always match. You may want to still manually set the status to "404" for the wildcard route, but it is not required.'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'section' },
      _react2.default.createElement(
        'h2',
        null,
        'Route properties'
      ),
      _react2.default.createElement(
        'div',
        { className: 'subsection' },
        _react2.default.createElement(
          'h3',
          null,
          'name'
        ),
        _react2.default.createElement(
          'p',
          null,
          'A unique identifier. This should be a string or a symbol.'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'subsection' },
        _react2.default.createElement(
          'h3',
          null,
          'path'
        ),
        _react2.default.createElement(
          'p',
          null,
          'A path-to-regexp style string. This should ',
          _react2.default.createElement(
            'strong',
            null,
            'not'
          ),
          ' have a leading slash. The string will be passed to path-to-regexp to generate a regular expression. Any',
          ' ',
          _react2.default.createElement(
            'a',
            { href: 'https://github.com/pillarjs/path-to-regexp#parameters' },
            'parameters'
          ),
          ' will be identified so that they can be parsed out when matching against a location\'s pathname.'
        ),
        _react2.default.createElement(
          _Note2.default,
          null,
          'While path-to-regexp supports arrays and RegExps, only string paths are supported here. This is because the path must also be reversible to create a pathname given params.'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'subsection' },
        _react2.default.createElement(
          'h3',
          null,
          'pathOptions'
        ),
        _react2.default.createElement(
          'p',
          null,
          'If you need to provide different path options than',
          ' ',
          _react2.default.createElement(
            'a',
            { href: 'https://github.com/pillarjs/path-to-regexp#usage' },
            'the defaults'
          ),
          ' used by path-to-regexp, you should specify them with a ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'pathOptions'
          ),
          ' object.'
        ),
        _react2.default.createElement(
          _Note2.default,
          null,
          'If a route has a children array property, it will ',
          _react2.default.createElement(
            'strong',
            null,
            'always'
          ),
          ' have the ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'end'
          ),
          ' ',
          ' path option set to false.'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'subsection' },
        _react2.default.createElement(
          'h3',
          null,
          'body'
        ),
        _react2.default.createElement(
          'p',
          null,
          'The body property gives you the opportunity to set the body property of a response for a given route. This must be a function and its return value will be what is set as the response object\'s body property.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          '// when the user visits /contact, the response object\'s body\n// property will be the Contact value\nconst contact = {\n  name: \'Contact\',\n  path: \'contact\',\n  body: () => Contact\n};'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'subsection' },
        _react2.default.createElement(
          'h3',
          null,
          'title'
        ),
        _react2.default.createElement(
          'p',
          null,
          'You can use the title property of a route to specify a title string that should be set on the response when that route matches. This can either be a string or a function. If it is a string, then',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'response.title'
          ),
          ' will be set to the value of ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'route.title'
          ),
          '. If it is a function, it will be called (and passed the ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'response.params'
          ),
          ' and',
          ' ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'response.data'
          ),
          ' values) to generate the title string.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'If a route does not have a title property, when it matches, the response\'s title property will be an empty string.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          '// as a string\n{\n  name: \'Contact\',\n  path: \'contact\',\n  title: \'How to contact us\'\n}\n\n// as a function\n{\n  name: \'Contact Method\',\n  path: \':method\',\n  title: (params, data) => `Contact via ${params.method}`\n}'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'subsection' },
        _react2.default.createElement(
          'h3',
          null,
          'children'
        )
      ),
      _react2.default.createElement(
        'p',
        null,
        'An optional array of route objects. Any child routes will be matched relative to their parent route\'s path. This means that if a parent route\'s path string is \'one\' and a child route\'s path string is \'two\', the child will match when the pathname is \'one/two\'.'
      ),
      _react2.default.createElement(
        'div',
        { className: 'subsection' },
        _react2.default.createElement(
          'h3',
          null,
          'preload'
        ),
        _react2.default.createElement(
          'p',
          null,
          'A function that will only be called the first time that a route matches. This should only be used for loading resources that are required for the route to display properly. For example, if you are doing code splitting with Webpack using ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'import()'
          ),
          ', you would load the modules in preload.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'The preload function must return a Promise.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          'const about = {\n  name: \'About\',\n  path: \'about\',\n  preload: () => {\n    return import(\'./components/About\')\n      .then(module => AsyncStore.register(module.default));\n  }\n};'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'subsection' },
        _react2.default.createElement(
          'h3',
          null,
          'load'
        ),
        _react2.default.createElement(
          'p',
          null,
          'A function that can be used for data fetching as well as for triggering redirects. The load function will be passed the params object that is parsed from the location\'s pathname (using the route and its ancestor\'s paths) and the modifiers object that can be used to modify the response object that will be created.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Like preload, load must return a Promise.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          'const user = {\n  name: \'User\',\n  path: \':id\',\n  load: (params, mod) => {\n    return fetch(`/api/users/${params.id}`)\n      .then(resp => JSON.parse(resp))\n      .then(data => mod.setData(data);)\n      .catch(err => {\n        mod.fail(err);\n        mod.setStatus(404);\n      });\n  }\n}'
        ),
        _react2.default.createElement(
          'p',
          null,
          'What is that modifiers object that gets passed to the load function? It contains a number of functions that you can use to modify the response. These functions are ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'redirect'
          ),
          ', ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'fail'
          ),
          ',',
          ' ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'setStatus'
          ),
          ', and ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'setData'
          ),
          '.'
        ),
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'redirect(to, code)'
            ),
            ' - This allows you to turn the response into a redirect response. When you application receives a redirect response, it should redirect to the new location (using your history object) instead of re-rendering. If you do not provide a code, then 301 will be used. The ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'to'
            ),
            ' argument can be whatever you want it to be, you will just need to know how to deal with it in your render function.'
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'fail(error)'
            ),
            ' - A method to call when something goes wrong. This will add an error property to the response.'
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'setStatus(code)'
            ),
            ' - This method will set a new status for the response (the default status is 200 when a route matches and 404 when no routes match).'
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'setData(data)'
            ),
            ' - The value passed to this method will be set as the response\'s data property.'
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        'Next'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Now that you know how to setup your routes, we can get to the good part: actually rendering your application using response objects. Check out the',
        ' ',
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Guide', params: { slug: 'responses' } },
          'Rendering with Responses'
        ),
        ' guide to learn how.'
      )
    )
  );
};

exports.default = {
  name: name,
  slug: slug,
  component: AllAboutRoutes
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseGuide = __webpack_require__(6);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(1);

var _Note = __webpack_require__(7);

var _Note2 = _interopRequireDefault(_Note);

var _curiReact = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'Rendering with Responses';
var slug = 'responses';

var RenderingWithResponses = function RenderingWithResponses() {
  return _react2.default.createElement(
    _BaseGuide2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      'p',
      null,
      'Response objects are what you use to help render your application. They are essentially just a collection of properties related to which route matched the current location. You can pick and choose which ones you need to use when you are rendering. There is no one "correct" way render with a response, but in this guide we will use the response\'s body property and a render function.'
    ),
    _react2.default.createElement(
      'div',
      { className: 'section' },
      _react2.default.createElement(
        'h2',
        null,
        'The Properties of a Response Object'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '{\n  // The location key\n  key: \'1.0\',\n\n  // The location object used to generate the response.\n  location: { pathname: \'/photos/6789/12345\', ... },\n\n  // The status code for the response.\n  // This defaults to 200, but can be changed\n  // if no routes match or a route issues a redirect.\n  status: 200,\n\n  // If the route had a load function and called\n  // setData, that value will be set here. If not,\n  // this will be undefined.\n  data: {...},\n\n  // The title string generated by the route\n  // or an empty string if the route has no title property\n  title: \'Photo 12345\',\n\n  // The value returned by the route\'s body function\n  body: Photo,\n\n  // The name of the best matching route\n  name: \'Photo\',\n\n  // The name of ancestor routes that matched\n  // part of the location\'s pathname\n  partials: [\'Album\'],\n\n  // An object containing the values parsed\n  // from the pathname by path-to-regexp.\n  params: { photoID: 12345, albumID: 6789 },\n\n  // If an error occurs while generating the\n  // response, it will be set here\n  error: undefined\n}'
      ),
      _react2.default.createElement(
        'div',
        { className: 'subsection' },
        _react2.default.createElement(
          'h3',
          null,
          'Redirect Response'
        ),
        _react2.default.createElement(
          'p',
          null,
          'When you redirect, a slightly different response object will be created. You are in charge of actually redirecting, Curi just generates a response that lets you know that you should redirect. You can redirect by using your history object\'s replace (or push) methods, or if you are using one of the library specific Curi packages, there might be a built-in way for you to redirect (e.g. curi-react provides the',
          ' ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            '<Redirect>'
          ),
          ' component).'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          '{\n  // These properties also exist on the redirect response\n  key: \'1.0\',\n  location: { pathname: \'/photos/6789/12345\', ... },\n  status: 301,\n  data: {...},\n  title: \'Photo 12345\',\n\n  // The redirectTo property provides information on\n  // where you should redirect to\n  redirectTo: { pathname: \'/login\' }\n}'
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'section' },
      _react2.default.createElement(
        'h2',
        null,
        'The Body Property'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The body property of a response is the value returned by the matched route\'s body property. This value can be anything you want it to be, but it should usually be a function/component. Here, we will assume that each of your routes have body properties that return a function.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '// we are assuming all routes are setup like this\n{\n  ...,\n  body: () => function() {...}\n}'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The response\'s body function should take other response properties as its arguments. Which ones will vary based on your application, but if you are using path parameters, then the params object should be one of these. If you are doing data loading in your routes (using the load property), then you will probably also want to pass the data property to your body function.'
      ),
      _react2.default.createElement(
        _Note2.default,
        null,
        'It is important that each body function has the same argument signature. If you want to play it safe, you can just have each function expect to receive the full response object as an argument.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'As stated above, the body property does not have to be a function. You may want to pass extra data for each route, in which case it might be convenient for the route\'s body function to return an object. This can be useful if you want to have multiple render functions (where each one would manipulate a different part of your application).'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '{\n  name: \'User\',\n  body: () => ({\n    main: function User() {...},\n    menu: function UserMenu() {...}\n  })\n}'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'section' },
      _react2.default.createElement(
        'h2',
        null,
        'The Render Function'
      ),
      _react2.default.createElement(
        'p',
        null,
        'A render function is simply a function that receives a response object as its argument and manipulates the DOM (or its equivalent for non-browser environments) using the response. In React or Vue, a render function would trigger a re-rendering of your application. In vanilla JavaScript, a render function would manually update the DOM.'
      ),
      _react2.default.createElement(
        'div',
        { className: 'subsection' },
        _react2.default.createElement(
          'h3',
          null,
          'Rendering Redirects'
        ),
        _react2.default.createElement(
          'p',
          null,
          'The first thing you should do in your render function is to check if the response has a',
          ' ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'redirectTo'
          ),
          ' property. If it does, then you should redirect to the new location instead of rendering.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'curi-react and curi-vue both provide components that will do this for you, but you can also just use your history object to redirect. You will want to use your history\'s replace function to redirect.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          'function render(response) {\n  // assuming that your history object is in scope\n  if (response.redirectTo) {\n    history.replace(response.redirectTo)\n  }\n}'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'subsection' },
        _react2.default.createElement(
          'h3',
          null,
          'Rendering HTML'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Once we have verified that we don\'t have to redirect, we are ready to render the content using the response. There is still one thing to verify: that our response actually has a body property. If none of your routes match, then the response will not have a body property. You can rememdy this by adding a wildcard route to the end of your routes array, but this is not necessary. You can also just have a default function that will be used when there is no body property.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          '// use a wildcard route\nconst routes = [\n  // ...,\n  {\n    name: \'Not Found\',\n    path: \'*\'\n  }\n];\n\n// or have a default body function\nfunction render(response) {\n  //...\n  const body = response.body || function defaultBody() {...}\n  body(response.params);\n}'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Now that we have our body function, we just need to call it. The exact behavior will vary based on how you are rendering your application. For a React application, we would just pass the body function to React\'s ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'createElement'
          ),
          ' function (or use JSX). For vanilla JavaScript, our body function probably returns an HTML string, so we would assign the returned value to the DOM node that holds our application.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          '// vanilla JavaScript\nconst root = document.getElementById(\'root\');\n\nfunction render(response) {\n  // call the body function to return content\n  root.innerHTML = response.body(response.params, response.data);\n}\n\n// react\nfunction render(response) {\n  // This function should be a property of the <Navigator> and\n  // it should return a React element\n  const Body = response.body || defaultBody;\n  return React.createElement(Body, { params: response.params });\n}'
        )
      )
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        'Next'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Let\'s take a moment to go back to our configuration object and look at what Curi\'s addons are for in the',
        ' ',
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Guide', params: { slug: 'addons' } },
          'Using Addons'
        ),
        ' guide.'
      )
    )
  );
};

exports.default = {
  name: name,
  slug: slug,
  component: RenderingWithResponses
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseGuide = __webpack_require__(6);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(1);

var _Note = __webpack_require__(7);

var _Note2 = _interopRequireDefault(_Note);

var _curiReact = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slug = 'addons';
var name = 'Using Addons';

var UsingAddons = function UsingAddons() {
  return _react2.default.createElement(
    _BaseGuide2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      'p',
      null,
      'Addons in Curi allow you to interact with a registered route using its name. A registered route is generally any route that is in the array of routes that you used to create your configuration object. However, some addons only register routes that meet some criteria.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Addons are objects with three properties: name, register, and get.'
    ),
    _react2.default.createElement(
      _PrismBlocks.PrismBlock,
      { lang: 'javascript' },
      '{\n  // the string you will use to call the addon\n  name: \'MyAddon\',\n\n  // a function used internally to register routes\n  // with the addon. You only need to use this when\n  // writing your own addons\n  register: function(route, parentData) {...},\n\n  // this is the function that will be added to your\n  // config object\'s addons property. For example, with\n  // this addon, the get function will be called when\n  // you call config.addons.MyAddon(\'...\')\n  get: function(route) {...}\n}'
    ),
    _react2.default.createElement(
      'p',
      null,
      'However, when you import them, you are actually importing an addon factory. Curi will create the actual addon while creating your configuration object.'
    ),
    _react2.default.createElement(
      _PrismBlocks.PrismBlock,
      { lang: 'javascript' },
      'function myAddonFactory() {\n  return { name: ..., register: ..., get: ..., };\n}'
    ),
    _react2.default.createElement(
      'div',
      { className: 'section' },
      _react2.default.createElement(
        'h2',
        null,
        'Adding addons'
      ),
      _react2.default.createElement(
        'p',
        null,
        'As stated above, whenever you include addons in your configuration object, you do not pass the actual addon object. Instead, you pass a factory function that will return the addon object. This allows addons to be instanced (multiple configuration objects would each have their own instance of the addon), which can be useful for server-side rendering.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Addons are provided to the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'createConfig'
        ),
        ' call as an array using the addons property of the options object (the third argument to ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'createConfig'
        ),
        ').'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const config = createConfig(history, routes, {\n  addons: [createMyAddon]\n});'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The addon will be added to the configuration object\'s addons property. To call an addon, you simply use its name.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const myValue = config.addons.myAddon(\'Some Route\', ...);'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'section' },
      _react2.default.createElement(
        'h2',
        null,
        'Creating Addons'
      ),
      _react2.default.createElement(
        'p',
        null,
        'You may find yourself wanting to add a custom addon to your application. There are just a few steps that you should follow in order to write your own addon.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Remember that you need to export a function that will create the addon object, not the actual addon object.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'export default function myAddonFactory() {\n  ...\n}'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The function should return an object with three properties: name, register, and get. name is a unique identifier for the addon, register is a function that will be used for your addon to store information about each route, and get is a function that will receive a route\'s name and perform some task using the related route.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'export default function myAddonFactory() {\n  const knownRoutes = {};\n  return {\n    name: \'MyFirstAddon\',\n    register: route => {\n      knownRoutes[route.name] = true;\n    },\n    get: (name) => {\n      return knownRoutes[name] != null\n    }\n  };\n}'
      ),
      _react2.default.createElement(
        'p',
        null,
        'That is all there is to creating a basic addon. Now, you just need to make sure to pass it to your configuration object and you will be able to call your addon\'s get function from your configuration object.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import createConfig from \'curi\';\nimport myAddonFactory from \'./myAddon\'\n\nconst routes = [{ name: \'Home\', path: \'\' }];\n\nconst config = createConfig(history, routes, {\n  addons: [myAddonFactory]\n});\n\nconfig.addons.MyFirstAddon(\'Home\'); // true\nconfig.addons.MyFirstAddon(\'Elsewhere\'); // false'
      ),
      _react2.default.createElement(
        'div',
        { className: 'subsection' },
        _react2.default.createElement(
          'h3',
          null,
          'Slightly more advanced'
        ),
        _react2.default.createElement(
          'p',
          null,
          'You might want to write an addon that uses data from parent routes when registering a route. For example, the built-in pathname addon joins a route\'s path with it parent path(s).'
        ),
        _react2.default.createElement(
          'p',
          null,
          'If you want your addon to provide similar functionality, all you have to do is have the register function return the data that should be passed to its child routes. Then, when any children of that route are registered, they will be passed the return value from their parent as the second argument of the register function.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          'function ParentFactory() {\n  const routeTree = {};\n  return {\n    name: \'routeParent\',\n    register: (route, parent) => {\n      // parent is the value returned by the route\'s parent route\n      // and will be undefined when a route does not have a parent\n      routeTree[route.name] = parent;\n      return route.name;\n    },\n    get: (name) => {\n      return routeTree[name];\n    }\n  }\n}'
        )
      )
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        'Next'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Next on the list are side effects, which you can learn more about in the',
        ' ',
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Guide', params: { slug: 'side-effects' } },
          'Using Side Effects'
        ),
        ' guide.'
      )
    )
  );
};

exports.default = {
  name: name,
  slug: slug,
  component: UsingAddons
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseGuide = __webpack_require__(6);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(1);

var _Note = __webpack_require__(7);

var _Note2 = _interopRequireDefault(_Note);

var _curiReact = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slug = 'side-effects';
var name = 'Using Side Effects';

var UsingSideEffects = function UsingSideEffects() {
  return _react2.default.createElement(
    _BaseGuide2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      'p',
      null,
      'Curi side effects are essentially permament subscribers to your configuration object. They can be considered slightly more convenient than subscribers since you don\'t have to subscribe to your configuration object to set them up. However, you also cannot unsubscribe them.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Whenever a new response is generated, all of the side effect functions will be called. They will be given two arguments: the new response object and the action that was used to trigger the navigation (POP, PUSH, or REPLACE).'
    ),
    _react2.default.createElement(
      _PrismBlocks.PrismBlock,
      { lang: 'javascript' },
      'function logResponse(response) {\n  // call your logging API to record the response\n}'
    ),
    _react2.default.createElement(
      'div',
      { className: 'section' },
      _react2.default.createElement(
        'h2',
        null,
        'Adding Side Effects'
      ),
      _react2.default.createElement(
        'p',
        null,
        'You add side effect functions to your configuration object by adding a',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'sideEffects'
        ),
        ' array to the options object (the third agument) of ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'createConfig'
        ),
        '.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const config = createConfig(history, routes, {\n  sideEffects: [logResponse]\n});'
      ),
      _react2.default.createElement(
        'div',
        { className: 'subsection' },
        _react2.default.createElement(
          'h3',
          null,
          'Official Side Effects'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Curi has two "official" side effect packages:'
        ),
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _curiReact.Link,
              { to: 'Package', params: { package: 'curi-side-effect-title' } },
              'curi-side-effect-title'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _curiReact.Link,
              { to: 'Package', params: { package: 'curi-side-effect-scroll' } },
              'curi-side-effect-scroll'
            )
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'section' },
      _react2.default.createElement(
        'h2',
        null,
        'Creating Side Effects'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Side effects are just simple functions that receive a response object and an action string and do something with them. One thing that they should not do, however, is to modify the response.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Below is a side effect function that sets a modified property on the object.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'function mySideEffect(response, action) {\n  console.log(\'Navigating to\', response.location);\n}\n\nconst config = createConfig(history, routes, {\n  sideEffects: [mySideEffect]\n});'
      ),
      _react2.default.createElement(
        'p',
        null,
        'You can write a side effect factory if you need to create a more customizable side effect.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'function AnalyticsLogger(options) {\n  // do some setup with the provided options\n  const logger = setupMyLogger(options);\n\n  // and return the actual side effect function\n  return sideEffect(response, action) {\n    logger(response);\n  }\n}'
      ),
      _react2.default.createElement(
        'p',
        null,
        'That really is all there is required to know in order to write your own side effects. You may want to review the ',
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Guide', params: { slug: 'responses' } },
          'response'
        ),
        ' properties to know which properties you should expect a response to have, but other than that they are pretty simple.'
      )
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        'Next'
      ),
      _react2.default.createElement(
        'p',
        null,
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'createConfig'
        ),
        '\'s options object has three arguments. We have covered the first two, so finally we will cover the cache option in the',
        ' ',
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Guide', params: { slug: 'response-caching' } },
          'response caching'
        ),
        ' guide.'
      )
    )
  );
};

exports.default = {
  name: name,
  slug: slug,
  component: UsingSideEffects
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BaseGuide = __webpack_require__(6);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(1);

var _Note = __webpack_require__(7);

var _Note2 = _interopRequireDefault(_Note);

var _curiReact = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slug = 'response-caching';
var name = 'Response Caching';

var ResponseCaching = function ResponseCaching() {
  return _react2.default.createElement(
    _BaseGuide2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      'p',
      null,
      'The cache option passed to ',
      _react2.default.createElement(
        _PrismBlocks.InlineJS,
        null,
        'createConfig'
      ),
      ' allows you to save response objects. The actual caching mechanism is left up to you. It only has two requirements:'
    ),
    _react2.default.createElement(
      'ul',
      null,
      _react2.default.createElement(
        'li',
        null,
        'It provides a set function which receives a response object as its argument.'
      ),
      _react2.default.createElement(
        'li',
        null,
        'It provides a get function which receives a location object as its argument and returns a response object associated with the location (if one exists)'
      )
    ),
    _react2.default.createElement(
      _PrismBlocks.PrismBlock,
      { lang: 'javascript' },
      'const createSimpleCache = () => {\n  const cache = {};\n\n  return {\n    get: location => {\n      const { key } = location;\n      return cache[key];\n    },\n    set: response => {\n      const { key } = response.location;\n      cache[key] = response;\n    }\n  };\n}\n\nconst myCache = createSimpleCache();\n\nconst config = createConfig(history, routes, {\n  cache: myCache\n});'
    ),
    _react2.default.createElement(
      'p',
      null,
      'The above cache uses a location\'s key property to store values.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'So why would you want to use a cache? When the user uses the browser\'s forward/back buttons, Curi will generate a new response. This means that if the route has a load function, it will be re-called. You can mitigate this by adding a cache to your load function, but you may also find it preferable to just re-use the existing response.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'This isn\'t built-in because it is possible that you don\'t actually want responses to be re-used. If you are caching responses, you will need to be aware of what to do when an authenticated user logs out. You will probably want to clear the cache so that they aren\'t still seeing content as if they were logged in.'
    )
  );
};

exports.default = {
  name: name,
  slug: slug,
  component: ResponseCaching
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PackageList = __webpack_require__(51);

var _PackageList2 = _interopRequireDefault(_PackageList);

var _Package = __webpack_require__(69);

var _Package2 = _interopRequireDefault(_Package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Packages',
  path: 'packages/',
  body: function body() {
    return _PackageList2.default;
  },
  title: 'Curi Packages',
  children: [_Package2.default]
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _curiReact = __webpack_require__(2);

var _PackageLinks = __webpack_require__(18);

var _PackageLinks2 = _interopRequireDefault(_PackageLinks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h1',
      null,
      'Curi Packages'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Curi is split into a number of different packages that you can pick and choose from in order to only use what you need. You will always need the main',
      ' ',
      _react2.default.createElement(
        _curiReact.Link,
        { to: 'Package', params: { package: 'curi' } },
        'Curi'
      ),
      ' package, but no other package is necessary.'
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        'List of Official Packages'
      ),
      _react2.default.createElement(_PackageLinks2.default, null)
    )
  );
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BasePackage = __webpack_require__(3);

var _BasePackage2 = _interopRequireDefault(_BasePackage);

var _PrismBlocks = __webpack_require__(1);

var _APIBlock = __webpack_require__(4);

var _APIBlock2 = _interopRequireDefault(_APIBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'curi';
var version = '0.10.1';
var type = 'base';

var Curi = function Curi() {
  return _react2.default.createElement(
    _BasePackage2.default,
    { name: name, version: version },
    _react2.default.createElement(
      _APIBlock2.default,
      null,
      _react2.default.createElement(
        'h3',
        null,
        'createConfig'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The Curi package has one export, which is a function that returns a Curi configuration object. It is a default export, so you can name it whatever you like when importing it. Throughout the documentation, it is imported as',
        ' ',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'createConfig'
        ),
        ' for consistency and because that is what the function does.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import createConfig from \'curi\';\n\nconst config = createConfig(history, routes, options);'
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h4',
          null,
          'Arguments'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h5',
            null,
            'history'
          ),
          _react2.default.createElement(
            'p',
            null,
            'A Hickory history object'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h5',
            null,
            'routes'
          ),
          _react2.default.createElement(
            'p',
            null,
            'An array of route objects'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h5',
            null,
            'options'
          ),
          _react2.default.createElement(
            'p',
            null,
            'An optional object with additional properties that can be passed to your configuration object.'
          ),
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              'addons - An array of addon functions. The pathname addon is included by default, but any other addons that you wish to use should be provided in this array.'
            ),
            _react2.default.createElement(
              'li',
              null,
              'middleware - An array of middleware functions. These are functions that will be able to interact with/modify response objects before they are emitted to subscribed functions.'
            ),
            _react2.default.createElement(
              'li',
              null,
              'cache - An object with get/set properties. This allows you to cache old responses, preventing any load functions from being re-called when navigating to an already-visited location.'
            )
          )
        )
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h4',
          null,
          'Configuration Object Properties'
        ),
        _react2.default.createElement(
          'p',
          null,
          'The configuration object has a number of properties for you to use when rendering your application.'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h5',
            null,
            'subscribe(fn)'
          ),
          _react2.default.createElement(
            'p',
            null,
            'The returned object provides a subscribe method that allows your application to be informed of navigation. It expects to be passed a function, which will be called whenever a new response is generated.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'If the best-matched route has either a preload and/or load loading function, the configuration object will not call the subscribed functions until the loading functions have all resolved.'
          ),
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'javascript' },
            'config.subscribe((response) => {\n  // render the application based on the response\n});'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h5',
            null,
            'ready()'
          ),
          _react2.default.createElement(
            'p',
            null,
            'When you create a new configuration object, an initial response will be created for the current location (',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'history.location'
            ),
            '). One thing to note, though, is that route matching is an asynchronous process. This allows for behavior like code splitting for bundles and ensuring that data is loaded prior to rendering. However, this means that we can not rely on the response being fully prepared right after the configuration object is created.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'The ready method returns a Promise that will not resolve until the response has been fully prepared. The returned Promise will resolve with the prepared response (unless an error occurred in preparing the response, which you will need to catch yourself).'
          ),
          _react2.default.createElement(
            'p',
            null,
            'If a response has already been generated before ready is called, then ready will resolve with that response.'
          ),
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'javascript' },
            'config.ready().then(resp => {\n  // now we know that the response is ready\n});'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h5',
            null,
            'addons'
          ),
          _react2.default.createElement(
            'p',
            null,
            'You can access all of the configuration object\'s addons through the addons property. This allows you to call an addon\'s get method directly.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'For example, with the builtin pathname addon, you can do the following:'
          ),
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'javascript' },
            'const config = createConfig(history, [{ name: \'User\', path: \'user/:id\' }]);\nconst userPathname = config.addons.pathname(\'User\', { id: \'12345\' });\n// userPathname === \'/user/12345\''
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h5',
            null,
            'history'
          ),
          _react2.default.createElement(
            'p',
            null,
            'You can access the history object that you passed to ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'createConfig'
            ),
            ' through the configuration object\'s history property. This allows you to just pass the configuration object throughout your project instead of both that and the history object.'
          )
        )
      )
    )
  );
};

exports.default = {
  name: name,
  version: version,
  type: type,
  component: Curi
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactPrism = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NPM = function NPM(_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'p',
      null,
      'You can install the ',
      name,
      ' package from NPM.'
    ),
    _react2.default.createElement(
      _reactPrism.PrismCode,
      {
        className: 'language-bash',
        component: 'pre'
      },
      'npm install ',
      name
    )
  );
};

var Unpkg = function Unpkg(_ref2) {
  var name = _ref2.name,
      version = _ref2.version;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'p',
      null,
      'If you prefer to use script tags, ',
      _react2.default.createElement(
        'a',
        { href: 'https://unpkg.com' },
        'Unpkg'
      ),
      ' will always have the latest version of ',
      name,
      ' available for your.'
    ),
    _react2.default.createElement(
      _reactPrism.PrismCode,
      {
        className: 'language-markup',
        component: 'pre'
      },
      '<script src="https://unpkg.com/',
      name,
      '@',
      version,
      '/dist/',
      name,
      '.js" />'
    ),
    _react2.default.createElement(
      'p',
      null,
      'There is also a minimized version available if you change the filename to',
      ' ',
      _react2.default.createElement(
        'code',
        { className: 'language-markup' },
        name,
        '.min.js'
      )
    )
  );
};

exports.default = function (_ref3) {
  var name = _ref3.name,
      version = _ref3.version;
  return _react2.default.createElement(
    'div',
    { id: 'installation' },
    _react2.default.createElement(
      'h2',
      null,
      'Installation'
    ),
    _react2.default.createElement(NPM, { name: name }),
    _react2.default.createElement(Unpkg, { name: name, version: version })
  );
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    'a',
    { href: 'https://github.com/pshrmn/curi/tree/master/packages/' + name },
    'On GitHub'
  );
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BasePackage = __webpack_require__(3);

var _BasePackage2 = _interopRequireDefault(_BasePackage);

var _PrismBlocks = __webpack_require__(1);

var _APIBlock = __webpack_require__(4);

var _APIBlock2 = _interopRequireDefault(_APIBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'curi-addon-active';
var version = '0.2.0';
var type = 'addon';

var CuriAddonActive = function CuriAddonActive() {
  return _react2.default.createElement(
    _BasePackage2.default,
    { name: name, version: version },
    _react2.default.createElement(
      _APIBlock2.default,
      null,
      _react2.default.createElement(
        'h3',
        null,
        'createActiveAddon'
      ),
      _react2.default.createElement(
        'p',
        null,
        'curi-addon-active has one, default export function (so you can import it with whatever name you want to. It is an addon factory that will add an',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'active'
        ),
        ' function to your configuration object\'s addon property.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import createConfig from \'curi\';\nimport createActiveAddon from \'curi-addon-active\';\n\nconst config = createConfig(history, routes, {\n  addons: [createActiveAddon]\n});'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'active'
        ),
        ' addon function takes four arguments: the name of the route you want to check, the current response object, any params of the route that you want to check, and whether to consider partial matches as active. A partial match would occur when you check an ancestor route of the current route.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const isActive = config.addons.active(\'Some Route\', response, { id: 10 });'
      )
    )
  );
};

exports.default = {
  name: name,
  version: version,
  type: type,
  component: CuriAddonActive
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BasePackage = __webpack_require__(3);

var _BasePackage2 = _interopRequireDefault(_BasePackage);

var _PrismBlocks = __webpack_require__(1);

var _APIBlock = __webpack_require__(4);

var _APIBlock2 = _interopRequireDefault(_APIBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'curi-addon-ancestors';
var version = '0.2.1';
var type = 'addon';

var CuriAddonAncestors = function CuriAddonAncestors() {
  return _react2.default.createElement(
    _BasePackage2.default,
    { name: name, version: version },
    _react2.default.createElement(
      _APIBlock2.default,
      null,
      _react2.default.createElement(
        'h3',
        null,
        'createAncestorsAddon'
      ),
      _react2.default.createElement(
        'p',
        null,
        'curi-addon-ancestors has one, default export function (so you can import it with whatever name you want to. It is an addon factory that will add an',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'ancestors'
        ),
        ' function to your configuration object\'s addon property.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import createConfig from \'curi\';\nimport createAncestorsAddon from \'curi-addon-ancestors\';\n\nconst routes = [\n  {\n    name: \'Grandparent\', path: \'0\',\n    children: [\n      {\n        name: \'Parent\', path: \'1\',\n        children: [ { name: \'Child\', path: \'2\' } ]\n      }\n    ]\n  }\n];\n\nconst config = createConfig(history,routes, {\n  addons: [createAncestorsAddon]\n});'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The ancestors addon takes the name of the route and the ancestor "level" that you want to get. 1 refers to the route\'s parent, 2 is its grandparent, etc. If the provided value is not a positive integer or if there is no ancestor at the requested level, the addon will return undefined.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const parent = config.addons.ancestors(\'Child\', 1);\n// parent === \'Parent\'\n'
      ),
      _react2.default.createElement(
        'p',
        null,
        'If the level value is undefined (or null), then you will receive the array of all ancestors. This can be used to build breadcrumbs for a given route.'
      )
    )
  );
};

exports.default = {
  name: name,
  version: version,
  type: type,
  component: CuriAddonAncestors
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BasePackage = __webpack_require__(3);

var _BasePackage2 = _interopRequireDefault(_BasePackage);

var _PrismBlocks = __webpack_require__(1);

var _Note = __webpack_require__(7);

var _Note2 = _interopRequireDefault(_Note);

var _APIBlock = __webpack_require__(4);

var _APIBlock2 = _interopRequireDefault(_APIBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'curi-addon-prefetch';
var version = '0.2.0';
var type = 'addon';

var CuriAddonPrefetch = function CuriAddonPrefetch() {
  return _react2.default.createElement(
    _BasePackage2.default,
    { name: name, version: version },
    _react2.default.createElement(
      _APIBlock2.default,
      null,
      _react2.default.createElement(
        'h3',
        null,
        'createPrefetchAddon'
      ),
      _react2.default.createElement(
        'p',
        null,
        'curi-addon-prefetch has one, default export function (so you can import it with whatever name you want to. It is an addon factory that will add an',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'prefetch'
        ),
        ' function to your configuration object\'s addon property.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import createConfig from \'curi\';\nimport prefetch from \'curi-addon-prefetch\';\n\nconst config = createConfig(history, routes, { addons: [prefetch] });\n'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The prefetch addon allows you to call a route\'s load function manually. Why would you want to do this? Preloading data can give your users a faster navigation time when navigating to a page whose data has already been loaded.'
      ),
      _react2.default.createElement(
        _Note2.default,
        null,
        'You should only use this if you implement some sort of caching/lookup in your load functions. The load function will be recalled when the user actually navigates to the route, so the benefit comes from the load function using a cached value instead of sending a new request to your server.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '// call a route\'s load function manually\nconfig.addons.prefetch(\'User\', { id: 2 })'
      ),
      _react2.default.createElement(
        'p',
        null,
        'This addon will only register routes that have a load function in their load object.'
      )
    )
  );
};

exports.default = {
  name: name,
  version: version,
  type: type,
  component: CuriAddonPrefetch
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BasePackage = __webpack_require__(3);

var _BasePackage2 = _interopRequireDefault(_BasePackage);

var _PrismBlocks = __webpack_require__(1);

var _curiReact = __webpack_require__(2);

var _APIBlock = __webpack_require__(4);

var _APIBlock2 = _interopRequireDefault(_APIBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'curi-side-effect-title';
var version = '0.1.2';
var type = 'side-effect';

var CuriSideEffectTitle = function CuriSideEffectTitle() {
  return _react2.default.createElement(
    _BasePackage2.default,
    { name: name, version: version },
    _react2.default.createElement(
      _APIBlock2.default,
      null,
      _react2.default.createElement(
        'h3',
        null,
        'createTitleSideEffect'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import createConfig from \'curi\';\nimport createTitleSideEffect from \'curi-side-effect-title\';\n\nconst setTitle = createTitleSideEffect({ suffix: \'| My Site\' });\n\nconst config = createConfig(history, routes, {\n  sideEffects: [setTitle]\n});'
      ),
      _react2.default.createElement(
        'p',
        null,
        'In order for this to work, you will need to set title properties on your routes. You can learn more about ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'route.title'
        ),
        ' in the',
        ' ',
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Guide', params: { slug: 'routes' } },
          'all about routes'
        ),
        ' guide.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'You can provide a prefix and/or a suffix string that will be included before/after the title.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const prefixedTitle = createTitleSideEffect({ prefix: \'Before |\'});\n// response.title = \'Middle\'\n// document.title = \'Before | Middle\';\n\nconst suffixedTitle = createTitleSideEffect({ suffix: \'| After\'});\n// response.title = \'Middle\'\n// document.title = \'Middle | After\';'
      )
    )
  );
};

exports.default = {
  name: name,
  version: version,
  type: type,
  component: CuriSideEffectTitle
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BasePackage = __webpack_require__(3);

var _BasePackage2 = _interopRequireDefault(_BasePackage);

var _PrismBlocks = __webpack_require__(1);

var _curiReact = __webpack_require__(2);

var _APIBlock = __webpack_require__(4);

var _APIBlock2 = _interopRequireDefault(_APIBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'curi-side-effect-scroll';
var version = '0.1.0';
var type = 'side-effect';

var CuriSideEffectScroll = function CuriSideEffectScroll() {
  return _react2.default.createElement(
    _BasePackage2.default,
    { name: name, version: version },
    _react2.default.createElement(
      _APIBlock2.default,
      null,
      _react2.default.createElement(
        'h3',
        null,
        'createScrollSideEffect'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import createConfig from \'curi\';\nimport createScrollSideEffect from \'curi-side-effect-scroll\';\n\nconst scrollTo = createScrollSideEffect();\n\nconst config = createConfig(history, routes, {\n  sideEffects: [scrollTo]\n});'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Hickory, the history package that Curi uses, uses the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'pushState'
        ),
        ' ',
        'and ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'replaceState'
        ),
        ' methods for navigation. Unfortunately, these do not trigger scrolling to the top of the page when you navigate. This package provides a side effect function that will scroll to the top of the page whenever those functions are used for navigation.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Other navigation, such as clicking the browsers back and forward buttons, rely on the browser to restore the scroll position.'
      )
    )
  );
};

exports.default = {
  name: name,
  version: version,
  type: type,
  component: CuriSideEffectScroll
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BasePackage = __webpack_require__(3);

var _BasePackage2 = _interopRequireDefault(_BasePackage);

var _PrismBlocks = __webpack_require__(1);

var _APIBlock = __webpack_require__(4);

var _APIBlock2 = _interopRequireDefault(_APIBlock);

var _curiReact = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'curi-react';
var version = '0.8.0';
var type = 'react';

var reexports = ['curi-react-navigator', 'curi-react-link', 'curi-react-redirect', 'curi-react-block', 'curi-react-active', 'curi-react-curious'];

var CuriReact = function CuriReact() {
  return _react2.default.createElement(
    _BasePackage2.default,
    { name: name, version: version },
    _react2.default.createElement(
      _APIBlock2.default,
      null,
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import {\n  Navigator,\n  Link,\n  Redirect,\n  Block,\n  Active,\n  curious\n} from \'curi-react\';'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The curi-react package re-exports a number of React specific Curi packages. You can read the documentation for each one on their respective pages.'
      ),
      _react2.default.createElement(
        'ul',
        null,
        reexports.map(function (p) {
          return _react2.default.createElement(
            'li',
            { key: p },
            _react2.default.createElement(
              _curiReact.Link,
              { to: 'Package', params: { package: p } },
              p
            )
          );
        })
      )
    )
  );
};

exports.default = {
  name: name,
  version: version,
  type: type,
  component: CuriReact
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BasePackage = __webpack_require__(3);

var _BasePackage2 = _interopRequireDefault(_BasePackage);

var _PrismBlocks = __webpack_require__(1);

var _APIBlock = __webpack_require__(4);

var _APIBlock2 = _interopRequireDefault(_APIBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'curi-react-navigator';
var version = '0.3.0';
var type = 'react';

var CuriReactNavigator = function CuriReactNavigator() {
  return _react2.default.createElement(
    _BasePackage2.default,
    { name: name, version: version },
    _react2.default.createElement(
      _APIBlock2.default,
      null,
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import Navigator from \'curi-react-navigator\';'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '<Navigator>'
        ),
        ' component provides a way to automatically re-render your application when the location changes. This component gets passed a curi configuration object, which it will subscribe to so that it can re-render when the location changes.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'jsx' },
        'const config = createConfig(history, routes);\n\nReactDOM.render((\n  <Navigator config={config}>\n    {(response, config) => {\n      if (!response) {\n        return null;\n      }\n      return response.body ? <response.body /> : null;\n    }}\n  </Navigator>\n), holder);'
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          'props'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'config'
          ),
          _react2.default.createElement(
            'p',
            null,
            'A configuration object (created by calling curi\'s createConfig function).'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'children'
          ),
          _react2.default.createElement(
            'p',
            null,
            'A render function. This will be called whenever the ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              '<Navigator>'
            ),
            ' ',
            'renders. The function will be passed the current response object and the config object it was passed as a prop. The function must return a React element.'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'response'
          ),
          _react2.default.createElement(
            'p',
            null,
            'A response object. You can pass your ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              '<Navigator>'
            ),
            ' a response object and it will use that instead of subscribing to the configuration object. This is ideal for server-side rendering.'
          )
        )
      )
    )
  );
};

exports.default = {
  name: name,
  version: version,
  type: type,
  component: CuriReactNavigator
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BasePackage = __webpack_require__(3);

var _BasePackage2 = _interopRequireDefault(_BasePackage);

var _PrismBlocks = __webpack_require__(1);

var _APIBlock = __webpack_require__(4);

var _APIBlock2 = _interopRequireDefault(_APIBlock);

var _Note = __webpack_require__(7);

var _Note2 = _interopRequireDefault(_Note);

var _Warning = __webpack_require__(63);

var _Warning2 = _interopRequireDefault(_Warning);

var _curiReact = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'curi-react-link';
var version = '0.6.0';
var type = 'react';

var CuriReactLink = function CuriReactLink() {
  return _react2.default.createElement(
    _BasePackage2.default,
    { name: name, version: version },
    _react2.default.createElement(
      _APIBlock2.default,
      null,
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import Link from \'curi-react-link\';'
      ),
      _react2.default.createElement(
        'p',
        null,
        'A ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '<Link>'
        ),
        ' allows you to navigate within your application using an anchor element (<a&gtl;). When the rendered element is clicked, instead of reloading the page it will use your configuration object\'s history object to navigate.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Instead of providing a URI to navigate to, you just need to specify the name of the route you want to link to. Then, the pathname of the URI you want the component to link to will be automatically generated for you.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '<Link to=\'User\' params={{ id: 16 }}>User 16</Link>\n// <a href=\'/user/16\'>User 16</a>'
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          'props'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'to'
          ),
          _react2.default.createElement(
            'p',
            null,
            'The name of the route that you want to navigate to.'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'params'
          ),
          _react2.default.createElement(
            'p',
            null,
            'If the route that you want to navigate to (or any of its parents) include path parameters, you can specify them using the params prop.'
          ),
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'javascript' },
            '// User route is { name: \'User\', path: \'/user/:id\' }\n<Link to=\'User\' params={{ id: 16 }}>User 16</Link>'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'details'
          ),
          _react2.default.createElement(
            'p',
            null,
            'While the pathname of the location to navigate to will be generated for you, this does not cover over location properties (query, hash, and state). You can provide these values using the details prop.'
          ),
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'javascript' },
            '<Link\n  to=\'Products\'\n  params={{ type: \'vacuums\' }}\n  details={{ hash: \'iroomba\' }}\n>\n  DJ Roomba\n</Link>'
          ),
          _react2.default.createElement(
            _Note2.default,
            null,
            'You can also include a pathname property in the details object and it will overwrite the one generated from the to prop. This isn\'t recommended, but does work.'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'anchor'
          ),
          _react2.default.createElement(
            'p',
            null,
            'By default, when you render a ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              '<Link>'
            ),
            ', an anchor element will be rendered (',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'React.createElement(\'a\', ...)'
            ),
            '). However, you can provide your own component to be rendered instead. This can be useful for using styled components to navigate.'
          ),
          _react2.default.createElement(
            _Warning2.default,
            null,
            'You can provide any component that you want, but you ',
            _react2.default.createElement(
              'em',
              null,
              'should'
            ),
            ' stick with an anchor (or a component that renders an anchor). There are accessibility issues that will occur when you use other DOM elements as links. The component\'s prop type is func in an attempt to discourage you from making your link render a button, div, span, etc.'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'active'
          ),
          _react2.default.createElement(
            'p',
            null,
            'The active prop gives you an opportunity to style the element rendered by the',
            ' ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              '<Link>'
            ),
            ' when it is "active". Being active means that the',
            ' ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              '<Link>'
            ),
            '\'s route parameters are the same as the current response\'s route parameters. This ',
            _react2.default.createElement(
              'strong',
              null,
              'does not'
            ),
            ' take into account any query parameters or the hash.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'The active prop is an object with two properties. The first one, merge is required. The merge property must be a function. That function\'s argument is the props object that will be passed used to render the element rendered by the ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              '<Link>'
            ),
            '. The merge function can modify these props however it likes. It must return the resulting props object.'
          ),
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'javascript' },
            'function mergeActive(props) {\n  props.className = \'active\';\n  return props;\n}\n\n<Link to=\'Home\' active={{ merge: mergeActive }}>Home</Link>'
          ),
          _react2.default.createElement(
            'p',
            null,
            'The second property of the active object is partial. By default, only',
            ' ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              '<Link>'
            ),
            's that match the response object\'s name can be considered "active". However, when partial is true, any parent routes can also be "active". This is done using the response object\'s partials property.'
          ),
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'javascript' },
            '<Link to=\'Users\' active={{ partial: true, merge: mergeActive }}>Users</Link>'
          ),
          _react2.default.createElement(
            _Note2.default,
            null,
            'If you use the active prop, you have to include the',
            ' ',
            _react2.default.createElement(
              _curiReact.Link,
              { to: 'Package', params: { package: 'curi-addon-active' } },
              'curi-addon-active'
            ),
            ' addon in your Curi configuration object. If you do not, an error will be thrown.'
          )
        )
      )
    )
  );
};

exports.default = {
  name: name,
  version: version,
  type: type,
  component: CuriReactLink
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { className: 'warning' },
    _react2.default.createElement(
      'strong',
      null,
      'Warning:'
    ),
    ' ',
    children
  );
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BasePackage = __webpack_require__(3);

var _BasePackage2 = _interopRequireDefault(_BasePackage);

var _PrismBlocks = __webpack_require__(1);

var _APIBlock = __webpack_require__(4);

var _APIBlock2 = _interopRequireDefault(_APIBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'curi-react-redirect';
var version = '0.4.0';
var type = 'react';

var CuriReactRedirect = function CuriReactRedirect() {
  return _react2.default.createElement(
    _BasePackage2.default,
    { name: name, version: version },
    _react2.default.createElement(
      _APIBlock2.default,
      null,
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import Redirect from \'curi-react-redirect\';'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '<Redirect>'
        ),
        ' component lets you "render" a redirect. After the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '<Redirect>'
        ),
        ' component has mounted, it will call the appropriate history method to navigate to a new location.'
      ),
      _react2.default.createElement(
        'p',
        null,
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '<Redirect>'
        ),
        ' works very similarly to a ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '<Link>'
        ),
        ', except instead of having navigation triggered by a click, with a ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '<Redirect>'
        ),
        ' ',
        'the navigation will happen automatically just by rendering the component.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'jsx' },
        '<Redirect to=\'Home\' />'
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          'props'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'to'
          ),
          _react2.default.createElement(
            'p',
            null,
            'The name of the route that should be used to generate the pathname of the location to navigate to.'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'params'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Any path params of the route specified with the to prop (or the params for any of its ancestor routes).'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'details'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Additional location properties to include when generating the URI to redirect to (search, hash, state).'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'children'
          ),
          _react2.default.createElement(
            'p',
            null,
            'You can provide a children element that will be rendered until the response generated by the redirect has resolved. This allows you to render some sort of "loading" message, which can be useful if the redirect takes a bit of time and you don\'t want to just render a blank page.'
          )
        )
      )
    )
  );
};

exports.default = {
  name: name,
  version: version,
  type: type,
  component: CuriReactRedirect
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BasePackage = __webpack_require__(3);

var _BasePackage2 = _interopRequireDefault(_BasePackage);

var _PrismBlocks = __webpack_require__(1);

var _APIBlock = __webpack_require__(4);

var _APIBlock2 = _interopRequireDefault(_APIBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'curi-react-block';
var version = '0.3.0';
var type = 'react';

var CuriReactBlock = function CuriReactBlock() {
  return _react2.default.createElement(
    _BasePackage2.default,
    { name: name, version: version },
    _react2.default.createElement(
      _APIBlock2.default,
      null,
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import Block from \'curi-react-block\';'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '<Block>'
        ),
        ' component lets you prevent navigation until a user has confirmed that they want to navigate. This can be useful when the user attempts to navigate away from a partially filled form. This ',
        _react2.default.createElement(
          'strong',
          null,
          'will not'
        ),
        ' prevent the user from navigating to another site, it only works for navigation within the application.'
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          'props'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'when'
          ),
          _react2.default.createElement(
            'p',
            null,
            'A boolean, which is true by default. When it is true, the navigation block is active. When it is false, navigation will not be blocked.'
          ),
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'jsx' },
            '// will block navigation\n<Block when={true} confirm={confirm} />\n\n// will not block navigation\n<Block when={false} confirm={confirm} />'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'confirm'
          ),
          _react2.default.createElement(
            'p',
            null,
            'The confirm prop is a function that will be called whenever there is navigation. The function will receive four arguments: location, action, success, and failure. The location and action values are the location object that is being navigated to and the type of navigation. The success and failure arguments are functions that you should call depending on whether or not you want to let the navigation happen. When the navigation should occur, the confirm function should call the success function. When the navigation should be cancelled, the failure function should be called.'
          ),
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'jsx' },
            '<Block\n  confirm={(location, action, success, failure) => {\n    const response = window.confirm("Shall we?");\n    if (response) {\n      success();\n    } else {\n      failure();\n    }\n  }}\n/>'
          )
        )
      )
    )
  );
};

exports.default = {
  name: name,
  version: version,
  type: type,
  component: CuriReactBlock
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BasePackage = __webpack_require__(3);

var _BasePackage2 = _interopRequireDefault(_BasePackage);

var _PrismBlocks = __webpack_require__(1);

var _APIBlock = __webpack_require__(4);

var _APIBlock2 = _interopRequireDefault(_APIBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'curi-react-curious';
var version = '0.3.0';
var type = 'react';

var CuriReactCurious = function CuriReactCurious() {
  return _react2.default.createElement(
    _BasePackage2.default,
    { name: name, version: version },
    _react2.default.createElement(
      _APIBlock2.default,
      null,
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import curious from \'curi-react-curious\';'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The curious higher-order component creates a component that has a ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'curi'
        ),
        ' and',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'response'
        ),
        ' props. The curi prop is your application\'s configuration object. The response prop is the current response object generated by your Curi configuration object.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'class MyComponent extends React.Component {\n  render() {\n    // because this component is wrapped with curious,\n    // you can access this.props.curi and\n    // this.props.response\n  }\n}\n\nexport default curious(MyComponent);'
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          'props'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'internalRef'
          ),
          _react2.default.createElement(
            'p',
            null,
            'A ref function that you can use to access the wrapped component.'
          ),
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'jsx' },
            'const WrappedComponent = curious(MyComponent);\n\n<WrappedComponent internalRef={node => ref = node} />'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'Other props'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Any other props that you pass to the wrapped component will be available to the base component.'
          ),
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'jsx' },
            'const WrappedComponent = curious(MyComponent);\n\n<WrappedComponent one=\'two\' red=\'blue\' />\n// MyComponent\'s props: { curi: {...}, response: {...}, one: \'two\', red: \'blue\' }'
          )
        )
      )
    )
  );
};

exports.default = {
  name: name,
  version: version,
  type: type,
  component: CuriReactCurious
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BasePackage = __webpack_require__(3);

var _BasePackage2 = _interopRequireDefault(_BasePackage);

var _PrismBlocks = __webpack_require__(1);

var _APIBlock = __webpack_require__(4);

var _APIBlock2 = _interopRequireDefault(_APIBlock);

var _curiReact = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'curi-react-active';
var version = '0.2.0';
var type = 'react';

var CuriReactActive = function CuriReactActive() {
  return _react2.default.createElement(
    _BasePackage2.default,
    { name: name, version: version },
    _react2.default.createElement(
      _APIBlock2.default,
      null,
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import Active from \'curi-react-active\';'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '<Active>'
        ),
        ' component lets you modify its children element\'s props. It takes a merge function as a prop, which you can use to modify the child element\'s props when the component is "active".'
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          'props'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'name'
          ),
          _react2.default.createElement(
            'p',
            null,
            'The name of the route to compare against the response object.'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'params'
          ),
          _react2.default.createElement(
            'p',
            null,
            'An object containing route parameters. These will be compared against the route params of the response object.'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'children'
          ),
          _react2.default.createElement(
            'p',
            null,
            'A React element that will have its props updated when the ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              '<Active>'
            ),
            ' ',
            'component is "active".'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'merge'
          ),
          _react2.default.createElement(
            'p',
            null,
            'A function that will modify the children element\'s props. It receives a props object as its argument and must return a props object.'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'partial'
          ),
          _react2.default.createElement(
            'p',
            null,
            'A boolean that defaults to false. When it is true, the "active" check will check the response\'s partials array in addition to its name. This allows you to style ancestor routes of the actually "active" route.'
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        'Usage'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'jsx' },
        'function merge(props) {\n  props.className = \'active\';\n  return props; \n}\n\nconst Users = (props) => (\n  {\n    props.users.map(u => (\n      <Active\n        key={u.id}\n        name=\'User\'\n        params={u}\n      >\n        <User {...u} />\n      </Active>\n    ))\n  }\n);'
      ),
      _react2.default.createElement(
        'p',
        null,
        'This relies on the active addon from',
        ' ',
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Package', params: { package: 'curi-addon-active' } },
          'curi-addon-active'
        ),
        ' being added to your configuration object.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import createActiveAddon from \'curi-active-addon\';\n\nconst config = createConfig(history, routes, {\n  addons: [createActiveAddon]\n});'
      ),
      _react2.default.createElement(
        'p',
        null,
        'While not strictly a requirement, the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '<Active>'
        ),
        ' relies on the',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'curi'
        ),
        ' and ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'curiResponse'
        ),
        ' context variables existing, so your application should have a ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '<Navigator>'
        ),
        ' (from',
        ' ',
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Package', params: { package: 'curi-react-navigator' } },
          'curi-react-navigator'
        ),
        ') as an ancestor of your ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '<Active>'
        ),
        ' components in order to ensure that those exist.'
      )
    )
  );
};

exports.default = {
  name: name,
  version: version,
  type: type,
  component: CuriReactActive
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _BasePackage = __webpack_require__(3);

var _BasePackage2 = _interopRequireDefault(_BasePackage);

var _PrismBlocks = __webpack_require__(1);

var _APIBlock = __webpack_require__(4);

var _APIBlock2 = _interopRequireDefault(_APIBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'curi-vue';
var version = '0.3.0';
var type = 'vue';

var CuriVue = function CuriVue() {
  return _react2.default.createElement(
    _BasePackage2.default,
    { name: name, version: version },
    _react2.default.createElement(
      _APIBlock2.default,
      null,
      _react2.default.createElement(
        'h3',
        null,
        'CuriPlugin'
      ),
      _react2.default.createElement(
        'p',
        null,
        'curi-vue exports a Vue plugin that you can use to add Curi support to a Vue application. The plugin is passed to Vue using the use method. Along with the plugin, you will need to pass your Curi configuration object to ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'Vue.use'
        ),
        '.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import CuriPlugin from \'curi-vue\';\n\nconst config = createConfig(history, routes);\nVue.use(CuriPlugin, { config });'
      ),
      _react2.default.createElement(
        'p',
        null,
        'This will do two things. First, it will register a ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'curi-link'
        ),
        ' component with Vue. You can use that component to navigate within your application. Second, it makes your configuration a global Vue property, which you can then access as ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'Vue.Curi'
        ),
        '.'
      )
    ),
    _react2.default.createElement(
      'div',
      { id: 'usage' },
      _react2.default.createElement(
        'h2',
        null,
        'Usage'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The following is one way to setup rendering for a Curi + Vue application.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '// 1. wait for the initial response to be resolved\nconfig.ready().then(resp => {\n  // 2. create the Vue app\n  const vm = new Vue({\n    el: \'#app\',\n    // 3. initialize the data with the first response object\n    data: {\n      response: resp\n    },\n    // 4. Add a rendering function to the methods. This will be in charge\n    //    of rendering your application using the response.\n    methods: {\n      render: function(h, resp) {\n        const { body } = resp;\n        return h(body, { params: resp.params });\n      }\n    },\n    // 5. Add a render function to your Vue. This will call the rendering\n    //    function that you defined above.\n    render: function(h) {\n      return this.render(h, this.response);\n    }\n  });\n\n  // 6. Subscribe to the config and update vm.response whenever\n  //    a new response is generated.\n  config.subscribe(resp => {\n    vm.response = resp;\n  });\n});'
      )
    )
  );
};

exports.default = {
  name: name,
  version: version,
  type: type,
  component: CuriVue
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Package = __webpack_require__(70);

var _Package2 = _interopRequireDefault(_Package);

var _Packages = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Package',
  path: ':package/',
  body: function body() {
    return _Package2.default;
  },
  title: function title(params) {
    return params.package;
  },
  load: function load(params, rc) {
    if (_Packages.byName[params.package]) {
      rc.setData(_Packages.byName[params.package]);
    }
    return Promise.resolve();
  }
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _PrismBlocks = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var params = _ref.params,
      data = _ref.data;

  var Component = data.component;
  return Component ? _react2.default.createElement(Component, null) : _react2.default.createElement(
    'div',
    null,
    'The package ',
    _react2.default.createElement(
      _PrismBlocks.InlineJS,
      null,
      params.package
    ),
    ' could not be found'
  );
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Examples = __webpack_require__(72);

var _Examples2 = _interopRequireDefault(_Examples);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Examples',
  path: 'examples/',
  body: function body() {
    return _Examples2.default;
  },
  title: 'Examples'
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    'Examples coming soon. For now check out the examples on',
    ' ',
    _react2.default.createElement(
      'a',
      { href: 'https://github.com/pshrmn/curi/tree/master/examples' },
      'GitHub'
    ),
    '.'
  );
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Nav = __webpack_require__(74);

var _Nav2 = _interopRequireDefault(_Nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(response, config) {
  if (!response || !response.body) {
    return null;
  } else {
    var Body = response.body,
        params = response.params,
        data = response.data;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'header',
        null,
        _react2.default.createElement(_Nav2.default, null)
      ),
      _react2.default.createElement(
        'main',
        null,
        _react2.default.createElement(Body, { params: params, data: data })
      )
    );
  }
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _curiReact = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'nav',
    null,
    _react2.default.createElement(
      'ul',
      null,
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Home', className: 'home-link' },
          'Curi'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Packages' },
          'Packages'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Guide', params: { slug: 'getting-started' } },
          'Guides'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _curiReact.Link,
          { to: 'Examples' },
          'Examples'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'a',
          { href: 'https://github.com/pshrmn/curi' },
          'GitHub'
        )
      )
    )
  );
};

/***/ })
],[20]);