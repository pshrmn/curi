import config from "../../config/rollup.config.js";

export default Object.assign({}, config, {
  output: {
    name: "CuriRedux"
  }
});
