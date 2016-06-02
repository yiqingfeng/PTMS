define(function (require, exports, module) {
	var	root = window,
		// id = root.PTMS.TODOID,
		data = require('../data/data'),
		todoTemp = [
			require('./main-html')
		];

	var Todo = function (opts){
		this.opts = $.extend({
            element: null
        }, opts || {});
        this.$el = $(this.opts.element);
        this.events = this.opts.events;
	}
	Todo.prototype = {
		init: function (){
			var me = this;
			me.renderHtml();
			me.bindEvents();
			me.events.on('todoIdExchange:after', function (){
				var id = root.PTMS.TODOID,
					tid = root.PTMS.TID,
					todo = data.getTodo(tid, id);
				me.renderTodo(todo);
			});
		},
		renderHtml: function (){
			this.$el.append(todoTemp[0]());
		},
		renderTodo: function (data){
			var $finish = $('.j-finish', this.$el),
				$edit = $('.j-edit', this.$el);
			$edit.hide();
			$finish.hide();
			if (data && (data instanceof Array)) {
				data = {
					name: '',
					date: '',
					content: ''
				}
			} else {
				$edit.show();
				$finish.show();
				if (data.done) {
					$finish.addClass('end');
				} else {
					$finish.removeClass('end');
				}
			}
			$('.j-title', this.$el).text(data.name);
			$('.j-date', this.$el).text(data.date.substr(0, 10));
			$('.j-content', this.$el).html(data.content);
		},
		bindEvents: function (){
			$('.j-edit', this.$el).on('click', function (){
				var text = prompt("Please enter your todo content!","");
				if (text != '') {
					$('.j-content', this.$el).html('<p>' + text + '</p>');
					data.updateTodoContent(root.PTMS.TID, root.PTMS.TODOID, text);
				}
			});
		}
	}

	exports.init = function ($root, events){
		var todo = new Todo({
			element: $root,
			events: events
		});

		todo.init();
	}
});