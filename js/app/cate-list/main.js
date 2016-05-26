define(function(require, exports, module) {
	var $ = require('jquery'),
		data = require('../data/data'),
		cateTemps = [
			require('./main-html'),
			require('./cate-list-html'),
			require('./add-cate-html')
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
		renderHtml: function (){
		},
		queryCateList: function (){
			var cates = data.getTaskMenu();
			this.renderCateList(cates);
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
			var me = this,
				isdb = false,
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
				$('.cate-input input', $cate).on('blur', function (){
					console.log($(this));
				});
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
				var $el = getCurtCate($target);
				if (!$el.hasClass('cate-item')) return;
				if ($target.hasClass('j-destroy-c')) {
					var $cate = $target.parent().parent();
					var cid = $cate.attr('data-cid');
					$cate.remove();
					data.clearCate(cid);
				// 	// me.updateIndexByCate();
					return;
				}
				isdb = false;
				timer1 && clearTimeout(timer1);
				var timer1 = setTimeout(function (){
					!isdb && $('.task-list', $el).toggleClass('hide');
				}, 500);
			});
			$cates.on('dblclick', function (evt){
				var $target = $(evt.target);
				function getCurtCate($el){
					while(!$el.hasClass('cates-list') && !$el.hasClass('cate-item')){
						$el = $el.parent();
					}
					return $el;
				}
				var $el = getCurtCate($target);
				if (!$el.hasClass('cate-item')) return;
				isdb = true;
				$('.cate', $el).css('display', 'none');
				$('.cate-input', $el).css('display', 'block');
			});
			
			// $('.task .destroy', me.$el).on('click', function (){
			// 	$(this).parent().remove();
			// 	console.log($(this).parents('.task-list'));
			// });
			// $('.j-add-cate', me.$el).on('click', function (){

			// });
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