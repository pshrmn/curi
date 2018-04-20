import config from "../../config/rollup.config.js";

export default {
  ...config,
  external: ["react", "react-native"],
  output: {
    ...config.output,
    name: "CuriReactNative",
    globals: {
      react: "React",
      "react-native": "ReactNative"
    }
  }
};
