/******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // identity function for calling harmony imports with the correct context
  /******/
  /******/ /******/ __webpack_require__.i = function(value) {
    return value;
  }; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter
        /******/
      });
      /******/
    }
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 24));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function(module, exports) {
      module.exports = React;

      /***/
    },
    /* 1 */
    /***/ function(module, exports) {
      // shim for using process in browser
      var process = (module.exports = {});

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
      }
      function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
      }
      (function() {
        try {
          if (typeof setTimeout === "function") {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === "function") {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if (
          (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
          setTimeout
        ) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
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
        if (
          (cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) &&
          clearTimeout
        ) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
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
        while (len) {
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

      process.nextTick = function(fun) {
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
      Item.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      process.title = "browser";
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ""; // empty string to avoid regexp issues
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

      process.listeners = function(name) {
        return [];
      };

      process.binding = function(name) {
        throw new Error("process.binding is not supported");
      };

      process.cwd = function() {
        return "/";
      };
      process.chdir = function(dir) {
        throw new Error("process.chdir is not supported");
      };
      process.umask = function() {
        return 0;
      };

      /***/
    },
    /* 2 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "propTypes",
        function() {
          return propTypes;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "PropTypes",
        function() {
          return propTypes;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "onError",
        function() {
          return onError;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "observer",
        function() {
          return observer;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "Observer",
        function() {
          return Observer;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "renderReporter",
        function() {
          return renderReporter;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "componentByNodeRegistery",
        function() {
          return componentByNodeRegistery;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "trackComponents",
        function() {
          return trackComponents;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "useStaticRendering",
        function() {
          return useStaticRendering;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "Provider",
        function() {
          return Provider;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "inject",
        function() {
          return inject;
        }
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mobx__ = __webpack_require__(
        9
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(
        0
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_react__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(
        7
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_2_react_dom__
      );

      // These functions can be stubbed out in specific environments
      var unstable_batchedUpdates$1 = undefined;

      var _typeof =
        typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
          ? function(obj) {
              return typeof obj;
            }
          : function(obj) {
              return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
            };

      var asyncGenerator = (function() {
        function AwaitValue(value) {
          this.value = value;
        }

        function AsyncGenerator(gen) {
          var front, back;

          function send(key, arg) {
            return new Promise(function(resolve, reject) {
              var request = {
                key: key,
                arg: arg,
                resolve: resolve,
                reject: reject,
                next: null
              };

              if (back) {
                back = back.next = request;
              } else {
                front = back = request;
                resume(key, arg);
              }
            });
          }

          function resume(key, arg) {
            try {
              var result = gen[key](arg);
              var value = result.value;

              if (value instanceof AwaitValue) {
                Promise.resolve(value.value).then(
                  function(arg) {
                    resume("next", arg);
                  },
                  function(arg) {
                    resume("throw", arg);
                  }
                );
              } else {
                settle(result.done ? "return" : "normal", result.value);
              }
            } catch (err) {
              settle("throw", err);
            }
          }

          function settle(type, value) {
            switch (type) {
              case "return":
                front.resolve({
                  value: value,
                  done: true
                });
                break;

              case "throw":
                front.reject(value);
                break;

              default:
                front.resolve({
                  value: value,
                  done: false
                });
                break;
            }

            front = front.next;

            if (front) {
              resume(front.key, front.arg);
            } else {
              back = null;
            }
          }

          this._invoke = send;

          if (typeof gen.return !== "function") {
            this.return = undefined;
          }
        }

        if (typeof Symbol === "function" && Symbol.asyncIterator) {
          AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
            return this;
          };
        }

        AsyncGenerator.prototype.next = function(arg) {
          return this._invoke("next", arg);
        };

        AsyncGenerator.prototype.throw = function(arg) {
          return this._invoke("throw", arg);
        };

        AsyncGenerator.prototype.return = function(arg) {
          return this._invoke("return", arg);
        };

        return {
          wrap: function(fn) {
            return function() {
              return new AsyncGenerator(fn.apply(this, arguments));
            };
          },
          await: function(value) {
            return new AwaitValue(value);
          }
        };
      })();

      var classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };

      var createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();

      var inherits = function(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      };

      var possibleConstructorReturn = function(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }

        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      };

      var EventEmitter = (function() {
        function EventEmitter() {
          classCallCheck(this, EventEmitter);
          this.listeners = [];
        }

        createClass(EventEmitter, [
          {
            key: "on",
            value: function on(cb) {
              var _this = this;

              this.listeners.push(cb);
              return function() {
                var index = _this.listeners.indexOf(cb);
                if (index !== -1) _this.listeners.splice(index, 1);
              };
            }
          },
          {
            key: "emit",
            value: function emit(data) {
              this.listeners.forEach(function(fn) {
                return fn(data);
              });
            }
          }
        ]);
        return EventEmitter;
      })();

      /**
       * Copyright 2015, Yahoo! Inc.
       * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
       */
      ("use strict");

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

      var defineProperty$1 = Object.defineProperty;
      var getOwnPropertyNames = Object.getOwnPropertyNames;
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      var getPrototypeOf = Object.getPrototypeOf;
      var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

      var hoistNonReactStatics = function hoistNonReactStatics(
        targetComponent,
        sourceComponent,
        blacklist
      ) {
        if (typeof sourceComponent !== "string") {
          // don't hoist over string (html) components

          if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
              hoistNonReactStatics(
                targetComponent,
                inheritedComponent,
                blacklist
              );
            }
          }

          var keys = getOwnPropertyNames(sourceComponent);

          if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
          }

          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (
              !REACT_STATICS[key] &&
              !KNOWN_STATICS[key] &&
              (!blacklist || !blacklist[key])
            ) {
              var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
              try {
                // Avoid failures from read-only properties
                defineProperty$1(targetComponent, key, descriptor);
              } catch (e) {}
            }
          }

          return targetComponent;
        }

        return targetComponent;
      };

      // Copied from React.PropTypes
      function createChainableTypeChecker(validate) {
        function checkType(
          isRequired,
          props,
          propName,
          componentName,
          location,
          propFullName
        ) {
          for (
            var _len = arguments.length,
              rest = Array(_len > 6 ? _len - 6 : 0),
              _key = 6;
            _key < _len;
            _key++
          ) {
            rest[_key - 6] = arguments[_key];
          }

          return __webpack_require__.i(
            __WEBPACK_IMPORTED_MODULE_0_mobx__["c" /* untracked */]
          )(function() {
            componentName = componentName || "<<anonymous>>";
            propFullName = propFullName || propName;
            if (props[propName] == null) {
              if (isRequired) {
                var actual = props[propName] === null ? "null" : "undefined";
                return new Error(
                  "The " +
                    location +
                    " `" +
                    propFullName +
                    "` is marked as required " +
                    "in `" +
                    componentName +
                    "`, but its value is `" +
                    actual +
                    "`."
                );
              }
              return null;
            } else {
              return validate.apply(
                undefined,
                [props, propName, componentName, location, propFullName].concat(
                  rest
                )
              );
            }
          });
        }

        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }

      // Copied from React.PropTypes
      function isSymbol(propType, propValue) {
        // Native Symbol.
        if (propType === "symbol") {
          return true;
        }

        // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }

        // Fallback for non-spec compliant Symbols which are polyfilled.
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }

        return false;
      }

      // Copied from React.PropTypes
      function getPropType(propValue) {
        var propType =
          typeof propValue === "undefined" ? "undefined" : _typeof(propValue);
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          // Old webkits (at least until Android 4.0) return 'function' rather than
          // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
          // passes PropTypes.object.
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }

      // This handles more types than `getPropType`. Only used for error messages.
      // Copied from React.PropTypes
      function getPreciseType(propValue) {
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }

      function createObservableTypeCheckerCreator(allowNativeType, mobxType) {
        return createChainableTypeChecker(function(
          props,
          propName,
          componentName,
          location,
          propFullName
        ) {
          return __webpack_require__.i(
            __WEBPACK_IMPORTED_MODULE_0_mobx__["c" /* untracked */]
          )(function() {
            if (allowNativeType) {
              if (getPropType(props[propName]) === mobxType.toLowerCase())
                return null;
            }
            var mobxChecker = void 0;
            switch (mobxType) {
              case "Array":
                mobxChecker =
                  __WEBPACK_IMPORTED_MODULE_0_mobx__[
                    "d" /* isObservableArray */
                  ];
                break;
              case "Object":
                mobxChecker =
                  __WEBPACK_IMPORTED_MODULE_0_mobx__[
                    "e" /* isObservableObject */
                  ];
                break;
              case "Map":
                mobxChecker =
                  __WEBPACK_IMPORTED_MODULE_0_mobx__["f" /* isObservableMap */];
                break;
              default:
                throw new Error("Unexpected mobxType: " + mobxType);
            }
            var propValue = props[propName];
            if (!mobxChecker(propValue)) {
              var preciseType = getPreciseType(propValue);
              var nativeTypeExpectationMessage = allowNativeType
                ? " or javascript `" + mobxType.toLowerCase() + "`"
                : "";
              return new Error(
                "Invalid prop `" +
                  propFullName +
                  "` of type `" +
                  preciseType +
                  "` supplied to" +
                  " `" +
                  componentName +
                  "`, expected `mobx.Observable" +
                  mobxType +
                  "`" +
                  nativeTypeExpectationMessage +
                  "."
              );
            }
            return null;
          });
        });
      }

      function createObservableArrayOfTypeChecker(
        allowNativeType,
        typeChecker
      ) {
        return createChainableTypeChecker(function(
          props,
          propName,
          componentName,
          location,
          propFullName
        ) {
          for (
            var _len2 = arguments.length,
              rest = Array(_len2 > 5 ? _len2 - 5 : 0),
              _key2 = 5;
            _key2 < _len2;
            _key2++
          ) {
            rest[_key2 - 5] = arguments[_key2];
          }

          return __webpack_require__.i(
            __WEBPACK_IMPORTED_MODULE_0_mobx__["c" /* untracked */]
          )(function() {
            if (typeof typeChecker !== "function") {
              return new Error(
                "Property `" +
                  propFullName +
                  "` of component `" +
                  componentName +
                  "` has " +
                  "invalid PropType notation."
              );
            }
            var error = createObservableTypeCheckerCreator(
              allowNativeType,
              "Array"
            )(props, propName, componentName);
            if (error instanceof Error) return error;
            var propValue = props[propName];
            for (var i = 0; i < propValue.length; i++) {
              error = typeChecker.apply(
                undefined,
                [
                  propValue,
                  i,
                  componentName,
                  location,
                  propFullName + "[" + i + "]"
                ].concat(rest)
              );
              if (error instanceof Error) return error;
            }
            return null;
          });
        });
      }

      var observableArray = createObservableTypeCheckerCreator(false, "Array");
      var observableArrayOf = createObservableArrayOfTypeChecker.bind(
        null,
        false
      );
      var observableMap = createObservableTypeCheckerCreator(false, "Map");
      var observableObject = createObservableTypeCheckerCreator(
        false,
        "Object"
      );
      var arrayOrObservableArray = createObservableTypeCheckerCreator(
        true,
        "Array"
      );
      var arrayOrObservableArrayOf = createObservableArrayOfTypeChecker.bind(
        null,
        true
      );
      var objectOrObservableObject = createObservableTypeCheckerCreator(
        true,
        "Object"
      );

      var propTypes = Object.freeze({
        observableArray: observableArray,
        observableArrayOf: observableArrayOf,
        observableMap: observableMap,
        observableObject: observableObject,
        arrayOrObservableArray: arrayOrObservableArray,
        arrayOrObservableArrayOf: arrayOrObservableArrayOf,
        objectOrObservableObject: objectOrObservableObject
      });

      function isStateless(component) {
        // `function() {}` has prototype, but `() => {}` doesn't
        // `() => {}` via Babel has prototype too.
        return !(component.prototype && component.prototype.render);
      }

      var injectorContextTypes = {
        mobxStores: objectOrObservableObject
      };
      Object.seal(injectorContextTypes);

      var proxiedInjectorProps = {
        contextTypes: {
          get: function get$$1() {
            return injectorContextTypes;
          },
          set: function set$$1(_) {
            console.warn(
              "Mobx Injector: you are trying to attach `contextTypes` on an component decorated with `inject` (or `observer`) HOC. Please specify the contextTypes on the wrapped component instead. It is accessible through the `wrappedComponent`"
            );
          },
          configurable: true,
          enumerable: false
        },
        isMobxInjector: {
          value: true,
          writable: true,
          configurable: true,
          enumerable: true
        }

        /**
         * Store Injection
         */
      };
      function createStoreInjector(grabStoresFn, component, injectNames) {
        var _class, _temp2;

        var displayName =
          "inject-" +
          (component.displayName ||
            component.name ||
            (component.constructor && component.constructor.name) ||
            "Unknown");
        if (injectNames) displayName += "-with-" + injectNames;

        var Injector = ((_temp2 = _class = (function(_Component) {
          inherits(Injector, _Component);

          function Injector() {
            var _ref;

            var _temp, _this, _ret;

            classCallCheck(this, Injector);

            for (
              var _len = arguments.length, args = Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key];
            }

            return (
              (_ret = ((_temp = ((_this = possibleConstructorReturn(
                this,
                (_ref =
                  Injector.__proto__ ||
                  Object.getPrototypeOf(Injector)).call.apply(
                  _ref,
                  [this].concat(args)
                )
              )),
              _this)),
              (_this.storeRef = function(instance) {
                _this.wrappedInstance = instance;
              }),
              _temp)),
              possibleConstructorReturn(_this, _ret)
            );
          }

          createClass(Injector, [
            {
              key: "render",
              value: function render() {
                // Optimization: it might be more efficient to apply the mapper function *outside* the render method
                // (if the mapper is a function), that could avoid expensive(?) re-rendering of the injector component
                // See this test: 'using a custom injector is not too reactive' in inject.js
                var newProps = {};
                for (var key in this.props) {
                  if (this.props.hasOwnProperty(key)) {
                    newProps[key] = this.props[key];
                  }
                }
                var additionalProps =
                  grabStoresFn(
                    this.context.mobxStores || {},
                    newProps,
                    this.context
                  ) || {};
                for (var _key2 in additionalProps) {
                  newProps[_key2] = additionalProps[_key2];
                }

                if (!isStateless(component)) {
                  newProps.ref = this.storeRef;
                }

                return __webpack_require__.i(
                  __WEBPACK_IMPORTED_MODULE_1_react__["createElement"]
                )(component, newProps);
              }
            }
          ]);
          return Injector;
        })(__WEBPACK_IMPORTED_MODULE_1_react__["Component"])),
        (_class.displayName = displayName),
        _temp2);

        // Static fields from component should be visible on the generated Injector

        hoistNonReactStatics(Injector, component);

        Injector.wrappedComponent = component;
        Object.defineProperties(Injector, proxiedInjectorProps);

        return Injector;
      }

      function grabStoresByName(storeNames) {
        return function(baseStores, nextProps) {
          storeNames.forEach(function(storeName) {
            if (
              storeName in nextProps // prefer props over stores
            )
              return;
            if (!(storeName in baseStores))
              throw new Error(
                "MobX injector: Store '" +
                  storeName +
                  "' is not available! Make sure it is provided by some Provider"
              );
            nextProps[storeName] = baseStores[storeName];
          });
          return nextProps;
        };
      }

      /**
       * higher order component that injects stores to a child.
       * takes either a varargs list of strings, which are stores read from the context,
       * or a function that manually maps the available stores from the context to props:
       * storesToProps(mobxStores, props, context) => newProps
       */
      function inject() /* fn(stores, nextProps) or ...storeNames */ {
        var grabStoresFn = void 0;
        if (typeof arguments[0] === "function") {
          grabStoresFn = arguments[0];
          return function(componentClass) {
            var injected = createStoreInjector(grabStoresFn, componentClass);
            injected.isMobxInjector = false; // supress warning
            // mark the Injector as observer, to make it react to expressions in `grabStoresFn`,
            // see #111
            injected = observer(injected);
            injected.isMobxInjector = true; // restore warning
            return injected;
          };
        } else {
          var storeNames = [];
          for (var i = 0; i < arguments.length; i++) {
            storeNames[i] = arguments[i];
          }
          grabStoresFn = grabStoresByName(storeNames);
          return function(componentClass) {
            return createStoreInjector(
              grabStoresFn,
              componentClass,
              storeNames.join("-")
            );
          };
        }
      }

      /**
       * dev tool support
       */
      var isDevtoolsEnabled = false;

      var isUsingStaticRendering = false;

      var warnedAboutObserverInjectDeprecation = false;

      // WeakMap<Node, Object>;
      var componentByNodeRegistery =
        typeof WeakMap !== "undefined" ? new WeakMap() : undefined;
      var renderReporter = new EventEmitter();

      function findDOMNode$2(component) {
        if (__WEBPACK_IMPORTED_MODULE_2_react_dom__["findDOMNode"]) {
          try {
            return __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_2_react_dom__["findDOMNode"]
            )(component);
          } catch (e) {
            // findDOMNode will throw in react-test-renderer, see:
            // See https://github.com/mobxjs/mobx-react/issues/216
            // Is there a better heuristic?
            return null;
          }
        }
        return null;
      }

      function reportRendering(component) {
        var node = findDOMNode$2(component);
        if (node && componentByNodeRegistery)
          componentByNodeRegistery.set(node, component);

        renderReporter.emit({
          event: "render",
          renderTime: component.__$mobRenderEnd - component.__$mobRenderStart,
          totalTime: Date.now() - component.__$mobRenderStart,
          component: component,
          node: node
        });
      }

      function trackComponents() {
        if (typeof WeakMap === "undefined")
          throw new Error(
            "[mobx-react] tracking components is not supported in this browser."
          );
        if (!isDevtoolsEnabled) isDevtoolsEnabled = true;
      }

      function useStaticRendering(useStaticRendering) {
        isUsingStaticRendering = useStaticRendering;
      }

      /**
       * Errors reporter
       */

      var errorsReporter = new EventEmitter();

      /**
       * Utilities
       */

      function patch(target, funcName) {
        var runMixinFirst =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : false;

        var base = target[funcName];
        var mixinFunc = reactiveMixin[funcName];
        var f = !base
          ? mixinFunc
          : runMixinFirst === true
            ? function() {
                mixinFunc.apply(this, arguments);
                base.apply(this, arguments);
              }
            : function() {
                base.apply(this, arguments);
                mixinFunc.apply(this, arguments);
              };

        // MWE: ideally we freeze here to protect against accidental overwrites in component instances, see #195
        // ...but that breaks react-hot-loader, see #231...
        target[funcName] = f;
      }

      function isObjectShallowModified(prev, next) {
        if (
          null == prev ||
          null == next ||
          (typeof prev === "undefined" ? "undefined" : _typeof(prev)) !==
            "object" ||
          (typeof next === "undefined" ? "undefined" : _typeof(next)) !==
            "object"
        ) {
          return prev !== next;
        }
        var keys = Object.keys(prev);
        if (keys.length !== Object.keys(next).length) {
          return true;
        }
        var key = void 0;
        for (var i = keys.length - 1; i >= 0, (key = keys[i]); i--) {
          if (next[key] !== prev[key]) {
            return true;
          }
        }
        return false;
      }

      /**
       * ReactiveMixin
       */
      var reactiveMixin = {
        componentWillMount: function componentWillMount() {
          var _this = this;

          if (isUsingStaticRendering === true) return;
          // Generate friendly name for debugging
          var initialName =
            this.displayName ||
            this.name ||
            (this.constructor &&
              (this.constructor.displayName || this.constructor.name)) ||
            "<component>";
          var rootNodeID =
            this._reactInternalInstance &&
            this._reactInternalInstance._rootNodeID;

          /**
           * If props are shallowly modified, react will render anyway,
           * so atom.reportChanged() should not result in yet another re-render
           */
          var skipRender = false;
          /**
           * forceUpdate will re-assign this.props. We don't want that to cause a loop,
           * so detect these changes
           */
          var isForcingUpdate = false;

          function makePropertyObservableReference(propName) {
            var valueHolder = this[propName];
            var atom = new __WEBPACK_IMPORTED_MODULE_0_mobx__["g" /* Atom */](
              "reactive " + propName
            );
            Object.defineProperty(this, propName, {
              configurable: true,
              enumerable: true,
              get: function get$$1() {
                atom.reportObserved();
                return valueHolder;
              },
              set: function set$$1(v) {
                if (
                  !isForcingUpdate &&
                  isObjectShallowModified(valueHolder, v)
                ) {
                  valueHolder = v;
                  skipRender = true;
                  atom.reportChanged();
                  skipRender = false;
                } else {
                  valueHolder = v;
                }
              }
            });
          }

          // make this.props an observable reference, see #124
          makePropertyObservableReference.call(this, "props");
          // make state an observable reference
          makePropertyObservableReference.call(this, "state");

          // wire up reactive render
          var baseRender = this.render.bind(this);
          var reaction = null;
          var isRenderingPending = false;

          var initialRender = function initialRender() {
            reaction = new __WEBPACK_IMPORTED_MODULE_0_mobx__[
              "h" /* Reaction */
            ](initialName + "#" + rootNodeID + ".render()", function() {
              if (!isRenderingPending) {
                // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
                // This unidiomatic React usage but React will correctly warn about this so we continue as usual
                // See #85 / Pull #44
                isRenderingPending = true;
                if (typeof _this.componentWillReact === "function")
                  _this.componentWillReact(); // TODO: wrap in action?
                if (_this.__$mobxIsUnmounted !== true) {
                  // If we are unmounted at this point, componentWillReact() had a side effect causing the component to unmounted
                  // TODO: remove this check? Then react will properly warn about the fact that this should not happen? See #73
                  // However, people also claim this migth happen during unit tests..
                  var hasError = true;
                  try {
                    isForcingUpdate = true;
                    if (!skipRender)
                      __WEBPACK_IMPORTED_MODULE_1_react__[
                        "Component"
                      ].prototype.forceUpdate.call(_this);
                    hasError = false;
                  } finally {
                    isForcingUpdate = false;
                    if (hasError) reaction.dispose();
                  }
                }
              }
            });
            reaction.reactComponent = _this;
            reactiveRender.$mobx = reaction;
            _this.render = reactiveRender;
            return reactiveRender();
          };

          var reactiveRender = function reactiveRender() {
            isRenderingPending = false;
            var exception = undefined;
            var rendering = undefined;
            reaction.track(function() {
              if (isDevtoolsEnabled) {
                _this.__$mobRenderStart = Date.now();
              }
              try {
                rendering = __WEBPACK_IMPORTED_MODULE_0_mobx__[
                  "i" /* extras */
                ].allowStateChanges(false, baseRender);
              } catch (e) {
                exception = e;
              }
              if (isDevtoolsEnabled) {
                _this.__$mobRenderEnd = Date.now();
              }
            });
            if (exception) {
              errorsReporter.emit(exception);
              throw exception;
            }
            return rendering;
          };

          this.render = initialRender;
        },

        componentWillUnmount: function componentWillUnmount() {
          if (isUsingStaticRendering === true) return;
          this.render.$mobx && this.render.$mobx.dispose();
          this.__$mobxIsUnmounted = true;
          if (isDevtoolsEnabled) {
            var node = findDOMNode$2(this);
            if (node && componentByNodeRegistery) {
              componentByNodeRegistery.delete(node);
            }
            renderReporter.emit({
              event: "destroy",
              component: this,
              node: node
            });
          }
        },

        componentDidMount: function componentDidMount() {
          if (isDevtoolsEnabled) {
            reportRendering(this);
          }
        },

        componentDidUpdate: function componentDidUpdate() {
          if (isDevtoolsEnabled) {
            reportRendering(this);
          }
        },

        shouldComponentUpdate: function shouldComponentUpdate(
          nextProps,
          nextState
        ) {
          if (isUsingStaticRendering) {
            console.warn(
              "[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side."
            );
          }
          // update on any state changes (as is the default)
          if (this.state !== nextState) {
            return true;
          }
          // update if props are shallowly not equal, inspired by PureRenderMixin
          // we could return just 'false' here, and avoid the `skipRender` checks etc
          // however, it is nicer if lifecycle events are triggered like usually,
          // so we return true here if props are shallowly modified.
          return isObjectShallowModified(this.props, nextProps);
        }

        /**
         * Observer function / decorator
         */
      };
      function observer(arg1, arg2) {
        if (typeof arg1 === "string") {
          throw new Error("Store names should be provided as array");
        }
        if (Array.isArray(arg1)) {
          // component needs stores
          if (!warnedAboutObserverInjectDeprecation) {
            warnedAboutObserverInjectDeprecation = true;
            console.warn(
              'Mobx observer: Using observer to inject stores is deprecated since 4.0. Use `@inject("store1", "store2") @observer ComponentClass` or `inject("store1", "store2")(observer(componentClass))` instead of `@observer(["store1", "store2"]) ComponentClass`'
            );
          }
          if (!arg2) {
            // invoked as decorator
            return function(componentClass) {
              return observer(arg1, componentClass);
            };
          } else {
            return inject.apply(null, arg1)(observer(arg2));
          }
        }
        var componentClass = arg1;

        if (componentClass.isMobxInjector === true) {
          console.warn(
            "Mobx observer: You are trying to use 'observer' on a component that already has 'inject'. Please apply 'observer' before applying 'inject'"
          );
        }

        // Stateless function component:
        // If it is function but doesn't seem to be a react class constructor,
        // wrap it to a react class automatically
        if (
          typeof componentClass === "function" &&
          (!componentClass.prototype || !componentClass.prototype.render) &&
          !componentClass.isReactClass &&
          !__WEBPACK_IMPORTED_MODULE_1_react__["Component"].isPrototypeOf(
            componentClass
          )
        ) {
          var _class, _temp;

          return observer(
            ((_temp = _class = (function(_Component) {
              inherits(_class, _Component);

              function _class() {
                classCallCheck(this, _class);
                return possibleConstructorReturn(
                  this,
                  (_class.__proto__ || Object.getPrototypeOf(_class)).apply(
                    this,
                    arguments
                  )
                );
              }

              createClass(_class, [
                {
                  key: "render",
                  value: function render() {
                    return componentClass.call(this, this.props, this.context);
                  }
                }
              ]);
              return _class;
            })(__WEBPACK_IMPORTED_MODULE_1_react__["Component"])),
            (_class.displayName =
              componentClass.displayName || componentClass.name),
            (_class.contextTypes = componentClass.contextTypes),
            (_class.propTypes = componentClass.propTypes),
            (_class.defaultProps = componentClass.defaultProps),
            _temp)
          );
        }

        if (!componentClass) {
          throw new Error("Please pass a valid component to 'observer'");
        }

        var target = componentClass.prototype || componentClass;
        mixinLifecycleEvents(target);
        componentClass.isMobXReactObserver = true;
        return componentClass;
      }

      function mixinLifecycleEvents(target) {
        patch(target, "componentWillMount", true);
        [
          "componentDidMount",
          "componentWillUnmount",
          "componentDidUpdate"
        ].forEach(function(funcName) {
          patch(target, funcName);
        });
        if (!target.shouldComponentUpdate) {
          target.shouldComponentUpdate = reactiveMixin.shouldComponentUpdate;
        }
      }

      // TODO: support injection somehow as well?
      var Observer = observer(function(_ref) {
        var children = _ref.children;
        return children();
      });

      Observer.displayName = "Observer";

      Observer.propTypes = {
        children: function children(
          propValue,
          key,
          componentName,
          location,
          propFullName
        ) {
          if (typeof propValue[key] !== "function")
            return new Error(
              "Invalid prop `" +
                propFullName +
                "` of type `" +
                _typeof(propValue[key]) +
                "` supplied to" +
                " `" +
                componentName +
                "`, expected `function`."
            );
        }
      };

      var _class;
      var _temp;

      var specialReactKeys = { children: true, key: true, ref: true };

      var Provider = ((_temp = _class = (function(_Component) {
        inherits(Provider, _Component);

        function Provider() {
          classCallCheck(this, Provider);
          return possibleConstructorReturn(
            this,
            (Provider.__proto__ || Object.getPrototypeOf(Provider)).apply(
              this,
              arguments
            )
          );
        }

        createClass(Provider, [
          {
            key: "render",
            value: function render() {
              return __WEBPACK_IMPORTED_MODULE_1_react__["Children"].only(
                this.props.children
              );
            }
          },
          {
            key: "getChildContext",
            value: function getChildContext() {
              var stores = {};
              // inherit stores
              var baseStores = this.context.mobxStores;
              if (baseStores)
                for (var key in baseStores) {
                  stores[key] = baseStores[key];
                }
              // add own stores
              for (var _key in this.props) {
                if (
                  !specialReactKeys[_key] &&
                  _key !== "suppressChangedStoreWarning"
                )
                  stores[_key] = this.props[_key];
              }
              return {
                mobxStores: stores
              };
            }
          },
          {
            key: "componentWillReceiveProps",
            value: function componentWillReceiveProps(nextProps) {
              // Maybe this warning is too aggressive?
              if (
                Object.keys(nextProps).length !== Object.keys(this.props).length
              )
                console.warn(
                  "MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children"
                );
              if (!nextProps.suppressChangedStoreWarning)
                for (var key in nextProps) {
                  if (
                    !specialReactKeys[key] &&
                    this.props[key] !== nextProps[key]
                  )
                    console.warn(
                      "MobX Provider: Provided store '" +
                        key +
                        "' has changed. Please avoid replacing stores as the change might not propagate to all children"
                    );
                }
            }
          }
        ]);
        return Provider;
      })(__WEBPACK_IMPORTED_MODULE_1_react__["Component"])),
      (_class.contextTypes = {
        mobxStores: objectOrObservableObject
      }),
      (_class.childContextTypes = {
        mobxStores: objectOrObservableObject.isRequired
      }),
      _temp);

      if (!__WEBPACK_IMPORTED_MODULE_1_react__["Component"])
        throw new Error("mobx-react requires React to be available");
      if (!__WEBPACK_IMPORTED_MODULE_0_mobx__["i" /* extras */])
        throw new Error("mobx-react requires mobx to be available");

      if (
        typeof __WEBPACK_IMPORTED_MODULE_2_react_dom__[
          "unstable_batchedUpdates"
        ] === "function"
      )
        __WEBPACK_IMPORTED_MODULE_0_mobx__[
          "i" /* extras */
        ].setReactionScheduler(
          __WEBPACK_IMPORTED_MODULE_2_react_dom__["unstable_batchedUpdates"]
        );
      else if (typeof unstable_batchedUpdates$1 === "function")
        __WEBPACK_IMPORTED_MODULE_0_mobx__[
          "i" /* extras */
        ].setReactionScheduler(unstable_batchedUpdates$1);

      var onError = function onError(fn) {
        return errorsReporter.on(fn);
      };

      /* DevTool support */
      // See: https://github.com/andykog/mobx-devtools/blob/d8976c24b8cb727ed59f9a0bc905a009df79e221/src/backend/installGlobalHook.js

      if (
        (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "undefined"
          ? "undefined"
          : _typeof(__MOBX_DEVTOOLS_GLOBAL_HOOK__)) === "object"
      ) {
        var mobx$1 = {
          spy: __WEBPACK_IMPORTED_MODULE_0_mobx__["j" /* spy */],
          extras: __WEBPACK_IMPORTED_MODULE_0_mobx__["i" /* extras */]
        };
        var mobxReact = {
          renderReporter: renderReporter,
          componentByNodeRegistery: componentByNodeRegistery,
          trackComponents: trackComponents
        };
        __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobxReact(mobxReact, mobx$1);
      }

      /***/
    },
    /* 3 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "Active",
        function() {
          return Active;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "Block",
        function() {
          return Block;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "curious",
        function() {
          return curious;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "Link",
        function() {
          return Link;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "CuriBase",
        function() {
          return CuriBase;
        }
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(
        0
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_react__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(
        32
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_prop_types__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant__ = __webpack_require__(
        26
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_2_invariant__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hoist_non_react_statics__ = __webpack_require__(
        25
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hoist_non_react_statics___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_3_hoist_non_react_statics__
      );

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

      var extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };

      function __extends(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype =
          b === null
            ? Object.create(b)
            : ((__.prototype = b.prototype), new __());
      }

      var __assign =
        Object.assign ||
        function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };

      function __rest(s, e) {
        var t = {};
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (
            var i = 0, p = Object.getOwnPropertySymbols(s);
            i < p.length;
            i++
          )
            if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
        return t;
      }

      var Active = /** @class */ (function(_super) {
        __extends(Active, _super);
        function Active() {
          return (_super !== null && _super.apply(this, arguments)) || this;
        }
        Active.prototype.componentWillMount = function() {
          this.verifyActiveAddon();
        };
        Active.prototype.verifyActiveAddon = function() {
          var curi = this.props.curi || this.context.curi.router;
          __WEBPACK_IMPORTED_MODULE_2_invariant___default()(
            curi.addons.active,
            'You are attempting to use the "active" prop, but have not included the "active" ' +
              "addon (curi-addon-active) in your Curi router."
          );
        };
        Active.prototype.render = function() {
          var curi = this.props.curi || this.context.curi.router;
          var response = this.props.response || this.context.curi.response;
          var _a = this.props,
            extra = _a.extra,
            merge = _a.merge,
            _b = _a.partial,
            partial = _b === void 0 ? false : _b,
            name = _a.name,
            params = _a.params,
            details = _a.details,
            children = _a.children;
          return curi.addons.active(name, response, params, partial) &&
            (extra ? extra(response.location, details) : true)
            ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(
                children,
                merge(__assign({}, children.props))
              )
            : children;
        };
        Active.contextTypes = {
          curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
            router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
            response: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
          })
        };
        return Active;
      })(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

      var Block = /** @class */ (function(_super) {
        __extends(Block, _super);
        function Block() {
          return (_super !== null && _super.apply(this, arguments)) || this;
        }
        Block.prototype.on = function() {
          var curi = this.props.curi || this.context.curi.router;
          curi.history.confirmWith(this.props.confirm);
        };
        Block.prototype.off = function() {
          var curi = this.props.curi || this.context.curi.router;
          curi.history.removeConfirmation();
        };
        Block.prototype.componentDidMount = function() {
          if (this.props.active) {
            this.on();
          }
        };
        Block.prototype.componentDidUpdate = function(prevProps) {
          if (
            this.props.active === prevProps.active &&
            this.props.confirm === prevProps.confirm
          ) {
            return;
          }
          this.off();
          if (this.props.active) {
            this.on();
          }
        };
        Block.prototype.componentWillUnmount = function() {
          this.off();
        };
        Block.prototype.render = function() {
          return null;
        };
        Block.contextTypes = {
          curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
            router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
          })
        };
        Block.defaultProps = {
          active: true
        };
        return Block;
      })(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

      function curious(WrappedComponent) {
        var CuriousComponent = function(props, context) {
          var internalRef = props.internalRef,
            rest = __rest(props, ["internalRef"]);
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            WrappedComponent,
            __assign(
              { router: context.curi.router, response: context.curi.response },
              rest,
              { ref: internalRef }
            )
          );
        };
        CuriousComponent.displayName =
          "curious(" +
          (WrappedComponent.displayName || WrappedComponent.name) +
          ")";
        CuriousComponent.contextTypes = {
          curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
            router:
              __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
                .isRequired,
            response:
              __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
                .isRequired,
            action: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
          }).isRequired
        };
        return __WEBPACK_IMPORTED_MODULE_3_hoist_non_react_statics___default()(
          CuriousComponent,
          WrappedComponent
        );
      }

      var canNavigate = function(event) {
        return (
          !event.defaultPrevented &&
          event.button === 0 &&
          !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
        );
      };
      var Link = /** @class */ (function(_super) {
        __extends(Link, _super);
        function Link() {
          var _this =
            (_super !== null && _super.apply(this, arguments)) || this;
          _this.clickHandler = function(event) {
            if (_this.props.onClick) {
              _this.props.onClick(event);
            }
            if (canNavigate(event) && !_this.props.target) {
              event.preventDefault();
              var curi = _this.props.curi || _this.context.curi.router;
              var pathname = _this.state.pathname;
              var _a = _this.props,
                to = _a.to,
                params = _a.params,
                _b = _a.details,
                details = _b === void 0 ? {} : _b;
              var location_1 = __assign({}, details, { pathname: pathname });
              curi.history.navigate(location_1);
            }
          };
          return _this;
        }
        Link.prototype.createPathname = function(props, context) {
          var to = props.to,
            params = props.params;
          var curi = props.curi || context.curi.router;
          var response = props.response || context.curi.response;
          var pathname =
            to != null
              ? curi.addons.pathname(to, params)
              : response.location.pathname;
          this.setState(function() {
            return {
              pathname: pathname
            };
          });
        };
        Link.prototype.componentWillMount = function() {
          this.createPathname(this.props, this.context);
          if (this.props.active) {
            this.verifyActiveAddon();
          }
        };
        Link.prototype.componentWillReceiveProps = function(
          nextProps,
          nextContext
        ) {
          this.createPathname(nextProps, nextContext);
          if (nextProps.active) {
            this.verifyActiveAddon();
          }
        };
        Link.prototype.verifyActiveAddon = function() {
          var curi = this.props.curi || this.context.curi.router;
          __WEBPACK_IMPORTED_MODULE_2_invariant___default()(
            curi.addons.active,
            'You are attempting to use the "active" prop, but have not included the "active" ' +
              "addon (@curi/addon-active) in your Curi router."
          );
        };
        Link.prototype.render = function() {
          var _a = this.props,
            to = _a.to,
            params = _a.params,
            details = _a.details,
            onClick = _a.onClick,
            active = _a.active,
            anchor = _a.anchor,
            rest = __rest(_a, [
              "to",
              "params",
              "details",
              "onClick",
              "active",
              "anchor"
            ]);
          var curi = this.props.curi || this.context.curi.router;
          var response = this.props.response || this.context.curi.response;
          var anchorProps = rest;
          var Anchor = anchor ? anchor : "a";
          if (active) {
            var partial = active.partial,
              merge = active.merge,
              extra = active.extra;
            var isActive =
              curi.addons.active(to, response, params, partial) &&
              (extra ? extra(response.location, details) : true);
            if (isActive) {
              anchorProps = merge(anchorProps);
            }
          }
          var pathname = this.state.pathname;
          var href = curi.history.toHref(
            __assign({}, details, { pathname: pathname })
          );
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            Anchor,
            __assign({}, anchorProps, {
              onClick: this.clickHandler,
              href: href
            })
          );
        };
        Link.contextTypes = {
          curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
            router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
            response: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
          })
        };
        return Link;
      })(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

      var CuriBase = /** @class */ (function(_super) {
        __extends(CuriBase, _super);
        function CuriBase() {
          return (_super !== null && _super.apply(this, arguments)) || this;
        }
        CuriBase.prototype.getChildContext = function() {
          return {
            curi: {
              router: this.props.router,
              response: this.props.response,
              action: this.props.action
            }
          };
        };
        CuriBase.prototype.render = function() {
          return this.props.render(
            this.props.response,
            this.props.action,
            this.props.router
          );
        };
        CuriBase.childContextTypes = {
          curi: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
            router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
            response: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
            action: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
          })
        };
        CuriBase.defaultProps = {
          action: "POP"
        };
        return CuriBase;
      })(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

      /***/
    },
    /* 4 */
    /***/ function(module, exports, __webpack_require__) {
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
        return function() {
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
      emptyFunction.thatReturnsThis = function() {
        return this;
      };
      emptyFunction.thatReturnsArgument = function(arg) {
        return arg;
      };

      module.exports = emptyFunction;

      /***/
    },
    /* 5 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
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

        if (process.env.NODE_ENV !== "production") {
          validateFormat = function validateFormat(format) {
            if (format === undefined) {
              throw new Error("invariant requires an error message argument");
            }
          };
        }

        function invariant(condition, format, a, b, c, d, e, f) {
          validateFormat(format);

          if (!condition) {
            var error;
            if (format === undefined) {
              error = new Error(
                "Minified exception occurred; use the non-minified dev environment " +
                  "for the full error message and additional helpful warnings."
              );
            } else {
              var args = [a, b, c, d, e, f];
              var argIndex = 0;
              error = new Error(
                format.replace(/%s/g, function() {
                  return args[argIndex++];
                })
              );
              error.name = "Invariant Violation";
            }

            error.framesToPop = 1; // we don't care about invariant's own frame
            throw error;
          }
        }

        module.exports = invariant;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(1)));

      /***/
    },
    /* 6 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */

      var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";

      module.exports = ReactPropTypesSecret;

      /***/
    },
    /* 7 */
    /***/ function(module, exports) {
      module.exports = ReactDOM;

      /***/
    },
    /* 8 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
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

        if (process.env.NODE_ENV !== "production") {
          var printWarning = function printWarning(format) {
            for (
              var _len = arguments.length,
                args = Array(_len > 1 ? _len - 1 : 0),
                _key = 1;
              _key < _len;
              _key++
            ) {
              args[_key - 1] = arguments[_key];
            }

            var argIndex = 0;
            var message =
              "Warning: " +
              format.replace(/%s/g, function() {
                return args[argIndex++];
              });
            if (typeof console !== "undefined") {
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
              throw new Error(
                "`warning(condition, format, ...args)` requires a warning " +
                  "message argument"
              );
            }

            if (format.indexOf("Failed Composite propType: ") === 0) {
              return; // Ignore CompositeComponent proptype check.
            }

            if (!condition) {
              for (
                var _len2 = arguments.length,
                  args = Array(_len2 > 2 ? _len2 - 2 : 0),
                  _key2 = 2;
                _key2 < _len2;
                _key2++
              ) {
                args[_key2 - 2] = arguments[_key2];
              }

              printWarning.apply(undefined, [format].concat(args));
            }
          };
        }

        module.exports = warning;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(1)));

      /***/
    },
    /* 9 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(global) {
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "i",
          function() {
            return extras;
          }
        );
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "h",
          function() {
            return Reaction;
          }
        );
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "c",
          function() {
            return untracked;
          }
        );
        /* unused harmony export IDerivationState */
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "g",
          function() {
            return Atom;
          }
        );
        /* unused harmony export BaseAtom */
        /* unused harmony export useStrict */
        /* unused harmony export isStrictModeEnabled */
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "j",
          function() {
            return spy;
          }
        );
        /* unused harmony export comparer */
        /* unused harmony export asReference */
        /* unused harmony export asFlat */
        /* unused harmony export asStructure */
        /* unused harmony export asMap */
        /* unused harmony export isModifierDescriptor */
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "e",
          function() {
            return isObservableObject;
          }
        );
        /* unused harmony export isBoxedObservable */
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "d",
          function() {
            return isObservableArray;
          }
        );
        /* unused harmony export ObservableMap */
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "f",
          function() {
            return isObservableMap;
          }
        );
        /* unused harmony export map */
        /* unused harmony export transaction */
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "a",
          function() {
            return observable;
          }
        );
        /* unused harmony export computed */
        /* unused harmony export isObservable */
        /* unused harmony export isComputed */
        /* unused harmony export extendObservable */
        /* unused harmony export extendShallowObservable */
        /* unused harmony export observe */
        /* unused harmony export intercept */
        /* unused harmony export autorun */
        /* unused harmony export autorunAsync */
        /* unused harmony export when */
        /* unused harmony export reaction */
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "b",
          function() {
            return action;
          }
        );
        /* unused harmony export isAction */
        /* unused harmony export runInAction */
        /* unused harmony export expr */
        /* unused harmony export toJS */
        /* unused harmony export createTransformer */
        /* unused harmony export whyRun */
        /* unused harmony export isArrayLike */
        /** MobX - (c) Michel Weststrate 2015, 2016 - MIT Licensed */
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

        var extendStatics =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(d, b) {
              d.__proto__ = b;
            }) ||
          function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          };

        function __extends(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        }

        /**
         * Anything that can be used to _store_ state is an Atom in mobx. Atoms have two important jobs
         *
         * 1) detect when they are being _used_ and report this (using reportObserved). This allows mobx to make the connection between running functions and the data they used
         * 2) they should notify mobx whenever they have _changed_. This way mobx can re-run any functions (derivations) that are using this atom.
         */
        var BaseAtom = (function() {
          /**
           * Create a new atom. For debugging purposes it is recommended to give it a name.
           * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
           */
          function BaseAtom(name) {
            if (name === void 0) {
              name = "Atom@" + getNextId();
            }
            this.name = name;
            this.isPendingUnobservation = true; // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed
            this.observers = [];
            this.observersIndexes = {};
            this.diffValue = 0;
            this.lastAccessedBy = 0;
            this.lowestObserverState = IDerivationState.NOT_TRACKING;
          }
          BaseAtom.prototype.onBecomeUnobserved = function() {
            // noop
          };
          /**
           * Invoke this method to notify mobx that your atom has been used somehow.
           */
          BaseAtom.prototype.reportObserved = function() {
            reportObserved(this);
          };
          /**
           * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
           */
          BaseAtom.prototype.reportChanged = function() {
            startBatch();
            propagateChanged(this);
            endBatch();
          };
          BaseAtom.prototype.toString = function() {
            return this.name;
          };
          return BaseAtom;
        })();
        var Atom = (function(_super) {
          __extends(Atom, _super);
          /**
           * Create a new atom. For debugging purposes it is recommended to give it a name.
           * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
           */
          function Atom(
            name,
            onBecomeObservedHandler,
            onBecomeUnobservedHandler
          ) {
            if (name === void 0) {
              name = "Atom@" + getNextId();
            }
            if (onBecomeObservedHandler === void 0) {
              onBecomeObservedHandler = noop;
            }
            if (onBecomeUnobservedHandler === void 0) {
              onBecomeUnobservedHandler = noop;
            }
            var _this = _super.call(this, name) || this;
            _this.name = name;
            _this.onBecomeObservedHandler = onBecomeObservedHandler;
            _this.onBecomeUnobservedHandler = onBecomeUnobservedHandler;
            _this.isPendingUnobservation = false; // for effective unobserving.
            _this.isBeingTracked = false;
            return _this;
          }
          Atom.prototype.reportObserved = function() {
            startBatch();
            _super.prototype.reportObserved.call(this);
            if (!this.isBeingTracked) {
              this.isBeingTracked = true;
              this.onBecomeObservedHandler();
            }
            endBatch();
            return !!globalState.trackingDerivation;
            // return doesn't really give useful info, because it can be as well calling computed which calls atom (no reactions)
            // also it could not trigger when calculating reaction dependent on Atom because Atom's value was cached by computed called by given reaction.
          };
          Atom.prototype.onBecomeUnobserved = function() {
            this.isBeingTracked = false;
            this.onBecomeUnobservedHandler();
          };
          return Atom;
        })(BaseAtom);
        var isAtom = createInstanceofPredicate("Atom", BaseAtom);

        function hasInterceptors(interceptable) {
          return (
            interceptable.interceptors && interceptable.interceptors.length > 0
          );
        }
        function registerInterceptor(interceptable, handler) {
          var interceptors =
            interceptable.interceptors || (interceptable.interceptors = []);
          interceptors.push(handler);
          return once(function() {
            var idx = interceptors.indexOf(handler);
            if (idx !== -1) interceptors.splice(idx, 1);
          });
        }
        function interceptChange(interceptable, change) {
          var prevU = untrackedStart();
          try {
            var interceptors = interceptable.interceptors;
            if (interceptors)
              for (var i = 0, l = interceptors.length; i < l; i++) {
                change = interceptors[i](change);
                invariant(
                  !change || change.type,
                  "Intercept handlers should return nothing or a change object"
                );
                if (!change) break;
              }
            return change;
          } finally {
            untrackedEnd(prevU);
          }
        }

        function hasListeners(listenable) {
          return (
            listenable.changeListeners && listenable.changeListeners.length > 0
          );
        }
        function registerListener(listenable, handler) {
          var listeners =
            listenable.changeListeners || (listenable.changeListeners = []);
          listeners.push(handler);
          return once(function() {
            var idx = listeners.indexOf(handler);
            if (idx !== -1) listeners.splice(idx, 1);
          });
        }
        function notifyListeners(listenable, change) {
          var prevU = untrackedStart();
          var listeners = listenable.changeListeners;
          if (!listeners) return;
          listeners = listeners.slice();
          for (var i = 0, l = listeners.length; i < l; i++) {
            listeners[i](change);
          }
          untrackedEnd(prevU);
        }

        function isSpyEnabled() {
          return !!globalState.spyListeners.length;
        }
        function spyReport(event) {
          if (!globalState.spyListeners.length) return;
          var listeners = globalState.spyListeners;
          for (var i = 0, l = listeners.length; i < l; i++) listeners[i](event);
        }
        function spyReportStart(event) {
          var change = objectAssign({}, event, { spyReportStart: true });
          spyReport(change);
        }
        var END_EVENT = { spyReportEnd: true };
        function spyReportEnd(change) {
          if (change) spyReport(objectAssign({}, change, END_EVENT));
          else spyReport(END_EVENT);
        }
        function spy(listener) {
          globalState.spyListeners.push(listener);
          return once(function() {
            var idx = globalState.spyListeners.indexOf(listener);
            if (idx !== -1) globalState.spyListeners.splice(idx, 1);
          });
        }

        function iteratorSymbol() {
          return (
            (typeof Symbol === "function" && Symbol.iterator) || "@@iterator"
          );
        }
        var IS_ITERATING_MARKER = "__$$iterating";
        function arrayAsIterator(array) {
          // returning an array for entries(), values() etc for maps was a mis-interpretation of the specs..,
          // yet it is quite convenient to be able to use the response both as array directly and as iterator
          // it is suboptimal, but alas...
          invariant(
            array[IS_ITERATING_MARKER] !== true,
            "Illegal state: cannot recycle array as iterator"
          );
          addHiddenFinalProp(array, IS_ITERATING_MARKER, true);
          var idx = -1;
          addHiddenFinalProp(array, "next", function next() {
            idx++;
            return {
              done: idx >= this.length,
              value: idx < this.length ? this[idx] : undefined
            };
          });
          return array;
        }
        function declareIterator(prototType, iteratorFactory) {
          addHiddenFinalProp(prototType, iteratorSymbol(), iteratorFactory);
        }

        var MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859
        // Detects bug in safari 9.1.1 (or iOS 9 safari mobile). See #364
        var safariPrototypeSetterInheritanceBug = (function() {
          var v = false;
          var p = {};
          Object.defineProperty(p, "0", {
            set: function() {
              v = true;
            }
          });
          Object.create(p)["0"] = 1;
          return v === false;
        })();
        /**
         * This array buffer contains two lists of properties, so that all arrays
         * can recycle their property definitions, which significantly improves performance of creating
         * properties on the fly.
         */
        var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
        // Typescript workaround to make sure ObservableArray extends Array
        var StubArray = (function() {
          function StubArray() {}
          return StubArray;
        })();
        function inherit(ctor, proto) {
          if (typeof Object["setPrototypeOf"] !== "undefined") {
            Object["setPrototypeOf"](ctor.prototype, proto);
          } else if (typeof ctor.prototype.__proto__ !== "undefined") {
            ctor.prototype.__proto__ = proto;
          } else {
            ctor["prototype"] = proto;
          }
        }
        inherit(StubArray, Array.prototype);
        // Weex freeze Array.prototype
        // Make them writeable and configurable in prototype chain
        // https://github.com/alibaba/weex/pull/1529
        if (Object.isFrozen(Array)) {
          [
            "constructor",
            "push",
            "shift",
            "concat",
            "pop",
            "unshift",
            "replace",
            "find",
            "findIndex",
            "splice",
            "reverse",
            "sort"
          ].forEach(function(key) {
            Object.defineProperty(StubArray.prototype, key, {
              configurable: true,
              writable: true,
              value: Array.prototype[key]
            });
          });
        }
        var ObservableArrayAdministration = (function() {
          function ObservableArrayAdministration(name, enhancer, array, owned) {
            this.array = array;
            this.owned = owned;
            this.values = [];
            this.lastKnownLength = 0;
            this.interceptors = null;
            this.changeListeners = null;
            this.atom = new BaseAtom(name || "ObservableArray@" + getNextId());
            this.enhancer = function(newV, oldV) {
              return enhancer(newV, oldV, name + "[..]");
            };
          }
          ObservableArrayAdministration.prototype.dehanceValue = function(
            value
          ) {
            if (this.dehancer !== undefined) return this.dehancer(value);
            return value;
          };
          ObservableArrayAdministration.prototype.dehanceValues = function(
            values
          ) {
            if (this.dehancer !== undefined) return values.map(this.dehancer);
            return values;
          };
          ObservableArrayAdministration.prototype.intercept = function(
            handler
          ) {
            return registerInterceptor(this, handler);
          };
          ObservableArrayAdministration.prototype.observe = function(
            listener,
            fireImmediately
          ) {
            if (fireImmediately === void 0) {
              fireImmediately = false;
            }
            if (fireImmediately) {
              listener({
                object: this.array,
                type: "splice",
                index: 0,
                added: this.values.slice(),
                addedCount: this.values.length,
                removed: [],
                removedCount: 0
              });
            }
            return registerListener(this, listener);
          };
          ObservableArrayAdministration.prototype.getArrayLength = function() {
            this.atom.reportObserved();
            return this.values.length;
          };
          ObservableArrayAdministration.prototype.setArrayLength = function(
            newLength
          ) {
            if (typeof newLength !== "number" || newLength < 0)
              throw new Error("[mobx.array] Out of range: " + newLength);
            var currentLength = this.values.length;
            if (newLength === currentLength) return;
            else if (newLength > currentLength) {
              var newItems = new Array(newLength - currentLength);
              for (var i = 0; i < newLength - currentLength; i++)
                newItems[i] = undefined; // No Array.fill everywhere...
              this.spliceWithArray(currentLength, 0, newItems);
            } else this.spliceWithArray(newLength, currentLength - newLength);
          };
          // adds / removes the necessary numeric properties to this object
          ObservableArrayAdministration.prototype.updateArrayLength = function(
            oldLength,
            delta
          ) {
            if (oldLength !== this.lastKnownLength)
              throw new Error(
                "[mobx] Modification exception: the internal structure of an observable array was changed. Did you use peek() to change it?"
              );
            this.lastKnownLength += delta;
            if (
              delta > 0 &&
              oldLength + delta + 1 > OBSERVABLE_ARRAY_BUFFER_SIZE
            )
              reserveArrayBuffer(oldLength + delta + 1);
          };
          ObservableArrayAdministration.prototype.spliceWithArray = function(
            index,
            deleteCount,
            newItems
          ) {
            var _this = this;
            checkIfStateModificationsAreAllowed(this.atom);
            var length = this.values.length;
            if (index === undefined) index = 0;
            else if (index > length) index = length;
            else if (index < 0) index = Math.max(0, length + index);
            if (arguments.length === 1) deleteCount = length - index;
            else if (deleteCount === undefined || deleteCount === null)
              deleteCount = 0;
            else
              deleteCount = Math.max(0, Math.min(deleteCount, length - index));
            if (newItems === undefined) newItems = [];
            if (hasInterceptors(this)) {
              var change = interceptChange(this, {
                object: this.array,
                type: "splice",
                index: index,
                removedCount: deleteCount,
                added: newItems
              });
              if (!change) return EMPTY_ARRAY;
              deleteCount = change.removedCount;
              newItems = change.added;
            }
            newItems = newItems.map(function(v) {
              return _this.enhancer(v, undefined);
            });
            var lengthDelta = newItems.length - deleteCount;
            this.updateArrayLength(length, lengthDelta); // create or remove new entries
            var res = this.spliceItemsIntoValues(index, deleteCount, newItems);
            if (deleteCount !== 0 || newItems.length !== 0)
              this.notifyArraySplice(index, newItems, res);
            return this.dehanceValues(res);
          };
          ObservableArrayAdministration.prototype.spliceItemsIntoValues = function(
            index,
            deleteCount,
            newItems
          ) {
            if (newItems.length < MAX_SPLICE_SIZE) {
              return (_a = this.values).splice.apply(
                _a,
                [index, deleteCount].concat(newItems)
              );
            } else {
              var res = this.values.slice(index, index + deleteCount);
              this.values = this.values
                .slice(0, index)
                .concat(newItems, this.values.slice(index + deleteCount));
              return res;
            }
            var _a;
          };
          ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function(
            index,
            newValue,
            oldValue
          ) {
            var notifySpy = !this.owned && isSpyEnabled();
            var notify = hasListeners(this);
            var change =
              notify || notifySpy
                ? {
                    object: this.array,
                    type: "update",
                    index: index,
                    newValue: newValue,
                    oldValue: oldValue
                  }
                : null;
            if (notifySpy) spyReportStart(change);
            this.atom.reportChanged();
            if (notify) notifyListeners(this, change);
            if (notifySpy) spyReportEnd();
          };
          ObservableArrayAdministration.prototype.notifyArraySplice = function(
            index,
            added,
            removed
          ) {
            var notifySpy = !this.owned && isSpyEnabled();
            var notify = hasListeners(this);
            var change =
              notify || notifySpy
                ? {
                    object: this.array,
                    type: "splice",
                    index: index,
                    removed: removed,
                    added: added,
                    removedCount: removed.length,
                    addedCount: added.length
                  }
                : null;
            if (notifySpy) spyReportStart(change);
            this.atom.reportChanged();
            // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe
            if (notify) notifyListeners(this, change);
            if (notifySpy) spyReportEnd();
          };
          return ObservableArrayAdministration;
        })();
        var ObservableArray = (function(_super) {
          __extends(ObservableArray, _super);
          function ObservableArray(initialValues, enhancer, name, owned) {
            if (name === void 0) {
              name = "ObservableArray@" + getNextId();
            }
            if (owned === void 0) {
              owned = false;
            }
            var _this = _super.call(this) || this;
            var adm = new ObservableArrayAdministration(
              name,
              enhancer,
              _this,
              owned
            );
            addHiddenFinalProp(_this, "$mobx", adm);
            if (initialValues && initialValues.length) {
              _this.spliceWithArray(0, 0, initialValues);
            }
            if (safariPrototypeSetterInheritanceBug) {
              // Seems that Safari won't use numeric prototype setter untill any * numeric property is
              // defined on the instance. After that it works fine, even if this property is deleted.
              Object.defineProperty(adm.array, "0", ENTRY_0);
            }
            return _this;
          }
          ObservableArray.prototype.intercept = function(handler) {
            return this.$mobx.intercept(handler);
          };
          ObservableArray.prototype.observe = function(
            listener,
            fireImmediately
          ) {
            if (fireImmediately === void 0) {
              fireImmediately = false;
            }
            return this.$mobx.observe(listener, fireImmediately);
          };
          ObservableArray.prototype.clear = function() {
            return this.splice(0);
          };
          ObservableArray.prototype.concat = function() {
            var arrays = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              arrays[_i] = arguments[_i];
            }
            this.$mobx.atom.reportObserved();
            return Array.prototype.concat.apply(
              this.peek(),
              arrays.map(function(a) {
                return isObservableArray(a) ? a.peek() : a;
              })
            );
          };
          ObservableArray.prototype.replace = function(newItems) {
            return this.$mobx.spliceWithArray(
              0,
              this.$mobx.values.length,
              newItems
            );
          };
          /**
           * Converts this array back to a (shallow) javascript structure.
           * For a deep clone use mobx.toJS
           */
          ObservableArray.prototype.toJS = function() {
            return this.slice();
          };
          ObservableArray.prototype.toJSON = function() {
            // Used by JSON.stringify
            return this.toJS();
          };
          ObservableArray.prototype.peek = function() {
            this.$mobx.atom.reportObserved();
            return this.$mobx.dehanceValues(this.$mobx.values);
          };
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
          ObservableArray.prototype.find = function(
            predicate,
            thisArg,
            fromIndex
          ) {
            if (fromIndex === void 0) {
              fromIndex = 0;
            }
            var idx = this.findIndex.apply(this, arguments);
            return idx === -1 ? undefined : this.get(idx);
          };
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
          ObservableArray.prototype.findIndex = function(
            predicate,
            thisArg,
            fromIndex
          ) {
            if (fromIndex === void 0) {
              fromIndex = 0;
            }
            var items = this.peek(),
              l = items.length;
            for (var i = fromIndex; i < l; i++)
              if (predicate.call(thisArg, items[i], i, this)) return i;
            return -1;
          };
          /*
     * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
     * since these functions alter the inner structure of the array, the have side effects.
     * Because the have side effects, they should not be used in computed function,
     * and for that reason the do not call dependencyState.notifyObserved
     */
          ObservableArray.prototype.splice = function(index, deleteCount) {
            var newItems = [];
            for (var _i = 2; _i < arguments.length; _i++) {
              newItems[_i - 2] = arguments[_i];
            }
            switch (arguments.length) {
              case 0:
                return [];
              case 1:
                return this.$mobx.spliceWithArray(index);
              case 2:
                return this.$mobx.spliceWithArray(index, deleteCount);
            }
            return this.$mobx.spliceWithArray(index, deleteCount, newItems);
          };
          ObservableArray.prototype.spliceWithArray = function(
            index,
            deleteCount,
            newItems
          ) {
            return this.$mobx.spliceWithArray(index, deleteCount, newItems);
          };
          ObservableArray.prototype.push = function() {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              items[_i] = arguments[_i];
            }
            var adm = this.$mobx;
            adm.spliceWithArray(adm.values.length, 0, items);
            return adm.values.length;
          };
          ObservableArray.prototype.pop = function() {
            return this.splice(Math.max(this.$mobx.values.length - 1, 0), 1)[0];
          };
          ObservableArray.prototype.shift = function() {
            return this.splice(0, 1)[0];
          };
          ObservableArray.prototype.unshift = function() {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              items[_i] = arguments[_i];
            }
            var adm = this.$mobx;
            adm.spliceWithArray(0, 0, items);
            return adm.values.length;
          };
          ObservableArray.prototype.reverse = function() {
            // reverse by default mutates in place before returning the result
            // which makes it both a 'derivation' and a 'mutation'.
            // so we deviate from the default and just make it an dervitation
            var clone = this.slice();
            return clone.reverse.apply(clone, arguments);
          };
          ObservableArray.prototype.sort = function(compareFn) {
            // sort by default mutates in place before returning the result
            // which goes against all good practices. Let's not change the array in place!
            var clone = this.slice();
            return clone.sort.apply(clone, arguments);
          };
          ObservableArray.prototype.remove = function(value) {
            var idx = this.$mobx
              .dehanceValues(this.$mobx.values)
              .indexOf(value);
            if (idx > -1) {
              this.splice(idx, 1);
              return true;
            }
            return false;
          };
          ObservableArray.prototype.move = function(fromIndex, toIndex) {
            function checkIndex(index) {
              if (index < 0) {
                throw new Error(
                  "[mobx.array] Index out of bounds: " + index + " is negative"
                );
              }
              var length = this.$mobx.values.length;
              if (index >= length) {
                throw new Error(
                  "[mobx.array] Index out of bounds: " +
                    index +
                    " is not smaller than " +
                    length
                );
              }
            }
            checkIndex.call(this, fromIndex);
            checkIndex.call(this, toIndex);
            if (fromIndex === toIndex) {
              return;
            }
            var oldItems = this.$mobx.values;
            var newItems;
            if (fromIndex < toIndex) {
              newItems = oldItems
                .slice(0, fromIndex)
                .concat(
                  oldItems.slice(fromIndex + 1, toIndex + 1),
                  [oldItems[fromIndex]],
                  oldItems.slice(toIndex + 1)
                );
            } else {
              // toIndex < fromIndex
              newItems = oldItems
                .slice(0, toIndex)
                .concat(
                  [oldItems[fromIndex]],
                  oldItems.slice(toIndex, fromIndex),
                  oldItems.slice(fromIndex + 1)
                );
            }
            this.replace(newItems);
          };
          // See #734, in case property accessors are unreliable...
          ObservableArray.prototype.get = function(index) {
            var impl = this.$mobx;
            if (impl) {
              if (index < impl.values.length) {
                impl.atom.reportObserved();
                return impl.dehanceValue(impl.values[index]);
              }
              console.warn(
                "[mobx.array] Attempt to read an array index (" +
                  index +
                  ") that is out of bounds (" +
                  impl.values.length +
                  "). Please check length first. Out of bound indices will not be tracked by MobX"
              );
            }
            return undefined;
          };
          // See #734, in case property accessors are unreliable...
          ObservableArray.prototype.set = function(index, newValue) {
            var adm = this.$mobx;
            var values = adm.values;
            if (index < values.length) {
              // update at index in range
              checkIfStateModificationsAreAllowed(adm.atom);
              var oldValue = values[index];
              if (hasInterceptors(adm)) {
                var change = interceptChange(adm, {
                  type: "update",
                  object: this,
                  index: index,
                  newValue: newValue
                });
                if (!change) return;
                newValue = change.newValue;
              }
              newValue = adm.enhancer(newValue, oldValue);
              var changed = newValue !== oldValue;
              if (changed) {
                values[index] = newValue;
                adm.notifyArrayChildUpdate(index, newValue, oldValue);
              }
            } else if (index === values.length) {
              // add a new item
              adm.spliceWithArray(index, 0, [newValue]);
            } else {
              // out of bounds
              throw new Error(
                "[mobx.array] Index out of bounds, " +
                  index +
                  " is larger than " +
                  values.length
              );
            }
          };
          return ObservableArray;
        })(StubArray);
        declareIterator(ObservableArray.prototype, function() {
          return arrayAsIterator(this.slice());
        });
        Object.defineProperty(ObservableArray.prototype, "length", {
          enumerable: false,
          configurable: true,
          get: function() {
            return this.$mobx.getArrayLength();
          },
          set: function(newLength) {
            this.$mobx.setArrayLength(newLength);
          }
        });
        [
          "every",
          "filter",
          "forEach",
          "indexOf",
          "join",
          "lastIndexOf",
          "map",
          "reduce",
          "reduceRight",
          "slice",
          "some",
          "toString",
          "toLocaleString"
        ].forEach(function(funcName) {
          var baseFunc = Array.prototype[funcName];
          invariant(
            typeof baseFunc === "function",
            "Base function not defined on Array prototype: '" + funcName + "'"
          );
          addHiddenProp(ObservableArray.prototype, funcName, function() {
            return baseFunc.apply(this.peek(), arguments);
          });
        });
        /**
         * We don't want those to show up in `for (const key in ar)` ...
         */
        makeNonEnumerable(ObservableArray.prototype, [
          "constructor",
          "intercept",
          "observe",
          "clear",
          "concat",
          "get",
          "replace",
          "toJS",
          "toJSON",
          "peek",
          "find",
          "findIndex",
          "splice",
          "spliceWithArray",
          "push",
          "pop",
          "set",
          "shift",
          "unshift",
          "reverse",
          "sort",
          "remove",
          "move",
          "toString",
          "toLocaleString"
        ]);
        // See #364
        var ENTRY_0 = createArrayEntryDescriptor(0);
        function createArrayEntryDescriptor(index) {
          return {
            enumerable: false,
            configurable: false,
            get: function() {
              // TODO: Check `this`?, see #752?
              return this.get(index);
            },
            set: function(value) {
              this.set(index, value);
            }
          };
        }
        function createArrayBufferItem(index) {
          Object.defineProperty(
            ObservableArray.prototype,
            "" + index,
            createArrayEntryDescriptor(index)
          );
        }
        function reserveArrayBuffer(max) {
          for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max; index++)
            createArrayBufferItem(index);
          OBSERVABLE_ARRAY_BUFFER_SIZE = max;
        }
        reserveArrayBuffer(1000);
        var isObservableArrayAdministration = createInstanceofPredicate(
          "ObservableArrayAdministration",
          ObservableArrayAdministration
        );
        function isObservableArray(thing) {
          return (
            isObject(thing) && isObservableArrayAdministration(thing.$mobx)
          );
        }

        var UNCHANGED = {};
        var ObservableValue = (function(_super) {
          __extends(ObservableValue, _super);
          function ObservableValue(value, enhancer, name, notifySpy) {
            if (name === void 0) {
              name = "ObservableValue@" + getNextId();
            }
            if (notifySpy === void 0) {
              notifySpy = true;
            }
            var _this = _super.call(this, name) || this;
            _this.enhancer = enhancer;
            _this.hasUnreportedChange = false;
            _this.dehancer = undefined;
            _this.value = enhancer(value, undefined, name);
            if (notifySpy && isSpyEnabled()) {
              // only notify spy if this is a stand-alone observable
              spyReport({
                type: "create",
                object: _this,
                newValue: _this.value
              });
            }
            return _this;
          }
          ObservableValue.prototype.dehanceValue = function(value) {
            if (this.dehancer !== undefined) return this.dehancer(value);
            return value;
          };
          ObservableValue.prototype.set = function(newValue) {
            var oldValue = this.value;
            newValue = this.prepareNewValue(newValue);
            if (newValue !== UNCHANGED) {
              var notifySpy = isSpyEnabled();
              if (notifySpy) {
                spyReportStart({
                  type: "update",
                  object: this,
                  newValue: newValue,
                  oldValue: oldValue
                });
              }
              this.setNewValue(newValue);
              if (notifySpy) spyReportEnd();
            }
          };
          ObservableValue.prototype.prepareNewValue = function(newValue) {
            checkIfStateModificationsAreAllowed(this);
            if (hasInterceptors(this)) {
              var change = interceptChange(this, {
                object: this,
                type: "update",
                newValue: newValue
              });
              if (!change) return UNCHANGED;
              newValue = change.newValue;
            }
            // apply modifier
            newValue = this.enhancer(newValue, this.value, this.name);
            return this.value !== newValue ? newValue : UNCHANGED;
          };
          ObservableValue.prototype.setNewValue = function(newValue) {
            var oldValue = this.value;
            this.value = newValue;
            this.reportChanged();
            if (hasListeners(this)) {
              notifyListeners(this, {
                type: "update",
                object: this,
                newValue: newValue,
                oldValue: oldValue
              });
            }
          };
          ObservableValue.prototype.get = function() {
            this.reportObserved();
            return this.dehanceValue(this.value);
          };
          ObservableValue.prototype.intercept = function(handler) {
            return registerInterceptor(this, handler);
          };
          ObservableValue.prototype.observe = function(
            listener,
            fireImmediately
          ) {
            if (fireImmediately)
              listener({
                object: this,
                type: "update",
                newValue: this.value,
                oldValue: undefined
              });
            return registerListener(this, listener);
          };
          ObservableValue.prototype.toJSON = function() {
            return this.get();
          };
          ObservableValue.prototype.toString = function() {
            return this.name + "[" + this.value + "]";
          };
          ObservableValue.prototype.valueOf = function() {
            return toPrimitive(this.get());
          };
          return ObservableValue;
        })(BaseAtom);
        ObservableValue.prototype[primitiveSymbol()] =
          ObservableValue.prototype.valueOf;
        var isObservableValue = createInstanceofPredicate(
          "ObservableValue",
          ObservableValue
        );

        var messages = {
          m001: "It is not allowed to assign new values to @action fields",
          m002: "`runInAction` expects a function",
          m003: "`runInAction` expects a function without arguments",
          m004: "autorun expects a function",
          m005:
            "Warning: attempted to pass an action to autorun. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.",
          m006:
            "Warning: attempted to pass an action to autorunAsync. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.",
          m007:
            "reaction only accepts 2 or 3 arguments. If migrating from MobX 2, please provide an options object",
          m008:
            "wrapping reaction expression in `asReference` is no longer supported, use options object instead",
          m009:
            "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'. It looks like it was used on a property.",
          m010:
            "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'",
          m011:
            "First argument to `computed` should be an expression. If using computed as decorator, don't pass it arguments",
          m012: "computed takes one or two arguments if used as function",
          m013:
            "[mobx.expr] 'expr' should only be used inside other reactive functions.",
          m014: "extendObservable expected 2 or more arguments",
          m015: "extendObservable expects an object as first argument",
          m016:
            "extendObservable should not be used on maps, use map.merge instead",
          m017: "all arguments of extendObservable should be objects",
          m018:
            "extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540",
          m019:
            "[mobx.isObservable] isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.",
          m020: "modifiers can only be used for individual object properties",
          m021: "observable expects zero or one arguments",
          m022: "@observable can not be used on getters, use @computed instead",
          m024:
            "whyRun() can only be used if a derivation is active, or by passing an computed value / reaction explicitly. If you invoked whyRun from inside a computation; the computation is currently suspended but re-evaluating because somebody requested its value.",
          m025: "whyRun can only be used on reactions and computed values",
          m026: "`action` can only be invoked on functions",
          m028:
            "It is not allowed to set `useStrict` when a derivation is running",
          m029:
            "INTERNAL ERROR only onBecomeUnobserved shouldn't be called twice in a row",
          m030a:
            "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: ",
          m030b:
            "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ",
          m031:
            "Computed values are not allowed to cause side effects by changing observables that are already being observed. Tried to modify: ",
          m032:
            "* This computation is suspended (not in use by any reaction) and won't run automatically.\n	Didn't expect this computation to be suspended at this point?\n	  1. Make sure this computation is used by a reaction (reaction, autorun, observer).\n	  2. Check whether you are using this computation synchronously (in the same stack as they reaction that needs it).",
          m033:
            "`observe` doesn't support the fire immediately property for observable maps.",
          m034:
            "`mobx.map` is deprecated, use `new ObservableMap` or `mobx.observable.map` instead",
          m035:
            "Cannot make the designated object observable; it is not extensible",
          m036: "It is not possible to get index atoms from arrays",
          m037:
            'Hi there! I\'m sorry you have just run into an exception.\nIf your debugger ends up here, know that some reaction (like the render() of an observer component, autorun or reaction)\nthrew an exception and that mobx caught it, to avoid that it brings the rest of your application down.\nThe original cause of the exception (the code that caused this reaction to run (again)), is still in the stack.\n\nHowever, more interesting is the actual stack trace of the error itself.\nHopefully the error is an instanceof Error, because in that case you can inspect the original stack of the error from where it was thrown.\nSee `error.stack` property, or press the very subtle "(...)" link you see near the console.error message that probably brought you here.\nThat stack is more interesting than the stack of this console.error itself.\n\nIf the exception you see is an exception you created yourself, make sure to use `throw new Error("Oops")` instead of `throw "Oops"`,\nbecause the javascript environment will only preserve the original stack trace in the first form.\n\nYou can also make sure the debugger pauses the next time this very same exception is thrown by enabling "Pause on caught exception".\n(Note that it might pause on many other, unrelated exception as well).\n\nIf that all doesn\'t help you out, feel free to open an issue https://github.com/mobxjs/mobx/issues!\n',
          m038:
            "Missing items in this list?\n    1. Check whether all used values are properly marked as observable (use isObservable to verify)\n    2. Make sure you didn't dereference values too early. MobX observes props, not primitives. E.g: use 'person.name' instead of 'name' in your computation.\n"
        };
        function getMessage(id) {
          return messages[id];
        }

        function createAction(actionName, fn) {
          invariant(typeof fn === "function", getMessage("m026"));
          invariant(
            typeof actionName === "string" && actionName.length > 0,
            "actions should have valid names, got: '" + actionName + "'"
          );
          var res = function() {
            return executeAction(actionName, fn, this, arguments);
          };
          res.originalFn = fn;
          res.isMobxAction = true;
          return res;
        }
        function executeAction(actionName, fn, scope, args) {
          var runInfo = startAction(actionName, fn, scope, args);
          try {
            return fn.apply(scope, args);
          } finally {
            endAction(runInfo);
          }
        }
        function startAction(actionName, fn, scope, args) {
          var notifySpy = isSpyEnabled() && !!actionName;
          var startTime = 0;
          if (notifySpy) {
            startTime = Date.now();
            var l = (args && args.length) || 0;
            var flattendArgs = new Array(l);
            if (l > 0) for (var i = 0; i < l; i++) flattendArgs[i] = args[i];
            spyReportStart({
              type: "action",
              name: actionName,
              fn: fn,
              object: scope,
              arguments: flattendArgs
            });
          }
          var prevDerivation = untrackedStart();
          startBatch();
          var prevAllowStateChanges = allowStateChangesStart(true);
          return {
            prevDerivation: prevDerivation,
            prevAllowStateChanges: prevAllowStateChanges,
            notifySpy: notifySpy,
            startTime: startTime
          };
        }
        function endAction(runInfo) {
          allowStateChangesEnd(runInfo.prevAllowStateChanges);
          endBatch();
          untrackedEnd(runInfo.prevDerivation);
          if (runInfo.notifySpy)
            spyReportEnd({ time: Date.now() - runInfo.startTime });
        }
        function useStrict(strict) {
          invariant(
            globalState.trackingDerivation === null,
            getMessage("m028")
          );
          globalState.strictMode = strict;
          globalState.allowStateChanges = !strict;
        }
        function isStrictModeEnabled() {
          return globalState.strictMode;
        }
        function allowStateChanges(allowStateChanges, func) {
          // TODO: deprecate / refactor this function in next major
          // Currently only used by `@observer`
          // Proposed change: remove first param, rename to `forbidStateChanges`,
          // require error callback instead of the hardcoded error message now used
          // Use `inAction` instead of allowStateChanges in derivation.ts to check strictMode
          var prev = allowStateChangesStart(allowStateChanges);
          var res;
          try {
            res = func();
          } finally {
            allowStateChangesEnd(prev);
          }
          return res;
        }
        function allowStateChangesStart(allowStateChanges) {
          var prev = globalState.allowStateChanges;
          globalState.allowStateChanges = allowStateChanges;
          return prev;
        }
        function allowStateChangesEnd(prev) {
          globalState.allowStateChanges = prev;
        }

        /**
         * Constructs a decorator, that normalizes the differences between
         * TypeScript and Babel. Mainly caused by the fact that legacy-decorator cannot assign
         * values during instance creation to properties that have a getter setter.
         *
         * - Sigh -
         *
         * Also takes care of the difference between @decorator field and @decorator(args) field, and different forms of values.
         * For performance (cpu and mem) reasons the properties are always defined on the prototype (at least initially).
         * This means that these properties despite being enumerable might not show up in Object.keys() (but they will show up in for...in loops).
         */
        function createClassPropertyDecorator(
          /**
           * This function is invoked once, when the property is added to a new instance.
           * When this happens is not strictly determined due to differences in TS and Babel:
           * Typescript: Usually when constructing the new instance
           * Babel, sometimes Typescript: during the first get / set
           * Both: when calling `runLazyInitializers(instance)`
           */
          onInitialize,
          get,
          set,
          enumerable,
          /**
           * Can this decorator invoked with arguments? e.g. @decorator(args)
           */
          allowCustomArguments
        ) {
          function classPropertyDecorator(
            target,
            key,
            descriptor,
            customArgs,
            argLen
          ) {
            if (argLen === void 0) {
              argLen = 0;
            }
            invariant(
              allowCustomArguments || quacksLikeADecorator(arguments),
              "This function is a decorator, but it wasn't invoked like a decorator"
            );
            if (!descriptor) {
              // typescript (except for getter / setters)
              var newDescriptor = {
                enumerable: enumerable,
                configurable: true,
                get: function() {
                  if (
                    !this.__mobxInitializedProps ||
                    this.__mobxInitializedProps[key] !== true
                  )
                    typescriptInitializeProperty(
                      this,
                      key,
                      undefined,
                      onInitialize,
                      customArgs,
                      descriptor
                    );
                  return get.call(this, key);
                },
                set: function(v) {
                  if (
                    !this.__mobxInitializedProps ||
                    this.__mobxInitializedProps[key] !== true
                  ) {
                    typescriptInitializeProperty(
                      this,
                      key,
                      v,
                      onInitialize,
                      customArgs,
                      descriptor
                    );
                  } else {
                    set.call(this, key, v);
                  }
                }
              };
              if (
                arguments.length < 3 ||
                (arguments.length === 5 && argLen < 3)
              ) {
                // Typescript target is ES3, so it won't define property for us
                // or using Reflect.decorate polyfill, which will return no descriptor
                // (see https://github.com/mobxjs/mobx/issues/333)
                Object.defineProperty(target, key, newDescriptor);
              }
              return newDescriptor;
            } else {
              // babel and typescript getter / setter props
              if (!hasOwnProperty(target, "__mobxLazyInitializers")) {
                addHiddenProp(
                  target,
                  "__mobxLazyInitializers",
                  (target.__mobxLazyInitializers &&
                    target.__mobxLazyInitializers.slice()) ||
                    [] // support inheritance
                );
              }
              var value_1 = descriptor.value,
                initializer_1 = descriptor.initializer;
              target.__mobxLazyInitializers.push(function(instance) {
                onInitialize(
                  instance,
                  key,
                  initializer_1 ? initializer_1.call(instance) : value_1,
                  customArgs,
                  descriptor
                );
              });
              return {
                enumerable: enumerable,
                configurable: true,
                get: function() {
                  if (this.__mobxDidRunLazyInitializers !== true)
                    runLazyInitializers(this);
                  return get.call(this, key);
                },
                set: function(v) {
                  if (this.__mobxDidRunLazyInitializers !== true)
                    runLazyInitializers(this);
                  set.call(this, key, v);
                }
              };
            }
          }
          if (allowCustomArguments) {
            /** If custom arguments are allowed, we should return a function that returns a decorator */
            return function() {
              /** Direct invocation: @decorator bla */
              if (quacksLikeADecorator(arguments))
                return classPropertyDecorator.apply(null, arguments);
              /** Indirect invocation: @decorator(args) bla */
              var outerArgs = arguments;
              var argLen = arguments.length;
              return function(target, key, descriptor) {
                return classPropertyDecorator(
                  target,
                  key,
                  descriptor,
                  outerArgs,
                  argLen
                );
              };
            };
          }
          return classPropertyDecorator;
        }
        function typescriptInitializeProperty(
          instance,
          key,
          v,
          onInitialize,
          customArgs,
          baseDescriptor
        ) {
          if (!hasOwnProperty(instance, "__mobxInitializedProps"))
            addHiddenProp(instance, "__mobxInitializedProps", {});
          instance.__mobxInitializedProps[key] = true;
          onInitialize(instance, key, v, customArgs, baseDescriptor);
        }
        function runLazyInitializers(instance) {
          if (instance.__mobxDidRunLazyInitializers === true) return;
          if (instance.__mobxLazyInitializers) {
            addHiddenProp(instance, "__mobxDidRunLazyInitializers", true);
            instance.__mobxDidRunLazyInitializers &&
              instance.__mobxLazyInitializers.forEach(function(initializer) {
                return initializer(instance);
              });
          }
        }
        function quacksLikeADecorator(args) {
          return (
            (args.length === 2 || args.length === 3) &&
            typeof args[1] === "string"
          );
        }

        var actionFieldDecorator = createClassPropertyDecorator(
          function(target, key, value, args, originalDescriptor) {
            var actionName =
              args && args.length === 1
                ? args[0]
                : value.name || key || "<unnamed action>";
            var wrappedAction = action(actionName, value);
            addHiddenProp(target, key, wrappedAction);
          },
          function(key) {
            return this[key];
          },
          function() {
            invariant(false, getMessage("m001"));
          },
          false,
          true
        );
        var boundActionDecorator = createClassPropertyDecorator(
          function(target, key, value) {
            defineBoundAction(target, key, value);
          },
          function(key) {
            return this[key];
          },
          function() {
            invariant(false, getMessage("m001"));
          },
          false,
          false
        );
        var action = function action(arg1, arg2, arg3, arg4) {
          if (arguments.length === 1 && typeof arg1 === "function")
            return createAction(arg1.name || "<unnamed action>", arg1);
          if (arguments.length === 2 && typeof arg2 === "function")
            return createAction(arg1, arg2);
          if (arguments.length === 1 && typeof arg1 === "string")
            return namedActionDecorator(arg1);
          return namedActionDecorator(arg2).apply(null, arguments);
        };
        action.bound = function boundAction(arg1, arg2, arg3) {
          if (typeof arg1 === "function") {
            var action_1 = createAction("<not yet bound action>", arg1);
            action_1.autoBind = true;
            return action_1;
          }
          return boundActionDecorator.apply(null, arguments);
        };
        function namedActionDecorator(name) {
          return function(target, prop, descriptor) {
            if (descriptor && typeof descriptor.value === "function") {
              // TypeScript @action method() { }. Defined on proto before being decorated
              // Don't use the field decorator if we are just decorating a method
              descriptor.value = createAction(name, descriptor.value);
              descriptor.enumerable = false;
              descriptor.configurable = true;
              return descriptor;
            }
            if (descriptor !== undefined && descriptor.get !== undefined) {
              throw new Error(
                "[mobx] action is not expected to be used with getters"
              );
            }
            // bound instance methods
            return actionFieldDecorator(name).apply(this, arguments);
          };
        }
        function runInAction(arg1, arg2, arg3) {
          var actionName =
            typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
          var fn = typeof arg1 === "function" ? arg1 : arg2;
          var scope = typeof arg1 === "function" ? arg2 : arg3;
          invariant(typeof fn === "function", getMessage("m002"));
          invariant(fn.length === 0, getMessage("m003"));
          invariant(
            typeof actionName === "string" && actionName.length > 0,
            "actions should have valid names, got: '" + actionName + "'"
          );
          return executeAction(actionName, fn, scope, undefined);
        }
        function isAction(thing) {
          return typeof thing === "function" && thing.isMobxAction === true;
        }
        function defineBoundAction(target, propertyName, fn) {
          var res = function() {
            return executeAction(propertyName, fn, target, arguments);
          };
          res.isMobxAction = true;
          addHiddenProp(target, propertyName, res);
        }

        function identityComparer(a, b) {
          return a === b;
        }
        function structuralComparer(a, b) {
          return deepEqual(a, b);
        }
        function defaultComparer(a, b) {
          return areBothNaN(a, b) || identityComparer(a, b);
        }
        var comparer = {
          identity: identityComparer,
          structural: structuralComparer,
          default: defaultComparer
        };

        function autorun(arg1, arg2, arg3) {
          var name, view, scope;
          if (typeof arg1 === "string") {
            name = arg1;
            view = arg2;
            scope = arg3;
          } else {
            name = arg1.name || "Autorun@" + getNextId();
            view = arg1;
            scope = arg2;
          }
          invariant(typeof view === "function", getMessage("m004"));
          invariant(isAction(view) === false, getMessage("m005"));
          if (scope) view = view.bind(scope);
          var reaction = new Reaction(name, function() {
            this.track(reactionRunner);
          });
          function reactionRunner() {
            view(reaction);
          }
          reaction.schedule();
          return reaction.getDisposer();
        }
        function when(arg1, arg2, arg3, arg4) {
          var name, predicate, effect, scope;
          if (typeof arg1 === "string") {
            name = arg1;
            predicate = arg2;
            effect = arg3;
            scope = arg4;
          } else {
            name = "When@" + getNextId();
            predicate = arg1;
            effect = arg2;
            scope = arg3;
          }
          var disposer = autorun(name, function(r) {
            if (predicate.call(scope)) {
              r.dispose();
              var prevUntracked = untrackedStart();
              effect.call(scope);
              untrackedEnd(prevUntracked);
            }
          });
          return disposer;
        }
        function autorunAsync(arg1, arg2, arg3, arg4) {
          var name, func, delay, scope;
          if (typeof arg1 === "string") {
            name = arg1;
            func = arg2;
            delay = arg3;
            scope = arg4;
          } else {
            name = arg1.name || "AutorunAsync@" + getNextId();
            func = arg1;
            delay = arg2;
            scope = arg3;
          }
          invariant(isAction(func) === false, getMessage("m006"));
          if (delay === void 0) delay = 1;
          if (scope) func = func.bind(scope);
          var isScheduled = false;
          var r = new Reaction(name, function() {
            if (!isScheduled) {
              isScheduled = true;
              setTimeout(function() {
                isScheduled = false;
                if (!r.isDisposed) r.track(reactionRunner);
              }, delay);
            }
          });
          function reactionRunner() {
            func(r);
          }
          r.schedule();
          return r.getDisposer();
        }
        function reaction(expression, effect, arg3) {
          if (arguments.length > 3) {
            fail(getMessage("m007"));
          }
          if (isModifierDescriptor(expression)) {
            fail(getMessage("m008"));
          }
          var opts;
          if (typeof arg3 === "object") {
            opts = arg3;
          } else {
            opts = {};
          }
          opts.name =
            opts.name ||
            expression.name ||
            effect.name ||
            "Reaction@" + getNextId();
          opts.fireImmediately = arg3 === true || opts.fireImmediately === true;
          opts.delay = opts.delay || 0;
          opts.compareStructural =
            opts.compareStructural || opts.struct || false;
          // TODO: creates ugly spy events, use `effect = (r) => runInAction(opts.name, () => effect(r))` instead
          effect = action(
            opts.name,
            opts.context ? effect.bind(opts.context) : effect
          );
          if (opts.context) {
            expression = expression.bind(opts.context);
          }
          var firstTime = true;
          var isScheduled = false;
          var value;
          var equals = opts.equals
            ? opts.equals
            : opts.compareStructural || opts.struct
              ? comparer.structural
              : comparer.default;
          var r = new Reaction(opts.name, function() {
            if (firstTime || opts.delay < 1) {
              reactionRunner();
            } else if (!isScheduled) {
              isScheduled = true;
              setTimeout(function() {
                isScheduled = false;
                reactionRunner();
              }, opts.delay);
            }
          });
          function reactionRunner() {
            if (r.isDisposed) return;
            var changed = false;
            r.track(function() {
              var nextValue = expression(r);
              changed = firstTime || !equals(value, nextValue);
              value = nextValue;
            });
            if (firstTime && opts.fireImmediately) effect(value, r);
            if (!firstTime && changed === true) effect(value, r);
            if (firstTime) firstTime = false;
          }
          r.schedule();
          return r.getDisposer();
        }

        /**
         * A node in the state dependency root that observes other nodes, and can be observed itself.
         *
         * ComputedValue will remember the result of the computation for the duration of the batch, or
         * while being observed.
         *
         * During this time it will recompute only when one of its direct dependencies changed,
         * but only when it is being accessed with `ComputedValue.get()`.
         *
         * Implementation description:
         * 1. First time it's being accessed it will compute and remember result
         *    give back remembered result until 2. happens
         * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
         * 3. When it's being accessed, recompute if any shallow dependency changed.
         *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
         *    go to step 2. either way
         *
         * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
         */
        var ComputedValue = (function() {
          /**
           * Create a new computed value based on a function expression.
           *
           * The `name` property is for debug purposes only.
           *
           * The `equals` property specifies the comparer function to use to determine if a newly produced
           * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
           * compares based on identity comparison (===), and `structualComparer` deeply compares the structure.
           * Structural comparison can be convenient if you always produce an new aggregated object and
           * don't want to notify observers if it is structurally the same.
           * This is useful for working with vectors, mouse coordinates etc.
           */
          function ComputedValue(derivation, scope, equals, name, setter) {
            this.derivation = derivation;
            this.scope = scope;
            this.equals = equals;
            this.dependenciesState = IDerivationState.NOT_TRACKING;
            this.observing = []; // nodes we are looking at. Our value depends on these nodes
            this.newObserving = null; // during tracking it's an array with new observed observers
            this.isPendingUnobservation = false;
            this.observers = [];
            this.observersIndexes = {};
            this.diffValue = 0;
            this.runId = 0;
            this.lastAccessedBy = 0;
            this.lowestObserverState = IDerivationState.UP_TO_DATE;
            this.unboundDepsCount = 0;
            this.__mapid = "#" + getNextId();
            this.value = new CaughtException(null);
            this.isComputing = false; // to check for cycles
            this.isRunningSetter = false;
            this.name = name || "ComputedValue@" + getNextId();
            if (setter) this.setter = createAction(name + "-setter", setter);
          }
          ComputedValue.prototype.onBecomeStale = function() {
            propagateMaybeChanged(this);
          };
          ComputedValue.prototype.onBecomeUnobserved = function() {
            clearObserving(this);
            this.value = undefined;
          };
          /**
           * Returns the current value of this computed value.
           * Will evaluate its computation first if needed.
           */
          ComputedValue.prototype.get = function() {
            invariant(
              !this.isComputing,
              "Cycle detected in computation " + this.name,
              this.derivation
            );
            if (globalState.inBatch === 0) {
              // This is an minor optimization which could be omitted to simplify the code
              // The computedValue is accessed outside of any mobx stuff. Batch observing should be enough and don't need
              // tracking as it will never be called again inside this batch.
              startBatch();
              if (shouldCompute(this)) this.value = this.computeValue(false);
              endBatch();
            } else {
              reportObserved(this);
              if (shouldCompute(this))
                if (this.trackAndCompute()) propagateChangeConfirmed(this);
            }
            var result = this.value;
            if (isCaughtException(result)) throw result.cause;
            return result;
          };
          ComputedValue.prototype.peek = function() {
            var res = this.computeValue(false);
            if (isCaughtException(res)) throw res.cause;
            return res;
          };
          ComputedValue.prototype.set = function(value) {
            if (this.setter) {
              invariant(
                !this.isRunningSetter,
                "The setter of computed value '" +
                  this.name +
                  "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?"
              );
              this.isRunningSetter = true;
              try {
                this.setter.call(this.scope, value);
              } finally {
                this.isRunningSetter = false;
              }
            } else
              invariant(
                false,
                "[ComputedValue '" +
                  this.name +
                  "'] It is not possible to assign a new value to a computed value."
              );
          };
          ComputedValue.prototype.trackAndCompute = function() {
            if (isSpyEnabled()) {
              spyReport({
                object: this.scope,
                type: "compute",
                fn: this.derivation
              });
            }
            var oldValue = this.value;
            var wasSuspended =
              this.dependenciesState === IDerivationState.NOT_TRACKING;
            var newValue = (this.value = this.computeValue(true));
            return (
              wasSuspended ||
              isCaughtException(oldValue) ||
              isCaughtException(newValue) ||
              !this.equals(oldValue, newValue)
            );
          };
          ComputedValue.prototype.computeValue = function(track) {
            this.isComputing = true;
            globalState.computationDepth++;
            var res;
            if (track) {
              res = trackDerivedFunction(this, this.derivation, this.scope);
            } else {
              try {
                res = this.derivation.call(this.scope);
              } catch (e) {
                res = new CaughtException(e);
              }
            }
            globalState.computationDepth--;
            this.isComputing = false;
            return res;
          };
          ComputedValue.prototype.observe = function(
            listener,
            fireImmediately
          ) {
            var _this = this;
            var firstTime = true;
            var prevValue = undefined;
            return autorun(function() {
              var newValue = _this.get();
              if (!firstTime || fireImmediately) {
                var prevU = untrackedStart();
                listener({
                  type: "update",
                  object: _this,
                  newValue: newValue,
                  oldValue: prevValue
                });
                untrackedEnd(prevU);
              }
              firstTime = false;
              prevValue = newValue;
            });
          };
          ComputedValue.prototype.toJSON = function() {
            return this.get();
          };
          ComputedValue.prototype.toString = function() {
            return this.name + "[" + this.derivation.toString() + "]";
          };
          ComputedValue.prototype.valueOf = function() {
            return toPrimitive(this.get());
          };
          ComputedValue.prototype.whyRun = function() {
            var isTracking = Boolean(globalState.trackingDerivation);
            var observing = unique(
              this.isComputing ? this.newObserving : this.observing
            ).map(function(dep) {
              return dep.name;
            });
            var observers = unique(
              getObservers(this).map(function(dep) {
                return dep.name;
              })
            );
            return (
              "\nWhyRun? computation '" +
              this.name +
              "':\n * Running because: " +
              (isTracking
                ? "[active] the value of this computation is needed by a reaction"
                : this.isComputing
                  ? "[get] The value of this computed was requested outside a reaction"
                  : "[idle] not running at the moment") +
              "\n" +
              (this.dependenciesState === IDerivationState.NOT_TRACKING
                ? getMessage("m032")
                : " * This computation will re-run if any of the following observables changes:\n    " +
                  joinStrings(observing) +
                  "\n    " +
                  (this.isComputing && isTracking
                    ? " (... or any observable accessed during the remainder of the current run)"
                    : "") +
                  "\n    " +
                  getMessage("m038") +
                  "\n\n  * If the outcome of this computation changes, the following observers will be re-run:\n    " +
                  joinStrings(observers) +
                  "\n")
            );
          };
          return ComputedValue;
        })();
        ComputedValue.prototype[primitiveSymbol()] =
          ComputedValue.prototype.valueOf;
        var isComputedValue = createInstanceofPredicate(
          "ComputedValue",
          ComputedValue
        );

        var ObservableObjectAdministration = (function() {
          function ObservableObjectAdministration(target, name) {
            this.target = target;
            this.name = name;
            this.values = {};
            this.changeListeners = null;
            this.interceptors = null;
          }
          /**
           * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
           * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
           * for callback details
           */
          ObservableObjectAdministration.prototype.observe = function(
            callback,
            fireImmediately
          ) {
            invariant(
              fireImmediately !== true,
              "`observe` doesn't support the fire immediately property for observable objects."
            );
            return registerListener(this, callback);
          };
          ObservableObjectAdministration.prototype.intercept = function(
            handler
          ) {
            return registerInterceptor(this, handler);
          };
          return ObservableObjectAdministration;
        })();
        function asObservableObject(target, name) {
          if (isObservableObject(target) && target.hasOwnProperty("$mobx"))
            return target.$mobx;
          invariant(Object.isExtensible(target), getMessage("m035"));
          if (!isPlainObject(target))
            name =
              (target.constructor.name || "ObservableObject") +
              "@" +
              getNextId();
          if (!name) name = "ObservableObject@" + getNextId();
          var adm = new ObservableObjectAdministration(target, name);
          addHiddenFinalProp(target, "$mobx", adm);
          return adm;
        }
        function defineObservablePropertyFromDescriptor(
          adm,
          propName,
          descriptor,
          defaultEnhancer
        ) {
          if (adm.values[propName] && !isComputedValue(adm.values[propName])) {
            // already observable property
            invariant(
              "value" in descriptor,
              "The property " +
                propName +
                " in " +
                adm.name +
                " is already observable, cannot redefine it as computed property"
            );
            adm.target[propName] = descriptor.value; // the property setter will make 'value' reactive if needed.
            return;
          }
          // not yet observable property
          if ("value" in descriptor) {
            // not a computed value
            if (isModifierDescriptor(descriptor.value)) {
              // x : ref(someValue)
              var modifierDescriptor = descriptor.value;
              defineObservableProperty(
                adm,
                propName,
                modifierDescriptor.initialValue,
                modifierDescriptor.enhancer
              );
            } else if (
              isAction(descriptor.value) &&
              descriptor.value.autoBind === true
            ) {
              defineBoundAction(
                adm.target,
                propName,
                descriptor.value.originalFn
              );
            } else if (isComputedValue(descriptor.value)) {
              // x: computed(someExpr)
              defineComputedPropertyFromComputedValue(
                adm,
                propName,
                descriptor.value
              );
            } else {
              // x: someValue
              defineObservableProperty(
                adm,
                propName,
                descriptor.value,
                defaultEnhancer
              );
            }
          } else {
            // get x() { return 3 } set x(v) { }
            defineComputedProperty(
              adm,
              propName,
              descriptor.get,
              descriptor.set,
              comparer.default,
              true
            );
          }
        }
        function defineObservableProperty(adm, propName, newValue, enhancer) {
          assertPropertyConfigurable(adm.target, propName);
          if (hasInterceptors(adm)) {
            var change = interceptChange(adm, {
              object: adm.target,
              name: propName,
              type: "add",
              newValue: newValue
            });
            if (!change) return;
            newValue = change.newValue;
          }
          var observable = (adm.values[propName] = new ObservableValue(
            newValue,
            enhancer,
            adm.name + "." + propName,
            false
          ));
          newValue = observable.value; // observableValue might have changed it
          Object.defineProperty(
            adm.target,
            propName,
            generateObservablePropConfig(propName)
          );
          notifyPropertyAddition(adm, adm.target, propName, newValue);
        }
        function defineComputedProperty(
          adm,
          propName,
          getter,
          setter,
          equals,
          asInstanceProperty
        ) {
          if (asInstanceProperty)
            assertPropertyConfigurable(adm.target, propName);
          adm.values[propName] = new ComputedValue(
            getter,
            adm.target,
            equals,
            adm.name + "." + propName,
            setter
          );
          if (asInstanceProperty) {
            Object.defineProperty(
              adm.target,
              propName,
              generateComputedPropConfig(propName)
            );
          }
        }
        function defineComputedPropertyFromComputedValue(
          adm,
          propName,
          computedValue
        ) {
          var name = adm.name + "." + propName;
          computedValue.name = name;
          if (!computedValue.scope) computedValue.scope = adm.target;
          adm.values[propName] = computedValue;
          Object.defineProperty(
            adm.target,
            propName,
            generateComputedPropConfig(propName)
          );
        }
        var observablePropertyConfigs = {};
        var computedPropertyConfigs = {};
        function generateObservablePropConfig(propName) {
          return (
            observablePropertyConfigs[propName] ||
            (observablePropertyConfigs[propName] = {
              configurable: true,
              enumerable: true,
              get: function() {
                return this.$mobx.values[propName].get();
              },
              set: function(v) {
                setPropertyValue(this, propName, v);
              }
            })
          );
        }
        function generateComputedPropConfig(propName) {
          return (
            computedPropertyConfigs[propName] ||
            (computedPropertyConfigs[propName] = {
              configurable: true,
              enumerable: false,
              get: function() {
                return this.$mobx.values[propName].get();
              },
              set: function(v) {
                return this.$mobx.values[propName].set(v);
              }
            })
          );
        }
        function setPropertyValue(instance, name, newValue) {
          var adm = instance.$mobx;
          var observable = adm.values[name];
          // intercept
          if (hasInterceptors(adm)) {
            var change = interceptChange(adm, {
              type: "update",
              object: instance,
              name: name,
              newValue: newValue
            });
            if (!change) return;
            newValue = change.newValue;
          }
          newValue = observable.prepareNewValue(newValue);
          // notify spy & observers
          if (newValue !== UNCHANGED) {
            var notify = hasListeners(adm);
            var notifySpy = isSpyEnabled();
            var change =
              notify || notifySpy
                ? {
                    type: "update",
                    object: instance,
                    oldValue: observable.value,
                    name: name,
                    newValue: newValue
                  }
                : null;
            if (notifySpy) spyReportStart(change);
            observable.setNewValue(newValue);
            if (notify) notifyListeners(adm, change);
            if (notifySpy) spyReportEnd();
          }
        }
        function notifyPropertyAddition(adm, object, name, newValue) {
          var notify = hasListeners(adm);
          var notifySpy = isSpyEnabled();
          var change =
            notify || notifySpy
              ? {
                  type: "add",
                  object: object,
                  name: name,
                  newValue: newValue
                }
              : null;
          if (notifySpy) spyReportStart(change);
          if (notify) notifyListeners(adm, change);
          if (notifySpy) spyReportEnd();
        }
        var isObservableObjectAdministration = createInstanceofPredicate(
          "ObservableObjectAdministration",
          ObservableObjectAdministration
        );
        function isObservableObject(thing) {
          if (isObject(thing)) {
            // Initializers run lazily when transpiling to babel, so make sure they are run...
            runLazyInitializers(thing);
            return isObservableObjectAdministration(thing.$mobx);
          }
          return false;
        }

        /**
         * Returns true if the provided value is reactive.
         * @param value object, function or array
         * @param property if property is specified, checks whether value.property is reactive.
         */
        function isObservable(value, property) {
          if (value === null || value === undefined) return false;
          if (property !== undefined) {
            if (isObservableArray(value) || isObservableMap(value))
              throw new Error(getMessage("m019"));
            else if (isObservableObject(value)) {
              var o = value.$mobx;
              return o.values && !!o.values[property];
            }
            return false;
          }
          // For first check, see #701
          return (
            isObservableObject(value) ||
            !!value.$mobx ||
            isAtom(value) ||
            isReaction(value) ||
            isComputedValue(value)
          );
        }

        function createDecoratorForEnhancer(enhancer) {
          invariant(!!enhancer, ":(");
          return createClassPropertyDecorator(
            function(target, name, baseValue, _, baseDescriptor) {
              assertPropertyConfigurable(target, name);
              invariant(
                !baseDescriptor || !baseDescriptor.get,
                getMessage("m022")
              );
              var adm = asObservableObject(target, undefined);
              defineObservableProperty(adm, name, baseValue, enhancer);
            },
            function(name) {
              var observable = this.$mobx.values[name];
              if (
                observable === undefined // See #505
              )
                return undefined;
              return observable.get();
            },
            function(name, value) {
              setPropertyValue(this, name, value);
            },
            true,
            false
          );
        }

        function extendObservable(target) {
          var properties = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            properties[_i - 1] = arguments[_i];
          }
          return extendObservableHelper(target, deepEnhancer, properties);
        }
        function extendShallowObservable(target) {
          var properties = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            properties[_i - 1] = arguments[_i];
          }
          return extendObservableHelper(target, referenceEnhancer, properties);
        }
        function extendObservableHelper(target, defaultEnhancer, properties) {
          invariant(arguments.length >= 2, getMessage("m014"));
          invariant(typeof target === "object", getMessage("m015"));
          invariant(!isObservableMap(target), getMessage("m016"));
          properties.forEach(function(propSet) {
            invariant(typeof propSet === "object", getMessage("m017"));
            invariant(!isObservable(propSet), getMessage("m018"));
          });
          var adm = asObservableObject(target);
          var definedProps = {};
          // Note could be optimised if properties.length === 1
          for (var i = properties.length - 1; i >= 0; i--) {
            var propSet = properties[i];
            for (var key in propSet)
              if (definedProps[key] !== true && hasOwnProperty(propSet, key)) {
                definedProps[key] = true;
                if (target === propSet && !isPropertyConfigurable(target, key))
                  continue; // see #111, skip non-configurable or non-writable props for `observable(object)`.
                var descriptor = Object.getOwnPropertyDescriptor(propSet, key);
                defineObservablePropertyFromDescriptor(
                  adm,
                  key,
                  descriptor,
                  defaultEnhancer
                );
              }
          }
          return target;
        }

        var deepDecorator = createDecoratorForEnhancer(deepEnhancer);
        var shallowDecorator = createDecoratorForEnhancer(shallowEnhancer);
        var refDecorator = createDecoratorForEnhancer(referenceEnhancer);
        var deepStructDecorator = createDecoratorForEnhancer(
          deepStructEnhancer
        );
        var refStructDecorator = createDecoratorForEnhancer(refStructEnhancer);
        /**
         * Turns an object, array or function into a reactive structure.
         * @param v the value which should become observable.
         */
        function createObservable(v) {
          if (v === void 0) {
            v = undefined;
          }
          // @observable someProp;
          if (typeof arguments[1] === "string")
            return deepDecorator.apply(null, arguments);
          invariant(arguments.length <= 1, getMessage("m021"));
          invariant(!isModifierDescriptor(v), getMessage("m020"));
          // it is an observable already, done
          if (isObservable(v)) return v;
          // something that can be converted and mutated?
          var res = deepEnhancer(v, undefined, undefined);
          // this value could be converted to a new observable data structure, return it
          if (res !== v) return res;
          // otherwise, just box it
          return observable.box(v);
        }
        var observableFactories = {
          box: function(value, name) {
            if (arguments.length > 2) incorrectlyUsedAsDecorator("box");
            return new ObservableValue(value, deepEnhancer, name);
          },
          shallowBox: function(value, name) {
            if (arguments.length > 2) incorrectlyUsedAsDecorator("shallowBox");
            return new ObservableValue(value, referenceEnhancer, name);
          },
          array: function(initialValues, name) {
            if (arguments.length > 2) incorrectlyUsedAsDecorator("array");
            return new ObservableArray(initialValues, deepEnhancer, name);
          },
          shallowArray: function(initialValues, name) {
            if (arguments.length > 2)
              incorrectlyUsedAsDecorator("shallowArray");
            return new ObservableArray(initialValues, referenceEnhancer, name);
          },
          map: function(initialValues, name) {
            if (arguments.length > 2) incorrectlyUsedAsDecorator("map");
            return new ObservableMap(initialValues, deepEnhancer, name);
          },
          shallowMap: function(initialValues, name) {
            if (arguments.length > 2) incorrectlyUsedAsDecorator("shallowMap");
            return new ObservableMap(initialValues, referenceEnhancer, name);
          },
          object: function(props, name) {
            if (arguments.length > 2) incorrectlyUsedAsDecorator("object");
            var res = {};
            // convert to observable object
            asObservableObject(res, name);
            // add properties
            extendObservable(res, props);
            return res;
          },
          shallowObject: function(props, name) {
            if (arguments.length > 2)
              incorrectlyUsedAsDecorator("shallowObject");
            var res = {};
            asObservableObject(res, name);
            extendShallowObservable(res, props);
            return res;
          },
          ref: function() {
            if (arguments.length < 2) {
              // although ref creates actually a modifier descriptor, the type of the resultig properties
              // of the object is `T` in the end, when the descriptors are interpreted
              return createModifierDescriptor(referenceEnhancer, arguments[0]);
            } else {
              return refDecorator.apply(null, arguments);
            }
          },
          shallow: function() {
            if (arguments.length < 2) {
              // although ref creates actually a modifier descriptor, the type of the resultig properties
              // of the object is `T` in the end, when the descriptors are interpreted
              return createModifierDescriptor(shallowEnhancer, arguments[0]);
            } else {
              return shallowDecorator.apply(null, arguments);
            }
          },
          deep: function() {
            if (arguments.length < 2) {
              // although ref creates actually a modifier descriptor, the type of the resultig properties
              // of the object is `T` in the end, when the descriptors are interpreted
              return createModifierDescriptor(deepEnhancer, arguments[0]);
            } else {
              return deepDecorator.apply(null, arguments);
            }
          },
          struct: function() {
            if (arguments.length < 2) {
              // although ref creates actually a modifier descriptor, the type of the resultig properties
              // of the object is `T` in the end, when the descriptors are interpreted
              return createModifierDescriptor(deepStructEnhancer, arguments[0]);
            } else {
              return deepStructDecorator.apply(null, arguments);
            }
          }
        };
        var observable = createObservable;
        // weird trick to keep our typings nicely with our funcs, and still extend the observable function
        Object.keys(observableFactories).forEach(function(name) {
          return (observable[name] = observableFactories[name]);
        });
        observable.deep.struct = observable.struct;
        observable.ref.struct = function() {
          if (arguments.length < 2) {
            return createModifierDescriptor(refStructEnhancer, arguments[0]);
          } else {
            return refStructDecorator.apply(null, arguments);
          }
        };
        function incorrectlyUsedAsDecorator(methodName) {
          fail(
            "Expected one or two arguments to observable." +
              methodName +
              ". Did you accidentally try to use observable." +
              methodName +
              " as decorator?"
          );
        }

        function isModifierDescriptor(thing) {
          return (
            typeof thing === "object" &&
            thing !== null &&
            thing.isMobxModifierDescriptor === true
          );
        }
        function createModifierDescriptor(enhancer, initialValue) {
          invariant(
            !isModifierDescriptor(initialValue),
            "Modifiers cannot be nested"
          );
          return {
            isMobxModifierDescriptor: true,
            initialValue: initialValue,
            enhancer: enhancer
          };
        }
        function deepEnhancer(v, _, name) {
          if (isModifierDescriptor(v))
            fail(
              "You tried to assign a modifier wrapped value to a collection, please define modifiers when creating the collection, not when modifying it"
            );
          // it is an observable already, done
          if (isObservable(v)) return v;
          // something that can be converted and mutated?
          if (Array.isArray(v)) return observable.array(v, name);
          if (isPlainObject(v)) return observable.object(v, name);
          if (isES6Map(v)) return observable.map(v, name);
          return v;
        }
        function shallowEnhancer(v, _, name) {
          if (isModifierDescriptor(v))
            fail(
              "You tried to assign a modifier wrapped value to a collection, please define modifiers when creating the collection, not when modifying it"
            );
          if (v === undefined || v === null) return v;
          if (
            isObservableObject(v) ||
            isObservableArray(v) ||
            isObservableMap(v)
          )
            return v;
          if (Array.isArray(v)) return observable.shallowArray(v, name);
          if (isPlainObject(v)) return observable.shallowObject(v, name);
          if (isES6Map(v)) return observable.shallowMap(v, name);
          return fail(
            "The shallow modifier / decorator can only used in combination with arrays, objects and maps"
          );
        }
        function referenceEnhancer(newValue) {
          // never turn into an observable
          return newValue;
        }
        function deepStructEnhancer(v, oldValue, name) {
          // don't confuse structurally compare enhancer with ref enhancer! The latter is probably
          // more suited for immutable objects
          if (deepEqual(v, oldValue)) return oldValue;
          // it is an observable already, done
          if (isObservable(v)) return v;
          // something that can be converted and mutated?
          if (Array.isArray(v))
            return new ObservableArray(v, deepStructEnhancer, name);
          if (isES6Map(v))
            return new ObservableMap(v, deepStructEnhancer, name);
          if (isPlainObject(v)) {
            var res = {};
            asObservableObject(res, name);
            extendObservableHelper(res, deepStructEnhancer, [v]);
            return res;
          }
          return v;
        }
        function refStructEnhancer(v, oldValue, name) {
          if (deepEqual(v, oldValue)) return oldValue;
          return v;
        }

        /**
         * During a transaction no views are updated until the end of the transaction.
         * The transaction will be run synchronously nonetheless.
         *
         * @param action a function that updates some reactive state
         * @returns any value that was returned by the 'action' parameter.
         */
        function transaction(action, thisArg) {
          if (thisArg === void 0) {
            thisArg = undefined;
          }
          startBatch();
          try {
            return action.apply(thisArg);
          } finally {
            endBatch();
          }
        }

        var ObservableMapMarker = {};
        var ObservableMap = (function() {
          function ObservableMap(initialData, enhancer, name) {
            if (enhancer === void 0) {
              enhancer = deepEnhancer;
            }
            if (name === void 0) {
              name = "ObservableMap@" + getNextId();
            }
            this.enhancer = enhancer;
            this.name = name;
            this.$mobx = ObservableMapMarker;
            this._data = Object.create(null);
            this._hasMap = Object.create(null); // hasMap, not hashMap >-).
            this._keys = new ObservableArray(
              undefined,
              referenceEnhancer,
              this.name + ".keys()",
              true
            );
            this.interceptors = null;
            this.changeListeners = null;
            this.dehancer = undefined;
            this.merge(initialData);
          }
          ObservableMap.prototype._has = function(key) {
            return typeof this._data[key] !== "undefined";
          };
          ObservableMap.prototype.has = function(key) {
            if (!this.isValidKey(key)) return false;
            key = "" + key;
            if (this._hasMap[key]) return this._hasMap[key].get();
            return this._updateHasMapEntry(key, false).get();
          };
          ObservableMap.prototype.set = function(key, value) {
            this.assertValidKey(key);
            key = "" + key;
            var hasKey = this._has(key);
            if (hasInterceptors(this)) {
              var change = interceptChange(this, {
                type: hasKey ? "update" : "add",
                object: this,
                newValue: value,
                name: key
              });
              if (!change) return this;
              value = change.newValue;
            }
            if (hasKey) {
              this._updateValue(key, value);
            } else {
              this._addValue(key, value);
            }
            return this;
          };
          ObservableMap.prototype.delete = function(key) {
            var _this = this;
            this.assertValidKey(key);
            key = "" + key;
            if (hasInterceptors(this)) {
              var change = interceptChange(this, {
                type: "delete",
                object: this,
                name: key
              });
              if (!change) return false;
            }
            if (this._has(key)) {
              var notifySpy = isSpyEnabled();
              var notify = hasListeners(this);
              var change =
                notify || notifySpy
                  ? {
                      type: "delete",
                      object: this,
                      oldValue: this._data[key].value,
                      name: key
                    }
                  : null;
              if (notifySpy) spyReportStart(change);
              transaction(function() {
                _this._keys.remove(key);
                _this._updateHasMapEntry(key, false);
                var observable$$1 = _this._data[key];
                observable$$1.setNewValue(undefined);
                _this._data[key] = undefined;
              });
              if (notify) notifyListeners(this, change);
              if (notifySpy) spyReportEnd();
              return true;
            }
            return false;
          };
          ObservableMap.prototype._updateHasMapEntry = function(key, value) {
            // optimization; don't fill the hasMap if we are not observing, or remove entry if there are no observers anymore
            var entry = this._hasMap[key];
            if (entry) {
              entry.setNewValue(value);
            } else {
              entry = this._hasMap[key] = new ObservableValue(
                value,
                referenceEnhancer,
                this.name + "." + key + "?",
                false
              );
            }
            return entry;
          };
          ObservableMap.prototype._updateValue = function(name, newValue) {
            var observable$$1 = this._data[name];
            newValue = observable$$1.prepareNewValue(newValue);
            if (newValue !== UNCHANGED) {
              var notifySpy = isSpyEnabled();
              var notify = hasListeners(this);
              var change =
                notify || notifySpy
                  ? {
                      type: "update",
                      object: this,
                      oldValue: observable$$1.value,
                      name: name,
                      newValue: newValue
                    }
                  : null;
              if (notifySpy) spyReportStart(change);
              observable$$1.setNewValue(newValue);
              if (notify) notifyListeners(this, change);
              if (notifySpy) spyReportEnd();
            }
          };
          ObservableMap.prototype._addValue = function(name, newValue) {
            var _this = this;
            transaction(function() {
              var observable$$1 = (_this._data[name] = new ObservableValue(
                newValue,
                _this.enhancer,
                _this.name + "." + name,
                false
              ));
              newValue = observable$$1.value; // value might have been changed
              _this._updateHasMapEntry(name, true);
              _this._keys.push(name);
            });
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change =
              notify || notifySpy
                ? {
                    type: "add",
                    object: this,
                    name: name,
                    newValue: newValue
                  }
                : null;
            if (notifySpy) spyReportStart(change);
            if (notify) notifyListeners(this, change);
            if (notifySpy) spyReportEnd();
          };
          ObservableMap.prototype.get = function(key) {
            key = "" + key;
            if (this.has(key)) return this.dehanceValue(this._data[key].get());
            return this.dehanceValue(undefined);
          };
          ObservableMap.prototype.dehanceValue = function(value) {
            if (this.dehancer !== undefined) {
              return this.dehancer(value);
            }
            return value;
          };
          ObservableMap.prototype.keys = function() {
            return arrayAsIterator(this._keys.slice());
          };
          ObservableMap.prototype.values = function() {
            return arrayAsIterator(this._keys.map(this.get, this));
          };
          ObservableMap.prototype.entries = function() {
            var _this = this;
            return arrayAsIterator(
              this._keys.map(function(key) {
                return [key, _this.get(key)];
              })
            );
          };
          ObservableMap.prototype.forEach = function(callback, thisArg) {
            var _this = this;
            this.keys().forEach(function(key) {
              return callback.call(thisArg, _this.get(key), key, _this);
            });
          };
          /** Merge another object into this object, returns this. */
          ObservableMap.prototype.merge = function(other) {
            var _this = this;
            if (isObservableMap(other)) {
              other = other.toJS();
            }
            transaction(function() {
              if (isPlainObject(other))
                Object.keys(other).forEach(function(key) {
                  return _this.set(key, other[key]);
                });
              else if (Array.isArray(other))
                other.forEach(function(_a) {
                  var key = _a[0],
                    value = _a[1];
                  return _this.set(key, value);
                });
              else if (isES6Map(other))
                other.forEach(function(value, key) {
                  return _this.set(key, value);
                });
              else if (other !== null && other !== undefined)
                fail("Cannot initialize map from " + other);
            });
            return this;
          };
          ObservableMap.prototype.clear = function() {
            var _this = this;
            transaction(function() {
              untracked(function() {
                _this.keys().forEach(_this.delete, _this);
              });
            });
          };
          ObservableMap.prototype.replace = function(values) {
            var _this = this;
            transaction(function() {
              // grab all the keys that are present in the new map but not present in the current map
              // and delete them from the map, then merge the new map
              // this will cause reactions only on changed values
              var newKeys = getMapLikeKeys(values);
              var oldKeys = _this.keys();
              var missingKeys = oldKeys.filter(function(k) {
                return newKeys.indexOf(k) === -1;
              });
              missingKeys.forEach(function(k) {
                return _this.delete(k);
              });
              _this.merge(values);
            });
            return this;
          };
          Object.defineProperty(ObservableMap.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: true,
            configurable: true
          });
          /**
           * Returns a shallow non observable object clone of this map.
           * Note that the values might still be observable. For a deep clone use mobx.toJS.
           */
          ObservableMap.prototype.toJS = function() {
            var _this = this;
            var res = {};
            this.keys().forEach(function(key) {
              return (res[key] = _this.get(key));
            });
            return res;
          };
          ObservableMap.prototype.toJSON = function() {
            // Used by JSON.stringify
            return this.toJS();
          };
          ObservableMap.prototype.isValidKey = function(key) {
            if (key === null || key === undefined) return false;
            if (
              typeof key === "string" ||
              typeof key === "number" ||
              typeof key === "boolean"
            )
              return true;
            return false;
          };
          ObservableMap.prototype.assertValidKey = function(key) {
            if (!this.isValidKey(key))
              throw new Error(
                "[mobx.map] Invalid key: '" +
                  key +
                  "', only strings, numbers and booleans are accepted as key in observable maps."
              );
          };
          ObservableMap.prototype.toString = function() {
            var _this = this;
            return (
              this.name +
              "[{ " +
              this.keys()
                .map(function(key) {
                  return key + ": " + ("" + _this.get(key));
                })
                .join(", ") +
              " }]"
            );
          };
          /**
           * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
           * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
           * for callback details
           */
          ObservableMap.prototype.observe = function(
            listener,
            fireImmediately
          ) {
            invariant(fireImmediately !== true, getMessage("m033"));
            return registerListener(this, listener);
          };
          ObservableMap.prototype.intercept = function(handler) {
            return registerInterceptor(this, handler);
          };
          return ObservableMap;
        })();
        declareIterator(ObservableMap.prototype, function() {
          return this.entries();
        });
        function map(initialValues) {
          deprecated(
            "`mobx.map` is deprecated, use `new ObservableMap` or `mobx.observable.map` instead"
          );
          return observable.map(initialValues);
        }
        /* 'var' fixes small-build issue */
        var isObservableMap = createInstanceofPredicate(
          "ObservableMap",
          ObservableMap
        );

        var EMPTY_ARRAY = [];
        Object.freeze(EMPTY_ARRAY);
        function getGlobal() {
          return typeof window !== "undefined" ? window : global;
        }
        function getNextId() {
          return ++globalState.mobxGuid;
        }
        function fail(message, thing) {
          invariant(false, message, thing);
          throw "X"; // unreachable
        }
        function invariant(check, message, thing) {
          if (!check)
            throw new Error(
              "[mobx] Invariant failed: " +
                message +
                (thing ? " in '" + thing + "'" : "")
            );
        }
        /**
         * Prints a deprecation message, but only one time.
         * Returns false if the deprecated message was already printed before
         */
        var deprecatedMessages = [];
        function deprecated(msg) {
          if (deprecatedMessages.indexOf(msg) !== -1) return false;
          deprecatedMessages.push(msg);
          console.error("[mobx] Deprecated: " + msg);
          return true;
        }
        /**
         * Makes sure that the provided function is invoked at most once.
         */
        function once(func) {
          var invoked = false;
          return function() {
            if (invoked) return;
            invoked = true;
            return func.apply(this, arguments);
          };
        }
        var noop = function() {};
        function unique(list) {
          var res = [];
          list.forEach(function(item) {
            if (res.indexOf(item) === -1) res.push(item);
          });
          return res;
        }
        function joinStrings(things, limit, separator) {
          if (limit === void 0) {
            limit = 100;
          }
          if (separator === void 0) {
            separator = " - ";
          }
          if (!things) return "";
          var sliced = things.slice(0, limit);
          return (
            "" +
            sliced.join(separator) +
            (things.length > limit
              ? " (... and " + (things.length - limit) + "more)"
              : "")
          );
        }
        function isObject(value) {
          return value !== null && typeof value === "object";
        }
        function isPlainObject(value) {
          if (value === null || typeof value !== "object") return false;
          var proto = Object.getPrototypeOf(value);
          return proto === Object.prototype || proto === null;
        }
        function objectAssign() {
          var res = arguments[0];
          for (var i = 1, l = arguments.length; i < l; i++) {
            var source = arguments[i];
            for (var key in source)
              if (hasOwnProperty(source, key)) {
                res[key] = source[key];
              }
          }
          return res;
        }
        var prototypeHasOwnProperty = Object.prototype.hasOwnProperty;
        function hasOwnProperty(object, propName) {
          return prototypeHasOwnProperty.call(object, propName);
        }
        function makeNonEnumerable(object, propNames) {
          for (var i = 0; i < propNames.length; i++) {
            addHiddenProp(object, propNames[i], object[propNames[i]]);
          }
        }
        function addHiddenProp(object, propName, value) {
          Object.defineProperty(object, propName, {
            enumerable: false,
            writable: true,
            configurable: true,
            value: value
          });
        }
        function addHiddenFinalProp(object, propName, value) {
          Object.defineProperty(object, propName, {
            enumerable: false,
            writable: false,
            configurable: true,
            value: value
          });
        }
        function isPropertyConfigurable(object, prop) {
          var descriptor = Object.getOwnPropertyDescriptor(object, prop);
          return (
            !descriptor ||
            (descriptor.configurable !== false && descriptor.writable !== false)
          );
        }
        function assertPropertyConfigurable(object, prop) {
          invariant(
            isPropertyConfigurable(object, prop),
            "Cannot make property '" +
              prop +
              "' observable, it is not configurable and writable in the target object"
          );
        }
        function getEnumerableKeys(obj) {
          var res = [];
          for (var key in obj) res.push(key);
          return res;
        }
        /**
         * Naive deepEqual. Doesn't check for prototype, non-enumerable or out-of-range properties on arrays.
         * If you have such a case, you probably should use this function but something fancier :).
         */
        function deepEqual(a, b) {
          if (a === null && b === null) return true;
          if (a === undefined && b === undefined) return true;
          if (areBothNaN(a, b)) return true;
          if (typeof a !== "object") return a === b;
          var aIsArray = isArrayLike(a);
          var aIsMap = isMapLike(a);
          if (aIsArray !== isArrayLike(b)) {
            return false;
          } else if (aIsMap !== isMapLike(b)) {
            return false;
          } else if (aIsArray) {
            if (a.length !== b.length) return false;
            for (var i = a.length - 1; i >= 0; i--)
              if (!deepEqual(a[i], b[i])) return false;
            return true;
          } else if (aIsMap) {
            if (a.size !== b.size) return false;
            var equals_1 = true;
            a.forEach(function(value, key) {
              equals_1 = equals_1 && deepEqual(b.get(key), value);
            });
            return equals_1;
          } else if (typeof a === "object" && typeof b === "object") {
            if (a === null || b === null) return false;
            if (isMapLike(a) && isMapLike(b)) {
              if (a.size !== b.size) return false;
              // Freaking inefficient.... Create PR if you run into this :) Much appreciated!
              return deepEqual(
                observable.shallowMap(a).entries(),
                observable.shallowMap(b).entries()
              );
            }
            if (getEnumerableKeys(a).length !== getEnumerableKeys(b).length)
              return false;
            for (var prop in a) {
              if (!(prop in b)) return false;
              if (!deepEqual(a[prop], b[prop])) return false;
            }
            return true;
          }
          return false;
        }
        function createInstanceofPredicate(name, clazz) {
          var propName = "isMobX" + name;
          clazz.prototype[propName] = true;
          return function(x) {
            return isObject(x) && x[propName] === true;
          };
        }
        function areBothNaN(a, b) {
          return (
            typeof a === "number" &&
            typeof b === "number" &&
            isNaN(a) &&
            isNaN(b)
          );
        }
        /**
         * Returns whether the argument is an array, disregarding observability.
         */
        function isArrayLike(x) {
          return Array.isArray(x) || isObservableArray(x);
        }
        function isMapLike(x) {
          return isES6Map(x) || isObservableMap(x);
        }
        function isES6Map(thing) {
          if (getGlobal().Map !== undefined && thing instanceof getGlobal().Map)
            return true;
          return false;
        }
        function getMapLikeKeys(map$$1) {
          var keys;
          if (isPlainObject(map$$1)) keys = Object.keys(map$$1);
          else if (Array.isArray(map$$1))
            keys = map$$1.map(function(_a) {
              var key = _a[0];
              return key;
            });
          else if (isMapLike(map$$1)) keys = Array.from(map$$1.keys());
          else fail("Cannot get keys from " + map$$1);
          return keys;
        }
        function primitiveSymbol() {
          return (
            (typeof Symbol === "function" && Symbol.toPrimitive) ||
            "@@toPrimitive"
          );
        }
        function toPrimitive(value) {
          return value === null
            ? null
            : typeof value === "object" ? "" + value : value;
        }

        /**
         * These values will persist if global state is reset
         */
        var persistentKeys = [
          "mobxGuid",
          "resetId",
          "spyListeners",
          "strictMode",
          "runId"
        ];
        var MobXGlobals = (function() {
          function MobXGlobals() {
            /**
             * MobXGlobals version.
             * MobX compatiblity with other versions loaded in memory as long as this version matches.
             * It indicates that the global state still stores similar information
             */
            this.version = 5;
            /**
             * Currently running derivation
             */
            this.trackingDerivation = null;
            /**
             * Are we running a computation currently? (not a reaction)
             */
            this.computationDepth = 0;
            /**
             * Each time a derivation is tracked, it is assigned a unique run-id
             */
            this.runId = 0;
            /**
             * 'guid' for general purpose. Will be persisted amongst resets.
             */
            this.mobxGuid = 0;
            /**
             * Are we in a batch block? (and how many of them)
             */
            this.inBatch = 0;
            /**
             * Observables that don't have observers anymore, and are about to be
             * suspended, unless somebody else accesses it in the same batch
             *
             * @type {IObservable[]}
             */
            this.pendingUnobservations = [];
            /**
             * List of scheduled, not yet executed, reactions.
             */
            this.pendingReactions = [];
            /**
             * Are we currently processing reactions?
             */
            this.isRunningReactions = false;
            /**
             * Is it allowed to change observables at this point?
             * In general, MobX doesn't allow that when running computations and React.render.
             * To ensure that those functions stay pure.
             */
            this.allowStateChanges = true;
            /**
             * If strict mode is enabled, state changes are by default not allowed
             */
            this.strictMode = false;
            /**
             * Used by createTransformer to detect that the global state has been reset.
             */
            this.resetId = 0;
            /**
             * Spy callbacks
             */
            this.spyListeners = [];
            /**
             * Globally attached error handlers that react specifically to errors in reactions
             */
            this.globalReactionErrorHandlers = [];
          }
          return MobXGlobals;
        })();
        var globalState = new MobXGlobals();
        var shareGlobalStateCalled = false;
        var runInIsolationCalled = false;
        var warnedAboutMultipleInstances = false;
        {
          var global_1 = getGlobal();
          if (!global_1.__mobxInstanceCount) {
            global_1.__mobxInstanceCount = 1;
          } else {
            global_1.__mobxInstanceCount++;
            setTimeout(function() {
              if (
                !shareGlobalStateCalled &&
                !runInIsolationCalled &&
                !warnedAboutMultipleInstances
              ) {
                warnedAboutMultipleInstances = true;
                console.warn(
                  "[mobx] Warning: there are multiple mobx instances active. This might lead to unexpected results. See https://github.com/mobxjs/mobx/issues/1082 for details."
                );
              }
            });
          }
        }
        function isolateGlobalState() {
          runInIsolationCalled = true;
          getGlobal().__mobxInstanceCount--;
        }
        function shareGlobalState() {
          // TODO: remove in 4.0; just use peer dependencies instead.
          deprecated(
            "Using `shareGlobalState` is not recommended, use peer dependencies instead. See https://github.com/mobxjs/mobx/issues/1082 for details."
          );
          shareGlobalStateCalled = true;
          var global = getGlobal();
          var ownState = globalState;
          /**
           * Backward compatibility check
           */
          if (
            global.__mobservableTrackingStack ||
            global.__mobservableViewStack
          )
            throw new Error(
              "[mobx] An incompatible version of mobservable is already loaded."
            );
          if (
            global.__mobxGlobal &&
            global.__mobxGlobal.version !== ownState.version
          )
            throw new Error(
              "[mobx] An incompatible version of mobx is already loaded."
            );
          if (global.__mobxGlobal) globalState = global.__mobxGlobal;
          else global.__mobxGlobal = ownState;
        }
        function getGlobalState() {
          return globalState;
        }

        /**
         * For testing purposes only; this will break the internal state of existing observables,
         * but can be used to get back at a stable state after throwing errors
         */
        function resetGlobalState() {
          globalState.resetId++;
          var defaultGlobals = new MobXGlobals();
          for (var key in defaultGlobals)
            if (persistentKeys.indexOf(key) === -1)
              globalState[key] = defaultGlobals[key];
          globalState.allowStateChanges = !globalState.strictMode;
        }

        function hasObservers(observable) {
          return observable.observers && observable.observers.length > 0;
        }
        function getObservers(observable) {
          return observable.observers;
        }
        function addObserver(observable, node) {
          // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
          // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
          // invariantObservers(observable);
          var l = observable.observers.length;
          if (l) {
            // because object assignment is relatively expensive, let's not store data about index 0.
            observable.observersIndexes[node.__mapid] = l;
          }
          observable.observers[l] = node;
          if (observable.lowestObserverState > node.dependenciesState)
            observable.lowestObserverState = node.dependenciesState;
          // invariantObservers(observable);
          // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");
        }
        function removeObserver(observable, node) {
          // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
          // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
          // invariantObservers(observable);
          if (observable.observers.length === 1) {
            // deleting last observer
            observable.observers.length = 0;
            queueForUnobservation(observable);
          } else {
            // deleting from _observersIndexes is straight forward, to delete from _observers, let's swap `node` with last element
            var list = observable.observers;
            var map = observable.observersIndexes;
            var filler = list.pop(); // get last element, which should fill the place of `node`, so the array doesn't have holes
            if (filler !== node) {
              // otherwise node was the last element, which already got removed from array
              var index = map[node.__mapid] || 0; // getting index of `node`. this is the only place we actually use map.
              if (index) {
                // map store all indexes but 0, see comment in `addObserver`
                map[filler.__mapid] = index;
              } else {
                delete map[filler.__mapid];
              }
              list[index] = filler;
            }
            delete map[node.__mapid];
          }
          // invariantObservers(observable);
          // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");
        }
        function queueForUnobservation(observable) {
          if (!observable.isPendingUnobservation) {
            // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
            // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
            observable.isPendingUnobservation = true;
            globalState.pendingUnobservations.push(observable);
          }
        }
        /**
         * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
         * During a batch `onBecomeUnobserved` will be called at most once per observable.
         * Avoids unnecessary recalculations.
         */
        function startBatch() {
          globalState.inBatch++;
        }
        function endBatch() {
          if (--globalState.inBatch === 0) {
            runReactions();
            // the batch is actually about to finish, all unobserving should happen here.
            var list = globalState.pendingUnobservations;
            for (var i = 0; i < list.length; i++) {
              var observable = list[i];
              observable.isPendingUnobservation = false;
              if (observable.observers.length === 0) {
                observable.onBecomeUnobserved();
                // NOTE: onBecomeUnobserved might push to `pendingUnobservations`
              }
            }
            globalState.pendingUnobservations = [];
          }
        }
        function reportObserved(observable) {
          var derivation = globalState.trackingDerivation;
          if (derivation !== null) {
            /**
             * Simple optimization, give each derivation run an unique id (runId)
             * Check if last time this observable was accessed the same runId is used
             * if this is the case, the relation is already known
             */
            if (derivation.runId !== observable.lastAccessedBy) {
              observable.lastAccessedBy = derivation.runId;
              derivation.newObserving[
                derivation.unboundDepsCount++
              ] = observable;
            }
          } else if (observable.observers.length === 0) {
            queueForUnobservation(observable);
          }
        }
        /**
         * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
         * It will propagate changes to observers from previous run
         * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
         * Hopefully self reruning autoruns aren't a feature people should depend on
         * Also most basic use cases should be ok
         */
        // Called by Atom when its value changes
        function propagateChanged(observable) {
          // invariantLOS(observable, "changed start");
          if (observable.lowestObserverState === IDerivationState.STALE) return;
          observable.lowestObserverState = IDerivationState.STALE;
          var observers = observable.observers;
          var i = observers.length;
          while (i--) {
            var d = observers[i];
            if (d.dependenciesState === IDerivationState.UP_TO_DATE)
              d.onBecomeStale();
            d.dependenciesState = IDerivationState.STALE;
          }
          // invariantLOS(observable, "changed end");
        }
        // Called by ComputedValue when it recalculate and its value changed
        function propagateChangeConfirmed(observable) {
          // invariantLOS(observable, "confirmed start");
          if (observable.lowestObserverState === IDerivationState.STALE) return;
          observable.lowestObserverState = IDerivationState.STALE;
          var observers = observable.observers;
          var i = observers.length;
          while (i--) {
            var d = observers[i];
            if (d.dependenciesState === IDerivationState.POSSIBLY_STALE)
              d.dependenciesState = IDerivationState.STALE;
            else if (
              d.dependenciesState === IDerivationState.UP_TO_DATE // this happens during computing of `d`, just keep lowestObserverState up to date.
            )
              observable.lowestObserverState = IDerivationState.UP_TO_DATE;
          }
          // invariantLOS(observable, "confirmed end");
        }
        // Used by computed when its dependency changed, but we don't wan't to immediately recompute.
        function propagateMaybeChanged(observable) {
          // invariantLOS(observable, "maybe start");
          if (observable.lowestObserverState !== IDerivationState.UP_TO_DATE)
            return;
          observable.lowestObserverState = IDerivationState.POSSIBLY_STALE;
          var observers = observable.observers;
          var i = observers.length;
          while (i--) {
            var d = observers[i];
            if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
              d.dependenciesState = IDerivationState.POSSIBLY_STALE;
              d.onBecomeStale();
            }
          }
          // invariantLOS(observable, "maybe end");
        }

        var IDerivationState;
        (function(IDerivationState) {
          // before being run or (outside batch and not being observed)
          // at this point derivation is not holding any data about dependency tree
          IDerivationState[(IDerivationState["NOT_TRACKING"] = -1)] =
            "NOT_TRACKING";
          // no shallow dependency changed since last computation
          // won't recalculate derivation
          // this is what makes mobx fast
          IDerivationState[(IDerivationState["UP_TO_DATE"] = 0)] = "UP_TO_DATE";
          // some deep dependency changed, but don't know if shallow dependency changed
          // will require to check first if UP_TO_DATE or POSSIBLY_STALE
          // currently only ComputedValue will propagate POSSIBLY_STALE
          //
          // having this state is second big optimization:
          // don't have to recompute on every dependency change, but only when it's needed
          IDerivationState[(IDerivationState["POSSIBLY_STALE"] = 1)] =
            "POSSIBLY_STALE";
          // A shallow dependency has changed since last computation and the derivation
          // will need to recompute when it's needed next.
          IDerivationState[(IDerivationState["STALE"] = 2)] = "STALE";
        })(IDerivationState || (IDerivationState = {}));
        var CaughtException = (function() {
          function CaughtException(cause) {
            this.cause = cause;
            // Empty
          }
          return CaughtException;
        })();
        function isCaughtException(e) {
          return e instanceof CaughtException;
        }
        /**
         * Finds out whether any dependency of the derivation has actually changed.
         * If dependenciesState is 1 then it will recalculate dependencies,
         * if any dependency changed it will propagate it by changing dependenciesState to 2.
         *
         * By iterating over the dependencies in the same order that they were reported and
         * stopping on the first change, all the recalculations are only called for ComputedValues
         * that will be tracked by derivation. That is because we assume that if the first x
         * dependencies of the derivation doesn't change then the derivation should run the same way
         * up until accessing x-th dependency.
         */
        function shouldCompute(derivation) {
          switch (derivation.dependenciesState) {
            case IDerivationState.UP_TO_DATE:
              return false;
            case IDerivationState.NOT_TRACKING:
            case IDerivationState.STALE:
              return true;
            case IDerivationState.POSSIBLY_STALE: {
              var prevUntracked = untrackedStart(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.
              var obs = derivation.observing,
                l = obs.length;
              for (var i = 0; i < l; i++) {
                var obj = obs[i];
                if (isComputedValue(obj)) {
                  try {
                    obj.get();
                  } catch (e) {
                    // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                    untrackedEnd(prevUntracked);
                    return true;
                  }
                  // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
                  // and `derivation` is an observer of `obj`
                  if (derivation.dependenciesState === IDerivationState.STALE) {
                    untrackedEnd(prevUntracked);
                    return true;
                  }
                }
              }
              changeDependenciesStateTo0(derivation);
              untrackedEnd(prevUntracked);
              return false;
            }
          }
        }
        function isComputingDerivation() {
          return globalState.trackingDerivation !== null; // filter out actions inside computations
        }
        function checkIfStateModificationsAreAllowed(atom) {
          var hasObservers$$1 = atom.observers.length > 0;
          // Should never be possible to change an observed observable from inside computed, see #798
          if (globalState.computationDepth > 0 && hasObservers$$1)
            fail(getMessage("m031") + atom.name);
          // Should not be possible to change observed state outside strict mode, except during initialization, see #563
          if (!globalState.allowStateChanges && hasObservers$$1)
            fail(
              getMessage(globalState.strictMode ? "m030a" : "m030b") + atom.name
            );
        }
        /**
         * Executes the provided function `f` and tracks which observables are being accessed.
         * The tracking information is stored on the `derivation` object and the derivation is registered
         * as observer of any of the accessed observables.
         */
        function trackDerivedFunction(derivation, f, context) {
          // pre allocate array allocation + room for variation in deps
          // array will be trimmed by bindDependencies
          changeDependenciesStateTo0(derivation);
          derivation.newObserving = new Array(
            derivation.observing.length + 100
          );
          derivation.unboundDepsCount = 0;
          derivation.runId = ++globalState.runId;
          var prevTracking = globalState.trackingDerivation;
          globalState.trackingDerivation = derivation;
          var result;
          try {
            result = f.call(context);
          } catch (e) {
            result = new CaughtException(e);
          }
          globalState.trackingDerivation = prevTracking;
          bindDependencies(derivation);
          return result;
        }
        /**
         * diffs newObserving with observing.
         * update observing to be newObserving with unique observables
         * notify observers that become observed/unobserved
         */
        function bindDependencies(derivation) {
          // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");
          var prevObserving = derivation.observing;
          var observing = (derivation.observing = derivation.newObserving);
          var lowestNewObservingDerivationState = IDerivationState.UP_TO_DATE;
          // Go through all new observables and check diffValue: (this list can contain duplicates):
          //   0: first occurrence, change to 1 and keep it
          //   1: extra occurrence, drop it
          var i0 = 0,
            l = derivation.unboundDepsCount;
          for (var i = 0; i < l; i++) {
            var dep = observing[i];
            if (dep.diffValue === 0) {
              dep.diffValue = 1;
              if (i0 !== i) observing[i0] = dep;
              i0++;
            }
            // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
            // not hitting the condition
            if (dep.dependenciesState > lowestNewObservingDerivationState) {
              lowestNewObservingDerivationState = dep.dependenciesState;
            }
          }
          observing.length = i0;
          derivation.newObserving = null; // newObserving shouldn't be needed outside tracking (statement moved down to work around FF bug, see #614)
          // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
          //   0: it's not in new observables, unobserve it
          //   1: it keeps being observed, don't want to notify it. change to 0
          l = prevObserving.length;
          while (l--) {
            var dep = prevObserving[l];
            if (dep.diffValue === 0) {
              removeObserver(dep, derivation);
            }
            dep.diffValue = 0;
          }
          // Go through all new observables and check diffValue: (now it should be unique)
          //   0: it was set to 0 in last loop. don't need to do anything.
          //   1: it wasn't observed, let's observe it. set back to 0
          while (i0--) {
            var dep = observing[i0];
            if (dep.diffValue === 1) {
              dep.diffValue = 0;
              addObserver(dep, derivation);
            }
          }
          // Some new observed derivations may become stale during this derivation computation
          // so they have had no chance to propagate staleness (#916)
          if (
            lowestNewObservingDerivationState !== IDerivationState.UP_TO_DATE
          ) {
            derivation.dependenciesState = lowestNewObservingDerivationState;
            derivation.onBecomeStale();
          }
        }
        function clearObserving(derivation) {
          // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
          var obs = derivation.observing;
          derivation.observing = [];
          var i = obs.length;
          while (i--) removeObserver(obs[i], derivation);
          derivation.dependenciesState = IDerivationState.NOT_TRACKING;
        }
        function untracked(action) {
          var prev = untrackedStart();
          var res = action();
          untrackedEnd(prev);
          return res;
        }
        function untrackedStart() {
          var prev = globalState.trackingDerivation;
          globalState.trackingDerivation = null;
          return prev;
        }
        function untrackedEnd(prev) {
          globalState.trackingDerivation = prev;
        }
        /**
         * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
         *
         */
        function changeDependenciesStateTo0(derivation) {
          if (derivation.dependenciesState === IDerivationState.UP_TO_DATE)
            return;
          derivation.dependenciesState = IDerivationState.UP_TO_DATE;
          var obs = derivation.observing;
          var i = obs.length;
          while (i--) obs[i].lowestObserverState = IDerivationState.UP_TO_DATE;
        }

        var Reaction = (function() {
          function Reaction(name, onInvalidate) {
            if (name === void 0) {
              name = "Reaction@" + getNextId();
            }
            this.name = name;
            this.onInvalidate = onInvalidate;
            this.observing = []; // nodes we are looking at. Our value depends on these nodes
            this.newObserving = [];
            this.dependenciesState = IDerivationState.NOT_TRACKING;
            this.diffValue = 0;
            this.runId = 0;
            this.unboundDepsCount = 0;
            this.__mapid = "#" + getNextId();
            this.isDisposed = false;
            this._isScheduled = false;
            this._isTrackPending = false;
            this._isRunning = false;
          }
          Reaction.prototype.onBecomeStale = function() {
            this.schedule();
          };
          Reaction.prototype.schedule = function() {
            if (!this._isScheduled) {
              this._isScheduled = true;
              globalState.pendingReactions.push(this);
              runReactions();
            }
          };
          Reaction.prototype.isScheduled = function() {
            return this._isScheduled;
          };
          /**
           * internal, use schedule() if you intend to kick off a reaction
           */
          Reaction.prototype.runReaction = function() {
            if (!this.isDisposed) {
              startBatch();
              this._isScheduled = false;
              if (shouldCompute(this)) {
                this._isTrackPending = true;
                this.onInvalidate();
                if (this._isTrackPending && isSpyEnabled()) {
                  // onInvalidate didn't trigger track right away..
                  spyReport({
                    object: this,
                    type: "scheduled-reaction"
                  });
                }
              }
              endBatch();
            }
          };
          Reaction.prototype.track = function(fn) {
            startBatch();
            var notify = isSpyEnabled();
            var startTime;
            if (notify) {
              startTime = Date.now();
              spyReportStart({
                object: this,
                type: "reaction",
                fn: fn
              });
            }
            this._isRunning = true;
            var result = trackDerivedFunction(this, fn, undefined);
            this._isRunning = false;
            this._isTrackPending = false;
            if (this.isDisposed) {
              // disposed during last run. Clean up everything that was bound after the dispose call.
              clearObserving(this);
            }
            if (isCaughtException(result))
              this.reportExceptionInDerivation(result.cause);
            if (notify) {
              spyReportEnd({
                time: Date.now() - startTime
              });
            }
            endBatch();
          };
          Reaction.prototype.reportExceptionInDerivation = function(error) {
            var _this = this;
            if (this.errorHandler) {
              this.errorHandler(error, this);
              return;
            }
            var message =
              "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" +
              this;
            var messageToUser = getMessage("m037");
            console.error(
              message ||
                messageToUser /* latter will not be true, make sure uglify doesn't remove */,
              error
            );
            /** If debugging brought you here, please, read the above message :-). Tnx! */
            if (isSpyEnabled()) {
              spyReport({
                type: "error",
                message: message,
                error: error,
                object: this
              });
            }
            globalState.globalReactionErrorHandlers.forEach(function(f) {
              return f(error, _this);
            });
          };
          Reaction.prototype.dispose = function() {
            if (!this.isDisposed) {
              this.isDisposed = true;
              if (!this._isRunning) {
                // if disposed while running, clean up later. Maybe not optimal, but rare case
                startBatch();
                clearObserving(this);
                endBatch();
              }
            }
          };
          Reaction.prototype.getDisposer = function() {
            var r = this.dispose.bind(this);
            r.$mobx = this;
            r.onError = registerErrorHandler;
            return r;
          };
          Reaction.prototype.toString = function() {
            return "Reaction[" + this.name + "]";
          };
          Reaction.prototype.whyRun = function() {
            var observing = unique(
              this._isRunning ? this.newObserving : this.observing
            ).map(function(dep) {
              return dep.name;
            });
            return (
              "\nWhyRun? reaction '" +
              this.name +
              "':\n * Status: [" +
              (this.isDisposed
                ? "stopped"
                : this._isRunning
                  ? "running"
                  : this.isScheduled() ? "scheduled" : "idle") +
              "]\n * This reaction will re-run if any of the following observables changes:\n    " +
              joinStrings(observing) +
              "\n    " +
              (this._isRunning
                ? " (... or any observable accessed during the remainder of the current run)"
                : "") +
              "\n\t" +
              getMessage("m038") +
              "\n"
            );
          };
          return Reaction;
        })();
        function registerErrorHandler(handler) {
          invariant(
            this && this.$mobx && isReaction(this.$mobx),
            "Invalid `this`"
          );
          invariant(
            !this.$mobx.errorHandler,
            "Only one onErrorHandler can be registered"
          );
          this.$mobx.errorHandler = handler;
        }
        function onReactionError(handler) {
          globalState.globalReactionErrorHandlers.push(handler);
          return function() {
            var idx = globalState.globalReactionErrorHandlers.indexOf(handler);
            if (idx >= 0)
              globalState.globalReactionErrorHandlers.splice(idx, 1);
          };
        }
        /**
         * Magic number alert!
         * Defines within how many times a reaction is allowed to re-trigger itself
         * until it is assumed that this is gonna be a never ending loop...
         */
        var MAX_REACTION_ITERATIONS = 100;
        var reactionScheduler = function(f) {
          return f();
        };
        function runReactions() {
          // Trampolining, if runReactions are already running, new reactions will be picked up
          if (globalState.inBatch > 0 || globalState.isRunningReactions) return;
          reactionScheduler(runReactionsHelper);
        }
        function runReactionsHelper() {
          globalState.isRunningReactions = true;
          var allReactions = globalState.pendingReactions;
          var iterations = 0;
          // While running reactions, new reactions might be triggered.
          // Hence we work with two variables and check whether
          // we converge to no remaining reactions after a while.
          while (allReactions.length > 0) {
            if (++iterations === MAX_REACTION_ITERATIONS) {
              console.error(
                "Reaction doesn't converge to a stable state after " +
                  MAX_REACTION_ITERATIONS +
                  " iterations." +
                  (" Probably there is a cycle in the reactive function: " +
                    allReactions[0])
              );
              allReactions.splice(0); // clear reactions
            }
            var remainingReactions = allReactions.splice(0);
            for (var i = 0, l = remainingReactions.length; i < l; i++)
              remainingReactions[i].runReaction();
          }
          globalState.isRunningReactions = false;
        }
        var isReaction = createInstanceofPredicate("Reaction", Reaction);
        function setReactionScheduler(fn) {
          var baseScheduler = reactionScheduler;
          reactionScheduler = function(f) {
            return fn(function() {
              return baseScheduler(f);
            });
          };
        }

        function asReference(value) {
          deprecated("asReference is deprecated, use observable.ref instead");
          return observable.ref(value);
        }
        function asStructure(value) {
          deprecated(
            "asStructure is deprecated. Use observable.struct, computed.struct or reaction options instead."
          );
          return observable.struct(value);
        }
        function asFlat(value) {
          deprecated("asFlat is deprecated, use observable.shallow instead");
          return observable.shallow(value);
        }
        function asMap(data) {
          deprecated(
            "asMap is deprecated, use observable.map or observable.shallowMap instead"
          );
          return observable.map(data || {});
        }

        function createComputedDecorator(equals) {
          return createClassPropertyDecorator(
            function(target, name, _, __, originalDescriptor) {
              invariant(
                typeof originalDescriptor !== "undefined",
                getMessage("m009")
              );
              invariant(
                typeof originalDescriptor.get === "function",
                getMessage("m010")
              );
              var adm = asObservableObject(target, "");
              defineComputedProperty(
                adm,
                name,
                originalDescriptor.get,
                originalDescriptor.set,
                equals,
                false
              );
            },
            function(name) {
              var observable = this.$mobx.values[name];
              if (
                observable === undefined // See #505
              )
                return undefined;
              return observable.get();
            },
            function(name, value) {
              this.$mobx.values[name].set(value);
            },
            false,
            false
          );
        }
        var computedDecorator = createComputedDecorator(comparer.default);
        var computedStructDecorator = createComputedDecorator(
          comparer.structural
        );
        /**
         * Decorator for class properties: @computed get value() { return expr; }.
         * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
         */
        var computed = function computed(arg1, arg2, arg3) {
          if (typeof arg2 === "string") {
            return computedDecorator.apply(null, arguments);
          }
          invariant(typeof arg1 === "function", getMessage("m011"));
          invariant(arguments.length < 3, getMessage("m012"));
          var opts = typeof arg2 === "object" ? arg2 : {};
          opts.setter = typeof arg2 === "function" ? arg2 : opts.setter;
          var equals = opts.equals
            ? opts.equals
            : opts.compareStructural || opts.struct
              ? comparer.structural
              : comparer.default;
          return new ComputedValue(
            arg1,
            opts.context,
            equals,
            opts.name || arg1.name || "",
            opts.setter
          );
        };
        computed.struct = computedStructDecorator;
        computed.equals = createComputedDecorator;

        function getAtom(thing, property) {
          if (typeof thing === "object" && thing !== null) {
            if (isObservableArray(thing)) {
              invariant(property === undefined, getMessage("m036"));
              return thing.$mobx.atom;
            }
            if (isObservableMap(thing)) {
              var anyThing = thing;
              if (property === undefined) return getAtom(anyThing._keys);
              var observable =
                anyThing._data[property] || anyThing._hasMap[property];
              invariant(
                !!observable,
                "the entry '" +
                  property +
                  "' does not exist in the observable map '" +
                  getDebugName(thing) +
                  "'"
              );
              return observable;
            }
            // Initializers run lazily when transpiling to babel, so make sure they are run...
            runLazyInitializers(thing);
            if (property && !thing.$mobx) thing[property]; // See #1072 // TODO: remove in 4.0
            if (isObservableObject(thing)) {
              if (!property) return fail("please specify a property");
              var observable = thing.$mobx.values[property];
              invariant(
                !!observable,
                "no observable property '" +
                  property +
                  "' found on the observable object '" +
                  getDebugName(thing) +
                  "'"
              );
              return observable;
            }
            if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
              return thing;
            }
          } else if (typeof thing === "function") {
            if (isReaction(thing.$mobx)) {
              // disposer function
              return thing.$mobx;
            }
          }
          return fail("Cannot obtain atom from " + thing);
        }
        function getAdministration(thing, property) {
          invariant(thing, "Expecting some object");
          if (property !== undefined)
            return getAdministration(getAtom(thing, property));
          if (isAtom(thing) || isComputedValue(thing) || isReaction(thing))
            return thing;
          if (isObservableMap(thing)) return thing;
          // Initializers run lazily when transpiling to babel, so make sure they are run...
          runLazyInitializers(thing);
          if (thing.$mobx) return thing.$mobx;
          invariant(false, "Cannot obtain administration from " + thing);
        }
        function getDebugName(thing, property) {
          var named;
          if (property !== undefined) named = getAtom(thing, property);
          else if (isObservableObject(thing) || isObservableMap(thing))
            named = getAdministration(thing);
          else named = getAtom(thing); // valid for arrays as well
          return named.name;
        }

        function isComputed(value, property) {
          if (value === null || value === undefined) return false;
          if (property !== undefined) {
            if (isObservableObject(value) === false) return false;
            if (!value.$mobx.values[property]) return false;
            var atom = getAtom(value, property);
            return isComputedValue(atom);
          }
          return isComputedValue(value);
        }

        function observe(thing, propOrCb, cbOrFire, fireImmediately) {
          if (typeof cbOrFire === "function")
            return observeObservableProperty(
              thing,
              propOrCb,
              cbOrFire,
              fireImmediately
            );
          else return observeObservable(thing, propOrCb, cbOrFire);
        }
        function observeObservable(thing, listener, fireImmediately) {
          return getAdministration(thing).observe(listener, fireImmediately);
        }
        function observeObservableProperty(
          thing,
          property,
          listener,
          fireImmediately
        ) {
          return getAdministration(thing, property).observe(
            listener,
            fireImmediately
          );
        }

        function intercept(thing, propOrHandler, handler) {
          if (typeof handler === "function")
            return interceptProperty(thing, propOrHandler, handler);
          else return interceptInterceptable(thing, propOrHandler);
        }
        function interceptInterceptable(thing, handler) {
          return getAdministration(thing).intercept(handler);
        }
        function interceptProperty(thing, property, handler) {
          return getAdministration(thing, property).intercept(handler);
        }

        /**
         * expr can be used to create temporarily views inside views.
         * This can be improved to improve performance if a value changes often, but usually doesn't affect the outcome of an expression.
         *
         * In the following example the expression prevents that a component is rerender _each time_ the selection changes;
         * instead it will only rerenders when the current todo is (de)selected.
         *
         * reactiveComponent((props) => {
         *     const todo = props.todo;
         *     const isSelected = mobx.expr(() => props.viewState.selection === todo);
         *     return <div className={isSelected ? "todo todo-selected" : "todo"}>{todo.title}</div>
         * });
         *
         */
        function expr(expr, scope) {
          if (!isComputingDerivation()) console.warn(getMessage("m013"));
          // optimization: would be more efficient if the expr itself wouldn't be evaluated first on the next change, but just a 'changed' signal would be fired
          return computed(expr, { context: scope }).get();
        }

        function toJS(source, detectCycles, __alreadySeen) {
          if (detectCycles === void 0) {
            detectCycles = true;
          }
          if (__alreadySeen === void 0) {
            __alreadySeen = [];
          }
          // optimization: using ES6 map would be more efficient!
          // optimization: lift this function outside toJS, this makes recursion expensive
          function cache(value) {
            if (detectCycles) __alreadySeen.push([source, value]);
            return value;
          }
          if (isObservable(source)) {
            if (detectCycles && __alreadySeen === null) __alreadySeen = [];
            if (detectCycles && source !== null && typeof source === "object") {
              for (var i = 0, l = __alreadySeen.length; i < l; i++)
                if (__alreadySeen[i][0] === source) return __alreadySeen[i][1];
            }
            if (isObservableArray(source)) {
              var res = cache([]);
              var toAdd = source.map(function(value) {
                return toJS(value, detectCycles, __alreadySeen);
              });
              res.length = toAdd.length;
              for (var i = 0, l = toAdd.length; i < l; i++) res[i] = toAdd[i];
              return res;
            }
            if (isObservableObject(source)) {
              var res = cache({});
              for (var key in source)
                res[key] = toJS(source[key], detectCycles, __alreadySeen);
              return res;
            }
            if (isObservableMap(source)) {
              var res_1 = cache({});
              source.forEach(function(value, key) {
                return (res_1[key] = toJS(value, detectCycles, __alreadySeen));
              });
              return res_1;
            }
            if (isObservableValue(source))
              return toJS(source.get(), detectCycles, __alreadySeen);
          }
          return source;
        }

        function createTransformer(transformer, onCleanup) {
          invariant(
            typeof transformer === "function" && transformer.length < 2,
            "createTransformer expects a function that accepts one argument"
          );
          // Memoizes: object id -> reactive view that applies transformer to the object
          var objectCache = {};
          // If the resetId changes, we will clear the object cache, see #163
          // This construction is used to avoid leaking refs to the objectCache directly
          var resetId = globalState.resetId;
          // Local transformer class specifically for this transformer
          var Transformer = (function(_super) {
            __extends(Transformer, _super);
            function Transformer(sourceIdentifier, sourceObject) {
              var _this =
                _super.call(
                  this,
                  function() {
                    return transformer(sourceObject);
                  },
                  undefined,
                  comparer.default,
                  "Transformer-" + transformer.name + "-" + sourceIdentifier,
                  undefined
                ) || this;
              _this.sourceIdentifier = sourceIdentifier;
              _this.sourceObject = sourceObject;
              return _this;
            }
            Transformer.prototype.onBecomeUnobserved = function() {
              var lastValue = this.value;
              _super.prototype.onBecomeUnobserved.call(this);
              delete objectCache[this.sourceIdentifier];
              if (onCleanup) onCleanup(lastValue, this.sourceObject);
            };
            return Transformer;
          })(ComputedValue);
          return function(object) {
            if (resetId !== globalState.resetId) {
              objectCache = {};
              resetId = globalState.resetId;
            }
            var identifier = getMemoizationId(object);
            var reactiveTransformer = objectCache[identifier];
            if (reactiveTransformer) return reactiveTransformer.get();
            // Not in cache; create a reactive view
            reactiveTransformer = objectCache[identifier] = new Transformer(
              identifier,
              object
            );
            return reactiveTransformer.get();
          };
        }
        function getMemoizationId(object) {
          if (typeof object === "string" || typeof object === "number")
            return object;
          if (object === null || typeof object !== "object")
            throw new Error(
              "[mobx] transform expected some kind of object or primitive value, got: " +
                object
            );
          var tid = object.$transformId;
          if (tid === undefined) {
            tid = getNextId();
            addHiddenProp(object, "$transformId", tid);
          }
          return tid;
        }

        function log(msg) {
          console.log(msg);
          return msg;
        }
        function whyRun(thing, prop) {
          switch (arguments.length) {
            case 0:
              thing = globalState.trackingDerivation;
              if (!thing) return log(getMessage("m024"));
              break;
            case 2:
              thing = getAtom(thing, prop);
              break;
          }
          thing = getAtom(thing);
          if (isComputedValue(thing)) return log(thing.whyRun());
          else if (isReaction(thing)) return log(thing.whyRun());
          return fail(getMessage("m025"));
        }

        function getDependencyTree(thing, property) {
          return nodeToDependencyTree(getAtom(thing, property));
        }
        function nodeToDependencyTree(node) {
          var result = {
            name: node.name
          };
          if (node.observing && node.observing.length > 0)
            result.dependencies = unique(node.observing).map(
              nodeToDependencyTree
            );
          return result;
        }
        function getObserverTree(thing, property) {
          return nodeToObserverTree(getAtom(thing, property));
        }
        function nodeToObserverTree(node) {
          var result = {
            name: node.name
          };
          if (hasObservers(node))
            result.observers = getObservers(node).map(nodeToObserverTree);
          return result;
        }

        function interceptReads(thing, propOrHandler, handler) {
          var target;
          if (
            isObservableMap(thing) ||
            isObservableArray(thing) ||
            isObservableValue(thing)
          ) {
            target = getAdministration(thing);
          } else if (isObservableObject(thing)) {
            if (typeof propOrHandler !== "string")
              return fail(
                "InterceptReads can only be used with a specific property, not with an object in general"
              );
            target = getAdministration(thing, propOrHandler);
          } else {
            return fail(
              "Expected observable map, object or array as first array"
            );
          }
          if (target.dehancer !== undefined)
            return fail("An intercept reader was already established");
          target.dehancer =
            typeof propOrHandler === "function" ? propOrHandler : handler;
          return function() {
            target.dehancer = undefined;
          };
        }

        /**
         * (c) Michel Weststrate 2015 - 2016
         * MIT Licensed
         *
         * Welcome to the mobx sources! To get an global overview of how MobX internally works,
         * this is a good place to start:
         * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
         *
         * Source folders:
         * ===============
         *
         * - api/     Most of the public static methods exposed by the module can be found here.
         * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
         * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
         * - utils/   Utility stuff.
         *
         */
        var extras = {
          allowStateChanges: allowStateChanges,
          deepEqual: deepEqual,
          getAtom: getAtom,
          getDebugName: getDebugName,
          getDependencyTree: getDependencyTree,
          getAdministration: getAdministration,
          getGlobalState: getGlobalState,
          getObserverTree: getObserverTree,
          interceptReads: interceptReads,
          isComputingDerivation: isComputingDerivation,
          isSpyEnabled: isSpyEnabled,
          onReactionError: onReactionError,
          reserveArrayBuffer: reserveArrayBuffer,
          resetGlobalState: resetGlobalState,
          isolateGlobalState: isolateGlobalState,
          shareGlobalState: shareGlobalState,
          spyReport: spyReport,
          spyReportEnd: spyReportEnd,
          spyReportStart: spyReportStart,
          setReactionScheduler: setReactionScheduler
        };
        var everything = {
          Reaction: Reaction,
          untracked: untracked,
          Atom: Atom,
          BaseAtom: BaseAtom,
          useStrict: useStrict,
          isStrictModeEnabled: isStrictModeEnabled,
          spy: spy,
          comparer: comparer,
          asReference: asReference,
          asFlat: asFlat,
          asStructure: asStructure,
          asMap: asMap,
          isModifierDescriptor: isModifierDescriptor,
          isObservableObject: isObservableObject,
          isBoxedObservable: isObservableValue,
          isObservableArray: isObservableArray,
          ObservableMap: ObservableMap,
          isObservableMap: isObservableMap,
          map: map,
          transaction: transaction,
          observable: observable,
          computed: computed,
          isObservable: isObservable,
          isComputed: isComputed,
          extendObservable: extendObservable,
          extendShallowObservable: extendShallowObservable,
          observe: observe,
          intercept: intercept,
          autorun: autorun,
          autorunAsync: autorunAsync,
          when: when,
          reaction: reaction,
          action: action,
          isAction: isAction,
          runInAction: runInAction,
          expr: expr,
          toJS: toJS,
          createTransformer: createTransformer,
          whyRun: whyRun,
          isArrayLike: isArrayLike,
          extras: extras
        };
        var warnedAboutDefaultExport = false;
        var _loop_1 = function(p) {
          var val = everything[p];
          Object.defineProperty(everything, p, {
            get: function() {
              if (!warnedAboutDefaultExport) {
                warnedAboutDefaultExport = true;
                console.warn(
                  "Using default export (`import mobx from 'mobx'`) is deprecated " +
                    "and won’t work in mobx@4.0.0\n" +
                    "Use `import * as mobx from 'mobx'` instead"
                );
              }
              return val;
            }
          });
        };
        for (var p in everything) {
          _loop_1(p);
        }
        if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
          __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
            spy: spy,
            extras: extras
          });
        }

        /* unused harmony default export */ var _unused_webpack_default_export = everything;

        /* WEBPACK VAR INJECTION */
      }.call(__webpack_exports__, __webpack_require__(33)));

      /***/
    },
    /* 10 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp__ = __webpack_require__(
        28
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_path_to_regexp__
      );

      function registerRoutes(routes, addon, parentData) {
        routes.forEach(function(route) {
          var data = addon.register(route.public, parentData);
          registerRoutes(route.children, addon, data);
        });
      }

      var withLeadingSlash = function(path) {
        return path.charAt(0) === "/" ? path : "/" + path;
      };
      var stripLeadingSlash = function(path) {
        return path.charAt(0) === "/" ? path.slice(1) : path;
      };
      var withTrailingSlash = function(path) {
        return path.charAt(path.length - 1) === "/" ? path : path + "/";
      };
      var join = function(beginning, end) {
        return withTrailingSlash(beginning) + end;
      };

      function createPathnameAddon(options) {
        var knownPaths = {};
        var cache = {};
        return {
          name: "pathname",
          register: function(route, parent) {
            var name = route.name,
              path = route.path;
            if (knownPaths[name] !== undefined) {
              console.warn(
                'A pathname with the name "' +
                  name +
                  '" already exists. Each route should' +
                  "have a unique name. By registering a pathname with a name that already exists, " +
                  "you are overwriting the existing pathname. This may break your application."
              );
            }
            var base;
            if (parent && knownPaths[parent]) {
              base = knownPaths[parent];
            }
            knownPaths[name] = base ? join(base, path) : path;
            return name;
          },
          get: function(name, params) {
            if (knownPaths[name] == null) {
              console.error(
                "Could not generate pathname for " +
                  name +
                  " because it is not registered."
              );
              return;
            }
            var compile = cache[name]
              ? cache[name]
              : (cache[
                  name
                ] = __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default.a.compile(
                  knownPaths[name]
                ));
            return withLeadingSlash(compile(params, options));
          },
          reset: function() {
            knownPaths = {};
            cache = {};
          }
        };
      }

      function matchRoute(route, pathname, matches, parentPath) {
        var testPath = stripLeadingSlash(pathname);
        var _a = route.match,
          re = _a.re,
          keys = _a.keys,
          mustBeExact = _a.mustBeExact;
        var children = route.children;
        var match = re.exec(testPath);
        if (!match) {
          return false;
        }
        var segment = match[0],
          parsed = match.slice(1);
        var params = {};
        keys.forEach(function(key, index) {
          params[key.name] = parsed[index];
        });
        var uriString =
          parentPath != null
            ? join(parentPath, segment)
            : withLeadingSlash(segment);
        matches.push({ route: route, params: params });
        // if there are no children, then we accept the match
        if (!children || !children.length) {
          return true;
        }
        // children only need to match against unmatched segments
        var remainder = testPath.slice(segment.length);
        var notExact = !!remainder.length;
        var hasChildMatch = children.some(function(c) {
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
            } catch (e) {
              console.error(e);
              value = params[key];
            }
          }
          output[key] = value;
        }
        return output;
      }

      function routeProperties(route, props) {
        return {
          params: props.params,
          location: props.location,
          name: route.public.name
        };
      }

      function createResponse(location, routes) {
        var matches = [];
        var partials = [];
        var params = {};
        var route;
        // determine which route(s) match, then use the exact match
        // as the matched route and the rest as partial routes
        routes.some(function(route) {
          return matchRoute(route, location.pathname, matches);
        });
        if (matches.length) {
          var bestMatch = matches.pop();
          matches.forEach(function(m) {
            partials.push(m.route.public.name);
            Object.assign(params, parseParams(m.params, m.route.paramParsers));
          });
          route = bestMatch.route;
          Object.assign(
            params,
            parseParams(bestMatch.params, route.paramParsers)
          );
        }
        // start building the properties of the response object
        var props = {
          location: location,
          params: params,
          partials: partials,
          status: route != null ? 200 : 404,
          body: undefined,
          data: undefined,
          title: ""
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
        ]).then(
          function(_a) {
            var initial = _a[0],
              every = _a[1];
            return {
              route: route,
              props: props,
              error: null,
              resolved: { initial: initial, every: every }
            };
          },
          function(err) {
            // when there is an uncaught error, set it on the response
            return {
              route: route,
              props: props,
              error: err,
              resolved: null
            };
          }
        );
      }

      function responseSetters(props) {
        return {
          redirect: function(to, code) {
            if (code === void 0) {
              code = 301;
            }
            props.status = code;
            props.redirectTo = to;
          },
          error: function(err) {
            props.error = err;
          },
          status: function(code) {
            props.status = code;
          },
          data: function(data) {
            props.data = data;
          },
          body: function(body) {
            props.body = body;
          },
          title: function(title) {
            props.title = title;
          }
        };
      }
      function freezeResponse(route, props) {
        var response = Object.assign(
          {
            key: props.location.key,
            name: route ? route.public.name : undefined
          },
          props
        );
        return response;
      }
      function finishResponse(pending, addons) {
        var error = pending.error,
          resolved = pending.resolved,
          route = pending.route,
          props = pending.props;
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
        return function() {
          if (hasRun) {
            return promise;
          }
          promise = fn();
          hasRun = true;
          return promise;
        };
      }

      var createRoute = function(options) {
        var name = options.name,
          path = options.path,
          _a = options.pathOptions,
          pathOptions = _a === void 0 ? {} : _a,
          _b = options.children,
          descriptorChildren = _b === void 0 ? [] : _b,
          _c = options.match,
          match = _c === void 0 ? {} : _c,
          extra = options.extra,
          paramParsers = options.params;
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
        var re = __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default()(
          path,
          keys,
          pathOptions
        );
        return {
          public: {
            name: name,
            path: path,
            keys: keys.map(function(key) {
              return key.name;
            }),
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
          paramParsers: paramParsers
        };
      };

      function createRouter(history, routeArray, options) {
        if (options === void 0) {
          options = {};
        }
        var _a = options,
          _b = _a.addons,
          userAddons = _b === void 0 ? [] : _b,
          _c = _a.sideEffects,
          sideEffects = _c === void 0 ? [] : _c,
          cache = _a.cache,
          pathnameOptions = _a.pathnameOptions;
        var beforeSideEffects = [];
        var afterSideEffects = [];
        sideEffects.forEach(function(se) {
          if (se.after) {
            afterSideEffects.push(se.fn);
          } else {
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
          allAddons.forEach(function(addon) {
            addon.reset();
            registeredAddons[addon.name] = addon.get;
            registerRoutes(routes, addon);
          });
        }
        var responseHandlers = [];
        var oneTimers = [];
        var previous = [];
        function respond(fn, options) {
          if (typeof fn !== "function") {
            throw new Error(
              'The first argument passed to "respond" must be a function'
            );
          }
          var _a = (options || {}).once,
            once = _a === void 0 ? false : _a;
          if (once) {
            if (previous.length) {
              fn.apply(null, previous);
            } else {
              oneTimers.push(fn);
            }
          } else {
            // Always call response handler immediately if a previous
            // response/action exists.
            if (previous.length) {
              fn.apply(null, previous);
            }
            var newLength_1 = responseHandlers.push(fn);
            return function() {
              responseHandlers[newLength_1 - 1] = null;
            };
          }
        }
        function emit(response, action) {
          beforeSideEffects.forEach(function(fn) {
            fn(response, action, curi);
          });
          responseHandlers.forEach(function(fn) {
            if (fn != null) {
              fn(response, action, curi);
            }
          });
          // calling one time responseHandlers after regular responseHandlers
          // ensures that those are called prior to the one time fns
          while (oneTimers.length) {
            var fn = oneTimers.pop();
            fn(response, action, curi);
          }
          afterSideEffects.forEach(function(fn) {
            fn(response, action, curi);
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
          createResponse(pendingNav.location, routes).then(function(
            pendingResponse
          ) {
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
          previous = [response, action, curi];
          if (response.redirectTo) {
            history.replace(response.redirectTo);
          }
        }
        // now that everything is defined, actually do the setup
        setupRoutesAndAddons(routeArray);
        history.respondWith(navigationHandler);
        var curi = {
          addons: registeredAddons,
          history: history,
          respond: respond,
          refresh: setupRoutesAndAddons
        };
        return curi;
      }

      /* harmony default export */ __webpack_exports__[
        "default"
      ] = createRouter;

      /***/
    },
    /* 11 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mobx__ = __webpack_require__(
        9
      );

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

      function __decorate(decorators, target, key, desc) {
        var c = arguments.length,
          r =
            c < 3
              ? target
              : desc === null
                ? (desc = Object.getOwnPropertyDescriptor(target, key))
                : desc,
          d;
        if (
          typeof Reflect === "object" &&
          typeof Reflect.decorate === "function"
        )
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if ((d = decorators[i]))
              r =
                (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) ||
                r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      }

      var CuriStore = /** @class */ (function() {
        function CuriStore(router) {
          var _this = this;
          this.router = router;
          this.response = null;
          this.action = null;
          router.respond(function(response, action$$1) {
            _this.update(response, action$$1);
          });
        }
        CuriStore.prototype.update = function(response, action$$1) {
          this.response = response;
          this.action = action$$1;
        };
        __decorate(
          [__WEBPACK_IMPORTED_MODULE_0_mobx__["a" /* observable */]],
          CuriStore.prototype,
          "response",
          void 0
        );
        __decorate(
          [__WEBPACK_IMPORTED_MODULE_0_mobx__["a" /* observable */]],
          CuriStore.prototype,
          "action",
          void 0
        );
        __decorate(
          [__WEBPACK_IMPORTED_MODULE_0_mobx__["b" /* action */].bound],
          CuriStore.prototype,
          "update",
          null
        );
        return CuriStore;
      })();

      /* harmony default export */ __webpack_exports__["default"] = CuriStore;

      /***/
    },
    /* 12 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hickory_root__ = __webpack_require__(
        19
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__ = __webpack_require__(
        17
      );

      function Browser(options) {
        if (options === void 0) {
          options = {};
        }
        if (
          !__webpack_require__.i(
            __WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__[
              "a" /* domExists */
            ]
          )()
        ) {
          return;
        }
        if (!options.raw) {
          options.raw =
            __WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__[
              "b" /* ensureEncodedPathname */
            ];
        }
        var _a = __webpack_require__.i(
            __WEBPACK_IMPORTED_MODULE_0__hickory_root__["a" /* default */]
          )(options),
          createLocation = _a.createLocation,
          createPath = _a.createPath,
          confirmNavigation = _a.confirmNavigation,
          confirmWith = _a.confirmWith,
          removeConfirmation = _a.removeConfirmation,
          keygen = _a.keygen;
        var beforeDestroy = [];
        // when true, pop will run without attempting to get user confirmation
        var reverting = false;
        function locationFromBrowser(providedState) {
          var _a = window.location,
            pathname = _a.pathname,
            search = _a.search,
            hash = _a.hash;
          var path = pathname + search + hash;
          var _b =
              providedState ||
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__[
                  "c" /* getStateFromHistory */
                ]
              )(),
            key = _b.key,
            state = _b.state;
          if (!key) {
            key = keygen.major();
            window.history.replaceState({ key: key, state: state }, "", path);
          }
          return createLocation(path, key, state);
        }
        function toHref(location) {
          return createPath(location);
        }
        var responseHandler;
        function finalizePush(location) {
          return function() {
            var path = toHref(location);
            var key = location.key,
              state = location.state;
            window.history.pushState({ key: key, state: state }, "", path);
            browserHistory.location = location;
            browserHistory.action = "PUSH";
          };
        }
        function finalizeReplace(location) {
          return function() {
            var path = toHref(location);
            var key = location.key,
              state = location.state;
            window.history.replaceState({ key: key, state: state }, "", path);
            browserHistory.location = location;
            browserHistory.action = "REPLACE";
          };
        }
        var browserHistory = {
          // set action before location because locationFromBrowser enforces that the location has a key
          action:
            __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__[
                "c" /* getStateFromHistory */
              ]
            )().key !== undefined
              ? "POP"
              : "PUSH",
          location: locationFromBrowser(),
          // set response handler
          respondWith: function(fn) {
            responseHandler = fn;
            responseHandler({
              location: browserHistory.location,
              action: browserHistory.action,
              finish: function() {},
              cancel: function() {}
            });
          },
          // convenience
          toHref: toHref,
          confirmWith: confirmWith,
          removeConfirmation: removeConfirmation,
          destroy: function destroy() {
            beforeDestroy.forEach(function(fn) {
              fn();
            });
          },
          // navigation
          navigate: function navigate(to) {
            var location = createLocation(to, null);
            var path = createPath(location);
            var currentPath = createPath(browserHistory.location);
            if (path === currentPath) {
              browserHistory.replace(to);
            } else {
              browserHistory.push(to);
            }
          },
          push: function push(to) {
            // the major version should be the current key + 1
            var key = keygen.major(browserHistory.location.key);
            var location = createLocation(to, key);
            confirmNavigation(
              {
                to: location,
                from: browserHistory.location,
                action: "PUSH"
              },
              function() {
                if (!responseHandler) {
                  return;
                }
                responseHandler({
                  location: location,
                  action: "PUSH",
                  finish: finalizePush(location),
                  cancel: function() {}
                });
              }
            );
          },
          replace: function replace(to) {
            // pass the current key to just increment the minor portion
            var key = keygen.minor(browserHistory.location.key);
            var location = createLocation(to, key);
            confirmNavigation(
              {
                to: location,
                from: browserHistory.location,
                action: "REPLACE"
              },
              function() {
                if (!responseHandler) {
                  return;
                }
                responseHandler({
                  location: location,
                  action: "REPLACE",
                  finish: finalizeReplace(location),
                  cancel: function() {}
                });
              }
            );
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
                action: "POP",
                finish: function() {
                  browserHistory.action = "POP";
                },
                cancel: function() {}
              });
            } else {
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
          confirmNavigation(
            {
              to: location,
              from: browserHistory.location,
              action: "POP"
            },
            function() {
              if (!responseHandler) {
                return;
              }
              responseHandler({
                location: location,
                action: "POP",
                finish: function() {
                  browserHistory.location = location;
                  browserHistory.action = "POP";
                },
                cancel: function(nextAction) {
                  if (nextAction === "POP") {
                    return;
                  }
                  reverting = true;
                  window.history.go(-1 * diff);
                }
              });
            },
            function() {
              reverting = true;
              window.history.go(-1 * diff);
            }
          );
        }
        // need to listen for browser navigation events
        beforeDestroy.push(
          __webpack_require__.i(
            __WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__[
              "d" /* createEventCoordinator */
            ]
          )({
            popstate: function(event) {
              if (
                __webpack_require__.i(
                  __WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__[
                    "e" /* ignorablePopstateEvent */
                  ]
                )(event)
              ) {
                return;
              }
              pop(event.state);
            }
          })
        );
        return browserHistory;
      }

      /* harmony default export */ __webpack_exports__["default"] = Browser;
      //# sourceMappingURL=hickory-browser.es.js.map

      /***/
    },
    /* 13 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _react = __webpack_require__(3);

      var _mobxReact = __webpack_require__(2);

      var ReactiveBase = (0, _mobxReact.inject)(function(_ref) {
        var curi = _ref.curi;
        return {
          router: curi.router,
          response: curi.response,
          action: curi.action
        };
      })((0, _mobxReact.observer)(_react.CuriBase));

      exports.default = ReactiveBase;

      /***/
    },
    /* 14 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var products = {
        "12": {
          id: "12",
          name: "Shoe Buckle"
        },
        "34": {
          id: "34",
          name: "Door Knocker"
        },
        "56": {
          id: "56",
          name: "Assorted Sticks"
        },
        "78": {
          id: "78",
          name: "Stick Layout Guide"
        }
      };

      exports.default = products;

      /***/
    },
    /* 15 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      exports.default = function(response) {
        var Body = response.body;

        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_NavLinks2.default, null),
          _react2.default.createElement(Body, { response: response })
        );
      };

      var _react = __webpack_require__(0);

      var _react2 = _interopRequireDefault(_react);

      var _NavLinks = __webpack_require__(21);

      var _NavLinks2 = _interopRequireDefault(_NavLinks);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      /***/
    },
    /* 16 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _Home = __webpack_require__(20);

      var _Home2 = _interopRequireDefault(_Home);

      var _Product = __webpack_require__(23);

      var _Product2 = _interopRequireDefault(_Product);

      var _NotFound = __webpack_require__(22);

      var _NotFound2 = _interopRequireDefault(_NotFound);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      exports.default = [
        {
          name: "Home",
          path: "",
          match: {
            response: function response(_ref) {
              var set = _ref.set;

              set.body(_Home2.default);
            }
          }
        },
        {
          name: "Product",
          path: "products/:id",
          match: {
            response: function response(_ref2) {
              var route = _ref2.route,
                set = _ref2.set;

              set.body(_Product2.default);
            }
          }
        },
        {
          name: "Not Found",
          path: "(.*)",
          match: {
            response: function response(_ref3) {
              var set = _ref3.set;

              set.body(_NotFound2.default);
            }
          }
        }
      ];

      /***/
    },
    /* 17 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "b",
        function() {
          return ensureEncodedPathname;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "a",
        function() {
          return domExists;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "e",
        function() {
          return ignorablePopstateEvent;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "c",
        function() {
          return getStateFromHistory;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "d",
        function() {
          return createEventCoordinator;
        }
      );
      function ensureEncodedPathname(pathname) {
        var a = document.createElement("a");
        a.setAttribute("href", pathname);
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
        return (
          event.state === undefined &&
          navigator.userAgent.indexOf("CriOS") === -1
        );
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

      //# sourceMappingURL=hickory-dom-utils.es.js.map

      /***/
    },
    /* 18 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* unused harmony export ensureBeginsWith */
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "b",
        function() {
          return completePathname;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "d",
        function() {
          return completeHash;
        }
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "c",
        function() {
          return completeQuery;
        }
      );
      /* unused harmony export stripPrefix */
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "a",
        function() {
          return stripBaseSegment;
        }
      );
      function ensureBeginsWith(str, prefix) {
        if (!str) {
          return "";
        }
        return str.indexOf(prefix) === 0 ? str : prefix + str;
      }
      function completePathname(pathname) {
        return ensureBeginsWith(pathname, "/");
      }
      function completeHash(hash) {
        return ensureBeginsWith(hash, "#");
      }
      function completeQuery(query) {
        return ensureBeginsWith(query, "?");
      }
      function stripPrefix(str, prefix) {
        return str.indexOf(prefix) === 0 ? str.slice(prefix.length) : str;
      }
      function hasBaseSegment(path, prefix) {
        return new RegExp("^" + prefix + "(\\/|\\?|#|$)", "i").test(path);
      }
      function stripBaseSegment(path, prefix) {
        return hasBaseSegment(path, prefix) ? path.substr(prefix.length) : path;
      }

      //# sourceMappingURL=hickory-location-utils.es.js.map

      /***/
    },
    /* 19 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__ = __webpack_require__(
        18
      );

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

      var __assign =
        Object.assign ||
        function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };

      function defaultParseQuery(query) {
        return query ? query : "";
      }
      function defaultStringifyQuery(query) {
        return query ? query : "";
      }
      function isValidBase(baseSegment) {
        return (
          typeof baseSegment === "string" &&
          baseSegment.charAt(0) === "/" &&
          baseSegment.charAt(baseSegment.length - 1) !== "/"
        );
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
        if (options === void 0) {
          options = {};
        }
        var query = options.query,
          _a = options.decode,
          decode = _a === void 0 ? true : _a,
          _b = options.baseSegment,
          baseSegment = _b === void 0 ? "" : _b,
          _c = options.raw,
          raw =
            _c === void 0
              ? function(p) {
                  return p;
                }
              : _c;
        var _d = validateQueryOption(query),
          parse = _d.parse,
          stringify = _d.stringify;
        if (baseSegment !== "" && !isValidBase(baseSegment)) {
          throw new Error(
            'The baseSegment "' +
              baseSegment +
              '" is not valid.' +
              " The baseSegment must begin with a forward slash and end with a" +
              " non-forward slash character."
          );
        }
        function parsePath(value) {
          var location = {};
          // hash is always after query, so split it off first
          var hashIndex = value.indexOf("#");
          if (hashIndex !== -1) {
            location.hash = value.substring(hashIndex + 1);
            value = value.substring(0, hashIndex);
          } else {
            location.hash = "";
          }
          var queryIndex = value.indexOf("?");
          if (queryIndex !== -1) {
            location.query = parse(value.substring(queryIndex + 1));
            value = value.substring(0, queryIndex);
          } else {
            location.query = parse();
          }
          location.pathname = __webpack_require__.i(
            __WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__[
              "a" /* stripBaseSegment */
            ]
          )(value, baseSegment);
          return location;
        }
        function createLocation(value, key, state) {
          if (state === void 0) {
            state = null;
          }
          var partial;
          if (typeof value === "string") {
            partial = parsePath(value);
          } else {
            partial = __assign({}, value);
            if (partial.hash == null) {
              partial.hash = "";
            }
            if (partial.query == null) {
              partial.query = parse();
            }
            if (partial.pathname == null) {
              partial.pathname = "/";
            }
          }
          // don't set state if it already exists
          if (state && !partial.state) {
            partial.state = state;
          }
          var location = __assign({}, partial, {
            key: key,
            rawPathname: raw(partial.pathname)
          });
          location.key = key;
          location.rawPathname = raw(location.pathname);
          // it can be more convenient to interact with the decoded pathname,
          // but leave the option for using the encoded value
          if (decode) {
            try {
              location.pathname = decodeURI(location.pathname);
            } catch (e) {
              throw e instanceof URIError
                ? new URIError(
                    'Pathname "' +
                      location.pathname +
                      '" could not be decoded. ' +
                      "This is most likely due to a bad percent-encoding. For more information, " +
                      "see the third paragraph here https://tools.ietf.org/html/rfc3986#section-2.4"
                  )
                : e;
            }
          }
          return location;
        }
        function createPath(location) {
          // ensure that pathname begins with a forward slash, query begins
          // with a question mark, and hash begins with a pound sign
          return (
            baseSegment +
            __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__[
                "b" /* completePathname */
              ]
            )(location.rawPathname || location.pathname || "") +
            __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__[
                "c" /* completeQuery */
              ]
            )(stringify(location.query)) +
            __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__[
                "d" /* completeHash */
              ]
            )(location.hash)
          );
        }
        return {
          createLocation: createLocation,
          createPath: createPath
        };
      }

      function noop() {}
      function createNavigationConfirmation() {
        var confirmFunction;
        function confirmNavigation(info, confirm, prevent) {
          if (!confirmFunction) {
            confirm();
          } else {
            confirmFunction(info, confirm, prevent || noop);
          }
        }
        function confirmWith(fn) {
          if (typeof fn !== "function") {
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
          return key.split(".").map(function(value) {
            return parseInt(value, 10);
          });
        }
        return {
          keygen: {
            major: function(previous) {
              if (previous) {
                var major = parse(previous)[0];
                id = major + 1;
              }
              return id++ + ".0";
            },
            minor: function(current) {
              var _a = parse(current),
                major = _a[0],
                minor = _a[1];
              return major + "." + (minor + 1);
            },
            diff: function(first, second) {
              var firstMajor = parse(first)[0];
              var secondMajor = parse(second)[0];
              return secondMajor - firstMajor;
            }
          }
        };
      }

      function Common$1(options) {
        return __assign(
          {},
          locationFactory(options),
          createNavigationConfirmation(),
          createKeyGenerator()
        );
      }

      /* harmony default export */ __webpack_exports__["a"] = Common$1;
      //# sourceMappingURL=hickory-root.es.js.map

      /***/
    },
    /* 20 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _extends =
        Object.assign ||
        function(target) {
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

      var _react = __webpack_require__(0);

      var _react2 = _interopRequireDefault(_react);

      var _react3 = __webpack_require__(3);

      var _mobxReact = __webpack_require__(2);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var ProductThumbnail = function ProductThumbnail(props) {
        return _react2.default.createElement(
          "div",
          { className: "thumbnail" },
          _react2.default.createElement(
            _react3.Link,
            { to: "Product", params: { id: props.id } },
            props.name
          )
        );
      };

      var Home = function Home(_ref) {
        var products = _ref.products;
        return _react2.default.createElement(
          "div",
          null,
          Object.keys(products)
            .map(function(key) {
              return products[key];
            })
            .map(function(p, i) {
              return _react2.default.createElement(
                ProductThumbnail,
                _extends({ key: i }, p)
              );
            })
        );
      };

      exports.default = (0, _mobxReact.inject)("products")(
        (0, _mobxReact.observer)(Home)
      );

      /***/
    },
    /* 21 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _react = __webpack_require__(0);

      var _react2 = _interopRequireDefault(_react);

      var _react3 = __webpack_require__(3);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var NavLinks = function NavLinks() {
        return _react2.default.createElement(
          "nav",
          null,
          _react2.default.createElement(
            "ul",
            null,
            _react2.default.createElement(
              "li",
              null,
              _react2.default.createElement(
                _react3.Link,
                { to: "Home" },
                "Home"
              )
            )
          )
        );
      };

      exports.default = NavLinks;

      /***/
    },
    /* 22 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _react = __webpack_require__(0);

      var _react2 = _interopRequireDefault(_react);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var NotFound = function NotFound() {
        return _react2.default.createElement(
          "div",
          null,
          "Sorry, page not found"
        );
      };

      exports.default = NotFound;

      /***/
    },
    /* 23 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _react = __webpack_require__(0);

      var _react2 = _interopRequireDefault(_react);

      var _mobxReact = __webpack_require__(2);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var Product = function Product(_ref) {
        var products = _ref.products,
          response = _ref.response;

        var product = products[response.params.id];
        return product
          ? _react2.default.createElement(
              "div",
              null,
              "Product: ",
              product.name
            )
          : _react2.default.createElement(
              "div",
              null,
              "No product with id ",
              response.params.id,
              " was found"
            );
      };

      exports.default = (0, _mobxReact.inject)("products")(
        (0, _mobxReact.observer)(Product)
      );

      /***/
    },
    /* 24 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var _react = __webpack_require__(0);

      var _react2 = _interopRequireDefault(_react);

      var _reactDom = __webpack_require__(7);

      var _reactDom2 = _interopRequireDefault(_reactDom);

      var _browser = __webpack_require__(12);

      var _browser2 = _interopRequireDefault(_browser);

      var _core = __webpack_require__(10);

      var _core2 = _interopRequireDefault(_core);

      var _mobxReact = __webpack_require__(2);

      var _mobx = __webpack_require__(11);

      var _mobx2 = _interopRequireDefault(_mobx);

      var _ConnectedBase = __webpack_require__(13);

      var _ConnectedBase2 = _interopRequireDefault(_ConnectedBase);

      var _routes = __webpack_require__(16);

      var _routes2 = _interopRequireDefault(_routes);

      var _renderFunction = __webpack_require__(15);

      var _renderFunction2 = _interopRequireDefault(_renderFunction);

      var _fakeData = __webpack_require__(14);

      var _fakeData2 = _interopRequireDefault(_fakeData);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var history = (0, _browser2.default)();
      var router = (0, _core2.default)(history, _routes2.default);
      var root = document.getElementById("root");

      var curiStore = new _mobx2.default(router);

      router.respond(
        function() {
          _reactDom2.default.render(
            _react2.default.createElement(
              _mobxReact.Provider,
              {
                curi: curiStore,
                products: _fakeData2.default
              },
              _react2.default.createElement(_ConnectedBase2.default, {
                render: _renderFunction2.default
              })
            ),
            root
          );
        },
        { once: true }
      );

      /***/
    },
    /* 25 */
    /***/ function(module, exports, __webpack_require__) {
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

      module.exports = function hoistNonReactStatics(
        targetComponent,
        sourceComponent,
        blacklist
      ) {
        if (typeof sourceComponent !== "string") {
          // don't hoist over string (html) components

          if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
              hoistNonReactStatics(
                targetComponent,
                inheritedComponent,
                blacklist
              );
            }
          }

          var keys = getOwnPropertyNames(sourceComponent);

          if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
          }

          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (
              !REACT_STATICS[key] &&
              !KNOWN_STATICS[key] &&
              (!blacklist || !blacklist[key])
            ) {
              var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
              try {
                // Avoid failures from read-only properties
                defineProperty(targetComponent, key, descriptor);
              } catch (e) {}
            }
          }

          return targetComponent;
        }

        return targetComponent;
      };

      /***/
    },
    /* 26 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
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

        var invariant = function(condition, format, a, b, c, d, e, f) {
          if (process.env.NODE_ENV !== "production") {
            if (format === undefined) {
              throw new Error("invariant requires an error message argument");
            }
          }

          if (!condition) {
            var error;
            if (format === undefined) {
              error = new Error(
                "Minified exception occurred; use the non-minified dev environment " +
                  "for the full error message and additional helpful warnings."
              );
            } else {
              var args = [a, b, c, d, e, f];
              var argIndex = 0;
              error = new Error(
                format.replace(/%s/g, function() {
                  return args[argIndex++];
                })
              );
              error.name = "Invariant Violation";
            }

            error.framesToPop = 1; // we don't care about invariant's own frame
            throw error;
          }
        };

        module.exports = invariant;

        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(1)));

      /***/
    },
    /* 27 */
    /***/ function(module, exports, __webpack_require__) {
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
          throw new TypeError(
            "Object.assign cannot be called with null or undefined"
          );
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
          var test1 = new String("abc"); // eslint-disable-line no-new-wrappers
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }

          // https://bugs.chromium.org/p/v8/issues/detail?id=3056
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }

          // https://bugs.chromium.org/p/v8/issues/detail?id=3056
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (
            Object.keys(Object.assign({}, test3)).join("") !==
            "abcdefghijklmnopqrst"
          ) {
            return false;
          }

          return true;
        } catch (err) {
          // We don't expect any of the above to throw, but better to be safe.
          return false;
        }
      }

      module.exports = shouldUseNative()
        ? Object.assign
        : function(target, source) {
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

      /***/
    },
    /* 28 */
    /***/ function(module, exports) {
      /**
       * Expose `pathToRegexp`.
       */
      module.exports = pathToRegexp;
      module.exports.parse = parse;
      module.exports.compile = compile;
      module.exports.tokensToFunction = tokensToFunction;
      module.exports.tokensToRegExp = tokensToRegExp;

      /**
       * Default configs.
       */
      var DEFAULT_DELIMITER = "/";
      var DEFAULT_DELIMITERS = "./";

      /**
       * The main path matching regexp utility.
       *
       * @type {RegExp}
       */
      var PATH_REGEXP = new RegExp(
        [
          // Match escaped characters that would otherwise appear in future matches.
          // This allows the user to escape special characters that won't transform.
          "(\\\\.)",
          // Match Express-style parameters and un-named parameters with a prefix
          // and optional suffixes. Matches appear as:
          //
          // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
          // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined]
          "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"
        ].join("|"),
        "g"
      );

      /**
       * Parse a string for the raw tokens.
       *
       * @param  {string}  str
       * @param  {Object=} options
       * @return {!Array}
       */
      function parse(str, options) {
        var tokens = [];
        var key = 0;
        var index = 0;
        var path = "";
        var defaultDelimiter =
          (options && options.delimiter) || DEFAULT_DELIMITER;
        var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS;
        var pathEscaped = false;
        var res;

        while ((res = PATH_REGEXP.exec(str)) !== null) {
          var m = res[0];
          var escaped = res[1];
          var offset = res.index;
          path += str.slice(index, offset);
          index = offset + m.length;

          // Ignore already escaped sequences.
          if (escaped) {
            path += escaped[1];
            pathEscaped = true;
            continue;
          }

          var prev = "";
          var next = str[index];
          var name = res[2];
          var capture = res[3];
          var group = res[4];
          var modifier = res[5];

          if (!pathEscaped && path.length) {
            var k = path.length - 1;

            if (delimiters.indexOf(path[k]) > -1) {
              prev = path[k];
              path = path.slice(0, k);
            }
          }

          // Push the current path onto the tokens.
          if (path) {
            tokens.push(path);
            path = "";
            pathEscaped = false;
          }

          var partial = prev !== "" && next !== undefined && next !== prev;
          var repeat = modifier === "+" || modifier === "*";
          var optional = modifier === "?" || modifier === "*";
          var delimiter = prev || defaultDelimiter;
          var pattern = capture || group;

          tokens.push({
            name: name || key++,
            prefix: prev,
            delimiter: delimiter,
            optional: optional,
            repeat: repeat,
            partial: partial,
            pattern: pattern
              ? escapeGroup(pattern)
              : "[^" + escapeString(delimiter) + "]+?"
          });
        }

        // Push any remaining characters.
        if (path || index < str.length) {
          tokens.push(path + str.substr(index));
        }

        return tokens;
      }

      /**
       * Compile a string to a template function for the path.
       *
       * @param  {string}             str
       * @param  {Object=}            options
       * @return {!function(Object=, Object=)}
       */
      function compile(str, options) {
        return tokensToFunction(parse(str, options));
      }

      /**
       * Expose a method for transforming tokens into the path function.
       */
      function tokensToFunction(tokens) {
        // Compile all the tokens into regexps.
        var matches = new Array(tokens.length);

        // Compile all the patterns before compilation.
        for (var i = 0; i < tokens.length; i++) {
          if (typeof tokens[i] === "object") {
            matches[i] = new RegExp("^(?:" + tokens[i].pattern + ")$");
          }
        }

        return function(data, options) {
          var path = "";
          var encode = (options && options.encode) || encodeURIComponent;

          for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];

            if (typeof token === "string") {
              path += token;
              continue;
            }

            var value = data ? data[token.name] : undefined;
            var segment;

            if (Array.isArray(value)) {
              if (!token.repeat) {
                throw new TypeError(
                  'Expected "' + token.name + '" to not repeat, but got array'
                );
              }

              if (value.length === 0) {
                if (token.optional) continue;

                throw new TypeError(
                  'Expected "' + token.name + '" to not be empty'
                );
              }

              for (var j = 0; j < value.length; j++) {
                segment = encode(value[j]);

                if (!matches[i].test(segment)) {
                  throw new TypeError(
                    'Expected all "' +
                      token.name +
                      '" to match "' +
                      token.pattern +
                      '"'
                  );
                }

                path += (j === 0 ? token.prefix : token.delimiter) + segment;
              }

              continue;
            }

            if (
              typeof value === "string" ||
              typeof value === "number" ||
              typeof value === "boolean"
            ) {
              segment = encode(String(value));

              if (!matches[i].test(segment)) {
                throw new TypeError(
                  'Expected "' +
                    token.name +
                    '" to match "' +
                    token.pattern +
                    '", but got "' +
                    segment +
                    '"'
                );
              }

              path += token.prefix + segment;
              continue;
            }

            if (token.optional) {
              // Prepend partial segment prefixes.
              if (token.partial) path += token.prefix;

              continue;
            }

            throw new TypeError(
              'Expected "' +
                token.name +
                '" to be ' +
                (token.repeat ? "an array" : "a string")
            );
          }

          return path;
        };
      }

      /**
       * Escape a regular expression string.
       *
       * @param  {string} str
       * @return {string}
       */
      function escapeString(str) {
        return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
      }

      /**
       * Escape the capturing group by escaping special characters and meaning.
       *
       * @param  {string} group
       * @return {string}
       */
      function escapeGroup(group) {
        return group.replace(/([=!:$/()])/g, "\\$1");
      }

      /**
       * Get the flags for a regexp from the options.
       *
       * @param  {Object} options
       * @return {string}
       */
      function flags(options) {
        return options && options.sensitive ? "" : "i";
      }

      /**
       * Pull out keys from a regexp.
       *
       * @param  {!RegExp} path
       * @param  {Array=}  keys
       * @return {!RegExp}
       */
      function regexpToRegexp(path, keys) {
        if (!keys) return path;

        // Use a negative lookahead to match only capturing groups.
        var groups = path.source.match(/\((?!\?)/g);

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
            });
          }
        }

        return path;
      }

      /**
       * Transform an array into a regexp.
       *
       * @param  {!Array}  path
       * @param  {Array=}  keys
       * @param  {Object=} options
       * @return {!RegExp}
       */
      function arrayToRegexp(path, keys, options) {
        var parts = [];

        for (var i = 0; i < path.length; i++) {
          parts.push(pathToRegexp(path[i], keys, options).source);
        }

        return new RegExp("(?:" + parts.join("|") + ")", flags(options));
      }

      /**
       * Create a path regexp from string input.
       *
       * @param  {string}  path
       * @param  {Array=}  keys
       * @param  {Object=} options
       * @return {!RegExp}
       */
      function stringToRegexp(path, keys, options) {
        return tokensToRegExp(parse(path, options), keys, options);
      }

      /**
       * Expose a function for taking tokens and returning a RegExp.
       *
       * @param  {!Array}  tokens
       * @param  {Array=}  keys
       * @param  {Object=} options
       * @return {!RegExp}
       */
      function tokensToRegExp(tokens, keys, options) {
        options = options || {};

        var strict = options.strict;
        var end = options.end !== false;
        var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER);
        var delimiters = options.delimiters || DEFAULT_DELIMITERS;
        var endsWith = []
          .concat(options.endsWith || [])
          .map(escapeString)
          .concat("$")
          .join("|");
        var route = "";
        var isEndDelimited = false;

        // Iterate over the tokens and create our regexp string.
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];

          if (typeof token === "string") {
            route += escapeString(token);
            isEndDelimited =
              i === tokens.length - 1 &&
              delimiters.indexOf(token[token.length - 1]) > -1;
          } else {
            var prefix = escapeString(token.prefix);
            var capture = token.repeat
              ? "(?:" +
                token.pattern +
                ")(?:" +
                prefix +
                "(?:" +
                token.pattern +
                "))*"
              : token.pattern;

            if (keys) keys.push(token);

            if (token.optional) {
              if (token.partial) {
                route += prefix + "(" + capture + ")?";
              } else {
                route += "(?:" + prefix + "(" + capture + "))?";
              }
            } else {
              route += prefix + "(" + capture + ")";
            }
          }
        }

        if (end) {
          if (!strict) route += "(?:" + delimiter + ")?";

          route += endsWith === "$" ? "$" : "(?=" + endsWith + ")";
        } else {
          if (!strict) route += "(?:" + delimiter + "(?=" + endsWith + "))?";
          if (!isEndDelimited)
            route += "(?=" + delimiter + "|" + endsWith + ")";
        }

        return new RegExp("^" + route, flags(options));
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
      function pathToRegexp(path, keys, options) {
        if (path instanceof RegExp) {
          return regexpToRegexp(path, keys);
        }

        if (Array.isArray(path)) {
          return arrayToRegexp(/** @type {!Array} */ (path), keys, options);
        }

        return stringToRegexp(/** @type {string} */ (path), keys, options);
      }

      /***/
    },
    /* 29 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
         * Copyright (c) 2013-present, Facebook, Inc.
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */

        if (process.env.NODE_ENV !== "production") {
          var invariant = __webpack_require__(5);
          var warning = __webpack_require__(8);
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
        function checkPropTypes(
          typeSpecs,
          values,
          location,
          componentName,
          getStack
        ) {
          if (process.env.NODE_ENV !== "production") {
            for (var typeSpecName in typeSpecs) {
              if (typeSpecs.hasOwnProperty(typeSpecName)) {
                var error;
                // Prop type validation may throw. In case they do, we don't want to
                // fail the render phase where it didn't fail before. So we log it.
                // After these have been cleaned up, we'll let them throw.
                try {
                  // This is intentionally an invariant that gets caught. It's the same
                  // behavior as without this statement except with a better message.
                  invariant(
                    typeof typeSpecs[typeSpecName] === "function",
                    "%s: %s type `%s` is invalid; it must be a function, usually from " +
                      "the `prop-types` package, but received `%s`.",
                    componentName || "React class",
                    location,
                    typeSpecName,
                    typeof typeSpecs[typeSpecName]
                  );
                  error = typeSpecs[typeSpecName](
                    values,
                    typeSpecName,
                    componentName,
                    location,
                    null,
                    ReactPropTypesSecret
                  );
                } catch (ex) {
                  error = ex;
                }
                warning(
                  !error || error instanceof Error,
                  "%s: type specification of %s `%s` is invalid; the type checker " +
                    "function must return `null` or an `Error` but returned a %s. " +
                    "You may have forgotten to pass an argument to the type checker " +
                    "creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " +
                    "shape all require an argument).",
                  componentName || "React class",
                  location,
                  typeSpecName,
                  typeof error
                );
                if (
                  error instanceof Error &&
                  !(error.message in loggedTypeFailures)
                ) {
                  // Only monitor this failure once because there tends to be a lot of the
                  // same error.
                  loggedTypeFailures[error.message] = true;

                  var stack = getStack ? getStack() : "";

                  warning(
                    false,
                    "Failed %s type: %s%s",
                    location,
                    error.message,
                    stack != null ? stack : ""
                  );
                }
              }
            }
          }
        }

        module.exports = checkPropTypes;

        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(1)));

      /***/
    },
    /* 30 */
    /***/ function(module, exports, __webpack_require__) {
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
        function shim(
          props,
          propName,
          componentName,
          location,
          propFullName,
          secret
        ) {
          if (secret === ReactPropTypesSecret) {
            // It is still safe when called from React.
            return;
          }
          invariant(
            false,
            "Calling PropTypes validators directly is not supported by the `prop-types` package. " +
              "Use PropTypes.checkPropTypes() to call them. " +
              "Read more at http://fb.me/use-check-prop-types"
          );
        }
        shim.isRequired = shim;
        function getShim() {
          return shim;
        }
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

      /***/
    },
    /* 31 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
         * Copyright (c) 2013-present, Facebook, Inc.
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */

        var emptyFunction = __webpack_require__(4);
        var invariant = __webpack_require__(5);
        var warning = __webpack_require__(8);
        var assign = __webpack_require__(27);

        var ReactPropTypesSecret = __webpack_require__(6);
        var checkPropTypes = __webpack_require__(29);

        module.exports = function(isValidElement, throwOnDirectAccess) {
          /* global Symbol */
          var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator"; // Before Symbol spec.

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
            var iteratorFn =
              maybeIterable &&
              ((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) ||
                maybeIterable[FAUX_ITERATOR_SYMBOL]);
            if (typeof iteratorFn === "function") {
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

          var ANONYMOUS = "<<anonymous>>";

          // Important!
          // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
          var ReactPropTypes = {
            array: createPrimitiveTypeChecker("array"),
            bool: createPrimitiveTypeChecker("boolean"),
            func: createPrimitiveTypeChecker("function"),
            number: createPrimitiveTypeChecker("number"),
            object: createPrimitiveTypeChecker("object"),
            string: createPrimitiveTypeChecker("string"),
            symbol: createPrimitiveTypeChecker("symbol"),

            any: createAnyTypeChecker(),
            arrayOf: createArrayOfTypeChecker,
            element: createElementTypeChecker(),
            instanceOf: createInstanceTypeChecker,
            node: createNodeChecker(),
            objectOf: createObjectOfTypeChecker,
            oneOf: createEnumTypeChecker,
            oneOfType: createUnionTypeChecker,
            shape: createShapeTypeChecker,
            exact: createStrictShapeTypeChecker
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
            this.stack = "";
          }
          // Make `instanceof Error` still work for returned errors.
          PropTypeError.prototype = Error.prototype;

          function createChainableTypeChecker(validate) {
            if (process.env.NODE_ENV !== "production") {
              var manualPropTypeCallCache = {};
              var manualPropTypeWarningCount = 0;
            }
            function checkType(
              isRequired,
              props,
              propName,
              componentName,
              location,
              propFullName,
              secret
            ) {
              componentName = componentName || ANONYMOUS;
              propFullName = propFullName || propName;

              if (secret !== ReactPropTypesSecret) {
                if (throwOnDirectAccess) {
                  // New behavior only for users of `prop-types` package
                  invariant(
                    false,
                    "Calling PropTypes validators directly is not supported by the `prop-types` package. " +
                      "Use `PropTypes.checkPropTypes()` to call them. " +
                      "Read more at http://fb.me/use-check-prop-types"
                  );
                } else if (
                  process.env.NODE_ENV !== "production" &&
                  typeof console !== "undefined"
                ) {
                  // Old behavior for people using React.PropTypes
                  var cacheKey = componentName + ":" + propName;
                  if (
                    !manualPropTypeCallCache[cacheKey] &&
                    // Avoid spamming the console because they are often not actionable except for lib authors
                    manualPropTypeWarningCount < 3
                  ) {
                    warning(
                      false,
                      "You are manually calling a React.PropTypes validation " +
                        "function for the `%s` prop on `%s`. This is deprecated " +
                        "and will throw in the standalone `prop-types` package. " +
                        "You may be seeing this warning due to a third-party PropTypes " +
                        "library. See https://fb.me/react-warning-dont-call-proptypes " +
                        "for details.",
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
                    return new PropTypeError(
                      "The " +
                        location +
                        " `" +
                        propFullName +
                        "` is marked as required " +
                        ("in `" + componentName + "`, but its value is `null`.")
                    );
                  }
                  return new PropTypeError(
                    "The " +
                      location +
                      " `" +
                      propFullName +
                      "` is marked as required in " +
                      ("`" + componentName + "`, but its value is `undefined`.")
                  );
                }
                return null;
              } else {
                return validate(
                  props,
                  propName,
                  componentName,
                  location,
                  propFullName
                );
              }
            }

            var chainedCheckType = checkType.bind(null, false);
            chainedCheckType.isRequired = checkType.bind(null, true);

            return chainedCheckType;
          }

          function createPrimitiveTypeChecker(expectedType) {
            function validate(
              props,
              propName,
              componentName,
              location,
              propFullName,
              secret
            ) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== expectedType) {
                // `propValue` being instance of, say, date/regexp, pass the 'object'
                // check, but we can offer a more precise error message here rather than
                // 'of type `object`'.
                var preciseType = getPreciseType(propValue);

                return new PropTypeError(
                  "Invalid " +
                    location +
                    " `" +
                    propFullName +
                    "` of type " +
                    ("`" +
                      preciseType +
                      "` supplied to `" +
                      componentName +
                      "`, expected ") +
                    ("`" + expectedType + "`.")
                );
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }

          function createAnyTypeChecker() {
            return createChainableTypeChecker(emptyFunction.thatReturnsNull);
          }

          function createArrayOfTypeChecker(typeChecker) {
            function validate(
              props,
              propName,
              componentName,
              location,
              propFullName
            ) {
              if (typeof typeChecker !== "function") {
                return new PropTypeError(
                  "Property `" +
                    propFullName +
                    "` of component `" +
                    componentName +
                    "` has invalid PropType notation inside arrayOf."
                );
              }
              var propValue = props[propName];
              if (!Array.isArray(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError(
                  "Invalid " +
                    location +
                    " `" +
                    propFullName +
                    "` of type " +
                    ("`" +
                      propType +
                      "` supplied to `" +
                      componentName +
                      "`, expected an array.")
                );
              }
              for (var i = 0; i < propValue.length; i++) {
                var error = typeChecker(
                  propValue,
                  i,
                  componentName,
                  location,
                  propFullName + "[" + i + "]",
                  ReactPropTypesSecret
                );
                if (error instanceof Error) {
                  return error;
                }
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }

          function createElementTypeChecker() {
            function validate(
              props,
              propName,
              componentName,
              location,
              propFullName
            ) {
              var propValue = props[propName];
              if (!isValidElement(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError(
                  "Invalid " +
                    location +
                    " `" +
                    propFullName +
                    "` of type " +
                    ("`" +
                      propType +
                      "` supplied to `" +
                      componentName +
                      "`, expected a single ReactElement.")
                );
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }

          function createInstanceTypeChecker(expectedClass) {
            function validate(
              props,
              propName,
              componentName,
              location,
              propFullName
            ) {
              if (!(props[propName] instanceof expectedClass)) {
                var expectedClassName = expectedClass.name || ANONYMOUS;
                var actualClassName = getClassName(props[propName]);
                return new PropTypeError(
                  "Invalid " +
                    location +
                    " `" +
                    propFullName +
                    "` of type " +
                    ("`" +
                      actualClassName +
                      "` supplied to `" +
                      componentName +
                      "`, expected ") +
                    ("instance of `" + expectedClassName + "`.")
                );
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }

          function createEnumTypeChecker(expectedValues) {
            if (!Array.isArray(expectedValues)) {
              process.env.NODE_ENV !== "production"
                ? warning(
                    false,
                    "Invalid argument supplied to oneOf, expected an instance of array."
                  )
                : void 0;
              return emptyFunction.thatReturnsNull;
            }

            function validate(
              props,
              propName,
              componentName,
              location,
              propFullName
            ) {
              var propValue = props[propName];
              for (var i = 0; i < expectedValues.length; i++) {
                if (is(propValue, expectedValues[i])) {
                  return null;
                }
              }

              var valuesString = JSON.stringify(expectedValues);
              return new PropTypeError(
                "Invalid " +
                  location +
                  " `" +
                  propFullName +
                  "` of value `" +
                  propValue +
                  "` " +
                  ("supplied to `" +
                    componentName +
                    "`, expected one of " +
                    valuesString +
                    ".")
              );
            }
            return createChainableTypeChecker(validate);
          }

          function createObjectOfTypeChecker(typeChecker) {
            function validate(
              props,
              propName,
              componentName,
              location,
              propFullName
            ) {
              if (typeof typeChecker !== "function") {
                return new PropTypeError(
                  "Property `" +
                    propFullName +
                    "` of component `" +
                    componentName +
                    "` has invalid PropType notation inside objectOf."
                );
              }
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== "object") {
                return new PropTypeError(
                  "Invalid " +
                    location +
                    " `" +
                    propFullName +
                    "` of type " +
                    ("`" +
                      propType +
                      "` supplied to `" +
                      componentName +
                      "`, expected an object.")
                );
              }
              for (var key in propValue) {
                if (propValue.hasOwnProperty(key)) {
                  var error = typeChecker(
                    propValue,
                    key,
                    componentName,
                    location,
                    propFullName + "." + key,
                    ReactPropTypesSecret
                  );
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
              process.env.NODE_ENV !== "production"
                ? warning(
                    false,
                    "Invalid argument supplied to oneOfType, expected an instance of array."
                  )
                : void 0;
              return emptyFunction.thatReturnsNull;
            }

            for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
              var checker = arrayOfTypeCheckers[i];
              if (typeof checker !== "function") {
                warning(
                  false,
                  "Invalid argument supplied to oneOfType. Expected an array of check functions, but " +
                    "received %s at index %s.",
                  getPostfixForTypeWarning(checker),
                  i
                );
                return emptyFunction.thatReturnsNull;
              }
            }

            function validate(
              props,
              propName,
              componentName,
              location,
              propFullName
            ) {
              for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
                var checker = arrayOfTypeCheckers[i];
                if (
                  checker(
                    props,
                    propName,
                    componentName,
                    location,
                    propFullName,
                    ReactPropTypesSecret
                  ) == null
                ) {
                  return null;
                }
              }

              return new PropTypeError(
                "Invalid " +
                  location +
                  " `" +
                  propFullName +
                  "` supplied to " +
                  ("`" + componentName + "`.")
              );
            }
            return createChainableTypeChecker(validate);
          }

          function createNodeChecker() {
            function validate(
              props,
              propName,
              componentName,
              location,
              propFullName
            ) {
              if (!isNode(props[propName])) {
                return new PropTypeError(
                  "Invalid " +
                    location +
                    " `" +
                    propFullName +
                    "` supplied to " +
                    ("`" + componentName + "`, expected a ReactNode.")
                );
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }

          function createShapeTypeChecker(shapeTypes) {
            function validate(
              props,
              propName,
              componentName,
              location,
              propFullName
            ) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== "object") {
                return new PropTypeError(
                  "Invalid " +
                    location +
                    " `" +
                    propFullName +
                    "` of type `" +
                    propType +
                    "` " +
                    ("supplied to `" + componentName + "`, expected `object`.")
                );
              }
              for (var key in shapeTypes) {
                var checker = shapeTypes[key];
                if (!checker) {
                  continue;
                }
                var error = checker(
                  propValue,
                  key,
                  componentName,
                  location,
                  propFullName + "." + key,
                  ReactPropTypesSecret
                );
                if (error) {
                  return error;
                }
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }

          function createStrictShapeTypeChecker(shapeTypes) {
            function validate(
              props,
              propName,
              componentName,
              location,
              propFullName
            ) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== "object") {
                return new PropTypeError(
                  "Invalid " +
                    location +
                    " `" +
                    propFullName +
                    "` of type `" +
                    propType +
                    "` " +
                    ("supplied to `" + componentName + "`, expected `object`.")
                );
              }
              // We need to check all keys in case some are required but missing from
              // props.
              var allKeys = assign({}, props[propName], shapeTypes);
              for (var key in allKeys) {
                var checker = shapeTypes[key];
                if (!checker) {
                  return new PropTypeError(
                    "Invalid " +
                      location +
                      " `" +
                      propFullName +
                      "` key `" +
                      key +
                      "` supplied to `" +
                      componentName +
                      "`." +
                      "\nBad object: " +
                      JSON.stringify(props[propName], null, "  ") +
                      "\nValid keys: " +
                      JSON.stringify(Object.keys(shapeTypes), null, "  ")
                  );
                }
                var error = checker(
                  propValue,
                  key,
                  componentName,
                  location,
                  propFullName + "." + key,
                  ReactPropTypesSecret
                );
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
              case "number":
              case "string":
              case "undefined":
                return true;
              case "boolean":
                return !propValue;
              case "object":
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
            if (propType === "symbol") {
              return true;
            }

            // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
            if (propValue["@@toStringTag"] === "Symbol") {
              return true;
            }

            // Fallback for non-spec compliant Symbols which are polyfilled.
            if (typeof Symbol === "function" && propValue instanceof Symbol) {
              return true;
            }

            return false;
          }

          // Equivalent of `typeof` but with special handling for array and regexp.
          function getPropType(propValue) {
            var propType = typeof propValue;
            if (Array.isArray(propValue)) {
              return "array";
            }
            if (propValue instanceof RegExp) {
              // Old webkits (at least until Android 4.0) return 'function' rather than
              // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
              // passes PropTypes.object.
              return "object";
            }
            if (isSymbol(propType, propValue)) {
              return "symbol";
            }
            return propType;
          }

          // This handles more types than `getPropType`. Only used for error messages.
          // See `createPrimitiveTypeChecker`.
          function getPreciseType(propValue) {
            if (typeof propValue === "undefined" || propValue === null) {
              return "" + propValue;
            }
            var propType = getPropType(propValue);
            if (propType === "object") {
              if (propValue instanceof Date) {
                return "date";
              } else if (propValue instanceof RegExp) {
                return "regexp";
              }
            }
            return propType;
          }

          // Returns a string that is postfixed to a warning about an invalid type.
          // For example, "undefined" or "of type array"
          function getPostfixForTypeWarning(value) {
            var type = getPreciseType(value);
            switch (type) {
              case "array":
              case "object":
                return "an " + type;
              case "boolean":
              case "date":
              case "regexp":
                return "a " + type;
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

        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(1)));

      /***/
    },
    /* 32 */
    /***/ function(module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
         * Copyright (c) 2013-present, Facebook, Inc.
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */

        if (process.env.NODE_ENV !== "production") {
          var REACT_ELEMENT_TYPE =
            (typeof Symbol === "function" &&
              Symbol.for &&
              Symbol.for("react.element")) ||
            0xeac7;

          var isValidElement = function(object) {
            return (
              typeof object === "object" &&
              object !== null &&
              object.$$typeof === REACT_ELEMENT_TYPE
            );
          };

          // By explicitly using `prop-types` you are opting into new development behavior.
          // http://fb.me/prop-types-in-prod
          var throwOnDirectAccess = true;
          module.exports = __webpack_require__(31)(
            isValidElement,
            throwOnDirectAccess
          );
        } else {
          // By explicitly using `prop-types` you are opting into new production behavior.
          // http://fb.me/prop-types-in-prod
          module.exports = __webpack_require__(30)();
        }

        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(1)));

      /***/
    },
    /* 33 */
    /***/ function(module, exports) {
      var g;

      // This works in non-strict mode
      g = (function() {
        return this;
      })();

      try {
        // This works if eval is allowed (see CSP)
        g = g || Function("return this")() || (1, eval)("this");
      } catch (e) {
        // This works if the window reference is available
        if (typeof window === "object") g = window;
      }

      // g can still be undefined, but nothing to do about it...
      // We return undefined, instead of nothing here, so it's
      // easier to handle this case. if(!global) { ...}

      module.exports = g;

      /***/
    }
    /******/
  ]
);
