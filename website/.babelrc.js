let plugins = [
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-proposal-object-rest-spread",
  "emotion"
];

let modules;
switch (process.env.BABEL_ENV) {
  case "node":
    plugins.push("dynamic-import-node");
    modules = "commonjs";
    break;
  default:
    plugins.push("@babel/plugin-syntax-dynamic-import");
    modules = false;
}

let config = {
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        modules,
        targets: {
          browsers: ["> 1%"]
        }
      }
    ]
  ],
  plugins
};

module.exports = config;
