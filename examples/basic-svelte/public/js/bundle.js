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
/* unused harmony export blankObject */
/* unused harmony export destroy */
/* unused harmony export destroyDev */
/* unused harmony export differs */
/* unused harmony export dispatchObservers */
/* unused harmony export fire */
/* unused harmony export get */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return init; });
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return appendNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return insertNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return detachNode; });
/* unused harmony export detachBetween */
/* unused harmony export detachBefore */
/* unused harmony export detachAfter */
/* unused harmony export reinsertBetween */
/* unused harmony export reinsertChildren */
/* unused harmony export reinsertAfter */
/* unused harmony export reinsertBefore */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return destroyEach; });
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return noop; });
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

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
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

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
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

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function init(component, options) {
	component.options = options;

	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._root = options._root || component;
	component._yield = options._yield;
	component._bind = options._bind;
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
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);
	dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
	this._fragment.p(changed, this._state);
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
	this._fragment.m(target, anchor);
}

function _unmount() {
	this._fragment.u();
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__curi_svelte__ = __webpack_require__(2);
/* src/components/Nav.html generated by Svelte v1.40.2 */



function data() {
  return {
    methods: ['email', 'phone']
  }
};

function create_main_fragment(state, component) {
	var nav, ul, li, text, li_1, text_2, text_3, ul_1;

	var link = new __WEBPACK_IMPORTED_MODULE_1__curi_svelte__["Link"]({
		_root: component._root,
		slots: { default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["j" /* createFragment */])() },
		data: { to: "Home" }
	});

	var link_1 = new __WEBPACK_IMPORTED_MODULE_1__curi_svelte__["Link"]({
		_root: component._root,
		slots: { default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["j" /* createFragment */])() },
		data: { to: "Contact" }
	});

	var methods = state.methods;

	var each_blocks = [];

	for (var i = 0; i < methods.length; i += 1) {
		each_blocks[i] = create_each_block(state, methods, methods[i], i, component);
	}

	return {
		c: function create() {
			nav = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("nav");
			ul = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("ul");
			li = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("li");
			text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("Home");
			link._fragment.c();
			li_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("li");
			text_2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("Contact Us");
			link_1._fragment.c();
			text_3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("\n    ");
			ul_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("ul");

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}
		},

		m: function mount(target, anchor) {
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(nav, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["k" /* appendNode */])(ul, nav);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["k" /* appendNode */])(li, ul);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["k" /* appendNode */])(text, link._slotted.default);
			link._mount(li, null);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["k" /* appendNode */])(li_1, ul);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["k" /* appendNode */])(text_2, link_1._slotted.default);
			link_1._mount(li_1, null);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["k" /* appendNode */])(text_3, li_1);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["k" /* appendNode */])(ul_1, li_1);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul_1, null);
			}
		},

		p: function update(changed, state) {
			var methods = state.methods;

			if (changed.methods) {
				for (var i = 0; i < methods.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].p(changed, state, methods, methods[i], i);
					} else {
						each_blocks[i] = create_each_block(state, methods, methods[i], i, component);
						each_blocks[i].c();
						each_blocks[i].m(ul_1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
					each_blocks[i].d();
				}
				each_blocks.length = methods.length;
			}
		},

		u: function unmount() {
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["e" /* detachNode */])(nav);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].u();
			}
		},

		d: function destroy() {
			link.destroy(false);
			link_1.destroy(false);

			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["l" /* destroyEach */])(each_blocks);
		}
	};
}

// (9:6) {{#each methods as method}}
function create_each_block(state, methods, method, method_index, component) {
	var li, text, text_1_value = method, text_1;

	var link = new __WEBPACK_IMPORTED_MODULE_1__curi_svelte__["Link"]({
		_root: component._root,
		slots: { default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["j" /* createFragment */])() },
		data: { to: "Method", params: { method } }
	});

	return {
		c: function create() {
			li = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("li");
			text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("By ");
			text_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])(text_1_value);
			link._fragment.c();
		},

		m: function mount(target, anchor) {
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(li, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["k" /* appendNode */])(text, link._slotted.default);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["k" /* appendNode */])(text_1, link._slotted.default);
			link._mount(li, null);
		},

		p: function update(changed, state, methods, method, method_index) {
			if ((changed.methods) && text_1_value !== (text_1_value = method)) {
				text_1.data = text_1_value;
			}

			var link_changes = {};
			if (changed.methods) link_changes.params = { method };
			link._set( link_changes );
		},

		u: function unmount() {
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["e" /* detachNode */])(li);
		},

		d: function destroy() {
			link.destroy(false);
		}
	};
}

function Nav(options) {
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* init */])(this, options);
	this._state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["h" /* assign */])(data(), options.data);

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._beforecreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._oncreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._aftercreate);
		this._lock = false;
	}
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["h" /* assign */])(Nav.prototype, __WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["i" /* proto */]);
/* harmony default export */ __webpack_exports__["a"] = (Nav);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfig", function() { return getConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConfig", function() { return setConfig; });
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

function blankObject() {
  return Object.create(null);
}

function destroy(detach) {
  this.destroy = noop;
  this.fire('destroy');
  this.set = this.get = noop;
  if (detach !== false) this._fragment.u();

  this._fragment.d();

  this._fragment = this._state = null;
}

function differs(a, b) {
  return a !== b || a && typeof a === 'object' || typeof a === 'function';
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

function fire(eventName, data) {
  var handlers = eventName in this._handlers && this._handlers[eventName].slice();

  if (!handlers) return;

  for (var i = 0; i < handlers.length; i += 1) {
    handlers[i].call(this, data);
  }
}

function get(key) {
  return key ? this._state[key] : this._state;
}

function init(component, options) {
  component.options = options;
  component._observers = {
    pre: blankObject(),
    post: blankObject()
  };
  component._handlers = blankObject();
  component._root = options._root || component;
  component._yield = options._yield;
  component._bind = options._bind;
}

function observe(key, callback, options) {
  var group = options && options.defer ? this._observers.post : this._observers.pre;
  (group[key] || (group[key] = [])).push(callback);

  if (!options || options.init !== false) {
    callback.__calling = true;
    callback.call(this, this._state[key]);
    callback.__calling = false;
  }

  return {
    cancel: function () {
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
    cancel: function () {
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

  this._recompute(changed, this._state);

  if (this._bind) this._bind(changed, this._state);
  dispatchObservers(this, this._observers.pre, changed, this._state, oldState);

  this._fragment.p(changed, this._state);

  dispatchObservers(this, this._observers.post, changed, this._state, oldState);
}

function callAll(fns) {
  while (fns && fns.length) fns.pop()();
}

function _mount(target, anchor) {
  this._fragment.m(target, anchor);
}

function _unmount() {
  this._fragment.u();
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

var config = void 0;
function setConfig(c) {
  config = c;
}
function getConfig() {
  return config;
}

/* src/Link.html generated by Svelte v1.40.1 */
var canNavigate = function canNavigate(event) {
  return !event.defaultPrevented && event.button === 0 && !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

function location(to, params, details) {
  var config = getConfig();
  return Object.assign({}, {
    pathname: config.addons.pathname(to, params)
  }, details);
}

function href(location) {
  var config = getConfig();
  return config.history.toHref(location);
}

function data() {
  return {
    to: '',
    params: {},
    details: {}
  };
}


var methods = {
  handleClick: function handleClick(event, location) {
    var can = canNavigate(event);

    if (can) {
      event.preventDefault();
      var config = getConfig();
      config.history.update(location);
    }
  }
};

function create_main_fragment(state, component) {
  var a,
      slot_content_default = component._slotted.default;

  function click_handler(event) {
    var state = component.get();
    component.handleClick(event, state.location);
  }

  return {
    c: function create() {
      a = createElement("a");
      this.h();
    },
    h: function hydrate() {
      a.href = state.href;
      addListener(a, "click", click_handler);
    },
    m: function mount(target, anchor) {
      insertNode(a, target, anchor);

      if (slot_content_default) {
        appendNode(slot_content_default, a);
      }
    },
    p: function update(changed, state) {
      if (changed.href) {
        a.href = state.href;
      }
    },
    u: function unmount() {
      detachNode(a);

      if (slot_content_default) {
        reinsertChildren(a, slot_content_default);
      }
    },
    d: function destroy$$1() {
      removeListener(a, "click", click_handler);
    }
  };
}

function Link(options) {
  init(this, options);
  this._state = assign(data(), options.data);

  this._recompute({
    to: 1,
    params: 1,
    details: 1,
    location: 1
  }, this._state);

  this._slotted = options.slots || {};
  this.slots = {};
  this._fragment = create_main_fragment(this._state, this);

  if (options.target) {
    this._fragment.c();

    this._fragment.m(options.target, options.anchor || null);
  }
}

assign(Link.prototype, methods, proto);

Link.prototype._recompute = function _recompute(changed, state) {
  if (changed.to || changed.params || changed.details) {
    if (differs(state.location, state.location = location(state.to, state.params, state.details))) changed.location = true;
  }

  if (changed.location) {
    if (differs(state.href, state.href = href(state.location))) changed.href = true;
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

function path(pathString, options) {
    var keys = [];
    var re = __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default()(pathString, keys, options);
    return { re: re, keys: keys };
}

var createRoute = function (options) {
    var _a = options || {}, name = _a.name, path$$1 = _a.path, _b = _a.pathOptions, pathOptions = _b === void 0 ? {} : _b, body = _a.body, children = _a.children, preload = _a.preload, load = _a.load, title = _a.title, extra = _a.extra;
    // end defaults to true, so end has to be hardcoded for it to be false
    var expectedExact = pathOptions.end == null || pathOptions.end;
    // when we have child routes, we need to perform non-end matching
    if (children.length) {
        pathOptions.end = false;
    }
    var regexPath = path(path$$1, pathOptions);
    return {
        name: name,
        path: path$$1,
        body: body,
        getBody: function () {
            return this.body && this.body();
        },
        children: children,
        preload: preload ? once(preload) : undefined,
        load: load,
        keys: regexPath.keys.map(function (key) { return key.name; }),
        title: title,
        extra: extra,
        match: function (pathname, rc, parentPath) {
            var testPath = stripLeadingSlash(pathname);
            var match = regexPath.re.exec(testPath);
            if (!match) {
                return false;
            }
            var segment = match[0], parsed = match.slice(1);
            var params = {};
            regexPath.keys.forEach(function (key, index) {
                params[key.name] = parsed[index];
            });
            var uriString = parentPath != null
                ? join(parentPath, segment)
                : withLeadingSlash(segment);
            rc.push(this, params);
            // if there are no children, then we accept the match
            if (!children || !children.length) {
                return true;
            }
            // children only need to match against unmatched segments
            var remainder = testPath.slice(segment.length);
            var notExact = !!remainder.length;
            var hasChildMatch = children.some(function (c) {
                return c.match(remainder, rc, uriString);
            });
            // if the route has children, but none of them match, remove the match unless it
            // is exact
            if (expectedExact && notExact && !hasChildMatch) {
                rc.pop();
                return false;
            }
            return true;
        }
    };
};

function walkRoutes(routeArray, addons) {
    var routes = createRoutes(routeArray);
    registerAddons(addons, routes);
    return routes;
}
function createRoutes(routeArray) {
    return routeArray.map(function (routeObject) {
        var children = routeObject.children
            ? createRoutes(routeObject.children)
            : [];
        return createRoute(__assign({}, routeObject, { children: children }));
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

var ResponseCreator = /** #__PURE__ */ (function () {
    function ResponseCreator(key, location) {
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
    ResponseCreator.prototype.redirect = function (to, code) {
        if (code === void 0) { code = 301; }
        this.setStatus(code);
        this.redirectTo = to;
    };
    ResponseCreator.prototype.fail = function (err) {
        this.error = err;
    };
    ResponseCreator.prototype.setStatus = function (code) {
        this.status = code;
    };
    ResponseCreator.prototype.push = function (route, params) {
        this.matches.push({ route: route, params: params });
    };
    ResponseCreator.prototype.pop = function () {
        this.matches.pop();
    };
    ResponseCreator.prototype.setData = function (data) {
        this.data = data;
    };
    ResponseCreator.prototype.freeze = function () {
        var _this = this;
        if (this.matches.length) {
            var bestMatch = this.matches.pop();
            this.matches.forEach(function (m) {
                _this.partials.push(m.route.name);
                Object.assign(_this.params, m.params);
            });
            this.route = bestMatch.route;
            Object.assign(this.params, bestMatch.params);
        }
    };
    ResponseCreator.prototype.generateTitle = function () {
        if (!this.route || !this.route.title) {
            return '';
        }
        return typeof this.route.title === 'function'
            ? this.route.title(this.params, this.data)
            : this.route.title;
    };
    ResponseCreator.prototype.asObject = function () {
        var sharedResponse = {
            key: this.key,
            location: this.location,
            status: this.status,
            data: this.data,
            title: this.generateTitle(),
            body: this.route && this.route.getBody()
        };
        if (this.redirectTo != null) {
            return __assign({}, sharedResponse, { redirectTo: this.redirectTo });
        }
        return __assign({}, sharedResponse, { name: this.route ? this.route.name : undefined, partials: this.partials, params: this.params, error: this.error });
    };
    return ResponseCreator;
}());

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
    // add the pathname addon to the provided addons
    var finalAddons = userAddons.concat(createPathnameAddon(pathnameOptions));
    var routes = [];
    var registeredAddons = {};
    var subscribers = [];
    var mostRecentKey;
    var previous = [];
    var responseInProgress;
    function setupRoutesAndAddons(routeArray) {
        var addonFunctions = [];
        // clear out any existing addons
        for (var key in registeredAddons) {
            delete registeredAddons[key];
        }
        finalAddons.forEach(function (addon) {
            addon.reset();
            registeredAddons[addon.name] = addon.get;
            addonFunctions.push(addon);
        });
        routes = walkRoutes(routeArray, addonFunctions);
        makeResponse(history.location, history.action);
    }
    
    function matchRoute(rc) {
        routes.some(function (route) { return (route.match(history.location.pathname, rc)); });
        // once we have matched the route, we freeze the responseCreator to
        // set its route/params/partials properties
        rc.freeze();
        return Promise.resolve(rc);
    }
    
    function loadRoute(rc) {
        var route = rc.route;
        if (!route) {
            rc.setStatus(404);
            return Promise.resolve(rc);
        }
        // just want to pass a subset of the ResponseCreator's methods
        // to the user
        var modifiers = route.load
            ? {
                fail: rc.fail.bind(rc),
                redirect: rc.redirect.bind(rc),
                setData: rc.setData.bind(rc),
                setStatus: rc.setStatus.bind(rc)
            }
            : undefined;
        return Promise.all([
            route.preload ? route.preload() : null,
            route.load ? route.load(rc.params, rc.location, modifiers, registeredAddons) : null
        ]).then(function () { return rc; });
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
        return matchRoute(rc)
            .then(loadRoute)
            .then(finalizeResponse);
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
        beforeSideEffects.forEach(function (fn) {
            fn(response, action);
        });
        subscribers.forEach(function (fn) {
            if (fn != null) {
                fn(response, action);
            }
        });
        afterSideEffects.forEach(function (fn) {
            fn(response, action);
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
            if (response.redirectTo) {
                history.replace(response.redirectTo);
            }
            return response;
        }, function (err) {
            console.error(err);
            return null;
        });
    }
    
    // now that everything is defined, actually do the setup
    setupRoutesAndAddons(routeArray);
    var unlisten = history.subscribe(makeResponse);
    return {
        ready: function () { return responseInProgress; },
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



function Browser(options) {
    if (options === void 0) { options = {}; }
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["a" /* domExists */])()) {
        return;
    }
    if (!options.raw) {
        options.raw = __WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["b" /* ensureEncodedPathname */];
    }
    var _a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__hickory_root__["a" /* default */])(options), subscribe = _a.subscribe, emit = _a.emit, removeAllSubscribers = _a.removeAllSubscribers, createLocation = _a.createLocation, createPath = _a.createPath, confirmNavigation = _a.confirmNavigation, confirmWith = _a.confirmWith, removeConfirmation = _a.removeConfirmation, keygen = _a.keygen;
    var beforeDestroy = [removeAllSubscribers];
    // when true, pop will run without attempting to get user confirmation
    var reverting = false;
    function locationFromBrowser(providedState) {
        var _a = window.location, pathname = _a.pathname, search = _a.search, hash = _a.hash;
        var path = pathname + search + hash;
        var _b = providedState || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__hickory_dom_utils__["c" /* getStateFromHistory */])(), key = _b.key, state = _b.state;
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
            beforeDestroy.forEach(function (fn) { fn(); });
        },
        update: function update(to) {
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
                var path = toHref(location);
                var key = location.key, state = location.state;
                window.history.pushState({ key: key, state: state }, '', path);
                browserHistory.location = location;
                browserHistory.action = 'PUSH';
                emit(browserHistory.location, 'PUSH');
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
                var path = toHref(location);
                var key = location.key, state = location.state;
                window.history.replaceState({ key: key, state: state }, '', path);
                browserHistory.location = location;
                browserHistory.action = 'REPLACE';
                emit(browserHistory.location, 'REPLACE');
            });
        },
        go: function go(num) {
            // calling window.history.go with no value reloads the page, but
            // we will just re-emit instead
            if (!num) {
                browserHistory.action = 'POP';
                emit(browserHistory.location, 'POP');
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
        popstate: function (event) {
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


//# sourceMappingURL=hickory-location-utils.es.js.map


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__ = __webpack_require__(7);


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

function subscriptionCoordinator() {
    var subscribers = [];
    function subscribe(fn) {
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
    var parse, stringify;
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
        location.pathname = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__["a" /* stripBaseSegment */])(value, baseSegment);
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
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__["b" /* completePathname */])(location.rawPathname ||
                location.pathname ||
                '') +
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__["c" /* completeQuery */])(stringify(location.query)) +
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__hickory_location_utils__["d" /* completeHash */])(location.hash));
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
    return __assign({}, subscriptionCoordinator(), locationFactory(options), createNavigationConfirmation(), createKeyGenerator());
}

/* harmony default export */ __webpack_exports__["a"] = (Common$1);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Nav_html__ = __webpack_require__(1);
/* src/components/Contact.html generated by Svelte v1.40.2 */





function create_main_fragment(state, component) {
	var text, p;

	var nav = new __WEBPACK_IMPORTED_MODULE_1__Nav_html__["a" /* default */]({
		_root: component._root
	});

	return {
		c: function create() {
			nav._fragment.c();
			text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("\n");
			p = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("p");
			p.textContent = "Please do not contact us!";
		},

		m: function mount(target, anchor) {
			nav._mount(target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(text, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(p, target, anchor);
		},

		p: __WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* noop */],

		u: function unmount() {
			nav._unmount();
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["e" /* detachNode */])(text);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["e" /* detachNode */])(p);
		},

		d: function destroy() {
			nav.destroy(false);
		}
	};
}

function Contact(options) {
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* init */])(this, options);
	this._state = options.data || {};

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._beforecreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._oncreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._aftercreate);
		this._lock = false;
	}
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["h" /* assign */])(Contact.prototype, __WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["i" /* proto */]);
/* harmony default export */ __webpack_exports__["default"] = (Contact);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Nav_html__ = __webpack_require__(1);
/* src/components/Home.html generated by Svelte v1.40.2 */





function create_main_fragment(state, component) {
	var text, h1;

	var nav = new __WEBPACK_IMPORTED_MODULE_1__Nav_html__["a" /* default */]({
		_root: component._root
	});

	return {
		c: function create() {
			nav._fragment.c();
			text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("\n");
			h1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("h1");
			h1.textContent = "Home Page";
		},

		m: function mount(target, anchor) {
			nav._mount(target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(text, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(h1, target, anchor);
		},

		p: __WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* noop */],

		u: function unmount() {
			nav._unmount();
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["e" /* detachNode */])(text);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["e" /* detachNode */])(h1);
		},

		d: function destroy() {
			nav.destroy(false);
		}
	};
}

function Home(options) {
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* init */])(this, options);
	this._state = options.data || {};

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._beforecreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._oncreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._aftercreate);
		this._lock = false;
	}
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["h" /* assign */])(Home.prototype, __WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["i" /* proto */]);
/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Nav_html__ = __webpack_require__(1);
/* src/components/Method.html generated by Svelte v1.40.2 */



function data() {
  return {
    response: {
      params: {
        method: 'Unknown'
      }
    }
  }
};

function create_main_fragment(state, component) {
	var text, p, text_1, text_2_value = state.response.params.method, text_2, text_3;

	var nav = new __WEBPACK_IMPORTED_MODULE_1__Nav_html__["a" /* default */]({
		_root: component._root
	});

	return {
		c: function create() {
			nav._fragment.c();
			text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("\n");
			p = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("p");
			text_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("Please do not contact us by ");
			text_2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])(text_2_value);
			text_3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("!");
		},

		m: function mount(target, anchor) {
			nav._mount(target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(text, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(p, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["k" /* appendNode */])(text_1, p);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["k" /* appendNode */])(text_2, p);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["k" /* appendNode */])(text_3, p);
		},

		p: function update(changed, state) {
			if ((changed.response) && text_2_value !== (text_2_value = state.response.params.method)) {
				text_2.data = text_2_value;
			}
		},

		u: function unmount() {
			nav._unmount();
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["e" /* detachNode */])(text);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["e" /* detachNode */])(p);
		},

		d: function destroy() {
			nav.destroy(false);
		}
	};
}

function Method(options) {
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* init */])(this, options);
	this._state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["h" /* assign */])(data(), options.data);

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._beforecreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._oncreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._aftercreate);
		this._lock = false;
	}
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["h" /* assign */])(Method.prototype, __WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["i" /* proto */]);
/* harmony default export */ __webpack_exports__["default"] = (Method);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Nav_html__ = __webpack_require__(1);
/* src/components/NotFound.html generated by Svelte v1.40.2 */





function create_main_fragment(state, component) {
	var text, h1;

	var nav = new __WEBPACK_IMPORTED_MODULE_1__Nav_html__["a" /* default */]({
		_root: component._root
	});

	return {
		c: function create() {
			nav._fragment.c();
			text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["a" /* createText */])("\n");
			h1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["b" /* createElement */])("h1");
			h1.textContent = "The page you requested could not be found.";
		},

		m: function mount(target, anchor) {
			nav._mount(target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(text, target, anchor);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["c" /* insertNode */])(h1, target, anchor);
		},

		p: __WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["d" /* noop */],

		u: function unmount() {
			nav._unmount();
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["e" /* detachNode */])(text);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["e" /* detachNode */])(h1);
		},

		d: function destroy() {
			nav.destroy(false);
		}
	};
}

function NotFound(options) {
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["f" /* init */])(this, options);
	this._state = options.data || {};

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._beforecreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._oncreate);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["g" /* callAll */])(this._aftercreate);
		this._lock = false;
	}
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["h" /* assign */])(NotFound.prototype, __WEBPACK_IMPORTED_MODULE_0__home_paul_Code_npm_curi_examples_basic_svelte_node_modules_svelte_shared_js__["i" /* proto */]);
/* harmony default export */ __webpack_exports__["default"] = (NotFound);

/***/ })
/******/ ]);