const plugins = [
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-proposal-object-rest-spread"
];

let modules;
switch (process.env.BABEL_ENV) {
  case "node":
    plugins.push("dynamic-import-node", [
      "babel-plugin-transform-require-ignore",
      {
        extensions: [".scss"]
      }
    ]);
    modules = "commonjs";
    break;
  default:
    plugins.push("@babel/plugin-syntax-dynamic-import");
    modules = false;
}

const config = {
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
