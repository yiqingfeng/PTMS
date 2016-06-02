define(function(){

  return function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="app-cates">\r\n\t<div class="cates-top">\r\n\t\t<div class="task-nums">所有任务<span class="j-all-nums">' +((__t = ( obj.todoNum ? "("+obj.todoNum+")" : "" )) == null ? '' : __t) +'</span></div>\r\n\t\t<h3 class="title">分类列表</h3>\r\n\t</div>\r\n\t<div class="cates">\r\n\t\t<ul class="cate-lists j-cates">\r\n\t\t\t\r\n\t\t</ul>\r\n\t</div>\r\n\t<div class="add-cate"><a class="sprite sprite-add1 j-add-cate" href="javascript:;"></a><div>新增分类</div></div>\r\n</div>';}return __p}

});