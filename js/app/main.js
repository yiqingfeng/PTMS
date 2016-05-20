define(function(require, exports, module) {
	var $ = require('jquery'),
		cateList = require('./cate-list/main');
	// console.log($cateList);
	cateList.init($('.m-cate-list .app-c', document));
});