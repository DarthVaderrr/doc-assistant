const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    context: path.join(__dirname, 'resources/app'),//js资源入口路径
    /**
     * entry字段类型:
     * 字符串->文件名  
     * 对象(支持多入口):{chunkName:'entryPath',chunkName2:'entryPath2'}  对象的字段值也可以用数组
     * 数组:['path1','path2'] 数组的[最后一项]为[入口]  前面的项会被预先import到入口文件里 入口还是单一的 只是会自动导入依赖
     * 函数:返回值是上面的类型就行  也可以返回promise resolve(实际返回值) 以此支持异步地获取入口值
     * 项目中一般是两个入口:将app代码和开源库分开打包,因为开源库一般是不需要更新的,但app时常更新,app更新时用户只需重新加载app.js
     * */
    entry: {
        content_script: "./content_script/index.js",//content_script
        dom: "./front-dom/dom.js",//插入页面的组件 对应插件前台dom
        popup: "./popup/popup.js",//扩展程序的弹出窗
        option: "./option/option.js"//设置页面
        //扩展程序还可以用:后台页面/侧边栏等功能页  只要在manifest.json内定义字段即可
    },
    output: {
        path: require('path').join(__dirname, "resources/dist"), //path必须是绝对路径
        /**
         * filename字段值[只列出常用的]:
         * 1. chunkName插槽 '[name].js' 最后打包的文件对应entry的chunkName 如果entry是多个 则按chunkName打包成多个
         * 2. 字符串 一个文件名或者完整路径  如果不存在 会自动创建该路径
         * 3. 除了name插槽外 还支持hash id  query  chunkHash 都对应entry中的字段 
         *    chunkHash是chunk内容的摘要 所以chunk更新时hash也会更新 这样就避免产生缓存 query也可以做到这样  但是要自己指定
         * 4. 插槽可以搭配使用  例如 [name]@[chunkHash].js  [name]v=[version].js 以便直观地查看版本信息
         */
        filename: "[name].js",//name对应entry中的字段名 chunkhash是hash值
        chunkFilename: "[name].js",//异步chunk的文件名 默认值:以0开始的数字 可以在异步引入的import函数中通过注释对其命名:
        //import(/* webpackChunkName:"async_name" */ "./async.js").then(...) 通过注释来给它命名
    },
    mode: "production",//设置为production 则会启用一些生产环境配置,比如去除警告,代码压缩
    // devtool:'source-map',//打包js时将会生成source-map 其他文件则需要额外配置 sourcemap会大大减慢构建速度,可以选择简版sourcemap 具体配置见文档
    //默认的sourceMap会暴露工程源码,可以通过以下方式处理:
    //1.设置字段值为hidden-source-map,此时js中不会指明sourceMap的位置,可以通过sentry来配置和查看源码
    //2.设置字段值为nosource-source-map 它和默认的source-map的报错一致,但是source-map文件不会直接暴露 任何人都无法查看源码,包括开发者
    //3.服务端通过代理对.js.map文件限制ip访问,这样普通用户无法从服务器上载入source-map
    //在js文件的最后一行添加注释: // # sourceMappingURL=page2.js.map 则指定了source-map地址 chrome在打开控制台时会自动获取

    module: { //定义loader的使用规则  loader用于将非js文件转换成js文件  以便webpack打包

        noParse: /min\.js$/,//loader将不会解析noParse匹配到的模块(不会进行语法转义,但仍然会打包),这个字段可以使用函数过滤目录
        //如果要在打包时丢弃某个库,可以用webpack.IgnorePlugin插件,它匹配到的模块不会被打包
        rules: [
            {
                test: /\.(less|css)$/,
                use: [{//对于css源文件,最后一步使用此插件处理,它会把css打包成单独的文件,而style-loader只会打包成标签
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: path.join(__dirname, 'dist'),//貌似有bug,修改无效,同步css都保存在dist下,而异步的在根目录下也有保存
                    }
                },
                    'css-loader',
                    'postcss-loader',//用于整合一些css插件 例如添加前缀的插件 autoprefixer
                {
                    loader: "less-loader",
                    options: {
                        sourceMap: true //这个字段控制是否生成sourceMap
                    }
                }]
            },
            {
                //ts-loader的配置 ts的配置是单独的tsconfig.json 不在这里配置
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(html|htm)$/,
                use: 'html-loader',
                include: /src\/template/
            }
        ]
    },
    plugins: [
        //使用插件,插件需要手动引入
        //css打包插件,这个插件将css打包成文件,以便用link引入  而非打包成style标签插入页面:
        new MiniCssExtractPlugin({ //这个插件用于将样式打包成单独的文件,这个插件应用于loader中配置的sass文件的最后处理步骤
            filename: '[name].css', //这个插件的文件名支持插槽,插槽对应的值是entry的字段名,默认是main,如果entry有多个,则会按entry名打包多个css
            //filename对应的生成文件需要手动在html中引入 路径为'/dist/[name].css',而chunkFilename生成的是异步引入的css,不需要手动引入 会在模块加载时自动用link插入
            chunkFilename: '[id].css',//用import()异步引入的样式文件,将会被打包成单独的文件,以便用link标签按需载入,这个字段指定异步css的文件名
            //chunkFilename生成的文件默认保存在根目录下,但是dist/目录下也有,而同步引入的css则只会存在于dist目录下
            //[注意]: chunkFilename有bug,拼接的路径里 文件名前面少一个'/' 导致动态link的src里 '/dist/0.css'变成 '/dist0.css'
            //但是不会影响执行,因为生成的文件路径也是同样的:'/dist0.css',如果一定要使动态link标签的src变成'/dist/0.css',修改成 '/'+'[id].css'即可
        })
    ],
    optimization: {
        splitChunks: { //用于自动提取符合条件的公共代码和node_modules模块
            chunks: 'all',//all:所有chunk  默认值:async 异步模块  initial:只对入口chunk生效
            //splitChunk会将所有chunk中用到的公共代码提取出来, 如page1和page2都用到了react,则会将react提取为:vendor~page1~page2.js
            //其他enrty虽然没有显式引用同一个库,但是仍然有共享的webpack的运行时代码,也会提取成 vendors~entry1~entry2~entry3~page1~page2.js
            //文档: https://webpack.js.org/plugins/split-chunks-plugin/#root
            //  ---- 使用前: 各enrty大小: entry1 2 3 均超过360k   page1 2 均超过440k 总计2m                         ---- 
            //  ---- 使用后: vendor~entry123=357k  vendor~page12=84k  其他原始chunk均不超过15k 总计1.1m             ----
            //  ---- 注意:   单入口打包代码体积远远小于多入口(仅457k),所以不要轻易采用多入口                              ----
            minSize: 30000, //提取的js最低体积:30k 低于30k的资源不会被提取到vendor中
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,//按需加载的script数最大值
            maxInitialRequests: 4,//首次加载并行资源数限制 如果提取后大于此限制 则不提取
            automaticNameDelimiter: '~',//输出vendor文件名分隔符
            automaticNameMaxLength: 50,//文件名最大长度,如果超过长度,超过部分会hash化,可以查看终端输出得到最终文件名
            cacheGroups: {
                vendors: {
                    //针对第三方库的提取规则,这里采用的是路径匹配
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,//优先级,当此项匹配和default设置冲突时,按优先级决定
                },
                default: {
                    //针对多次被引用的模块的提取规则,这里采用的是引用次数匹配
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        minimize: false, //在mode=production时,默认开启,否则需要指定,默认的minimize只会压缩变量名,不会压缩换行 空格
        //可以通过terser-webpackplugin插件修改默认的压缩配置
        //css可以通过optimize-css-assets-webpackplugin插件压缩
    }
}