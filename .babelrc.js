const { BABEL_ENV, NODE_ENV } = process.env;

const cjs = BABEL_ENV === "cjs" || NODE_ENV === "test";

module.exports = {
  presets: [
    ["preset-env", { loose: true, modules: false }],
    "transform-object-rest-spread",
    "transform-class-properties"
  ],
  plugins: [cjs && "transform-es2015-modules-commonjs"].filter(Boolean)
};
