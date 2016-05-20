define(function (require, exports, module){
	var $ = require('jquery');
	var Data = function (){
		// this.file = './data.json';
		this.file = '/js/app/data.json';
	}
	Data.prototype = {
		init: function (){
			var me = this;
			$.getJSON(me.file, function(data){
				me.data = data;
			});
		},
		getTaskCountByTask: function(task){
			return task && task.children.length;
		},
		getTaskCountByCate: function (cate){
			if (!(cate && cate.children)) {
				return 0;
			}
			var me = this,
				count = 0;
			for (var i=0,len=cate.children.length; i<len; i++) {
				count += me.getTaskCountByTask(cate.children[i]);
			}
			return count;
		},
		getTaskCountByAll: function (){
			var me = this,
				data = me.data;
			if (!(data && data.length)) {
				return 0;
			}
			var count = 0;
			for (var i=0,len=data.length; i<len; i++) {
				count += me.getTaskCountByCate(data[i]);
			}
			return count;
		},
		getCateList: function (){
			return this.data;
		}
	}
	module.exports =  Data;
});