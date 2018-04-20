import config from "../../config/rollup.config.js";

export default {
  ...config,
  external: ["vue"],
  output: {
    ...config.output,
    name: "CuriVue",
    globals: {
      vue: "Vue"
    }
  }
};
