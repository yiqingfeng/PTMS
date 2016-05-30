define(function (require, exports, module) {
	var root = window,
		$ = require('jquery'),
		data = require('../data/data')
		todosTemp = [
			require('./todos-html')
		];

	var Todos = function (opts){
		this.opts = $.extend({
            element: null
        }, opts || {});
        this.$el = $(this.opts.element);
	}
	Todos.prototype = {
		init: function (){
			this.renderHtml();
			this.bindEvents();
		},
		renderHtml: function (){
			// var tid = root.PTMS.TID;
			var tid = '02585cf2-5082-3a6a-5887-0f7728846c47';
			if (!tid) {
				this.$el.append(todosTemp[0]());
				return;
			}
			var todos = data.getTodosByDate(tid);
			this.$el.append(todosTemp[0](todos));
		},
		bindEvents: function (){
			var me = this,
				$todos = $('.tasks-list', me.$el);
			$('.j-add-task', me.$el).on('click', function (){
				// data.createTodo(root.PTMS.TID);
				var todo = data.createTodo('02585cf2-5082-3a6a-5887-0f7728846c47'),
					date = todo.date.substr(0, 10),
					$date = $('.date:contains('+ date +')');
				if ($date.length) {
					$date.after('<li class="task-c">'+ todo.name +'</li>');
				} else {
					$todos.append('<li class="date">'+date+'</li><li class="task-c">'+date.name+'</li>');
				}
				// console.log(todo);
				// console.log($('.date:contains("2016-05-27")'));
				// console.log($todos);
			});
		}
	}
	exports.init = function ($root){
		var todos = new Todos({
			element: $root
		});
		todos.init();
	}
});