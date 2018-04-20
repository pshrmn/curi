import typescript from "rollup-plugin-typescript2";
import uglify from "rollup-plugin-uglify";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

const config = {
  input: "src/index.ts",
  output: {
    sourcemap: false
  },
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      // TypeScript -> Uglify
      "@class": "#__PURE__"
    }),
    resolve(),
    commonjs({
      include: /node_modules/
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(uglify());
}

export default config;
