const {BABEL_ENV, NODE_ENV} = process.env;

const cjs = BABEL_ENV === "cjs" || NODE_ENV === "test";

module.exports = {
  presets: ["env"],
  plugins: [
    "transform-object-rest-spread",
    "transform-class-properties",
    cjs && "transform-es2015-modules-commonjs"
  ].filter(Boolean),
  env: {
    test: {
      plugins: ["istanbul"]
    }
  }
};
