define(function (require, exports, module) {
	var root = window,
		data = require('../data/data')
		todosTemp = [
			require('./todos-html'),
			require('./todoLists-html'),
			require('./addTodo-html')
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
				console.log(root.PTMS.TID);
				me.renderTodoList();
			});
		},
		renderHtml: function (){
			this.$el.empty().append(todosTemp[0]());
			this.renderTodoList();
		},
		renderTodoList: function (){
			var tid = root.PTMS.TID,
				$todos = $('.tasks-list', this.$el);
			$todos.empty();
			if (tid) {
				var todos = data.getTodosByDate(tid);
				$todos.append(todosTemp[1](todos));
			}
		},
		dealTodoClick: function ($el){
			var tid = '61ec0f21-6d1b-d374-a448-77ba0bd880e2';
			// destroy
			if ($el.hasClass('todo-destroy')) {
				var $todo = $el.parent().parent(),
					id = $todo.attr('data-id');
				$todo.remove();
				data.clearTodo(tid, id);
				return;
			}
			// rename
			if ($el.hasClass('todo-edit')) {
				var $todoView = $el.parent(),
					$input = $todoView.siblings(),
					events = $._data($input[0], 'events');
				$todoView.css('display', 'none');
				$input.css('display', 'block');
				timer1 && clearTimeout(timer1);
				var timer1 = setTimeout(function (){
					$input.focus();
				}, 0);
				// 绑定blur事件
				if (!(events && events.blur)) {
					var id = $todoView.parent().attr('data-id'),
						$todoName = $('.todo-name', $todoView);
					$input.blur(function (){
						var value = $input.prop('value');
						if (value != '') {
							$todoName.attr('title', value).text(value);
							$todoView.css('display', 'block');
							$input.css('display', 'none');
							data.updateTodoName(tid, id, value);
						}
					})
				}
				return;
			}
		},
		bindEvents: function (){
			var me = this,
				$todos = $('.tasks-list', me.$el);
			$('.j-add-task', me.$el).on('click', function (){
				console.log('12312');				
				var tid = root.PTMS.TID;
				if (!tid) {
					alert('请先选择一个任务！');
					return;
				}
				console.log(4444444444);
				var todo = data.createTodo(tid),
					date = todo.date.substr(0, 10),
					$date = $('.date:contains('+ date +')', $todos);
				if ($date.length) {
					$date.after(todosTemp[2](todo));
				} else {
					$todos.append('<li class="date">'+date+'</li>' + todosTemp[2](todo));
				}
				console.log(1231);
			});
			$todos.on('click', function (evt){
				var $target = $(evt.target);
				function getTodoEl($el){
					while (!$el.hasClass('tasks-list') && !$el.hasClass('task-c')){
						$el = $el.parent();
					}
					return $el;
				}
				$el = getTodoEl($target);
				if (!$el.hasClass('task-c')) return;
				me.dealTodoClick($target);
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