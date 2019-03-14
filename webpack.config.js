/*-----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/

const autoprefixer = require("autoprefixer");
const path = require("path");
// const webpack = require("webpack");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

const STYLE_DIR = path.resolve(__dirname, "style");

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve("style-loader"),
    {
      loader: require.resolve("css-loader"),
      options: cssOptions
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve("postcss-loader"),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: "postcss",
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          autoprefixer({
            flexbox: "no-2009"
          }),
          require("postcss-flexbugs-fixes"),
        ]
      }
    }
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};

module.exports = {
  mode: "development",
  entry: {
    "app.module": STYLE_DIR + "/app.module.css",
    index: STYLE_DIR + "/index.css"
  },
  output: {
    path: path.join(__dirname, "lib", "style"),
    filename: "[name].css" // output js file name is identical to css file name
  },
  module: {
    rules: [
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          // By default we support CSS Modules with the extension .module.css
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1
            })
          },
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            })
          }
        ]
      },
      // {
      //   test: /\.tsx?$/,
      //   // use: "awesome-typescript-loader",
      //   use: "ts-loader"
      // }
    ]
  },
  // resolve: {
  //   extensions: [".ts", ".tsx", ".js"]
  // },
  devtool: "inline-source-map",
  // plugins: [
  //   // Ignore require() calls in vs/language/typescript/lib/typescriptServices.js
  //   new webpack.IgnorePlugin(
  //     /^((fs)|(path)|(os)|(crypto)|(source-map-support))$/,
  //     /vs\/language\/typescript\/lib/
  //   )
  // ]
};
