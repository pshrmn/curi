import config from "../../config/rollup.config.js";

export default {
  ...config,
  external: ["mobx"],
  output: {
    ...config.output,
    name: "CuriMobX",
    globals: {
      mobx: "MobX"
    }
  }
};
