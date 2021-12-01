// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"SubtitleService.ts":[function(require,module,exports) {
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SubtitleService = /*#__PURE__*/function () {
  function SubtitleService(htmlManager) {
    _classCallCheck(this, SubtitleService);

    this.subIsOpen = false;
    this.subsHistoryIsOpen = false;
    this.subsHistory = [];
    this.htmlManager = htmlManager;
    this.spanForHistory = htmlManager.getSpanForHistory();
    this.init();
  }

  _createClass(SubtitleService, [{
    key: "init",
    value: function init() {
      this.htmlManager.addDivForSubsHistory();

      this._runObserver();
    }
  }, {
    key: "toggleSub",
    value: function toggleSub() {
      this.subIsOpen ? this.hideSub() : this.showSub();
    }
  }, {
    key: "toggleSubHistory",
    value: function toggleSubHistory() {
      this.subsHistoryIsOpen ? this.hideSubsHistory() : this.showSubsHistory();
    }
  }, {
    key: "showSub",
    value: function showSub() {
      var selector = Object.getPrototypeOf(this.htmlManager).constructor.blockWithSubSelector;
      var style = "".concat(selector, "{display: inherit!important;}");

      this._addStyle(style, 'sub');

      this.subIsOpen = true;
      this.hideSubsHistory();
    }
  }, {
    key: "hideSub",
    value: function hideSub() {
      var selector = Object.getPrototypeOf(this.htmlManager).constructor.blockWithSubSelector;
      var style = "".concat(selector, "{display: none!important;}");

      this._addStyle(style, 'sub');

      this.subIsOpen = false;
    }
  }, {
    key: "showSubsHistory",
    value: function showSubsHistory() {
      var selector = Object.getPrototypeOf(this.htmlManager).constructor.blockWithSubHistorySelector;
      var style = "".concat(selector, "{display: inherit!important;}");

      this._addStyle(style, 'sub-history');

      this.subsHistoryIsOpen = true;
      this.hideSub();
    }
  }, {
    key: "hideSubsHistory",
    value: function hideSubsHistory() {
      var selector = Object.getPrototypeOf(this.htmlManager).constructor.blockWithSubHistorySelector;
      var style = "".concat(selector, "{display: none!important;}");

      this._addStyle(style, 'sub-history');

      this.subsHistoryIsOpen = false;
    }
  }, {
    key: "_runObserver",
    value: function _runObserver() {
      var _this = this;

      var callback = function callback(mutationsList) {
        var _iterator = _createForOfIteratorHelper(mutationsList),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var mutation = _step.value;
            var removedNodes = mutation.removedNodes[0];

            if (mutation.type === 'childList' && removedNodes) {
              var text = _this.htmlManager.parseSubs(removedNodes);

              if (text !== _this.lastSubText) {
                _this.lastSubText = text;

                _this.subsHistory.push(_this.lastSubText);

                if (_this.subsHistory.length > 4) {
                  _this.subsHistory = _this.subsHistory.slice(1, 5);
                }

                _this._renderHistory();
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      };

      var observer = new MutationObserver(callback);
      observer.observe(this.htmlManager.getBlockWithSub(), {
        childList: true,
        subtree: true
      });
    }
  }, {
    key: "_renderHistory",
    value: function _renderHistory() {
      var newElForSub = this.htmlManager.getSubHistoryBlock();
      newElForSub.childNodes.forEach(function (n) {
        return n.remove();
      });
      var index = 0;

      var _iterator2 = _createForOfIteratorHelper(this.subsHistory),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var lastSub = _step2.value;
          var span = this.spanForHistory.cloneNode(false);
          span.innerHTML = index === 0 ? lastSub : '<br>' + lastSub;
          newElForSub.appendChild(span);
          index++;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "_addStyle",
    value: function _addStyle(style, name) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var dataAttrName = "data-subtitle-manager-".concat(name);
      var css = document.querySelector("style[".concat(dataAttrName, "='style']"));

      if (!css) {
        css = document.createElement('style');
      }

      css.setAttribute(dataAttrName, 'style');
      css.setAttribute('type', 'text/css');

      if (override) {
        css.innerHTML = style;
      } else {
        css.innerHTML += style;
      }

      document.getElementsByTagName("head")[0].appendChild(css);
    }
  }]);

  return SubtitleService;
}();

exports.default = SubtitleService;
},{}],"HtmlManagers/HtmlManagerRezka.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var HtmlManagerRezka = /*#__PURE__*/function () {
  function HtmlManagerRezka() {
    _classCallCheck(this, HtmlManagerRezka);
  }

  _createClass(HtmlManagerRezka, [{
    key: "addDivForSubsHistory",
    value: function addDivForSubsHistory() {
      var _a;

      var newElForSub = this.getBlockWithSub().cloneNode(false);
      newElForSub.style.zIndex = '9999';
      newElForSub.classList.add('div-for-subs');
      (_a = document.getElementById('oframecdnplayer')) === null || _a === void 0 ? void 0 : _a.prepend(newElForSub);
      return newElForSub;
    }
  }, {
    key: "getBlockWithSub",
    value: function getBlockWithSub() {
      // noinspection CssInvalidHtmlTagReference
      var res = document.querySelector(HtmlManagerRezka.blockWithSubSelector);

      if (!res) {
        throw new Error(' no result for getBlockWithSub');
      }

      return res;
    }
  }, {
    key: "getSpanForHistory",
    value: function getSpanForHistory() {
      // noinspection CssInvalidHtmlTagReference
      var res = this.getBlockWithSub().firstChild;

      if (!res) {
        throw new Error(' no result for getBlockWithSub');
      }

      return res.cloneNode(false);
    }
  }, {
    key: "getSubHistoryBlock",
    value: function getSubHistoryBlock() {
      var res = document.querySelector(HtmlManagerRezka.blockWithSubHistorySelector);

      if (!res) {
        throw new Error(' no result for getSubHistoryBlock');
      }

      return res;
    }
  }, {
    key: "parseSubs",
    value: function parseSubs(el) {
      return el.innerHTML.replace('<br>', ' ');
    }
  }], [{
    key: "hasSubBlock",
    value: function hasSubBlock() {
      var _a;

      var el = document.querySelector(HtmlManagerRezka.blockWithSubSelector);
      return !!(el && el.firstChild && ((_a = el.firstChild) === null || _a === void 0 ? void 0 : _a.nodeName) === 'SPAN');
    }
  }]);

  return HtmlManagerRezka;
}();

exports.default = HtmlManagerRezka;
HtmlManagerRezka.blockWithSubSelector = '#oframecdnplayer > pjsdiv:last-child';
HtmlManagerRezka.blockWithSubHistorySelector = '#oframecdnplayer .div-for-subs';
},{}],"HtmlManagers/HtmlManagerNetflix.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var HtmlManagerNetflix = /*#__PURE__*/function () {
  function HtmlManagerNetflix() {
    _classCallCheck(this, HtmlManagerNetflix);
  }

  _createClass(HtmlManagerNetflix, [{
    key: "addDivForSubsHistory",
    value: function addDivForSubsHistory() {
      var _a;

      var el = document.querySelector('.player-timedtext > .player-timedtext-text-container');
      var newElForSub = el.cloneNode(false);
      newElForSub.style.zIndex = '9999';
      newElForSub.classList.add('div-for-subs');
      (_a = document.querySelector('.watch-video--player-view [data-uia="video-canvas"] > div > div')) === null || _a === void 0 ? void 0 : _a.prepend(newElForSub);
      return newElForSub;
    }
  }, {
    key: "getBlockWithSub",
    value: function getBlockWithSub() {
      // noinspection CssInvalidHtmlTagReference
      var res = document.querySelector(HtmlManagerNetflix.blockWithSubSelector);

      if (!res) {
        throw new Error(' no result for getBlockWithSub');
      }

      return res;
    }
  }, {
    key: "getSpanForHistory",
    value: function getSpanForHistory() {
      var _a; // noinspection CssInvalidHtmlTagReference


      var res = (_a = this.getBlockWithSub().firstChild) === null || _a === void 0 ? void 0 : _a.firstChild;

      if (!res) {
        throw new Error(' no result for getBlockWithSub');
      }

      return res.cloneNode(false);
    }
  }, {
    key: "getSubHistoryBlock",
    value: function getSubHistoryBlock() {
      var res = document.querySelector(HtmlManagerNetflix.blockWithSubHistorySelector);

      if (!res) {
        throw new Error(' no result for getSubHistoryBlock');
      }

      return res;
    }
  }, {
    key: "parseSubs",
    value: function parseSubs(el) {
      // @ts-ignore
      var child = el.childNodes;
      var res = '';
      child.forEach(function (i) {
        res += i.innerHTML.replace('<br>', ' ');
      });
      return res;
    }
  }], [{
    key: "hasSubBlock",
    value: function hasSubBlock() {
      var el = document.querySelector(HtmlManagerNetflix.blockWithSubSelector);
      return !!el && !!el.firstChild;
    }
  }]);

  return HtmlManagerNetflix;
}();

exports.default = HtmlManagerNetflix;
HtmlManagerNetflix.blockWithSubSelector = '.player-timedtext';
HtmlManagerNetflix.blockWithSubHistorySelector = '.div-for-subs';
},{}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SubtitleService_1 = __importDefault(require("./SubtitleService"));

var HtmlManagerRezka_1 = __importDefault(require("./HtmlManagers/HtmlManagerRezka"));

var HtmlManagerNetflix_1 = __importDefault(require("./HtmlManagers/HtmlManagerNetflix"));

var subtitleService;

var manager = function () {
  switch (window.location.host) {
    case 'rezka.ag':
      return HtmlManagerRezka_1.default;

    case 'www.netflix.com':
      return HtmlManagerNetflix_1.default;

    default:
      return HtmlManagerRezka_1.default;
  }
}();

document.onkeydown = function (e) {
  if (!subtitleService) {
    return;
  }

  var key = e.key;

  if (key === 'c') {
    subtitleService.toggleSub();
  }

  if (key === 'v') {
    subtitleService.toggleSubHistory();
  }
};

_waitForCondition(manager.hasSubBlock).then(function () {
  // @ts-ignore
  var htmlManager = new manager();
  subtitleService = new SubtitleService_1.default(htmlManager);
});

function _waitForCondition(conditionCallback) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  function _search() {
    return new Promise(function (resolve) {
      setTimeout(resolve, delay);
    });
  }

  if (!conditionCallback()) {
    return _search().then(function () {
      return _waitForCondition(conditionCallback, delay);
    });
  } else {
    return Promise.resolve();
  }
}
},{"./SubtitleService":"SubtitleService.ts","./HtmlManagers/HtmlManagerRezka":"HtmlManagers/HtmlManagerRezka.ts","./HtmlManagers/HtmlManagerNetflix":"HtmlManagers/HtmlManagerNetflix.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63447" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=index.js.map