import config from "../../config/rollup.config.js";

export default {
  ...config,
  external: ["react"],
  output: {
    ...config.output,
    name: "CuriReact",
    globals: {
      react: "React"
    }
  }
};
