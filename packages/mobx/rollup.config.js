import config from "../../config/rollup.config.js";

export default Object.assign({}, config, {
  external: ["mobx"],
  output: {
    name: "CuriMobX",
    globals: {
      mobx: "MobX"
    }
  }
});
