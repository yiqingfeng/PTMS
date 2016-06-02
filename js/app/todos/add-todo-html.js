define(function(){

  return function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<li class="todo" data-id=' +((__t = ( obj._id )) == null ? '' : __t) +'>\r\n\t<div class="todo-view">\r\n\t\t<div class="todo-name" title=' +((__t = ( obj.name )) == null ? '' : __t) +'>' +((__t = ( obj.name )) == null ? '' : __t) +'</div>\r\n\t\t<a href="javascript:;" class="sprite sprite-edit edit j-todo-edit"></a>\r\n\t\t<a href="javascript:;" class="sprite sprite-delete destroy j-todo-destroy"></a>\r\n\t</div>\r\n\t<input class="todo-rename" value=' +((__t = ( obj.name )) == null ? '' : __t) +'>\r\n</li>';}return __p}

});