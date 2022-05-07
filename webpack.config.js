const path = require('path') // 处理绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin')//
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//css以css文件的形式导入
module.exports = {
  entry: path.join(__dirname, '/src/index.js'), // 入口文件
  output: {
    path: path.join(__dirname, '/dist'), //打包后的文件存放的地方
    filename: 'bundle.js' //打包后输出文件的文件名
  },
  devServer: {
    // static: {
    //   directory:path.join(__dirname, '/src/static'), // 静态文件目录
    // },
    compress: true, //是否启动压缩 gzip
    port: 8080, // 端口号
    open:true,  // 是否自动打开浏览器
    hot:true//热更新
  },
  mode:'development',
  module: { 
    rules: [
      // {
      //   test:/\.(jpe?g|png|gif)$/i, // 匹配图片文件
      //   type:'asset',//webpack5的新特性
      //   parser:{
      //     dataUrlCondition:{
      //       maxSize:8 * 1024,

      //     }
      //   },
      //   generator:{
      //     filename:'img[hash:10].[ext]'
      //   }
      // },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(jpe?g|png|gif|glb|gltf)$/i, // 匹配图片文件
        use:[
          {
            loader:'url-loader',
            options:{
              limit:8*8,
              esModule:false
            }
          }
        ],
        type:'javascript/auto'
      },
      {
        test: /\.css$/, //匹配所有的 css 文件 postcss-loader处理CSS3的内容兼容
        use: [MiniCssExtractPlugin.loader,
          {
            loader:'css-loader',
            // options:{
            //   url:false,//css本身处理url的处理关掉，否则会打包出一个无用的图片
            // }
          },'postcss-loader'] // use: 对应的 Loader 名称 loader顺序是从后向前
      },
      // {
      //   test: /\.(glb|gltf)$/,
    //     use:
    //     [
    //         {
    //             loader: 'file-loader',
    //         }
    //     ]
    // },
    ]
  },
  plugins:[ // 配置插件
  new MiniCssExtractPlugin({ // 添加插件
    filename: '[name].[hash:8].css'
  }),
  new HtmlWebpackPlugin({
    template: './src/public/index.html'
  }),
  new CleanWebpackPlugin(),//清除dist下的内容
  ]
}