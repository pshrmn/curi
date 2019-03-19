#!/usr/bin/env node
"use strict";

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var commander = _interopDefault(require("commander"));
var path = _interopDefault(require("path"));
var fs = require("fs-extra");
var inquirer = require("inquirer");
var dedent = _interopDefault(require("dedent"));
var spawn = _interopDefault(require("cross-spawn"));
var ast = require("@posh/ast");
var t = require("@babel/types");

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

function __awaiter(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done
        ? resolve(result.value)
        : new P(function(resolve) {
            resolve(result.value);
          }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return (
    (g = { next: verb(0), throw: verb(1), return: verb(2) }),
    typeof Symbol === "function" &&
      (g[Symbol.iterator] = function() {
        return this;
      }),
    g
  );
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (
          ((f = 1),
          y &&
            (t =
              op[0] & 2
                ? y["return"]
                : op[0]
                ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                : y.next) &&
            !(t = t.call(y, op[1])).done)
        )
          return t;
        if (((y = 0), t)) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (
              !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
              (op[0] === 6 || op[0] === 2)
            ) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error: error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}

function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}

function readConfig(path) {
  return require(path);
}
function writeConfig(config, path) {
  var content = "module.exports = " + JSON.stringify(config, null, 2) + ";\n";
  fs.writeFileSync(path, content);
}

var questions = [
  {
    type: "input",
    name: "root",
    default: ".",
    message:
      "Where is the root of the project? (leave blank if root is current directory)"
  },
  {
    type: "input",
    name: "src",
    default: "src",
    message:
      "What directory is your source code in (relative to current location)?"
  },
  {
    type: "input",
    name: "router",
    default: "router.js",
    message:
      "The router is created in its own module. What should the module be called?"
  },
  {
    type: "confirm",
    name: "overwriteRouter",
    default: false,
    message: "A router file already exists. Do you want to overwrite it?",
    when: function(answers) {
      var routesFile = path.join(answers.root, answers.src, answers.router);
      return fs.existsSync(routesFile);
    }
  },
  {
    type: "input",
    name: "routes",
    default: "routes.js",
    message:
      "Routes are created in their own module. What should the module be called?"
  },
  {
    type: "confirm",
    name: "overwriteRoutes",
    default: false,
    message: "A routes file already exists. Do you want to overwrite it?",
    when: function(answers) {
      var routesFile = path.join(answers.root, answers.src, answers.routes);
      return fs.existsSync(routesFile);
    }
  },
  {
    type: "input",
    name: "components",
    default: "components/routes",
    message: "Where should route components be created?"
  }
];

function structurePrompts() {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          console.log("\nFiles\n");
          return [4 /*yield*/, inquirer.prompt(questions)];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
}

function create() {
  return __awaiter(this, void 0, void 0, function() {
    var structure, config, root, output, e_1;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          return [4 /*yield*/, structurePrompts()];
        case 1:
          structure = _a.sent();
          config = {
            files: {
              src: structure.src,
              router: structure.router,
              routes: structure.routes,
              components: structure.components
            },
            async: false
          };
          root = structure.root || process.cwd();
          output = path.join(root, "curi.config.js");
          return [4 /*yield*/, fs.ensureDir(root)];
        case 2:
          _a.sent();
          writeConfig(config, output);
          return [3 /*break*/, 4];
        case 3:
          e_1 = _a.sent();
          console.error(e_1);
          return [3 /*break*/, 4];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}

var overwriteRouter = {
  type: "confirm",
  name: "overwriteRouter",
  default: false,
  message: "A router file already exists. Do you want to overwrite it?"
};
var overwriteRoutes = {
  type: "confirm",
  name: "overwriteRoutes",
  default: false,
  message: "A routes file already exists. Do you want to overwrite it?"
};

// if anything in here throws, let this fns caller catch and handle it
function existingFilesPrompts(config) {
  return __awaiter(this, void 0, void 0, function() {
    var root, _a, src, router, routes, routerFile, routesFile, hasExistingFiles;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          console.log("\nChecking existing files\n");
          root = process.cwd();
          (_a = config.files),
            (src = _a.src),
            (router = _a.router),
            (routes = _a.routes);
          routerFile = path.join(root, src, router);
          routesFile = path.join(root, src, routes);
          hasExistingFiles = false;
          if (!fs.existsSync(routerFile)) return [3 /*break*/, 2];
          hasExistingFiles = true;
          return [4 /*yield*/, inquirer.prompt(overwriteRouter)];
        case 1:
          _b.sent();
          _b.label = 2;
        case 2:
          if (!fs.existsSync(routesFile)) return [3 /*break*/, 4];
          hasExistingFiles = true;
          return [4 /*yield*/, inquirer.prompt(overwriteRoutes)];
        case 3:
          _b.sent();
          _b.label = 4;
        case 4:
          if (!hasExistingFiles) {
            console.log("No existing files to overwrite");
          }
          return [2 /*return*/];
      }
    });
  });
}

var uiQuestions = [
  {
    type: "list",
    name: "ui",
    message: "What will you use to render your application?",
    choices: [
      {
        name: "React DOM",
        value: "@curi/react-dom"
      },
      {
        name: "React Native",
        value: "@curi/react-native"
      },
      {
        name: "Vue",
        value: "@curi/vue"
      },
      {
        name: "Svelte",
        value: "@curi/svelte"
      },
      {
        name: "other",
        value: undefined
      }
    ],
    pageSize: 5
  }
];
var interactionQuestions = [
  {
    type: "confirm",
    name: "active",
    message: dedent(
      templateObject_1 ||
        (templateObject_1 = __makeTemplateObject(
          [
            '\n      Do you need to detect when a route is "active"?\n      (installs @curi/route-active)\n    '
          ],
          [
            '\n      Do you need to detect when a route is "active"?\n      (installs @curi/route-active)\n    '
          ]
        ))
    ),
    default: false
  },
  {
    type: "confirm",
    name: "ancestors",
    message: dedent(
      templateObject_2 ||
        (templateObject_2 = __makeTemplateObject(
          [
            "\n      Do you need to determine a route's ancestors (e.g. for breadcrumbs)?\n      (installs @curi/route-ancestors)\n    "
          ],
          [
            "\n      Do you need to determine a route's ancestors (e.g. for breadcrumbs)?\n      (installs @curi/route-ancestors)\n    "
          ]
        ))
    ),
    default: false
  },
  {
    type: "confirm",
    name: "prefetch",
    message: dedent(
      templateObject_3 ||
        (templateObject_3 = __makeTemplateObject(
          [
            "\n      Do you need to prefetch data for a route?\n      (installs @curi/route-prefetch)\n    "
          ],
          [
            "\n      Do you need to prefetch data for a route?\n      (installs @curi/route-prefetch)\n    "
          ]
        ))
    ),
    default: false
  }
];
var sideEffectQuestions = [
  {
    type: "confirm",
    name: "ariaLive",
    message: dedent(
      templateObject_4 ||
        (templateObject_4 = __makeTemplateObject(
          [
            "\n      Should your app announce navigation to screen reader users for better accessibility?\n      (installs @curi/side-effect-aria-live)\n    "
          ],
          [
            "\n      Should your app announce navigation to screen reader users for better accessibility?\n      (installs @curi/side-effect-aria-live)\n    "
          ]
        ))
    ),
    default: true
  },
  {
    type: "confirm",
    name: "scroll",
    message: dedent(
      templateObject_5 ||
        (templateObject_5 = __makeTemplateObject(
          [
            "\n      Should your app automatically scroll when navigating to a location with a hash?\n      (installs @curi/side-effect-scroll)\n    "
          ],
          [
            "\n      Should your app automatically scroll when navigating to a location with a hash?\n      (installs @curi/side-effect-scroll)\n    "
          ]
        ))
    ),
    default: true
  },
  {
    type: "confirm",
    name: "title",
    message: dedent(
      templateObject_6 ||
        (templateObject_6 = __makeTemplateObject(
          [
            "\n      Should your app set the document's title after navigating?\n      (installs @curi/side-effect-title)\n    "
          ],
          [
            "\n      Should your app set the document's title after navigating?\n      (installs @curi/side-effect-title)\n    "
          ]
        ))
    ),
    default: true
  }
];
var webHistoryQuestions = [
  {
    type: "confirm",
    name: "testing",
    message:
      "Will you be writing tests for the application that will run in Node (e.g. with Jest)?"
  },
  {
    type: "confirm",
    name: "ssr",
    message:
      "Will you be using server-side rendering or static site generation?"
  }
];
var templateObject_1,
  templateObject_2,
  templateObject_3,
  templateObject_4,
  templateObject_5,
  templateObject_6;

// if anything in here throws, let this fns caller catch and handle it
function packagesPrompts() {
  return __awaiter(this, void 0, void 0, function() {
    var uiAnswers,
      uiPackage,
      isReactNative,
      interactionPkgs,
      interactionAnswers,
      sideEffectPkgs,
      sideEffectAnswers,
      historyDeps,
      historyDevDeps,
      appHistory,
      historyAnswers;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          console.log("\nDependencies\n");
          console.log("UI");
          return [4 /*yield*/, inquirer.prompt(uiQuestions)];
        case 1:
          uiAnswers = _a.sent();
          uiPackage = uiAnswers.ui;
          isReactNative = uiPackage === "@curi/react-native";
          console.log("Interactions");
          interactionPkgs = [];
          return [4 /*yield*/, inquirer.prompt(interactionQuestions)];
        case 2:
          interactionAnswers = _a.sent();
          if (interactionAnswers.active) {
            interactionPkgs.push("@curi/route-active");
          }
          if (interactionAnswers.ancestors) {
            interactionPkgs.push("@curi/route-ancestors");
          }
          if (interactionAnswers.prefetch) {
            interactionPkgs.push("@curi/route-prefetch");
          }
          console.log("Side Effects");
          sideEffectPkgs = [];
          if (!!isReactNative) return [3 /*break*/, 4];
          return [4 /*yield*/, inquirer.prompt(sideEffectQuestions)];
        case 3:
          sideEffectAnswers = _a.sent();
          if (sideEffectAnswers.ariaLive) {
            sideEffectPkgs.push("@curi/side-effect-aria-live");
          }
          if (sideEffectAnswers.scroll) {
            sideEffectPkgs.push("@curi/side-effect-scroll");
          }
          if (sideEffectAnswers.title) {
            sideEffectPkgs.push("@curi/side-effect-title");
          }
          _a.label = 4;
        case 4:
          historyDeps = [];
          historyDevDeps = [];
          if (!!isReactNative) return [3 /*break*/, 6];
          console.log("Development");
          return [4 /*yield*/, inquirer.prompt(webHistoryQuestions)];
        case 5:
          historyAnswers = _a.sent();
          historyDeps.push("@hickory/browser");
          appHistory = "@hickory/browser";
          // make @hickory/in-memory a devDep when its Node use is only for testing
          if (historyAnswers.ssr) {
            historyDeps.push("@hickory/in-memory");
          } else if (historyAnswers.testing) {
            historyDevDeps.push("@hickory/in-memory");
          }
          return [3 /*break*/, 7];
        case 6:
          appHistory = "@hickory/in-memory";
          historyDeps.push("@hickory/in-memory");
          _a.label = 7;
        case 7:
          return [
            2 /*return*/,
            {
              deps: {
                ui: uiPackage,
                history: appHistory,
                interactions: interactionPkgs,
                sideEffects: sideEffectPkgs
              },
              install: {
                deps: __spread(
                  ["@curi/router", "@curi/helpers"],
                  interactionPkgs,
                  sideEffectPkgs,
                  historyDeps
                ),
                devDeps: __spread(historyDevDeps)
              }
            }
          ];
      }
    });
  });
}

function installRegularDependencies(deps) {
  return __awaiter(this, void 0, void 0, function() {
    var e_1;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            runInstallCommand("npm", __spread(["install", "--save"], deps))
          ];
        case 1:
          _a.sent();
          return [3 /*break*/, 3];
        case 2:
          e_1 = _a.sent();
          console.error(e_1);
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function installDevDependencies(deps) {
  return __awaiter(this, void 0, void 0, function() {
    var e_2;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (!deps.length) {
            return [2 /*return*/];
          }
          _a.label = 1;
        case 1:
          _a.trys.push([1, 3, , 4]);
          return [
            4 /*yield*/,
            runInstallCommand("npm", __spread(["install", "--save-dev"], deps))
          ];
        case 2:
          _a.sent();
          return [3 /*break*/, 4];
        case 3:
          e_2 = _a.sent();
          console.error(e_2);
          return [3 /*break*/, 4];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
function runInstallCommand(command, args) {
  return new Promise(function(resolve, reject) {
    var child = spawn(command, args, { stdio: "inherit" });
    child.on("close", function(exit) {
      if (exit !== 0) {
        reject(
          dedent(
            templateObject_1$1 ||
              (templateObject_1$1 = __makeTemplateObject(
                ["\n          Install failed:\n          ", " ", "\n        "],
                ["\n          Install failed:\n          ", " ", "\n        "]
              )),
            command,
            args.join(" ")
          )
        );
      } else {
        resolve();
      }
    });
  });
}
function installDependencies(deps, devDeps) {
  return __awaiter(this, void 0, void 0, function() {
    var e_3;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          // can these safely be run concurrently?
          return [4 /*yield*/, installRegularDependencies(deps)];
        case 1:
          // can these safely be run concurrently?
          _a.sent();
          return [4 /*yield*/, installDevDependencies(devDeps)];
        case 2:
          _a.sent();
          return [3 /*break*/, 4];
        case 3:
          e_3 = _a.sent();
          console.error(e_3);
          return [2 /*return*/];
        case 4:
          console.log("Finished installing dependencies");
          return [2 /*return*/];
      }
    });
  });
}
var templateObject_1$1;

function mapHistoryName(history) {
  switch (history) {
    case "@hickory/browser":
      return "Browser";
    case "@hickory/hash":
      return "Hash";
    case "@hickory/in-memory":
      return "InMemory";
    default:
      return "H"; // this should never happen
  }
}
function mapInteractionName(interaction) {
  switch (interaction) {
    case "@curi/route-active":
      return "active";
    case "@curi/route-ancestors":
      return "ancestors";
    case "@curi/route-prefetch":
      return "prefetch";
    default:
      return "unknown";
  }
}
function mapSideEffectName(interaction) {
  switch (interaction) {
    case "@curi/side-effect-aria-live":
      return "ariaLive";
    case "@curi/side-effect-scroll":
      return "scroll";
    case "@curi/side-effect-title":
      return "title";
    default:
      return "unknown";
  }
}

function generateRouterModule(routes, deps) {
  var curiImport = ast.types.importNamed(["curi"], "@curi/router");
  var historyImportName = mapHistoryName(deps.history);
  var historyImport = ast.types.importDefault(historyImportName, deps.history);
  var routesImport = ast.types.importDefault("routes", routes);
  var hasOptions = false;
  var routerOptions = ast.types.object([]);
  // import & create interactions
  var interactionImports = [];
  if (deps.interactions.length) {
    hasOptions = true;
    var interactionArray_1 = ast.types.array();
    deps.interactions.forEach(function(i) {
      var name = mapInteractionName(i);
      interactionImports.push(ast.types.importDefault(name, i));
      interactionArray_1.elements.push(ast.types.call(name, []));
    });
    routerOptions.properties.push(
      ast.types.objProp(ast.types.id("route"), interactionArray_1)
    );
  }
  // import & create side effects
  var sideEffectImports = [];
  var sideEffectCreates = [];
  if (deps.sideEffects.length) {
    hasOptions = true;
    var sideEffectArray_1 = ast.types.array();
    deps.sideEffects.forEach(function(s) {
      var name = mapSideEffectName(s);
      var sideEffectName = name + "Effect";
      sideEffectImports.push(ast.types.importDefault(name, s));
      sideEffectCreates.push(
        ast.types.constVar(sideEffectName, ast.types.call(name, []))
      );
      sideEffectArray_1.elements.push(ast.types.id(sideEffectName));
    });
    routerOptions.properties.push(
      ast.types.objProp(ast.types.id("sideEffects"), sideEffectArray_1)
    );
  }
  var history = ast.types.constVar(
    "history",
    ast.types.call(historyImportName, [])
  );
  var callCuri = ast.types.call("curi", [
    ast.types.id("history"),
    ast.types.id("routes")
  ]);
  var router = ast.types.constVar("router", callCuri);
  if (hasOptions) {
    callCuri.arguments.push(routerOptions);
  }
  var exportRouter = ast.types.exportDefault(ast.types.id("router"));
  var code = "";
  code += ast.stringify(
    __spread(
      [curiImport, historyImport],
      interactionImports,
      sideEffectImports
    ),
    2
  );
  code += ast.stringify([routesImport], 2);
  code += ast.stringify([history], 2);
  if (sideEffectCreates.length) {
    code += ast.stringify(sideEffectCreates, 2);
  }
  code += ast.stringify([router, exportRouter], 1);
  return code;
}
function createRouterFile(config, deps, root) {
  return __awaiter(this, void 0, void 0, function() {
    var _a,
      src,
      router,
      routes,
      srcDir,
      routerSrc,
      routerDir,
      routesSrc,
      relativeRoutes,
      routerCode;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          (_a = config.files),
            (src = _a.src),
            (router = _a.router),
            (routes = _a.routes);
          srcDir = path.join(root, src);
          routerSrc = path.join(srcDir, router);
          routerDir = path.dirname(routerSrc);
          routesSrc = path.join(srcDir, routes);
          relativeRoutes = path.relative(routerDir, routesSrc);
          if (relativeRoutes.charAt(0) !== ".") {
            relativeRoutes = "./" + relativeRoutes;
          }
          // use ensure file in case the file is in a dir that needs to be created
          return [4 /*yield*/, fs.ensureFile(routerSrc)];
        case 1:
          // use ensure file in case the file is in a dir that needs to be created
          _b.sent();
          routerCode = generateRouterModule(relativeRoutes, deps);
          return [2 /*return*/, fs.writeFile(routerSrc, routerCode)];
      }
    });
  });
}

function createRoute(name, path) {
  return t.objectExpression([
    t.objectProperty(t.identifier("name"), t.stringLiteral(name)),
    t.objectProperty(t.identifier("path"), t.stringLiteral(path))
  ]);
}

function createRoutesFile(config, root) {
  return __awaiter(this, void 0, void 0, function() {
    var _a,
      src,
      routes,
      srcDir,
      routesSrc,
      importPrepare,
      routesArray,
      preparedRoutes,
      notFoundRoute,
      exportRoutes,
      code;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          (_a = config.files), (src = _a.src), (routes = _a.routes);
          srcDir = path.join(root, src);
          routesSrc = path.join(srcDir, routes);
          importPrepare = ast.types.importNamed(
            ["prepareRoutes"],
            "@curi/router"
          );
          routesArray = ast.types.array();
          preparedRoutes = ast.types.call("prepareRoutes", [routesArray]);
          notFoundRoute = createRoute("Not Found", "(.*)");
          routesArray.elements.push(notFoundRoute);
          exportRoutes = ast.types.exportDefault(preparedRoutes);
          code = "";
          code += ast.stringify([importPrepare], 2);
          code += ast.stringify([exportRoutes], 1);
          // use ensure file in case the file is in a dir that needs to be created
          return [4 /*yield*/, fs.ensureFile(routesSrc)];
        case 1:
          // use ensure file in case the file is in a dir that needs to be created
          _b.sent();
          fs.writeFile(routesSrc, code);
          return [2 /*return*/];
      }
    });
  });
}

function setupProjectFiles(config, deps, root) {
  return __awaiter(this, void 0, void 0, function() {
    var _a, src, components, srcDir, componentDir;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          (_a = config.files), (src = _a.src), (components = _a.components);
          return [4 /*yield*/, fs.ensureDir(src)];
        case 1:
          _b.sent();
          return [4 /*yield*/, createRouterFile(config, deps, root)];
        case 2:
          _b.sent();
          return [4 /*yield*/, createRoutesFile(config, root)];
        case 3:
          _b.sent();
          srcDir = path.join(root, src);
          componentDir = path.join(srcDir, components);
          return [4 /*yield*/, fs.ensureDir(componentDir)];
        case 4:
          _b.sent();
          return [2 /*return*/];
      }
    });
  });
}

function hasPackageJSON() {
  return __awaiter(this, void 0, void 0, function() {
    var here, pkgJSON;
    return __generator(this, function(_a) {
      here = process.cwd();
      pkgJSON = path.join(here, "package.json");
      return [2 /*return*/, fs.pathExists(pkgJSON)];
    });
  });
}

function create$1() {
  return __awaiter(this, void 0, void 0, function() {
    var inPackage, root, configPath, config, _a, deps, install, e_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, , 6]);
          return [4 /*yield*/, hasPackageJSON()];
        case 1:
          inPackage = _b.sent();
          if (!inPackage) {
            console.error(
              '"curi create" only works in a valid package. Did you forget to call "npm init"?'
            );
            return [2 /*return*/];
          }
          root = process.cwd();
          configPath = path.join(root, "curi.config.js");
          config = readConfig(configPath);
          return [4 /*yield*/, existingFilesPrompts(config)];
        case 2:
          _b.sent();
          return [4 /*yield*/, packagesPrompts()];
        case 3:
          (_a = _b.sent()), (deps = _a.deps), (install = _a.install);
          installDependencies(install.deps, install.devDeps);
          return [4 /*yield*/, setupProjectFiles(config, deps, root)];
        case 4:
          _b.sent();
          return [3 /*break*/, 6];
        case 5:
          e_1 = _b.sent();
          console.error(e_1);
          return [3 /*break*/, 6];
        case 6:
          return [2 /*return*/];
      }
    });
  });
}

function staticCommand(command) {
  console.warn("The static command is currently a placeholder");
  switch (command) {
    case "init":
      console.log("Initializing");
      break;
    case "serve":
      console.log("Serving");
      break;
    case "build":
      console.log("Building");
      break;
    default:
      console.warn('Invalid command "' + command + '".');
      return;
  }
  return;
}

commander
  .command("init")
  .description("Create a Curi config module")
  .action(create);
commander.command("install").action(create$1);
commander
  .command("static <command>")
  .description("Static file generation")
  .action(staticCommand);
commander.parse(process.argv);
