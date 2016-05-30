define(function(require, exports, module) {
	var $ = require('jquery'),
		cateList = require('./cate-list/main'),
		todos = require('./todos/main');

	cateList.init($('.m-cate-list .app-c'));
	todos.init($('.m-task-list .app-c'));
});