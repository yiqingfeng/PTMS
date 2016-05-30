define(function(require, exports, module) {
	var root = window,
		$ = require('jquery'),
		data = require('../data/data'),
		cateTemps = [
			require('./main-html'),
			require('./cate-list-html'),
			require('./add-cate-html'),
			require('./add-task-html')
		];

	var CateList = function(opts) {
		this.opts = $.extend({
            element: null
        }, opts || {});
        this.$el = $(this.opts.element);
	}
	CateList.prototype = {
		init: function (){
			var me = this;
			$(me.$el).append(cateTemps[0]({todoNum: data.getAllTodosNum()}));
			me.queryCateList();
			me.bindEvent();
		},
		// 设置当前cid和tid
		setIndex: function (cid, tid){
			root.PTMS.CID = cid;
			root.PTMS.TID = tid;
		},
		queryCateList: function (){
			var cates = data.getTaskMenu();
			this.renderCateList(cates);
		},
		renderCateList: function (datas){
			$('.j-cates', this.$el).append(cateTemps[1](datas));
		},
		dealTaskClick: function ($el){
			function getCid($el){
				while(!$el.hasClass('cate-item')){
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
			// 删除TASK
			if ($el.hasClass('j-destroy-t')) {
				var cid = getCid($el),
					task = getTaskEle($el),
					tid = task.attr('data-tid');
				data.clearTask(cid, tid);
				task.remove();
				return;
			}
			// 修改TASK名称
			if ($el.hasClass('task-edit')) {
				var cid = getCid($el),
					tid = getTaskEle($el).attr('data-tid'),
					$input = $el.parent().siblings(),
					events = $._data($input[0], 'events');
				$el.parent().css('display', 'none');
				$input.css('display', 'block');
				timer1 && clearTimeout(timer1);
				var timer1 = setTimeout(function (){
					$input.focus();
				}, 0);
				// 绑定blur事件
				if (!(events && events.blur)) {
					var $taskName = $el.siblings('.task-name');
					$input.blur(function (){
						var value = $input.prop('value');
						console.log(value);
						if (value != '') {
							$taskName.attr('title', value).text(value);
							$taskName.parent().css('display', 'block');
							$input.css('display', 'none');
							data.updateTaskName(cid, tid, value);
						}
					})
				}
				return;
			}
			var cid = getCid($el),
				tid = getTaskEle($el).attr('data-tid');
			this.setIndex(cid, tid);
		},
		bindEvent: function (){
			var me = this,
				$cates = $('.cates-list', me.$el);
			$('.cate-input input', $cates).on('blur', function (){
				var value = $(this).prop('value'),
					$cate = $(this).parent().parent();
					$cateName = $('.cate-name', $cate);
					// oldValue = $cate.text();
				if (value != '') {
					$cateName.attr('title', value);
					$cateName.text(value);
					$(this).parent().css('display', 'none');
					$cateName.parent().css('display', 'block');
					data.updateCateName($cate.attr('data-cid'), value);
				}
			});
			$('.j-add-cate', me.$el).on('click', function (){
				var cate = data.createCate();
				$cate = $(cateTemps[2](cate));
				$cates.append($cate);
			});
			$cates.on('click', function (evt){
				var $target = $(evt.target);
				function getCurtCate($el){
					while(!$el.hasClass('cates-list') && !$el.hasClass('cate-item')){
						$el = $el.parent();
					}
					return $el;
				}
				function isTaskList($el){
					while(!$el.hasClass('cate-item') && !$el.hasClass('task-list')){
						$el = $el.parent();
					}
					return $el.hasClass('task-list');
				}
				var $el = getCurtCate($target);
				if (!$el.hasClass('cate-item')) return;
				if ($target.hasClass('j-destroy-c')) {
					var $cate = $target.parent().parent();
					var cid = $cate.attr('data-cid');
					$cate.remove();
					data.clearCate(cid);
					return;
				}
				if ($target.hasClass('cate-edit')) {
					$target.parent().css('display', 'none');
					$target.parent().siblings('.cate-input').css('display', 'block');
					$('input', $target.parent().parent()).focus();
					return;
				}
				if ($target.hasClass('cate-add-task')) {
					var $cate = $target.parent().parent(),
						cid = $cate.attr('data-cid'),
						task = data.createTask(cid);
					$('.task-list', $cate).append(cateTemps[3](task));
					return;
				}
				if (!isTaskList($target)) {
					$('.task-list', $el).toggleClass('hide');
					return;
				}
				me.dealTaskClick($target);
			});
		}
	}
	exports.init = function ($root){
		$root || ($root = $(document));
		var cateList = new CateList({
			element: $root
		});
		cateList.init();
		// console.log(cateList);
	}
});