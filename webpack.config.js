const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
      path: path.resolve(__dirname, './build'),
      filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  devServer: {
    port: 8080,
    proxy: {
      '/api/**': 'http://localhost:3000'
    },
    publicPath: '/build/'
    
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  }
}