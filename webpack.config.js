var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        include: /\.json$/, loaders: ["json-loader"]
      },
      {
        test: /\.svg$/,
        loader: "babel!react-svg"
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        loader: 'url-loader?limit=10000'
      }
    ]
  }
}
