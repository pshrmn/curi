const rollupBuild = require("../../../scripts/build");
const typescript = require("rollup-plugin-typescript2");

// don't bundle dependencies for es/cjs builds
const pkg = require("../package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

const base = {
  name: "CuriReactDOM",
  input: "src/index.ts",
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    })
  ],
  globals: {
    react: "React"
  }
};

rollupBuild([
  [
    "ES",
    {
      ...base,
      format: "es",
      file: "dist/curi-react-dom.es.js",
      external: [...deps, "react"],
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "CommonJS",
    {
      ...base,
      format: "cjs",
      file: "dist/curi-react-dom.common.js",
      external: [...deps, "react"],
      safeModules: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "UMD",
    {
      ...base,
      format: "umd",
      file: "dist/curi-react-dom.js",
      external: ["react"]
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "minimized UMD",
    {
      ...base,
      format: "umd",
      file: "dist/curi-react-dom.min.js",
      external: ["react"],
      uglify: true
    },
    { NODE_ENV: "production", BABEL_ENV: "build" }
  ]
]);
