import config from "../../config/rollup.config.js";

export default Object.assign({}, config, {
  external: ["react", "prop-types"],
  output: {
    name: "CuriReact",
    globals: {
      react: "React",
      "prop-types": "PropTypes"
    }
  }
});
