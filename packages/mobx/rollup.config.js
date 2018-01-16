import config from "../../config/rollup.config.js";

export default Object.assign({}, config, {
  name: "CuriMobX",
  external: ["mobx"],
  globals: {
    mobx: "MobX"
  }
});
