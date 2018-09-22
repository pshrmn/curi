const plugins = [
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-proposal-object-rest-spread"
];

switch (process.env.BABEL_ENV) {
  case "dev":
    plugins.push("dynamic-import-node");
    break;
  case "build":
    plugins.push("dynamic-import-node", [
      "babel-plugin-transform-require-ignore",
      {
        extensions: [".scss"]
      }
    ]);
    break;
  default:
    plugins.push("@babel/plugin-syntax-dynamic-import");
}

console.log({ plugins }, process.env.BABEL_ENV);

const config = {
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        modules: "commonjs",
        targets: {
          browsers: ["> 1%"]
        }
      }
    ]
  ],
  plugins
};

module.exports = config;
