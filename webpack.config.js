const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// We'll refer to our source and dist paths frequently, so let's store them here
const PATH_SOURCE = path.join(__dirname, './src/client');
const PATH_DIST = path.join(__dirname, './dist');

module.exports = {
  // The point or points to enter the application. This is where Webpack will
  // start. We generally have one entry point per HTML page. For single-page
  // applications, this means one entry point. For traditional multi-page apps,
  // we may have multiple entry points.
  // https://webpack.js.org/concepts#entry
  entry: [path.join(PATH_SOURCE, './index.js')],

  // Tell Webpack where to emit the bundles it creates and how to name them.
  // https://webpack.js.org/concepts#output
  // https://webpack.js.org/configuration/output#output-filename
  output: {
    path: PATH_DIST,
    filename: 'js/[name].[hash].js',
  },
  // Determine how the different types of modules will be treated.
  // https://webpack.js.org/configuration/module
  // https://webpack.js.org/concepts#loaders
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Apply this rule to files ending in .js or .jsx
        exclude: /node_modules/,
        // Use the following loader and options
        use: {
          loader: 'babel-loader',
          // We can pass options to both babel-loader and Babel. This option object
          // will replace babel.config.js
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  debug: true,
                  // Configure how @babel/preset-env handles polyfills from core-js.
                  // https://babeljs.io/docs/en/babel-preset-env
                  useBuiltIns: 'usage',
                  // Specify the core-js version. Must match the version in package.json
                  corejs: 3,

                  // Specify which environments we support/target for our project.
                  // (We have chosen to specify targets in .browserslistrc, so there
                  // is no need to do it here.)
                  targets: 'last 2 versions, not dead, > 0.5%',
                },
              ],
              '@babel/preset-react',
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: { root: path.resolve(PATH_SOURCE) },
  },
  devServer: {
    // The dev server will serve content from this directory.
    contentBase: PATH_DIST,
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
    // Show a full-screen overlay in the browser when there are compiler
    // errors or warnings.
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
};
