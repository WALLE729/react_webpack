'use strict';
import React from 'react'
var imgUrl = require.context('../../img',true,/\.(png|jpg|gif)$/)//此处引入所有的图片资源路径
var img1 = imgUrl('./1.jpg');//再把需要的图片加载进来
class Listhome extends React.Component{
	constructor(...args){
	    super(...args);
	    this.state = {};
	}
	render(){
		return <div>
		我是插入在homehtml页面中的文件啊
		我在测试这个组件，创建新组建，首字母要大写，TMDTMD，一定记清楚啦，组件的首字母要大写
		<img src={img1}/>
		</div>
	}
}

export default Listhome
// TMD 创建组件名 首字母要大写