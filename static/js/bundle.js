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
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		4: 0
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
/******/ 		script.src = __webpack_require__.p + "js/" + ({"0":"example","1":"tutorial","2":"package","3":"guide"}[chunkId]||chunkId) + ".bundle.js";
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
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Active", function() { return Active; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Block", function() { return Block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curious", function() { return curious; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CuriBase", function() { return CuriBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hoist_non_react_statics__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_hoist_non_react_statics__);





/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

var Active = /** @class */ (function (_super) {
    __extends(Active, _super);
    function Active() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Active.prototype.componentWillMount = function () {
        this.verifyActiveAddon();
    };
    Active.prototype.verifyActiveAddon = function () {
        var curi = this.props.curi || this.context.curi.config;
        __WEBPACK_IMPORTED_MODULE_2_invariant___default()(curi.addons.active, 'You are attempting to use the "active" prop, but have not included the "active" ' +
            'addon (curi-addon-active) in your Curi configuration object.');
    };
    Active.prototype.render = function () {
        var curi = this.props.curi || this.context.curi.config;
        var response = this.props.response || this.context.curi.response;
        var _a = this.props, extra = _a.extra, merge = _a.merge, _b = _a.partial, partial = _b === void 0 ? false : _b, name = _a.name, params = _a.params, details = _a.details, children = _a.children;
        return curi.addons.active(name, response, params, partial) &&
            (extra ? extra(response.location, details) : true)
            ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(children, merge(__assign({}, children.props)))
            : children;
    };
    Active.contextTypes = {
        curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
            config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
            response: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
        })
    };
    return Active;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component));

var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Block.prototype.on = function () {
        var curi = this.props.curi || this.context.curi.config;
        curi.history.confirmWith(this.props.confirm);
    };
    Block.prototype.off = function () {
        var curi = this.props.curi || this.context.curi.config;
        curi.history.removeConfirmation();
    };
    Block.prototype.componentDidMount = function () {
        if (this.props.active) {
            this.on();
        }
    };
    Block.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.active === prevProps.active &&
            this.props.confirm === prevProps.confirm) {
            return;
        }
        this.off();
        if (this.props.active) {
            this.on();
        }
    };
    Block.prototype.componentWillUnmount = function () {
        this.off();
    };
    Block.prototype.render = function () {
        return null;
    };
    Block.contextTypes = {
        curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
            config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
        })
    };
    Block.defaultProps = {
        active: true
    };
    return Block;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component));

function curious(WrappedComponent) {
    var CuriousComponent = function (props, context) {
        var internalRef = props.internalRef, rest = __rest(props, ["internalRef"]);
        return (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WrappedComponent, __assign({ curi: context.curi.config, response: context.curi.response }, rest, { ref: internalRef })));
    };
    CuriousComponent.displayName = "curious(" + (WrappedComponent.displayName ||
        WrappedComponent.name) + ")";
    CuriousComponent.contextTypes = {
        curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
            config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
            response: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
            action: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
        }).isRequired
    };
    return __WEBPACK_IMPORTED_MODULE_3_hoist_non_react_statics___default()(CuriousComponent, WrappedComponent);
}

var canNavigate = function (event) {
    return (!event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey));
};
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clickHandler = function (event) {
            if (_this.props.onClick) {
                _this.props.onClick(event);
            }
            if (canNavigate(event) && !_this.props.target) {
                event.preventDefault();
                var curi = _this.props.curi || _this.context.curi.config;
                var pathname = _this.state.pathname;
                var _a = _this.props, to = _a.to, params = _a.params, _b = _a.details, details = _b === void 0 ? {} : _b;
                var location_1 = __assign({}, details, { pathname: pathname });
                curi.history.navigate(location_1);
            }
        };
        return _this;
    }
    Link.prototype.createPathname = function (props, context) {
        var to = props.to, params = props.params;
        var curi = props.curi || context.curi.config;
        var response = props.response || context.curi.response;
        var pathname = to != null
            ? curi.addons.pathname(to, params)
            : response.location.pathname;
        this.setState(function () { return ({
            pathname: pathname
        }); });
    };
    Link.prototype.componentWillMount = function () {
        this.createPathname(this.props, this.context);
        if (this.props.active) {
            this.verifyActiveAddon();
        }
    };
    Link.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
        this.createPathname(nextProps, nextContext);
        if (nextProps.active) {
            this.verifyActiveAddon();
        }
    };
    Link.prototype.verifyActiveAddon = function () {
        var curi = this.props.curi || this.context.curi.config;
        __WEBPACK_IMPORTED_MODULE_2_invariant___default()(curi.addons.active, 'You are attempting to use the "active" prop, but have not included the "active" ' +
            'addon (@curi/addon-active) in your Curi configuration object.');
    };
    Link.prototype.render = function () {
        var _a = this.props, to = _a.to, params = _a.params, details = _a.details, onClick = _a.onClick, active = _a.active, anchor = _a.anchor, rest = __rest(_a, ["to", "params", "details", "onClick", "active", "anchor"]);
        var curi = this.props.curi || this.context.curi.config;
        var response = this.props.response || this.context.curi.response;
        var anchorProps = rest;
        var Anchor = anchor ? anchor : 'a';
        if (active) {
            var partial = active.partial, merge = active.merge, extra = active.extra;
            var isActive = curi.addons.active(to, response, params, partial) &&
                (extra ? extra(response.location, details) : true);
            if (isActive) {
                anchorProps = merge(anchorProps);
            }
        }
        var pathname = this.state.pathname;
        var href = curi.history.toHref(__assign({}, details, { pathname: pathname }));
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Anchor, __assign({}, anchorProps, { onClick: this.clickHandler, href: href }));
    };
    Link.contextTypes = {
        curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
            config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
            response: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
        })
    };
    return Link;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component));

var CuriBase = /** @class */ (function (_super) {
    __extends(CuriBase, _super);
    function CuriBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CuriBase.prototype.getChildContext = function () {
        return {
            curi: {
                config: this.props.config,
                response: this.props.response,
                action: this.props.action
            }
        };
    };
    CuriBase.prototype.render = function () {
        return this.props.render(this.props.response, this.props.action, this.props.config);
    };
    CuriBase.childContextTypes = {
        curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
            config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
            response: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
            action: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
        })
    };
    CuriBase.defaultProps = {
        action: 'POP'
    };
    return CuriBase;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component));




/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrismBlock = exports.InlineComponent = exports.InlineJS = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactPrism = __webpack_require__(38);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InlineJS = function InlineJS(_ref) {
  var children = _ref.children;
  return _react.default.createElement(_reactPrism.PrismCode, {
    className: "language-javascript"
  }, children);
};

exports.InlineJS = InlineJS;

var InlineComponent = function InlineComponent(_ref2) {
  var children = _ref2.children;
  return _react.default.createElement(_reactPrism.PrismCode, {
    className: "language-jsx"
  }, "<", children, ">");
};

exports.InlineComponent = InlineComponent;

var PrismBlock = function PrismBlock(_ref3) {
  var lang = _ref3.lang,
      children = _ref3.children;
  return _react.default.createElement(_reactPrism.PrismCode, {
    className: "language-".concat(lang),
    component: "pre"
  }, children);
};

exports.PrismBlock = PrismBlock;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(props) {
  props.className = 'active';
  return props;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var examples = {
  react: [{
    name: 'Active Links',
    category: 'react',
    slug: 'active-links',
    description: 'Style links when they match the current location'
  }, {
    name: 'Authentication',
    category: 'react',
    slug: 'authentication',
    description: 'Automatically redirect to a login page when attempting to access private content'
  }, {
    name: 'Basic',
    category: 'react',
    slug: 'basic',
    description: 'A simple Curi app rendered using React'
  }, {
    name: 'Blocking Navigation',
    category: 'react',
    slug: 'blocking-navigation',
    description: 'Prevent navigation away from a half-filled form'
  }, {
    name: 'Breadcrumbs',
    category: 'react',
    slug: 'breadcrumbs',
    description: 'Render breadcrumb links to ancestor routes'
  }, {
    name: 'Data Loading',
    category: 'react',
    slug: 'data-loading',
    description: 'Display a loading bar while waiting for data to load'
  }, {
    name: 'Modal Routes',
    category: 'react',
    slug: 'modal',
    description: 'Load a route in a modal (the Pinterest model)'
  }, {
    name: 'Multiple Body Components',
    category: 'react',
    slug: 'multi-body',
    description: 'Attach multiple components to a route'
  }, {
    name: 'Redux',
    category: 'react',
    slug: 'redux',
    description: 'Integrate Redux, React, and Curi (easily!)'
  }, {
    name: 'Transitions',
    category: 'react',
    slug: 'transitions',
    description: 'Transition between routes using react-transition-group'
  }],
  vue: [{
    name: 'Active Links',
    category: 'vue',
    slug: 'active-links',
    description: 'Style links when they match the current location'
  }, {
    name: 'Authentication',
    category: 'vue',
    slug: 'authentication',
    description: 'Automatically redirect to a login page when attempting to access private content'
  }, {
    name: 'Basic',
    category: 'vue',
    slug: 'basic',
    description: 'A simple Curi app rendered using VueJS'
  }, {
    name: 'Breadcrumbs',
    category: 'vue',
    slug: 'breadcrumbs',
    description: 'Render breadcrumb links to ancestor routes'
  }, {
    name: 'Blocking Navigation',
    category: 'vue',
    slug: 'blocking-navigation',
    description: 'Prevent navigation away from a half-filled form'
  }, {
    name: 'Transitions',
    category: 'vue',
    slug: 'transitions',
    description: 'Transition between routes'
  }],
  svelte: [{
    name: 'Basic',
    category: 'svelte',
    slug: 'basic',
    description: 'A simple Curi app rendered using Svelte'
  }],
  misc: [{
    name: 'Code Splitting',
    category: 'misc',
    slug: 'code-splitting',
    description: 'Use import() to enable Webpack code splitting'
  }, {
    name: 'Script Tags',
    category: 'misc',
    slug: 'script-tags',
    description: 'Load Curi packages using script tags instead of a bundle'
  }, {
    name: 'Server Rendering',
    category: 'misc',
    slug: 'server-rendering',
    description: 'Render your application on the server using Node (this example uses Express)'
  }, {
    name: 'Side Effects',
    category: 'misc',
    slug: 'side-effect',
    description: 'Add side effects that always respond to navigation'
  }]
};
var _default = {
  find: function findExample(category, slug) {
    if (!examples[category]) {
      return;
    } else {
      return examples[category].find(function (e) {
        return e.slug === slug;
      });
    }
  },
  all: function all() {
    return examples;
  }
};
exports.default = _default;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
  module.exports = __webpack_require__(27)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(30)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(4);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
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
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.byName = exports.groupedPackages = void 0;

var _versions = _interopRequireDefault(__webpack_require__(46));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var packages = [{
  name: 'core',
  version: _versions.default['core'],
  globalName: 'Curi',
  type: 'core'
}, {
  name: 'addon-active',
  version: _versions.default['addon-active'],
  globalName: 'CuriAddonActive',
  type: 'addon'
}, {
  name: 'addon-ancestors',
  version: _versions.default['addon-ancestors'],
  globalName: 'CuriAddonAncestors',
  type: 'addon'
}, {
  name: 'addon-prefetch',
  version: _versions.default['addon-prefetch'],
  globalName: 'CuriAddonPrefetch',
  type: 'addon'
}, {
  name: 'side-effect-title',
  version: _versions.default['side-effect-title'],
  globalName: 'CuriSideEffectTitle',
  type: 'side-effect'
}, {
  name: 'side-effect-scroll',
  version: _versions.default['side-effect-scroll'],
  globalName: 'CuriSideEffectScroll',
  type: 'side-effect'
}, {
  name: 'react',
  version: _versions.default['react'],
  globalName: 'CuriReact',
  type: 'renderer'
}, {
  name: 'redux',
  version: _versions.default['redux'],
  globalName: 'CuriRedux',
  type: 'redux'
}, {
  name: 'svelte',
  version: _versions.default['svelte'],
  globalName: 'CuriSvelte',
  type: 'renderer'
}, {
  name: 'vue',
  version: _versions.default['vue'],
  globalName: 'CuriVue',
  type: 'renderer'
}];
var groupedPackages = packages.reduce(function (acc, curr) {
  if (!acc[curr.type]) {
    acc[curr.type] = [curr];
  } else {
    acc[curr.type].push(curr);
  }

  return acc;
}, {});
exports.groupedPackages = groupedPackages;
var byName = packages.reduce(function (acc, curr) {
  acc[curr.name] = curr;
  return acc;
}, {});
exports.byName = byName;
var _default = packages;
exports.default = _default;

/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Warning = exports.Note = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Note = function Note(_ref) {
  var children = _ref.children;
  return _react.default.createElement("div", {
    className: "note"
  }, _react.default.createElement("strong", null, "Note:"), " ", children);
};

exports.Note = Note;

var Warning = function Warning(_ref2) {
  var children = _ref2.children;
  return _react.default.createElement("div", {
    className: "warning"
  }, _react.default.createElement("strong", null, "Warning:"), " ", children);
};

exports.Warning = Warning;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _packages = __webpack_require__(11);

var _styleActive = _interopRequireDefault(__webpack_require__(7));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupPackages = function GroupPackages(_ref) {
  var packages = _ref.packages,
      withDescription = _ref.withDescription;
  return _react.default.createElement("ul", {
    className: "link-list"
  }, packages.map(function (p) {
    return _react.default.createElement("li", {
      key: p.name,
      className: withDescription ? 'with' : 'solo'
    }, _react.default.createElement(_react2.Link, {
      to: "Package",
      params: {
        package: p.name
      },
      active: {
        merge: _styleActive.default
      }
    }, p.name));
  }));
};

var _default = function _default(_ref2) {
  var _ref2$withDescription = _ref2.withDescription,
      withDescription = _ref2$withDescription === void 0 ? false : _ref2$withDescription;
  return _react.default.createElement("ul", null, Object.keys(_packages.groupedPackages).map(function (name) {
    return _react.default.createElement("li", {
      className: "link-group",
      key: name
    }, _react.default.createElement("h3", null, name), _react.default.createElement(GroupPackages, {
      packages: _packages.groupedPackages[name],
      withDescription: withDescription
    }));
  }));
};

exports.default = _default;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.byName = void 0;
var tutorials = [{
  name: '01-introduction',
  displayName: 'Part 1: Introduction to Curi'
}, {
  name: '02-setup',
  displayName: 'Part 2: Curi Setup'
}, {
  name: '03-routes',
  displayName: 'Part 3: Curi Routes'
}, {
  name: '04-hickory',
  displayName: 'Part 4: Hickory'
}, {
  name: '05-config',
  displayName: 'Part 5: The Curi Configuration Object'
}, {
  name: '06-pages',
  displayName: 'Part 6: Rendering Pages',
  frameworks: ['react', 'vue']
}, {
  name: '07-loading-data',
  displayName: 'Part 7: Loading Data'
}, {
  name: '08-render-data',
  displayName: 'Part 8: Rendering Data',
  frameworks: ['react', 'vue']
}, {
  name: '09-nav',
  displayName: 'Part 9: Forms & Programmatic Navigation',
  frameworks: ['react', 'vue']
}, {
  name: '10-now-what',
  displayName: 'Part 10: Now What?'
}];
var byName = tutorials.reduce(function (acc, curr) {
  if (curr.frameworks) {
    curr.frameworks.forEach(function (f) {
      acc["".concat(curr.name, "-").concat(f)] = curr;
    });
  } else {
    acc[curr.name] = curr;
  }

  return acc;
}, {});
exports.byName = byName;
var _default = tutorials;
exports.default = _default;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.byName = exports.groupedGuides = void 0;
var guides = [{
  name: 'Installation',
  slug: 'installation',
  description: 'Learn how to install Curi',
  type: 'basic'
}, {
  name: 'Getting Started',
  slug: 'getting-started',
  description: "Learn the basic concepts that you'll need to know to setup your project",
  type: 'basic'
}, {
  name: 'All About Routes',
  slug: 'routes',
  description: 'Learn about Curi routes and their properties',
  type: 'basic'
}, {
  name: 'Rendering with Responses',
  slug: 'responses',
  description: 'Learn how to render your project using a response object',
  type: 'basic'
}, {
  name: 'Using Addons',
  slug: 'addons',
  description: 'Learn how to use addons to interact with your routes in your project',
  type: 'advanced'
}, {
  name: 'Using Side Effects',
  slug: 'side-effects',
  description: 'Learn how to use side effect functions to trigger behavior after navigation',
  type: 'advanced'
}, {
  name: 'Response Caching',
  slug: 'response-caching',
  description: 'Learn how to cache responses to prevent recreating duplicate responses',
  type: 'advanced'
}, {
  name: 'Code Splitting',
  slug: 'code-splitting',
  description: 'Learn how to code split your project using Webpack',
  type: 'advanced'
}, {
  name: 'Loading Route Data',
  slug: 'loading',
  description: 'Learn how to load data for a route and modify the response object',
  type: 'advanced'
}, {
  name: 'React Basics',
  slug: 'react',
  description: 'Learn the basics of how to use Curi with a React application',
  type: 'advanced'
}, {
  name: 'Migrate from React Router v2/3 to Curi',
  slug: 'migrate-rrv3',
  descriptioni: 'Learn how to migrate an application from React Router v2 or v3 to Curi',
  type: 'migration'
}];
var groupedGuides = guides.reduce(function (acc, curr) {
  if (!acc[curr.type]) {
    acc[curr.type] = [curr];
  } else {
    acc[curr.type].push(curr);
  }

  return acc;
}, {});
exports.groupedGuides = groupedGuides;
var byName = guides.reduce(function (acc, curr) {
  acc[curr.slug] = curr;
  return acc;
}, {});
exports.byName = byName;
var _default = guides;
exports.default = _default;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
module.exports = __webpack_require__(19);


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = _interopRequireDefault(__webpack_require__(0));

var _reactDom = _interopRequireDefault(__webpack_require__(20));

var _browser = _interopRequireDefault(__webpack_require__(21));

var _core = _interopRequireDefault(__webpack_require__(25));

var _react2 = __webpack_require__(1);

var _sideEffectTitle = _interopRequireDefault(__webpack_require__(33));

var _sideEffectScroll = _interopRequireDefault(__webpack_require__(34));

var _addonActive = _interopRequireDefault(__webpack_require__(35));

var _routes = _interopRequireDefault(__webpack_require__(36));

var _render = _interopRequireDefault(__webpack_require__(49));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setTitle = (0, _sideEffectTitle.default)({
  suffix: '| Curi Documentation'
});
var scrollTo = (0, _sideEffectScroll.default)();
var history = (0, _browser.default)();
var config = (0, _core.default)(history, _routes.default, {
  addons: [(0, _addonActive.default)()],
  sideEffects: [{
    fn: setTitle
  }, {
    fn: scrollTo
  }]
});
config.respond(function (response, action) {
  _reactDom.default.hydrate(_react.default.createElement(_react2.CuriBase, {
    response: response,
    action: action,
    config: config,
    render: _render.default
  }), document.getElementById('root'));
});

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hickory_root__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__ = __webpack_require__(24);



function Browser(options) {
    if (options === void 0) { options = {}; }
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["b" /* domExists */])()) {
        return;
    }
    if (!options.raw) {
        options.raw = __WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["c" /* ensureEncodedPathname */];
    }
    var _a = Object(__WEBPACK_IMPORTED_MODULE_0__hickory_root__["a" /* default */])(options), createLocation = _a.createLocation, createPath = _a.createPath, confirmNavigation = _a.confirmNavigation, confirmWith = _a.confirmWith, removeConfirmation = _a.removeConfirmation, keygen = _a.keygen;
    var beforeDestroy = [];
    // when true, pop will run without attempting to get user confirmation
    var reverting = false;
    function locationFromBrowser(providedState) {
        var _a = window.location, pathname = _a.pathname, search = _a.search, hash = _a.hash;
        var path = pathname + search + hash;
        var _b = providedState || Object(__WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["d" /* getStateFromHistory */])(), key = _b.key, state = _b.state;
        if (!key) {
            key = keygen.major();
            window.history.replaceState({ key: key, state: state }, '', path);
        }
        return createLocation(path, key, state);
    }
    function toHref(location) {
        return createPath(location);
    }
    var responseHandler;
    function finalizePush(location) {
        return function () {
            var path = toHref(location);
            var key = location.key, state = location.state;
            window.history.pushState({ key: key, state: state }, '', path);
            browserHistory.location = location;
            browserHistory.action = 'PUSH';
        };
    }
    function finalizeReplace(location) {
        return function () {
            var path = toHref(location);
            var key = location.key, state = location.state;
            window.history.replaceState({ key: key, state: state }, '', path);
            browserHistory.location = location;
            browserHistory.action = 'REPLACE';
        };
    }
    var browserHistory = {
        // set action before location because locationFromBrowser enforces that the location has a key
        action: (Object(__WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["d" /* getStateFromHistory */])().key !== undefined ? 'POP' : 'PUSH'),
        location: locationFromBrowser(),
        // set response handler
        respondWith: function (fn) {
            responseHandler = fn;
            responseHandler({
                location: browserHistory.location,
                action: browserHistory.action,
                finish: function () { },
                cancel: function () { }
            });
        },
        // convenience
        toHref: toHref,
        confirmWith: confirmWith,
        removeConfirmation: removeConfirmation,
        destroy: function destroy() {
            beforeDestroy.forEach(function (fn) { fn(); });
        },
        // navigation
        navigate: function navigate(to) {
            var location = createLocation(to, null);
            var path = createPath(location);
            var currentPath = createPath(browserHistory.location);
            if (path === currentPath) {
                browserHistory.replace(to);
            }
            else {
                browserHistory.push(to);
            }
        },
        push: function push(to) {
            // the major version should be the current key + 1
            var key = keygen.major(browserHistory.location.key);
            var location = createLocation(to, key);
            confirmNavigation({
                to: location,
                from: browserHistory.location,
                action: 'PUSH'
            }, function () {
                if (!responseHandler) {
                    return;
                }
                responseHandler({
                    location: location,
                    action: 'PUSH',
                    finish: finalizePush(location),
                    cancel: function () { }
                });
            });
        },
        replace: function replace(to) {
            // pass the current key to just increment the minor portion
            var key = keygen.minor(browserHistory.location.key);
            var location = createLocation(to, key);
            confirmNavigation({
                to: location,
                from: browserHistory.location,
                action: 'REPLACE'
            }, function () {
                if (!responseHandler) {
                    return;
                }
                responseHandler({
                    location: location,
                    action: 'REPLACE',
                    finish: finalizeReplace(location),
                    cancel: function () { }
                });
            });
        },
        go: function go(num) {
            // Calling window.history.go with no value reloads the page. Instead
            // we will just call the responseHandler with the current location
            if (!num) {
                if (!responseHandler) {
                    return;
                }
                responseHandler({
                    location: browserHistory.location,
                    action: 'POP',
                    finish: function () {
                        browserHistory.action = 'POP';
                    },
                    cancel: function () { }
                });
            }
            else {
                window.history.go(num);
            }
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
            if (!responseHandler) {
                return;
            }
            responseHandler({
                location: location,
                action: 'POP',
                finish: function () {
                    browserHistory.location = location;
                    browserHistory.action = 'POP';
                },
                cancel: function (nextAction) {
                    if (nextAction === 'POP') {
                        return;
                    }
                    reverting = true;
                    window.history.go(-1 * diff);
                }
            });
        }, function () {
            reverting = true;
            window.history.go(-1 * diff);
        });
    }
    // need to listen for browser navigation events
    beforeDestroy.push(Object(__WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["a" /* createEventCoordinator */])({
        popstate: function (event) {
            if (Object(__WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["e" /* ignorablePopstateEvent */])(event)) {
                return;
            }
            pop(event.state);
        }
    }));
    return browserHistory;
}

/* harmony default export */ __webpack_exports__["default"] = (Browser);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__ = __webpack_require__(23);


/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function defaultParseQuery(query) {
    return query ? query : '';
}
function defaultStringifyQuery(query) {
    return query ? query : '';
}
function isValidBase(baseSegment) {
    return (typeof baseSegment === 'string' &&
        baseSegment.charAt(0) === '/' &&
        baseSegment.charAt(baseSegment.length - 1) !== '/');
}
function validateQueryOption(query) {
    return query
        ? query
        : {
            parse: defaultParseQuery,
            stringify: defaultStringifyQuery
        };
}
function locationFactory(options) {
    if (options === void 0) { options = {}; }
    var query = options.query, _a = options.decode, decode = _a === void 0 ? true : _a, _b = options.baseSegment, baseSegment = _b === void 0 ? '' : _b, _c = options.raw, raw = _c === void 0 ? function (p) { return p; } : _c;
    var _d = validateQueryOption(query), parse = _d.parse, stringify = _d.stringify;
    if (baseSegment !== '' && !isValidBase(baseSegment)) {
        throw new Error('The baseSegment "' + baseSegment + '" is not valid.' +
            ' The baseSegment must begin with a forward slash and end with a' +
            ' non-forward slash character.');
    }
    function parsePath(value) {
        var location = {};
        // hash is always after query, so split it off first
        var hashIndex = value.indexOf('#');
        if (hashIndex !== -1) {
            location.hash = value.substring(hashIndex + 1);
            value = value.substring(0, hashIndex);
        }
        else {
            location.hash = '';
        }
        var queryIndex = value.indexOf('?');
        if (queryIndex !== -1) {
            location.query = parse(value.substring(queryIndex + 1));
            value = value.substring(0, queryIndex);
        }
        else {
            location.query = parse();
        }
        location.pathname = Object(__WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__["d" /* stripBaseSegment */])(value, baseSegment);
        return location;
    }
    function createLocation(value, key, state) {
        if (state === void 0) { state = null; }
        var partial;
        if (typeof value === 'string') {
            partial = parsePath(value);
        }
        else {
            partial = __assign({}, value);
            if (partial.hash == null) {
                partial.hash = '';
            }
            if (partial.query == null) {
                partial.query = parse();
            }
            if (partial.pathname == null) {
                partial.pathname = '/';
            }
        }
        // don't set state if it already exists
        if (state && !partial.state) {
            partial.state = state;
        }
        var location = __assign({}, partial, { key: key, rawPathname: raw(partial.pathname) });
        location.key = key;
        location.rawPathname = raw(location.pathname);
        // it can be more convenient to interact with the decoded pathname,
        // but leave the option for using the encoded value
        if (decode) {
            try {
                location.pathname = decodeURI(location.pathname);
            }
            catch (e) {
                throw e instanceof URIError
                    ? new URIError('Pathname "' + location.pathname + '" could not be decoded. ' +
                        'This is most likely due to a bad percent-encoding. For more information, ' +
                        'see the third paragraph here https://tools.ietf.org/html/rfc3986#section-2.4')
                    : e;
            }
        }
        return location;
    }
    function createPath(location) {
        // ensure that pathname begins with a forward slash, query begins
        // with a question mark, and hash begins with a pound sign
        return (baseSegment +
            Object(__WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__["b" /* completePathname */])(location.rawPathname ||
                location.pathname ||
                '') +
            Object(__WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__["c" /* completeQuery */])(stringify(location.query)) +
            Object(__WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__["a" /* completeHash */])(location.hash));
    }
    return {
        createLocation: createLocation,
        createPath: createPath
    };
}

function noop() { }
function createNavigationConfirmation() {
    var confirmFunction;
    function confirmNavigation(info, confirm, prevent) {
        if (!confirmFunction) {
            confirm();
        }
        else {
            confirmFunction(info, confirm, prevent || noop);
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

function createKeyGenerator(initial) {
    var id = initial || 0;
    function parse(key) {
        return key
            .split('.')
            .map(function (value) { return parseInt(value, 10); });
    }
    return {
        keygen: {
            major: function (previous) {
                if (previous) {
                    var major = parse(previous)[0];
                    id = major + 1;
                }
                return id++ + ".0";
            },
            minor: function (current) {
                var _a = parse(current), major = _a[0], minor = _a[1];
                return major + "." + (minor + 1);
            },
            diff: function (first, second) {
                var firstMajor = parse(first)[0];
                var secondMajor = parse(second)[0];
                return secondMajor - firstMajor;
            }
        }
    };
}

function Common$1(options) {
    return __assign({}, locationFactory(options), createNavigationConfirmation(), createKeyGenerator());
}

/* harmony default export */ __webpack_exports__["a"] = (Common$1);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ensureBeginsWith */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return completePathname; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return completeHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return completeQuery; });
/* unused harmony export stripPrefix */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return stripBaseSegment; });
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
    return str.indexOf(prefix) === 0
        ? str.slice(prefix.length)
        : str;
}
function hasBaseSegment(path, prefix) {
    return (new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i')).test(path);
}
function stripBaseSegment(path, prefix) {
    return hasBaseSegment(path, prefix) ? path.substr(prefix.length) : path;
}




/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ensureEncodedPathname; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return domExists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ignorablePopstateEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getStateFromHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createEventCoordinator; });
function ensureEncodedPathname(pathname) {
    var a = document.createElement('a');
    a.setAttribute('href', pathname);
    return a.pathname;
}
function domExists() {
    return !!(window && window.location);
}
/*
 * Ignore popstate events that don't define event.state
 * unless they come from Chrome on iOS (because it emits
 * events where event.state is undefined when you click
 * the back button)
 */
function ignorablePopstateEvent(event) {
    return (event.state === undefined &&
        navigator.userAgent.indexOf('CriOS') === -1);
}
/*
 * IE 11 might throw, so just catch and return empty object when that happens
 */
function getStateFromHistory() {
    try {
        return window.history.state || {};
    }
    catch (e) {
        return {};
    }
}
function createEventCoordinator(events) {
    for (var event_1 in events) {
        var fn = events[event_1];
        window.addEventListener(event_1, fn, false);
    }
    return function destroyEvents() {
        for (var event_2 in events) {
            var fn = events[event_2];
            window.removeEventListener(event_2, fn, false);
        }
    };
}




/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path_to_regexp__);


function registerRoutes(routes, addon, parentData) {
    routes.forEach(function (route) {
        var data = addon.register(route.public, parentData);
        registerRoutes(route.children, addon, data);
    });
}

var withLeadingSlash = function (path) {
    return path.charAt(0) === '/' ? path : '/' + path;
};
var stripLeadingSlash = function (path) {
    return path.charAt(0) === '/' ? path.slice(1) : path;
};
var withTrailingSlash = function (path) {
    return path.charAt(path.length - 1) === '/' ? path : path + '/';
};
var join = function (beginning, end) {
    return withTrailingSlash(beginning) + end;
};

function createPathnameAddon(options) {
    var knownPaths = {};
    var cache = {};
    return {
        name: 'pathname',
        register: function (route, parent) {
            var name = route.name, path = route.path;
            if (knownPaths[name] !== undefined) {
                console.warn('A pathname with the name "' +
                    name +
                    '" already exists. Each route should' +
                    'have a unique name. By registering a pathname with a name that already exists, ' +
                    'you are overwriting the existing pathname. This may break your application.');
            }
            var base;
            if (parent && knownPaths[parent]) {
                base = knownPaths[parent];
            }
            knownPaths[name] = base ? join(base, path) : path;
            return name;
        },
        get: function (name, params) {
            if (knownPaths[name] == null) {
                console.error("Could not generate pathname for " + name + " because it is not registered.");
                return;
            }
            var compile = cache[name]
                ? cache[name]
                : (cache[name] = __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default.a.compile(knownPaths[name]));
            return withLeadingSlash(compile(params, options));
        },
        reset: function () {
            knownPaths = {};
            cache = {};
        }
    };
}

function matchRoute(route, pathname, matches, parentPath) {
    var testPath = stripLeadingSlash(pathname);
    var _a = route.match, re = _a.re, keys = _a.keys, mustBeExact = _a.mustBeExact;
    var children = route.children;
    var match = re.exec(testPath);
    if (!match) {
        return false;
    }
    var segment = match[0], parsed = match.slice(1);
    var params = {};
    keys.forEach(function (key, index) {
        params[key.name] = parsed[index];
    });
    var uriString = parentPath != null ? join(parentPath, segment) : withLeadingSlash(segment);
    matches.push({ route: route, params: params });
    // if there are no children, then we accept the match
    if (!children || !children.length) {
        return true;
    }
    // children only need to match against unmatched segments
    var remainder = testPath.slice(segment.length);
    var notExact = !!remainder.length;
    var hasChildMatch = children.some(function (c) {
        return matchRoute(c, remainder, matches, uriString);
    });
    // if the route has children, but none of them match, remove the match unless it
    // is exact
    if (mustBeExact && notExact && !hasChildMatch) {
        matches.pop();
        return false;
    }
    return true;
}

function parseParams(params, fns) {
    if (!fns) {
        return params;
    }
    var output = {};
    // For each param, attempt to parse it. However, if that
    // fails, fall back to the string value.
    for (var key in params) {
        var value = params[key];
        var fn = fns[key];
        if (fn) {
            try {
                value = fn(value);
            }
            catch (e) {
                console.error(e);
                value = params[key];
            }
        }
        output[key] = value;
    }
    return output;
}
function createResponse(location, routes) {
    var matches = [];
    var partials = [];
    var params = {};
    var route;
    // determine which route(s) match, then use the exact match
    // as the matched route and the rest as partial routes
    routes.some(function (route) { return matchRoute(route, location.pathname, matches); });
    if (matches.length) {
        var bestMatch = matches.pop();
        matches.forEach(function (m) {
            partials.push(m.route.public.name);
            Object.assign(params, parseParams(m.params, m.route.paramParsers));
        });
        route = bestMatch.route;
        Object.assign(params, parseParams(bestMatch.params, route.paramParsers));
    }
    // start building the properties of the response object
    var props = {
        location: location,
        params: params,
        partials: partials,
        status: route != null ? 200 : 404,
        body: undefined,
        data: undefined
    };
    return loadRoute(route, props);
}
/*
 * This will call any initial/every match functions for the matching route
 */
function loadRoute(route, props) {
    if (!route) {
        return Promise.resolve({
            route: route,
            props: props
        });
    }
    var match = route.public.match;
    return Promise.all([
        match.initial ? match.initial() : undefined,
        match.every ? match.every(routeProperties(route, props)) : undefined
    ]).then(function (_a) {
        var initial = _a[0], every = _a[1];
        return {
            route: route,
            props: props,
            error: null,
            resolved: { initial: initial, every: every }
        };
    }, function (err) {
        // when there is an uncaught error, set it on the response
        return {
            route: route,
            props: props,
            error: err,
            resolved: null
        };
    });
}
function responseSetters(props) {
    return {
        redirect: function (to, code) {
            if (code === void 0) { code = 301; }
            props.status = code;
            props.redirectTo = to;
        },
        error: function (err) {
            props.error = err;
        },
        status: function (code) {
            props.status = code;
        },
        data: function (data) {
            props.data = data;
        },
        body: function (body) {
            props.body = body;
        }
    };
}
function routeProperties(route, props) {
    return {
        params: props.params,
        location: props.location,
        name: route.public.name
    };
}
function missProps() {
    return {
        title: ''
    };
}
function freezeResponse(route, props) {
    var response = Object.assign({}, props, { key: props.location.key }, route ? route.responseProps(props) : missProps());
    return response;
}
function finishResponse(pending, addons) {
    var error = pending.error, resolved = pending.resolved, route = pending.route, props = pending.props;
    if (route && route.public.match.response) {
        route.public.match.response({
            error: error,
            resolved: resolved,
            route: routeProperties(route, props),
            set: responseSetters(props),
            addons: addons
        });
    }
    return freezeResponse(route, props);
}

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

function generateTitle(title, props) {
    if (!title) {
        return '';
    }
    return typeof title === 'function' ? title(props.params, props.data) : title;
}
var createRoute = function (options) {
    var name = options.name, path = options.path, _a = options.pathOptions, pathOptions = _a === void 0 ? {} : _a, _b = options.children, descriptorChildren = _b === void 0 ? [] : _b, _c = options.match, match = _c === void 0 ? {} : _c, title = options.title, extra = options.extra, paramParsers = options.params;
    // end defaults to true, so end has to be hardcoded for it to be false
    var mustBeExact = pathOptions.end == null || pathOptions.end;
    var children = [];
    // when we have child routes, we need to perform non-end matching and
    // create route objects for each child
    if (descriptorChildren.length) {
        pathOptions.end = false;
        children = descriptorChildren.map(createRoute);
    }
    var keys = [];
    var re = __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default()(path, keys, pathOptions);
    return {
        public: {
            name: name,
            path: path,
            keys: keys.map(function (key) { return key.name; }),
            match: {
                initial: match.initial && once(match.initial),
                every: match.every,
                response: match.response
            },
            extra: extra
        },
        match: {
            re: re,
            keys: keys,
            mustBeExact: mustBeExact
        },
        children: children,
        paramParsers: paramParsers,
        responseProps: function (props) {
            return {
                name: name,
                title: generateTitle(title, props)
            };
        }
    };
};

function createConfig$1(history, routeArray, options) {
    if (options === void 0) { options = {}; }
    var _a = options, _b = _a.addons, userAddons = _b === void 0 ? [] : _b, _c = _a.sideEffects, sideEffects = _c === void 0 ? [] : _c, cache = _a.cache, pathnameOptions = _a.pathnameOptions;
    var beforeSideEffects = [];
    var afterSideEffects = [];
    sideEffects.forEach(function (se) {
        if (se.after) {
            afterSideEffects.push(se.fn);
        }
        else {
            beforeSideEffects.push(se.fn);
        }
    });
    var routes = [];
    var registeredAddons = {};
    // add the pathname addon to the provided addons
    var allAddons = userAddons.concat(createPathnameAddon(pathnameOptions));
    function setupRoutesAndAddons(routeArray) {
        routes = routeArray.map(createRoute);
        for (var key in registeredAddons) {
            delete registeredAddons[key];
        }
        allAddons.forEach(function (addon) {
            addon.reset();
            registeredAddons[addon.name] = addon.get;
            registerRoutes(routes, addon);
        });
    }
    var responseHandlers = [];
    var oneTimers = [];
    var previous = [];
    function respond(fn, options) {
        if (typeof fn !== 'function') {
            throw new Error('The first argument passed to "respond" must be a function');
        }
        var _a = (options || {}).once, once = _a === void 0 ? false : _a;
        if (once) {
            if (previous.length) {
                fn.apply(null, previous);
            }
            else {
                oneTimers.push(fn);
            }
        }
        else {
            // Always call response handler immediately if a previous
            // response/action exists.
            if (previous.length) {
                fn.apply(null, previous);
            }
            var newLength_1 = responseHandlers.push(fn);
            return function () {
                responseHandlers[newLength_1 - 1] = null;
            };
        }
    }
    function emit(response, action) {
        beforeSideEffects.forEach(function (fn) {
            fn(response, action);
        });
        responseHandlers.forEach(function (fn) {
            if (fn != null) {
                fn(response, action);
            }
        });
        // calling one time responseHandlers after regular responseHandlers
        // ensures that those are called prior to the one time fns
        while (oneTimers.length) {
            var fn = oneTimers.pop();
            fn(response, action);
        }
        afterSideEffects.forEach(function (fn) {
            fn(response, action);
        });
    }
    var activeResponse;
    function navigationHandler(pendingNav) {
        if (activeResponse) {
            activeResponse.cancel(pendingNav.action);
            activeResponse.cancelled = true;
        }
        activeResponse = pendingNav;
        if (cache) {
            var cachedResponse = cache.get(pendingNav.location);
            if (cachedResponse != null) {
                cacheAndEmit(cachedResponse, pendingNav.action);
            }
        }
        createResponse(pendingNav.location, routes).then(function (pendingResponse) {
            if (pendingNav.cancelled) {
                return;
            }
            pendingNav.finish();
            var response = finishResponse(pendingResponse, registeredAddons);
            cacheAndEmit(response, pendingNav.action);
        });
    }
    function cacheAndEmit(response, action) {
        activeResponse = undefined;
        if (cache) {
            cache.set(response);
        }
        emit(response, action);
        previous = [response, action];
        if (response.redirectTo) {
            history.replace(response.redirectTo);
        }
    }
    // now that everything is defined, actually do the setup
    setupRoutesAndAddons(routeArray);
    history.respondWith(navigationHandler);
    return {
        addons: registeredAddons,
        history: history,
        respond: respond,
        refresh: setupRoutesAndAddons
    };
}

/* harmony default export */ __webpack_exports__["default"] = (createConfig$1);


/***/ }),
/* 26 */
/***/ (function(module, exports) {

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/'
var DEFAULT_DELIMITERS = './'

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
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
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
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER
  var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS
  var pathEscaped = false
  var res

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      pathEscaped = true
      continue
    }

    var prev = ''
    var next = str[index]
    var name = res[2]
    var capture = res[3]
    var group = res[4]
    var modifier = res[5]

    if (!pathEscaped && path.length) {
      var k = path.length - 1

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k]
        path = path.slice(0, k)
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
      pathEscaped = false
    }

    var partial = prev !== '' && next !== undefined && next !== prev
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = prev || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    })
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index))
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

  return function (data, options) {
    var path = ''
    var encode = (options && options.encode) || encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token
        continue
      }

      var value = data ? data[token.name] : undefined
      var segment

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) continue

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value))

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment
        continue
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix

        continue
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
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
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  if (!keys) return path

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
        pattern: null
      })
    }
  }

  return path
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options))
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER)
  var delimiters = options.delimiters || DEFAULT_DELIMITERS
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
  var route = ''
  var isEndDelimited = false

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.repeat
        ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*'
        : token.pattern

      if (keys) keys.push(token)

      if (token.optional) {
        if (token.partial) {
          route += prefix + '(' + capture + ')?'
        } else {
          route += '(?:' + prefix + '(' + capture + '))?'
        }
      } else {
        route += prefix + '(' + capture + ')'
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + delimiter + ')?'

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')'
  } else {
    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?'
    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys)
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
  }

  return stringToRegexp(/** @type {string} */ (path), keys, options)
}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(4);
var invariant = __webpack_require__(5);
var warning = __webpack_require__(10);
var assign = __webpack_require__(28);

var ReactPropTypesSecret = __webpack_require__(6);
var checkPropTypes = __webpack_require__(29);

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
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
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
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
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

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(5);
  var warning = __webpack_require__(10);
  var ReactPropTypesSecret = __webpack_require__(6);
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
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(4);
var invariant = __webpack_require__(5);
var ReactPropTypesSecret = __webpack_require__(6);

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
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
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

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
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

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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
  callee: true,
  arguments: true,
  arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
};


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function createTitleSideEffect(options) {
    var _a = options || {}, _b = _a.prefix, prefix = _b === void 0 ? '' : _b, _c = _a.suffix, suffix = _c === void 0 ? '' : _c;
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
function createScrollSideEffect() {
    return function (response, action) {
        if (action === 'POP') {
            return;
        }
        // we want to wait to scroll until after the re-render,
        // so we use setTimeout to push this onto the event loop
        setTimeout(function () {
            var hash = response.location.hash;
            if (hash !== '') {
                var element = document.getElementById(hash);
                if (element && element.scrollIntoView) {
                    element.scrollIntoView();
                    return;
                }
            }
            // if there is no hash, no element matching the hash,
            // or the browser doesn't support, we will just scroll
            // to the top of the page
            window.scrollTo(0, 0);
        }, 0);
    };
}

/* harmony default export */ __webpack_exports__["default"] = (createScrollSideEffect);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function acceptableRouteName(name, response, partial) {
    return name === response.name || !!(partial && response.partials.some(function (n) { return name === n; }));
}
function createActiveAddon() {
    var routeParams = {};
    return {
        name: 'active',
        register: function (route, parentKeys) {
            var name = route.name, keys = route.keys;
            if (keys == null) {
                keys = [];
            }
            var fullKeys = Array.isArray(parentKeys)
                ? parentKeys.concat(keys) : keys;
            if (routeParams[name] !== undefined) {
                console.warn('A route function with the name "' +
                    name +
                    '" already exists. Each route should' +
                    'have a unique name. By registering a route function with a name that already exists, ' +
                    'you are overwriting the existing one. This may break your application.');
            }
            routeParams[name] = fullKeys;
            return fullKeys;
        },
        get: function (name, response, params, partial) {
            if (routeParams[name] == null || !acceptableRouteName(name, response, partial)) {
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
        },
        reset: function () {
            routeParams = {};
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
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _Home = _interopRequireDefault(__webpack_require__(37));

var _PackageList = _interopRequireDefault(__webpack_require__(45));

var _ExampleList = _interopRequireDefault(__webpack_require__(47));

var _tutorials = __webpack_require__(15);

var _guides = __webpack_require__(16);

var _packages = __webpack_require__(11);

var _examples = _interopRequireDefault(__webpack_require__(8));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// components that are not code split
function caught(error) {
  console.error('Failed to load module for:', name, err);
  return function () {
    return _react.default.createElement("div", null, "Sorry, something went wrong...");
  };
}

var _default = [{
  name: 'Home',
  path: '',
  match: {
    response: function response(_ref) {
      var set = _ref.set;
      set.body(_Home.default);
    }
  },
  title: 'Curi'
}, {
  name: 'Tutorial',
  path: 'tutorial/:name',
  match: {
    initial: function initial() {
      return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 52)).then(function (module) {
        return module.default;
      }, caught);
    },
    response: function response(_ref2) {
      var resolved = _ref2.resolved,
          set = _ref2.set;
      set.body(resolved.initial);
    }
  },
  title: function title(_ref3) {
    var name = _ref3.name;
    var data = _tutorials.byName[name];
    return !data ? 'Tutorial Not Found' : "Tutorial ".concat(data.displayName);
  }
}, {
  name: 'Guide',
  path: 'guides/:slug/',
  match: {
    initial: function initial() {
      return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 53)).then(function (module) {
        return module.default;
      }, caught);
    },
    response: function response(_ref4) {
      var route = _ref4.route,
          resolved = _ref4.resolved,
          set = _ref4.set;
      set.body(resolved.initial);
      var guide = _guides.byName[route.params.slug];

      if (guide) {
        set.data(guide);
      }
    }
  },
  title: function title(params, data) {
    return "".concat(data ? data.name : 'Unknown', " Guide");
  }
}, {
  name: 'Packages',
  path: 'packages',
  match: {
    response: function response(_ref5) {
      var set = _ref5.set;
      set.body(_PackageList.default);
    }
  },
  title: 'Curi Packages',
  children: [{
    name: 'Package',
    path: '@curi/:package/',
    match: {
      initial: function initial() {
        return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 54)).then(function (module) {
          return module.default;
        }, caught);
      },
      response: function response(_ref6) {
        var route = _ref6.route,
            resolved = _ref6.resolved,
            set = _ref6.set;
        set.body(resolved.initial);
        var pkg = _packages.byName[route.params.package];

        if (pkg) {
          set.data(pkg);
        }
      }
    },
    title: function title(params) {
      return "@curi/".concat(params.package);
    }
  }]
}, {
  name: 'Examples',
  path: 'examples',
  match: {
    response: function response(_ref7) {
      var set = _ref7.set;
      set.body(_ExampleList.default);
    }
  },
  title: 'Examples',
  children: [{
    name: 'Example',
    path: ':category/:slug/',
    match: {
      initial: function initial() {
        return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 55)).then(function (module) {
          return module.default;
        }, caught);
      },
      response: function response(_ref8) {
        var route = _ref8.route,
            resolved = _ref8.resolved,
            set = _ref8.set;
        set.body(resolved.initial);
        var _route$params = route.params,
            category = _route$params.category,
            slug = _route$params.slug;

        var example = _examples.default.find(category, slug);

        if (example) {
          set.data(example);
        }
      }
    },
    title: function title(params, data) {
      return "".concat(data ? data.name : 'Unknown', " Example");
    }
  }]
}];
exports.default = _default;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _PrismBlocks = __webpack_require__(2);

var _react2 = __webpack_require__(1);

var _Banner = _interopRequireDefault(__webpack_require__(40));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement("div", null, _react.default.createElement(_Banner.default, null), _react.default.createElement("div", {
    className: "features"
  }, _react.default.createElement("h2", null, "Features"), _react.default.createElement("div", {
    className: "feature"
  }, _react.default.createElement("h3", null, "Framework Integration"), _react.default.createElement("p", null, "While Curi is a universal router, it still has to be integrated with whichever framework you are using to render your application. Currently, there are packages to easily use Curi with React and Vue applications (as well as one that provides basic Svelte support)."), _react.default.createElement("div", {
    className: "code"
  }, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("p", null, "You can attach a ", _react.default.createElement(_PrismBlocks.InlineJS, null, "body"), " property to response object. Generally, this attached value should be a function or component (this would vary based on how your framework renders), but it can be anything you want it to be.")), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// routes.js\nimport User from './components/User';\n\nconst routes = [\n  // ...\n  {\n    name: 'User',\n    path: 'u/:userID',\n    match: {\n      response: ({ set }) => {\n        set.body(User);\n      }\n    }\n  }\n];")), _react.default.createElement("p", null, "Links are used for navigating between locations within an application. Links handle URI formatting for you, all you have to do is know the name (and parameters) of the route that you want to link to."), _react.default.createElement("div", {
    className: "code"
  }, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/react"), " package provides a ", _react.default.createElement(_PrismBlocks.InlineComponent, null, "Link"), ' ', "component for rendering links in React applications.")), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "import Link from '@curi/react-link';\n\nconst NavLinks = () => (\n  <div>\n    <Link to='Home'>Home</Link>\n    <Link to='User' params={{ userID: 4 }}>\n      User Four\n    </Link>\n  </div>\n);")), _react.default.createElement("div", {
    className: "code"
  }, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("p", null, "With Vue, you register Curi using a Vue plugin from the", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi/vue"), " package. That plugin will make the", ' ', _react.default.createElement(_PrismBlocks.InlineComponent, null, "curi-link"), " component available to use in your application.")), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "html"
  }, "<!-- NavLinks.html -->\n<div>\n  <curi-link to='Home'>Home</curi-link>\n  <curi-link to='User' :params=\"{ userID: 4 }\">\n    User Four\n  </curi-link>\n</div>"))), _react.default.createElement("div", {
    className: "feature"
  }, _react.default.createElement("h3", null, "Response Objects"), _react.default.createElement("p", null, "Whenever the location changes (and on initial load), Curi will generate a response object with data based on the matching route. The properties of this object are what you can use to render your application. You can learn more about these in the", ' ', _react.default.createElement(_react2.Link, {
    to: "Guide",
    params: {
      slug: 'responses'
    }
  }, "rendering with responses"), ' ', "guide."), _react.default.createElement("div", {
    className: "code"
  }, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("p", null, "The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "body"), " property is the return value from the matching route's ", _react.default.createElement(_PrismBlocks.InlineJS, null, "body"), " function.")), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "{\n  key: '123',\n  location: { pathname: '/u/456', ... },\n  status: 200,\n  name: 'User',\n  body: function() { return ... },\n  params: { userID: '456' },\n  ...\n}")), _react.default.createElement("div", {
    className: "code"
  }, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("p", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "data"), " can contain values that you load using a route's", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "match.every"), " function. The response won't be be generated until after the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match.every"), " function has resolved, so if you use this property, you don't have to render a bunch of loading spinners or empty content while waiting for the data to be loaded.")), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "{\n  ...,\n  data: {\n    username: 'curi',\n    id: '234235',\n    color: '#222233'\n  }\n}"))), _react.default.createElement("div", {
    className: "feature"
  }, _react.default.createElement("h3", null, "Expressive Route Matching with ", _react.default.createElement(_PrismBlocks.InlineJS, null, "path-to-regexp")), _react.default.createElement("p", null, "Curi uses", ' ', _react.default.createElement("a", {
    href: "https://github.com/pillarjs/path-to-regexp"
  }, "path-to-regexp"), ' ', "to define route paths. This allows you to define route parameters that will be parsed from the URI and added to the response object (when the route matches)."), _react.default.createElement("div", {
    className: "code"
  }, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("p", null, "In the accompanying example code, when the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "User"), " route matches, the response object's ", _react.default.createElement(_PrismBlocks.InlineJS, null, "params"), " object will have an ", _react.default.createElement(_PrismBlocks.InlineJS, null, "id"), " property whose value is parsed from the URI."), _react.default.createElement("p", null, _react.default.createElement(_PrismBlocks.InlineJS, null, "path-to-regexp"), " offers a number of matching options, which you can learn more about from", ' ', _react.default.createElement("a", {
    href: "https://github.com/pillarjs/path-to-regexp"
  }, "its documentation"), ".")), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const routes = [\n  {\n    name: 'User',\n    // when the User route matches, the \"id\"\n    // value will be parsed from the pathname\n    // and placed in the \"params\" property of\n    // the response\n    path: 'u/:id'\n  }\n];"))), _react.default.createElement("div", {
    className: "feature"
  }, _react.default.createElement("h3", null, "Route Nesting"), _react.default.createElement("div", {
    className: "code"
  }, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("p", null, "For nested routes, you only have to define the additional URI segments. Those will automatically be joined with any ancestor routes for you. If any ancestor routes have path parameters, those will be included in the response's ", _react.default.createElement(_PrismBlocks.InlineJS, null, "params"), " object.")), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const routes = [\n  {\n    name: 'Album',\n    path: 'a/:albumID',\n    match: {\n      response: ({ set }) => {\n        set.body(Album);\n      }\n    },\n    children: [\n      {\n        name: 'Song',\n        path: ':songID',\n        match: {\n          response: ({ set }) => {\n            set.body(Song);\n          }\n        }\n      }\n    ]\n  }\n]")), _react.default.createElement("div", {
    className: "code"
  }, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("p", null, "Given the above example routes, when a user visits the URI", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "/a/4815/162342"), ", we will get the following response object. The ", _react.default.createElement(_PrismBlocks.InlineJS, null, "partials"), " array contains the ancestor route", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "\"Song\""), ", which makes it easy to identify \"active\" ancestor routes.")), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "// pathname = '/a/4815/162342'\n{\n  body: Song,\n  params: { albumID: '4815', songID: '162342' },\n  name: 'Song',\n  partials: ['Album'],\n  ...\n}\n"))), _react.default.createElement("div", {
    className: "feature"
  }, _react.default.createElement("h3", null, "Navigation Powered by ", _react.default.createElement(_PrismBlocks.InlineJS, null, "hickory")), _react.default.createElement("p", null, "Curi integrates with the", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/hickory"
  }, _react.default.createElement(_PrismBlocks.InlineJS, null, "hickory")), ' ', "package to make navigation within your application very easy."), _react.default.createElement("div", {
    className: "code"
  }, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("p", null, "Choose between the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "browser"), ", ", _react.default.createElement(_PrismBlocks.InlineJS, null, "hash"), ", and", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "in-memory"), " history types (depending on your environment).")), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import Browser from '@hickory/browser';\nimport Hash from '@hickory/hash';\nimport InMemory form '@hickory/in-memory';")), _react.default.createElement("div", {
    className: "code"
  }, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("p", null, "Programmatically navigate using ", _react.default.createElement(_PrismBlocks.InlineJS, null, "push"), ",", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "replace"), ", and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "navigate"), " (a combination of push and replace that replicates how anchors work).")), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const history = Browser();\nhistory.push({ pathname: '/login' });\nhistory.replace({ pathname: '/profile' });\nhistory.navigate({ pathname: '/album/934' });")), _react.default.createElement("div", {
    className: "code"
  }, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("p", null, "Of course, you never have to actually generate pathnames yourself. Curi's built-in ", _react.default.createElement(_PrismBlocks.InlineJS, null, "pathname"), " addon will generate pathnames given the name of a route (and any of that route's parameters). This addon is used by the various link components to generate", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "anchor"), " attributes.")), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const routes = [\n  { name: 'Album', path: 'a/:albumID' }\n];\nconst config = createConfig(history, routes);\nconst pathname = config.addons.pathname(\n  'Album',\n  { albumID: '3490' }\n);\nhistory.navigate({ pathname });"))), _react.default.createElement("div", {
    className: "feature"
  }, _react.default.createElement("h3", null, "Code Splitting"), _react.default.createElement("div", {
    className: "code"
  }, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("p", null, "Use the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match.initial"), " and ", _react.default.createElement(_PrismBlocks.InlineJS, null, "match.response"), ' ', "functions to add code splitting at your routes."), _react.default.createElement("p", null, _react.default.createElement("strong", null, "Note:"), " This relies on a bundler like Webpack."), _react.default.createElement("p", null, "You can learn more about this with the", ' ', _react.default.createElement(_react2.Link, {
    to: "Guide",
    params: {
      slug: 'code-splitting'
    }
  }, "code splitting"), ' ', "guide.")), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "const routes = [\n  {\n    name: 'User',\n    path: 'users/:userID',\n    match: {\n      initial: () => (\n        import('./components/User')\n          .then(module => module.default)\n      ),\n      response: ({ resolved, set }) => {\n        set.body(resolved.initial);\n      }\n    }\n  }\n  ...,\n]"))), _react.default.createElement("div", {
    className: "feature"
  }, _react.default.createElement("h3", null, "Server Side Rendering"), _react.default.createElement("div", {
    className: "code"
  }, _react.default.createElement("div", {
    className: "description"
  }, _react.default.createElement("p", null, "Server side rendering is pretty much the same as client side rendering. The main difference is that you will use an in-memory history instead of a browser history.")), _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "import InMemory from '@hickory/in-memory';\n\nfunction requestHandler(req, resp) {\n  // create a history using the requested location\n  const history = InMemory({\n    locations: [req.url]\n  });\n  const config = createConfig(history, routes);\n\n  config.respond((response) => {\n    // render the markup. This will vary based on\n    // your rendering library, but here we'll\n    use React\n    const markup = renderToString(\n      <CuriBase\n        response={response}\n        config={config}\n        render={render}\n      />\n    );\n\n    // insert the generated HTML into the full\n    // HTML of the page and send the response\n    res.send(fullPageHtml(markup));\n  }, { once: true });\n}")))));
};

exports.default = _default;

/***/ }),
/* 38 */
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true,
})

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ("value" in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

var _react = __webpack_require__(0)

var _react2 = _interopRequireDefault(_react)

var _propTypes = __webpack_require__(9)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
} /* global Prism */

var PrismCode = (function(_PureComponent) {
  _inherits(PrismCode, _PureComponent)

  function PrismCode() {
    var _ref

    var _temp, _this, _ret

    _classCallCheck(this, PrismCode)

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        (_ref =
          PrismCode.__proto__ || Object.getPrototypeOf(PrismCode)).call.apply(
          _ref,
          [this].concat(args)
        )
      )),
      _this)),
      (_this._handleRefMount = function(domNode) {
        _this._domNode = domNode
      }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    )
  }

  _createClass(PrismCode, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        this._hightlight()
      },
    },
    {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this._hightlight()
      },
    },
    {
      key: "_hightlight",
      value: function _hightlight() {
        Prism.highlightElement(this._domNode, this.props.async)
      },
    },
    {
      key: "render",
      value: function render() {
        var _props = this.props,
          className = _props.className,
          Wrapper = _props.component,
          children = _props.children

        return _react2.default.createElement(
          Wrapper,
          { ref: this._handleRefMount, className: className },
          children
        )
      },
    },
  ])

  return PrismCode
})(_react.PureComponent)

PrismCode.propTypes = {
  async: _propTypes.PropTypes.bool,
  className: _propTypes.PropTypes.string,
  children: _propTypes.PropTypes.any,
  component: _propTypes.PropTypes.node,
}
PrismCode.defaultProps = {
  component: "code",
}
exports.default = PrismCode


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _ReactBanner = _interopRequireDefault(__webpack_require__(41));

var _VueBanner = _interopRequireDefault(__webpack_require__(42));

var _GenericBanner = _interopRequireDefault(__webpack_require__(43));

var _SvelteBanner = _interopRequireDefault(__webpack_require__(44));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Banner =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Banner, _React$Component);

  function Banner() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Banner);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Banner.__proto__ || Object.getPrototypeOf(Banner)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_this, "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        lib: 'Any'
      }
    }), Object.defineProperty(_this, "setActive", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(lib) {
        _this.setState({
          lib: lib
        });
      }
    }), _temp));
  }

  _createClass(Banner, [{
    key: "render",
    value: function render() {
      var lib = this.state.lib;
      var BannerComponent = _GenericBanner.default;

      if (lib === 'React') {
        BannerComponent = _ReactBanner.default;
      } else if (lib === 'Vue') {
        BannerComponent = _VueBanner.default;
      } else if (lib === 'Svelte') {
        BannerComponent = _SvelteBanner.default;
      }

      return _react.default.createElement("div", {
        className: "banner"
      }, _react.default.createElement("h1", null, "Curi"), _react.default.createElement("p", null, "A universal JavaScript single-page application router."), _react.default.createElement("div", {
        className: "banner-buttons"
      }, _react.default.createElement(BannerButton, {
        name: "Any",
        setActive: this.setActive,
        active: lib === 'Any'
      }), _react.default.createElement(BannerButton, {
        name: "React",
        setActive: this.setActive,
        active: lib === 'React'
      }), _react.default.createElement(BannerButton, {
        name: "Vue",
        setActive: this.setActive,
        active: lib === 'Vue'
      }), _react.default.createElement(BannerButton, {
        name: "Svelte",
        setActive: this.setActive,
        active: lib === 'Svelte'
      })), _react.default.createElement(BannerComponent, null), _react.default.createElement("p", null, "Ready to learn more? Check out the", ' ', _react.default.createElement(_react2.Link, {
        to: "Guide",
        params: {
          slug: 'getting-started'
        }
      }, "getting started"), ' ', "guide."));
    }
  }]);

  return Banner;
}(_react.default.Component);

var BannerButton = function BannerButton(_ref2) {
  var name = _ref2.name,
      active = _ref2.active,
      setActive = _ref2.setActive;
  return _react.default.createElement("button", {
    className: active ? 'active' : '',
    onClick: function onClick() {
      setActive(name);
    }
  }, name);
};

var _default = Banner;
exports.default = _default;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _PrismBlocks = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactBanner = function ReactBanner() {
  return _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "jsx"
  }, "import React from 'react';\nimport ReactDOM from 'react-dom';\n\nimport Browser from '@hickory/browser';\nimport createConfig from '@curi/core';\nimport { CuriBase } from '@curi/react';\n\n// create your history object\nconst history = Browser();\n\n// define your routes\nconst routes = [\n  { name: 'Home', path: '', ... },\n  { name: 'User', path: 'u/:userID', ... },\n  ...\n];\n\n// create your Curi configuration object\nconst config = createConfig(history, routes);\n\nconst root = document.getElementById('root');\n// subscribe to the config object with a function\n// that will be called whenever the location changes\nconfig.respond((response) => {\n  ReactDOM.render((\n    <CuriBase\n      response={response}\n      config={config}\n      render={response => {\n        return <response.body />;\n      }}\n    />\n  ), root);\n});");
};

var _default = ReactBanner;
exports.default = _default;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _PrismBlocks = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VueBanner = function VueBanner() {
  return _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import Vue from 'vue';\n\nimport Browser from '@hickory/browser';\nimport { installCuri } from '@curi/vue';\nimport createConfig from '@curi/core';\nimport App from './components/App';\n\n// create your history object\nconst history = Browser();\n\n// define your routes\nconst routes = [\n  { name: 'Home', path: '', ... },\n  { name: 'User', path: 'u/:userID', ... },\n  ...\n];\n\n// create your Curi configuration object\nconst config = createConfig(history, routes);\n\n// install the CuriPlugin to your Vue instance\ninstallCuri(Vue, config);\n\n// use the \"once: true\" option of config.respond\n// for the initial render\nconfig.respond(() => {\n  const vm = new Vue({\n    el: '#root',\n    template: '<app />',\n    components: { app: App }\n  });\n}, { once: true });");
};

var _default = VueBanner;
exports.default = _default;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _PrismBlocks = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GenericBanner = function GenericBanner() {
  return _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import Browser from '@hickory/browser';\nimport createConfig from '@curi/core';\n\n// create your history object\nconst history = Browser();\n\n// define your routes\nconst routes = [\n  { name: 'Home', path: '', ... },\n  { name: 'User', path: 'u/:userID', ... },\n  ...\n];\n\n// create your Curi configuration object\nconst config = createConfig(history, routes);\n\n// subscribe to the config object with a function\n// that will be called whenever the location changes\nconfig.respond((response, action) => {\n  // handle any rendering inside of this function\n});");
};

var _default = GenericBanner;
exports.default = _default;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _PrismBlocks = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvelteBanner = function SvelteBanner() {
  return _react.default.createElement(_PrismBlocks.PrismBlock, {
    lang: "javascript"
  }, "import Browser from '@hickory/browser';\nimport createConfig from '@curi/core';\nimport { setConfig } from '@curi/svelte';\n\n// create your history object\nconst history = Browser();\n\n// define your routes\nconst routes = [\n  { name: 'Home', path: '', ... },\n  { name: 'User', path: 'u/:userID', ... },\n  ...\n];\n\n// create your Curi configuration object\nconst config = createConfig(history, routes);\n\n// Use setConfig so that the @curi/svelte components\n// can interact with the configuration object.\nsetConfig(config);\n\nlet view;\nconst root = document.getElementById('root');\n\n// subscribe to the config object with a function\n// that will be called whenever the location changes\nconfig.respond((response) => {\n  if (view) {\n    view.destroy();\n  } else {\n    root.innerHTML = '';\n  }\n\n  view = new response.body({\n    target: root,\n    data: { response }\n  });\n});");
};

var _default = SvelteBanner;
exports.default = _default;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _PackageLinks = _interopRequireDefault(__webpack_require__(14));

var _Messages = __webpack_require__(13);

var _PrismBlocks = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement("div", null, _react.default.createElement("h1", null, "Curi Packages"), _react.default.createElement("p", null, "Curi is split into a number of different packages that you can pick and choose from in order to only use what you need. You will always need the", ' ', _react.default.createElement(_react2.Link, {
    to: "Package",
    params: {
      package: 'core'
    }
  }, "core"), ' ', "package, but no other package is necessary."), _react.default.createElement(_Messages.Note, null, "All of the Curi packages are scoped under ", _react.default.createElement(_PrismBlocks.InlineJS, null, "@curi"), ". For example, to install the ", _react.default.createElement(_PrismBlocks.InlineJS, null, "core"), ", you would call", ' ', _react.default.createElement(_PrismBlocks.InlineJS, null, "npm install @curi/core"), "."), _react.default.createElement("div", null, _react.default.createElement("h2", null, "List of Official Packages"), _react.default.createElement(_PackageLinks.default, null)));
};

exports.default = _default;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// this file is automatically generated using scripts/updatePackageVersions.js
var _default = {
  "addon-active": "1.0.0-beta.5",
  "addon-ancestors": "1.0.0-beta.5",
  "addon-prefetch": "1.0.0-beta.6",
  "core": "1.0.0-beta.22",
  "react": "1.0.0-beta.14",
  "redux": "1.0.0-beta.1",
  "side-effect-scroll": "1.0.0-beta.6",
  "side-effect-title": "1.0.0-beta.8",
  "svelte": "1.0.0-beta.1",
  "vue": "1.0.0-beta.11"
};
exports.default = _default;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _ExampleTiles = _interopRequireDefault(__webpack_require__(48));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement("div", null, _react.default.createElement("h1", null, "Curi Examples"), _react.default.createElement("p", null, "These are some Curi example projects that you can use for reference while building your own application. Most of these examples have CodeSandbox demos embedded with them, but some do not. Each example includes source code available through the Curi package", ' ', _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi/tree/master/examples"
  }, "on GitHub"), "."), _react.default.createElement(_ExampleTiles.default, null));
};

exports.default = _default;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

var _examples = _interopRequireDefault(__webpack_require__(8));

var _Sections = __webpack_require__(12);

var _styleActive = _interopRequireDefault(__webpack_require__(7));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Category = function Category(_ref) {
  var name = _ref.name,
      examples = _ref.examples;
  return _react.default.createElement("ul", {
    className: "tiles"
  }, examples.map(function (example) {
    return _react.default.createElement("li", {
      key: "".concat(example.category, "/").concat(example.slug),
      className: "tile"
    }, _react.default.createElement(_react2.Link, {
      to: "Example",
      params: {
        category: example.category,
        slug: example.slug
      },
      active: {
        merge: _styleActive.default
      }
    }, _react.default.createElement("h2", null, example.name), _react.default.createElement("p", {
      className: "description"
    }, example.description)));
  }));
};

var _default = function _default() {
  var examples = _examples.default.all();

  var categories = Object.keys(examples);
  return _react.default.createElement("div", null, _react.default.createElement("ul", null, categories.map(function (key) {
    return _react.default.createElement("li", {
      key: key
    }, _react.default.createElement(_react2.Link, {
      details: {
        hash: key
      }
    }, key));
  })), categories.map(function (key) {
    return _react.default.createElement(_Sections.Section, {
      title: key,
      id: key,
      key: key
    }, _react.default.createElement(Category, {
      name: key,
      examples: examples[key]
    }));
  }));
};

exports.default = _default;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _react = _interopRequireDefault(__webpack_require__(0));

var _Header = _interopRequireDefault(__webpack_require__(50));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(response, action, config) {
  if (!response || !response.body) {
    return null;
  } else {
    var Body = response.body,
        params = response.params,
        data = response.data;
    return _react.default.createElement("div", null, _react.default.createElement(_Header.default, null), _react.default.createElement("main", null, _react.default.createElement(Body, {
      params: params,
      data: data
    })));
  }
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _Nav = _interopRequireDefault(__webpack_require__(51));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement("header", null, _react.default.createElement(_Nav.default, null));
};

exports.default = _default;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _react2 = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement("nav", null, _react.default.createElement("ul", null, _react.default.createElement("li", null, _react.default.createElement(_react2.Link, {
    to: "Home",
    className: "home-link"
  }, "Curi")), _react.default.createElement("li", null, _react.default.createElement(_react2.Link, {
    to: "Packages"
  }, "Packages")), _react.default.createElement("li", null, _react.default.createElement(_react2.Link, {
    to: "Tutorial",
    params: {
      name: '01-introduction'
    }
  }, "Tutorial")), _react.default.createElement("li", null, _react.default.createElement(_react2.Link, {
    to: "Guide",
    params: {
      slug: 'getting-started'
    }
  }, "Guides")), _react.default.createElement("li", null, _react.default.createElement(_react2.Link, {
    to: "Examples"
  }, "Examples")), _react.default.createElement("li", null, _react.default.createElement("a", {
    href: "https://github.com/pshrmn/curi"
  }, "GitHub"))));
};

exports.default = _default;

/***/ })
/******/ ]);