 import React from 'react'
 import ReactDOM from 'react-dom'
 import about_List from '../components/about_list'
 require("../../css/common/base.css");
 require("../../css/page/about.less");
 ReactDOM.render(
 	<about_List/>, 
 	document.getElementById('about')
 );