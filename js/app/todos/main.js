define(function (require, exports, module) {
	var status,
		root = window,
		data = require('../data/data'),
		bindEventOne = require('../data/util').bindEventOne,
		todosTemp = [
			require('./main-html'),
			require('./todo-list-html'),
			require('./add-todo-html')
		];

	var Todos = function (opts){
		this.opts = $.extend({
            element: null
        }, opts || {});
        this.$el = $(this.opts.element);
        this.events = this.opts.events;
	}
	Todos.prototype = {
		init: function (){
			var me = this;
			me.renderHtml();
			me.bindEvents();
			me.events.on('tidExchange:after', function (){
				me.renderTodoList(status);
			});
		},
		// set todoId
		setTodoId: function (todoId){
			var oldTodoId = root.PTMS.TODOID || '';
			if (oldTodoId === todoId) return;
			root.PTMS.TODOID = todoId;
			this.events.trigger('todoIdExchange:after');
		},
		renderHtml: function (){
			this.$el.append(todosTemp[0]());
			this.renderTodoList();
		},
		renderTodoList: function (status){
			var todos,
				tid = root.PTMS.TID;
				$todos = $('.j-todos', this.$el);
			$todos.empty();
			if(status === undefined){
				if (tid) {
					todos = data.getTodosByDate(tid);
					$todos.append(todosTemp[1](todos));
				}
				return;
			}
			todos =  data.getTodosByDate(tid, status);
			$todos.append(todosTemp[1](todos));
		},
		dealTodoClick: function ($el){
			var me = this,
				tid = root.PTMS.TID;
			// destroy
			if ($el.hasClass('j-todo-destroy')) {
				var $todo = $el.parent().parent(),
					id = $todo.attr('data-id');
				$todo.remove();
				data.clearTodo(tid, id);
				me.events.trigger('todoChange:after');
				me.setTodoId('');
				return;
			}
			// rename
			if ($el.hasClass('j-todo-edit')) {
				var $todoView = $el.parent(),
					$input = $todoView.siblings();
				$todoView.hide();
				$input.show().focus();
				bindEventOne($input[0], 'blur', function(){
					var id = $todoView.parent().attr('data-id'),
						$todoName = $('.todo-name', $todoView),
						value = $input.prop('value');
					if (value != '') {
						$todoName.attr('title', value).text(value);
						$input.hide();
						$todoView.show();
						data.updateTodoName(tid, id, value);
					}
				});
				return;
			}
			var $todo = getTodoEl($el);
			$todo.siblings().removeClass('curt');
			$todo.addClass('curt');
			me.setTodoId($todo.attr('data-id'));
			function getTodoEl($el){
				while (!$el.hasClass('todo')) {
					$el = $el.parent();
				}
				return $el;
			}
		},
		bindEvents: function (){
			var me = this,
				$todos = $('.j-todos', me.$el);
			$('.j-add-todo', me.$el).on('click', function (){
				var tid = root.PTMS.TID;
				if (!tid) {
					alert('请先选择一个任务！');
					return;
				}
				var todo = data.createTodo(tid),
					date = todo.date.substr(0, 10),
					$date = $('.date:contains('+ date +')', $todos);
				if ($date.length) {
					$date.after(todosTemp[2](todo));
				} else {
					$todos.append('<li class="date">'+date+'</li>' + todosTemp[2](todo));
				}
				me.events.trigger('todoChange:after');
			});
			$todos.on('click', function (evt){
				var $target = $(evt.target);
				$el = getTodoEl($target);
				if (!$el.hasClass('todo')) {
					return;
				}
				me.dealTodoClick($target);
				function getTodoEl($el){
					while (!$el.hasClass('j-todos') && !$el.hasClass('todo')){
						$el = $el.parent();
					}
					return $el;
				}
			});
			var $status = $('.status', me.$el);
			$('.j-status-all', me.$el).on('click', function (){
				if (!$(this).hasClass('curt')) {
					$status.removeClass('curt');
					$(this).addClass('curt');
					status = undefined;
					me.renderTodoList();
				}
			});
			$('.j-status-0', me.$el).on('click', function (){
				if (!$(this).hasClass('curt')) {
					$status.removeClass('curt');
					$(this).addClass('curt');
					status = 0;
					me.renderTodoList(0);// unfinished todo
				}
			});
			$('.j-status-1', me.$el).on('click', function (){
				if (!$(this).hasClass('curt')) {
					$status.removeClass('curt');
					$(this).addClass('curt');
					status = 1;
					me.renderTodoList(1);// finished todo
				}
			});
		}
	}
	exports.init = function ($root, events){
		var todos = new Todos({
			element: $root,
			events: events
		});

		todos.init();
	}
});