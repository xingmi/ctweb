var path = require('path');
var webpack = require('webpack');
// var vue = require('vue-loader'),

module.exports = {
  entry: {
    productDetail  : './res/controllers/productDetail.js',
    staticResource : './res/controllers/staticResource.js',
    productList    : './res/controllers/productList.js',
    collaboration  : './res/controllers/collaboration.js',
    index          : './res/controllers/index.js',
    news           : './res/controllers/news.js',
    newsDetail     : './res/controllers/newsDetail.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue'    : 'vue/dist/vue.js',
      'jquery' : path.join(__dirname,'./res/lib/jquery-1.11.1.min.js')
    }
  },
  externals: {
    $ : 'jQuery'
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: 'source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
