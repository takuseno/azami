import path from 'path'
import webpack from 'webpack'

export default {
  target: "atom",
  entry:  __dirname + '/src/app.jsx',
  output: {
    path: __dirname + '/dist',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    preLoaders: [
      { test: /\.json$/, loader: 'json'},
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel",
        query:{
          presets: ['react', 'es2015'],
          plugins: [
            "add-module-exports",
            "transform-es2015-modules-commonjs"
          ]
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ]
};
