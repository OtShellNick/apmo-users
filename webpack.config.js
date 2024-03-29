const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

const { NODE_ENV } = process.env;
const IsDev = NODE_ENV === 'development';

const filename = (ext) => (IsDev ? `[name].${ext}` : `[name].[contenthash].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [
    MiniCssExtractPlugin.loader,
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: [
      '@babel/preset-env',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
    ],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions(),
  }];

  return loaders;
};

const plugins = () => [
  new FaviconsWebpackPlugin({
    logo: path.resolve(__dirname, './src/assets/favicon.png'),
    prefix: 'icons-[fullhash]/',
  }),
  new HTMLWebpackPlugin({
    template: './src/index.html',
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: filename('css'),
  }),
];

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@style': path.resolve(__dirname, './src/style'),
      '@containers': path.resolve(__dirname, './src/containers'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@actions': path.resolve(__dirname, './src/actions'),
      '@config': path.resolve(__dirname, './src/config'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
  mode: NODE_ENV || 'production',
  entry: ['@babel/polyfill', path.resolve(__dirname, './src/index.jsx')],
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    pathinfo: true,
    filename: '[name].[fullhash].js',
    chunkFilename: '[name].[id].[fullhash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        oneOf: [
          {
            resourceQuery: /jsx/,
            use: ['@svgr/webpack'],
          },
          {
            use: 'url-loader',
          },
        ],
        issuer: /\.[jt]sx?$/,
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[contenthash][ext]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.jsx$/,
        include: [/sbx-.+/, /src/],
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-react'),
          },
        ],
      },
    ],
  },
  devServer: {
    port: 8088,
    static: './build',
    historyApiFallback: true,
    compress: true,
  },
  plugins: plugins(),
};
