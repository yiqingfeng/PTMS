define(function(require, exports, module) {
	var root = window,
		data = require('../data/data'),
		cateTemps = [
			require('./main-html'),
			require('./cate-list-html'),
			require('./add-cate-html'),
			require('./add-task-html')
		];

	// No binding when there is this type of event
	function bindEventOne(el ,type, callback){
		var events = $._data(el, 'events');
		if (events && events[type]) {
			return;
		}
		$(el).on(type, callback);
	}

	var CateList = function(opts) {
		this.opts = $.extend({
            element: null
        }, opts || {});
        this.$el = $(this.opts.element);
        this.events = this.opts.events;
	}
	CateList.prototype = {
		init: function (){
			var me = this;
			$(me.$el).append(cateTemps[0]({todoNum: data.getAllTodosNum()}));
			me.queryCateList();
			me.bindEvent();
		},
		// set global tid
		setTid: function (tid){
			var oldTid = root.PTMS.TID || "";
			if (oldTid === tid) {
				return;
			}
			root.PTMS.TID = tid;
			this.events.trigger('tidExchange:after');
			console.log('tidExchange:after');
		},
		queryCateList: function (){
			var cates = data.getTaskMenu();
			if (cates.length) {
				root.PTMS.CID = cates[0]._id;
			}
			this.renderCateList(cates);
		},
		renderCateList: function (datas){
			$('.j-cates', this.$el).append(cateTemps[1](datas));
		},
		dealTaskClick: function ($el){
			
			// destroy task
			if ($el.hasClass('j-task-destroy')) {
				var cid = getCid($el),
					$task = getTaskEle($el),
					tid = $task.attr('data-tid');
				$task.remove();
				data.clearTask(cid, tid);
				return;
			}
			// rename task
			if ($el.hasClass('j-task-edit')) {
				var cid = getCid($el),
					tid = getTaskEle($el).attr('data-tid'),
					$taskView = $el.parent(),
					$input = $taskView.siblings();
				$taskView.hide();
				$input.show().focus();
				bindEventOne($input[0], 'blur', function (){
					var value = $input.prop('value'),
						$taskName = $taskView.find('.task-name');
					if (value !== '') {
						$taskName.attr('title', value).text(value);
						$input.hide();
						$taskView.show();
						data.updateTaskName(cid, tid, value);
					}
				});
				return;
			}
			var cid = getCid($el),
				tid = getTaskEle($el).attr('data-tid');
			root.PTMS.CID = cid;
			this.setTid(tid);
			function getCid($el){
				while(!$el.hasClass('cate')){
					$el = $el.parent();
				}
				return $el.attr('data-cid');
			}
			function getTaskEle($el){
				while(!$el.hasClass('task')){
					$el = $el.parent();
				}
				return $el;
			}
		},
		bindEvent: function (){
			var me = this,
				$cates = $('.j-cates', me.$el);
			$('.j-add-cate', me.$el).on('click', function (){
				var cate = data.createCate();
				$cate = $(cateTemps[2](cate));
				$cates.append($cate);
			});
			$cates.on('click', function (evt){
				var $target = $(evt.target);
				// destroy cate
				if ($target.hasClass('j-cate-destroy')) {
					var $cate = $target.parent().parent(),
						cid = $cate.attr('data-cid');
					$cate.remove();
					data.clearCate(cid);
					if (cid === root.PTMS.CID) {
						root.PTMS.CID = "";
						me.setTid("");						
					}
					return;
				}
				// rename cate
				if ($target.hasClass('j-cate-edit')) {
					var $cateView = $target.parent(),
						$input = $cateView.siblings('input');
					$('.task-lists', $cates).hide();
					$cateView.hide();
					$input.show().focus();
					bindEventOne($input[0], 'blur', function(){
						var value = $input.prop('value'),
							$cateName = $cateView.find('.cate-name');
						if(value !== '') {
							$cateName.attr('title', value);
							$cateName.text(value);
							$input.hide();
							$cateView.show();
							data.updateCateName($cateView.parent().attr('data-cid'), value);
						}
					});
					return;
				}
				// add task
				if ($target.hasClass('j-add-task')) {
					var $cate = $target.parent().parent(),
						cid = $cate.attr('data-cid'),
						task = data.createTask(cid);
					$('.task-lists', $cate).append(cateTemps[3](task)).show();
					return;
				}
				var $el = isTaskList($target);
				if (!$el.hasClass('task-lists')) {
					$('.task-lists', $el).toggle();
					return;
				}
				me.dealTaskClick($target);
				function isTaskList($el){
					while(!$el.hasClass('cate') && !$el.hasClass('task-lists')){
						$el = $el.parent();
					}
					return $el;
				}
			});
		}
	}

	exports.init = function ($root, events){
		$root || ($root = $(document));
		var cateList = new CateList({
			element: $root,
			events: events
		});
		cateList.init();
	}
});