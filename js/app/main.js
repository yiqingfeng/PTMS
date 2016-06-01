define(function(require, exports, module) {
	var root = window;
	root.PTMS || (root.PTMS = {});
	var events = root.PTMS.events = {};
	// 创建全局Events
	_.extend(events, Backbone.Events);

	var cateList = require('./cates/main');
		// todos = require('./todos/main');

	cateList.init($('#app-cates'), events);
	// todos.init($('.m-task-list .app-c'), events);

	// events.trigger('cates:test');
});