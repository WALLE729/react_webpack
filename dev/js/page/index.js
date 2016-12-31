 'use strict';
 import React from 'react'
 import ReactDOM from 'react-dom'
 import List from './../components/indexList.js'
 require("../../css/common/base.css");
 require("../../css/page/index.less");
 ReactDOM.render(
 	<List />, 
 	document.getElementById('app')
 );