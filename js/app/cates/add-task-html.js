define(function(){

  return function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<li class="task" data-tid=' +((__t = ( obj._id )) == null ? '' : __t) +'>\r\n\t<div class="task-view">\r\n\t\t<span class="task-name" title=' +((__t = ( obj.name )) == null ? '' : __t) +'>' +((__t = ( obj.name )) == null ? '' : __t) +'</span><span></span>\r\n\t\t<a class="sprite sprite-edit edit j-task-edit" href="javascript:;"></a>\r\n\t\t<a class="sprite sprite-delete destroy j-task-destroy" href="javascript:;"></a>\r\n\t</div>\r\n\t<input class="task-rename" value=' +((__t = ( obj.name )) == null ? '' : __t) +'>\r\n</li>';}return __p}

});