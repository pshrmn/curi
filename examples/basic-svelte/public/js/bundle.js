/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export destroy */
/* unused harmony export destroyDev */
/* unused harmony export differs */
/* unused harmony export dispatchObservers */
/* unused harmony export get */
/* unused harmony export fire */
/* unused harmony export observe */
/* unused harmony export observeDev */
/* unused harmony export on */
/* unused harmony export onDev */
/* unused harmony export set */
/* unused harmony export _set */
/* unused harmony export _setDev */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return callAll; });
/* unused harmony export _mount */
/* unused harmony export _unmount */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return proto; });
/* unused harmony export protoDev */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return appendNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return insertNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return detachNode; });
/* unused harmony export detachBetween */
/* unused harmony export detachBefore */
/* unused harmony export detachAfter */
/* unused harmony export reinsertBetween */
/* unused harmony export reinsertChildren */
/* unused harmony export reinsertAfter */
/* unused harmony export reinsertBefore */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return destroyEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return createFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createElement; });
/* unused harmony export createSvgElement */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createText; });
/* unused harmony export createComment */
/* unused harmony export addListener */
/* unused harmony export removeListener */
/* unused harmony export setAttribute */
/* unused harmony export setXlinkAttribute */
/* unused harmony export getBindingGroupValue */
/* unused harmony export toNumber */
/* unused harmony export timeRangesToArray */
/* unused harmony export children */
/* unused harmony export claimElement */
/* unused harmony export claimText */
/* unused harmony export setInputType */
/* unused harmony export setStyle */
/* unused harmony export linear */
/* unused harmony export generateRule */
/* unused harmony export hash */
/* unused harmony export wrapTransition */
/* unused harmony export transitionManager */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return assign; });
function noop() {}

function assign(target) {
	var k,
		source,
		i = 1,
		len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function detachBetween(before, after) {
	while (before.nextSibling && before.nextSibling !== after) {
		before.parentNode.removeChild(before.nextSibling);
	}
}

function detachBefore(after) {
	while (after.previousSibling) {
		after.parentNode.removeChild(after.previousSibling);
	}
}

function detachAfter(before) {
	while (before.nextSibling) {
		before.parentNode.removeChild(before.nextSibling);
	}
}

function reinsertBetween(before, after, target) {
	while (before.nextSibling && before.nextSibling !== after) {
		target.appendChild(before.parentNode.removeChild(before.nextSibling));
	}
}

function reinsertChildren(parent, target) {
	while (parent.firstChild) target.appendChild(parent.firstChild);
}

function reinsertAfter(before, target) {
	while (before.nextSibling) target.appendChild(before.nextSibling);
}

function reinsertBefore(after, target) {
	var parent = after.parentNode;
	while (parent.firstChild !== after) target.appendChild(parent.firstChild);
}

// TODO this is out of date
function destroyEach(iterations, detach, start) {
	for (var i = start; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].destroy(detach);
	}
}

function createFragment() {
	return document.createDocumentFragment();
}

function createElement(name) {
	return document.createElement(name);
}

function createSvgElement(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function createText(data) {
	return document.createTextNode(data);
}

function createComment() {
	return document.createComment('');
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function setXlinkAttribute(node, attribute, value) {
	node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}

function getBindingGroupValue(group) {
	var value = [];
	for (var i = 0; i < group.length; i += 1) {
		if (group[i].checked) value.push(group[i].__value);
	}
	return value;
}

function toNumber(value) {
	return value === '' ? undefined : +value;
}

function timeRangesToArray(ranges) {
	var array = [];
	for (var i = 0; i < ranges.length; i += 1) {
		array.push({ start: ranges.start(i), end: ranges.end(i) });
	}
	return array;
}

function children (element) {
	return Array.from(element.childNodes);
}

function claimElement (nodes, name, attributes, svg) {
	for (var i = 0; i < nodes.length; i += 1) {
		var node = nodes[i];
		if (node.nodeName === name) {
			for (var j = 0; j < node.attributes.length; j += 1) {
				var attribute = node.attributes[j];
				if (!attributes[attribute.name]) node.removeAttribute(attribute.name);
			}
			return nodes.splice(i, 1)[0]; // TODO strip unwanted attributes
		}
	}

	return svg ? createSvgElement(name) : createElement(name);
}

function claimText (nodes, data) {
	for (var i = 0; i < nodes.length; i += 1) {
		var node = nodes[i];
		if (node.nodeType === 3) {
			node.data = data;
			return nodes.splice(i, 1)[0];
		}
	}

	return createText(data);
}

function setInputType(input, type) {
	try {
		input.type = type;
	} catch (e) {}
}

function setStyle(node, key, value) {
	node.style.setProperty(key, value);
}

function linear(t) {
	return t;
}

function generateRule(
	a,
	b,
	delta,
	duration,
	ease,
	fn
) {
	var keyframes = '{\n';

	for (var p = 0; p <= 1; p += 16.666 / duration) {
		var t = a + delta * ease(p);
		keyframes += p * 100 + '%{' + fn(t) + '}\n';
	}

	return keyframes + '100% {' + fn(b) + '}\n}';
}

// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
	var hash = 5381;
	var i = str.length;

	while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
	return hash >>> 0;
}

function wrapTransition(component, node, fn, params, intro, outgroup) {
	var obj = fn(node, params);
	var duration = obj.duration || 300;
	var ease = obj.easing || linear;
	var cssText;

	// TODO share <style> tag between all transitions?
	if (obj.css && !transitionManager.stylesheet) {
		var style = createElement('style');
		document.head.appendChild(style);
		transitionManager.stylesheet = style.sheet;
	}

	if (intro) {
		if (obj.css && obj.delay) {
			cssText = node.style.cssText;
			node.style.cssText += obj.css(0);
		}

		if (obj.tick) obj.tick(0);
	}

	return {
		t: intro ? 0 : 1,
		running: false,
		program: null,
		pending: null,
		run: function(intro, callback) {
			var program = {
				start: window.performance.now() + (obj.delay || 0),
				intro: intro,
				callback: callback
			};

			if (obj.delay) {
				this.pending = program;
			} else {
				this.start(program);
			}

			if (!this.running) {
				this.running = true;
				transitionManager.add(this);
			}
		},
		start: function(program) {
			component.fire(program.intro ? 'intro.start' : 'outro.start', { node: node });

			program.a = this.t;
			program.b = program.intro ? 1 : 0;
			program.delta = program.b - program.a;
			program.duration = duration * Math.abs(program.b - program.a);
			program.end = program.start + program.duration;

			if (obj.css) {
				if (obj.delay) node.style.cssText = cssText;

				program.rule = generateRule(
					program.a,
					program.b,
					program.delta,
					program.duration,
					ease,
					obj.css
				);

				transitionManager.addRule(program.rule, program.name = '__svelte_' + hash(program.rule));

				node.style.animation = (node.style.animation || '')
					.split(', ')
					.filter(function(anim) {
						// when introing, discard old animations if there are any
						return anim && (program.delta < 0 || !/__svelte/.test(anim));
					})
					.concat(program.name + ' ' + duration + 'ms linear 1 forwards')
					.join(', ');
			}

			this.program = program;
			this.pending = null;
		},
		update: function(now) {
			var program = this.program;
			if (!program) return;

			var p = now - program.start;
			this.t = program.a + program.delta * ease(p / program.duration);
			if (obj.tick) obj.tick(this.t);
		},
		done: function() {
			var program = this.program;
			this.t = program.b;
			if (obj.tick) obj.tick(this.t);
			if (obj.css) transitionManager.deleteRule(node, program.name);
			program.callback();
			program = null;
			this.running = !!this.pending;
		},
		abort: function() {
			if (obj.tick) obj.tick(1);
			if (obj.css) transitionManager.deleteRule(node, this.program.name);
			this.program = this.pending = null;
			this.running = false;
		}
	};
}

var transitionManager = {
	running: false,
	transitions: [],
	bound: null,
	stylesheet: null,
	activeRules: {},

	add: function(transition) {
		this.transitions.push(transition);

		if (!this.running) {
			this.running = true;
			requestAnimationFrame(this.bound || (this.bound = this.next.bind(this)));
		}
	},

	addRule: function(rule, name) {
		if (!this.activeRules[name]) {
			this.activeRules[name] = true;
			this.stylesheet.insertRule('@keyframes ' + name + ' ' + rule, this.stylesheet.cssRules.length);
		}
	},

	next: function() {
		this.running = false;

		var now = window.performance.now();
		var i = this.transitions.length;

		while (i--) {
			var transition = this.transitions[i];

			if (transition.program && now >= transition.program.end) {
				transition.done();
			}

			if (transition.pending && now >= transition.pending.start) {
				transition.start(transition.pending);
			}

			if (transition.running) {
				transition.update(now);
				this.running = true;
			} else if (!transition.pending) {
				this.transitions.splice(i, 1);
			}
		}

		if (this.running) {
			requestAnimationFrame(this.bound);
		} else if (this.stylesheet) {
			var i = this.stylesheet.cssRules.length;
			while (i--) this.stylesheet.deleteRule(i);
			this.activeRules = {};
		}
	},

	deleteRule: function(node, name) {
		node.style.animation = node.style.animation
			.split(', ')
			.filter(function(anim) {
				return anim.slice(0, name.length) !== name;
			})
			.join(', ');
	}
};

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = this._state = null;
}

function destroyDev(detach) {
	destroy.call(this, detach);
	this.destroy = function() {
		console.warn('Component was already destroyed');
	};
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer
		? this._observers.post
		: this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function observeDev(key, callback, options) {
	var c = (key = '' + key).search(/[^\w]/);
	if (c > -1) {
		var message =
			'The first argument to component.observe(...) must be the name of a top-level property';
		if (c > 0)
			message += ", i.e. '" + key.slice(0, c) + "' rather than '" + key + "'";

		throw new Error(message);
	}

	return observe.call(this, key, callback, options);
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function onDev(eventName, handler) {
	if (eventName === 'teardown') {
		console.warn(
			"Use component.on('destroy', ...) instead of component.on('teardown', ...) which has been deprecated and will be unsupported in Svelte 2"
		);
		return this.on('destroy', handler);
	}

	return on.call(this, eventName, handler);
}

function set(newState) {
	this._set(assign({}, newState));
	if (this._root._lock) return;
	this._root._lock = true;
	callAll(this._root._beforecreate);
	callAll(this._root._oncreate);
	callAll(this._root._aftercreate);
	this._root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	for (var key in newState) {
		if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state, oldState, false);
	if (this._bind) this._bind(changed, this._state);
	dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
	this._fragment.update(changed, this._state);
	dispatchObservers(this, this._observers.post, changed, this._state, oldState);
}

function _setDev(newState) {
	if (typeof newState !== 'object') {
		throw new Error(
			this._debugName + ' .set was called without an object of data key-values to update.'
		);
	}

	this._checkReadOnly(newState);
	_set.call(this, newState);
}

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

function _mount(target, anchor) {
	this._fragment.mount(target, anchor);
}

function _unmount() {
	this._fragment.unmount();
}

var proto = {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount
};

var protoDev = {
	destroy: destroyDev,
	get: get,
	fire: fire,
	observe: observeDev,
	on: onDev,
	set: set,
	teardown: destroyDev,
	_recompute: noop,
	_set: _setDev,
	_mount: _mount,
	_unmount: _unmount
};




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__curi_svelte__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__ = __webpack_require__(0);




var template = (function() {
  return {
    data() {
      return {
        methods: ['email', 'phone']
      }
    }
  }
}());

function create_main_fragment(state, component) {
	var nav, ul, li, text, li_1, text_2, text_3, ul_1;

	var link = new __WEBPACK_IMPORTED_MODULE_0__curi_svelte__["Link"]({
		_root: component._root,
		slots: { default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["j" /* createFragment */])() },
		data: { to: "Home" }
	});

	var link_1 = new __WEBPACK_IMPORTED_MODULE_0__curi_svelte__["Link"]({
		_root: component._root,
		slots: { default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["j" /* createFragment */])() },
		data: { to: "Contact" }
	});

	var each_block_value = state.methods;

	var each_block_iterations = [];

	for (var i = 0; i < each_block_value.length; i += 1) {
		each_block_iterations[i] = create_each_block(state, each_block_value, each_block_value[i], i, component);
	}

	return {
		create: function() {
			nav = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("nav");
			ul = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("ul");
			li = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("li");
			text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("Home");
			link._fragment.create();
			li_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("li");
			text_2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("Contact Us");
			link_1._fragment.create();
			text_3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("\n    ");
			ul_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("ul");

			for (var i = 0; i < each_block_iterations.length; i += 1) {
				each_block_iterations[i].create();
			}
		},

		mount: function(target, anchor) {
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(nav, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(ul, nav);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(li, ul);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(text, link._slotted.default);
			link._mount(li, null);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(li_1, ul);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(text_2, link_1._slotted.default);
			link_1._mount(li_1, null);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(text_3, li_1);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(ul_1, li_1);

			for (var i = 0; i < each_block_iterations.length; i += 1) {
				each_block_iterations[i].mount(ul_1, null);
			}
		},

		update: function(changed, state) {
			var link_changes = {};

			link._set( link_changes );

			var link_1_changes = {};

			link_1._set( link_1_changes );

			var each_block_value = state.methods;

			if (changed.methods) {
				for (var i = 0; i < each_block_value.length; i += 1) {
					if (each_block_iterations[i]) {
						each_block_iterations[i].update(changed, state, each_block_value, each_block_value[i], i);
					} else {
						each_block_iterations[i] = create_each_block(state, each_block_value, each_block_value[i], i, component);
						each_block_iterations[i].create();
						each_block_iterations[i].mount(ul_1, null);
					}
				}

				for (; i < each_block_iterations.length; i += 1) {
					each_block_iterations[i].unmount();
					each_block_iterations[i].destroy();
				}
				each_block_iterations.length = each_block_value.length;
			}
		},

		unmount: function() {
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* detachNode */])(nav);

			for (var i = 0; i < each_block_iterations.length; i += 1) {
				each_block_iterations[i].unmount();
			}
		},

		destroy: function() {
			link.destroy(false);
			link_1.destroy(false);

			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["k" /* destroyEach */])(each_block_iterations, false, 0);
		}
	};
}

function create_each_block(state, each_block_value, method, method_index, component) {
	var li, text, text_1_value = method, text_1;

	var link = new __WEBPACK_IMPORTED_MODULE_0__curi_svelte__["Link"]({
		_root: component._root,
		slots: { default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["j" /* createFragment */])() },
		data: { to: "Method", params: { method } }
	});

	return {
		create: function() {
			li = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("li");
			text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("By ");
			text_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])(text_1_value);
			link._fragment.create();
		},

		mount: function(target, anchor) {
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(li, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(text, link._slotted.default);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(text_1, link._slotted.default);
			link._mount(li, null);
		},

		update: function(changed, state, each_block_value, method, method_index) {
			if ( (changed.methods) && text_1_value !== (text_1_value = method) ) {
				text_1.data = text_1_value;
			}

			var link_changes = {};
			if (changed.methods) link_changes.params = { method };
			link._set( link_changes );
		},

		unmount: function() {
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* detachNode */])(li);
		},

		destroy: function() {
			link.destroy(false);
		}
	};
}

function Nav(options) {
	this.options = options;
	this._state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["h" /* assign */])(template.data(), options.data);

	this._observers = {
		pre: Object.create(null),
		post: Object.create(null)
	};

	this._handlers = Object.create(null);

	this._root = options._root || this;
	this._yield = options._yield;
	this._bind = options._bind;

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.create();
		this._fragment.mount(options.target, options.anchor || null);

		this._lock = true;
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._beforecreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._oncreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._aftercreate);
		this._lock = false;
	}
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["h" /* assign */])(Nav.prototype, __WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["i" /* proto */]);

/* harmony default export */ __webpack_exports__["a"] = (Nav);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfig", function() { return getConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConfig", function() { return setConfig; });
var config = void 0;
function setConfig(c) {
  config = c;
}
function getConfig() {
  return config;
}

function noop() {}

function assign(target) {
	var k,
		source,
		i = 1,
		len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function reinsertChildren(parent, target) {
	while (parent.firstChild) target.appendChild(parent.firstChild);
}

function createElement(name) {
	return document.createElement(name);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = this._state = null;
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer
		? this._observers.post
		: this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this._root._lock) return;
	this._root._lock = true;
	callAll(this._root._beforecreate);
	callAll(this._root._oncreate);
	callAll(this._root._aftercreate);
	this._root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	for (var key in newState) {
		if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state, oldState, false);
	if (this._bind) this._bind(changed, this._state);
	dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
	this._fragment.update(changed, this._state);
	dispatchObservers(this, this._observers.post, changed, this._state, oldState);
}

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

function _mount(target, anchor) {
	this._fragment.mount(target, anchor);
}

function _unmount() {
	this._fragment.unmount();
}

var proto = {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount
};

var template = function () {
  var canNavigate = function canNavigate(event) {
    return !event.defaultPrevented && event.button === 0 && !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  };

  return {
    data: function data() {
      return {
        to: '',
        params: {},
        details: {}
      };
    },
    computed: {
      location: function location(to, params, details) {
        var config = getConfig();
        return Object.assign({}, {
          pathname: config.addons.pathname(to, params)
        }, details);
      },
      href: function href(location) {
        var config = getConfig();
        return config.history.toHref(location);
      }
    },
    methods: {
      handleClick: function handleClick(event, location) {
        var can = canNavigate(event);

        if (can) {
          event.preventDefault();
          var config = getConfig();
          config.history.update(location);
        }
      }
    }
  };
}();

function create_main_fragment(state, component) {
  var a,
      slot_content_default = component._slotted.default;

  function click_handler(event) {
    var state = component.get();
    component.handleClick(event, state.location);
  }

  return {
    create: function create() {
      a = createElement("a");
      this.hydrate();
    },
    hydrate: function hydrate(nodes) {
      a.href = state.href;
      addListener(a, "click", click_handler);
    },
    mount: function mount(target, anchor) {
      insertNode(a, target, anchor);

      if (slot_content_default) {
        appendNode(slot_content_default, a);
      }
    },
    update: function update(changed, state) {
      if (changed.href) {
        a.href = state.href;
      }
    },
    unmount: function unmount() {
      detachNode(a);

      if (slot_content_default) {
        reinsertChildren(a, slot_content_default);
      }
    },
    destroy: function destroy$$1() {
      removeListener(a, "click", click_handler);
    }
  };
}

function Link(options) {
  this.options = options;
  this._state = assign(template.data(), options.data);

  this._recompute({}, this._state, {}, true);

  this._observers = {
    pre: Object.create(null),
    post: Object.create(null)
  };
  this._handlers = Object.create(null);
  this._root = options._root || this;
  this._yield = options._yield;
  this._bind = options._bind;
  this._slotted = options.slots || {};
  this.slots = {};
  this._fragment = create_main_fragment(this._state, this);

  if (options.target) {
    this._fragment.create();

    this._fragment.mount(options.target, options.anchor || null);
  }
}

assign(Link.prototype, template.methods, proto);

Link.prototype._recompute = function _recompute(changed, state, oldState, isInitial) {
  if (isInitial || changed.to || changed.params || changed.details) {
    if (differs(state.location = template.computed.location(state.to, state.params, state.details), oldState.location)) changed.location = true;
  }

  if (isInitial || changed.location) {
    if (differs(state.href = template.computed.href(state.location), oldState.href)) changed.href = true;
  }
};


//# sourceMappingURL=curi-svelte.es.js.map


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp__ = __webpack_require__(10);
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
  var re = __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default()(pathString, keys, mergedOptions);

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
  var previous = [];
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

    return Promise.all([preload ? preload() : null, load ? load(rc.params, rc.location, modifiers) : null]).catch(function (err) {
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

    // Immediately call subscriber function. If this is called before the
    // initial response has resolved, both params will be undefined. If called
    // after init resp has resolved, first param is the most recent response and
    // action is last history.action.
    fn.apply(null, previous);

    var newLength = subscribers.push(fn);
    return function () {
      subscribers[newLength - 1] = null;
    };
  }

  function emit(response, action) {
    // don't emit old responses
    if (response.key !== mostRecentKey) {
      return false;
    }

    sideEffects.forEach(function (fn) {
      fn(response, action);
    });

    subscribers.forEach(function (fn) {
      if (fn != null) {
        fn(response, action);
      }
    });

    return true;
  }

  // create a response object using the current location and
  // emit it to any subscribed functions
  function makeResponse(location, action) {
    responseInProgress = prepareResponse(location).then(function (response) {
      var emitted = emit(response, action);
      // only store these after we have emitted.
      if (emitted) {
        previous = [response, action];
      }
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
//# sourceMappingURL=curi.es.js.map


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hickory_root__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__ = __webpack_require__(6);



function Browser() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["a" /* domExists */])()) {
    return;
  }

  if (!options.raw) {
    options.raw = __WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["b" /* ensureEncodedPathname */];
  }

  var _createCommonHistory = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__hickory_root__["a" /* default */])(options),
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

    var _ref = providedState || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["c" /* getStateFromHistory */])(),
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

  var initialAction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["c" /* getStateFromHistory */])().key !== undefined ? 'POP' : 'PUSH';

  var browserHistory = {
    // location
    location: locationFromBrowser(),
    action: initialAction,
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
  beforeDestroy.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["d" /* createEventCoordinator */])({
    popstate: function popstate(event) {
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["e" /* ignorablePopstateEvent */])(event)) {
        return;
      }
      pop(event.state);
    }
  }));

  return browserHistory;
}

/* harmony default export */ __webpack_exports__["default"] = (Browser);
//# sourceMappingURL=hickory-browser.es.js.map


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Home = __webpack_require__(12);

var _Home2 = _interopRequireDefault(_Home);

var _Contact = __webpack_require__(11);

var _Contact2 = _interopRequireDefault(_Contact);

var _Method = __webpack_require__(13);

var _Method2 = _interopRequireDefault(_Method);

var _NotFound = __webpack_require__(14);

var _NotFound2 = _interopRequireDefault(_NotFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  name: 'Home',
  path: '',
  body: function body() {
    return _Home2.default;
  }
}, {
  name: 'Contact',
  path: 'contact',
  body: function body() {
    return _Contact2.default;
  },
  children: [{
    name: 'Method',
    path: ':method',
    body: function body() {
      return _Method2.default;
    }
  }]
}, {
  name: 'NotFound',
  path: '(.*)',
  body: function body() {
    return _NotFound2.default;
  }
}];

exports.default = routes;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ensureEncodedPathname; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return domExists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ignorablePopstateEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getStateFromHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return createEventCoordinator; });
function ensureEncodedPathname(pathname) {
  var a = document.createElement('a');
  a.setAttribute('href', pathname);
  return a.pathname;
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

function createEventCoordinator(events) {
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


//# sourceMappingURL=hickory-dom-utils.es.js.map


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ensureBeginsWith */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return completePathname; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return completeHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return completeQuery; });
/* unused harmony export stripPrefix */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return stripBaseSegment; });
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


//# sourceMappingURL=hickory-location-utils.es.js.map


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__ = __webpack_require__(7);


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
      console.warn('The query option must contain a parse function property');
      _completeQuery = false;
    }
    if (typeof query.stringify !== 'function') {
      console.warn('The query option must contain a stringify function property');
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
      baseSegment = _options$baseSegment === undefined ? '' : _options$baseSegment,
      _options$raw = options.raw,
      raw = _options$raw === undefined ? function (p) {
    return p;
  } : _options$raw;

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

    location.pathname = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__["a" /* stripBaseSegment */])(value, baseSegment);

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

    location.rawPathname = raw(location.pathname);

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
    // ensure that pathname begins with a forward slash, query begins
    // with a question mark, and hash begins with a pound sign
    return baseSegment + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__["b" /* completePathname */])(location.rawPathname || location.pathname || '') + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__["c" /* completeQuery */])(stringify(location.query)) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__["d" /* completeHash */])(location.hash);
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

function Common(options) {
  return _extends({}, subscriptionCoordinator(), locationFactory(options), createNavigationConfirmation(), { keygen: createKeyGenerator() });
}

/* harmony default export */ __webpack_exports__["a"] = (Common);
//# sourceMappingURL=hickory-root.es.js.map


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _browser = __webpack_require__(4);

var _browser2 = _interopRequireDefault(_browser);

var _core = __webpack_require__(3);

var _core2 = _interopRequireDefault(_core);

var _svelte = __webpack_require__(2);

var _routes = __webpack_require__(5);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _browser2.default)();
var config = (0, _core2.default)(history, _routes2.default);
// Use setConfig so that the @curi/svelte components
// (curently just the <Link>) can interact with the
// configuration object.
(0, _svelte.setConfig)(config);

var view = void 0;
var root = document.getElementById('root');

// This function is called after every location
// change. The response's `body` will be a Svelte
// function, so we will call that to render the
// route
function render(response) {
  if (!response) {
    root.innerHTML = 'Loading...';
    return;
  }
  if (view) {
    view.destroy();
  } else {
    root.innerHTML = '';
  }

  view = new response.body({
    target: root,
    data: {
      response: response
    }
  });
}

config.subscribe(render);

/***/ }),
/* 10 */
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
  var defaultDelimiter = (options && options.delimiter) || '/'
  var delimiters = (options && options.delimiters) || './'
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
  var delimiter = escapeString(options.delimiter || '/')
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      if (keys) keys.push(token)

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

  // In non-strict mode we allow a delimiter at the end of a match.
  if (!strict) {
    route += '(?:' + delimiter + '(?=' + endsWith + '))?'
  }

  if (end) {
    route += endsWith === '$' ? endsWith : '(?=' + endsWith + ')'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += '(?=' + delimiter + '|' + endsWith + ')'
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Nav_html__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__ = __webpack_require__(0);




function create_main_fragment(state, component) {
	var text, p, text_1;

	var nav = new __WEBPACK_IMPORTED_MODULE_0__Nav_html__["a" /* default */]({
		_root: component._root
	});

	return {
		create: function() {
			nav._fragment.create();
			text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("\n");
			p = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("p");
			text_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("Please do not contact us!");
		},

		mount: function(target, anchor) {
			nav._mount(target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(text, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(p, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(text_1, p);
		},

		update: __WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["e" /* noop */],

		unmount: function() {
			nav._unmount();
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* detachNode */])(text);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* detachNode */])(p);
		},

		destroy: function() {
			nav.destroy(false);
		}
	};
}

function Contact(options) {
	this.options = options;
	this._state = options.data || {};

	this._observers = {
		pre: Object.create(null),
		post: Object.create(null)
	};

	this._handlers = Object.create(null);

	this._root = options._root || this;
	this._yield = options._yield;
	this._bind = options._bind;

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.create();
		this._fragment.mount(options.target, options.anchor || null);

		this._lock = true;
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._beforecreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._oncreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._aftercreate);
		this._lock = false;
	}
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["h" /* assign */])(Contact.prototype, __WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["i" /* proto */]);

/* harmony default export */ __webpack_exports__["default"] = (Contact);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Nav_html__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__ = __webpack_require__(0);




function create_main_fragment(state, component) {
	var text, h1, text_1;

	var nav = new __WEBPACK_IMPORTED_MODULE_0__Nav_html__["a" /* default */]({
		_root: component._root
	});

	return {
		create: function() {
			nav._fragment.create();
			text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("\n");
			h1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("h1");
			text_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("Home Page");
		},

		mount: function(target, anchor) {
			nav._mount(target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(text, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(h1, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(text_1, h1);
		},

		update: __WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["e" /* noop */],

		unmount: function() {
			nav._unmount();
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* detachNode */])(text);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* detachNode */])(h1);
		},

		destroy: function() {
			nav.destroy(false);
		}
	};
}

function Home(options) {
	this.options = options;
	this._state = options.data || {};

	this._observers = {
		pre: Object.create(null),
		post: Object.create(null)
	};

	this._handlers = Object.create(null);

	this._root = options._root || this;
	this._yield = options._yield;
	this._bind = options._bind;

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.create();
		this._fragment.mount(options.target, options.anchor || null);

		this._lock = true;
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._beforecreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._oncreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._aftercreate);
		this._lock = false;
	}
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["h" /* assign */])(Home.prototype, __WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["i" /* proto */]);

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Nav_html__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__ = __webpack_require__(0);




var template = (function() {
	return {
    data() {
      return {
        response: {
          params: {
            method: 'Unknown'
          }
        }
      }
    }
  }
}());

function create_main_fragment(state, component) {
	var text, p, text_1, text_2_value = state.response.params.method, text_2, text_3;

	var nav = new __WEBPACK_IMPORTED_MODULE_0__Nav_html__["a" /* default */]({
		_root: component._root
	});

	return {
		create: function() {
			nav._fragment.create();
			text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("\n");
			p = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("p");
			text_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("Please do not contact us by ");
			text_2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])(text_2_value);
			text_3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("!");
		},

		mount: function(target, anchor) {
			nav._mount(target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(text, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(p, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(text_1, p);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(text_2, p);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(text_3, p);
		},

		update: function(changed, state) {
			if ( (changed.response) && text_2_value !== (text_2_value = state.response.params.method) ) {
				text_2.data = text_2_value;
			}
		},

		unmount: function() {
			nav._unmount();
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* detachNode */])(text);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* detachNode */])(p);
		},

		destroy: function() {
			nav.destroy(false);
		}
	};
}

function Method(options) {
	this.options = options;
	this._state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["h" /* assign */])(template.data(), options.data);

	this._observers = {
		pre: Object.create(null),
		post: Object.create(null)
	};

	this._handlers = Object.create(null);

	this._root = options._root || this;
	this._yield = options._yield;
	this._bind = options._bind;

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.create();
		this._fragment.mount(options.target, options.anchor || null);

		this._lock = true;
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._beforecreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._oncreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._aftercreate);
		this._lock = false;
	}
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["h" /* assign */])(Method.prototype, __WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["i" /* proto */]);

/* harmony default export */ __webpack_exports__["default"] = (Method);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Nav_html__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__ = __webpack_require__(0);




function create_main_fragment(state, component) {
	var text, h1, text_1;

	var nav = new __WEBPACK_IMPORTED_MODULE_0__Nav_html__["a" /* default */]({
		_root: component._root
	});

	return {
		create: function() {
			nav._fragment.create();
			text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("\n");
			h1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("h1");
			text_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("The page you requested could not be found.");
		},

		mount: function(target, anchor) {
			nav._mount(target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(text, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(h1, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* appendNode */])(text_1, h1);
		},

		update: __WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["e" /* noop */],

		unmount: function() {
			nav._unmount();
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* detachNode */])(text);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* detachNode */])(h1);
		},

		destroy: function() {
			nav.destroy(false);
		}
	};
}

function NotFound(options) {
	this.options = options;
	this._state = options.data || {};

	this._observers = {
		pre: Object.create(null),
		post: Object.create(null)
	};

	this._handlers = Object.create(null);

	this._root = options._root || this;
	this._yield = options._yield;
	this._bind = options._bind;

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.create();
		this._fragment.mount(options.target, options.anchor || null);

		this._lock = true;
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._beforecreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._oncreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._aftercreate);
		this._lock = false;
	}
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["h" /* assign */])(NotFound.prototype, __WEBPACK_IMPORTED_MODULE_1__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["i" /* proto */]);

/* harmony default export */ __webpack_exports__["default"] = (NotFound);

/***/ })
/******/ ]);