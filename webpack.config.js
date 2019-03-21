const path = require('path');

module.exports = {
    name: 'typescript-starter',
    entry: [path.resolve(__dirname, 'src/index.tsx')],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'app.bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /(node_modules|expo_project|.test.ts$)/,
          resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
          },
          use: {
            loader: 'babel-loader',
          }
        }
      ]
    }
};
