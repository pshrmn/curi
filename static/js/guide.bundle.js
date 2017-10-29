webpackJsonp([3],{

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Guides = __webpack_require__(72);

var _Guides2 = _interopRequireDefault(_Guides);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var params = _ref.params,
      data = _ref.data;

  if (!data) {
    return _react2.default.createElement(
      'div',
      null,
      'The requested gudie could not be found.'
    );
  }
  var Component = _Guides2.default[params.slug];
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

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _GuideLinks = __webpack_require__(74);

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

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Installation = __webpack_require__(73);

var _Installation2 = _interopRequireDefault(_Installation);

var _GettingStarted = __webpack_require__(75);

var _GettingStarted2 = _interopRequireDefault(_GettingStarted);

var _AllAboutRoutes = __webpack_require__(76);

var _AllAboutRoutes2 = _interopRequireDefault(_AllAboutRoutes);

var _RenderingWithResponses = __webpack_require__(77);

var _RenderingWithResponses2 = _interopRequireDefault(_RenderingWithResponses);

var _UsingAddons = __webpack_require__(78);

var _UsingAddons2 = _interopRequireDefault(_UsingAddons);

var _UsingSideEffects = __webpack_require__(79);

var _UsingSideEffects2 = _interopRequireDefault(_UsingSideEffects);

var _ResponseCaching = __webpack_require__(80);

var _ResponseCaching2 = _interopRequireDefault(_ResponseCaching);

var _CodeSplitting = __webpack_require__(81);

var _CodeSplitting2 = _interopRequireDefault(_CodeSplitting);

var _Load = __webpack_require__(82);

var _Load2 = _interopRequireDefault(_Load);

var _ReactBasics = __webpack_require__(83);

var _ReactBasics2 = _interopRequireDefault(_ReactBasics);

var _MigrateReactRouterv = __webpack_require__(84);

var _MigrateReactRouterv2 = _interopRequireDefault(_MigrateReactRouterv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  'installation': _Installation2.default,
  'getting-started': _GettingStarted2.default,
  'routes': _AllAboutRoutes2.default,
  'responses': _RenderingWithResponses2.default,
  'addons': _UsingAddons2.default,
  'side-effects': _UsingSideEffects2.default,
  'response-caching': _ResponseCaching2.default,
  'code-splitting': _CodeSplitting2.default,
  'load': _Load2.default,
  'react': _ReactBasics2.default,
  'migrate-rrv3': _MigrateReactRouterv2.default
};

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(1);

var _BaseGuide = __webpack_require__(54);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
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
      _Sections.Section,
      {
        title: 'Promises',
        id: 'promises'
      },
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
      _react2.default.createElement(
        _react3.Link,
        { to: 'Guide', params: { slug: 'getting-started' } },
        'Get started'
      ),
      ' with Curi.'
    )
  );
};

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(1);

var _guides = __webpack_require__(15);

var _styleActive = __webpack_require__(7);

var _styleActive2 = _interopRequireDefault(_styleActive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupGuides = function GroupGuides(_ref) {
  var guides = _ref.guides,
      withDescription = _ref.withDescription;
  return _react2.default.createElement(
    'ul',
    { className: 'link-list' },
    guides.map(function (g) {
      return _react2.default.createElement(
        'li',
        { key: g.name, className: withDescription ? 'with' : 'solo' },
        _react2.default.createElement(
          _react3.Link,
          {
            to: 'Guide',
            params: { slug: g.slug },
            active: { merge: _styleActive2.default }
          },
          g.name
        )
      );
    })
  );
};

exports.default = function (_ref2) {
  var _ref2$withDescription = _ref2.withDescription,
      withDescription = _ref2$withDescription === undefined ? false : _ref2$withDescription;
  return _react2.default.createElement(
    'ul',
    null,
    Object.keys(_guides.groupedGuides).map(function (name) {
      return _react2.default.createElement(
        'li',
        { className: 'link-group', key: name },
        _react2.default.createElement(
          'h3',
          null,
          name
        ),
        _react2.default.createElement(GroupGuides, {
          guides: _guides.groupedGuides[name],
          withDescription: withDescription
        })
      );
    })
  );
};

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(1);

var _BaseGuide = __webpack_require__(54);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
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
      _Sections.Section,
      {
        title: 'The History Object',
        id: 'history-object'
      },
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
        '// Use Browser when your website has a dynamic server\nimport Browser from \'@hickory/browser\';\nconst browserHistory = Browser();\n\n// Use Hash when your website uses a static file server\nimport Hash from \'@hickory/hash\';\nconst hashHistory = Hash();\n\n// Use InMemory when your application doesn\'t run in a browser\nimport InMemory from \'@hickory/in-memory\';\nconst memoryHistory = InMemory();'
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
      _Sections.Section,
      {
        title: 'The Routes Array',
        id: 'routes-array'
      },
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
          _react3.Link,
          { to: 'Guide', params: { slug: 'routes' } },
          'All About Routes'
        ),
        ' guide.'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'The Configuration Object',
        id: 'configuration-object'
      },
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
        'import createConfig from \'curi\';\nimport Browser from \'@hickory/browser\';\nimport routes from \'./routes\';\n\nconst history = Browser();\nconst config = createConfig(history, routes);\n'
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'Other configuration options',
          id: 'other-configuration-options'
        },
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
            _react3.Link,
            { to: 'Guide', params: { slug: 'addons' } },
            'addons'
          ),
          ',',
          ' ',
          _react2.default.createElement(
            _react3.Link,
            { to: 'Guide', params: { slug: 'side-effects' } },
            'side effects'
          ),
          ', a',
          ' ',
          _react2.default.createElement(
            _react3.Link,
            { to: 'Guide', params: { slug: 'response-caching' } },
            'cache'
          ),
          ', and a',
          ' ',
          _react2.default.createElement(
            'a',
            { href: 'https://github.com/pillarjs/path-to-regexp#compile-reverse-path-to-regexp' },
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'pathnameOptions'
            )
          ),
          ' object to your configuration object.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          'const config = createConfig(history, routes, {\n  addons: [...],\n  sideEffects: [...],\n  cache: cacheObject,\n  pathnameOptions: { encode: x => x }\n});'
        )
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Responses'
      },
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
          _react3.Link,
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
        _react3.Link,
        { to: 'Guide', params: { slug: 'routes' } },
        'All About Routes'
      ),
      ' guide.'
    )
  );
};

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(1);

var _BaseGuide = __webpack_require__(54);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(6);

var _Messages = __webpack_require__(12);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
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
      _Sections.Section,
      {
        title: 'Matching Routes',
        id: 'matching-routes'
      },
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
      _Sections.Section,
      {
        title: 'Route properties',
        id: 'route-properties'
      },
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'name',
          id: 'name'
        },
        _react2.default.createElement(
          'p',
          null,
          'A unique identifier. This should be a string or a symbol.'
        )
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'path',
          id: 'path'
        },
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
          _Messages.Note,
          null,
          'While path-to-regexp supports arrays and RegExps, only string paths are supported here. This is because the path must also be reversible to create a pathname given params.'
        )
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'pathOptions',
          id: 'pathOptions'
        },
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
          _Messages.Note,
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
        _Sections.Subsection,
        {
          title: 'body',
          id: 'body'
        },
        _react2.default.createElement(
          'p',
          null,
          'The body property gives you the opportunity to set the body property of a response for a given route. This must be a function and its return value will be what is set as the response object\'s body property.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          '// when the user visits /contact, the response object\'s body\n// property will be the Contact value\nconst contact = {\n  name: \'Contact\',\n  path: \'contact\',\n  body: () => Contact\n};'
        ),
        _react2.default.createElement(
          'p',
          null,
          'While the above example returns a single value, you might have multiple page values that you want to associate with a route. In that case, you can return an object with a property for each one. Then, when you render the application, you would access the values using ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'response.body.<property-name>'
          ),
          '.',
          ' ',
          'If you take this approach, each route\'s ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'body'
          ),
          ' function should return an object with the same properties.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          'const routes = [\n  {\n    name: \'Home\',\n    path: \'\',\n    body: () => ({ main: Home, nav: HomeNav })\n  },\n  {\n    name: \'Contact\',\n    path: \'contact\',\n    body: () => ({ main: Contact, nav: ContactNav })\n  }\n];\n\nfunction render(response) {\n  const { main, nav } = response.body\n  ...\n}'
        )
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'title',
          id: 'title'
        },
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
        _Sections.Subsection,
        {
          title: 'children',
          id: 'children'
        },
        _react2.default.createElement(
          'p',
          null,
          'An optional array of route objects. Any child routes will be matched relative to their parent route\'s path. This means that if a parent route\'s path string is \'one\' and a child route\'s path string is \'two\', the child will match when the pathname is \'one/two\'.'
        )
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'preload',
          id: 'preload'
        },
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
        _Sections.Subsection,
        {
          title: 'load',
          id: 'load'
        },
        _react2.default.createElement(
          'p',
          null,
          'A function that can be used for data fetching as well as for triggering redirects. The load function will be passed the a "route" object containing the params object that is parsed from the location\'s pathname (using the route and its ancestor\'s paths), the current location, and then name of the matched route. Additionally, it will be passed a modifiers object that can be used to modify the response object that will be created and an object containing all of the registered Curi addons (the ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'pathname'
          ),
          ' addon being particularly useful).'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Like preload, load must return a Promise.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          '// set response data\nconst user = {\n  name: \'User\',\n  path: \':id\',\n  load: ({ params, location }, mod, addons) => {\n    return fetch(`/api/users/${params.id}`)\n      .then(resp => JSON.parse(resp))\n      .then(data => mod.setData(data);)\n      .catch(err => {\n        mod.fail(err);\n        mod.setStatus(404);\n      });\n  }\n}\n\n// set a permanent redirect\nconst routes = [\n  {\n    name: \'Photo\',\n    path: \'p/:id\'\n  },\n  {\n    name: \'Old Photo\',\n    path: \'photo/:id\',\n    load: ({ params, location }, mod, addons) => {\n      const pathname = addons.pathname(\'Photo\', params);\n      mod.redirect({ ...location, pathname }, 301);\n    }\n  }\n]\n// navigating to /photo/123 will automatically redirect to /p/123'
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
            ' - This allows you to turn the response into a redirect response. When you application receives a redirect response, it should redirect to the new location (using your history object) instead of re-rendering. If you do not provide a code, then 301 will be used. Setting the status code is mostly important for rendering on the server. The ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'to'
            ),
            ' argument should be a string or a location object. Once the response has been created, Curi will automatically redirect to the ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'to'
            ),
            ' location.'
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
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'params',
          id: 'params'
        },
        _react2.default.createElement(
          'p',
          null,
          'When ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'path-to-regexp'
          ),
          ' matches your paths, all parameters are extracted as strings. However, you might have some route params to be other types. You can provide functions to transform params using the ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'route.params'
          ),
          ' ',
          'object. To transform a param, its name should be the string value from the path. The paired value should be a function that takes a string (the value from the pathname) and returns a new value (transformed however you want).'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          'const routes = [\n  {\n    name: \'Number\',\n    path: \'number/:num\',\n    params: {\n      num: n => parseInt(n, 10)\n    }\n  }\n]\n// when the user visits /number/1,\n// response.params will be { num: 1 } instead of { num: "1" }'
        )
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'extra',
          id: 'extra'
        },
        _react2.default.createElement(
          'p',
          null,
          'If you have any additional properties that you want attached to a route, use the ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'extra'
          ),
          ' property. You will be able to use ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'route.extra'
          ),
          ' in any custom addons or when a route matches via ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'response.route.extra'
          ),
          '.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'You can attach anything you want to ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'extra'
          ),
          ' or you may never find yourself needing to use this. One possible use case for ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'extra'
          ),
          ' is that you could specify entrance/exit animation types. One route might want to fade in, while another might slide in.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          'const routes = [\n  {\n    name: \'A Route\',\n    path: \'a-route\',\n    extra: {\n      transition: \'fade\'\n    }\n  },\n  {\n    name: \'B Route\',\n    path: \'b-route\',\n    extra: {\n      enter: \'slide-right\'\n    }\n  }\n];'
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
          _react3.Link,
          { to: 'Guide', params: { slug: 'responses' } },
          'Rendering with Responses'
        ),
        ' guide to learn how.'
      )
    )
  );
};

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(1);

var _BaseGuide = __webpack_require__(54);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(6);

var _Messages = __webpack_require__(12);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
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
      _Sections.Section,
      {
        title: 'The Properties of a Response Object',
        id: 'properties'
      },
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '{\n  // The location key\n  key: \'1.0\',\n\n  // The location object used to generate the response.\n  location: { pathname: \'/photos/6789/12345\', ... },\n\n  // The status code for the response.\n  // This defaults to 200, but can be changed\n  // if no routes match or a route issues a redirect.\n  status: 200,\n\n  // If the route had a load function and called\n  // setData, that value will be set here. If not,\n  // this will be undefined.\n  data: {...},\n\n  // The title string generated by the route\n  // or an empty string if the route has no title property\n  title: \'Photo 12345\',\n\n  // The value returned by the route\'s body function\n  body: Photo,\n\n  // The name of the best matching route\n  name: \'Photo\',\n\n  // The name of ancestor routes that matched\n  // part of the location\'s pathname\n  partials: [\'Album\'],\n\n  // An object containing the values parsed\n  // from the pathname by path-to-regexp.\n  params: { photoID: 12345, albumID: 6789 },\n\n  // If an error occurs while generating the\n  // response, it will be set here\n  error: undefined\n}'
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'Redirect Response',
          id: 'redirect-properties'
        },
        _react2.default.createElement(
          'p',
          null,
          'When you redirect, a slightly different response object will be created. You are in charge of actually redirecting, Curi just generates a response that lets you know that you should redirect. You can redirect by using your history object\'s replace (or push) methods, or if you are using one of the library specific Curi packages, there might be a built-in way for you to redirect (e.g. curi-react provides the',
          ' ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Redirect'
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
      _Sections.Section,
      {
        title: 'The Body Property',
        id: 'body-property'
      },
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
        _Messages.Note,
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
      _Sections.Section,
      {
        title: 'The Render Function',
        id: 'render-function'
      },
      _react2.default.createElement(
        'p',
        null,
        'A render function is simply a function that receives a response object as its argument and manipulates the DOM (or its equivalent for non-browser environments) using the response. In React or Vue, a render function would trigger a re-rendering of your application. In vanilla JavaScript, a render function would manually update the DOM.'
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'Rendering Redirects',
          id: 'rendering-redirects'
        },
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
        _Sections.Subsection,
        {
          title: 'Rendering HTML',
          id: 'rendering-HTML'
        },
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
          _react3.Link,
          { to: 'Guide', params: { slug: 'addons' } },
          'Using Addons'
        ),
        ' guide.'
      )
    )
  );
};

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(1);

var _BaseGuide = __webpack_require__(54);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
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
      '{\n  // the string you will use to call the addon\n  name: \'MyAddon\',\n\n  // a function used internally to register routes\n  // with the addon. You only need to use this when\n  // writing your own addons\n  register: function(route, parentData) {...},\n\n  // this is the function that will be added to your\n  // config object\'s addons property. For example, with\n  // this addon, the get function will be called when\n  // you call config.addons.MyAddon(\'...\')\n  get: function(route) {...},\n  reset: function() {...}\n}'
    ),
    _react2.default.createElement(
      'p',
      null,
      'However, when you import them, you are actually importing an addon factory function. You need to call the function to create the addon that you will pass to your Curi configuration'
    ),
    _react2.default.createElement(
      _PrismBlocks.PrismBlock,
      { lang: 'javascript' },
      'function myAddonFactory() {\n  return { name: ..., register: ..., get: ..., };\n}'
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Adding addons',
        id: 'adding'
      },
      _react2.default.createElement(
        'p',
        null,
        'As stated above, whenever you include addons in your configuration object, you do not pass the actual addon object. Instead, you pass an addon instance (multiple configuration objects would each have their own instance of the addon), which can be useful for server-side rendering.'
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
        'const config = createConfig(history, routes, {\n  addons: [createMyAddon()]\n});'
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
      _Sections.Section,
      {
        title: 'Creating Addons',
        id: 'creating'
      },
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
        'The function should return an object with four properties: ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'name'
        ),
        ', ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'register'
        ),
        ',',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'get'
        ),
        ', and ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'reset'
        ),
        '. name is a unique identifier for the addon, register is a function that will be used for your addon to store information about each route, get is a function that will receive a route\'s name (and possibly other arguments) and perform some task using the related route, and reset is a function that will reset the addon\'s internal state (this is used if you call ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'config.refresh'
        ),
        ').'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'export default function myAddonFactory() {\n  let knownRoutes = {};\n  return {\n    name: \'MyFirstAddon\',\n    register: route => {\n      knownRoutes[route.name] = true;\n    },\n    get: (name) => {\n      return knownRoutes[name] != null\n    },\n    reset: () => {\n      knownRoutes = {};\n    }\n  };\n}'
      ),
      _react2.default.createElement(
        'p',
        null,
        'That is all there is to creating a basic addon. Now, you just need to make sure to pass it to your configuration object and you will be able to call your addon\'s get function from your configuration object.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import createConfig from \'curi\';\nimport myAddonFactory from \'./myAddon\'\n\nconst routes = [{ name: \'Home\', path: \'\' }];\n\nconst config = createConfig(history, routes, {\n  addons: [myAddonFactory()]\n});\n\nconfig.addons.MyFirstAddon(\'Home\'); // true\nconfig.addons.MyFirstAddon(\'Elsewhere\'); // false'
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'Slightly more advanced',
          id: 'Slightly-more-advanced'
        },
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
          'function ParentFactory() {\n  let routeTree = {};\n  return {\n    name: \'routeParent\',\n    register: (route, parent) => {\n      // parent is the value returned by the route\'s parent route\n      // and will be undefined when a route does not have a parent\n      routeTree[route.name] = parent;\n      return route.name;\n    },\n    get: (name) => {\n      return routeTree[name];\n    },\n    reset: () => {\n      routeTree = {};\n    }\n  }\n}'
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
          _react3.Link,
          { to: 'Guide', params: { slug: 'side-effects' } },
          'Using Side Effects'
        ),
        ' guide.'
      )
    )
  );
};

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(1);

var _BaseGuide = __webpack_require__(54);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
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
      _Sections.Section,
      {
        title: 'Adding Side Effects',
        id: 'adding'
      },
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
        '. A side effect is an object with an ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'fn'
        ),
        ' property whose values is a subscriber function.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const config = createConfig(history, routes, {\n  sideEffects: [{ fn: logResponse }]\n});'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Side effects can also have an ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'after'
        ),
        ' property. By default, side effect functions will be called before any subscriber functions (the ones added with ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'config.subscribe'
        ),
        '). However, you might prefer for a side effect to be run after the subscribers. To do that, you just need to include ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'after: true'
        ),
        ' in your side effect object. If you do no provide this property, this will default to ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'false'
        ),
        '.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const config = createConfig(history, routes, {\n  sideEffects: [{ fn: logResponse, after: true }]\n});'
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'Official Side Effects',
          id: 'official'
        },
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
              _react3.Link,
              { to: 'Package', params: { package: 'side-effect-title' } },
              '@curi/side-effect-title'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _react3.Link,
              { to: 'Package', params: { package: 'side-effect-scroll' } },
              '@curi/side-effect-scroll'
            )
          )
        )
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Creating Side Effects',
        id: 'creating'
      },
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
        'function mySideEffect(response, action) {\n  console.log(\'Navigating to\', response.location);\n}\n\nconst config = createConfig(history, routes, {\n  sideEffects: [{ fn: mySideEffect }]\n});'
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
          _react3.Link,
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
          _react3.Link,
          { to: 'Guide', params: { slug: 'response-caching' } },
          'response caching'
        ),
        ' guide.'
      )
    )
  );
};

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(1);

var _BaseGuide = __webpack_require__(54);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(6);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
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

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(1);

var _BaseGuide = __webpack_require__(54);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(6);

var _Messages = __webpack_require__(12);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
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
      'If you are bundling an application with a lot of routes, users of your application may be downloading a lot of unnecessary content just to render the initial page. Using code splitting, you can reduce the initial download size for your application by splitting code that is conditionally loaded into a separate bundle that is only downloaded when it is needed.'
    ),
    _react2.default.createElement(
      _Messages.Note,
      null,
      'This guide assumes that you are using Webpack 2+ to bundle your application.'
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'An app without code splitting',
        id: 'no-split'
      },
      _react2.default.createElement(
        'p',
        null,
        'Let\'s start out by describing our application\'s routes without code splitting. We will import each route\'s component from the files where they are defined.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import Home from \'./components/Home\';\nimport Contact from \'./components/Contact\';\nimport ContactMethod from \'./components/ContactMethod\';\n\nconst routes = [\n  {\n    name: \'Home\',\n    path: \'\',\n    body: () => Home\n  },\n  {\n    name: \'Contact\',\n    path: \'contact\',\n    body: () => Contact,\n    children: [\n      {\n        name: \'Contact Method\',\n        path: \':method\',\n        body: () => ContactMethod\n      }\n    ]\n  }\n];'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Removing static imports',
        id: 'no-static-imports'
      },
      _react2.default.createElement(
        'p',
        null,
        'With code splitting, we don\'t want to have access to the component values when creating our routes because that means we have to download all of them before our application can render. We should remove our import calls so that that doesn\'t happen.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const routes = [\n  {\n    name: \'Home\',\n    path: \'\',\n    body: () => Home\n  },\n  {\n    name: \'Contact\',\n    path: \'contact\',\n    body: () => Contact,\n    children: [\n      {\n        name: \'Contact Method\',\n        path: \':method\',\n        body: () => ContactMethod\n      }\n    ]\n  }\n];'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Importing in preload',
        id: 'preload'
      },
      _react2.default.createElement(
        'p',
        null,
        'Now, ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'Home'
        ),
        ', ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'Contact'
        ),
        ', and',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'ContactMethod'
        ),
        ' are all undefined, so if we tried to render our application we would get errors. We need to actually import our components so that our body functions actually have something to return.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'We will import our components using the preload property of routes. This function will only be called the first time that its route matches, so we don\'t have to worry about making extra requests to our server.'
      ),
      _react2.default.createElement(
        'p',
        null,
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'preload'
        ),
        ' should be a function that returns a Promise. Here, we will call',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'import()'
        ),
        ', which conveniently returns a Promise.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const routes = [\n  {\n    name: \'Home\',\n    path: \'\',\n    preload: () => import(\'./components/Home\'),\n    body: () => Home\n  },\n  {\n    name: \'Contact\',\n    path: \'contact\',\n    preload: () => import(\'./components/Contact\'),\n    body: () => Contact,\n    children: [\n      {\n        name: \'Contact Method\',\n        path: \':method\',\n        preload: () => import(\'./components/ContactMethod\'),\n        body: () => ContactMethod\n      }\n    ]\n  }\n];'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Saving our imports',
        id: 'saving'
      },
      _react2.default.createElement(
        'p',
        null,
        'That will load our components when their route matches, but we still don\'t have access to the component functions that we need in order to render. We will need to use a',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'then'
        ),
        ' call to our ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'import()'
        ),
        ' Promises in order to access the component functions.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'let Home;\nlet Contact;\nlet ContactMethod;\n\nconst routes = [\n  {\n    name: \'Home\',\n    path: \'\',\n    preload: () => (\n      import(\'./components/Home\').then(module => {\n        Home = module.default;\n      })\n    ),\n    body: () => Home\n  },\n  {\n    name: \'Contact\',\n    path: \'contact\',\n    preload: () => (\n      import(\'./components/Contact\').then(module => {\n        Contact = module.default;\n      })\n    ),\n    body: () => Contact,\n    children: [\n      {\n        name: \'Contact Method\',\n        path: \':method\',\n        preload: () => (\n          import(\'./components/ContactMethod\').then(module => {\n            ContactMethod = module.default;\n          })\n        ),\n        body: () => ContactMethod\n      }\n    ]\n  }\n];'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Storing our imports',
        id: 'storing'
      },
      _react2.default.createElement(
        'p',
        null,
        'Our application will now only load components when they are needed and will correctly render. However, it is a bit ugly and error prone to define variables for all of our routes. Instead we can create a "store" where we can store references to each route\'s component. The simplest store is an object, so we will start with that.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const store = {}\n\nconst routes = [\n  {\n    name: \'Home\',\n    path: \'\',\n    preload: () => (\n      import(\'./components/Home\').then(module => {\n        store[\'Home\'] = module.default;\n      })\n    ),\n    body: () => store[\'Home\']\n  },\n  {\n    name: \'Contact\',\n    path: \'contact\',\n    preload: () => (\n      import(\'./components/Contact\').then(module => {\n        store[\'Contact\'] = module.default;\n      })\n    ),\n    body: () => store[\'Contact\'],\n    children: [\n      {\n        name: \'Contact Method\',\n        path: \':method\',\n        preload: () => (\n          import(\'./components/ContactMethod\').then(module => {\n            store[\'ContactMethod\'] = module.default;\n          })\n        ),\n        body: () => store[\'ContactMethod\']\n      }\n    ]\n  }\n];'
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'A better store',
          id: 'better-store'
        },
        _react2.default.createElement(
          'p',
          null,
          'That should be sufficient, although it is not an error proof approach. Our preload functions currently do nothing when there are errors in importing the components. What you do when that happens is up to you, but you would most likely want to have a default component that you display when the error occurs.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'jsx' },
          'const defaultComponent = () => <div>Uh oh, something must have gone wrong</div>;\nconst store = {\n  stored: {},\n  set: function(name, value) {\n    this.stored[name] = value;\n  },\n  get: function(name) {\n    return this.stored[name] || defaultComponent;\n  }\n}\n\n// usage\n{\n  ...,\n  preload: () => (\n    import(\'./components/Something\')\n      .then(module => {\n        store.set(\'Something\', module.default);\n      })\n      .catch(err => {\n        console.error(err);\n        store.set(\'Something\', defaultComponent);\n      })\n  ),\n  body: () => store.get(\'Something\')\n}'
        )
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Next',
        id: 'next'
      },
      _react2.default.createElement(
        'p',
        null,
        'The approaches taken here are not the only way to do code splitting. You may choose to skip the preload method and do code splitting at other points in your application. You may also create a more full-fledged solution for storing loaded imports. Whatever path you decide to go, hopefully this has shown you that setting up code splitting with the preload property is fairly simple to do. If you are using Webpack and want to reduce your initial bundle size, preload is a great way to accomplish this.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Next, we will take a look at a related route property:',
        ' ',
        _react2.default.createElement(
          _react3.Link,
          { to: 'Guide', params: { slug: 'load' } },
          'load'
        ),
        '.'
      )
    )
  );
};

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(1);

var _BaseGuide = __webpack_require__(54);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(6);

var _Messages = __webpack_require__(12);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
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
      'In the code splitting guide, we used the preload property of routes. Routes also have a load property. The biggest difference between the two is that load is called every time a route matches, whereas preload is only called the first time a route matches.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'load is where you should perform any data loading for the route. We\'ll start a new application here, which is a basic recipe site. We want to have a route for a recipe list page as well as a route for specific recipes.'
    ),
    _react2.default.createElement(
      _PrismBlocks.PrismBlock,
      { lang: 'javascript' },
      'const routes = [\n  {\n    name: \'Recipe List\',\n    path: \'recipes\',\n    body: () => RecipeList\n  },\n  {\n    name: \'Recipe\',\n    path: \'recipe/:id\',\n    body: () => Recipe\n  }\n];'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Whenever the Recipe List route matches, we want to fetch a list of recipes from the server. When the Recipe route matches, we just want one specific recipe (using the id param from the path).'
    ),
    _react2.default.createElement(
      'p',
      null,
      'The load function will be passed three arguments: a "route" object that contains ',
      _react2.default.createElement(
        _PrismBlocks.InlineJS,
        null,
        'params'
      ),
      ', ',
      _react2.default.createElement(
        _PrismBlocks.InlineJS,
        null,
        'location'
      ),
      ' and ',
      _react2.default.createElement(
        _PrismBlocks.InlineJS,
        null,
        'name'
      ),
      ' properties, a modifiers object, and the object containing all of your Curi addons. The modifiers object has a few methods that you can call in order to modify the response object that will be generated. They are ',
      _react2.default.createElement(
        _PrismBlocks.InlineJS,
        null,
        'fail'
      ),
      ', ',
      _react2.default.createElement(
        _PrismBlocks.InlineJS,
        null,
        'setStatus'
      ),
      ',',
      ' ',
      _react2.default.createElement(
        _PrismBlocks.InlineJS,
        null,
        'setData'
      ),
      ' and ',
      _react2.default.createElement(
        _PrismBlocks.InlineJS,
        null,
        'redirect'
      ),
      '. Each is explained in more detail in the',
      ' ',
      _react2.default.createElement(
        _react3.Link,
        { to: 'Guide', params: { slug: 'routes' }, details: { hash: 'load' } },
        'all about routes'
      ),
      ' ',
      'guide. Here, we will use the last two: setData and redirect.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'First we will add a load function to our Recipe route. This function will make a request to our (fake) API. Then, we will call response.setData to attach our loaded data to the response.'
    ),
    _react2.default.createElement(
      _PrismBlocks.PrismBlock,
      { lang: 'javascript' },
      '{\n  name: \'Recipe\',\n  path: \'recipe/:id\',\n  body: () => Recipe,\n  load: (route, modifiers) => {\n    return fakeAPI.getRecipe(route.params.id)\n      .then(data => {\n        modifiers.setData(data);\n      });\n  }\n}'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Now, when we navigate to /recipe/chocolate-chip-cookies, our load function will call the fake API function to load the recipe and set the loaded data for the response. That means that the data we load will be available on the generated response object as response.data.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'One possible downside to the implementation of load above is that we will be making requests to our API every time the route loads. To prevent this, you might want to add a data cache to your application. Using this, you can store the results of previous requests and use that for subsequent requests instead of having to request the data from the server again.'
    ),
    _react2.default.createElement(
      _PrismBlocks.PrismBlock,
      { lang: 'javascript' },
      '{\n  name: \'Recipe List\',\n  path: \'recipes\',\n  body: () => RecipeList,\n  load: () => {\n    if (cache.has(\'recipes\')) {\n      return Promise.resolve(cache.get(\'recipes\'));\n    }\n\n    return fakeAPI.getRecipes()\n      .then(data => {\n        cache.set(\'recipes\', data);\n        return data;\n      });\n  }\n}'
    ),
    _react2.default.createElement(
      'p',
      null,
      'If at some point in time we decide that we want to change our URI pathname structure, we can also use the load function to redirect.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'By calling the modifier\'s redirect method, you can specify the URI that we should redirect to. As always, with Curi you aren\'t expected to have to manually generate pathnames. Instead, you can use ',
      _react2.default.createElement(
        _PrismBlocks.InlineJS,
        null,
        'addons.pathname'
      ),
      '.'
    ),
    _react2.default.createElement(
      _PrismBlocks.PrismBlock,
      { lang: 'javascript' },
      '{\n  name: \'Old Recipe\',\n  path: \'r/:id\',\n  load: ({ params, location }, modifiers, addons) => {\n    const pathname = addons.pathname(\'Recipe\', params);\n    // destructure the current location to preserve\n    // query/hash values\n    modifiers.redirect({ ...location, pathname });\n  }\n}'
    ),
    _react2.default.createElement(
      _Messages.Note,
      null,
      'This does not actually perform a redirect. Instead, it will make it so that the emitted response is a "redirect" response, with a redirectTo property you can use to redirect manually. Below is an example of a render function (passed to a',
      ' ',
      _react2.default.createElement(
        _PrismBlocks.InlineComponent,
        null,
        'Navigator'
      ),
      ') that renders a ',
      _react2.default.createElement(
        _PrismBlocks.InlineComponent,
        null,
        'Redirect'
      ),
      ' ',
      'when the response contains a redirectTo value.'
    ),
    _react2.default.createElement(
      _PrismBlocks.PrismBlock,
      { lang: 'javascript' },
      'function renderFunction(response) {\n  if (response.redirectTo) {\n    return <Redirect to={response.redirectTo} />\n  }\n  // ...\n}'
    ),
    _react2.default.createElement(
      'p',
      null,
      'load is a great place to do any route setup prior to actually rendering the route. Please remember, however, that your application will not be re-rendering until after the load function has resolved. If you have a long running load function, you may wish to implement some sort of loading display. The prefetching data example shows one approach to how to do this.'
    )
  );
};

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(1);

var _BaseGuide = __webpack_require__(54);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(6);

var _Messages = __webpack_require__(12);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    _BaseGuide2.default,
    null,
    _react2.default.createElement(
      'h1',
      null,
      name
    ),
    _react2.default.createElement(
      _Messages.Note,
      null,
      'This guide assumes that you are already familiar with React.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Curi provides a number of React components through the',
      ' ',
      _react2.default.createElement(
        _react3.Link,
        { to: 'Package', params: { package: 'react' } },
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '@curi/react'
        )
      ),
      ' package. To get started, there are only two components that you need to be aware of:',
      ' ',
      _react2.default.createElement(
        _PrismBlocks.InlineComponent,
        null,
        'Navigator'
      ),
      ' and ',
      _react2.default.createElement(
        _PrismBlocks.InlineComponent,
        null,
        'Link'
      ),
      '.'
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'The Navigator',
        id: 'navigator'
      },
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'bash' },
        'npm install @curi/react'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The',
        ' ',
        _react2.default.createElement(
          _react3.Link,
          {
            to: 'Package',
            params: { package: 'react' },
            details: { hash: 'Navigator' }
          },
          'Navigator'
        ),
        ' component is responsible for re-rendering your application whenever the location changes. To do this, you pass it a Curi configuration object. When the Navigator is mounted, it will subscribe to your configuration object with a function that will trigger the Navigator to re-render whenever the location changes.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import { Navigator } from \'@curi/react\';\n\nconst config = createConfig(history, routes);\nReactDOM.render((\n  <Navigator config={config} ... />\n), holder);'
      ),
      _react2.default.createElement(
        'p',
        null,
        'In addition to the configuration object, the Navigator also takes a',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'render'
        ),
        ' prop. That is a function that returns the React elements that make up your application. The render function will receive two arguments:',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'response'
        ),
        ' and ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'config'
        ),
        '. Response is a response object and config is your configuration object (which can be useful to have access to, but you may also never have a reason to use it).'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'const config = createConfig(history, routes);\n\nfunction render(response, config) {\n  // return a React element (or null)\n}\n\nReactDOM.render((\n  <Navigator config={config} render={render} />\n), holder);'
      ),
      _react2.default.createElement(
        'p',
        null,
        'You ',
        _react2.default.createElement(
          'em',
          null,
          'can'
        ),
        ' define your render function inline, but typically it is easier to define the function in its own module and import it wherever you are rendering your Navigator. Inlining would also mean that the function gets recreated every time that the Navigator is re-rendered by its parent, which is not ideal.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The primary property of the response object that you will find useful is',
        ' ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'body'
        ),
        '. The body property is the value returned by the matched route\'s body function. Since this is a React guide, this value should be a React component that will render the contents of the page for a specific route. For example, a Home component might render the contents of your homepage while an About component might render a page describing your application.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import Home from \'./components/Home\';\nimport About from \'./components/About\';\n\nconst routes = [\n  {\n    name: \'Home\',\n    path: \'\',\n    body: () => Home\n  },\n  {\n    name: \'About\',\n    path: \'about\',\n    body: () => About\n  }\n]'
      ),
      _react2.default.createElement(
        'p',
        null,
        'When the body property of a response is ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'undefined'
        ),
        ', that means that none of your routes matched the new location and you should render some sort of 404/page not found component. You may also want to add a catch all route (one whose path is ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '*'
        ),
        ') so that you can expect to always have a body property on the response.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'function render(response) {\n  const { body:Body } = response;\n  return <Body />;\n}'
      ),
      _react2.default.createElement(
        _Messages.Note,
        null,
        'We rename "body" to "Body" so that the JSX is',
        ' ',
        _react2.default.createElement(
          'a',
          { href: 'https://facebook.github.io/react/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized' },
          'transformed properly'
        ),
        '.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'You can review all of the response properties in the',
        ' ',
        _react2.default.createElement(
          _react3.Link,
          { to: 'Guide', params: { slug: 'responses' }, details: { hash: 'properties' } },
          'Rendering with Responses'
        ),
        ' guide. The other ones that you will most likely be interested in are',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'params'
        ),
        ' and ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'data'
        ),
        '.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'function render(response) {\n  const { body:Body, params, data } = response;\n  return <Body params={params} data={data} />;\n}'
      ),
      _react2.default.createElement(
        _Messages.Note,
        null,
        'This does not cover all of the Link props. Please check out the',
        ' ',
        _react2.default.createElement(
          _react3.Link,
          {
            to: 'Package',
            params: { package: 'react' },
            details: { hash: 'Navigator' }
          },
          'Navigator'
        ),
        ' API docs to learn more about the other props.'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'The Link',
        id: 'link'
      },
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'bash' },
        'npm install @curi/react'
      ),
      _react2.default.createElement(
        'p',
        null,
        'A single page application isn\'t very useful if you cannot navigate between locations. The',
        ' ',
        _react2.default.createElement(
          _react3.Link,
          {
            to: 'Package',
            params: { package: 'react' },
            details: { hash: 'Link' }
          },
          'Link'
        ),
        ' component provides you with an easy way to do this by rendering anchor (',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'a'
        ),
        ') elements.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import { Link } from \'@curi/react\'\n<Link to=\'Home\'>Home</Link>'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The most important prop of the Link is ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'to'
        ),
        '. This value should be the name of the route that you want to navigate to. For instance, take about following route:'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '{\n  name: \'About\',\n  path: \'about\',\n  ...\n}\n'
      ),
      _react2.default.createElement(
        'p',
        null,
        'If you were to render a Link whose to property is "About", then it would render an anchor whose ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'href'
        ),
        ' attribute is ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '/about'
        ),
        '. The great thing about this is that you don\'t have to know the URI of the route that you want to navigate to, only its name. Curi (using the built-in ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'pathname'
        ),
        ' addon), handles creating URI pathnames for you.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '<Link to=\'About\'>About</Link>\n// <a href="/about">About</a>'
      ),
      _react2.default.createElement(
        'p',
        null,
        'That works well enough for simple paths, but what about paths that include params? For that, you need to pass an object using the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'params'
        ),
        ' property. This object\'s keys should be the same as the route\'s expected params. The params object should also include the params for any parent routes.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '{\n  name: \'Album\',\n  path: \'a/:albumID\',\n  ...,\n  children: [\n    {\n      name: \'Song\',\n      path: \':songID\',\n      ...\n    }\n  ]\n}\n\n<Link to=\'Song\' params={{ albumID: 2390, songID: 7 }}>Some Song on Some Album</Link>\n// <a href="/a/2390/7>Some Song on Some Album</a>'
      ),
      _react2.default.createElement(
        'p',
        null,
        'If you want to attach additional location information to a Link, you can do so using the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'details'
        ),
        ' prop. This is an object that has any other location properties that you want to link to. These would be ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'query'
        ),
        ', ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'hash'
        ),
        ', and ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'state'
        ),
        '.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '<Link\n  to=\'Song\'\n  params={{ albumID: 2390, songID: 8 }}\n  details={{ query: { time: 17 } }}\n>\n  Some Song on Some Album\n</Link>\n// <a href="/a/2390/8?time=17>Some Song on Some Album</a>'
      ),
      _react2.default.createElement(
        'p',
        null,
        'The ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'children'
        ),
        ' prop has been used, but not mentioned. The contents of the children prop will simply be passed as the children of the anchor, the same as if you were to use a regular anchor. Using a regular anchor would not work here, though. You could hand code the URI to link to, which is half of what the Link does, but clicking the anchor would cause a full page reload. The Link uses calls the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'update'
        ),
        ' method from your Hickory history object to allow for in-app navigation without reloading the page.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        '// if you render this, clicking it will reload the page\n<a href="/about">About</a>\n\n// while rendering this will not cause a reload\n<Link to=\'About\'>About</Link>\n'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Both of the above elements render the same thing to the page, an anchor element, but the "magic" is the Link\'s usage of your history object.'
      ),
      _react2.default.createElement(
        _Messages.Note,
        null,
        'This does not cover all of the Link props. Please check out the',
        ' ',
        _react2.default.createElement(
          _react3.Link,
          {
            to: 'Package',
            params: { package: 'react' },
            details: { hash: 'Link' }
          },
          'Link'
        ),
        ' API docs to learn more about the other props.'
      )
    )
  );
};

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(1);

var _BaseGuide = __webpack_require__(54);

var _BaseGuide2 = _interopRequireDefault(_BaseGuide);

var _PrismBlocks = __webpack_require__(6);

var _Messages = __webpack_require__(12);

var _Sections = __webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name;
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
      'The Curi router is somewhat similar to React Router versions 2 and 3, so migration is fairly easy. For instance, both use a centralized route configuration. Both configurations are made up of route objects (although with React Router some of these are disguised as JSX with ',
      _react2.default.createElement(
        _PrismBlocks.InlineComponent,
        null,
        'Route'
      ),
      ' components). With both, routes can be nested, allowing child routes to build off of the paths from their parent routes.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Migration from React Router v2/3 to Curi should not require a complete reworking of your application, but there are some key differences.'
    ),
    _react2.default.createElement(
      'ol',
      null,
      _react2.default.createElement(
        'li',
        null,
        'The routing is handled entirely outside of React. With Curi, there are no ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'Route'
        ),
        ' components.'
      ),
      _react2.default.createElement(
        'li',
        null,
        'With Curi, when a nested route matches, only that route renders. Any ancestor routes that also (partially) match are not rendered. This is different from React Router, where ancestors of the best matched route also render.'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Routes',
        id: 'routes'
      },
      _react2.default.createElement(
        'p',
        null,
        'Let\u2019s get started with setting up our routes.'
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'With React Router',
          id: 'routes-with-react-router'
        },
        _react2.default.createElement(
          'p',
          null,
          'In React Router v2/3, there are two ways to define routes. You can either use JavaScript objects or JSX ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Route'
          ),
          's (which React Router converts to JavaScript objects).'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'jsx' },
          '// JavaScript objects\n{\n  path: \'/\',\n  component: App,\n  indexRoute: Home,\n  childRoutes: [\n    {\n      path: \'inbox\',\n      component: Inbox,\n      childRoutes: [\n        {\n          path: \':message\',\n          component: Message,\n          onEnter: (next) => {...},\n          onChange: (prev, next) => {...},\n          onLeave: (prev) => {...}\n        }\n      ]\n    }\n  ]\n// JSX\n<Route path=\'/\' component={App}>\n  <IndexRoute component={Home} />\n  <Route path=\'inbox\' component={Inbox}>\n    <Route\n      path=\':message\'\n      component={Message}\n      onEnter={next => {...}}\n      onChange={(prev, next) => {...}}\n      onLeave={prev => {...}}\n    />\n  </Route>\n</Route>'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Both styles described above define the same route structure for three routes: ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            '/'
          ),
          ', ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            '/inbox'
          ),
          ', and ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            '/inbox/:message'
          ),
          '. Each one of these has a component that will be rendered when it matches. The ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            '/inbox/:message'
          ),
          ' route has some methods defined to describe its behavior when the route enters, updates, and leaves.'
        )
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'With Curi',
          id: 'routes-with-curi'
        },
        _react2.default.createElement(
          'p',
          null,
          'Routes in Curi are always JavaScript objects. Like React Router, each route object has a path property that describes the path segments that the route matches. React Router v2/3 uses a custom path matcher, but Curi uses ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'path-to-regexp'
          ),
          '. You can read learn how to format paths from the',
          ' ',
          _react2.default.createElement(
            'a',
            { href: 'https://github.com/pillarjs/path-to-regexp' },
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'path-to-regexp'
            ),
            ' repo'
          ),
          '.\xA0'
        ),
        _react2.default.createElement(
          'p',
          null,
          'First, we will just define the paths for our routes.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          'const routes = [\n  {\n    path: \'\'\n  },\n  {\n    path: \'inbox\',\n    children: [\n      {\n        path: \':message\'\n      }\n    ]\n  }\n];'
        ),
        _react2.default.createElement(
          'p',
          null,
          'The biggest difference between the Curi paths and the React Router paths is that with Curi, you never include a forward slash at the beginning of the path. This means that while the root path for React Router is ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            '\'/\''
          ),
          ', the root path for Curi is ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            '\'\''
          ),
          '.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Next, we should add our components to each route. We will ignore the ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'App'
          ),
          ' component that is used in the React Router routes. That is not route specific and will be rendered by our application (assuming we actually need it).'
        ),
        _react2.default.createElement(
          'p',
          null,
          'With Curi routes, we have a ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'body'
          ),
          ' property. This is a function that will be called whenever the route matches. Its return value will be added to the response object that Curi creates (more on that later). For this React application, we want our ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'body'
          ),
          ' functions to return the React component associated with each route.'
        ),
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'body'
          ),
          ' is a function and not a value because we might not always have access to the body value when the application loads. For example, with code splitting, we might not load the module until the user navigates to the route. Then, we would store the component in a cache and have the ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'body'
          ),
          ' function return the component from the cache. You can read the',
          ' ',
          _react2.default.createElement(
            _react3.Link,
            { to: 'Guide', params: { slug: 'code-splitting' } },
            'code splitting guide'
          ),
          ' for more information on how to do that.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          'const routes = [\n  {\n    path: \'\',\n    body: () => Home\n  },\n  {\n    path: \'inbox\',\n    body: () => Inbox,\n    children: [\n      {\n        path: \':message\',\n        body: () => Message\n      }\n    ]\n  }\n];'
        ),
        _react2.default.createElement(
          'p',
          null,
          'We are close to replicating our React Router routes, we just have to implement the ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'on___'
          ),
          ' methods for our\xA0',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            ':message'
          ),
          ' route. With Curi, routes have two possible loading function properties: ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'preload'
          ),
          ' ',
          'and ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'load'
          ),
          '. ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'preload'
          ),
          ' is useful for tasks that only need to be run once per route, like the code splitting mentioned above. ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'load'
          ),
          ', on the other hand, will be called every time that a route matches.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'With React Router, ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'onEnter'
          ),
          ' is called when the route first matches, while ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'onChange'
          ),
          ' is called when the same route matches a new location (e.g. with new path parameters). ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'onEnter'
          ),
          ' and ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'onChange'
          ),
          ' are nearly the same; the big difference between the two is that ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'onChange'
          ),
          ' will receive the previous props, which could be used to determine which props changed. When converting these to Curi, we will use ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'load'
          ),
          ' for both. This misses out on the ability to compare props in ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'onChange'
          ),
          ', but (assuming you\u2019re using the comparison to determine whether to load new data) a cache should serve the same purpose.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'There currently is no equivalent to ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'onLeave'
          ),
          ' with Curi. This is mostly because I haven\u2019t seen a compelling need for it. It certainly could be implemented, but so far I have not found a reason to use that. If you have something you need this functionality for, please open up an issue in the GitHub repo.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          'const routes = [\n  {\n    path: \'\',\n    body: () => Home\n  },\n  {\n    path: \'inbox\',\n    body: () => Inbox,\n    children: [\n      {\n        path: \':message\',\n        body: () => Message,\n        load: (params, location, mods) => {...}\n      }\n    ]\n  }\n];'
        ),
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'params'
          ),
          ' is an object of parsed path parameters, ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'location'
          ),
          ' is the current location object, and ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'mods'
          ),
          ' ',
          'is an object with functions to modify the response. For example, ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'mods.setData'
          ),
          ' allows you to attach loaded data to the response object. The ',
          _react2.default.createElement(
            _react3.Link,
            { to: 'Guide', params: { slug: 'routes' }, details: { hash: 'load' } },
            'routes guide'
          ),
          ' covers all of the functions provided by the ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'mods'
          ),
          ' object.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'We now have the equivalent routes implemented in Curi, but we have one last step. With Curi, each route has to have a unique name.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'javascript' },
          'const routes = [\n  {\n    name: \'Home\',\n    path: \'\',\n    body: () => Home\n  },\n  {\n    name: \'Inbox\',\n    path: \'inbox\',\n    body: () => Inbox,\n    children: [\n      {\n        name: \'Message\',\n        path: \':message\',\n        body: () => Message,\n        load: (params, location, mods) => {...}\n      }\n    ]\n  }\n];'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Curi uses route names to allow you to interact with routes. For example, you can navigate to the \u201CInbox\u201D route just by knowing its name instead of its URI. This can be especially handy when dealing with complicated pathnames or if you need to change the URI structure of your website. With Curi, you never have to write a URI yourself!'
        )
      ),
      _react2.default.createElement(
        'p',
        null,
        'Once your routes have been defined, you can move on to creating your Curi configuration object.'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Creating the Configuration',
        id: 'creating-the-configuration'
      },
      _react2.default.createElement(
        'p',
        null,
        'With React Router, you create your configuration by rendering a ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'Router'
        ),
        '. That either takes the ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'Route'
        ),
        ' components as props or the route objects through its ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'routes'
        ),
        ' prop. The ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'Router'
        ),
        ' also takes a ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'history'
        ),
        ' prop, which is either one of the pre-configured objects (',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'browserHistory'
        ),
        ' or ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'hashHistory'
        ),
        ') or one that you create yourself.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'jsx' },
        'import { Router, browserHistory } from \'react-router\';\nconst routes = [...];\nReactDOM.render((\n  <Router history={browserHistory} routes={routes} />\n), holder);'
      ),
      _react2.default.createElement(
        'p',
        null,
        'With Curi, the configuration object is created prior to rendering. It takes a Hickory history object, your routes array, and possibly an options object.\xA0',
        _react2.default.createElement(
          'a',
          { href: 'https://github.com/pshrmn/hickory' },
          'Hickory'
        ),
        ' is similar to the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'history'
        ),
        ' package used by React Router, but has a slight modified API (easier navigation blocking and navigation that imitates how anchors work) and more convenient location objects (you can use a ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'query'
        ),
        ' object instead of having to manually create a ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'search'
        ),
        ' string).'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'import createConfig from \'@curi/core\';\nimport Browser from \'@hickory/browser\';\nconst history = Browser();\nconst routes = [...];\nconst config = create1Config(history, routes);'
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Rendering',
        id: 'rendering'
      },
      _react2.default.createElement(
        'p',
        null,
        'At this point, our Curi configuration object isn\u2019t actually quite ready to render. Curi creates response objects asynchronously, so if we render right away, we might not have a response object to render with. We can work around this by rendering nothing (',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'null'
        ),
        ') at first, but instead we should usually just wait for our initial response to be ready.'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'config.ready().then(() => {\n  // now our first response has resolved, so we\n  // know that we will render with an actual response\n});'
      ),
      _react2.default.createElement(
        'p',
        null,
        'We will walk through the rendering differences between React Router and Curi by looking at what happens in each when we navigate to the URI ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '/inbox/test-message-please-ignore'
        ),
        '.'
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'React Router v2/3',
          id: 'rendering-react-router'
        },
        _react2.default.createElement(
          'p',
          null,
          'React Router uses the ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Router'
          ),
          ' component to subscribe to location changes. Each time that the location changes, it walks over its routes and determines which route(s!) match. React Router starts by rendering the root component. In the above configuration, that is the ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'App'
          ),
          '. Next, our ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'inbox'
          ),
          ' route also matches, so React Router also renders our ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Inbox'
          ),
          ' component. Finally, the URI ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            '/inbox/test-message-please-ignore'
          ),
          ' also matches our\xA0',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            ':message'
          ),
          ' route (which is concatenated with its parents to form the path ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            '/inbox/:message'
          ),
          '), so ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Message'
          ),
          ' is rendered as well. Each child component is rendered by its parent, so we end up with a component tree that looks something like this:'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'jsx' },
          '<App>\n  <Inbox>\n    <Message>\n  </Inbox>\n</App>'
        ),
        _react2.default.createElement(
          'p',
          null,
          'With this structure, any routes with children will be rendered when one of the children matches. That means that those routes need to know how to render based on what type of match they have. For example, ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Inbox'
          ),
          ' needs to know how to render for an exact match (the URI is ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            '/inbox'
          ),
          ') and for a partial match (',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            '/inbox/test-message-please-ignore'
          ),
          '). Also, if the ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Inbox'
          ),
          ' needs to pass any props to ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Message'
          ),
          ', it has to use ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'React.cloneElement'
          ),
          ', which works but is not the cleanest looking code.'
        )
      ),
      _react2.default.createElement(
        _Sections.Subsection,
        {
          title: 'Curi',
          id: 'rendering-with-curi'
        },
        _react2.default.createElement(
          'p',
          null,
          'With Curi, we need to have a way to re-render our application every time that the location changes. The easiest approach is to use the ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Navigator'
          ),
          ' component, which comes from the ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            '@curi/react'
          ),
          ' package. This expects two props: ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'config'
          ),
          ', which is our Curi configuration object, and ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'render'
          ),
          ', which is a render function it will call to render the application. The ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Navigator'
          ),
          ' will subscribe to your configuration object and automatically re-render when the location changes (and a new response object is created).'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'jsx' },
          'config.ready().then(() => {\n  ReactDOM.render((\n    <Navigator\n      config={config}\n      render={response => { return ...; }}\n    />\n  ), holder);\n});'
        ),
        _react2.default.createElement(
          'p',
          null,
          'So what should your render function look like? The render function will receive two arguments: ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'response'
          ),
          ', the new response object, and ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'config'
          ),
          ', our Curi configuration object. We will ignore config here because the response is what we really want, the config is just there for convenience.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'If you remember from above, we added ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'body'
          ),
          ' properties to each of the routes and said that when a route matches, that function would be called and its return value would be attached to the response. That means, that inside of our render function, we can access the matched route\u2019s component as ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'response.body'
          ),
          '.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'jsx' },
          'function render(response) {\n  const { body:Body } = response;\n  return <Body />;\n}'
        ),
        _react2.default.createElement(
          'p',
          null,
          'That isn\u2019t perfect because it doesn\u2019t consider what happens when there is no body (which happens if none of the routes match the location). Wildcard routes (',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            '(.*)'
          ),
          ') can be useful here or you can just return something else when there is no',
          ' ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'response.body'
          ),
          ' property.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Let\u2019s get back to our response object. In the React Router section, we had three components that were rendered: ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'App'
          ),
          ',',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Inbox'
          ),
          ', and ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Message'
          ),
          '. With Curi, only the best matched route matches. That means that for the URI',
          ' ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            '/inbox/test-message-please-ignore'
          ),
          ',our ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'response.body'
          ),
          ' will be the ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Message'
          ),
          ' component. We don\u2019t render ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Inbox'
          ),
          ' because we did not match the ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'inbox'
          ),
          ' route.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'We also said above that there was no need for the ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'App'
          ),
          ' component with Curi. If you want to have an ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'App'
          ),
          ' ',
          'component, you can render it either inside of the render function or as a parent of your ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Navigator'
          ),
          '. This can be useful for rendering content that is unrelated to specific routes, like a page header or menu.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Rendering the ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'App'
          ),
          ' inside of the render function is necessary if any of the components rendered by the ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'App'
          ),
          ' ',
          'are location aware components, since they need to access the Curi configuration object (through React\u2019s context, which the ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Navigator'
          ),
          ' provides)'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'jsx' },
          'function render(response) {\n  const { body:Body } = response;\n  return (\n    <App>\n      <Body />\n    </App>\n  );\n}\n// or\nfunction render(response) {\n  const { body:Body } = response;\n  return (\n    <div>\n      <Header />\n      <Body />\n      <Footer />\n    </div>\n  );\n}'
        ),
        _react2.default.createElement(
          'p',
          null,
          'What about props that you want to send to your route components? Just pass them to the ',
          _react2.default.createElement(
            _PrismBlocks.InlineComponent,
            null,
            'Body'
          ),
          ' component that you render.'
        ),
        _react2.default.createElement(
          _PrismBlocks.PrismBlock,
          { lang: 'jsx' },
          'function render(response) {\n  const { body:Body, data, params } = response;\n  return <Body data={data} params={params} />;\n}'
        ),
        _react2.default.createElement(
          'p',
          null,
          'The one catch here is that you will be passing the same props to all of your route components. You could add fine-grained control by using ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'response.name'
          ),
          ' and a ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'switch'
          ),
          ' or ',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'if'
          ),
          '/',
          _react2.default.createElement(
            _PrismBlocks.InlineJS,
            null,
            'else'
          ),
          ' chain, but this is probably overkill. If you\u2019re worried about polluting the route component\u2019s props, just pass the whole response object.'
        )
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Links',
        id: 'links'
      },
      _react2.default.createElement(
        'p',
        null,
        'You obviously will want to be able to navigate between routes in your application. React Router provides a ',
        _react2.default.createElement(
          _PrismBlocks.InlineComponent,
          null,
          'Link'
        ),
        ' component to do this, and so does Curi (through the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '@curi/react'
        ),
        ' package). There are a few differences to note between these two components:'
      ),
      _react2.default.createElement(
        'ul',
        null,
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'p',
            null,
            'React Router expects you to generate the pathname yourself, while Curi expects you to pass the name of the route that you want to navigate to. Any path parameters are passed to Curi\u2019s ',
            _react2.default.createElement(
              _PrismBlocks.InlineComponent,
              null,
              'Link'
            ),
            ' using the ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'params'
            ),
            ' prop.'
          ),
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'jsx' },
            '// React Router\n<Link to=\'/\'>Home</Link>\n<Link to={`/inbox/${message}`}>Hello</Link>\n// Curi\n<Link to=\'Home\'>Home</Link>\n<Link to=\'Message\' params={{ message }}>Hello</Link>'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'p',
            null,
            'With React Router, any additional location properties are passed to the ',
            _react2.default.createElement(
              _PrismBlocks.InlineComponent,
              null,
              'Link'
            ),
            ' using the ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'to'
            ),
            ' object. With Curi, these properties are passed using the ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'details'
            ),
            ' prop.'
          ),
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'jsx' },
            '// React Router\n<Link to={{ pathname: \'/inbox\', hash: \'#test\' }}>Inbox</Link>\n// Curi\n<Link to=\'Inbox\' details={{ hash: \'test\' }}>Inbox</Link>'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'p',
            null,
            'Active detection with Curi is more complicated than with React Router, but also more powerful. With Curi, you provide a',
            ' ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'merge'
            ),
            ' function that receives the props that will used to render the ',
            _react2.default.createElement(
              _PrismBlocks.InlineComponent,
              null,
              'a'
            ),
            ' and allows you to modify/add props. You can also pass ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'partial: true'
            ),
            ' to allow for partial matches to be considered active (the opposite of React Router\'s',
            ' ',
            _react2.default.createElement(
              _PrismBlocks.InlineJS,
              null,
              'onlyActiveOnIndex'
            ),
            ').'
          ),
          _react2.default.createElement(
            _PrismBlocks.PrismBlock,
            { lang: 'jsx' },
            '// React Router\n<Link\n  to=\'/\'\n  onlyActiveOnIndex\n  activeClassName=\'active\'\n>Home</Link>\n// Curi\n// You need to add @curi/addon-active to your config object\nimport createActiveAddon from \'@curi/addon-active\';\nconst config = createConfig(history, routes, {\n  createActiveAddon\n});\n\n// pass the merge function to your <Link>. The props it returns\n// will be passed to the anchor rendered by the <Link>\nfunction merge(props) {\n  props.className = \'active\';\n  return props;\n}\n<Link\n  to=\'Home\'\n  active={{ merge }}\n>Home</Link>'
          )
        )
      )
    ),
    _react2.default.createElement(
      _Sections.Section,
      {
        title: 'Accessing router props from nested components',
        id: 'router-props'
      },
      _react2.default.createElement(
        'p',
        null,
        'React Router provides a ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'withRouter'
        ),
        ' higher-order component that will inject router props into the wrapped component. Curi provides similar functionality with the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'curious'
        ),
        ' higher-order component provided by the ',
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          '@curi/react'
        ),
        ' package.\xA0'
      ),
      _react2.default.createElement(
        _PrismBlocks.PrismBlock,
        { lang: 'javascript' },
        'export default withRouter(SomeComponent);\nexport default curious(SomeComponent);'
      ),
      _react2.default.createElement(
        'p',
        null,
        _react2.default.createElement(
          _PrismBlocks.InlineJS,
          null,
          'curious'
        ),
        ' will inject the Curi configuration object and the current response object into the wrapped component.'
      )
    ),
    _react2.default.createElement(
      'p',
      null,
      'At this point, hopefully you are comfortable with migrating from React Router v2/3 to Curi. If there are any concepts not covered here that you think should be, please feel free to open up an issue ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/pshrmn/curi/issues' },
        'on GitHub'
      ),
      '.'
    )
  );
};

/***/ })

});