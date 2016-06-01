define(function(){

  return function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<li class="cate" data-cid=' +((__t = ( obj._id )) == null ? '' : __t) +'>\r\n\t<div class="cate-view">\r\n\t\t<span class="cate-name" title=' +((__t = ( obj.name )) == null ? '' : __t) +'>' +((__t = ( obj.name )) == null ? '' : __t) +'</span><span></span>\r\n\t\t<a class="add-task j-add-task" href="javascript:;"></a>\r\n\t\t<a class="edit j-cate-edit" href="javascript:;"></a>\r\n\t\t<a class="destroy j-cate-destroy" href="javascript:;"></a>\r\n\t</div>\r\n\t<input class="cate-rename" value=' +((__t = ( obj.name )) == null ? '' : __t) +'>\r\n\t<ul class="task-lists hide">\r\n\t\t\r\n\t</ul>\r\n</li>';}return __p}

});