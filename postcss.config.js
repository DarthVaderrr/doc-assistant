const autoPrefixer= require('autoprefixer');
module.exports = {
    plugins: [
      autoPrefixer({
        // flex:true,
        // Browserslist:['android 4.2']
      }),//自动添加浏览器前缀,这个插件由postcss-loader引入webpack中
    ]
  }
