define(function(){

  return function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<li class="cate-item" data-cid=' +((__t = ( obj._id )) == null ? '' : __t) +'>\r\n\t<div class="cate">\r\n\t\t<span class="cate-name" title=' +((__t = ( obj.name )) == null ? '' : __t) +'>' +((__t = ( obj.name )) == null ? '' : __t) +'</span><span></span>\r\n\t\t<a href="javascript:;" class="cate-add-task j-cate-add-task">\r\n\t\t<a href="javascript:;" class="cate-edit j-cate-edit">\r\n\t\t<a href="javascript:;" class="destroy j-destroy-c"></a>\r\n\t</div>\r\n\t<div class="cate-input"><input type="text" class="j-cate-edit" value=' +((__t = ( obj.name )) == null ? '' : __t) +'></div>\r\n</li>';}return __p}

});