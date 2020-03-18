const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const HtmlWebpackPlugin = require('html-webpack-plugin')

// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

let BASE_URL  = '/';                          //HTML5 history api href for <base>
let API_URL   = 'http://localhost/';     //API endpoints base

// const mainJSPath = path.resolve(__dirname, '../_src/js', 'main.js');
const mainCSSPath = path.resolve(__dirname, '../SASS', 'style.scss');

const publicPath = path.resolve(__dirname, '../');
const imagesPath = path.resolve(__dirname, '../_src/images');
const fontsPath = path.resolve(__dirname, '../_src/fonts');

//var autoprefixer = require('autoprefixer');

switch(process.env.NODE_ENV){
  case 'dev':
    BASE_URL = '/';
    API_URL  = 'http://clienti.langhe.test/';
    WP_THEME_LOCATION  = '/wp-content/themes/frontend/'
    break;
  case 'prod':
    BASE_URL = '/';
    API_URL = 'http://clienti.lovelanghe.com/';
    WP_THEME_LOCATION  = '/wp-content/themes/frontend/'
    break;
  default:
    //nothing here;
    break;
}

module.exports = {
  entry: {
    main: [
      // mainJSPath,
      mainCSSPath,
    ]
  },
  output: {
    // filename: process.env.NODE_ENV === 'prod' ? 'assets/scripts/[name].js' : 'assets/scripts/[name].js',
    path: publicPath,
    publicPath: '/'
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $ : 'jquery',
    //   $ : 'jQuery',
    //   objectFitImages: 'object-fit-images'
    // }),
    new webpack.DefinePlugin({
      "BASE_URL": JSON.stringify(BASE_URL),
      "API_URL": JSON.stringify(API_URL)
    }),
    new CleanWebpackPlugin(
      {
        dry: false,
        verbose: true,
        cleanStaleWebpackAssets: false,
        cleanOnceBeforeBuildPatterns: ['!**/*', 'assets/images' , 'assets/fonts']
      }
    ),

    // Simply copy assets to dist folder
    new CopyWebpackPlugin([
      { from: imagesPath, to: 'assets/images' },
      { from: fontsPath, to: 'assets/fonts' }
    ]),

    new MiniCssExtractPlugin({
      filename: 'style.css',
      fallback: 'style-loader',
      ignoreOrder: false
    }),
  ],
  resolve: {
		alias: {
      // silence is golden
		}
	},
  module: {
		rules: [
			//SASS compilation
			{
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'dev'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({
                overrideBrowserslist: [
                  'last 10 versions'
                ],
                grid: true
              })]
            }
          },
          'sass-loader'
        ]
      },
      //recognise fonts
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1,
                name: '[name].[ext]',
                outputPath: 'assets/fonts'
              }
            }]
      },
		],
	}
};
