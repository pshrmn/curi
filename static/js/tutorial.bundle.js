webpackJsonp([1],{

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _Tutorials = _interopRequireDefault(__webpack_require__(63));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var params = _ref.params;
  var Component = _Tutorials.default[params.name];

  if (!Component) {
    return _react.default.createElement("div", null, "The requested tutorial could not be found.");
  }

  return _react.default.createElement(Component, null);
};

exports.default = _default;

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

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _TutorialLinks = _interopRequireDefault(__webpack_require__(65));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var children = _ref.children;
  return _react.default.createElement("div", {
    className: "tutorial"
  }, _react.default.createElement("div", {
    className: "content"
  }, children || null), _react.default.createElement("div", {
    className: "sidebar"
  }, _react.default.createElement("h2", null, "Tutorials"), _react.default.createElement(_TutorialLinks.default, null)));
};

exports.default = _default;

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompleteBranch = exports.TutorialBranches = exports.TutorialBranch = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _PrismBlocks = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TutorialBranch = function TutorialBranch(_ref) {
  var name = _ref.name;
  return _react.default.createElement("div", {
    className: "tutorial-branch"
  }, _react.default.createElement("p", null, "If you are following along using the", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi-tutorial"
  }, "tutorial repo"), ", please checkout the ", _react.default.createElement(_PrismBlocks.InlineJS, null, name), " branch."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "git checkout ".concat(name)));
};

exports.TutorialBranch = TutorialBranch;

var TutorialBranches = function TutorialBranches(_ref2) {
  var names = _ref2.names;
  return _react.default.createElement("div", {
    className: "tutorial-branch"
  }, _react.default.createElement("p", null, "If you are following along using the", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi-tutorial"
  }, "tutorial repo"), ", please checkout the appropriate branch for your rendering framework."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, names.map(function (n) {
    return "git checkout ".concat(n);
  }).join('\n')));
};

exports.TutorialBranches = TutorialBranches;

var CompleteBranch = function CompleteBranch(_ref3) {
  var name = _ref3.name;
  return _react.default.createElement("div", {
    className: "tutorial-branch"
  }, _react.default.createElement("p", null, "You can view the complete source code for this tutorial here:", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi-tutorial/tree/".concat(name)
  }, name), "."));
};

exports.CompleteBranch = CompleteBranch;

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Introduction = _interopRequireDefault(__webpack_require__(64));

var _Setup = _interopRequireDefault(__webpack_require__(66));

var _Routes = _interopRequireDefault(__webpack_require__(67));

var _Hickory = _interopRequireDefault(__webpack_require__(68));

var _ConfigObject = _interopRequireDefault(__webpack_require__(69));

var _ReactPages = _interopRequireDefault(__webpack_require__(70));

var _VuePages = _interopRequireDefault(__webpack_require__(71));

var _LoadingData = _interopRequireDefault(__webpack_require__(72));

var _ReactData = _interopRequireDefault(__webpack_require__(73));

var _VueData = _interopRequireDefault(__webpack_require__(74));

var _ReactNav = _interopRequireDefault(__webpack_require__(75));

var _VueNav = _interopRequireDefault(__webpack_require__(76));

var _NowWhat = _interopRequireDefault(__webpack_require__(77));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  '01-introduction': _Introduction.default,
  '02-setup': _Setup.default,
  '03-routes': _Routes.default,
  '04-hickory': _Hickory.default,
  '05-config': _ConfigObject.default,
  '06-pages-react': _ReactPages.default,
  '06-pages-vue': _VuePages.default,
  '07-loading-data': _LoadingData.default,
  '08-render-data-react': _ReactData.default,
  '08-render-data-vue': _VueData.default,
  '09-nav-react': _ReactNav.default,
  '09-nav-vue': _VueNav.default,
  '10-now-what': _NowWhat.default
};
exports.default = _default;

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BaseTutorial = _interopRequireDefault(__webpack_require__(58));

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(13);

var _Sections = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TutorialList = function TutorialList() {
  return _react.default.createElement(_BaseTutorial.default, null, _react.default.createElement("h1", null, "Part 1: Introduction to Curi"), _react.default.createElement("p", null, "In this set of tutorials, we will be building a single page application from scratch using Curi. The application will be a website for a book store. Users will be able to browse through books and \"purchase\" ones that they want."), _react.default.createElement(_Messages.Note, null, "We will only be building the front end. Any time that we would need to add back end code for a \"real\" website, we will just simulate this with a fake API."), _react.default.createElement(_Sections.Section, {
    title: "What is Curi?",
    id: "what"
  }, _react.default.createElement("p", null, "Before we get started, let's quickly define what Curi ", _react.default.createElement("em", null, "is"), " and", ' ', _react.default.createElement("em", null, "is not"), "."), _react.default.createElement("ol", null, _react.default.createElement("li", null, "Curi is an asynchronous single page application router.", _react.default.createElement("ol", {
    style: {
      listStyleType: 'upper-roman'
    }
  }, _react.default.createElement("li", null, "Being a single page application router means that with Curi, you can navigate to pages within your application without sending requests to the server."), _react.default.createElement("li", null, "Being asynchronous means that you can load data (and code) prior to rendering a new page instead of rendering loading screens while you wait for data to be fetched."))), _react.default.createElement("li", null, "Curi is response based. Whenever navigation happens, Curi will create a new response object by matching itsroutes to the new location. The response will then be emitted so that the application can re-render using the new response."), _react.default.createElement("li", null, "Curi is not framework specific. It does not matter to Curi how you render your application; Curi is only concerned with navigation and route matching. That said, there are a couple official framework specific packages (e.g. ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/react"), " and", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/vue"), ") that provide integration with Curi, but these are not required for you to be able to use Curi."))), _react.default.createElement(_Sections.Section, {
    title: "Prerequisites",
    id: "prereqs"
  }, _react.default.createElement("p", null, "These tutorials aim to be quite easy to pick up without a lot of prior knowledge required. However, there are a couple things you should keep in mind."), _react.default.createElement("ol", null, _react.default.createElement("li", null, "You should be familiar with JavaScript. We will be using ES6+ syntax (module ", _react.default.createElement(_PrismBlocks.InlineJS, null, "import"), "/", _react.default.createElement(_PrismBlocks.InlineJS, null, "export"), ", arrow functions, Promises, etc.). You don't have to be a JavaScript master, but it still helps to be familiar with ES6."), _react.default.createElement("li", null, "If you plan to follow along locally, you need to have Node/NPM installed."), _react.default.createElement("li", null, "Again, if you plan to follow along locally, you should be comfortable with basic terminal (command line) usage. Nothing crazy, just commands like ", _react.default.createElement(_PrismBlocks.InlineJS, null, "cd"), ", ", _react.default.createElement(_PrismBlocks.InlineJS, null, "touch"), ", ", _react.default.createElement(_PrismBlocks.InlineJS, null, "mkdir"), " and running", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "npm"), " commands."), _react.default.createElement("li", null, "You should be familiar with either React or Vue. These aren't the only frameworks that you can use with Curi, but they ", _react.default.createElement("em", null, "are"), " the only ones that this tutorial is (currently) written for."))), _react.default.createElement(_Sections.Section, {
    title: "Next",
    id: "next"
  }, _react.default.createElement("p", null, "Let's dive in to the tutorials with", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '02-setup'
    }
  }, "Part 2: Setting up Curi"), ".")));
};

var _default = TutorialList;
exports.default = _default;

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _styleActive = _interopRequireDefault(__webpack_require__(7));

var _tutorials = _interopRequireDefault(__webpack_require__(15));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingleTutorial = function SingleTutorial(_ref) {
  var tutorial = _ref.tutorial;
  return _react.default.createElement("li", {
    key: tutorial.name,
    className: "solo"
  }, _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: tutorial.name
    },
    active: {
      merge: _styleActive.default
    }
  }, tutorial.displayName));
};

var SplitTutorial = function SplitTutorial(_ref2) {
  var tutorial = _ref2.tutorial;
  return _react.default.createElement("li", {
    key: tutorial.name,
    className: "solo"
  }, _react.default.createElement("p", null, tutorial.displayName), _react.default.createElement("ul", {
    className: "frameworks"
  }, tutorial.frameworks.map(function (f) {
    return _react.default.createElement("li", {
      key: f
    }, _react.default.createElement(_react2.Link, {
      to: "Tutorial",
      params: {
        name: "".concat(tutorial.name, "-").concat(f)
      },
      active: {
        merge: _styleActive.default
      }
    }, f));
  })));
};

var _default = function _default() {
  return _react.default.createElement("ul", {
    className: "link-list"
  }, _tutorials.default.map(function (tutorial) {
    var Component = tutorial.frameworks ? SplitTutorial : SingleTutorial;
    return _react.default.createElement(Component, {
      key: tutorial.name,
      tutorial: tutorial
    });
  }));
};

exports.default = _default;

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BaseTutorial = _interopRequireDefault(__webpack_require__(58));

var _Branch = __webpack_require__(59);

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(13);

var _Sections = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement(_BaseTutorial.default, null, _react.default.createElement("h1", null, "Part 2: Setting up Curi"), _react.default.createElement("p", null, "Setup is never exciting, but a little bit of it is necessary."), _react.default.createElement("div", null, _react.default.createElement("p", null, "In this tutorial, we will be doing the following:"), _react.default.createElement("ul", null, _react.default.createElement("li", null, "Initializing our project and installing the packages (from NPM) that are necessary to get started."), _react.default.createElement("li", null, "Creating directories for our source and public files, as well as adding some empty files for future use."), _react.default.createElement("li", null, "Setting up a simple Express server to serve our website contents."), _react.default.createElement("li", null, "Setting up Babel/Webpack."))), _react.default.createElement(_Branch.TutorialBranch, {
    name: "02-setup"
  }), _react.default.createElement(_Sections.Section, {
    title: "The Basics",
    id: "basics"
  }, _react.default.createElement("p", null, "In the terminal, navigate to the parent directory where you want to keep the code for your website and create a new directory for the website. We can then navigate into our new directory."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "# if you're using the tutorial repo, you should skip\n# this because you'll be using the repo folder\nmkdir curi-bookstore\ncd curi-bookstore"), _react.default.createElement("p", null, "Inside of the directory, run ", _react.default.createElement(_PrismBlocks.InlineJS, null, "npm init"), " to generate a", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "package.json"), " file. Then, we can install the most important package for Curi: ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/core"), ". We should also install", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "@hickory/browser"), ", which we'll cover later on."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "npm init\nnpm install @curi/core @hickory/browser")), _react.default.createElement(_Sections.Section, {
    title: "File Structure",
    id: "structure"
  }, _react.default.createElement("p", null, "We should also get some of the directories/files for our website setup. You can restructure your application however you want, but the approach used in this project can serve as a good starting point."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "mkdir src\ntouch src/index.js src/routes.js\nmkdir -p public/js\ntouch public/index.html"), _react.default.createElement("p", null, "The above commands will leave us with the following project structure:"), _react.default.createElement(_PrismBlocks.PrismBlock, null, "curi-bookstore/\n+- src/\n|  +- index.js\n|  +- routes.js\n+- public/\n|  +- index.html\n|  +- js/\n+- package.json")), _react.default.createElement(_Sections.Section, {
    title: "Building the Site",
    id: "building"
  }, _react.default.createElement("p", null, "We will be using Babel/Webpack to build our project. We won't be diving into the details of how these work, but will provide the code necessary to get this setup."), _react.default.createElement("p", null, "We can start by installing the necessary packages as well as adding configuration files for both Babel and Webpack. We will be using Babel 7, so we can use a JavaScript file instead of JSON for our Babel config."), _react.default.createElement("p", null, "We will also be using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "webpack-dev-server"), " in place of setting up a server. This allows us to have live reloading in development."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "touch .babelrc.js webpack.config.js\nnpm install -D webpack webpack-dev-server @babel/core\n  @babel/preset-env babel-loader@next"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// .babelrc.js\nmodule.exports = {\n  presets: [\n    ['@babel/env',{\n      modules: false\n    }]\n  ]\n};"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// webpack.config.js\nconst path = require('path');\n\nconst config = {\n  context: path.resolve(__dirname, 'src'),\n  entry: './index.js',\n  output: {\n    path: path.resolve(__dirname, 'public'),\n    filename: 'js/bundle.js'\n  },\n  module: {\n    rules: [\n      {\n        test: /.js$/,\n        use: 'babel-loader'\n      }\n    ]\n  },\n  devServer: {\n    contentBase: path.resolve(__dirname, 'public'),\n    historyApiFallback: true\n  }\n}\n\nmodule.exports = config;"), _react.default.createElement("p", null, "We also need to create the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "index.html"), " file. This just needs to include the DOM element that we will render our application in and a", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "script"), " that loads our bundled application. You can copy the code below into your ", _react.default.createElement(_PrismBlocks.InlineJS, null, "public/index.html"), " file."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!doctype html>\n<html>\n  <head>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script src=\"/js/bundle.js\"></script>\n  </body>\n</html>"), _react.default.createElement("p", null, "Finally, we just need to add a script to our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "package.json"), ' ', "file in order to build our bundle."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// package.json\n{\n  // ...,\n  \"scripts\": {\n    \"dev\": \"webpack-dev-server\"\n  }\n}"), _react.default.createElement(_Messages.Note, null, "If you're building this from scratch, you should also add a", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, ".gitignore"), " file and ignore the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "node_modules/"), ' ', "directory.")), _react.default.createElement(_Sections.Section, {
    title: "Review",
    id: "review"
  }, _react.default.createElement(_Branch.CompleteBranch, {
    name: "03-routes"
  })), _react.default.createElement(_Sections.Section, {
    title: "Next",
    id: "next"
  }, _react.default.createElement("p", null, "With our project setup, we are now ready to continue the tutorial with", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '03-routes'
    }
  }, "Part 3: Routes"), ".")));
};

exports.default = _default;

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BaseTutorial = _interopRequireDefault(__webpack_require__(58));

var _Branch = __webpack_require__(59);

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(13);

var _Sections = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement(_BaseTutorial.default, null, _react.default.createElement("h1", null, "Part 3: Curi Routes"), _react.default.createElement("p", null, "Now that we have our project setup, it is time to start thinking about the route structure of our website."), _react.default.createElement("div", null, _react.default.createElement("p", null, "In this tutorial, we will be doing the following:"), _react.default.createElement("ul", null, _react.default.createElement("li", null, "Deciding what pages our website will contain."), _react.default.createElement("li", null, "Learning about basic route properties."), _react.default.createElement("li", null, "Creating route objects for each of our website's pages."))), _react.default.createElement(_Branch.TutorialBranch, {
    name: "03-routes"
  }), _react.default.createElement(_Sections.Section, {
    title: "Pages",
    id: "pages"
  }, _react.default.createElement("p", null, "We should start by identifying the pages that we want to have in our website. This can always be modified later, but it is a good idea to know what pages you are going to need to create."), _react.default.createElement("p", null, "For this website, we will be creating the following pages:"), _react.default.createElement("ol", null, _react.default.createElement("li", null, "Home - the landing page for the website"), _react.default.createElement("li", null, "Contact - a listing of how to contact the site's creators"), _react.default.createElement("li", null, "Book list - a list of all of the books available for purchase"), _react.default.createElement("li", null, "Book - a page for each book"), _react.default.createElement("li", null, "Checkout - a page to \"buy\" books that have been added to the shopping cart")), _react.default.createElement("p", null, "Additionally, we should have a 404 page that is displayed when the user visits a location that has no matching route."), _react.default.createElement("p", null, "Each page in our website must have a pathname associated with it. These may either be static (literal) or dynamic (include parts that change, like IDs)."), _react.default.createElement("ol", null, _react.default.createElement("li", null, "Home - ", _react.default.createElement(_PrismBlocks.InlineJS, null, "/")), _react.default.createElement("li", null, "Contact - ", _react.default.createElement(_PrismBlocks.InlineJS, null, "/contact")), _react.default.createElement("li", null, "Book list - ", _react.default.createElement(_PrismBlocks.InlineJS, null, "/books")), _react.default.createElement("li", null, "Book - ", _react.default.createElement(_PrismBlocks.InlineJS, null, "/books/<book id>"), " e.g. ", _react.default.createElement(_PrismBlocks.InlineJS, null, "/books/2468")), _react.default.createElement("li", null, "Checkout - ", _react.default.createElement(_PrismBlocks.InlineJS, null, "/checkout")))), _react.default.createElement(_Sections.Section, {
    title: "Routes",
    id: "routes"
  }, _react.default.createElement("p", null, "At their core, routes are a way to describe the valid pathnames for our website. With Curi, routes are simply JavaScript objects with some known properties. The two most important properties of a route object are", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "name"), " and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "path"), ". The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "name"), " is a", ' ', _react.default.createElement("strong", null, "unique"), " string that you will use to identify a particular route. The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "path"), " is a", ' ', _react.default.createElement("a", {
    href: "https://github.com/pillarjs/path-to-regexp"
  }, _react.default.createElement(_PrismBlocks.InlineJS, null, "path-to-regexp")), ' ', "formatted string."), _react.default.createElement(_Messages.Note, null, _react.default.createElement(_PrismBlocks.InlineJS, null, "path-to-regexp"), " provides pathname matching. You give it a path string (possibly with special formatting) and it returns a regular expression that can be used for matching routes. The regular expression matching will be handled internally by Curi, so you only have to care about formatting path strings. Further along in this tutorial, we will cover the basics of how to do this. However, for advanced usage, you should check out the documention in the", ' ', _react.default.createElement("a", {
    href: "https://github.com/pillarjs/path-to-regexp"
  }, _react.default.createElement(_PrismBlocks.InlineJS, null, "path-to-regexp")), ' ', "GitHub repo."), _react.default.createElement("p", null, "All of the base routes of our application should be placed in an array. Nested routes will be defined using a property of their parent route."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const routes = [];"), _react.default.createElement("p", null, "The first route that we will define is for our homepage. We can name it anything we want, but we'll just call it \"Home\". For the home page's", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "path"), ", we will use an empty string (", _react.default.createElement(_PrismBlocks.InlineJS, null, "''"), ")."), _react.default.createElement("p", null, "Up above, we said that the pathname for our \"Home\" route is ", _react.default.createElement(_PrismBlocks.InlineJS, null, "/"), ". However, with Curi, ", _react.default.createElement(_PrismBlocks.InlineJS, null, "path"), " strings never begin with a forward slash. For all of the pathnames for pages that are listed above, we just need to strip off the leading slash."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const routes = [\n  { name: 'Home', path: '' }\n];"), _react.default.createElement("p", null, "That is simple enough, yes? Let's go ahead and add our \"Contact\" and \"Checkout\" routes. They should look just like our \"Home\" route."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const routes = [\n  { name: 'Home', path: '' },\n  { name: 'Contact', path: 'contact' },\n  { name: 'Checkout', path: 'checkout' }\n];"), _react.default.createElement("p", null, "Now, if a user visits", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "https://<our website domain>/checkout"), ", our checkout page will match (and likewise for ", _react.default.createElement(_PrismBlocks.InlineJS, null, "/contact"), " and our contact page)."), _react.default.createElement("p", null, "We still have more routes to define, but there are two concepts to introduce first: path params and the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "children"), " property of route objects."), _react.default.createElement(_Sections.Subsection, {
    title: "Path Params",
    id: "path-params",
    type: "aside"
  }, _react.default.createElement("p", null, "With ", _react.default.createElement(_PrismBlocks.InlineJS, null, "path-to-regexp"), ", when you create a path string, it is normally interpreted literally. That means that the the path", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "'products/hat'"), " will only match the location whose pathname is ", _react.default.createElement(_PrismBlocks.InlineJS, null, "/products/hat"), ". What if we also have a shirt? And socks? And shorts? Do you want to define a path for each individual product? Of course not. Instead, ", _react.default.createElement(_PrismBlocks.InlineJS, null, "path-to-regexp"), " allows us to define dynamic parts of pathnames using \"params\"."), _react.default.createElement("p", null, "What is a param? It is a way to tell ", _react.default.createElement(_PrismBlocks.InlineJS, null, "path-to-regexp"), " to capture part of the pathname at a particular point and store its value using the param's name. The param starts with a colon and then specifies the param's name."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "{ path: 'product/:name' }"), _react.default.createElement("p", null, "Using the above path, we will capture the portion of the pathname that comes after ", _react.default.createElement(_PrismBlocks.InlineJS, null, "product/"), " and store it in an object using the key \"name\". When you visit ", _react.default.createElement(_PrismBlocks.InlineJS, null, "'/products/hat'"), ",", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "path-to-regexp"), " will match and return the params object", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "{ name: 'hat' }"), ". Likewise, ", _react.default.createElement(_PrismBlocks.InlineJS, null, "'/products/shirt'"), ' ', "and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "'/products/shorts'"), " will capture \"shirt\" and \"shorts\" as the name param."), _react.default.createElement("p", null, "By default, a param will match all characters up until the next forward slash or the end of the string. You can also perform more specific matching, but that is outside of the scope of this tutorial.")), _react.default.createElement(_Sections.Subsection, {
    title: "Route Children",
    id: "children",
    type: "aside"
  }, _react.default.createElement("p", null, "Sometimes, you will have routes whose ", _react.default.createElement(_PrismBlocks.InlineJS, null, "path"), " extends the path of another route. For example, you might have a route whose path is", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "'parent'"), " and a child route with the path", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "'parent/child'"), "."), _react.default.createElement("p", null, "Using the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "children"), " property of route objects, you can attach an array of child routes to a parent route. The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "path"), ' ', "of each child route will extend the parent route's ", _react.default.createElement(_PrismBlocks.InlineJS, null, "path"), ". That means that using the parent/child paths from above, we can define the parent route to have the path ", _react.default.createElement(_PrismBlocks.InlineJS, null, "'parent'"), " and a child route whose path is ", _react.default.createElement(_PrismBlocks.InlineJS, null, "'child'"), ". Curi will treat that child route as if its path is ", _react.default.createElement(_PrismBlocks.InlineJS, null, "'parent/child'"), "."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "{\n  name: 'Parent',\n  path: 'parent',\n  children: [\n    {\n      name: 'Child',\n      path: 'child' // will match the pathname /parent/child\n    }\n  ]\n}")), _react.default.createElement("p", null, "Now, we can go ahead and use path params and route children to define our book list/book routes."), _react.default.createElement("p", null, "For this tutorial, we will identify books from a pathname using their", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "id"), ". We can name this anything we want, but \"id\" is simple and to the point."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const routes = [\n  { name: 'Home', path: '' },\n  { name: 'Contact', path: 'contact' },\n  { name: 'Checkout', path: 'checkout' },\n  {\n    name: 'Book List',\n    path: 'books',\n    children: [\n      {\n        name: 'Book',\n        path: ':id'\n      }\n    ]\n  }\n];"), _react.default.createElement(_Sections.Subsection, {
    title: "route.match",
    id: "route-match"
  }, _react.default.createElement("p", null, "We don't need it quite yet, but we should quickly cover another one of the properties of a route: ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match"), ". The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match"), ' ', "property is where we can provide functions that will be called when the route matches. There are three valid functions: ", _react.default.createElement(_PrismBlocks.InlineJS, null, "initial"), ",", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "every"), ", and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), "."), _react.default.createElement("p", null, "We won't be using the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "initial"), " function, but you can read more about it in the", ' ', _react.default.createElement(_react2.Link, {
    to: "Guide",
    params: {
      slug: 'code-splitting'
    }
  }, "Code Splitting"), ' ', "guide. The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "every"), " function will be used later on, but for now, we only care about the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " function."), _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " function gives us an opportunity to set some properties on the response object before it is emitted.", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " receives an object with are a bunch of properties (which you can read about", ' ', _react.default.createElement(_react2.Link, {
    to: "Guide",
    params: {
      slug: 'routes'
    },
    details: {
      hash: 'response'
    }
  }, "here"), "), but right now we only care about the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "set"), " object."), _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "set"), " object has functions that can be called to modify the response object. For example, calling ", _react.default.createElement(_PrismBlocks.InlineJS, null, "set.body('Hi!')"), ' ', "will set the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "body"), " property of the response to \"Hi!\". Let's go ahead and add ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match.response"), " functions to each of our routes. We don't really have anything to set as the body, so we'll just use the route's name as a placeholder."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const routes = [\n  {\n    name: 'Home',\n    path: '',\n    match: {\n      response: ({ set }) => {\n        set.body('Home');\n      }\n    }\n  },\n  {\n    name: 'Contact',\n    path: 'contact',\n    match: {\n      response: ({ set }) => {\n        set.body('Contact');\n      }\n    }\n  },\n  {\n    name: 'Checkout',\n    path: 'checkout',\n    match: {\n      response: ({ set }) => {\n        set.body('Checkout');\n      }\n    }\n  },\n  {\n    name: 'Book List',\n    path: 'books',\n    match: {\n      response: ({ set }) => {\n        set.body('Book List');\n      }\n    },\n    children: [\n      {\n        name: 'Book',\n        path: ':id',\n        match: {\n          response: ({ set }) => {\n            set.body('Book');\n          }\n        }\n      }\n    ]\n  }\n];"), _react.default.createElement("p", null, "Now, if a user visits the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "/books"), " page, the response object will include a ", _react.default.createElement(_PrismBlocks.InlineJS, null, "body"), " property whose value is \"Book List\".")), _react.default.createElement(_Sections.Subsection, {
    title: "Wildcard Routes",
    id: "wildcard"
  }, _react.default.createElement("p", null, "We have one last \"route\" to define. This isn't really a route, just a catch all that we can use to identify locations that we don't have a route defined for. ", _react.default.createElement(_PrismBlocks.InlineJS, null, "path-to-regexp"), " allows us to capture everything using the path string ", _react.default.createElement(_PrismBlocks.InlineJS, null, "(.*)"), "."), _react.default.createElement(_Messages.Note, null, _react.default.createElement(_PrismBlocks.InlineJS, null, "(.*)"), " uses another of the special ", _react.default.createElement(_PrismBlocks.InlineJS, null, "path-to-regexp"), ' ', "formats. If you provide a regular expression within parentheses,", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "path-to-regexp"), " will only match content that is matched by the regular expression. This can also be paired with a named path param (e.g. ", _react.default.createElement(_PrismBlocks.InlineJS, null, ":id(\\d{4})"), "), but is not necessary."), _react.default.createElement("p", null, "Since the regular expression ", _react.default.createElement(_PrismBlocks.InlineJS, null, ".*"), " matches everything, we can use this to match all possible pathnames that someone using the website might navigate to."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const routes = [\n  // ...,\n  {\n    name: 'Not Found',\n    path: '(.*)',\n    match: {\n      response: ({ set }) => {\n        set.body('Not Found');\n      }\n    }\n  }\n];\n// don't forget to export the routes\nexport default routes;")), _react.default.createElement(_Sections.Subsection, {
    title: "Route Order",
    id: "order"
  }, _react.default.createElement("p", null, "One last thing to note about routes is that their order in the routes array is important. Curi will iterate over them in (depth-first) order. This means that with the above config, Curi will first check if", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "''"), " matches the pathname, if it does not, it will move on to", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "'contact'"), ", so on and so forth. If no other routes match, then we know that our \"Not Found\" route will."), _react.default.createElement("p", null, "Curi will only attempt to match children routes if their parent route (partially) matches the location's pathname. That means that when the pathname is ", _react.default.createElement(_PrismBlocks.InlineJS, null, "'/somewhere'"), ", because our \"Book List\" route does not match, Curi will not attempt to match our \"Book\" route."))), _react.default.createElement(_Sections.Section, {
    title: "Review",
    id: "review"
  }, _react.default.createElement(_Branch.CompleteBranch, {
    name: "04-hickory"
  })), _react.default.createElement(_Sections.Section, {
    title: "Next",
    id: "next"
  }, _react.default.createElement("p", null, "Now that our routes are defined, it is time to talk about history in", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '04-hickory'
    }
  }, "Part 4: Hickory"))));
};

exports.default = _default;

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BaseTutorial = _interopRequireDefault(__webpack_require__(58));

var _Branch = __webpack_require__(59);

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(13);

var _Sections = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement(_BaseTutorial.default, null, _react.default.createElement("h1", null, "Part 4: Hickory"), _react.default.createElement("p", null, "One thing that all modern JavaScript routers have in common is that they use the", ' ', _react.default.createElement("a", {
    href: "https://developer.mozilla.org/en-US/docs/Web/API/History_API"
  }, "History API"), ' ', "to perform in-app navigation. Curi uses a package called", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/hickory"
  }, "Hickory"), ", which will interact with the History API for us."), _react.default.createElement("div", null, _react.default.createElement("p", null, "In this tutorial, we will be doing the following:"), _react.default.createElement("ul", null, _react.default.createElement("li", null, "Learning about the Hickory package and location objects."), _react.default.createElement("li", null, "Creating the Hickory history object for our website."))), _react.default.createElement(_Branch.TutorialBranch, {
    name: "04-hickory"
  }), _react.default.createElement(_Sections.Section, {
    title: "About Hickory",
    id: "about"
  }, _react.default.createElement("p", null, "Hickory creates \"history\" objects that allow you to navigate between locations within your application. It interacts with the browser for you so that when you navigate to a new location, the URI in the address bar is also updated. Hickory also detects and updates when you use the browser's forward and back buttons."), _react.default.createElement("p", null, "Hickory uses a single-subscriber model so that whenever navigation to a new location happens, the subscribed method will be called. Curi will subscribe to your history object to create new responses whenever the location changes.")), _react.default.createElement(_Sections.Section, {
    title: "Choose your own Hickory",
    id: "choose"
  }, _react.default.createElement("p", null, "Hickory is split into three packages: ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@hickory/browser"), ",", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "@hickory/hash"), ", and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@hickory/in-memory"), ". You can read about the differences between them and figure out which is right for you in this", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/hickory/blob/master/docs/about/choosing.md"
  }, "Choosing Your History Type"), ' ', "guide."), _react.default.createElement("p", null, "We will be using the browser history (", _react.default.createElement(_PrismBlocks.InlineJS, null, "@hickory/browser"), "). This is because 1. our application will run in the browser and 2. our site is backed by a server that can handle dynamic requests.")), _react.default.createElement(_Sections.Section, {
    title: "Installation",
    id: "installation"
  }, _react.default.createElement("p", null, "If you have following along with these tutorials since the", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '02-setup'
    }
  }, "setup tutorial"), ", then you should already have the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@hickory/browser"), ' ', "package installed. If not, you should install it now."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "npm install @hickory/browser")), _react.default.createElement(_Sections.Section, {
    title: "Making History",
    id: "making-history"
  }, _react.default.createElement("p", null, "In order to use Hickory in our application, we just need to import it and call the imported function. There are a number of configuration options that you can provide, but we don't need any of those right now. If you want to learn more about those, please check out the", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/hickory/tree/master/docs"
  }, "Hickory documentation"), "."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import Browser from '@hickory/browser';\nconst history = Browser();")), _react.default.createElement(_Sections.Section, {
    title: "Location",
    id: "hickory-location",
    type: "aside"
  }, _react.default.createElement("p", null, "Hickory (and Curi in turn) use location objects for navigation and route matching. These are simply JavaScript objects with a few properties to identify a location."), _react.default.createElement("p", null, "When you load a page, Hickory will parse the URI to generate a location's ", _react.default.createElement(_PrismBlocks.InlineJS, null, "pathname"), ", ", _react.default.createElement(_PrismBlocks.InlineJS, null, "query"), ", and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "hash"), ' ', "properties. The pathname property of a location is the only thing that", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "path-to-regexp"), " uses for matching locations."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// uri = '/products/socks?color=black#description'\n{\n pathname: '/products/socks',\n query: 'color=black',\n hash: 'description',\n key: '1.0',\n rawPathname: '/products/socks'\n}"), _react.default.createElement("p", null, "Besides the properties parsed from the URI, locations also have a", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "key"), " property that can be used to uniquely identify a location, a ", _react.default.createElement(_PrismBlocks.InlineJS, null, "rawPathname"), " property (you probably won't need this, but it is useful when dealing with pathnames that contain encoded characters), and sometimes ", _react.default.createElement(_PrismBlocks.InlineJS, null, "state"), " which is data tied to a location but not part of the URI."), _react.default.createElement("p", null, "Hickory actually navigates between locations, not URIs. The only time that Curi/Hickory uses URIs is to set the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "href"), " attribute of anchors and to update the string displayed in the address bar (using the History API)."), _react.default.createElement("p", null, "For now, that will cover all that you need to know about Hickory. For basic usage, you should never have to think about it except for creating your history object.")), _react.default.createElement(_Sections.Section, {
    title: "Review",
    id: "review"
  }, _react.default.createElement(_Branch.CompleteBranch, {
    name: "05-config"
  })), _react.default.createElement(_Sections.Section, {
    title: "Next",
    id: "next"
  }, _react.default.createElement("p", null, "With both our routes and history object, we are now ready for", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '05-config'
    }
  }, "Part 5"), ", where we will create the core of Curi, our configuration object.")));
};

exports.default = _default;

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BaseTutorial = _interopRequireDefault(__webpack_require__(58));

var _Branch = __webpack_require__(59);

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(13);

var _Sections = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement(_BaseTutorial.default, null, _react.default.createElement("h1", null, "Part 5: The Curi Configuration Object"), _react.default.createElement("p", null, "Curi uses a centralized configuration object to handle routing. Essentially, whenever the location changes (and when your application first loads), the configuration object will iterate over your routes to find one that matches the location. Then, it will use that route to generate a response object. This response contains a bunch of properties that are useful for rendering your application."), _react.default.createElement("div", null, _react.default.createElement("p", null, "In this tutorial, we will be doing the following:"), _react.default.createElement("ul", null, _react.default.createElement("li", null, "Creating a Curi configuration object using our routes and history object."), _react.default.createElement("li", null, "Learning about some of the properties of the configuration object and how Curi works."))), _react.default.createElement(_Branch.TutorialBranch, {
    name: "05-config"
  }), _react.default.createElement(_Sections.Section, {
    title: "Installation",
    id: "installation",
    type: "aside"
  }, _react.default.createElement("p", null, "If you skipped the setup, you should install ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/core"), " now."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "npm install @curi/core")), _react.default.createElement(_Sections.Section, {
    title: "Creating our Config",
    id: "create"
  }, _react.default.createElement("p", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/core"), " only has a single, default export, which is a function that will create a configuration object. In this tutorial, we will import it as ", _react.default.createElement(_PrismBlocks.InlineJS, null, "createConfig"), " (of course, you can name it whatever you like)."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import createConfig from '@curi/core';"), _react.default.createElement("p", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "createConfig"), " can take three arguments; the first two arguments are required while the third is not."), _react.default.createElement("ol", null, _react.default.createElement("li", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "history"), " - The first argument to pass to", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "createConfig"), " is a Hickory history object."), _react.default.createElement("li", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "routes"), " - The second argument is an array of route objects."), _react.default.createElement("li", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "config"), " - The third argument is an object that contains additional configuration data. We will not be using this object in this tutorial.")), _react.default.createElement("p", null, "Using the routes that we defined in the", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '03-routes'
    }
  }, "Routes Tutorial"), ' ', "and the", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '04-hickory'
    }
  }, "Hickory history object"), ", we are ready to create our configuration object."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import createConfig from '@curi/core';\nimport Browser from '@hickory/browser';\n\nimport routes from './routes';\n\nconst history = Browser();\nconst config = createConfig(history, routes);")), _react.default.createElement(_Sections.Section, {
    title: "Subscriber Model",
    id: "subscriber",
    type: "aside"
  }, _react.default.createElement("p", null, "In order to let your application know about location changes, Curi uses a subscriber model. Whenever a location change happens, Curi will create a new response and then emit this response to all of its subscribed functions. These subscribed functions are called response handlers since they handle the new respond. Using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "config.respond"), ", we can give Curi a response handler to call when a new response has been created."), _react.default.createElement("p", null, "What does a response handler function look like? It can take two arguments. The first will be the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " object generated for the new location. The second is the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "action"), " type from the navigation (", _react.default.createElement(_PrismBlocks.InlineJS, null, "'PUSH'"), ",", _react.default.createElement(_PrismBlocks.InlineJS, null, "'POP'"), ", and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "'REPLACE'"), ")."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "function responseLogger(response, action) {\n  console.log(\"RESPONSE:\", response);\n  console.log(\"ACTION\", action)\n}\nconfig.respond(responseLogger);"), _react.default.createElement("p", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "curi.respond"), " will return a function that you can use to stop responding to new responses."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "function responseLogger(response, action) {\n  console.log(\"I will be called for every response until I unsubscribe\");\n}\nconst stopResponding = config.respond(responseLogger);\n// any navigation that happens now will be logged\n// ...\nstopResponding();\n// after unsubscribing, any new navigation will not be logged"), _react.default.createElement("p", null, "While most response handlers should be subscribers (that is to say, you want them to be called every time a new response is generated), you might sometimes want to only call a response handler once. For example, a response handler might be a \"ready\" function that you only want called once you know that a response exists. To do that, you can use the second argument to ", _react.default.createElement(_PrismBlocks.InlineJS, null, "config.respond"), ", which is an options object. When the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "once"), " object is ", _react.default.createElement(_PrismBlocks.InlineJS, null, "true"), ", then that response handler will only be called one time."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "function responseLogger(response, action) {\n  console.log(\"I will only be called once\");\n}\nconfig.respond(responseLogger, { once: true });")), _react.default.createElement(_Sections.Section, {
    title: "Review",
    id: "review"
  }, _react.default.createElement("p", null, "If you are following the React path:"), _react.default.createElement(_Branch.CompleteBranch, {
    name: "06-pages-react"
  }), _react.default.createElement("p", null, "If you are following the Vue path:"), _react.default.createElement(_Branch.CompleteBranch, {
    name: "06-pages-vue"
  })), _react.default.createElement(_Sections.Section, {
    title: "Next",
    id: "next"
  }, _react.default.createElement("p", null, "With our configuration object created, we are finally ready to render. Now, we are at a bit of a fork in the road. While most of the tutorials apply to everyone, the next tutorial is framework specific."), _react.default.createElement("p", null, "If you are following along using React, continue on to", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '06-pages-react'
    }
  }, "Part 6: React Pages")), _react.default.createElement("p", null, "If you are following along using Vue, you instead you should go to", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '06-pages-vue'
    }
  }, "Part 6: Vue Pages"))));
};

exports.default = _default;

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BaseTutorial = _interopRequireDefault(__webpack_require__(58));

var _Branch = __webpack_require__(59);

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(13);

var _Sections = __webpack_require__(12);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement(_BaseTutorial.default, null, _react.default.createElement("h1", null, "Part 6: React Pages"), _react.default.createElement("p", null, "Now that we have our configuration object ready to go, we can think about what our pages should look like. This tutorial will be rendering our website using React. If you prefer to use Vue, you should check out the", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '06-pages-vue'
    }
  }, "Part 6: Vue Pages"), ' ', "tutorial."), _react.default.createElement("div", null, _react.default.createElement("p", null, "In this tutorial, we will be doing the following:"), _react.default.createElement("ul", null, _react.default.createElement("li", null, "Modifying our Babel configuration to support React."), _react.default.createElement("li", null, "Installing the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/react"), " package and learning about some of the components it provides (", _react.default.createElement(_PrismBlocks.InlineComponent, null, "CuriBase"), " and ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), ")."), _react.default.createElement("li", null, "Defining the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "render"), " function that will render the contents of the website."), _react.default.createElement("li", null, "Creating page components for each of the routes."), _react.default.createElement("li", null, "Adding links so that users can navigate between locations in the website."))), _react.default.createElement(_Branch.TutorialBranch, {
    name: "06-pages-react"
  }), _react.default.createElement(_Sections.Section, {
    title: "Babel",
    id: "babel"
  }, _react.default.createElement("p", null, "Before we dive in, let's make sure that our build scripts can handle React. To do this, we just need to install Babel's React preset and add it to our Babel configuration file."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "npm install --save-dev @babel/preset-react"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// .babelrc.js\nmodule.exports = {\n  presets: [\n    ['@babel/env',{\n      modules: false\n    }],\n    '@babel/react'\n  ]\n};")), _react.default.createElement(_Sections.Section, {
    title: _react.default.createElement("span", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/react"), " Package"),
    id: "package"
  }, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/react"), " package provides React components that know how to interact with Curi. For this tutorial, we will only be using two:", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "CuriBase"), " and ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), ". However, there are a number of other ones that you might find useful. You can read more about them in the", ' ', _react.default.createElement(_react2.Link, {
    to: "Package",
    params: {
      package: 'react'
    },
    details: {
      hash: 'API'
    }
  }, _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/react"), " documentation"), "."), _react.default.createElement(_Sections.Subsection, {
    title: "Installation",
    id: "installation"
  }, _react.default.createElement("p", null, "Let's start by installing the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/react"), " package. If you haven't already, you should also install the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "react"), " and", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "react-dom"), " packages."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "npm install @curi/react react react-dom")), _react.default.createElement(_Sections.Subsection, {
    title: _react.default.createElement("span", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "CuriBase"), " Component"),
    id: "CuriBase"
  }, _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import { CuriBase } from '@curi/react';"), _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "CuriBase"), " is responsible for rendering the website whenever the location changes. It can take four props:", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), ", ", _react.default.createElement(_PrismBlocks.InlineJS, null, "action"), ",", _react.default.createElement(_PrismBlocks.InlineJS, null, "config"), ", and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "render"), "."), _react.default.createElement("ol", null, _react.default.createElement("li", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " is a Curi response object."), _react.default.createElement("li", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "action"), " (optional) is the action type of the last navigation."), _react.default.createElement("li", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "config"), " is our Curi configuration object."), _react.default.createElement("li", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "render"), " is a function that will be called whenever a new response is emitted (and during the initial render) and returns the React element(s) that make up your website. It will receive three arguments: the new ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " object, the navigation's", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "action"), " and the Curi config object. The second two can be useful occasionally, but the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " is what we really need for rendering.")), _react.default.createElement("p", null, "In order to set the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " prop, we need to subscribe to our Curi configuration object. That will allow us to always have the latest response object."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// index.js\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport { CuriBase } from '@curi/react';\n\n// ...\n\nconfig.respond((response) => {\n  ReactDOM.render((\n    <CuriBase\n      response={response}\n      config={config}\n      render={response => {\n        return null;\n      }}\n    />\n  ), document.getElementById('root'));\n});"), _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "CuriBase"), " also adds a ", _react.default.createElement(_PrismBlocks.InlineJS, null, "curi"), " object to React's context. This object has ", _react.default.createElement(_PrismBlocks.InlineJS, null, "config"), ", ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), ", and", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "action"), " properties. A number of the other components exported by ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/react"), " rely on these variables to render/function."), _react.default.createElement("p", null, "The above ", _react.default.createElement(_PrismBlocks.InlineJS, null, "render"), " function isn't very interesting because our application is rendering nothing (", _react.default.createElement(_PrismBlocks.InlineJS, null, "null"), "). We'll come back to that in a minute, but first we should learn about the other React component that we'll be using.")), _react.default.createElement(_Sections.Subsection, {
    title: _react.default.createElement("span", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), " Component"),
    id: "Link"
  }, _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import { Link } from '@curi/react';"), _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), " component renders anchor (", _react.default.createElement(_PrismBlocks.InlineComponent, null, "a"), ") elements. However, unlike an anchor, we don't actually have to write the URI that we want to navigate to (the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "href"), "). Instead, you use the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "to"), " prop to pass the name of the route that you want to navigate to."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "<Link to='Home'>Home</Link>\n// <a href='/'>Home</a>"), _react.default.createElement("p", null, "If the route that you are navigating to has any params, you pass them using the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "params"), " prop."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// { name: 'Book', path: ':id' }\n// (inherits 'books' path from parent route)\n<Link to='Book' params={{ id: 1357 }}>\n  Some Book\n</Link>\n// <a href='/books/1357'>Some Book</a>"), _react.default.createElement("p", null, "If you need to pass any other location properties (", _react.default.createElement(_PrismBlocks.InlineJS, null, "query"), ",", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "hash"), ", or ", _react.default.createElement(_PrismBlocks.InlineJS, null, "state"), "), you can provide them using the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "details"), " prop."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "<Link to='Contact' details={{ hash: 'email' }}>\n  Contact by Email\n</Link>\n// <a href='/contact#email>Contact by Email</a>"), _react.default.createElement(_Messages.Note, null, "If you want to navigate outside of the application, use an anchor not a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), ".", _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// interal\n<Link to='Contact'>Contact</Link>\n// external\n<a href=\"https://github.com\">GitHub</a>")))), _react.default.createElement(_Sections.Section, {
    title: "The render function",
    id: "render-function"
  }, _react.default.createElement("p", null, "Let's go back to that ", _react.default.createElement(_PrismBlocks.InlineJS, null, "render"), " function that we pass to the", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "CuriBase"), ". In the sample code above, we just returned", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "null"), ". Of course, for our website we want to return the actual elements that make up a page. How should we do this? Let's take a look at the properties of our response object."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "function render(response) {\n  console.log('response:', response);\n  return null;\n}\n/*\nresponse: {\n body: undefined,\n data: undefined,\n error: undefined,\n key: '1.0',\n location: { pathname: '/', ... },\n name: 'Home',\n params: {},\n partials: [],\n status: 200\n}\n*/"), _react.default.createElement(_Messages.Note, null, "The", ' ', _react.default.createElement(_react2.Link, {
    to: "Guide",
    params: {
      slug: 'responses'
    },
    details: {
      hash: 'properties'
    }
  }, "Rendering with Responses"), ' ', "guide goes into more detail about each of the properties of a response object."), _react.default.createElement("p", null, "In", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '03-routes'
    }
  }, "Part 3"), ' ', "of this tutorial, we added ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match.response"), " functions that set the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "body"), " property for each of our routes. There, we just used a placeholder string, but now we can actually set the component for each route. Instead of returning a string, what if ", _react.default.createElement(_PrismBlocks.InlineJS, null, "set.body"), " set the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "body"), " to be a React component? Then, our render function can use the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "body"), " property of our response object to render our website. We'll expand on that later on, but for now, let's go ahead and define the components for each of our routes.")), _react.default.createElement(_Sections.Section, {
    title: "The Route Components",
    id: "route-components"
  }, _react.default.createElement("p", null, "To refresh your memory, we have \"Home\", \"Contact\", \"Book List\", \"Book\", \"Checkout\", and \"Not Found\" pages that we will need to create components for. We can write some barebones components and add some more content later on."), _react.default.createElement("p", null, "Let's create a ", _react.default.createElement(_PrismBlocks.InlineJS, null, "components"), " directory inside of our", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "src"), " directory. Then, we can add files for each route in there."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "mkdir -p src/components"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/Home.js\nimport React from 'react';\nconst Home = () => (\n  <div className='home'>\n    Welcome to our book store!\n  </div>\n);\nexport default Home;"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/Contact.js\nimport React from 'react';\nconst Contact = () => (\n  <div className='contact'>\n    You can contact us by fax at 1-206-555-0123.\n  </div>\n);\nexport default Contact;"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/BookList.js\nimport React from 'react';\nconst BookList = () => (\n  <div className='book-list'>\n    Available Books\n  </div>\n);\nexport default BookList;"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/Book.js\nimport React from 'react';\nconst Book = () => (\n  <div className='book'>\n    Book\n  </div>\n);\nexport default Book;"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/Checkout.js\nimport React from 'react';\nconst Checkout = () => (\n  <div className='checkout'>\n    Checkout\n  </div>\n);\nexport default Checkout;"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/NotFound.js\nimport React from 'react';\nconst NotFound = () => (\n  <div className='not-found'>\n    Page not found\n  </div>\n);\nexport default NotFound;"), _react.default.createElement("p", null, "All of these components should be imported in our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "routes.js"), ". We can now update our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "set.body()"), " calls to set the actual components as the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "body"), " property of responses."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// routes.js\nimport Home from './components/Home';\nimport Contact from './components/Contact';\nimport BookList from './components/BookList';\nimport Book from './components/Book';\nimport Checkout from './components/Checkout';\nimport NotFound from './components/NotFound';\n\nconst routes = [\n  {\n    name: 'Home',\n    path: '',\n    match: {\n      response: ({ set }) => {\n        set.body(Home);\n      }\n    }\n  },\n  {\n    name: 'Contact',\n    path: 'contact',\n    match: {\n      response: ({ set }) => {\n        set.body(Contact);\n      }\n    }\n  },\n  {\n    name: 'Checkout',\n    path: 'checkout',\n    match: {\n      response: ({ set }) => {\n        set.body(Checkout);\n      }\n    }\n  },\n  {\n    name: 'Book List',\n    path: 'books',\n    match: {\n      response: ({ set }) => {\n        set.body(BookList);\n      }\n    },\n    children: [\n      {\n        name: 'Book',\n        path: ':id',\n        match: {\n          response: ({ set }) => {\n            set.body(Book);\n          }\n        }\n      }\n    ]\n  },\n  {\n    name: 'Not Found',\n    path: '(.*)',\n    match: {\n      response: ({ set }) => {\n        set.body(NotFound);\n      }\n    }\n  }\n];\n\nexport default routes;"), _react.default.createElement("p", null, "Our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "render"), " function is now able to use", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response.body"), ". This is also a good time to separate the render function from the component. This isn't absolutely necessary, but can help keep the code cleaner."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// index.js\nimport renderFunction from './render';\n\nlet root = document.getElementById('root');\nconfig.respond((response) => {\n  ReactDOM.render((\n    <CuriBase\n      response={response}\n      config={config}\n      render={renderFunction}\n    />\n  ), root);\n});\n\n// render.js\nexport default function(response) {\n  return <response.body />;\n}"), _react.default.createElement("p", null, "Now, if we load up our application, we will render our home page (the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "Home"), " component). Unfortunately, there is no way to navigate to any of our other pages. In order to do this, we will need to add some", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), "s to our application.")), _react.default.createElement(_Sections.Section, {
    title: "A Navigation Menu",
    id: "nav-menu"
  }, _react.default.createElement("p", null, "We can write a simple ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "NavLinks"), " menu component to add navigation to our application. From this menu, we only need to be able to navigate to our \"Home\", \"Contact\", \"Book List\", and \"Checkout\" routes. Navigation to individual books will be done from the book list page."), _react.default.createElement("p", null, "We will use a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "nav"), " element as the parent for our", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "NavLinks"), ". Inside of that is a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "ul"), " and then each of our routes will be ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), "s wrapped in ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "li"), "s."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/NavLinks.js\nimport React from 'react';\nimport { Link } from '@curi/react';\n\nconst NavLinks = () => (\n  <nav>\n    <ul>\n      <li>\n        <Link to='Home'>Home</Link>\n      </li>\n      <li>\n        <Link to='Contact'>Contact Us</Link>\n      </li>\n      <li>\n        <Link to='Book List'>Books for Sale</Link>\n      </li>\n      <li>\n        <Link to='Checkout'>Checkout</Link>\n      </li>\n    </ul>\n  </nav>\n);\nexport default NavLinks;"), _react.default.createElement("p", null, "That is simple enough, but where should we render this? Our", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), " components rely on the context variables that are provided by the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "CuriBase"), ". This means that our", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "NavLinks"), " needs to be a child of the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "CuriBase"), "."), _react.default.createElement("p", null, "The easiest way for us to do that would be to modify our", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "render"), " function. Instead of just returning the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response.body"), " component, we can return a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "div"), " that wraps both ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response.body"), " and our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "NavLinks"), ' ', "component."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// render.js\nimport NavLinks from './components/NavLinks.js';\n\nexport default function(response) {\n  const { body: Body } = response;\n  return (\n    <div>\n      <header>\n        <NavLinks />\n      </header>\n      <main>\n        <Body />\n      </main>\n    </div>\n  );\n}"), _react.default.createElement("p", null, "With the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "NavLink"), "s, we can navigate between most of our routes. However, we still need to add navigation to our individual books.")), _react.default.createElement(_Sections.Section, {
    title: "Navigating to Our Books",
    id: "param-navigation"
  }, _react.default.createElement("p", null, "Our \"Book\" route is different than all of our other routes because the book path includes an ", _react.default.createElement(_PrismBlocks.InlineJS, null, "id"), " param. This means that we need to actually have \"id\" values to pass to our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), "s. Later on, we'll generate some better data, but for now we can just generate a placeholder list in a module called ", _react.default.createElement(_PrismBlocks.InlineJS, null, "books.js"), "."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, " // books.js\nconst books = [\n  { id: 0 },\n  { id: 1 },\n  { id: 2 },\n  { id: 3 }\n];\nexport default books;"), _react.default.createElement("p", null, "In the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "BookList"), " component we can iterate over this list to generate links to our books."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/BookList.js\nimport { Link } from '@curi/react';\n\nimport books from '../books';\n\nconst BookList = () => (\n  <div className='book-list'>\n    <h1>Available Books</h1>\n    <div className='books'>\n      { books.map(b => (\n        <div className='book-item' key={b.id}>\n          <Link to='Book' params={{ id: b.id }}>\n            Book {b.id}\n          </Link>\n        </div>\n      )) }\n    </div>\n  </div>\n);")), _react.default.createElement(_Sections.Section, {
    title: "Book Props",
    id: "book-props"
  }, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), "s above allow us to navigate to our books, but we don't actually have any information about which book we are supposed to be seeing. It would really help if our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), " was able to access the parsed params so that it can render the information for the correct book."), _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "params"), " object is a property of our response object. That means that if we pass our response object as a prop to the", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "Body"), ", we can access these params in our route components."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// render.js\nexport default function(response) {\n  const { body: Body } = response;\n  return (\n    <div>\n      <header>\n        <NavLinks />\n      </header>\n      <main>\n        <Body response={response} />\n      </main>\n    </div>\n  );\n}"), _react.default.createElement(_Messages.Note, null, "There are a number of ways that you can decide to pass props to your route components. The one thing to keep in mind is that ", _react.default.createElement("em", null, "all"), " of your route components will receive the same set of props. You can either be very specific and only pass the props that are necessary (e.g.", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "Body params=", "{params}"), ") or you can just pass the entire response object (e.g. ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Body response=", "{response}"), ") so you don't have to worry about updating this every time one of your route components needs another prop from the response."), _react.default.createElement("p", null, "Next, we just need to update our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), " component so that it can access its ", _react.default.createElement(_PrismBlocks.InlineJS, null, "params"), " prop and figure out which book to render content for."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/Book.js\nconst Book = ({ response }) => (\n  <div className='book'>\n    Book {response.params.id}\n  </div>\n);")), _react.default.createElement(_Sections.Section, {
    title: "Review",
    id: "review"
  }, _react.default.createElement("p", null, "After completing this tutorial, we now have a semi-functional website that renders basic content for each of our pages."), _react.default.createElement(_Branch.CompleteBranch, {
    name: "07-loading-data-react"
  }), _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi-tutorial/tree/07-loading-data-react"
  })), _react.default.createElement(_Sections.Section, {
    title: "Next",
    id: "next"
  }, _react.default.createElement("p", null, "At this point, we have a website with a number of pages. It isn't particularly useful yet, but at least we can navigate between pages. Next we will take a step back from React and learn how to implement data loading with", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '07-loading-data'
    }
  }, "Part 7: Loading Data"), ".")));
};

exports.default = _default;

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BaseTutorial = _interopRequireDefault(__webpack_require__(58));

var _Branch = __webpack_require__(59);

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(13);

var _Sections = __webpack_require__(12);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement(_BaseTutorial.default, null, _react.default.createElement("h1", null, "Part 6: Vue Pages"), _react.default.createElement("p", null, "Now that we have our configuration object ready to go, we can think about what our pages should look like. This tutorial will be rendering our website using Vue. If you prefer to use React, you should check out the", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '06-pages-react'
    }
  }, "Part 6: React Pages"), ' ', "tutorial."), _react.default.createElement("div", null, _react.default.createElement("p", null, "In this tutorial, we will be doing the following:"), _react.default.createElement("ul", null, _react.default.createElement("li", null, "Modifying our Webpack configuration to support Vue."), _react.default.createElement("li", null, "Installing the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/vue"), " package, learning about the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "CuriPlugin"), " and one of the components it provides (", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"), ")."), _react.default.createElement("li", null, "Using the response object emitted by Curi to render our website."), _react.default.createElement("li", null, "Defining page components for each of the routes."), _react.default.createElement("li", null, "Adding links so that users can navigate between locations in the website."))), _react.default.createElement(_Branch.TutorialBranch, {
    name: "06-pages-vue"
  }), _react.default.createElement(_Sections.Section, {
    title: "Webpack",
    id: "webpack"
  }, _react.default.createElement("p", null, "Before we dive in, let's make sure that our build scripts can handle Vue. To do this, we just need to install Webpack's Vue loader and add support for ", _react.default.createElement(_PrismBlocks.InlineJS, null, ".vue"), " files to our Webpack configuration."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "npm install --save-dev vue-loader vue-template-compiler"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// webpack.config.js\nconst config = {\n  // ...,\n  resolve: {\n    extensions: ['.js', '.vue'],\n    alias: {\n      vue: 'vue/dist/vue.js'\n    }\n  },\n  module: {\n    rules: [\n      // ...\n      {\n        test: /.vue$/,\n        loader: 'vue-loader'\n      }\n    ]\n  }\n};")), _react.default.createElement(_Sections.Section, {
    title: _react.default.createElement("span", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/vue"), " Package"),
    id: "package"
  }, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/vue"), " package exports a Vue plugin, which provides components that know how to interact with Curi. For this tutorial, we will only be using one: ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"), ". You can read more about the package in the", ' ', _react.default.createElement(_react2.Link, {
    to: "Package",
    params: {
      package: 'vue'
    },
    details: {
      hash: 'API'
    }
  }, _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/vue"), " documentation"), "."), _react.default.createElement(_Sections.Subsection, {
    title: "Installation",
    id: "installation"
  }, _react.default.createElement("p", null, "Let's start by installing the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/vue"), " package as well as Vue."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "npm install @curi/vue vue")), _react.default.createElement(_Sections.Subsection, {
    title: "The Plugin",
    id: "plugin"
  }, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "CuriPlugin"), " exported by ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/vue"), ", should be registered with Vue after the Curi configuration object has been created. The plugin does a couple things. First, it will make your Curi configuration object and new responses/actions accessible to every component as through the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "this.$curi"), " object. Second, it will register Curi specific components. For this tutorial, the only component that we care about is ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"), "."), _react.default.createElement("p", null, "Instead of having to register the plugin manually (via", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "Vue.use"), "), ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/vue"), " also exports an", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "installCuri"), " function that will handle that for you. The install function will also subscribe to your Curi configuration object to handle new responses."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// index.js\nimport Vue from 'vue';\nimport { installCuri } from '@curi/vue';\n\nconst config = createConfig(history, routes);\ninstallCuri(Vue, config);")), _react.default.createElement(_Sections.Subsection, {
    title: _react.default.createElement("span", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"), " Component"),
    id: "Link"
  }, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"), " component renders anchor (", _react.default.createElement(_PrismBlocks.InlineComponent, null, "a"), ") elements. However, unlike an anchor, we don't actually have to write the URI that we want to navigate to (the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "href"), "). Instead, you use the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "to"), " prop to pass the name of the route that you want to navigate to."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "<curi-link to='Home'>Home</curi-link>\n// <a href='/'>Home</a>"), _react.default.createElement("p", null, "If the route that you are navigating to has any params, you pass them using the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "params"), " prop."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// { name: 'Book', path: ':id' }\n// (inherits 'books' path from parent route)\n<curi-link to='Book' params={{ id: 1357 }}>\n  Some Book\n</curi-link>\n// <a href='/books/1357'>Some Book</a>"), _react.default.createElement("p", null, "If you need to pass any other location properties (", _react.default.createElement(_PrismBlocks.InlineJS, null, "query"), ",", _react.default.createElement(_PrismBlocks.InlineJS, null, "hash"), ", or ", _react.default.createElement(_PrismBlocks.InlineJS, null, "state"), "), you can provide them using the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "details"), " prop."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "<curi-link to='Contact' details={{ hash: 'email' }}>\n  Contact by Email\n</curi-link>\n// <a href='/contact#email>Contact by Email</a>"), _react.default.createElement(_Messages.Note, null, "If you want to navigate outside of the application, use an anchor not a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"), ".", _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// interal\n<curi-link to='Contact'>Contact</curi-link>\n// external\n<a href=\"https://github.com\">GitHub</a>")))), _react.default.createElement(_Sections.Section, {
    title: "The Response",
    id: "response"
  }, _react.default.createElement("p", null, "Being able to access the Curi configuration object is nice, but what we really need is to access the response objects that are emitted by Curi whenever the location changes. We ", _react.default.createElement("em", null, "could"), " use the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "config.respond"), " method that we covered in the", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '05-config'
    }
  }, "configuration object"), ' ', "tutorial, but ", _react.default.createElement(_PrismBlocks.InlineJS, null, "installCuri"), " takes care of that step for us.", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "installCuri"), " calls ", _react.default.createElement(_PrismBlocks.InlineJS, null, "config.respond"), " and in the response handler, it updates the reactive ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " and", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "action"), " properties of ", _react.default.createElement(_PrismBlocks.InlineJS, null, "this.$curi"), " whenever a new response is emitted."), _react.default.createElement("p", null, "While we do not have to manually subscribe to all responses, we do need to listen for the first response to be emitted so that we can render the application. The second argument to ", _react.default.createElement(_PrismBlocks.InlineJS, null, "config.respond"), " is an options object. If we pass the options ", _react.default.createElement(_PrismBlocks.InlineJS, null, "{ once: true }"), ", then that function will only be called after the initial response is emitted."), _react.default.createElement("p", null, "Inside of the response handler function, we just need to render our root application component. All of our Curi related data will be available through ", _react.default.createElement(_PrismBlocks.InlineJS, null, "this.$curi"), ", so we don't have to attach any data to the Vue instance."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// index.js\nimport app from './components/app';\n\nconfig.respond(response => {\n  const vm = new Vue({\n    el: '#root',\n    template: '<app />',\n    components: { app }\n  });\n}, { once: true });")), _react.default.createElement(_Sections.Section, {
    title: "The App",
    id: "app"
  }, _react.default.createElement("p", null, "At this point we have the ability to access our configuration object throughout our components and we are passing response objects to some", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "app"), " component that we haven't actually written yet. We should write those components now."), _react.default.createElement("p", null, "Our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "app"), " component will be responsible for rendering our website based on the response object. To start, let's add a", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "components"), " directory to our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "src"), " directory."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "mkdir -p src/components"), _react.default.createElement("p", null, "From up above, we know that our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "app"), " will be receiving the response object as a prop. What should it render, though?"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/App.vue -->\n<template>\n</template>\n\n<script>\n  export default {\n    name: 'app'\n  };\n</script>"), _react.default.createElement("p", null, "Let's take a look at the properties of our response object to see which of its properties would be helpful for rendering our website."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "{\n body: undefined,\n data: undefined,\n error: undefined,\n key: '1.0',\n location: { pathname: '/', ... },\n name: 'Home',\n params: {},\n partials: [],\n status: 200\n}"), _react.default.createElement(_Messages.Note, null, "The", ' ', _react.default.createElement(_react2.Link, {
    to: "Guide",
    params: {
      slug: 'responses'
    },
    details: {
      hash: 'properties'
    }
  }, "Rendering with Responses"), ' ', "guide goes into more detail about each of the properties of a response object."), _react.default.createElement("p", null, "In", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '03-routes'
    }
  }, "Part 3"), ' ', "of this tutorial, we added ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match.response"), " functions that set the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "body"), " property for each of our routes. There, we just used a placeholder string, but now we can actually set the component for each route. Instead of returning a string, what if ", _react.default.createElement(_PrismBlocks.InlineJS, null, "set.body"), " set the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "body"), " to be a Vue component? Then, our render function can use the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "body"), " property of our response object to render our website."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/App.vue -->\n<template>\n  <component :is=\"$curi.response.body\" />\n</template>\n\n<script>\nexport default {\n  name: 'app'\n};\n</script>"), _react.default.createElement("p", null, "We'll expand on that later on, but for now, let's go ahead and define the components for each of our routes.")), _react.default.createElement(_Sections.Section, {
    title: "The Route Components",
    id: "route-components"
  }, _react.default.createElement("p", null, "To refresh your memory, we have \"Home\", \"Contact\", \"Book List\", \"Book\", \"Checkout\", and \"Not Found\" pages that we will need to create components for. We can write some barebones components and add some more content later on."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/Home.vue -->\n<template>\n  <div class='home'>\n    Welcome to our book store!\n  </div>\n</template>"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/Contact.vue -->\n<template>\n  <div class='contact'>\n    You can contact us by fax at 1-206-555-0123.\n  </div>\n</template>"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/BookList.vue -->\n<template>\n  <div class='book-list'>\n    Available Books\n  </div>\n</template>"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/Book.vue -->\n<template>\n  <div class='book'>\n    Book\n  </div>\n</template>"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/Checkout.vue -->\n<template>\n  <div class='checkout'>\n    Checkout\n  </div>\n</template>"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/NotFound.vue -->\n<template>\n  <div class='not-found'>\n    Page not found\n  </div>\n</template>"), _react.default.createElement("p", null, "All of these components should be imported in our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "routes.js"), ' ', "and set using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "set.body"), " in their respective", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "match.response"), " functions."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// routes.js\nimport Home from './components/Home';\nimport Contact from './components/Contact';\nimport BookList from './components/BookList';\nimport Book from './components/Book';\nimport Checkout from './components/Checkout';\nimport NotFound from './components/NotFound';\n\nconst routes = [\n  {\n    name: 'Home',\n    path: '',\n    match: {\n      response: ({ set }) => {\n        set.body(Home);\n      }\n    }\n  },\n  {\n    name: 'Contact',\n    path: 'contact',\n    match: {\n      response: ({ set }) => {\n        set.body(Contact);\n      }\n    }\n  },\n  {\n    name: 'Checkout',\n    path: 'checkout',\n    match: {\n      response: ({ set }) => {\n        set.body(Checkout);\n      }\n    }\n  },\n  {\n    name: 'Book List',\n    path: 'books',\n    match: {\n      response: ({ set }) => {\n        set.body(BookList);\n      }\n    },\n    children: [\n      {\n        name: 'Book',\n        path: ':id',\n        match: {\n          response: ({ set }) => {\n            set.body(Book);\n          }\n        }\n      }\n    ]\n  },\n  {\n    name: 'Not Found',\n    path: '(.*)',\n    match: {\n      response: ({ set }) => {\n        set.body(NotFound);\n      }\n    }\n  }\n];\n\nexport default routes;"), _react.default.createElement("p", null, "Now, if we load up our application, we will render our home page. Unfortunately, there is no way to navigate to any of our other pages. We will need to add some ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"), "s to our application.")), _react.default.createElement(_Sections.Section, {
    title: "A Navigation Menu",
    id: "nav-menu"
  }, _react.default.createElement("p", null, "We can write a simple ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "NavLinks"), " menu component to add navigation to our application. From this menu, we only need to be able to navigate to our \"Home\", \"Contact\", \"Book List\", and \"Checkout\" routes. Navigation to individual books will be done from the book list page."), _react.default.createElement("p", null, "We will use a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "nav"), " element as the parent for our", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "NavLinks"), ". Inside of that is a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "ul"), " and then each of our routes will be ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), "s wrapped in ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "li"), "s."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/NavLinks.vue -->\n<template>\n  <nav>\n    <ul>\n      <li>\n        <curi-link to='Home'>Home</curi-link>\n      </li>\n      <li>\n        <curi-link to='Contact'>Contact Us</curi-link>\n      </li>\n      <li>\n        <curi-link to='Book List'>Books for Sale</curi-link>\n      </li>\n      <li>\n        <curi-link to='Checkout'>Checkout</curi-link>\n      </li>\n    </ul>\n  </nav>\n</template>"), _react.default.createElement("p", null, "Let's import and render that the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "NavLinks"), " in our", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "app"), ". We'll also add some wrapper elements to keep our content organized."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/App.vue -->\n<template>\n  <div>\n    <header>\n      <NavLinks />\n    </header>\n    <main>\n      <component :is=\"$curi.response.body\" />\n    </main>\n  </div>\n</template>\n\n<script>\n  import NavLinks from './NavLinks';\n\n  export default {\n    name: 'app',\n    components: { NavLinks }\n  };\n</script>"), _react.default.createElement("p", null, "At this point, we can navigate between most of our routes. However, we still need to add navigation to our books.")), _react.default.createElement(_Sections.Section, {
    title: "Navigating to Our Books",
    id: "param-navigation"
  }, _react.default.createElement("p", null, "Our \"Book\" route is different than all of our other routes because the book path includes an ", _react.default.createElement(_PrismBlocks.InlineJS, null, "id"), " param. This means that we need to actually have \"id\" values to pass to our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"), "s. Later on, we'll generate some better data, but for now we can just generate a placeholder list in a module called ", _react.default.createElement(_PrismBlocks.InlineJS, null, "books.js"), "."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, " // books.js\nconst books = [\n  { id: 0 },\n  { id: 1 },\n  { id: 2 },\n  { id: 3 }\n];\nexport default books;"), _react.default.createElement("p", null, "Then, in ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "BookList"), " we can iterate over this list to generate links to our books."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/BookList.vue -->\n<template>\n  <div class='book-list'>\n    <h1>Available Books</h1>\n    <div class='books'>\n      <div v-for=\"book in books\" :key=\"book.id\" class='book-item'>\n        <curi-link to='Book' :params=\"{ id: book.id }\">\n          Book {{book.id}}\n        </curi-link>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\n  import books from '../books';\n  export default {\n    data: function() {\n      return { books };\n    }\n  };\n</script>\n")), _react.default.createElement(_Sections.Section, {
    title: "Book Props",
    id: "book-props"
  }, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"), "s above allow us to navigate to our books, but we don't actually have any information about which book we are supposed to be seeing. It would really help if our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), " was able to access the parsed params so that it can render the information for the correct book."), _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "params"), " object is a property of our response object. We can access the response in our components using", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "this.$curi.response"), ", so we don't actually have to manually pass it as a prop."), _react.default.createElement("p", null, "Next, we just need to update our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), " component to access the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "params"), " object and figure out which book to render content for."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/Book.vue -->\n<template>\n  <div class='book'>\n    Book {{$curi.response.params.id}}\n  </div>\n</template>")), _react.default.createElement(_Sections.Section, {
    title: "Review",
    id: "review"
  }, _react.default.createElement("p", null, "After completing this tutorial, we now have a semi-functional website that renders basic content for each of our pages."), _react.default.createElement(_Branch.CompleteBranch, {
    name: "07-loading-data-vue"
  }), _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi-tutorial/tree/07-loading-data-vue"
  })), _react.default.createElement(_Sections.Section, {
    title: "Next",
    id: "next"
  }, _react.default.createElement("p", null, "At this point, we have a website with a number of pages. It isn't particularly useful yet, but at least we can navigate between pages. Next we will take a step back from Vue and look at how we can implement data loading with with", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '07-loading-data'
    }
  }, "Part 7: Loading Data"), ".")));
};

exports.default = _default;

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BaseTutorial = _interopRequireDefault(__webpack_require__(58));

var _Branch = __webpack_require__(59);

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(13);

var _Sections = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement(_BaseTutorial.default, null, _react.default.createElement("h1", null, "Part 7: Loading Data"), _react.default.createElement("p", null, "In the previous tutorial, we wrote mocked book data in ", _react.default.createElement(_PrismBlocks.InlineJS, null, "books.js"), ' ', "to have some data to load, but it was just filler. We imported the data as an array, whereas in a \"real\" website, we would most likely make a request to our server which would return our data."), _react.default.createElement("div", null, _react.default.createElement("p", null, "In this tutorial, we will be doing the following:"), _react.default.createElement("ul", null, _react.default.createElement("li", null, "Writing a fake API to simulate data requests."), _react.default.createElement("li", null, "Adding ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match.every"), " functions to our \"Book List\" and \"Book\" routes and updating their ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match.response"), " functions."))), _react.default.createElement(_Branch.TutorialBranches, {
    names: ['07-loading-data-react', '07-loading-data-vue']
  }), _react.default.createElement(_Sections.Section, {
    title: "Fake API",
    id: "api"
  }, _react.default.createElement("p", null, "There are a number of ways that we might make a request to the server, but in this tutorial we will simulate using the", ' ', _react.default.createElement("a", {
    href: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
  }, "Fetch API"), ". The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "fetch"), " function makes a request to the server and returns a Promise that will resolve with the server's response."), _react.default.createElement("p", null, "Let's create an ", _react.default.createElement(_PrismBlocks.InlineJS, null, "api"), " directory and start writing our fake fetch functions."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "mkdir -p src/api\ntouch src/api/books.js"), _react.default.createElement("p", null, "We'll need to write two functions. The first will fetch all of our books and the second will fetch a specific book given an ", _react.default.createElement(_PrismBlocks.InlineJS, null, "id"), ". Since we are emulating how ", _react.default.createElement(_PrismBlocks.InlineJS, null, "fetch"), " works, both of our functions should return a Promise."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// api/books.js\nexport function fetchAllBooks() {\n  return new Promise((resolve, reject) => {\n\n  });\n}\n\nexport function fetchBook(id) {\n  return new Promise((resolve, reject) => {\n  \n  });\n}"), _react.default.createElement("p", null, "We need some actual data for our fetch functions to return, so let's write an array of book objects. You can make up your own data or just copy the list from below."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// api/books.js\nconst books = [\n  {\n    id: 0,\n    title: 'Harry Potter and the Deathly Hollows',\n    author: 'J.K. Rowling',\n    published: '2007',\n    pages: 759\n  },\n  {\n    id: 1,\n    title: 'The Name of the Wind',\n    author: 'Patrick Rothfuss',\n    published: '2007',\n    pages: 662\n  },\n  {\n    id: 2,\n    title: \"The Wise Man's Fear\",\n    author: 'Patrick Rothfuss',\n    published: '2011',\n    pages: 994\n  },\n  {\n    id: 3,\n    title: 'The Way of Kings',\n    author: 'Brandon Sanderson',\n    published: '2010',\n    pages: 1007\n  },\n  {\n    id: 4,\n    title: 'A Storm of Swords',\n    author: 'George R.R. Martin',\n    published: '2003',\n    pages: 1177\n  },\n  {\n    id: 5,\n    title: 'Clockwork Princess',\n    author: 'Cassandra Clare',\n    published: '2013',\n    pages: 567\n  },\n  {\n    id: 6,\n    title: 'Words of Radiance',\n    author: 'Brandon Sanderson',\n    published: '2014',\n    pages: 1087\n  },\n  {\n    id: 7,\n    title: 'Collected Fictions',\n    author: 'Jorge Luis Borges',\n    published: '1999',\n    pages: 565\n  },\n  {\n    id: 8,\n    title: 'Heir of Fire',\n    author: 'Sarah J. Maas',\n    published: '2014',\n    pages: 565\n  },\n  {\n    id: 9,\n    title: 'The House of Hades',\n    author: 'Rick Riordan',\n    published: '2013',\n    pages: 597\n  }\n];"), _react.default.createElement("p", null, "With this data, we can now finish our data fetching functions. Our", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "fetchAllBooks"), " function should just resolve with the books array. ", _react.default.createElement(_PrismBlocks.InlineJS, null, "fetchBook"), " should search the books array for the book with the requested id. If it finds a matching book object, the function should resolve with that book object. If the requested book is not found, it should reject with an error message."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// api/books.js\nconst books = [...];\n\nexport function fetchAllBooks() {\n  return new Promise((resolve, reject) => {\n    resolve(books);\n  });\n}\n\nexport function fetchBook(id) {\n  return new Promise((resolve, reject) => {\n    const book = books.find(book => book.id === id);\n    if (book) {\n      resolve(book);\n    } else {\n      reject(`Could not find the requested book: ${id}`);\n    }\n  });\n}")), _react.default.createElement(_Sections.Section, {
    title: "match",
    id: "match"
  }, _react.default.createElement("p", null, "Do you remember before when we said that Curi is an asynchronous router? Now is the time that we finally will see why. We have already added", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "match"), " properties to each of our route objects, but", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "match.response"), " is a synchronous function.", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "match.every"), ", on the other hand, is an asynchronous function."), _react.default.createElement(_Sections.Subsection, {
    title: "every",
    id: "every"
  }, _react.default.createElement("p", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "match.every"), " is a function that can perform data loading related to a route prior to emitting a response. The function will be passed route related props (the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "params"), " object, the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "location"), ", and the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "name"), " of the matched route), which it can use to formulate any API calls. Each time that a route matches, its ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match.every"), " function will be called."), _react.default.createElement("p", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "match.every"), " functions are expected to return a Promise. Curi uses ", _react.default.createElement(_PrismBlocks.InlineJS, null, "Promise.all"), " to wait for your", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "match.every"), " and", ' ', _react.default.createElement(_react2.Link, {
    to: "Guide",
    params: {
      slug: 'routes'
    },
    details: {
      hash: 'initial'
    }
  }, _react.default.createElement(_PrismBlocks.InlineJS, null, "match.initial"), " functions"), ' ', "to resolve before it emits a response. Technically speaking, these functions don't have to return a Promise, but it is recommended."), _react.default.createElement("p", null, "We have two routes that we need to load data in: \"Book List\" and \"Book\". Let's start by adding ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match.every"), " functions to each one, calling their respective API functions that we defined above."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// routes.js\nimport { fetchAllBooks, fetchBook } from './api/books';\nconst routes = [\n  // ...,\n  {\n    name: 'Book List',\n    path: 'books',\n    match: {\n      every: () => fetchAllBooks(),\n      response: ({ set }) => {\n        set.body(BookList);\n      }\n    },\n    children: [\n      {\n        name: 'Book',\n        path: ':id',\n        params: { id: n => parseInt(n, 10) },\n        match: {\n          every: ({ params }) => fetchBook(params.id),\n          response: ({ set }) => {\n            set.body(Book);\n          }\n        }\n      }\n    ]\n  }\n  // ...\n];"), _react.default.createElement(_Messages.Note, null, "In the above \"Book\" route, we introduce the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "route.params"), ' ', "property. This is an object whose keys are path param names and whose values are functions that will parse the param string to return a new value. For example, the above function takes the input string and returns that string parsed as an integer.")), _react.default.createElement(_Sections.Subsection, {
    title: "response",
    id: "response"
  }, _react.default.createElement("p", null, "While we have already used ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match.response"), ", we have only used the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "set.body"), " function so far. If you need to review them, you can view all of the properties passed to the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " function in the", ' ', _react.default.createElement(_react2.Link, {
    to: "Guide",
    params: {
      slug: 'routes'
    },
    details: {
      hash: 'response'
    }
  }, "All About Routes"), ' ', "guide. We want to attach our loaded data to the response, so we will use ", _react.default.createElement(_PrismBlocks.InlineJS, null, "resolved.every"), " to access the data from our", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "every"), " function and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "set.data"), " to attach the data to the response object. It is also possible that someone might request a book that does not exist, to deal with that, we will use the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "error"), " property and the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "set.error"), " function."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// routes.js\nimport { fetchAllBooks, fetchBook } from './api/books';\nconst routes = [\n// ...,\n{\n  name: 'Book List',\n  path: 'books',\n  match: {\n    every: () => fetchAllBooks(),\n    response: ({ resolved, set }) => {\n      set.body(BookList);\n      set.data({ books: resolved.every });\n    }\n  },\n  children: [\n    {\n      name: 'Book',\n      path: ':id',\n      params: { id: n => parseInt(n, 10) },\n      match: {\n        every: ({ params }) => fetchBook(params.id),\n        response: ({ error, resolved, set }) => {\n          set.body(Book);\n          if (error) {\n            set.error(error);\n          } else {\n            set.data({ book: resolved.every });\n          }\n        }\n      }\n    }\n  ]\n}\n// ...\n];"), _react.default.createElement(_Messages.Note, null, "If you do not catch errors in your ", _react.default.createElement(_PrismBlocks.InlineJS, null, "every"), " function, you still get the opportunity to deal with them using the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "error"), ' ', "property passed to ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match.response"), ". However, if you do not handle the error there, you may end up with unexpected errors in your website.")), _react.default.createElement("p", null, "Now, when a user visits ", _react.default.createElement(_PrismBlocks.InlineJS, null, "/books"), ", the response generated by Curi will look like this:"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "{\n  name: 'Book List',\n  data: {\n    books: [/*...*/]\n  },\n  // ...\n}"), _react.default.createElement("p", null, "Likewise, visiting ", _react.default.createElement(_PrismBlocks.InlineJS, null, "/books/0"), " will generate a response whose", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "data"), " property is a book object."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "{\n  name: 'Book',\n  params: { id: 0 }\n  data: {\n    book: { title: '...', /*...*/ }\n  },\n  // ...\n}")), _react.default.createElement(_Sections.Section, {
    title: "Review",
    id: "review"
  }, _react.default.createElement("p", null, "If you are following the React path:"), _react.default.createElement(_Branch.CompleteBranch, {
    name: "08-render-data-react"
  }), _react.default.createElement("p", null, "If you are following the Vue path:"), _react.default.createElement(_Branch.CompleteBranch, {
    name: "08-render-data-vue"
  })), _react.default.createElement(_Sections.Section, {
    title: "Next",
    id: "next"
  }, _react.default.createElement("p", null, "Now that we are loading data for our routes, we should modify our \"Book List\" and \"Book\" pages to render using this data. Once again, we will break this down for React and Vue users."), _react.default.createElement("p", null, "If you are using React, continue with", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '08-render-data-react'
    }
  }, "Part 8: Rendering Data with React"), "."), _react.default.createElement("p", null, "If you are using Vue, continue with", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '08-render-data-vue'
    }
  }, "Part 8: Rendering Data with Vue"), ".")));
};

exports.default = _default;

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BaseTutorial = _interopRequireDefault(__webpack_require__(58));

var _Branch = __webpack_require__(59);

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(13);

var _Sections = __webpack_require__(12);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement(_BaseTutorial.default, null, _react.default.createElement("h1", null, "Part 8: Rendering Data with React"), _react.default.createElement("p", null, "Now that our responses have ", _react.default.createElement(_PrismBlocks.InlineJS, null, "data"), ", we should update our", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "BookList"), " and ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), " components to use that. Accessing the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "data"), " is really easy because it is a property of our", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " object."), _react.default.createElement("div", null, _react.default.createElement("p", null, "In this tutorial, we will be doing the following:"), _react.default.createElement("ul", null, _react.default.createElement("li", null, "Updating our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "BookList"), " and ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), " components to render using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response.data"), "."))), _react.default.createElement(_Branch.TutorialBranch, {
    name: "08-render-data-react"
  }), _react.default.createElement(_Sections.Section, {
    title: "Using Data with the Book List",
    id: "book-list"
  }, _react.default.createElement("p", null, "Currently, in our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "BookList.js"), " file, we are importing the books from a file. Now, we can remove that import and instead use the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " prop to access our data. Since we also have better data, we can now use each book's title for the link text."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/BookList.js\nconst BookList = ({ response }) => (\n  <div className='book-list'>\n    <h1>Available Books</h1>\n    <div className='books'>\n      { response.data.books.map(b => (\n        <div key={b.id} className='book-item'>\n          <Link to='Book' params={{ id: b.id }}>\n            {b.title}\n          </Link>\n        </div>\n      )) }\n    </div>\n  </div>\n);"), _react.default.createElement(_Messages.Note, null, "If our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "render"), " function (passed to the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "CuriBase"), ") had just passed the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "params"), " instead of the whole", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), ", we would have to modify that function to also pass along the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "data"), ". Since we pass the entire ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), ", we do not have to worry about updating that function.")), _react.default.createElement(_Sections.Section, {
    title: "Using Data with the Book",
    id: "book"
  }, _react.default.createElement("p", null, "We are already using the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " prop in ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), ". Now, instead of using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "params"), ", we will switch to using", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "data"), ". We can also take advantage of the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "data.book"), ' ', "properties to expand on our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), " implementation."), _react.default.createElement("p", null, "We also have a special case that we need to consider: what should we do when there is no matching book? In the sample data, we have books with ids that range from 0-9. What if the user navigates to", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "/books/123"), "? Our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "fetchBook"), " call will reject and", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response.data"), " will be ", _react.default.createElement(_PrismBlocks.InlineJS, null, "undefined"), ". For now, we can just detect when ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response.data"), " is ", _react.default.createElement(_PrismBlocks.InlineJS, null, "undefined"), " and render a simple message stating that the requested book does not exist."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/Book.js\nconst Book = (props) => {\n  const { data } = props.response;\n  if (!data) {\n    return (\n      <div className='book'>\n        The requested book does not exist\n      </div>\n    );\n  }\n  const { book } = data;\n  return (\n    <div className='book'>\n      <h2>{book.title}</h2>\n      <p>By {book.author}</p>\n      <p>Published in {book.published}</p>\n      <p>This book is {book.pages} pages</p>\n    </div>\n  );\n};")), _react.default.createElement("p", null, "Now that we are using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response.data"), " in both the", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "BookList"), " and ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), " components, we can remove the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "books.js"), " file."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "git rm src/books.js"), _react.default.createElement(_Sections.Section, {
    title: "Review",
    id: "review"
  }, _react.default.createElement("p", null, "Our \"Book List\" and \"Book\" pages are now rendered using data from", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response.data"), "."), _react.default.createElement(_Branch.CompleteBranch, {
    name: "09-nav-react"
  }), _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi-tutorial/tree/09-nav-react"
  })), _react.default.createElement(_Sections.Section, {
    title: "Next",
    id: "next"
  }, _react.default.createElement("p", null, "Our book component still isn't complete. We are building a book store after all, so we should really provide the user a way to actually \"buy\" a book. In", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '09-nav-react'
    }
  }, "Part 9: Forms & Navigation"), ", we will add the ability to add books to a shopping cart and \"purchase\" them from our \"Checkout\" route.")));
};

exports.default = _default;

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BaseTutorial = _interopRequireDefault(__webpack_require__(58));

var _Branch = __webpack_require__(59);

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(13);

var _Sections = __webpack_require__(12);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement(_BaseTutorial.default, null, _react.default.createElement("h1", null, "Part 8: Rendering Data with Vue"), _react.default.createElement("p", null, "Now that our responses have ", _react.default.createElement(_PrismBlocks.InlineJS, null, "data"), ", we should update our", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "BookList"), " and ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), " components to use that. Accessing the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "data"), " is really easy because it is a property of our", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " object."), _react.default.createElement("div", null, _react.default.createElement("p", null, "In this tutorial, we will be doing the following:"), _react.default.createElement("ul", null, _react.default.createElement("li", null, "Updating our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "BookList"), " and ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), " components to render using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response.data"), "."))), _react.default.createElement(_Branch.TutorialBranch, {
    name: "08-render-data-vue"
  }), _react.default.createElement(_Sections.Section, {
    title: "Using Data with the Book List",
    id: "book-list"
  }, _react.default.createElement("p", null, "Currently, in our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "BookList.vue"), " file, we are importing the books from a file. Now, we can remove that import and instead use the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " prop to access our data. Since we also have better data, we can now use each book's title for the link text."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/BookList.vue -->\n<template>\n  <div class='book-list'>\n    <h1>Available Books</h1>\n    <div class='books'>\n      <div\n        v-for=\"book in $curi.response.data.books\"\n        :key=\"book.id\"\n        class='book-item'\n      >\n        <curi-link to='Book' :params=\"{ id: book.id }\">\n          {{book.title}}\n        </curi-link>\n      </div>\n    </div>\n  </div>\n</template>")), _react.default.createElement(_Sections.Section, {
    title: "Using Data with the Book",
    id: "book"
  }, _react.default.createElement("p", null, "We are already using the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response"), " prop in ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), ". Now, instead of using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "params"), ", we will switch to using", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "data"), ". We can also take advantage of the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "data.book"), ' ', "properties to expand on our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), " implementation."), _react.default.createElement("p", null, "We also have a special case that we need to consider: what should we do when there is no matching book? In the sample data, we have books with ids that range from 0-9. What if the user navigates to", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "/books/123"), "? Our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "fetchBook"), " call will reject and", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response.data"), " will be ", _react.default.createElement(_PrismBlocks.InlineJS, null, "undefined"), ". For now, we should detect that and render a simple message stating that the requested book does not exist."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/Book.vue -->\n<template>\n  <div v-if=\"$curi.response.error\" class='book'>\n    {{error}}\n  </div>\n  <div v-else class='book'>\n    <h2>{{book.title}}</h2>\n    <p>By {{book.author}}</p>\n    <p>Published in {{book.published}}</p>\n    <p>This book is {{book.pages}} pages</p>\n  </div>\n</template>\n\n<script>\n  export default {\n    computed: {\n      book: function() {\n        const { response } = this.$curi;\n        return !response.error && response.data.book;\n      }\n    }\n  };\n</script>")), _react.default.createElement("p", null, "Now that we are using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response.data"), " in both the", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "BookList"), " and ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), " components, we can remove the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "books.js"), " file."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "git rm src/books.js"), _react.default.createElement(_Sections.Section, {
    title: "Review",
    id: "review"
  }, _react.default.createElement("p", null, "Our \"Book List\" and \"Book\" pages are now rendered using data from", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "response.data"), "."), _react.default.createElement(_Branch.CompleteBranch, {
    name: "09-nav-vue"
  }), _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi-tutorial/tree/09-nav-vue"
  })), _react.default.createElement(_Sections.Section, {
    title: "Next",
    id: "next"
  }, _react.default.createElement("p", null, "Our book component still isn't complete. We are building a book store after all, so we should really provide the user a way to actually \"buy\" a book. In", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '09-nav-vue'
    }
  }, "Part 9: Forms & Navigation"), ", we will add the ability to add books to a shopping cart and \"purchase\" them from our \"Checkout\" route.")));
};

exports.default = _default;

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BaseTutorial = _interopRequireDefault(__webpack_require__(58));

var _Branch = __webpack_require__(59);

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(13);

var _Sections = __webpack_require__(12);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement(_BaseTutorial.default, null, _react.default.createElement("h1", null, "Part 9: Forms & Programmatic Navigation"), _react.default.createElement("p", null, "In this tutorial, we are going to be using another property of our Curi configuration object: ", _react.default.createElement(_PrismBlocks.InlineJS, null, "history"), ". This property is our Hickory history instance. We will use it to perform navigation between pages in our website."), _react.default.createElement("div", null, _react.default.createElement("p", null, "In this tutorial, we will be doing the following:"), _react.default.createElement("ul", null, _react.default.createElement("li", null, "Creating another fake API, this time for getting/setting items in our shopping cart."), _react.default.createElement("li", null, "Adding the ability to add books to the shopping cart from the \"Book\" page."), _react.default.createElement("li", null, "Displaying books in the shopping cart from the \"Checkout\" page and allowing users to \"purchase\" their selected books."), _react.default.createElement("li", null, "Performing programmatic navigation to automatically navigate to another location."))), _react.default.createElement(_Branch.TutorialBranch, {
    name: "09-nav-react"
  }), _react.default.createElement(_Sections.Section, {
    id: "A Little Babel",
    title: "babel"
  }, _react.default.createElement("p", null, "Up until now, we have used stateless functional React components. In this tutorial, we will be using classes (extending", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "React.Component"), "). To help us, we will be taking advantage of some class properties, so we need to install the propert Babel plugin to support this and add it to our Babel configuration."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "bash"
  }, "npm install --save-dev @babel/plugin-proposal-class-properties"), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// .babelrc.js\nmodule.exports = {\n  // ...,\n  plugins: ['@babel/proposal-class-properties']\n};\n")), _react.default.createElement(_Sections.Section, {
    title: "The (Fake) API",
    id: "API"
  }, _react.default.createElement("p", null, "Since we do not have a backend to store the books that a user wants to purchase, we will simulate this using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "localStorage"), ". This will be done by maintaining an object whose keys are book ", _react.default.createElement(_PrismBlocks.InlineJS, null, "id"), "s and whose values is how many of that book should be purchased."), _react.default.createElement("p", null, "Our API should export three methods: the first will get the current state of the shopping cart, the second will update the shopping cart, and the third will reset the shopping cart."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// api/shoppingCart.js\nfunction saveCart(cart) {\n  localStorage.setItem('cart', JSON.stringify(cart));\n}\n\n// read from localStorage and parse the value\nexport function getCart() {\n  let cart = JSON.parse(localStorage.getItem('cart'));\n  // initialize cart if it doesn't already exist\n  if (cart == null) {\n    cart = {};\n    saveCart(cart);\n  }\n  return Promise.resolve(cart);\n}\n\n// add the book and count to the cart\nexport function updateCart(bookID, count) {\n  return getCart()\n    .then(cart => {\n      cart[bookID] = count;\n      saveCart(cart);\n      return cart;\n    });\n}\n\n// reset the cart to an empty object\nexport function resetCart() {\n  const cart = {};\n  saveCart(cart);\n}"), _react.default.createElement(_Messages.Note, null, "We are using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "localStorage"), ", which is synchronous, but our API functions return Promises to simulate having to make these requests to the server."), _react.default.createElement("p", null, "We will need to access this API in two places. Our \"Book\" pages need to use ", _react.default.createElement(_PrismBlocks.InlineJS, null, "updateCart"), " in order to add books to the shopping cart. The \"Checkout\" page need to know which books (and how many of each) are currently in the shopping cart. The page should also clear the cart out after a user has \"purchased\" the book in their shopping cart.")), _react.default.createElement(_Sections.Section, {
    title: "Adding Books to the Shopping Cart",
    id: "add-books"
  }, _react.default.createElement("p", null, "On the \"Book\" page, users should be able to specify how many copies of a book they want to purchase and add those to their shopping cart. We will do this by adding a new component, ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "AddToCart"), "."), _react.default.createElement("p", null, "We can start by creating a component with renders a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "select"), ". Users can buy 1-4 copies of a book (an arbitrary restriction), so we need an ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "option"), " for each possible value. We should also add an", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "onChange"), " handler to update the ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "select"), " when the user changes the value."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/AddToCart.js\nimport React from 'react';\n\nclass AddToCart extends React.Component {\n  state = { count: 1 }\n\n  updateSelect = (event) => {\n    this.setState({ count: parseInt(event.target.value, 10) })\n  }\n\n  render() {\n    return (\n      <form>\n        <select value={this.state.count} onChange={this.updateSelect}>\n          <option value='1'>1</option>\n          <option value='2'>2</option>\n          <option value='3'>3</option>\n          <option value='4'>4</option>\n        </select>\n      </form>    \n    );\n  }\n}\n\nexport default AddToCart;"), _react.default.createElement("p", null, "Next, we need to add a button to add the book to the shopping cart. We're actually going to add two buttons. The first will just add the book/count to the shopping cart. The second will add the book/count to the shopping cart and then redirect to the \"Checkout\" page."), _react.default.createElement("p", null, "How will we redirect? So far, all navigation within the website has been performed using ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), "s. However, sometimes you might want to navigate programmatically. To do this, we can take advantage of our Hickory history object. The history object has ", _react.default.createElement(_PrismBlocks.InlineJS, null, "push"), ",", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "replace"), ", and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "update"), " methods that we can call to trigger navigation. You can read about each of these in the", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/hickory/blob/master/docs/api/Browser.md#methods"
  }, "Hickory documentation"), ". For this tutorial, we will be using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "push"), "."), _react.default.createElement("p", null, "In order to access the configuration object from within our component we will use the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "curious"), " higher order component from", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/react"), ". A component that is wrapped by", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "curious"), " will have the Curi configuration object injected as a prop called ", _react.default.createElement(_PrismBlocks.InlineJS, null, "curi"), ". That means that we can call", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "this.props.curi.history.push"), " (a bit of a mouthful) to automatically redirect to another page."), _react.default.createElement("p", null, "We can also access all of our Curi ", _react.default.createElement(_PrismBlocks.InlineJS, null, "addons"), " from our configuration object, so we will use ", _react.default.createElement(_PrismBlocks.InlineJS, null, "curi.addons.pathname"), " to generate the pathname for the location that we wan to redirect to."), _react.default.createElement("p", null, "When the user clicks either of the buttons, we will want to use the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "updateCart"), " API method to add the book to the shopping cart. The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "AddToCart"), " component doesn't inherently know which book it is for, so we will need to pass it the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "id"), " of the book as a prop when we render it."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/AddToCart.js\nimport React from 'react';\nimport { curious } from '@curi/react';\n\nimport { updateCart } from '../api/shoppingCart';\n\nclass AddToCart extends React.Component {\n\n  state = { count: 1 }\n\n  updateSelect = (event) => {\n    this.setState({ count: parseInt(event.target.value, 10) })\n  }\n\n  addToCart = () => {\n    updateCart(this.props.bookID, this.state.count);\n  }\n\n  addAndCheckout = () => {\n    const { curi, bookID } = this.props;\n    updateCart(bookID, this.state.count)\n      .then(() => {\n        // generate the pathname for the Checkout route and then\n        // navigate to there automatically\n        const pathname = curi.addons.pathname('Checkout');\n        curi.history.push({ pathname });\n      });\n  }\n\n  render() {\n    return (\n      <form>\n        <select value={this.state.count} onChange={this.updateSelect}>\n          <option value='1'>1</option>\n          <option value='2'>2</option>\n          <option value='3'>3</option>\n          <option value='4'>4</option>\n        </select>\n        <button type=\"button\" onClick={this.addToCart}>\n          Add To Cart\n        </button>\n        <button type=\"button\" onClick={this.addAndCheckout}>\n          Add To Cart and Checkout\n        </button>\n      </form>    \n    );\n  }\n}\n\nexport default curious(AddToCart);"), _react.default.createElement("p", null, "Now, we can modify our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), " component to render the", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "AddToCart"), " component. Remember that we need to pass it a", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "bookID"), " prop so that we can know which book to add to the shopping cart."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/Book.js\nimport React from 'react';\n\nimport AddToCart from './AddToCart';\n\nconst Book = (props) => {\n  const { data } = props.response;\n  if (!data) {\n    return (\n      <div className='book'>\n        The requested book does not exist\n      </div>\n    );\n  }\n  const { book } = data;\n  return (\n    <div className='book'>\n      <h2>{book.title}</h2>\n      <p>By {book.author}</p>\n      <p>Published in {book.published}</p>\n      <p>This book is {book.pages} pages</p>\n      <AddToCart bookID={book.id} />\n    </div>\n  );\n};\n\nexport default Book;")), _react.default.createElement(_Sections.Section, {
    title: "The Checkout Page",
    id: "checkout"
  }, _react.default.createElement("p", null, "Now that we can add books to our shopping cart, we also should give the user the ability to buy them. Of course, this isn't a real store website that we are building, so instead of asking for payment and shipping information, we will just redirect the user once they \"purchase\" their books."), _react.default.createElement("p", null, "Let's start out in our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "routes.js"), " file. We want our \"Checkout\" page to know which books are in the shopping cart. We can use the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "match.every"), " function of the \"Checkout\" route to load all of the books and our shopping cart. We can merge the two together to create an array of items in the cart."), _react.default.createElement("p", null, "While we're at it, we should also add one more route to our website. This will be a \"Checkout Complete\" route that we redirect to after a user has \"purchased\" their books."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// routes.js\nimport CheckoutComplete from './components/CheckoutComplete';\n\nimport { getCart } from './api/shoppingCart';\n\nconst routes = [\n  // ...\n  {\n    name: 'Checkout',\n    path: 'checkout',\n    match: {\n      every: () => {\n        return Promise.all([\n          fetchAllBooks(),\n          getCart()\n        ]);\n      },\n      response: ({ resolved, set }) => {\n        set.body(Checkout)\n        \n        /*\n         * We will iterate over all of the items in\n         * our shopping cart and find the matching\n         * book. Then, we combine the book and the\n         * number being purchased into one object.\n         *\n         * We then assign that array of objects as\n         * the \"items\" property of our response's\n         * data object.\n         */ \n        const [ books, cart ] = resolved.every;\n        const items = Object.keys(cart).map(key => {\n          const id = parseInt(key, 10);\n          const count = cart[key];\n          const book = books.find(b => b.id === id);\n          return Object.assign({}, book, { count });\n        });\n        set.data({ items });\n      }\n    },\n    children: [\n      {\n        name: 'Checkout Complete',\n        path: 'complete',\n        match: {\n          response: ({ set }) => {\n            set.body(CheckoutComplete);\n          }\n        }\n      }\n    ]\n  }\n  // ...\n];"), _react.default.createElement("p", null, "Before we update our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Checkout"), " component, let's write the", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "CheckoutComplete"), " component. This should just be a simple component thanking the user for their purchase."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/CheckoutComplete.js\nimport React from 'react';\n\nconst CheckoutComplete = () => (\n  <div className='checkout-complete'>\n    Thanks for your purchase!\n  </div>\n);\n\nexport default CheckoutComplete;"), _react.default.createElement("p", null, "We aren't going to get too fancy with displaying the items in our shopping cart. We can just place them all in a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "table"), " so that they are neatly organized. Then, we will just need to add a button to \"purchase\" the books."), _react.default.createElement("p", null, "We will once again be taking advantage of the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "curious"), " higher order component to access our Curi configuration object from within a component."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// components/Checkout.js\nimport React from 'react';\nimport { curious } from '@curi/react';\n\nimport { resetCart } from '../api/shoppingCart';\n\nclass Checkout extends React.Component {\n\n  purchase = () => {\n    // when the user \"purchases\" their books, we just\n    // reset the cart and redirect to the \"Checkout Complete\" page\n    resetCart();\n    const { curi } = this.props;\n    const pathname = curi.addons.pathname('Checkout Complete');\n    curi.history.push({ pathname });\n  }\n\n  render() {\n    const { response } = this.props;\n    return (\n      <div className='checkout'>\n        <h1>Checkout</h1>\n        <div>\n          <table>\n            <thead>\n              <tr>\n                <td>Book</td>\n                <td>Quantity</td>\n              </tr>\n            </thead>\n            <tbody>\n              {\n                response.data.items.map(book => (\n                  <tr key={book.id}>\n                    <td>{book.title}</td>\n                    <td>{book.count}</td>\n                  </tr>\n                ))\n              }\n            </tbody>\n          </table>\n          <button type='button' onClick={this.purchase}>\n            Purchase Books\n          </button>\n        </div>\n      </div>\n    );\n  }\n}\n\nexport default curious(Checkout);"), _react.default.createElement("p", null, "One last thing to consider about our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Checkout"), " component is what we should display when there are no items in the shopping cart. We can just check our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response.data.items"), " array and display a message stating that the cart is empty when the list's length is zero."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "// component/Checkout.js\nclass Checkout extends React.Component {\n  // ...\n  render() {\n    const { response } = this.props;\n    if (!response.data.items.length) {\n      return (\n        <div className='checkout'>\n          <h1>Checkout</h1>\n          <div>\n            You have not added any items to your shopping cart!\n          </div>\n        </div>\n      )\n    }\n    // ...\n  }\n}")), _react.default.createElement(_Sections.Section, {
    title: "Review",
    id: "review"
  }, _react.default.createElement("p", null, "We can now add books to our shopping cart and \"buy\" them from the checkout page."), _react.default.createElement(_Branch.CompleteBranch, {
    name: "10-now-what-react"
  }), _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi-tutorial/tree/10-now-what-react"
  }), _react.default.createElement(_Messages.Note, null, "The embedded sandbox will not work if your browser is blocking third-party data. If this is the case for you, you ", _react.default.createElement("em", null, "could"), ' ', "disable this through your browser's settings, but a better solution is to click the \"Edit on CodeSandbox\" button to view the sandbox there.")), _react.default.createElement(_Sections.Section, {
    title: "Next",
    id: "next"
  }, _react.default.createElement("p", null, "With that, we have considered pretty much everything you need to know to get started building your website with Curi. We have one last part,", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '10-now-what'
    }
  }, "Part 10: Now What?"), ", that gives some suggestions on what you can do with your new knowledge.")));
};

exports.default = _default;

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BaseTutorial = _interopRequireDefault(__webpack_require__(58));

var _Branch = __webpack_require__(59);

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(13);

var _Sections = __webpack_require__(12);

var _CodeSandboxDemo = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement(_BaseTutorial.default, null, _react.default.createElement("h1", null, "Part 9: Forms & Programmatic Navigation"), _react.default.createElement("p", null, "In this tutorial, we are going to be using another property of our Curi configuration object: ", _react.default.createElement(_PrismBlocks.InlineJS, null, "history"), ". This property is the Hickory history instance. We will use it to perform navigation between pages in our website."), _react.default.createElement("div", null, _react.default.createElement("p", null, "In this tutorial, we will be doing the following:"), _react.default.createElement("ul", null, _react.default.createElement("li", null, "Creating another fake API, this time for getting/setting items in our shopping cart."), _react.default.createElement("li", null, "Adding the ability to add books to the shopping cart from the \"Book\" page."), _react.default.createElement("li", null, "Displaying books in the shopping cart from the \"Checkout\" page and allowing users to \"purchase\" their selected books."), _react.default.createElement("li", null, "Performing programmatic navigation to automatically navigate to another location."))), _react.default.createElement(_Branch.TutorialBranch, {
    name: "09-nav-vue"
  }), _react.default.createElement(_Sections.Section, {
    title: "The (Fake) API",
    id: "API"
  }, _react.default.createElement("p", null, "Since we do not have a backend to store the books that a user wants to purchase, we will simulate this using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "localStorage"), ". This will be done by maintaining an object whose keys are book ", _react.default.createElement(_PrismBlocks.InlineJS, null, "id"), "s and whose values is how many of that book should be purchased."), _react.default.createElement("p", null, "Our API should export three methods: the first will get the current state of the shopping cart, the second will update the shopping cart, and the third will reset the shopping cart."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// api/shoppingCart.js\nfunction saveCart(cart) {\n  localStorage.setItem('cart', JSON.stringify(cart));\n}\n\n// read from localStorage and parse the value\nexport function getCart() {\n  let cart = JSON.parse(localStorage.getItem('cart'));\n  // initialize cart if it doesn't already exist\n  if (cart == null) {\n    cart = {};\n    saveCart(cart);\n  }\n  return Promise.resolve(cart);\n}\n\n// add the book and count to the cart\nexport function updateCart(bookID, count) {\n  return getCart()\n    .then(cart => {\n      cart[bookID] = count;\n      saveCart(cart);\n      return cart;\n    });\n}\n\n// reset the cart to an empty object\nexport function resetCart() {\n  const cart = {};\n  saveCart(cart);\n}"), _react.default.createElement(_Messages.Note, null, "We are using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "localStorage"), ", which is synchronous, but our API functions return Promises to simulate having to make these requests to the server."), _react.default.createElement("p", null, "We will need to access this API in two places. Our \"Book\" pages need to use ", _react.default.createElement(_PrismBlocks.InlineJS, null, "updateCart"), " in order to add books to the shopping cart. The \"Checkout\" page need to know which books (and how many of each) are currently in the shopping cart. The page should also clear the cart out after a user has \"purchased\" the book in their shopping cart.")), _react.default.createElement(_Sections.Section, {
    title: "Adding Books to the Shopping Cart",
    id: "add-books"
  }, _react.default.createElement("p", null, "On the \"Book\" page, users should be able to specify how many copies of a book they want to purchase and add those to their shopping cart. We will do this by adding a new component, ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "AddToCart"), "."), _react.default.createElement("p", null, "We can start by creating a component with renders a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "select"), ". Users can buy 1-4 copies of a book (an arbitrary restriction), so we need an ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "option"), " for each possible value."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/AddToCart.vue -->\n<template>\n  <form>\n    <select v-model=\"count\">\n      <option value=\"1\">1</option>\n      <option value=\"2\">2</option>\n      <option value=\"3\">3</option>\n      <option value=\"4\">4</option>\n    </select>\n  </form>\n</template>\n\n<script>\n  export default {\n    data: function() {\n      return {\n        count: '1'\n      };\n    }\n  };\n</script>\n"), _react.default.createElement("p", null, "Next, we need to add a button to add the book to the shopping cart. We're actually going to add two buttons. The first will just add the book/count to the shopping cart. The second will add the book/count to the shopping cart and then redirect to the \"Checkout\" page."), _react.default.createElement("p", null, "How will we redirect? So far, all navigation within the website has been performed using ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"), "s. However, sometimes you might want to navigate programmatically. To do this, we can take advantage of our Hickory history object. The history object has ", _react.default.createElement(_PrismBlocks.InlineJS, null, "push"), ",", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "replace"), ", and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "update"), " methods that we can call to trigger navigation. You can read about each of these in the", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/hickory/blob/master/docs/api/Browser.md#methods"
  }, "Hickory documentation"), ". For this tutorial, we will be using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "push"), "."), _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "CuriPlugin"), " makes our configuration object available to all of our components as ", _react.default.createElement(_PrismBlocks.InlineJS, null, "this.$curi"), ". That means that we can call ", _react.default.createElement(_PrismBlocks.InlineJS, null, "this.$curi.config.history.push"), " (a bit of a mouthful) to automatically redirect to another page."), _react.default.createElement("p", null, "We can also access all of our Curi ", _react.default.createElement(_PrismBlocks.InlineJS, null, "addons"), " from our configuration object, so we will use ", _react.default.createElement(_PrismBlocks.InlineJS, null, "curi.addons.pathname"), " to generate the pathname for the location that we wan to redirect to."), _react.default.createElement("p", null, "When the user clicks either of the buttons, we will want to use the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "updateCart"), " API method to add the book to the shopping cart. The ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "AddToCart"), " component doesn't inherently know which book it is for, so we will need to pass it the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "id"), " of the book as a prop when we render it."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/AddToCart.vue -->\n<template>\n  <form>\n    <select v-model=\"count\">\n      <option value=\"1\">1</option>\n      <option value=\"2\">2</option>\n      <option value=\"3\">3</option>\n      <option value=\"4\">4</option>\n    </select>\n    <button type=\"button\" v-on:click=\"addToCart\">Add To Cart</button>\n    <button type=\"button\" v-on:click=\"addAndCheckout\">Add To Cart and Checkout</button>\n  </form>\n</template>\n\n<script>\n  import { updateCart } from '../api/shoppingCart';\n\n  export default {\n    props: ['bookID'],\n    data: function() {\n      return {\n        count: '1'\n      };\n    },\n    methods: {\n      addToCart(event) {\n        updateCart(this.bookID, parseInt(this.count));\n      },\n      addAndCheckout(event) {\n        updateCart(this.bookID, parseInt(this.count))\n          .then(() => {\n            const pathname = this.$curi.config.addons.pathname('Checkout');\n            this.$curi.config.history.push({ pathname });\n          });\n      }\n    }\n  };\n</script>\n"), _react.default.createElement("p", null, "Now, we can modify our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Book"), " component to render the", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "AddToCart"), " component. Remember that we need to pass it a", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "bookID"), " prop so that we can know which book to add to the shopping cart."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/Book.vue -->\n<template>\n  <div v-if=\"$curi.response.error\" class='book'>\n    {{error}}\n  </div>\n  <div v-else class='book'>\n    <h2>{{book.title}}</h2>\n    <p>By {{book.author}}</p>\n    <p>Published in {{book.published}}</p>\n    <p>This book is {{book.pages}} pages</p>\n    <AddToCart :bookID=\"book.id\" />\n  </div>\n</template>\n\n<script>\n  import AddToCart from './AddToCart';\n\n  export default {\n    computed: {\n      book: function() {\n        const { response } = this.$curi;\n        return !response.error && response.data.book;\n      }\n    },\n    components: { AddToCart }\n  };\n</script>")), _react.default.createElement(_Sections.Section, {
    title: "The Checkout Page",
    id: "checkout"
  }, _react.default.createElement("p", null, "Now that we can add books to our shopping cart, we also should give the user the ability to buy them. Of course, this isn't a real store website that we are building, so instead of asking for payment and shipping information, we will just redirect the user once they \"purchase\" their books."), _react.default.createElement("p", null, "Let's start out in our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "routes.js"), " file. We want our \"Checkout\" page to know which books are in the shopping cart. We can use the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "match.every"), " function of the \"Checkout\" route to load all of the books and our shopping cart. We can merge the two together to create an array of items in the cart."), _react.default.createElement("p", null, "While we're at it, we should also add one more route to our website. This will be a \"Checkout Complete\" route that we redirect to after a user has \"purchased\" their books."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// routes.js\nimport CheckoutComplete from './components/CheckoutComplete';\n\nimport { getCart } from './api/shoppingCart';\n\nconst routes = [\n  // ...\n  {\n    name: 'Checkout',\n    path: 'checkout',\n    match: {\n      every: () => {\n        return Promise.all([\n          fetchAllBooks(),\n          getCart()\n        ])\n      },\n      response: ({ resolved, set }) => {\n        set.body(Checkout);\n\n        /*\n         * We will iterate over all of the items in\n         * our shopping cart and find the matching\n         * book. Then, we combine the book and the\n         * number being purchased into one object.\n         *\n         * We then assign that array of objects as\n         * the \"items\" property of our response's\n         * data object.\n         */ \n        const [ books, cart ] = resolved.every;\n        const items = Object.keys(cart).map(key => {\n          const id = parseInt(key, 10);\n          const count = cart[key];\n          const book = books.find(b => b.id === id);\n          return Object.assign({}, book, { count });\n        });\n        set.data({ items });\n      }\n    },\n    children: [\n      {\n        name: 'Checkout Complete',\n        path: 'complete',\n        match: {\n          response: ({ set }) => {\n            set.body(CheckoutComplete);\n          }\n        }\n      }\n    ]\n  }\n  // ...\n];"), _react.default.createElement("p", null, "Before we update our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Checkout"), " component, let's write the", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "CheckoutComplete"), " component. This should just be a simple component thanking the user for their purchase."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/CheckoutComplete.vue -->\n<template>\n  <div className='checkout-complete'>\n    Thanks for your purchase!\n  </div>\n</template>"), _react.default.createElement("p", null, "We aren't going to get too fancy with displaying the items in our shopping cart. We can just place them all in a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "table"), " so that they are neatly organized. Then, we will just need to add a button to \"purchase\" the books."), _react.default.createElement("p", null, "We will once again be taking advantage of ", _react.default.createElement(_PrismBlocks.InlineJS, null, "this.$curi"), " to access our Curi configuration object from within a component."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- components/Checkout.vue -->\n<template>\n  <div class='checkout'>\n    <h1>Checkout</h1>\n    <div>\n      <table>\n        <thead>\n          <tr>\n            <td>Book</td>\n            <td>Quantity</td>\n          </tr>\n        </thead>\n        <tbody>\n          <tr v-for=\"book in $curi.response.data.items\" :key=\"book.id\">\n            <td>{{book.title}}</td>\n            <td>{{book.count}}</td>\n          </tr>\n        </tbody>\n      </table>\n      <button type='button' v-on:click=\"purchase\">\n        Purchase Books\n      </button>\n    </div>\n  </div>\n</template>\n\n<script>\n  import { resetCart } from '../api/shoppingCart';\n\n  export default {\n    methods: {\n      purchase: function(event) {\n        // when the user \"purchases\" their books, we just\n        // reset the cart and redirect to the \"Checkout Complete\" page\n        resetCart();\n        const pathname = this.$curi.config.addons.pathname('Checkout Complete');\n        this.$curi.config.history.push({ pathname });\n      }\n    }\n  };\n</script>"), _react.default.createElement("p", null, "One last thing to consider about our ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Checkout"), " component is what we should display when there are no items in the shopping cart. We can just check our ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response.data.items"), " array and display a message stating that the cart is empty when the list's length is zero."), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- component/Checkout.vue -->\n<template>\n  <div class='checkout'>\n    <h1>Checkout</h1>\n    <div v-if=\"$curi.response.data.items.length\">\n      <table>\n        <thead>\n          <tr>\n            <td>Book</td>\n            <td>Quantity</td>\n          </tr>\n        </thead>\n        <tbody>\n          <tr v-for=\"book in response.data.items\" :key=\"book.id\">\n            <td>{{book.title}}</td>\n            <td>{{book.count}}</td>\n          </tr>\n        </tbody>\n      </table>\n      <button type='button' v-on:click=\"purchase\">\n        Purchase Books\n      </button>\n    </div>\n    <div v-else>\n      You have not added any items to your shopping cart!\n    </div>\n  </div>\n</template>")), _react.default.createElement(_Sections.Section, {
    title: "Review",
    id: "review"
  }, _react.default.createElement("p", null, "We can now add books to our shopping cart and \"buy\" them from the checkout page."), _react.default.createElement(_Branch.CompleteBranch, {
    name: "10-now-what-vue"
  }), _react.default.createElement(_CodeSandboxDemo.default, {
    id: "github/pshrmn/curi-tutorial/tree/10-now-what-vue"
  }), _react.default.createElement(_Messages.Note, null, "The embedded sandbox will not work if your browser is blocking third-party data. If this is the case for you, you ", _react.default.createElement("em", null, "could"), ' ', "disable this through your browser's settings, but a better solution is to click the \"Edit on CodeSandbox\" button to view the sandbox there.")), _react.default.createElement(_Sections.Section, {
    title: "Next",
    id: "next"
  }, _react.default.createElement("p", null, "With that, we have considered pretty much everything you need to know to get started building your website with Curi. We have one last part,", ' ', _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '10-now-what'
    }
  }, "Part 10: Now What?"), ", that gives some suggestions on what you can do with your new knowledge.")));
};

exports.default = _default;

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _BaseTutorial = _interopRequireDefault(__webpack_require__(58));

var _PrismBlocks = __webpack_require__(2);

var _Messages = __webpack_require__(13);

var _Sections = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement(_BaseTutorial.default, null, _react.default.createElement("h1", null, "Part 10: Now What?"), _react.default.createElement("p", null, "This is the end. You have completed all of the parts of the tutorial and have built a website powered by Curi. It isn't a complete site, but it works, and hopefully you learned a lot while we built it."), _react.default.createElement("p", null, "Thanks for following along! If you have any questions or comments, you can reach out to me on Twitter", ' ', _react.default.createElement("a", {
    href: "https://twitter.com/pshrmn"
  }, "@pshrmn"), ". Any feedback is appreciated!"), _react.default.createElement("p", null, "Now, you may be wondering what else to do. My first suggestion would be to build your own website! The tutorial went through everything you need to know to get started building a site with Curi, so why not build your own?"), _react.default.createElement("p", null, "If you are looking to learn/build more, you can also try some of the suggestions listed below."), _react.default.createElement("ol", null, _react.default.createElement("li", null, "The current home page is quite boring. You could add a \"featured\" book to it using the \"Home\" route's ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match.response"), " function to attach a random book to the response."), _react.default.createElement("li", null, "Similar to the previous suggestion, the contact page could use some work as well. Perhaps you could add some child routes for different methods of contact."), _react.default.createElement("li", null, "You can try using a Curi", ' ', _react.default.createElement(_react2.Link, {
    to: "Guide",
    params: {
      slug: 'side-effects'
    }
  }, "side effect"), ' ', "with the website. You could use", ' ', _react.default.createElement(_react2.Link, {
    to: "Package",
    params: {
      package: 'side-effect-title'
    }
  }, _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/side-effect-title")), ' ', "and the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "route.title"), " property to update the title whenever you navigate."), _react.default.createElement("li", null, "If you're concerned about the bundle size, you could check out the", ' ', _react.default.createElement(_react2.Link, {
    to: "Guide",
    params: {
      slug: 'code-splitting'
    }
  }, "code splitting guide"), ' ', "and break up the bundle using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "route.match.initial"), "."), _react.default.createElement("li", null, "While we used ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response.data"), " to pass data to our components, you might prefer a global store like Redux or Vuex. You could rewrite the application to use these, ", _react.default.createElement(_PrismBlocks.InlineJS, null, "response.data"), " is a convenience, not a requirement. You can even continue to use", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "match.response"), " with a global store. Instead of calling", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "set.data"), ", you could just dispatch the data to your store. You can check out the", ' ', _react.default.createElement(_react2.Link, {
    to: "Example",
    params: {
      category: 'react',
      slug: 'redux'
    }
  }, "Redux example"), ' ', "to see how this might be implemented."), _react.default.createElement("li", null, "You can explore the other response methods available in", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "match.response"), ". For example, you could use the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "redirect"), " function to automatically redirect when the user attempt to navigate to a \"Book\" page that doesn't exist (e.g. there is no book whose ", _react.default.createElement(_PrismBlocks.InlineJS, null, "id"), " equals ", _react.default.createElement(_PrismBlocks.InlineJS, null, "params.id"), ")."), _react.default.createElement("li", null, "We only had ten books in our data, but what if there were hundreds? You could implement pagination on the \"Book List\" page. Query params could be included in the location to only display certain books. If you're feeling adventurous, you could pass a", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/hickory/blob/master/docs/api/Browser.md#options"
  }, _react.default.createElement(_PrismBlocks.InlineJS, null, "query"), " object"), ' ', "to your history object to use query objects instead of strings."), _react.default.createElement("li", null, "You can read through the", ' ', _react.default.createElement(_react2.Link, {
    to: "Guide",
    params: {
      slug: 'getting-started'
    }
  }, "guides"), ", browse the ", _react.default.createElement(_react2.Link, {
    to: "Examples"
  }, "examples"), ", and check out the available Curi ", _react.default.createElement(_react2.Link, {
    to: "Packages"
  }, "packages"), ". This tutorial covered what you need to know to get started, but there is plenty more you can dive into for advanced usage.")));
};

exports.default = _default;

/***/ })

});