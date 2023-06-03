const { defineConfig } = require('@vue/cli-service')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path')
module.exports = defineConfig({
  pluginOptions: {
    mpx: {
      srcMode: 'wx',
      plugin: {
        hackResolveBuildDependencies: ({ files, resolveDependencies }) => {
          const packageJSONPath = path.resolve('package.json')
          if (files.has(packageJSONPath)) files.delete(packageJSONPath)
          if (resolveDependencies.files.has(packageJSONPath)) {
            resolveDependencies.files.delete(packageJSONPath)
          }
        },
        // miniNpmPackage: ['@vant/weapp'],
        // transRpxRules: [
        //   // {
        //   //   mode: 'only', // 只对注释为'use rpx'的块儿启用转换rpx
        //   //   comment: 'use rpx', // mode为'only'时，默认值为'use rpx'
        //   //   include: path.resolve('src'),
        //   //   exclude: path.resolve('lib'),
        //   //   designWidth: 750
        //   // },
        //   {
        //     mode: 'all', // 所有样式都启用转换rpx，除了注释为'use px'的样式不转换
        //     comment: 'use px', // mode为'all'时，默认值为'use px'
        //     designWidth: 1920,
        //     include: path.resolve('node_modules/@didi/mpx-sec-guard')
        //   }
        // ],

      },
    }
  },
  /**
   * 如果希望node_modules下的文件时对应的缓存可以失效，
   * 可以将configureWebpack.snap.managedPaths修改为 []
   */
  configureWebpack(config) {
    return {
      module: {
        rules: [
          {
            test: /\.css$/,
            include: path.resolve('src'),
            oneOf: [
              // MiniCssExtractPlugin.loader,
              'css-loader'
            ]
          },
          {
            test: /\.styl$/,
            include: path.resolve('src'),
            oneOf: [
              // MiniCssExtractPlugin.loader,
              'stylus-loader',
              'css-loader',
            ]
          },
          //...
        ]
      },
      plugins: [
        // ...
        // new MiniCssExtractPlugin({
        //   filename: 'css/index.css'
        // }),
        new BundleAnalyzerPlugin()
      ],
      optimization: {
        minimize: true,
        usedExports: true,
        runtimeChunk: {
          name: 'bundle'
        },
        splitChunks: {
          chunks: 'all',
          name: 'bundle',
          minChunks: 2
        }
      },
      resolve: {
        alias: {
          '@': path.resolve('src')
        },
        extensions: ['.mpx', '.js']
      }
    }
  }
})
