module.exports={
	entry:'./entry.js',//入口文件
	output:{
		filename:'bundle.js'//出口文件
	},
	devtool:'source-map',//直接生成source-map,方便在控制台调试代码
	devServer:{
		port:8088,
		inline:true,
		
	},
	module:{
		loaders:[
			{
				test:/\.css$/,
				loader:'style!css'
			},
			{
				test:/\.js$/,
				loader:'react-hot!babel',//js后缀的不光使用babel编译，也可能使用react-hot编译
				exclude:/node_modules/ //排除
			}
		]
	},
	resolve:{//配置，  省略引入文件名后缀，也就是起个别名,import引入的时候可以省略后缀名或者使用别名
		"extensions":['','.js','.css']
	}
	
};
