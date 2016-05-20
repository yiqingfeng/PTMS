define(function(require, exports, module) {
	var $ = require('jquery'),
		Data = require('../data'),
		cateTemps = [
			require('./main-html'),
			require('./cate-list-html')
		];

	var data = new Data();
	data && data.init();

	var CateList = function(opts) {
		this.opts = $.extend({
            element: null
        }, opts || {});
        this.$el = $(this.opts.element);
	}
	CateList.prototype = {
		init: function (){
			var me = this;
			$(me.$el).append(cateTemps[0]());
			me.queryAllCount();
			me.queryCateList();
			setTimeout(function (){
				me.bindEvent();
			}, 0);
		},
		renderHtml: function (){
		},
		queryAllCount: function (){
			var me = this;
			timer1 && clearTimeout(timer1);
			var timer1 = setTimeout(function (){
				me.renderAllCount(data.getTaskCountByAll());
			}, 0);
		},
		renderAllCount: function (count){
			$('.j-all-count', this.$el).text(count);
		},
		queryCateList: function (){
			var me = this;
			timer2 && clearTimeout(timer2);
			var timer2 = setTimeout(function (){
				// console.log(data.getCateList());
				me.renderCateList(data.getCateList());
			}, 0);
		},
		renderCateList: function (datas){
			$('.j-cates', this.$el).append(cateTemps[1](datas));
		},
		updateIndexByCate: function (){
			var me = this;
			_.each($('.cate', me.$el), function (item, n){
				$(item).attr('data-index', n);
			});
			// console.log($('.cate', me.$el));
		},
		bindEvent: function (){
			var me = this;
			$('.cate', me.$el).on('click', function (evt){
				var $target = $(evt.target);
				if ($target.hasClass('destroy')) {
					$(this).parent().remove();
					me.updateIndexByCate();
					return;
				}
				$(this).siblings('.task-list').toggleClass('hide');
				console.log(this);
			});
			$('.task .destroy', me.$el).on('click', function (){
				$(this).parent().remove();
				console.log($(this).parents('.task-list'));
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