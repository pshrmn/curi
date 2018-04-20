import config from "../../config/rollup.config.js";

export default {
  ...config,
  output: {
    ...config.output,
    name: "CuriRedux"
  }
};
