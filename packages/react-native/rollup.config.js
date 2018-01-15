import config from "../../config/rollup.config.js";

export default Object.assign({}, config, {
  external: ["react", "react-native", "prop-types"],
  output: {
    name: "CuriReact",
    globals: {
      react: "React",
      "react-native": "ReactNative",
      "prop-types": "PropTypes"
    }
  }
});
