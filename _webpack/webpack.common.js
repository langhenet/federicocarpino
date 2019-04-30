const webpack = require("webpack");
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


let BASE_URL  = '/';                          //HTML5 history api href for <base>
let API_URL   = 'http://localhost/';     //API endpoints base
const mainCSSPath = path.resolve(__dirname, '../SASS', 'style.scss');
const publicPath = path.resolve(__dirname, '../');
const imagesPath = path.resolve(__dirname, '../_src/images');
const fontsPath = path.resolve(__dirname, '../_src/fonts');

module.exports = {
  entry: {
    main: [
    //  vendorsCSSPath,
      mainCSSPath
    ]
  },
  output: {
    filename: 'style.css'
  },
  plugins: [
    new CleanWebpackPlugin(
      ['../assets/images'],
      ['../assets/fonts'],
      {
        allowExternal: true,
        verbose: true
    }),
    // Simply copy assets to dist folder
    new CopyWebpackPlugin([
      { from: imagesPath, to: 'assets/images' },
      // { from: fontsPath, to: 'assets/fonts' }
    ]),
  ],
  // output: {
  //   // filename: process.env.NODE_ENV === 'prod' ? 'assets/scripts/[name].min.js?h=[hash]' : 'assets/scripts/[name].js?h=[hash]',
  //   path: publicPath,
  //   // filename: '[name].js',
  //   publicPath: ''
  // },
  module: {
    rules: [
        {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader",
            {
            loader: 'postcss-loader',
            options: {
              // url: false,
              plugins: () => [autoprefixer({
                browsers: [
                  'last 10 versions',
                ],
                grid: true
              })]
            }
          },
        "sass-loader"],
        // publicPath: "/public",
        })
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: '[name].[ext]',
              outputPath: 'assets/images/'
            }
          }]
      },
      {
        test: /\.(svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1,
            name: '[name].[ext]',
            outputPath: 'assets/images/svg/'
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1,
            name: '[name].[ext]',
            outputPath: 'assets/fonts/'
          }
        }]
      },
      {
        //CASSI
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      },
    ]
  }
};
