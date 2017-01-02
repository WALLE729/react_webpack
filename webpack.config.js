
var path = require('path');
var webpack = require('webpack');
/*
extract-text-webpack-plugin插件，有了它就可以将你的样式提取到单独的css文件里，在moudule>loader和plugins中作相应的
配置，就会按照打包保存js的配置一样，打包编译css文件，并放在和打包后js同样的位置，自动通过link标签放到页面中
妈妈再也不用担心样式会被打包到js文件里了。
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
html-webpack-plugin插件，重中之重，webpack中生成HTML的插件，
具体可以去这里查看https://www.npmjs.com/package/html-webpack-plugin
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
	//entry:'./entry.js',配置入口文件，有几个写几个{index: './src/js/page/index.js',list: './src/js/page/list.js'}
	entry:{
		index:"./dev/js/page/index.js",
		about:"./dev/js/page/about.js",
		home:"./dev/js/page/home.js"
	},
	output:{
		path: path.join(__dirname, 'public'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/public/', //模板、样式、脚本、图片等资源对应的server上的路径,最后生成的html引入的文件相对的路径
        filename: 'js/[name].js',            //每个页面对应的主js的生成配置
        chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
	},
	devtool:'source-map',//直接生成source-map,方便在控制台调试代码,在这里直接设置，在谷歌控制台就会直接生成
	devServer:{
		contentBase: './',  //开启的服务器的根路径，可自动打开当前路径中的index.html文件，你懂的
		// host: 'localhost',
		port:8099,//设置通过webpack-dev-server开启的服务器的端口号
		inline:true,// 设置实时刷新，也就是监听有变化，就刷新页面
		hot:true // 热重载（局部更改，不需要整个刷新页面）
		
	},
	module:{
		loaders:[
			{
				test:/\.css$/,
				loader:ExtractTextPlugin.extract('style-loader', 'css-loader')
			},
			{
				test:/\.less$/,
				loader:ExtractTextPlugin.extract('css!less')
			},
			{
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test: /\.html$/,
                loader: "html?attrs=img:src img:data-src"
            }, 
			{
				test:/\.js$/,
				loader:'react-hot!babel',//js后缀的不光使用babel编译，也可能使用react-hot编译
				exclude:/node_modules/ //排除node_modules中的js文件
				
			},
			{
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            },
            {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            },
            {
            	//暴露到全局
            	test:require.resolve('jquery'), 
            	loader: 'expose?$'
            }
		]
	},
	resolve:{//配置，  省略引入文件名后缀，也就是起个别名,import引入的时候可以省略后缀名或者使用别名
		"extensions":['','.js','.css']
	},
	plugins:[
		new webpack.ProvidePlugin({ //加载jq webpack可以这样把jQuery设置为全局
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin('css/[name].css'), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['index','home','about'], //提取哪些模块共有的部分
            minChunks: 3 // 提取至少3个模块共有的部分
        }),

        //HtmlWebpackPlugin，模板生成相关的配置，每个对于一个页面的配置，有几个写几个
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './dev/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/index.html', //生成的html存放路径，相对于path
            template: './dev/view/index.html', //html模板路径 相对于webpack.config.js文件的路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件    
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
         new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './dev/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/about.html', //生成的html存放路径，相对于path
            template: './dev/view/about.html', //html模板路径 相对于webpack.config.js文件的路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', 'about'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件    
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
         new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './dev/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/home.html', //生成的html存放路径，相对于path
            template: './dev/view/home.html', //html模板路径 相对于webpack.config.js文件的路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', 'home'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件    
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new webpack.HotModuleReplacementPlugin()//加上这句就不会报错[HMR] Hot Module Replacement is disabled
	]
	
};
