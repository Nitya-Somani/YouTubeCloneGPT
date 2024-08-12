const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const glob = require('glob-all');

module.exports = {
  entry: './src/index.js', // Entry point for your React application
  output: {
    filename: 'bundle.js', // Output bundle
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Process JS files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile JS files using Babel
        },
      },
      {
        test: /\.css$/, // Process CSS files
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files
          'css-loader', // Turn CSS into CommonJS
        ],
      },
    ],
  },
  plugins: [
    // Generate an HTML file with the script tag included
    new HtmlWebpackPlugin({
      template: './public/index.html', // Template file
      inlineSource: '.(js|css)$', // Inline CSS and JS
    }),
    // Inline the CSS and JS directly into the HTML file
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    // Extract CSS into separate files
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // Purge unused CSS
    new PurgeCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, 'src/**/*.js'),
        path.join(__dirname, 'public/index.html')
      ]),
      safelist: ['safelist-class'], // Optional: classes to keep
    }),
    // Generate Critical CSS and inline it into the HTML
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, 'dist'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      },
    }),
  ],
  mode: 'production', // Set mode to production for optimization
};