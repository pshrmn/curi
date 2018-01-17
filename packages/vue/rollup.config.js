import config from "../../config/rollup.config.js";

export default Object.assign({}, config, {
  external: ["vue"],
  output: {
    name: "CuriVue",
    globals: {
      vue: "Vue"
    }
  }
});
