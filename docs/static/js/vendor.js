/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".js/bundle.js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 75);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_curi_react_navigator__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_curi_react_link__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_curi_react_redirect__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_curi_react_block__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_curi_react_curious__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_curi_react_active__ = __webpack_require__(32);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Navigator", function() { return __WEBPACK_IMPORTED_MODULE_0_curi_react_navigator__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return __WEBPACK_IMPORTED_MODULE_1_curi_react_link__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return __WEBPACK_IMPORTED_MODULE_2_curi_react_redirect__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Block", function() { return __WEBPACK_IMPORTED_MODULE_3_curi_react_block__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curious", function() { return __WEBPACK_IMPORTED_MODULE_4_curi_react_curious__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Active", function() { return __WEBPACK_IMPORTED_MODULE_5_curi_react_active__["a"]; });












/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(25)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(27)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PrismCode = __webpack_require__(39);

Object.defineProperty(exports, "PrismCode", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PrismCode).default;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PrismCode).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Browser", function() { return Browser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InMemory", function() { return InMemory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hash", function() { return Hash; });
function subscriptionCoordinator() {
  var subscribers = [];

  function subscribe(fn) {
    if (typeof fn !== 'function') {
      throw new Error('The argument passed to subscribe must be a function');
    }
    // 
    var index = subscribers.push(fn) - 1;
    return function () {
      subscribers[index] = null;
    };
  }

  function emit(location, action) {
    subscribers.forEach(function (fn) {
      if (fn !== null) {
        fn(location, action);
      }
    });
  }

  function removeAllSubscribers() {
    subscribers = [];
  }

  return {
    subscribe: subscribe,
    emit: emit,
    removeAllSubscribers: removeAllSubscribers
  };
}

function ensureBeginsWith(str, prefix) {
  if (!str) {
    return '';
  }
  return str.indexOf(prefix) === 0 ? str : prefix + str;
}

function completePathname(pathname) {
  return ensureBeginsWith(pathname, '/');
}

function completeHash(hash) {
  return ensureBeginsWith(hash, '#');
}

function completeQuery(query) {
  return ensureBeginsWith(query, '?');
}

function stripPrefix(str, prefix) {
  return str.indexOf(prefix) === 0 ? str.slice(prefix.length) : str;
}

function hasBaseSegment(path, prefix) {
  return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
}

function stripBaseSegment(path, prefix) {
  return hasBaseSegment(path, prefix) ? path.substr(prefix.length) : path;
}

/*
 * This is similar to Facebook's warning, but flips the
 * condition so that we warn when the value is true. Warning
 * here are just used for developers, so this will be a no-op
 * in production. It also skips a bunch of the checks that warning
 * uses.
 */

function warn() {}

{
  warn = function warn(condition) {
    if (condition) {
      var _console;

      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      (_console = console).warn.apply(_console, rest);
    }
  };
}

var warn$1 = warn;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};





















var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function defaultParseQuery(query) {
  return query ? query : '';
}

function defaultStringifyQuery(query) {
  return query ? query : '';
}

function isValidBase(baseSegment) {
  return typeof baseSegment === 'string' && baseSegment.charAt(0) === '/' && baseSegment.charAt(baseSegment.length - 1) !== '/';
}

function validateQueryOption(query) {
  var parse = void 0,
      stringify = void 0;
  if (!query) {
    parse = defaultParseQuery;
    stringify = defaultStringifyQuery;
  } else {
    var _completeQuery = true;
    if (typeof query.parse !== 'function') {
      warn$1(true, 'The query option must contain a parse function property');
      _completeQuery = false;
    }
    if (typeof query.stringify !== 'function') {
      warn$1(true, 'The query option must contain a stringify function property');
      _completeQuery = false;
    }

    if (_completeQuery) {
      parse = query.parse;
      stringify = query.stringify;
    } else {
      // when either property is invalid, we use the defaults for both
      parse = defaultParseQuery;
      stringify = defaultStringifyQuery;
    }
  }

  return {
    parse: parse,
    stringify: stringify
  };
}

function locationFactory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var query = options.query,
      _options$decode = options.decode,
      decode = _options$decode === undefined ? true : _options$decode,
      _options$baseSegment = options.baseSegment,
      baseSegment = _options$baseSegment === undefined ? '' : _options$baseSegment;

  var _validateQueryOption = validateQueryOption(query),
      parse = _validateQueryOption.parse,
      stringify = _validateQueryOption.stringify;

  if (baseSegment !== '' && !isValidBase(baseSegment)) {
    throw new Error('The baseSegment "' + baseSegment + '" is not valid.' + ' The baseSegment must begin with a forward slash and end with a' + ' non-forward slash character.');
  }

  function parsePath(value) {
    var location = {};

    // hash is always after query, so split it off first
    var hashIndex = value.indexOf('#');
    if (hashIndex !== -1) {
      location.hash = value.substring(hashIndex + 1);
      value = value.substring(0, hashIndex);
    } else {
      location.hash = '';
    }

    var queryIndex = value.indexOf('?');
    if (queryIndex !== -1) {
      location.query = parse(value.substring(queryIndex + 1));
      value = value.substring(0, queryIndex);
    } else {
      location.query = parse();
    }

    location.pathname = stripBaseSegment(value, baseSegment);

    return location;
  }

  function createLocation(value, key) {
    var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var location = void 0;
    if (typeof value === 'string') {
      location = parsePath(value);
    } else {
      location = _extends({}, value);
      if (location.hash == null) {
        location.hash = '';
      }
      if (location.query == null) {
        location.query = parse();
      }
      if (location.pathname == null) {
        location.pathname = '/';
      }
    }
    location.key = key;
    // don't set state if it already exists
    if (state && !location.state) {
      location.state = state;
    }

    // it can be more convenient to interact with the decoded pathname,
    // but leave the option for using the encoded value
    if (decode) {
      try {
        location.pathname = decodeURI(location.pathname);
      } catch (e) {
        throw e instanceof URIError ? new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is most likely due to a bad percent-encoding. For more information, ' + 'see the third paragraph here https://tools.ietf.org/html/rfc3986#section-2.4') : e;
      }
    }
    return location;
  }

  function createPath(location) {
    var _location$pathname = location.pathname,
        pathname = _location$pathname === undefined ? '' : _location$pathname,
        query = location.query,
        _location$hash = location.hash,
        hash = _location$hash === undefined ? '' : _location$hash;
    // ensure that pathname begins with a forward slash, query begins
    // with a question mark, and hash begins with a pound sign

    return baseSegment + completePathname(pathname) + completeQuery(stringify(query)) + completeHash(hash);
  }

  return {
    createLocation: createLocation,
    createPath: createPath
  };
}

function createKeyGenerator(initial) {
  var id = initial || 0;
  var current = void 0;

  function parse(key) {
    return key.split('.').map(function (value) {
      return parseInt(value, 10);
    });
  }

  return {
    major: function major(previous) {
      if (previous) {
        var _parse = parse(previous),
            _parse2 = slicedToArray(_parse, 1),
            major = _parse2[0];

        id = major + 1;
      }
      return id++ + '.0';
    },
    minor: function minor(current) {
      var _parse3 = parse(current),
          _parse4 = slicedToArray(_parse3, 2),
          major = _parse4[0],
          minor = _parse4[1];

      return major + '.' + (minor + 1);
    },
    diff: function diff(first, second) {
      var _parse5 = parse(first),
          _parse6 = slicedToArray(_parse5, 1),
          firstMajor = _parse6[0];

      var _parse7 = parse(second),
          _parse8 = slicedToArray(_parse7, 1),
          secondMajor = _parse8[0];

      return secondMajor - firstMajor;
    }
  };
}

function noop() {}

function createNavigationConfirmation() {

  var confirmFunction = void 0;

  function confirmNavigation(info, confirm) {
    var prevent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

    if (!confirmFunction) {
      confirm();
    } else {
      confirmFunction(info, confirm, prevent);
    }
  }

  function confirmWith(fn) {
    if (typeof fn !== 'function') {
      return;
    }
    confirmFunction = fn;
  }

  function removeConfirmation() {
    confirmFunction = null;
  }

  return {
    confirmNavigation: confirmNavigation,
    confirmWith: confirmWith,
    removeConfirmation: removeConfirmation
  };
}

var createCommonHistory = function (options) {
  return _extends({}, subscriptionCoordinator(), locationFactory(options), createNavigationConfirmation(), { keygen: createKeyGenerator() });
};

function eventCoordinator(events) {

  for (var event in events) {
    var fn = events[event];
    if (fn) {
      window.addEventListener(event, fn, false);
    }
  }

  return function destroyEvents() {
    for (var _event in events) {
      var _fn = events[_event];
      if (_fn) {
        window.removeEventListener(_event, _fn, false);
      }
    }
  };
}

function domExists() {
  return window && window.location;
}

/*
 * Ignore popstate events that don't define event.state
 * unless they come from Chrome on iOS (because it emits
 * events where event.state is undefined when you click
 * the back button)
 */
function ignorablePopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

/*
 * IE 11 might throw, so just catch and return empty object when that happens
 */
function getStateFromHistory() {
  try {
    return window.history.state || {};
  } catch (e) {
    return {};
  }
}

function Browser() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!domExists()) {
    return;
  }

  var _createCommonHistory = createCommonHistory(options),
      subscribe = _createCommonHistory.subscribe,
      emit = _createCommonHistory.emit,
      removeAllSubscribers = _createCommonHistory.removeAllSubscribers,
      createLocation = _createCommonHistory.createLocation,
      createPath = _createCommonHistory.createPath,
      confirmNavigation = _createCommonHistory.confirmNavigation,
      confirmWith = _createCommonHistory.confirmWith,
      removeConfirmation = _createCommonHistory.removeConfirmation,
      keygen = _createCommonHistory.keygen;

  var beforeDestroy = [removeAllSubscribers];

  // when true, pop will run without attempting to get user confirmation
  var reverting = false;

  function locationFromBrowser(providedState) {
    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;

    var path = pathname + search + hash;

    var _ref = providedState || getStateFromHistory(),
        key = _ref.key,
        state = _ref.state;

    if (!key) {
      key = keygen.major();
      window.history.replaceState({ key: key, state: state }, '', path);
    }
    return createLocation(path, key, state);
  }

  function toHref(location) {
    return createPath(location);
  }

  var browserHistory = {
    // location
    location: locationFromBrowser(),
    action: 'POP',
    // convenience
    toHref: toHref,
    subscribe: subscribe,
    confirmWith: confirmWith,
    removeConfirmation: removeConfirmation,
    destroy: function destroy() {
      beforeDestroy.forEach(function (fn) {
        fn();
      });
    }
  };

  browserHistory.update = function update(to) {
    var location = createLocation(to, null);
    var path = createPath(location);
    var currentPath = createPath(browserHistory.location);

    if (path === currentPath) {
      browserHistory.replace(to);
    } else {
      browserHistory.push(to);
    }
  };

  browserHistory.push = function push(to) {
    // the major version should be the current key + 1
    var key = keygen.major(browserHistory.location.key);
    var location = createLocation(to, key);
    confirmNavigation({
      to: location,
      from: browserHistory.location,
      action: 'PUSH'
    }, function () {
      var path = toHref(location);
      var key = location.key,
          state = location.state;

      window.history.pushState({ key: key, state: state }, '', path);
      browserHistory.location = location;
      browserHistory.action = 'PUSH';
      emit(browserHistory.location, 'PUSH');
    });
  };

  browserHistory.replace = function replace(to) {
    // pass the current key to just increment the minor portion
    var key = keygen.minor(browserHistory.location.key);
    var location = createLocation(to, key);
    confirmNavigation({
      to: location,
      from: browserHistory.location,
      action: 'REPLACE'
    }, function () {
      var path = toHref(location);
      var key = location.key,
          state = location.state;

      window.history.replaceState({ key: key, state: state }, '', path);
      browserHistory.location = location;
      browserHistory.action = 'REPLACE';
      emit(browserHistory.location, 'REPLACE');
    });
  };

  browserHistory.go = function go(num) {
    // calling window.history.go with no value reloads the page, but
    // we will just re-emit instead
    if (!num) {
      browserHistory.action = 'POP';
      emit(browserHistory.location, 'POP');
    } else {
      window.history.go(num);
    }
  };

  function pop(state) {
    // when we are reverting a pop (the user did not confirm navigation), we
    // just need to reset the boolean and return. The browser has already taken
    // care of updating the address bar and we never touched our internal values.
    if (reverting) {
      reverting = false;
      return;
    }
    var location = locationFromBrowser(state);
    var currentKey = browserHistory.location.key;
    var diff = keygen.diff(currentKey, location.key);
    confirmNavigation({
      to: location,
      from: browserHistory.location,
      action: 'POP'
    }, function () {
      browserHistory.location = location;
      browserHistory.action = 'POP';
      emit(browserHistory.location, 'POP');
    }, function () {
      reverting = true;
      window.history.go(-1 * diff);
    });
  }

  // need to listen for browser navigation events
  beforeDestroy.push(eventCoordinator({
    popstate: function popstate(event) {
      if (ignorablePopstateEvent(event)) {
        return;
      }
      pop(event.state);
    }
  }));

  return browserHistory;
}

function InMemory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _createCommonHistory = createCommonHistory(options),
      subscribe = _createCommonHistory.subscribe,
      emit = _createCommonHistory.emit,
      removeAllSubscribers = _createCommonHistory.removeAllSubscribers,
      createLocation = _createCommonHistory.createLocation,
      createPath = _createCommonHistory.createPath,
      confirmNavigation = _createCommonHistory.confirmNavigation,
      confirmWith = _createCommonHistory.confirmWith,
      removeConfirmation = _createCommonHistory.removeConfirmation,
      keygen = _createCommonHistory.keygen;

  var beforeDestroy = [removeAllSubscribers];

  var initialLocations = void 0;
  if (options.locations) {
    initialLocations = options.locations.map(function (loc) {
      return createLocation(loc, keygen.major());
    });
  } else {
    initialLocations = [createLocation({ pathname: '/' }, keygen.major())];
  }

  var initialIndex = 0;
  if (options.index && options.index > 0 && options.index < initialLocations.length) {
    initialIndex = options.index;
  }

  function toHref(location) {
    return createPath(location);
  }

  var memoryHistory = {
    // location
    location: initialLocations[initialIndex],
    locations: initialLocations,
    index: initialIndex,
    action: 'POP',
    // convenience
    toHref: toHref,
    subscribe: subscribe,
    confirmWith: confirmWith,
    removeConfirmation: removeConfirmation,
    destroy: function destroy() {
      beforeDestroy.forEach(function (fn) {
        fn();
      });
    }
  };

  memoryHistory.update = function update(to) {
    var location = createLocation(to, null);
    var path = createPath(location);
    var currentPath = createPath(memoryHistory.location);
    if (path === currentPath) {
      memoryHistory.replace(to);
    } else {
      memoryHistory.push(to);
    }
  };

  memoryHistory.push = function push(to) {
    var key = keygen.major(memoryHistory.location.key);
    var location = createLocation(to, key);
    confirmNavigation({
      to: location,
      from: memoryHistory.location,
      action: 'PUSH'
    }, function () {
      memoryHistory.location = location;
      memoryHistory.index++;
      memoryHistory.locations = [].concat(toConsumableArray(memoryHistory.locations.slice(0, memoryHistory.index)), [location]);
      memoryHistory.action = 'PUSH';
      emit(memoryHistory.location, 'PUSH');
    });
  };

  memoryHistory.replace = function replace(to) {
    var key = keygen.minor(memoryHistory.location.key);
    var location = createLocation(to, key);
    confirmNavigation({
      to: location,
      from: memoryHistory.location,
      action: 'REPLACE'
    }, function () {
      memoryHistory.location = location;
      memoryHistory.locations[memoryHistory.index] = memoryHistory.location;
      memoryHistory.action = 'REPLACE';
      emit(memoryHistory.location, 'REPLACE');
    });
  };

  memoryHistory.go = function go(num) {
    if (num == null || num === 0) {
      memoryHistory.action = 'POP';
      emit(memoryHistory.location, 'POP');
    } else {
      var newIndex = memoryHistory.index + num;
      if (newIndex < 0 || newIndex >= memoryHistory.locations.length) {
        return;
      } else {
        var location = memoryHistory.locations[newIndex];
        confirmNavigation({
          to: location,
          from: memoryHistory.location,
          action: 'PUSH'
        }, function () {
          memoryHistory.index = newIndex;
          memoryHistory.location = location;
          memoryHistory.action = 'POP';
          emit(memoryHistory.location, 'POP');
        });
      }
    }
  };

  return memoryHistory;
}

var DEFAULT = 'default';
var CLEAN = 'clean';
var BANG = 'bang';

// no matter with type of hash configuration we are using,
// our decode function should return a string that begins
// with a forward slash
function hashEncoderAndDecoder() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;

  switch (type) {
    case CLEAN:
      return {
        encode: function encode(path) {
          // When we are at the root (/), we need to include the leading
          // slash because the hash needs at least one character after the
          // pound sign. We do the same even if there is a query or hash 
          // for consistency.
          var noSlash = stripPrefix(path, '/');
          if (noSlash === '' || noSlash.charAt(0) === '?' || noSlash.charAt(0) === '#') {
            noSlash = '/' + noSlash;
          }
          return '#' + noSlash;
        },
        decode: function decode(path) {
          var noHash = stripPrefix(path, '#');
          return ensureBeginsWith(noHash, '/');
        }
      };
    case BANG:
      return {
        encode: function encode(path) {
          var withSlash = ensureBeginsWith(path, '/');
          return '#' + ensureBeginsWith(withSlash, '!');
        },
        decode: function decode(path) {
          var noHash = stripPrefix(path, '#');
          var noBang = stripPrefix(noHash, '!');
          return ensureBeginsWith(noBang, '/');
        }
      };
    case DEFAULT:
    default:
      return {
        encode: function encode(path) {
          return '#' + ensureBeginsWith(path, '/');
        },
        decode: function decode(path) {
          var noHash = stripPrefix(path, '#');
          return ensureBeginsWith(noHash, '/');
        }
      };
  }
}

function ensureHash(encode) {
  if (window.location.hash === '') {
    window.history.replaceState(null, '', encode('/'));
  }
}

function Hash() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!domExists()) {
    return;
  }

  var _createCommonHistory = createCommonHistory(options),
      subscribe = _createCommonHistory.subscribe,
      emit = _createCommonHistory.emit,
      removeAllSubscribers = _createCommonHistory.removeAllSubscribers,
      createLocation = _createCommonHistory.createLocation,
      createPath = _createCommonHistory.createPath,
      confirmNavigation = _createCommonHistory.confirmNavigation,
      confirmWith = _createCommonHistory.confirmWith,
      removeConfirmation = _createCommonHistory.removeConfirmation,
      keygen = _createCommonHistory.keygen;

  var _hashEncoderAndDecode = hashEncoderAndDecoder(options.hashType),
      decodeHashPath = _hashEncoderAndDecode.decode,
      encodeHashPath = _hashEncoderAndDecode.encode;

  var beforeDestroy = [removeAllSubscribers];

  // when true, pop will run without attempting to get user confirmation
  var reverting = false;

  ensureHash(encodeHashPath);

  function locationFromBrowser(providedState) {
    var hash = window.location.hash;

    var path = decodeHashPath(hash);

    var _ref = providedState || getStateFromHistory(),
        key = _ref.key,
        state = _ref.state;

    if (!key) {
      key = keygen.major();
      // replace with the hash we received, not the decoded path
      window.history.replaceState({ key: key, state: state }, '', hash);
    }
    return createLocation(path, key);
  }

  function toHref(location) {
    return encodeHashPath(createPath(location));
  }

  var hashHistory = {
    // location
    location: locationFromBrowser(),
    action: 'POP',
    // convenience
    toHref: toHref,
    subscribe: subscribe,
    confirmWith: confirmWith,
    removeConfirmation: removeConfirmation,
    destroy: function destroy() {
      beforeDestroy.forEach(function (fn) {
        fn();
      });
    }
  };

  hashHistory.update = function update(to) {
    var location = createLocation(to, null);
    var path = createPath(location);
    var currentPath = createPath(hashHistory.location);

    if (path === currentPath) {
      hashHistory.replace(to);
    } else {
      hashHistory.push(to);
    }
  };

  hashHistory.push = function push(to) {
    var key = keygen.major(hashHistory.location.key);
    var location = createLocation(to, key);
    confirmNavigation({
      to: location,
      from: hashHistory.location,
      action: 'PUSH'
    }, function () {
      var path = toHref(location);
      var key = location.key,
          state = location.state;

      window.history.pushState({ key: key, state: state }, '', path);
      hashHistory.location = location;
      hashHistory.action = 'PUSH';
      emit(hashHistory.location, 'PUSH');
    });
  };

  hashHistory.replace = function replace(to) {
    // pass the current key to just increment the minor portion
    var key = keygen.minor(hashHistory.location.key);
    var location = createLocation(to, key);
    confirmNavigation({
      to: location,
      from: hashHistory.location,
      action: 'REPLACE'
    }, function () {
      var path = toHref(location);
      var key = location.key,
          state = location.state;

      window.history.replaceState({ key: key, state: state }, '', path);
      hashHistory.location = location;
      hashHistory.action = 'REPLACE';
      emit(hashHistory.location, 'REPLACE');
    });
  };

  hashHistory.go = function go(num) {
    // calling window.history.go with no value reloads the page, but
    // we will just re-emit instead
    if (!num) {
      hashHistory.action = 'POP';
      emit(hashHistory.location, 'POP');
    } else {
      window.history.go(num);
    }
  };

  function pop(state) {
    // when we are reverting a pop (the user did not confirm navigation), we
    // just need to reset the boolean and return. The browser has already taken
    // care of updating the address bar and we never touched our internal values.
    if (reverting) {
      reverting = false;
      return;
    }
    var location = locationFromBrowser(state);
    var currentKey = hashHistory.location.key;
    var diff = keygen.diff(currentKey, location.key);
    confirmNavigation({
      to: location,
      from: hashHistory.location,
      action: 'POP'
    }, function () {
      hashHistory.location = location;
      hashHistory.action = 'POP';
      emit(hashHistory.location, 'POP');
    }, function () {
      reverting = true;

      window.history.go(-1 * diff);
    });
  }

  beforeDestroy.push(eventCoordinator({
    hashchange: function hashchange(event) {
      pop(event.state);
    }
  }));

  return hashHistory;
}




/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path_to_regexp__);


var withLeadingSlash = function withLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.slice(1) : path;
};

var withTrailingSlash = function withTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path : path + '/';
};

var join = function join(beginning, end) {
  return withTrailingSlash(beginning) + end;
};

function once(fn) {
  var promise = null;
  var hasRun = false;

  return function () {
    if (hasRun) {
      return promise;
    }

    promise = fn();
    hasRun = true;
    return promise;
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};













var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};



















var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var DEFAULT_OPTIONS = {
  sensitive: false,
  strict: false,
  end: true,
  delimiter: '/'
};

var path = function path(pathString, options) {
  var keys = [];
  var mergedOptions = _extends({}, DEFAULT_OPTIONS, options);
  var re = __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default.a(pathString, keys, mergedOptions);

  return { re: re, keys: keys };
};

var createRoute = function createRoute(options) {
  var _ref = options || {},
      name = _ref.name,
      path$$1 = _ref.path,
      _ref$pathOptions = _ref.pathOptions,
      pathOptions = _ref$pathOptions === undefined ? {} : _ref$pathOptions,
      body = _ref.body,
      children = _ref.children,
      preload = _ref.preload,
      load = _ref.load,
      rest = objectWithoutProperties(_ref, ['name', 'path', 'pathOptions', 'body', 'children', 'preload', 'load']);

  if (name == null || path$$1 == null) {
    throw new Error('A route must have defined name and path properties');
  }

  // end defaults to true, so end has to be hardcoded for it to be false
  var expectedExact = pathOptions.end == null || pathOptions.end;
  // when we have child routes, we need to perform non-end matching
  if (children) {
    pathOptions.end = false;
  }
  var regexPath = path(path$$1, pathOptions);

  return _extends({}, rest, {
    name: name,
    path: path$$1,
    body: body,
    getBody: function getBody() {
      return this.body && this.body();
    },
    children: children,
    preload: preload ? once(preload) : undefined,
    load: load,
    keys: regexPath.keys.map(function (key) {
      return key.name;
    }),
    match: function match(pathname, response, parentPath) {
      var testPath = stripLeadingSlash(pathname);
      var match = regexPath.re.exec(testPath);
      if (!match) {
        return false;
      }

      var _match = toArray(match),
          segment = _match[0],
          parsed = _match.slice(1);

      var params = {};
      regexPath.keys.forEach(function (key, index) {
        params[key.name] = parsed[index];
      });
      var uriString = parentPath != null ? join(parentPath, segment) : withLeadingSlash(segment);

      response.push(this, params);
      // if there are no children, then we accept the match
      if (!children || !children.length) {
        return true;
      }
      // children only need to match against unmatched segments
      var remainder = testPath.slice(segment.length);
      var notExact = !!remainder.length;
      var hasChildMatch = children.some(function (c) {
        return c.match(remainder, response, uriString);
      });
      // if the route has children, but none of them match, remove the match unless it
      // is exact
      if (expectedExact && notExact && !hasChildMatch) {
        response.pop();
        return false;
      }
      return true;
    }
  });
};

function walkRoutes(routeArray, addons) {
  var routes = createRoutes(routeArray);
  registerAddons(addons, routes);
  return routes;
}

function createRoutes(routeArray) {
  return routeArray.map(function (routeObject) {
    var children = routeObject.children ? createRoutes(routeObject.children) : [];

    var route = createRoute(_extends({}, routeObject, { children: children }));
    return route;
  });
}

function registerAddons(addons, routes) {
  addons.forEach(function (addon) {
    registerRoutes(routes, addon);
  });
}

function registerRoutes(routes, addon, parentData) {
  routes.forEach(function (route) {
    var data = addon.register(route, parentData);
    if (route.children) {
      registerRoutes(route.children, addon, data);
    }
  });
}

function createPathnameAddon() {
  var knownPaths = {};
  var cache = {};

  return {
    name: 'pathname',
    register: function register(route, parent) {
      var name = route.name,
          path = route.path;

      if (knownPaths[name] !== undefined) {
        console.warn('A pathname with the name "' + name + '" already exists. Each route should' + 'have a unique name. By registering a pathname with a name that already exists, ' + 'you are overwriting the existing pathname. This may break your application.');
      }

      var base = void 0;
      if (parent && knownPaths[parent]) {
        base = knownPaths[parent];
      }
      knownPaths[name] = base ? join(base, path) : path;
      return name;
    },
    get: function get(name, params) {
      if (knownPaths[name] == null) {
        console.error('Could not generate pathname for ' + name + ' because it is not registered.');
        return;
      }
      var compile = cache[name] ? cache[name] : cache[name] = __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default.a.compile(knownPaths[name]);
      return withLeadingSlash(compile(params, { pretty: true }));
    }
  };
}

var ResponseCreator = function () {
  function ResponseCreator(key, location) {
    classCallCheck(this, ResponseCreator);

    this.key = key;
    this.location = location;
    this.status = 200;
    this.matches = [];
    // properties to be set once we have
    // finished walking over the routes
    this.route;
    this.partials = [];
    this.params = {};
    this.body;
  }

  createClass(ResponseCreator, [{
    key: 'redirect',
    value: function redirect(to) {
      var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 301;

      this.setStatus(code);
      this.redirectTo = to;
    }
  }, {
    key: 'fail',
    value: function fail(err) {
      this.error = err;
    }
  }, {
    key: 'setStatus',
    value: function setStatus(code) {
      this.status = code;
    }
  }, {
    key: 'push',
    value: function push(route, params) {
      this.matches.push({ route: route, params: params });
    }
  }, {
    key: 'pop',
    value: function pop() {
      this.matches.pop();
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      this.data = data;
    }
  }, {
    key: 'freeze',
    value: function freeze() {
      var _this = this;

      if (this.matches.length) {
        var bestMatch = this.matches.pop();
        this.matches.forEach(function (m) {
          _this.partials.push(m.route.name);
          _extends(_this.params, m.params);
        });

        this.route = bestMatch.route;
        _extends(this.params, bestMatch.params);
      }
    }
  }, {
    key: 'generateTitle',
    value: function generateTitle() {
      if (!this.route || !this.route.title) {
        return '';
      }
      return typeof this.route.title === 'function' ? this.route.title(this.params, this.data) : this.route.title;
    }
  }, {
    key: 'asObject',
    value: function asObject() {
      var sharedResponse = {
        key: this.key,
        location: this.location,
        status: this.status,
        data: this.data,
        title: this.generateTitle()
      };

      if (this.redirectTo != null) {
        return _extends({}, sharedResponse, {
          redirectTo: this.redirectTo
        });
      }

      return _extends({}, sharedResponse, {
        body: this.route && this.route.getBody(),
        name: this.route ? this.route.name : undefined,
        partials: this.partials,
        params: this.params,
        error: this.error
      });
    }
  }]);
  return ResponseCreator;
}();

function createConfig$1(history, routeArray) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$addons = options.addons,
      addonFactories = _options$addons === undefined ? [] : _options$addons,
      _options$sideEffects = options.sideEffects,
      sideEffects = _options$sideEffects === undefined ? [] : _options$sideEffects,
      _options$cache = options.cache,
      cache = _options$cache === undefined ? false : _options$cache;

  // add the pathname addon to the provided addons

  var finalAddons = addonFactories.concat(createPathnameAddon);
  var routes = [];
  var registeredAddons = {};
  var subscribers = [];

  var mostRecentKey = void 0;
  var previousResponse = void 0;
  var responseInProgress = void 0;

  function setupRoutesAndAddons(routeArray) {
    var addonFunctions = [];
    // clear out any existing addons
    for (var key in registeredAddons) {
      delete registeredAddons[key];
    }

    finalAddons.forEach(function (addonFactory) {
      var addon = addonFactory();
      registeredAddons[addon.name] = addon.get;
      addonFunctions.push(addon);
    });

    routes = walkRoutes(routeArray, addonFunctions, {});
    makeResponse(history.location, history.action);
  }

  function matchRoute(rc) {
    routes.some(function (route) {
      return route.match(history.location.pathname, rc);
    });
    // once we have matched the route, we freeze the responseCreator to
    // set its route/params/partials properties
    rc.freeze();
    return Promise.resolve(rc);
  }

  function loadRoute(rc) {
    if (!rc.route) {
      rc.setStatus(404);
      return Promise.resolve(rc);
    }

    var _rc$route = rc.route,
        preload = _rc$route.preload,
        load = _rc$route.load;

    // just want to pass a subset of the ResponseCreator's methods
    // to the user

    var modifiers = load ? {
      fail: rc.fail.bind(rc),
      redirect: rc.redirect.bind(rc),
      setData: rc.setData.bind(rc),
      setStatus: rc.setStatus.bind(rc)
    } : undefined;

    return Promise.all([preload ? preload() : null, load ? load(rc.params, modifiers) : null]).catch(function (err) {
      rc.fail(err);
    })
    // ALWAYS return the response
    .then(function () {
      return rc;
    });
  }

  function finalizeResponse(rc) {
    var respObject = rc.asObject();

    if (cache) {
      cache.set(respObject);
    }

    previousResponse = respObject;
    return respObject;
  }

  function prepareResponse(location) {
    // generate a random key when none is provided (old browsers, maybe unecessary?)
    var key = location.key || Math.random().toString(36).slice(2, 8);
    mostRecentKey = key;

    if (cache) {
      var cachedResponse = cache.get(location);
      if (cachedResponse != null) {
        return Promise.resolve(cachedResponse);
      }
    }

    var rc = new ResponseCreator(key, location);

    return matchRoute(rc).then(loadRoute).then(finalizeResponse);
  }

  function subscribe(fn) {
    if (typeof fn !== 'function') {
      throw new Error('The argument passed to subscribe must be a function');
    }

    // Immediately call subscriber function. If the initial response
    // has not resolved, the subscriber will be passed undefined
    fn(previousResponse);

    var newLength = subscribers.push(fn);
    return function () {
      subscribers[newLength - 1] = null;
    };
  }

  function emit(response, action) {
    // don't emit old responses
    if (response.key !== mostRecentKey) {
      return;
    }

    sideEffects.forEach(function (fn) {
      fn(response, action);
    });

    subscribers.forEach(function (fn) {
      if (fn != null) {
        fn(response);
      }
    });
  }

  // create a response object using the current location and
  // emit it to any subscribed functions
  function makeResponse(location, action) {
    responseInProgress = prepareResponse(location).then(function (response) {
      emit(response, action);
      return response;
    });
  }

  // now that everything is defined, actually do the setup
  setupRoutesAndAddons(routeArray);
  var unlisten = history.subscribe(makeResponse);

  return {
    ready: function ready() {
      return responseInProgress;
    },
    refresh: setupRoutesAndAddons,
    subscribe: subscribe,
    addons: registeredAddons,
    history: history
  };
}

/* harmony default export */ __webpack_exports__["default"] = (createConfig$1);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(10);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isarray = __webpack_require__(23)

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = options && options.delimiter || '/'
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      keys.push(token)

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  var delimiter = escapeString(options.delimiter || '/')
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Navigator = function (_React$Component) {
  inherits(Navigator, _React$Component);

  function Navigator() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Navigator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Navigator.__proto__ || Object.getPrototypeOf(Navigator)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      response: undefined
    }, _this.setResponse = function (response) {
      _this.setState({ response: response });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Navigator, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        curi: this.props.config,
        curiResponse: this.state.response
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.response) {
        this.setResponse(this.props.response);
      } else {
        this.unsubscribe = this.props.config.subscribe(this.setResponse);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children(this.state.response, this.props.config);
    }
  }]);
  return Navigator;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Navigator.propTypes = {
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  response: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
};
Navigator.childContextTypes = {
  curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  curiResponse: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
};

/* harmony default export */ __webpack_exports__["a"] = (Navigator);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(10);
var invariant = __webpack_require__(11);
var warning = __webpack_require__(15);

var ReactPropTypesSecret = __webpack_require__(12);
var checkPropTypes = __webpack_require__(26);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(11);
  var warning = __webpack_require__(15);
  var ReactPropTypesSecret = __webpack_require__(12);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(10);
var invariant = __webpack_require__(11);
var ReactPropTypesSecret = __webpack_require__(12);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = "development";

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

var invariant_1 = invariant;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var canNavigate = function canNavigate(event) {
  return !event.defaultPrevented && event.button === 0 && !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

var Link = function (_React$Component) {
  inherits(Link, _React$Component);

  function Link() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Link);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args))), _this), _this.clickHandler = function (event) {
      if (_this.props.onClick) {
        _this.props.onClick(event);
      }

      if (canNavigate(event) && !_this.props.target) {
        event.preventDefault();
        var curi = _this.context.curi;
        var pathname = _this.state.pathname;
        var _this$props = _this.props,
            to = _this$props.to,
            params = _this$props.params,
            _this$props$details = _this$props.details,
            details = _this$props$details === undefined ? {} : _this$props$details;

        var location = _extends({ pathname: pathname }, details);
        curi.history.update(location);
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Link, [{
    key: 'createPathname',
    value: function createPathname(props, context) {
      var to = props.to,
          params = props.params;
      var curi = context.curi;

      var pathname = to != null ? curi.addons.pathname(to, params) : '/';
      this.setState(function () {
        return {
          pathname: pathname
        };
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.createPathname(this.props, this.context);
      if (this.props.active) {
        this.verifyActiveAddon();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      this.createPathname(nextProps, nextContext);
      if (nextProps.active) {
        this.verifyActiveAddon();
      }
    }
  }, {
    key: 'verifyActiveAddon',
    value: function verifyActiveAddon() {
      invariant_1(this.context.curi.addons.active, 'You are attempting to use the "active" prop, but have not included the "active" ' + 'addon (curi-addon-active) in your Curi configuration object.');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          to = _props.to,
          params = _props.params,
          details = _props.details,
          onClick = _props.onClick,
          active = _props.active,
          _props$anchor = _props.anchor,
          Anchor = _props$anchor === undefined ? 'a' : _props$anchor,
          rest = objectWithoutProperties(_props, ['to', 'params', 'details', 'onClick', 'active', 'anchor']);
      var _context = this.context,
          curi = _context.curi,
          curiResponse = _context.curiResponse;

      var anchorProps = rest;

      if (active) {
        var partial = active.partial,
            merge = active.merge;

        var isActive = curi.addons.active(to, curiResponse, params, partial);
        if (isActive) {
          anchorProps = merge(anchorProps);
        }
      }

      var pathname = this.state.pathname;

      var href = curi.history.toHref(_extends({ pathname: pathname }, details));

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Anchor, _extends({}, anchorProps, { onClick: this.clickHandler, href: href }));
    }
  }]);
  return Link;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Link.propTypes = {
  to: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  params: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  details: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  active: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    merge: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
    partial: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
  }),
  anchor: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};
Link.contextTypes = {
  curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  curiResponse: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
};

/* harmony default export */ __webpack_exports__["a"] = (Link);


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Redirect = function (_React$Component) {
  inherits(Redirect, _React$Component);

  function Redirect() {
    classCallCheck(this, Redirect);
    return possibleConstructorReturn(this, (Redirect.__proto__ || Object.getPrototypeOf(Redirect)).apply(this, arguments));
  }

  createClass(Redirect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          to = _props.to,
          params = _props.params,
          details = _props.details;

      var redirectTo = details;
      if (to) {
        var pathname = this.context.curi.addons.pathname(to, params);
        redirectTo = _extends({ pathname: pathname }, details);
      }
      this.context.curi.history.replace(redirectTo);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children ? this.props.children : null;
    }
  }]);
  return Redirect;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Redirect.propTypes = {
  to: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  params: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  details: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element
};
Redirect.contextTypes = {
  curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (Redirect);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Block = function (_React$Component) {
  inherits(Block, _React$Component);

  function Block() {
    classCallCheck(this, Block);
    return possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).apply(this, arguments));
  }

  createClass(Block, [{
    key: 'on',
    value: function on() {
      this.context.curi.history.confirmWith(this.props.confirm);
    }
  }, {
    key: 'off',
    value: function off() {
      this.context.curi.history.removeConfirmation();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.when) {
        this.on();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.when === prevProps.when && this.props.confirm === prevProps.confirm) {
        return;
      }
      this.off();
      if (this.props.when) {
        this.on();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.off();
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Block;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Block.propTypes = {
  when: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  confirm: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
Block.contextTypes = {
  curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};
Block.defaultProps = {
  when: true
};

/* harmony default export */ __webpack_exports__["a"] = (Block);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

var index = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {}
            }
        }
    }

    return targetComponent;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};













var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

function curious(WrappedComponent) {
  function CuriousComponent(props, context) {
    var internalRef = props.internalRef,
        rest = objectWithoutProperties(props, ['internalRef']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WrappedComponent, _extends({
      curi: context.curi,
      response: context.curiResponse
    }, rest, {
      ref: internalRef
    }));
  }

  CuriousComponent.displayName = 'curious(' + (WrappedComponent.displayName || WrappedComponent.name) + ')';
  CuriousComponent.contextTypes = {
    curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
    curiResponse: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
  };
  CuriousComponent.propTypes = {
    internalRef: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
  };

  return index(CuriousComponent, WrappedComponent);
}

/* harmony default export */ __webpack_exports__["a"] = (curious);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = "development";

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

var invariant_1 = invariant;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Active = function (_React$Component) {
  inherits(Active, _React$Component);

  function Active() {
    classCallCheck(this, Active);
    return possibleConstructorReturn(this, (Active.__proto__ || Object.getPrototypeOf(Active)).apply(this, arguments));
  }

  createClass(Active, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.verifyActiveAddon();
    }
  }, {
    key: 'verifyActiveAddon',
    value: function verifyActiveAddon() {
      invariant_1(this.context.curi.addons.active, 'You are attempting to use the "active" prop, but have not included the "active" ' + 'addon (curi-addon-active) in your Curi configuration object.');
    }
  }, {
    key: 'render',
    value: function render() {
      var _context = this.context,
          curi = _context.curi,
          curiResponse = _context.curiResponse;
      var _props = this.props,
          merge = _props.merge,
          partial = _props.partial,
          name = _props.name,
          params = _props.params,
          children = _props.children;

      // need to make a copy

      var childProps = _extends({}, children.props);
      var isActive = curi.addons.active(name, curiResponse, params, partial);
      if (isActive) {
        childProps = merge(childProps);
      }

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(children, _extends({}, childProps));
    }
  }]);
  return Active;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Active.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element.isRequired,
  name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  params: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  partial: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  merge: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
Active.contextTypes = {
  curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  curiResponse: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
};
Active.defaultProps = {
  partial: false
};

/* harmony default export */ __webpack_exports__["a"] = (Active);


/***/ }),
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global Prism */

var PrismCode = function (_PureComponent) {
  _inherits(PrismCode, _PureComponent);

  function PrismCode() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PrismCode);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PrismCode.__proto__ || Object.getPrototypeOf(PrismCode)).call.apply(_ref, [this].concat(args))), _this), _this._handleRefMount = function (domNode) {
      _this._domNode = domNode;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PrismCode, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._hightlight();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._hightlight();
    }
  }, {
    key: "_hightlight",
    value: function _hightlight() {
      Prism.highlightElement(this._domNode, this.props.async);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          className = _props.className,
          Wrapper = _props.component,
          children = _props.children;


      return _react2.default.createElement(
        Wrapper,
        {
          ref: this._handleRefMount,
          className: className
        },
        children
      );
    }
  }]);

  return PrismCode;
}(_react.PureComponent);

PrismCode.propTypes = {
  async: _propTypes.PropTypes.bool,
  className: _propTypes.PropTypes.string,
  children: _propTypes.PropTypes.any,
  component: _propTypes.PropTypes.node
};
PrismCode.defaultProps = {
  component: "code"
};
exports.default = PrismCode;

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);
__webpack_require__(2);
__webpack_require__(13);
module.exports = __webpack_require__(9);


/***/ })
/******/ ]);