define(function(require, exports, module) {
	var root = window;
	root.PTMS || (root.PTMS = {});
	var events = root.PTMS.events = {};
	// 创建全局Events
	_.extend(events, Backbone.Events);

	var cates = require('./cates/main'),
		todos = require('./todos/main'),
		todo = require('./todo/main');

	cates.init($('#app-cates'), events);
	todos.init($('#app-todos'), events);
	todo.init($('#app-todo'), events);

	// events.trigger('cates:test');
});